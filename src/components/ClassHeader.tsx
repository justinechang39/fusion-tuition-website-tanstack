// ClassHeader.tsx
// This file defines the ClassHeader component used in class detail pages.
// The ClassHeader provides a sticky header with the class title and navigation controls.
// Features include:
// - A back button that navigates to the "/classes" page.
// - Download buttons for the class brochure and the academic calendar.
// - On mobile devices, download options are presented in an AlertDialog for better UX.
// Custom hooks used:
// - useIsMobile: Determines if the user is on a mobile device.
// - useScrollDirection: Detects the scroll direction to adjust the header position.
// Icons from "react-icons" are used for visual elements like buttons.
// Tailwind CSS is used extensively for layout, styling, and responsive design.

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import useIsMobile from '@/hooks/useIsMobile'
import useScrollDirection from '@/hooks/useScrollDirection'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { HiChevronLeft, HiDownload } from 'react-icons/hi'

interface ClassHeaderProps {
  title: string
  brochureStringName?: string
}

const ClassHeader: React.FC<ClassHeaderProps> = ({
  title,
  brochureStringName,
}) => {
  const navigate = useNavigate()
  const scrollDirection = useScrollDirection()
  const isMobile = useIsMobile()
  const topPosition = scrollDirection === 'up' ? 'top-[70px]' : 'top-[50px]'

  const DownloadButton = ({
    type,
    fileName,
  }: {
    type: string
    fileName: string
  }) => (
    <a
      href={`/${fileName}`}
      download
      className="flex items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200 px-3 py-5 text-xs font-medium text-gray-800 transition-colors hover:from-pink-300 hover:via-orange-300 hover:to-yellow-300 sm:text-sm md:py-2"
    >
      <HiDownload className="h-4 w-4" />
      <span>Download {type}</span>
    </a>
  )

  return (
    <div
      className={`sticky ${topPosition} z-40 flex h-20 items-center justify-between bg-white px-4 transition-all duration-300`}
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="outlineHover"
          size="icon"
          onClick={() => {
            void navigate({ to: '/classes' })
          }}
          className="rounded-full"
        >
          <HiChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold sm:text-3xl">{title}</h1>
      </div>
      {isMobile ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outlineHover" size="icon" className="">
              <HiDownload className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Download Options</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col space-y-2">
              <AlertDialogAction asChild>
                {brochureStringName && (
                  <DownloadButton
                    type="Brochure"
                    fileName={brochureStringName}
                  />
                )}
              </AlertDialogAction>
              <AlertDialogAction asChild>
                <DownloadButton
                  type=" Academic Calendar"
                  fileName="fusion_tuition_academic_calendar.pdf"
                />
              </AlertDialogAction>
              <AlertDialogCancel className="bg-red-400 text-white hover:bg-red-300">
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <div className="flex space-x-2">
          {brochureStringName && (
            <DownloadButton type="Brochure" fileName={brochureStringName} />
          )}
          <DownloadButton
            type="Academic Calendar"
            fileName="fusion_tuition_academic_calendar.pdf"
          />
        </div>
      )}
    </div>
  )
}

export default ClassHeader
