import React from 'react'
import Header from '../common/Header.jsx'
import Footer from '../common/Footer.jsx'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
  return (
    <div>
      {/* header */}
        <Header />
        {/* main content*/ }
        <main>
          <Outlet />
        </main>
        {/* footer  */}
        <Footer />

    </div>
  )
}

export default UserLayout