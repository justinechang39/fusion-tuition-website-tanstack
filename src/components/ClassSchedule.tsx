import React from 'react'

interface ClassSession {
  date: string
  time: string
}

interface ClassScheduleProps {
  title: string
  sessions: ClassSession[]
}

const ClassSchedule: React.FC<ClassScheduleProps> = ({ title, sessions }) => {
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h3>
      <ul className="divide-y divide-gray-200">
        {sessions.map((session, index) => (
          <li
            key={index}
            className={`sm:text-md p-4 text-sm ${
              index % 2 === 0 ? 'bg-transparent' : 'bg-white/40'
            }`}
          >
            <div className="flex flex-row items-center justify-between">
              <span className="font-medium">{session.date}</span>
              <div className="ml-4 flex space-x-4">
                <span className="text-right text-gray-600">
                  {(session.time.includes('AM') ||
                    session.time.includes('PM')) && <strong>Time:</strong>}{' '}
                  {session.time}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClassSchedule
