import type { SubjectClass } from '@/data/classes'
import React from 'react'

interface ClassPricingInfoProps {
  classData: SubjectClass
}

const ClassPricingInfo: React.FC<ClassPricingInfoProps> = ({ classData }) => {
  const { pricing, classSize, onlinePricing, perLessonPricing } = classData

  return (
    <div className="rounded-lg">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">
        Pricing {classData.perLessonPricing ? '(per lesson)' : ''}
      </h3>
      <div className="mb-6 flex flex-wrap gap-4">
        {pricing && (
          <div className="inline-block overflow-hidden rounded-full transition-all hover:scale-105">
            <div className="bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200 px-6 py-3 transition-all duration-300 hover:from-pink-300 hover:via-orange-300 hover:to-yellow-300">
              <p className="text-xl font-semibold text-gray-800">
                In-Person: {pricing.currency} {pricing.amount}
              </p>
            </div>
          </div>
        )}
        {onlinePricing && (
          <div className="inline-block overflow-hidden rounded-full transition-all hover:scale-105">
            <div className="bg-gradient-to-r from-blue-200 via-teal-200 to-green-200 px-6 py-3 transition-all duration-300 hover:from-blue-300 hover:via-teal-300 hover:to-green-300">
              <p className="text-xl font-semibold text-gray-800">
                Online: {onlinePricing.currency} {onlinePricing.amount}
              </p>
            </div>
          </div>
        )}
      </div>
      {classSize && (
        <div className="text-md mt-2">
          <p className="font-semibold">Class Size</p>
          <p className="text-sm">Limited to {classSize} students</p>
        </div>
      )}
      {perLessonPricing && (
        <div className="text-md mt-2">
          <p className="font-semibold">Payment Flexibility</p>
          <p className="text-sm">
            Choose between monthly or termly payment options
          </p>
        </div>
      )}
      <div className="mt-5 flex">
        <p className="text-sm">Contact us to get a quotation</p>
      </div>
    </div>
  )
}

export default ClassPricingInfo
