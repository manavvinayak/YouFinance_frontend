import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {" "}
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20 md:py-32 flex items-center justify-center mb-5"
        style={{ 
          minHeight: "80vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Take Control of Your Finances</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Effortlessly manage your money, track expenses, and achieve your financial goals with the YouFinance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
                Get Started
              </span>
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 ease-out transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
      {/* Key Feature Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text">Features Designed for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Smart Reporting</h3>
              <p className="text-gray-700">Visualize your spending with intuitive charts and detailed reports.</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Secure & Private</h3>
              <p className="text-gray-700">Your financial data is protected with industry-standard security.</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Mobile-First Design</h3>
              <p className="text-gray-700">Manage your money anytime, anywhere, on any device.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Your Money?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users who are taking control of their financial future.
          </p>
          <Link 
            to="/signup" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center group-hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Sign Up Now
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
