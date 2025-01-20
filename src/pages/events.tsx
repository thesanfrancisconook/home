import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import EventCard from "../components/events/EventCard"
import EventFilters from "../components/events/EventFilters"
import { motion } from "framer-motion"
import { getEvents, Event } from "../services/Airtable"

const ITEMS_PER_PAGE = 6

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getEvents()
      .then(fetchedEvents => {
        setEvents(fetchedEvents)
        setLoading(false)
      })
  }, [])

  // Group events by month
// Group events by month
const groupedEvents = events.reduce((groups, event) => {
    try {
      const date = event.startTime ? new Date(event.startTime) : new Date()
      const monthYear = !isNaN(date.getTime()) 
        ? date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
        : 'Upcoming Events'
      
      if (!groups[monthYear]) {
        groups[monthYear] = []
      }
      groups[monthYear].push(event)
      return groups
    } catch (error) {
      if (!groups['Upcoming Events']) {
        groups['Upcoming Events'] = []
      }
      groups['Upcoming Events'].push(event)
      return groups
    }
  }, {} as Record<string, Event[]>)

  // Filter events
  const filteredEvents = Object.entries(groupedEvents).reduce((acc, [month, monthEvents]) => {
    const filtered = monthEvents.filter(event => {
      if (selectedType && event.eventType !== selectedType) return false
      if (selectedMonth && !month.includes(selectedMonth)) return false
      return true
    })
    if (filtered.length > 0) {
      acc[month] = filtered
    }
    return acc
  }, {} as Record<string, Event[]>)

  // Calculate pagination
  const totalEvents = Object.values(filteredEvents).flat().length
  const totalPages = Math.ceil(totalEvents / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return (
    <Layout>
       <main className="flex-grow pt-24 px-4 max-w-6xl mx-auto w-full">
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
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Your Event
          </a>
        </motion.div>

        <div className="mb-8">
          <h1 className="text-4xl font-light mb-8">Upcoming Events</h1>
          <EventFilters 
            selectedType={selectedType}
            selectedMonth={selectedMonth}
            onTypeChange={setSelectedType}
            onMonthChange={setSelectedMonth}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse">Loading events...</div>
          </div>
        ) : (
          <>
            {Object.entries(filteredEvents)
              .slice(startIndex / ITEMS_PER_PAGE, Math.ceil(endIndex / ITEMS_PER_PAGE))
              .map(([month, monthEvents]) => (
                <div key={month} className="mb-12">
                  <h2 className="text-2xl font-light mb-6">{month}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {monthEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8 mb-12">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  )
}

export default EventsPage