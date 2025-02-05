import * as React from "react"
import { motion } from "framer-motion"
import Layout from "../components/layout/Layout"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => {
  return (
    <Layout>
      <main className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Title and Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-left"
            >
              <div>
                <span className="text-5xl font-light tracking-wider text-gray-800">The</span>
                <motion.span
                  className="text-6xl font-light tracking-wider text-gray-800 ml-4 inline-block"
                  animate={{ 
                    rotate: [-1, 1, -1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Nook
                </motion.span>
              </div>
              <motion.p 
                className="mt-6 text-xl text-gray-600 tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                A community art collective in San Francisco
                <br />
                <span className="text-lg text-gray-500">
                  1242 Market St, San Francisco, CA 94103
                </span>
              </motion.p>
            </motion.div>

            {/* Right Column - Welcome Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl transform -rotate-1"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-light mb-6 text-gray-800">Welcome</h2>
                
                <div className="space-y-6 text-gray-600">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-800">So what is this place?</h3>
                    <p>The Nook is San Francisco's newest communal living room/art collective/event space. Basically, it's a living, breathing experiment to connect people across this great city of ours.</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 text-gray-800">What can I do here?</h3>
                    <p>Whatever you want! (That's the best part) You want to host an event? Do it here! You want to film a music video? This is the place! You want to hold a weekly dance class? Have you seen these hard wood floors?! You want to get together for a weekly Bollywood movie night? Look no further than The Nook! Need a place to just hang and work with friends? Our door is open!</p>
                  </div>

                  <p className="text-lg font-light italic">You have a dream? Let's make it happen at The Nook!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Message */}
        <motion.div 
      className="absolute bottom-0 left-0 right-0 py-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <p className="text-orange-700 text-sm">
        ⚠️ The Space is currently being set up. Give us a couple of weeks before walking in.
      </p>
    </motion.div>
      </main>
    </Layout>
  )
}

export default IndexPage