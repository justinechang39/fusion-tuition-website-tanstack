import { FreeTrialSection } from '@/components/FreeTrialSection'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'

import { ClassSizeSection } from '@/components/ClassSizeSection'
import { CustomizedExercisesSection } from '@/components/CustomizedExercisesSection'
import { ParentFeedbackSection } from '@/components/ParentFeedbackSection'
import { SchoolPolicySection } from '@/components/SchoolPolicySection'
import { SubjectsSection } from '@/components/SubjectsSection'

const accordionSections = [
  {
    id: 'policy',
    title: 'No School Mixing Policy',
    subtitle: 'Cohesive class environment',
    component: <SchoolPolicySection />,
  },
  {
    id: 'classes',
    title: 'Small Classes, Big Impact',
    subtitle: 'Maximum 3 students per class',
    component: <ClassSizeSection />,
  },

  {
    id: 'subjects',
    title: 'Subjects We Teach',
    subtitle: 'IGCSE, O Level, A Level, IB',
    component: <SubjectsSection />,
  },

  {
    id: 'exercises',
    title: 'Customized Exercises',
    subtitle: 'Targeted learning approach',
    component: <CustomizedExercisesSection />,
  },
  {
    id: 'feedback',
    title: 'Parent Communication',
    subtitle: 'Feedback after every class',
    component: <ParentFeedbackSection />,
  },
  {
    id: 'free-trial',
    title: 'Get 2 FREE Classes',
    subtitle: 'Try our teaching method risk-free',
    component: <FreeTrialSection />,
  },

  // {
  //   id: "students",
  //   title: "We Welcome All Students",
  //   subtitle: "IP, Express, NA, NT, IGCSE, A Level, IB",
  //   component: <StudentTypesSection />,
  // },
]

export function MobileAccordion() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  return (
    <div className="-mx-2 md:hidden">
      <Accordion
        type="multiple"
        value={expandedItems}
        onValueChange={setExpandedItems}
        className="space-y-2 px-0 md:px-2"
      >
        {accordionSections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="rounded-2xl border bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
          >
            <AccordionTrigger
              className={`px-2 py-4 transition-all duration-300 hover:no-underline md:px-3 ${
                expandedItems.includes(section.id)
                  ? 'bg-white/98 sticky top-16 z-40 border-b-2 border-primary/30 py-3 shadow-lg backdrop-blur-md'
                  : 'rounded-t-2xl'
              }`}
            >
              <div className="flex flex-1 flex-col items-start text-left">
                <h3
                  className={`font-semibold ${
                    expandedItems.includes(section.id)
                      ? 'text-base text-primary'
                      : 'text-lg'
                  } transition-all duration-300`}
                >
                  {section.title}
                </h3>
                <p
                  className={`text-muted-foreground ${
                    expandedItems.includes(section.id)
                      ? 'text-xs opacity-70'
                      : 'text-sm'
                  } mt-1 transition-all duration-300`}
                >
                  {section.subtitle}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="overflow-hidden px-0 pb-0 pt-0">
              <div className="px-0 pb-0 pt-0 md:px-3">{section.component}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
