import Link from "next/link"
import { leadRows } from "@/lib/data"
import {
  getDashboardSummary,
  getBreakdownBySource,
  getDailyTrend,
  formatPercent,
} from "@/lib/dashboard"

export default function DashboardPage() {
  const allLeadsRows = leadRows.filter((row) => row.type === "all_leads")
  const heardFromRows = leadRows.filter((row) => row.type === "heard_from")

  const allLeadsSummary = getDashboardSummary(allLeadsRows)
  const heardFromSummary = getDashboardSummary(heardFromRows)

  const allLeadsBreakdown = getBreakdownBySource(allLeadsRows)
  const heardFromBreakdown = getBreakdownBySource(heardFromRows)

  const allLeadsTrend = getDailyTrend(allLeadsRows)
  const heardFromTrend = getDailyTrend(heardFromRows)

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Escort Academy
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Marketing Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Leadership view for all leads heard from and qualification
              breakdown
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/input"
              className="rounded-2xl border border-white/15 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Go to Input Page
            </Link>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-2">
          <DashboardSection
            title="All Leads"
            summary={allLeadsSummary}
            breakdown={allLeadsBreakdown}
            trend={allLeadsTrend}
          />

          <DashboardSection
            title="Heard From"
            summary={heardFromSummary}
            breakdown={heardFromBreakdown}
            trend={heardFromTrend}
          />
        </section>
      </div>
    </main>
  )
}

type DashboardSectionProps = {
  title: string
  summary: {
    total: number
    q: number
    fnq: number
    nq: number
    qRate: number
    fnqRate: number
    nqRate: number
  }
  breakdown: {
    source: string
    total: number
    q: number
    fnq: number
    nq: number
  }[]
  trend: {
    date: string
    total: number
    q: number
    fnq: number
    nq: number
  }[]
}

function DashboardSection({
  title,
  summary,
  breakdown,
  trend,
}: DashboardSectionProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
          overview
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Leads" value={summary.total.toString()} />
        <StatCard
          label="Q Leads"
          value={`${summary.q} · ${formatPercent(summary.qRate)}`}
        />
        <StatCard
          label="FNQ Leads"
          value={`${summary.fnq} · ${formatPercent(summary.fnqRate)}`}
        />
        <StatCard
          label="NQ Leads"
          value={`${summary.nq} · ${formatPercent(summary.nqRate)}`}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-white/50">
            Source Breakdown
          </h3>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-white/60">
                <tr>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Q</th>
                  <th className="px-4 py-3 font-medium">FNQ</th>
                  <th className="px-4 py-3 font-medium">NQ</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((row) => (
                  <tr key={row.source} className="border-t border-white/10">
                    <td className="px-4 py-3 capitalize">{row.source}</td>
                    <td className="px-4 py-3">{row.total}</td>
                    <td className="px-4 py-3">{row.q}</td>
                    <td className="px-4 py-3">{row.fnq}</td>
                    <td className="px-4 py-3">{row.nq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-white/50">
            Daily Trend
          </h3>

          <div className="space-y-3">
            {trend.map((row) => (
              <div
                key={row.date}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{row.date}</span>
                  <span className="text-sm text-white/60">
                    total {row.total}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm text-white/75">
                  <div className="rounded-xl bg-white/5 px-3 py-2">Q {row.q}</div>
                  <div className="rounded-xl bg-white/5 px-3 py-2">
                    FNQ {row.fnq}
                  </div>
                  <div className="rounded-xl bg-white/5 px-3 py-2">
                    NQ {row.nq}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}
