"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  allLeadSources,
  heardFromSources,
  type LeadType,
  type LeadRow,
} from "@/lib/data"

type FormState = {
  date: string
  source: string
  total: string
  nq: string
  fnq: string
  q: string
  type: LeadType
}

const initialForm: FormState = {
  date: "",
  source: allLeadSources[0],
  total: "",
  nq: "",
  fnq: "",
  q: "",
  type: "all_leads",
}

export default function InputPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [entries, setEntries] = useState<LeadRow[]>([])

  const sourceOptions = useMemo(() => {
    return form.type === "all_leads" ? allLeadSources : heardFromSources
  }, [form.type])

  const totalNum = Number(form.total || 0)
  const nqNum = Number(form.nq || 0)
  const fnqNum = Number(form.fnq || 0)
  const qNum = Number(form.q || 0)
  const breakdownTotal = nqNum + fnqNum + qNum
  const isMismatch = totalNum !== breakdownTotal

  function handleTypeChange(nextType: LeadType) {
    const nextSources = nextType === "all_leads" ? allLeadSources : heardFromSources

    setForm((prev) => ({
      ...prev,
      type: nextType,
      source: nextSources[0],
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newRow: LeadRow = {
      id: crypto.randomUUID(),
      date: form.date,
      source: form.source,
      total: Number(form.total),
      nq: Number(form.nq),
      fnq: Number(form.fnq),
      q: Number(form.q),
      type: form.type,
    }

    setEntries((prev) => [newRow, ...prev])

    setForm({
      ...initialForm,
      type: form.type,
      source: form.type === "all_leads" ? allLeadSources[0] : heardFromSources[0],
    })
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Escort Academy
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Rhea Input Page
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Simple internal form for entering lead totals and qualification
              breakdowns
            </p>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-white/15 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Back to Dashboard
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">New Entry</h2>
            <p className="mt-2 text-sm text-white/65">
              This is the first version with local demo state only. Next we can
              connect it to Google Sheets.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldLabel label="Entry Type">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleTypeChange("all_leads")}
                      className={`rounded-2xl border px-4 py-3 text-sm transition ${
                        form.type === "all_leads"
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-black/20 text-white"
                      }`}
                    >
                      All Leads
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTypeChange("heard_from")}
                      className={`rounded-2xl border px-4 py-3 text-sm transition ${
                        form.type === "heard_from"
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-black/20 text-white"
                      }`}
                    >
                      Heard From
                    </button>
                  </div>
                </FieldLabel>

                <FieldLabel label="Date">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-white/30 focus:border-white/30"
                    required
                  />
                </FieldLabel>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FieldLabel label="Source">
                  <select
                    value={form.source}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, source: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-white/30"
                    required
                  >
                    {sourceOptions.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </FieldLabel>

                <FieldLabel label="Total Leads">
                  <input
                    type="number"
                    min="0"
                    value={form.total}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, total: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-white/30"
                    placeholder="0"
                    required
                  />
                </FieldLabel>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <FieldLabel label="NQ">
                  <input
                    type="number"
                    min="0"
                    value={form.nq}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, nq: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-white/30"
                    placeholder="0"
                    required
                  />
                </FieldLabel>

                <FieldLabel label="FNQ">
                  <input
                    type="number"
                    min="0"
                    value={form.fnq}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, fnq: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-white/30"
                    placeholder="0"
                    required
                  />
                </FieldLabel>

                <FieldLabel label="Q">
                  <input
                    type="number"
                    min="0"
                    value={form.q}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, q: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-white/30"
                    placeholder="0"
                    required
                  />
                </FieldLabel>
              </div>

              <div
                className={`rounded-2xl border p-4 text-sm ${
                  isMismatch
                    ? "border-red-400/30 bg-red-500/10 text-red-200"
                    : "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                }`}
              >
                <p className="font-medium">
                  Breakdown total: {breakdownTotal} / Total leads: {totalNum}
                </p>
                <p className="mt-1 text-white/75">
                  {isMismatch
                    ? "The NQ FNQ and Q numbers do not add up to the total yet"
                    : "Numbers match correctly"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isMismatch}
                  className="rounded-2xl border border-white bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-white/40"
                >
                  Save Entry
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...initialForm,
                      type: form.type,
                      source:
                        form.type === "all_leads"
                          ? allLeadSources[0]
                          : heardFromSources[0],
                    })
                  }
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Preview of Saved Entries</h2>
            <p className="mt-2 text-sm text-white/65">
              These are only temporary browser entries for now
            </p>

            <div className="mt-6 space-y-3">
              {entries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-white/50">
                  No entries yet
                </div>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {entry.source}
                        </p>
                        <p className="text-xs text-white/50">
                          {entry.type === "all_leads" ? "all leads" : "heard from"} ·{" "}
                          {entry.date}
                        </p>
                      </div>

                      <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                        total {entry.total}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-white/75">
                      <div className="rounded-xl bg-white/5 px-3 py-2">
                        Q {entry.q}
                      </div>
                      <div className="rounded-xl bg-white/5 px-3 py-2">
                        FNQ {entry.fnq}
                      </div>
                      <div className="rounded-xl bg-white/5 px-3 py-2">
                        NQ {entry.nq}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function FieldLabel({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/65">{label}</span>
      {children}
    </label>
  )
}
