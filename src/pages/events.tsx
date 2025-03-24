import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import EventCard from "../components/events/EventCard"
import { motion } from "framer-motion"
import { getEvents, Event } from "../services/Airtable"

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [allTypes, setAllTypes] = useState<string[]>([])
  const [showPastEvents, setShowPastEvents] = useState(false)

  useEffect(() => {
    getEvents()
      .then(fetchedEvents => {
        setEvents(fetchedEvents)
        // Extract unique event types
        const types = Array.from(new Set(fetchedEvents.map(event => event.eventType)))
        setAllTypes(types)
        setLoading(false)
      })
  }, [])

  // Filter events based on selected types
  const filteredEvents = selectedTypes.length === 0
    ? events
    : events.filter(event => selectedTypes.includes(event.eventType))

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    // If both events have no date, maintain original order
    if (!a.startTime && !b.startTime) return 0
    // If only one event has no date, put it at the end
    if (!a.startTime) return 1
    if (!b.startTime) return -1
    // Sort by date for events with dates
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  })

  // Split events into upcoming and past
  const now = new Date()
  const upcomingEvents = sortedEvents.filter(event => {
    if (!event.startTime) return true // Include events without dates
    return new Date(event.startTime) >= now
  })
  const pastEvents = sortedEvents.filter(event => {
    if (!event.startTime) return false // Exclude events without dates
    return new Date(event.startTime) < now
  })

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <Layout>
      <main className="flex-grow pt-32 px-4 max-w-6xl mx-auto w-full">
        {/* Host Event CTA */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-light mb-4">Want to host an event?</h2>
          <p className="text-gray-600 mb-6">Join our community and share your creative vision</p>
          <a 
            href="https://tally.so/r/w21pEb" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-100 text-orange-800 border border-orange-200 px-8 py-3 rounded-lg hover:bg-orange-200 transition-colors"  
          >
            Submit Your Event
          </a>
        </motion.div>

        <div className="mb-8">
          <h1 className="text-4xl font-light mb-8">Events</h1>
          {/* Event Type Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-4 py-2 rounded-full text-sm transition-colors inline-flex items-center gap-2 ${
                  selectedTypes.includes(type)
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse">Loading events...</div>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Past Events Toggle */}
            {pastEvents.length > 0 && (
              <div className="relative mb-12">
                {/* Scroll indicator */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <button
                  onClick={() => setShowPastEvents(!showPastEvents)}
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <svg 
                      className={`w-6 h-6 transform transition-transform duration-200 ${showPastEvents ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="text-xl font-light">
                      {showPastEvents ? 'Hide Past Events' : `Show Past Events (${pastEvents.length})`}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-gray-700">
                    {showPastEvents ? 'Click to collapse' : 'Click to expand'}
                  </span>
                </button>

                {/* Past Events Grid */}
                {showPastEvents && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 opacity-75"
                  >
                    {pastEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  )
}

export default EventsPage


