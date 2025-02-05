import Airtable from 'airtable'

export interface Event {
  id: string
  title: string
  startTime: string    // New field
  endTime: string   
  description: string
  link: string
  platform: 'luma' | 'partiful' | 'eventbrite' | 'meetup' | 'others'
  eventType: 'art' | 'meditation' | 'talk' | 'social' | 'classes' | 'others'
  hostedBy: string
  tags: string[]

}

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT })
  .base(process.env.AIRTABLE_BASE_ID!)

  
  export const getEvents = async (): Promise<Event[]> => {
    try {
      const records = await base('Events')
        .select({
          filterByFormula: "Status='Approved'",  // Only approved events
          sort: [{ field: 'StartTime', direction: 'asc' }]
        })
        .all()
  
      const events = records.map(record => {
        try {
          return {
            id: record.id,
            title: record.get('Title') as string || 'Untitled Event',
            startTime: record.get('StartTime') as string || '',
            endTime: record.get('EndTime') as string || '',
            description: record.get('EventDescription') as string || '',
            link: record.get('Link') as string || '#',
            platform: ((record.get('Platform') as string)?.toLowerCase() || 'other') as 'luma' | 'partiful',
            eventType: ((record.get('EventType') as string)?.toLowerCase() || 'other') as 'art' | 'yoga' | 'talk' | 'social' | 'other',
            hostedBy: record.get('HostedBy') as string || 'Anonymous',
            tags: Array.isArray(record.get('Tags')) ? record.get('Tags') as string[] : [],
          }
        } catch (error) {
          console.error('Error processing record:', error)
          return null
        }
      }).filter(Boolean) as Event[]
  
      return events
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }