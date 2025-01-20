import React from 'react'
import { motion } from 'framer-motion'

interface FilterProps {
  selectedType: string | null
  selectedMonth: string | null
  onTypeChange: (type: string | null) => void
  onMonthChange: (month: string | null) => void
}

const EventFilters = ({ selectedType, selectedMonth, onTypeChange, onMonthChange }: FilterProps) => {
  const eventTypes = ['all', 'art', 'yoga', 'talk', 'social', 'other']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="space-x-2">
        {eventTypes.map(type => (
          <button
            key={type}
            onClick={() => onTypeChange(type === 'all' ? null : type)}
            className={`px-4 py-2 rounded-full text-sm ${
              (selectedType === type || (type === 'all' && !selectedType))
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default EventFilters