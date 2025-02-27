import * as React from "react"
import { motion } from "framer-motion"
import Layout from "../components/layout/Layout"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => {
  return (
    <Layout>
      <main className="min-h-screen flex flex-col pt-28"> 
      <div className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start"> 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center flex flex-col justify-center h-full"
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
                className="mt-6 text-xl text-gray-600 tracking-wide space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                A communal living room in San Francisco
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

              <div className="space-y-6 text-gray-600">
                <p className="leading-relaxed">
                  Welcome to The Nook – San Francisco's newest hub for art, community, and creative expression! Host live music, dance classes, or workshops, or explore our hands-on creative studio for art and making—all without the barriers of high-cost event spaces.
                </p>
                <p className="leading-relaxed">
                Take a moment to simply hang out, co-work, and connect in a space designed for genuine community
                </p>
              </div>
            </div>
            </motion.div>

          </div>
        </div>

        {/* Footer Message */}
        <motion.div 
          className="w-full py-8 text-center relative" // Changed from absolute to relative
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-orange-700 text-sm">
            ⚠️ The Space is currently being set up and not ready for walk-ins.
          </p>
        </motion.div>
      </main>

    </Layout>
  )
}

export default IndexPage