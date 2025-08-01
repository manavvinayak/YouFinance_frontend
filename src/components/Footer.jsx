import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-text text-white p-6 mt-auto">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} The YouFinance. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/about" className="hover:text-accent transition-colors">
            About Us
          </Link>
          <Link to="#" className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-accent transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
