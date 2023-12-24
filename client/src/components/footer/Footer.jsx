import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">
        <p>&copy; 2023 iNotebook</p>
      <div className="contact-info">
        <p>Phone: +91 7667021535</p>
        <p>Email: <a href="mailto:avasaurav12@gmail.com">avasaurav12@gmail.com</a></p>
      </div>
    </div>
  )
}

export default Footer