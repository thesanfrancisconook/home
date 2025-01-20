import React from "react"
import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <Header />
        {children}
      </div>
    )
  }

export default Layout