import type { SubjectClass } from '@/data/classes'
import React from 'react'

interface ClassPromotionsProps {
  promotions: SubjectClass['promotions']
}

const ClassPromotions: React.FC<ClassPromotionsProps> = ({ promotions }) => {
  if (!promotions || promotions.length === 0) return null

  return (
    <div className="mb-4">
      <h4 className="mb-4 text-2xl font-bold text-gray-800">Promotions</h4>
      {promotions.map((promotion, index) => (
        <div key={index} className="text-md mt-2">
          <p className="font-semibold">{promotion.title}</p>
          <p className="text-sm">{promotion.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ClassPromotions
