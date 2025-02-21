import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Layout from "../components/layout/Layout"

const VisitPage = () => {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")

  // Add Tally script when component mounts
  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://tally.so/widgets/embed.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "NookDayVisit!") {
      setIsAuthenticated(true)
      setError("")
      // Open Tally form in modal
      if (window.Tally) {
        window.Tally.openPopup('nWjl0P', {
          layout: 'modal',
          width: 700,
          hideTitle: false,
        })
      }
    } else {
      setError("Incorrect password. Please check the community board at The Nook.")
    }
  }

  return (
    <Layout>
      <main className="min-h-screen flex flex-col pt-32 px-4">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-light mb-8">Day Pass</h1>
            <p className="text-gray-600 mb-8">
                Already visited The Nook? Enter the password from our community board to request a day pass for your next visit!
                <br />
                <span className="text-sm mt-2 block">
                    (New to The Nook? Join us at an event first to become part of our community!)
                </span>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <button
                type="submit"
                className="px-8 py-3 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </Layout>
  )
}

// Add TypeScript declaration for Tally
declare global {
  interface Window {
    Tally: {
      openPopup: (formId: string, options?: any) => void;
    }
  }
}

export default VisitPage