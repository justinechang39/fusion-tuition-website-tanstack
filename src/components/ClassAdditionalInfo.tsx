import type { SubjectClass } from '@/data/classes'
import React from 'react'

interface ClassAdditionalInfoProps {
  additionalInfo: SubjectClass['additionalInfo']
}

const ClassAdditionalInfo: React.FC<ClassAdditionalInfoProps> = ({
  additionalInfo,
}) => {
  if (!additionalInfo || additionalInfo.length === 0) return null

  return (
    <div>
      <h4 className="mb-4 text-2xl font-bold text-gray-800">
        Additional Information
      </h4>
      {additionalInfo.map((info, index) => (
        <div key={index} className="mt-2">
          <p className="font-semibold">{info.title}</p>
          <p>{info.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ClassAdditionalInfo
