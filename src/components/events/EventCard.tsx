import React from "react"
import { motion } from "framer-motion"

type EventType = {
  title: string
  startTime: string    // New field
  endTime: string   
  description: string
  link: string
  platform: 'luma' | 'partiful'
  eventType: 'art' | 'yoga' | 'talk' | 'social' | 'other'
  hostedBy: string
  tags: string[]
}

const formatDateTime = (startTime: string, endTime: string) => {
  try {
    if (!startTime || !endTime) {
      return {
        date: 'Date to be announced',
        time: 'Time to be announced'
      }
    }

    const start = new Date(startTime)
    const end = new Date(endTime)
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        date: 'Date to be announced',
        time: 'Time to be announced'
      }
    }

    return {
      date: new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Los_Angeles'
      }).format(start),
      time: `${new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/Los_Angeles'
      }).format(start)} - ${new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/Los_Angeles'
      }).format(end)}`
    }
  } catch (error) {
    return {
      date: 'Date to be announced',
      time: 'Time to be announced'
    }
  }
}


const EventCard = ({ event }: { event: EventType }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium">{event.title}</h3>
        <span className="bg-orange-50 text-orange-800 text-xs px-2 py-1 rounded border border-orange-100">  
          {event.eventType}
        </span>
      </div>
      <p className="text-gray-500 text-sm">
        {formatDateTime(event.startTime, event.endTime).date}
      </p>
      <p className="text-gray-500 text-sm">
        {formatDateTime(event.startTime, event.endTime).time}
      </p>
      <p className="text-gray-600 text-sm mt-1">Hosted by {event.hostedBy}</p>
      <p className="mt-4 text-gray-700">{event.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {event.tags.map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <a 
        href={event.link}
        target="_blank"
        rel="noopener noreferrer" 
        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <span>View on {event.platform}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </motion.div>
  )
}

export default EventCard