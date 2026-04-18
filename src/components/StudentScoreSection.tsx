interface ScoreData {
  name: string
  subject: string
  before: number
  after: number
  improvement: number
}

const studentData: ScoreData[] = [
  {
    name: 'Student A',
    subject: 'Additional Maths',
    before: 52,
    after: 88,
    improvement: 36,
  },
  {
    name: 'Student B',
    subject: 'Chemistry',
    before: 58,
    after: 91,
    improvement: 33,
  },
  {
    name: 'Student C',
    subject: 'Physics',
    before: 45,
    after: 84,
    improvement: 39,
  },
  {
    name: 'Student D',
    subject: 'Additional Maths',
    before: 61,
    after: 89,
    improvement: 28,
  },
  {
    name: 'Student E',
    subject: 'Chemistry',
    before: 49,
    after: 87,
    improvement: 38,
  },
  {
    name: 'Student F',
    subject: 'Physics',
    before: 55,
    after: 85,
    improvement: 30,
  },
]

function ScoreCard({ name, subject, before, after, improvement }: ScoreData) {
  return (
    <div className="glow-on-hover-subtle relative rounded-2xl border p-6 transition-all">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{subject}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm">Before:</span>
          <span className="font-medium">{before}%</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm">After:</span>
          <span className="font-bold text-primary">{after}%</span>
        </div>

        <div className="rounded-full bg-muted p-1">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-primary to-orange-500 transition-all duration-1000"
            style={{ width: `${(after / 100) * 100}%` }}
          />
        </div>

        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            +{improvement} points
          </span>
        </div>
      </div>
    </div>
  )
}

export function StudentScoreSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl px-0 py-4 md:px-4 md:py-16">
      <div className="absolute inset-0 hidden bg-gradient-to-br from-white to-pink-100 opacity-30 md:block" />
      <div className="relative z-10">
        <div className="text-center">
          <h2 className="mb-3 text-lg font-semibold md:mb-4 md:text-3xl">
            Proven Results
          </h2>
          <p className="mb-4 px-1 text-xs text-muted-foreground md:mb-8 md:px-4 md:text-base">
            <strong>Real students, real improvements.</strong> Average score
            increase of 33 points in just 3 months.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {studentData.map((student, index) => (
            <ScoreCard key={index} {...student} />
          ))}
        </div>

        <div className="mt-6 text-center md:mt-8">
          <p className="px-4 text-xs text-muted-foreground md:text-sm">
            *Results are based on actual student performance. Individual results
            may vary.
          </p>
        </div>
      </div>
    </section>
  )
}
