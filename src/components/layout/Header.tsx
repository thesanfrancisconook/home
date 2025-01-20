import React from "react"
import { Link } from "gatsby"

const Header = () => {
    return (
      <header className="fixed w-full top-0 backdrop-blur-sm z-10">
        <nav className="max-w-6xl mx-auto px-4">  {/* Changed max-w-5xl to max-w-6xl and px-6 to px-4 */}
          <div className="flex justify-between items-center py-5">
            <Link 
              to="/" 
              className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
            >
              The Nook
            </Link>
            <div className="flex space-x-6">
              <Link 
                to="/events" 
                className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                Events
              </Link>
              <a 
                href="https://thesfnook.substack.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                Newsletter
              </a>
            </div>
          </div>
        </nav>
      </header>
    )
  }

export default Header