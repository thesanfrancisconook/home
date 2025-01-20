import * as React from "react"
import { motion } from "framer-motion"
import Header from "../components/layout/Header"
import Layout from "../components/layout/Layout"

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Layout>
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-5xl font-light tracking-wider text-gray-800">The</span>
            <motion.span
              className="text-6xl font-light tracking-wider text-gray-800 ml-4 inline-block"
              animate={{ 
                rotate: [-1, 1, -1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Nook
            </motion.span>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-xl text-gray-600 tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            A community art collective in San Francisco
          </motion.p>
        </div>
      </main>
      </Layout>
    </div>
  )
}

export default IndexPage