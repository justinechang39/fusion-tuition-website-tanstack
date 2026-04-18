'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
// We'll use this if we need toast notifications in the future
// import { useToast } from "@/hooks/use-toast";

// Define class types and their colors
const classTypes = {
  'Physics - Class 1 (Sec 4)': {
    color: 'bg-rose-500',
    hoverColor: 'bg-rose-400',
    textColor: 'text-rose-500',
  },
  'Physics - Class 2 (Sec 4)': {
    color: 'bg-orange-500',
    hoverColor: 'bg-orange-400',
    textColor: 'text-orange-500',
  },
  'Physics - Class 3 (Sec 3)': {
    color: 'bg-amber-500',
    hoverColor: 'bg-amber-400',
    textColor: 'text-amber-500',
  },
  'Physics - Class 4 (Sec 3)': {
    color: 'bg-emerald-500',
    hoverColor: 'bg-emerald-400',
    textColor: 'text-emerald-500',
  },
  'Chemistry - Class 1 (Sec 4)': {
    color: 'bg-sky-500',
    hoverColor: 'bg-sky-400',
    textColor: 'text-sky-500',
  },
}

// Define class data
const classData = [
  // Physics Class 1 (Sec 4)
  {
    id: 'p1-1',
    name: 'Physics - Class 1 (Sec 4)',
    date: new Date(2025, 5, 2),
    time: '1:00 PM - 3:00 PM',
    classNo: 1,
  },
  {
    id: 'p1-2',
    name: 'Physics - Class 1 (Sec 4)',
    date: new Date(2025, 5, 4),
    time: '1:00 PM - 3:00 PM',
    classNo: 2,
  },
  {
    id: 'p1-3',
    name: 'Physics - Class 1 (Sec 4)',
    date: new Date(2025, 5, 6),
    time: '1:00 PM - 3:00 PM',
    classNo: 3,
  },
  {
    id: 'p1-4',
    name: 'Physics - Class 1 (Sec 4)',
    date: new Date(2025, 5, 9),
    time: '1:00 PM - 3:00 PM',
    classNo: 4,
  },
  {
    id: 'p1-5',
    name: 'Physics - Class 1 (Sec 4)',
    date: new Date(2025, 5, 11),
    time: '1:00 PM - 3:00 PM',
    classNo: 5,
  },
  {
    id: 'p1-6',
    name: 'Physics - Class 1 (Sec 4)',
    date: new Date(2025, 5, 13),
    time: '1:00 PM - 3:00 PM',
    classNo: 6,
  },

  // Physics Class 2 (Sec 4)
  {
    id: 'p2-1',
    name: 'Physics - Class 2 (Sec 4)',
    date: new Date(2025, 5, 3),
    time: '1:00 PM - 3:00 PM',
    classNo: 1,
  },
  {
    id: 'p2-2',
    name: 'Physics - Class 2 (Sec 4)',
    date: new Date(2025, 5, 5),
    time: '1:00 PM - 3:00 PM',
    classNo: 2,
  },
  {
    id: 'p2-3',
    name: 'Physics - Class 2 (Sec 4)',
    date: new Date(2025, 5, 7),
    time: '1:00 PM - 3:00 PM',
    classNo: 3,
  },
  {
    id: 'p2-4',
    name: 'Physics - Class 2 (Sec 4)',
    date: new Date(2025, 5, 10),
    time: '1:00 PM - 3:00 PM',
    classNo: 4,
  },
  {
    id: 'p2-5',
    name: 'Physics - Class 2 (Sec 4)',
    date: new Date(2025, 5, 12),
    time: '1:00 PM - 3:00 PM',
    classNo: 5,
  },
  {
    id: 'p2-6',
    name: 'Physics - Class 2 (Sec 4)',
    date: new Date(2025, 5, 14),
    time: '1:00 PM - 3:00 PM',
    classNo: 6,
  },

  // Physics Class 3 (Sec 3)
  {
    id: 'p3-1',
    name: 'Physics - Class 3 (Sec 3)',
    date: new Date(2025, 5, 2),
    time: '4:00 PM - 6:00 PM',
    classNo: 1,
  },
  {
    id: 'p3-2',
    name: 'Physics - Class 3 (Sec 3)',
    date: new Date(2025, 5, 6),
    time: '4:00 PM - 6:00 PM',
    classNo: 2,
  },
  {
    id: 'p3-3',
    name: 'Physics - Class 3 (Sec 3)',
    date: new Date(2025, 5, 11),
    time: '4:00 PM - 6:00 PM',
    classNo: 3,
  },

  // Physics Class 4 (Sec 3)
  {
    id: 'p4-1',
    name: 'Physics - Class 4 (Sec 3)',
    date: new Date(2025, 5, 3),
    time: '4:00 PM - 6:00 PM',
    classNo: 1,
  },
  {
    id: 'p4-2',
    name: 'Physics - Class 4 (Sec 3)',
    date: new Date(2025, 5, 7),
    time: '4:00 PM - 6:00 PM',
    classNo: 2,
  },
  {
    id: 'p4-3',
    name: 'Physics - Class 4 (Sec 3)',
    date: new Date(2025, 5, 12),
    time: '4:00 PM - 6:00 PM',
    classNo: 3,
  },

  // Chemistry Class 1 (Sec 4)
  {
    id: 'c1-1',
    name: 'Chemistry - Class 1 (Sec 4)',
    date: new Date(2025, 5, 15),
    time: '2:00 PM - 4:00 PM',
    classNo: 1,
  },
  {
    id: 'c1-2',
    name: 'Chemistry - Class 1 (Sec 4)',
    date: new Date(2025, 5, 20),
    time: '2:00 PM - 4:00 PM',
    classNo: 2,
  },
  {
    id: 'c1-3',
    name: 'Chemistry - Class 1 (Sec 4)',
    date: new Date(2025, 5, 22),
    time: '2:00 PM - 4:00 PM',
    classNo: 3,
  },
  {
    id: 'c1-4',
    name: 'Chemistry - Class 1 (Sec 4)',
    date: new Date(2025, 5, 27),
    time: '2:00 PM - 4:00 PM',
    classNo: 4,
  },
  {
    id: 'c1-5',
    name: 'Chemistry - Class 1 (Sec 4)',
    date: new Date(2025, 5, 29),
    time: '2:00 PM - 4:00 PM',
    classNo: 5,
  },
]

// Class summary data
const classSummary = [
  {
    name: 'Physics - Class 1 (Sec 4)',
    level: 'Secondary 4',
    sessions: 6,
    feeExisting: '$430',
    feeNew: '$480',
    studentLimit: 'Max 3 students',
    timeSlot: '1:00 PM - 3:00 PM',
  },
  {
    name: 'Physics - Class 2 (Sec 4)',
    level: 'Secondary 4',
    sessions: 6,
    feeExisting: '$430',
    feeNew: '$480',
    studentLimit: 'Max 3 students',
    timeSlot: '1:00 PM - 3:00 PM',
  },
  {
    name: 'Physics - Class 3 (Sec 3)',
    level: 'Secondary 3',
    sessions: 3,
    feeExisting: '$210',
    feeNew: '$240',
    studentLimit: 'Max 3 students',
    timeSlot: '4:00 PM - 6:00 PM',
    notes: 'Shortened version of Class 1',
  },
  {
    name: 'Physics - Class 4 (Sec 3)',
    level: 'Secondary 3',
    sessions: 3,
    feeExisting: '$210',
    feeNew: '$240',
    studentLimit: 'Max 3 students',
    timeSlot: '4:00 PM - 6:00 PM',
    notes: 'Shortened version of Class 2',
  },
  {
    name: 'Chemistry - Class 1 (Sec 4)',
    level: 'Secondary 4',
    sessions: 5,
    feeExisting: '$350',
    feeNew: '$400',
    studentLimit: 'Max 3 students',
    timeSlot: '2:00 PM - 4:00 PM',
  },
]

export function ClassScheduleCalendar() {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null)
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [calendarDays, setCalendarDays] = useState<Date[][]>([])
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showGlow, setShowGlow] = useState(false)
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const classDetailsRef = useRef<HTMLDivElement>(null)

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true)
      }
    }

    const container = calendarContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [hasScrolled])

  // Generate calendar days for June 2024
  useEffect(() => {
    const year = 2025
    const month = 5 // June (0-indexed)

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Create a 2D array for weeks
    const calendar: Date[][] = []
    let week: Date[] = []

    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1)
      week.push(prevMonthDay)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      week.push(date)

      // Start a new week if we've reached Sunday or the end of the month
      if (week.length === 7) {
        calendar.push(week)
        week = []
      }
    }

    // Add empty slots for days after the last day of the month
    if (week.length > 0) {
      const daysToAdd = 7 - week.length
      for (let i = 1; i <= daysToAdd; i++) {
        const nextMonthDay = new Date(year, month + 1, i)
        week.push(nextMonthDay)
      }
      calendar.push(week)
    }

    setCalendarDays(calendar)
  }, [])

  // Group classes by date for the calendar view
  const classesByDate = classData.reduce(
    (acc, cls) => {
      const dateStr = cls.date.toDateString()
      if (!acc[dateStr]) {
        acc[dateStr] = []
      }
      acc[dateStr].push(cls)
      return acc
    },
    {} as Record<string, typeof classData>,
  )

  // Toggle class selection
  const toggleClassSelection = (className: string) => {
    const isMobile = window.innerWidth < 768 // Detect mobile viewport

    setSelectedClasses((prev) => {
      if (prev.includes(className)) {
        return prev.filter((c) => c !== className)
      } else {
        // Show and animate the glow effect on mobile
        if (isMobile) {
          setShowGlow(true)
          // Hide the glow after a short time
          setTimeout(() => setShowGlow(false), 2500)
        }
        return [...prev, className]
      }
    })
  }

  // Clear all selections
  const clearSelections = () => {
    setSelectedClasses([])
  }

  // Check if a class should be visible based on hover and selection states
  const isClassVisible = (className: string) => {
    if (selectedClasses.length === 0 && !hoveredClass) return true
    if (hoveredClass === className) return true
    if (selectedClasses.includes(className)) return true
    return false
  }

  // Get opacity for a class based on hover and selection states
  const getClassOpacity = (className: string) => {
    if (selectedClasses.length === 0 && !hoveredClass) return 'opacity-100'
    if (hoveredClass === className) return 'opacity-100'
    if (selectedClasses.includes(className)) return 'opacity-100'
    if (hoveredClass || selectedClasses.length > 0) return 'opacity-60'
    return 'opacity-100'
  }

  return (
    <div className="relative space-y-6">
      {/* Simple bottom glow effect when a class is selected */}
      {showGlow && (
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 transition-opacity duration-300 md:hidden">
          {/* Simple gradient glow */}
          <div className="h-28 animate-pulse bg-gradient-to-t from-amber-500/30 to-transparent"></div>

          {/* Clean indicator with subtle shadow */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-amber-100 bg-white shadow-md">
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-amber-500">↓</span>
              <span className="text-sm font-medium text-amber-600">
                See details below
              </span>
              <span className="text-amber-500">↓</span>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Class List Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-2 sm:p-4">
              <div className="mb-4 flex items-center justify-start gap-2">
                <h2 className="text-xl font-semibold">Classes</h2>
                <p className="text-sm text-slate-600">pick 1 or more</p>
                {selectedClasses.length > 0 && (
                  <button
                    onClick={clearSelections}
                    className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-200"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {Object.entries(classTypes).map(([className, { color }]) => (
                  <div
                    key={className}
                    className={cn(
                      'cursor-pointer rounded-lg border p-3 transition-all duration-300',
                      selectedClasses.includes(className)
                        ? 'bg-amber-50/30 shadow-sm ring-1 ring-amber-200'
                        : 'border-gray-100 hover:border-amber-200 hover:bg-amber-50/10',
                      hoveredClass === className ? 'bg-amber-50/20' : '',
                    )}
                    onMouseEnter={() => setHoveredClass(className)}
                    onMouseLeave={() => setHoveredClass(null)}
                    onClick={() => toggleClassSelection(className)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full ${color} shadow-sm`}
                      ></div>
                      <span className="font-semibold">{className}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-600">
                      <span>
                        {
                          classSummary.find((c) => c.name === className)
                            ?.timeSlot
                        }
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {
                          classSummary.find((c) => c.name === className)
                            ?.sessions
                        }{' '}
                        sessions
                      </span>
                      {selectedClasses.includes(className) && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Calendar View */}
        <div className="md:col-span-2 lg:col-span-3">
          <Card>
            <CardContent
              className="relative overflow-auto p-2 sm:p-4"
              ref={calendarContainerRef}
            >
              <div className="sticky left-0 right-0 z-10 mb-4 bg-white">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-bold text-amber-700">
                    June 2025
                  </h2>
                  <span className="self-start rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 text-sm text-white shadow-sm sm:self-auto">
                    Summer Schedule
                  </span>
                </div>
              </div>

              {/* Calendar Header - This will scroll with calendar */}
              <div className="mb-2 grid min-w-[800px] grid-cols-7 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                  (day) => (
                    <div
                      key={day}
                      className="py-2 text-center font-medium text-gray-700"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* Calendar Grid */}
              <div className="relative clear-right min-w-[800px] overflow-hidden rounded-lg border shadow-sm">
                {calendarDays.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="grid grid-cols-7 border-b last:border-b-0"
                  >
                    {week.map((day, dayIndex) => {
                      const isCurrentMonth = day.getMonth() === 5
                      const dateStr = day.toDateString()
                      const dayClasses = classesByDate[dateStr] || []
                      const isToday = new Date().toDateString() === dateStr

                      return (
                        <div
                          key={dayIndex}
                          className={cn(
                            'min-h-[120px] min-w-[110px] border-r p-1 transition-all duration-200 last:border-r-0',
                            isCurrentMonth
                              ? 'bg-white hover:bg-orange-50/30'
                              : 'bg-gray-50',
                            isToday ? 'bg-amber-50/50' : '',
                            dayClasses.length > 0
                              ? 'ring-1 ring-inset ring-amber-100'
                              : '',
                          )}
                        >
                          <div className="p-1 text-right">
                            <span
                              className={cn(
                                'inline-block h-6 w-6 rounded-full text-center text-sm leading-6',
                                isCurrentMonth
                                  ? 'text-gray-900'
                                  : 'text-gray-400',
                                isToday
                                  ? 'bg-amber-500 font-bold text-white'
                                  : '',
                                dayClasses.length > 0 && !isToday
                                  ? 'font-semibold'
                                  : '',
                              )}
                            >
                              {day.getDate()}
                            </span>
                          </div>

                          {/* Class Events */}
                          <div className="mt-1 space-y-1">
                            {dayClasses.map((cls) => {
                              const { color, hoverColor } =
                                classTypes[cls.name as keyof typeof classTypes]
                              const isHovered = hoveredClass === cls.name
                              const isSelected = selectedClasses.includes(
                                cls.name,
                              )
                              const isVisible = isClassVisible(cls.name)

                              if (!isVisible && selectedClasses.length > 0)
                                return null

                              return (
                                <div
                                  key={cls.id}
                                  className={cn(
                                    'rounded-md p-1.5 text-xs shadow-sm transition-all duration-200 hover:shadow sm:p-2',
                                    isHovered || isSelected
                                      ? hoverColor
                                      : color,
                                    getClassOpacity(cls.name),
                                    'text-white',
                                    isSelected || isHovered
                                      ? 'translate-y-0 scale-105'
                                      : '',
                                  )}
                                  onClick={() => toggleClassSelection(cls.name)}
                                >
                                  <div className="truncate font-medium">
                                    {cls.name.split(' - ')[0]}
                                  </div>
                                  <div className="truncate font-semibold">
                                    Class {cls.classNo}
                                  </div>
                                  <div className="mt-0.5 truncate text-[10px] opacity-90 sm:mt-1 sm:text-xs">
                                    {cls.time}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Class Details Section - Now below everything */}
      <Card
        className="mt-10 overflow-hidden border border-gray-100 shadow-sm"
        ref={classDetailsRef}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-60"></div>
        <CardContent className="p-2 sm:p-6 md:p-8">
          <h2 className="mb-1 text-2xl font-bold text-gray-800">
            Class Details
          </h2>
          <p className="mb-6 text-gray-500">
            Select a class to view more details or to register
          </p>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classSummary
              .sort((a, b) => {
                // Sort selected classes to the top
                const aSelected = selectedClasses.includes(a.name)
                const bSelected = selectedClasses.includes(b.name)
                if (aSelected && !bSelected) return -1
                if (!aSelected && bSelected) return 1
                return 0
              })
              .map((cls) => {
                const isSelected = selectedClasses.includes(cls.name)
                const { color } =
                  classTypes[cls.name as keyof typeof classTypes]

                return (
                  <div
                    key={cls.name}
                    className={cn(
                      'transform overflow-hidden rounded-xl transition-all duration-300',
                      'border border-gray-100 bg-white hover:border-amber-200 hover:shadow-lg',
                      isSelected
                        ? 'scale-102 shadow-md ring-1 ring-amber-300'
                        : 'shadow-sm',
                      isSelected || hoveredClass === cls.name
                        ? 'translate-y-0 opacity-100'
                        : selectedClasses.length > 0 || hoveredClass
                          ? 'translate-y-1 opacity-60'
                          : 'opacity-100',
                    )}
                    onMouseEnter={() => setHoveredClass(cls.name)}
                    onMouseLeave={() => setHoveredClass(null)}
                    onClick={() => toggleClassSelection(cls.name)}
                  >
                    <div className="relative px-3 py-4 sm:px-6 sm:py-5 md:px-6 md:py-6">
                      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-70"></div>
                      <div className="relative mb-4 flex items-center gap-3">
                        <div
                          className={`h-6 w-6 rounded-full ${color} flex-shrink-0 shadow-sm`}
                        ></div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {cls.name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-4">
                          <div className="w-1/3 text-sm text-gray-500">
                            Level
                          </div>
                          <div className="w-2/3 font-medium">{cls.level}</div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-1/3 text-sm text-gray-500">
                            Time
                          </div>
                          <div className="w-2/3 font-medium">
                            {cls.timeSlot}
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-1/3 text-sm text-gray-500">
                            Sessions
                          </div>
                          <div className="w-2/3 font-medium">
                            {cls.sessions} classes
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-1/3 text-sm text-gray-500">
                            Students
                          </div>
                          <div className="w-2/3 font-medium">
                            {cls.studentLimit}
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-1/3 text-sm text-gray-500">Fee</div>
                          <div className="w-2/3">
                            <div className="font-medium">
                              {cls.feeNew}{' '}
                              <span className="text-xs text-gray-500">
                                (new)
                              </span>
                            </div>
                            <div className="text-gray-500">
                              {cls.feeExisting}{' '}
                              <span className="text-xs">(existing)</span>
                            </div>
                          </div>
                        </div>

                        {cls.notes && (
                          <div className="flex items-start gap-4">
                            <div className="w-1/3 text-sm text-gray-500">
                              Notes
                            </div>
                            <div className="w-2/3 font-medium">{cls.notes}</div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="text-sm text-gray-500">
                          {isSelected ? 'Selected' : 'Click to select'}
                        </div>
                        {isSelected ? (
                          <div className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                            <span className="relative inline-flex items-center gap-1">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                              <span>Selected</span>
                            </span>
                          </div>
                        ) : (
                          <div className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
                            Available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
