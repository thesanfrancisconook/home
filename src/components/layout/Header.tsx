import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"

const Header = () => {
    return (
      <header className="fixed w-full top-0 backdrop-blur-sm z-10">
        <nav className="max-w-6xl mx-auto px-4">  {/* Changed max-w-5xl to max-w-6xl and px-6 to px-4 */}
          <div className="flex justify-between items-center py-5">
          <Link to="/" className="flex items-center space-x-2">
            <StaticImage
              src="../../images/Nook_logo.png"
              alt="The Nook"
              height={90}  // Increased from 24 to 40
              placeholder="blurred"
              className="w-auto"
              quality={95}
            />
          </Link>
            <div className="flex space-x-6">
            <Link 
              to="/events" 
              className="text-xl text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              <span className="relative z-10">Events</span>
              <motion.span
                className="absolute inset-0 bg-orange-100 rounded-lg opacity-0"
                animate={{
                  opacity: [0, 0.2, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Link>

            </div>
          </div>
        </nav>
      </header>
    )
  }

export default Header