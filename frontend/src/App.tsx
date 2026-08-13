import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const weeklyNutritionData = [
  { day: 'Mon', calories: 1900, protein: 96 },
  { day: 'Tue', calories: 2050, protein: 102 },
  { day: 'Wed', calories: 1980, protein: 99 },
  { day: 'Thu', calories: 2100, protein: 104 },
  { day: 'Fri', calories: 2010, protein: 100 },
  { day: 'Sat', calories: 2160, protein: 108 },
  { day: 'Sun', calories: 1940, protein: 97 },
]

function App() {

  return (
    <main className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-emerald-900/10 bg-[var(--panel)] p-6 shadow-[0_24px_64px_-30px_rgba(24,56,46,0.45)] sm:p-10">
        <section className="mb-8 flex flex-wrap items-start justify-between gap-6 border-b border-emerald-900/10 pb-6">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              Nutrition Meal Optimizer
            </p>
            <h1 className="m-0 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              Frontend starter is ready
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">
              Built with React + Vite + TypeScript, styled with Tailwind CSS, and visualized using Recharts.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 self-stretch text-center sm:min-w-72">
            <div className="rounded-2xl border border-emerald-900/10 bg-white px-4 py-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Framework</p>
              <p className="mt-1 text-lg font-semibold">React</p>
            </div>
            <div className="rounded-2xl border border-emerald-900/10 bg-white px-4 py-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Build Tool</p>
              <p className="mt-1 text-lg font-semibold">Vite</p>
            </div>
            <div className="rounded-2xl border border-emerald-900/10 bg-white px-4 py-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Styling</p>
              <p className="mt-1 text-lg font-semibold">Tailwind</p>
            </div>
            <div className="rounded-2xl border border-emerald-900/10 bg-white px-4 py-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Charts</p>
              <p className="mt-1 text-lg font-semibold">Recharts</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 sm:p-6">
            <h2 className="m-0 text-xl font-semibold">Weekly Nutrition Trend</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Example Recharts line chart for calorie and protein tracking.</p>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyNutritionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d8e7df" />
                  <XAxis dataKey="day" stroke="#4d655b" />
                  <YAxis yAxisId="left" stroke="#4d655b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4d655b" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="protein" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <aside className="rounded-2xl border border-emerald-900/10 bg-white p-5 sm:p-6">
            <h3 className="m-0 text-lg font-semibold">Next Steps</h3>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-6 text-[var(--muted)] marker:text-[var(--accent)]">
              <li>Connect this UI to your optimizer API in the backend.</li>
              <li>Map CSV nutrients to chart and summary cards.</li>
              <li>Add form inputs for goals and dietary constraints.</li>
              <li>Build pages for meal plans and comparisons.</li>
            </ul>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default App
