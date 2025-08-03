import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const LandingPage = () => {
  const { user } = useAuth()
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Modern Hero Banner with Glass Morphism */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-32 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-32 left-32 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Modern Typography with Gradient Text */}
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Finance,
              </span>
              <br />
              <span className="text-white">Simplified</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
              Transform your financial journey with powered insights, beautiful visualizations, and effortless money management
            </p>
            
            {/* Conditional Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              {user ? (
                /* Logged in user - Show Dashboard Button */
                <Link 
                  to="/dashboard" 
                  className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Go to Dashboard
                  </span>
                </Link>
              ) : (
                /* Not logged in - Show Login/Signup Buttons */
                <>
                  <Link 
                    to="/signup" 
                    className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center">
                      <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                      Start Free Today
                    </span>
                  </Link>
                  <Link 
                    to="/login" 
                    className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white border-2 border-white/30 backdrop-blur-lg bg-white/10 rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 ease-out transform hover:scale-105"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            
            {/* Modern Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-cyan-400">10K+</div>
                <div className="text-gray-300">Happy Users</div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-400">₹50M+</div>
                <div className="text-gray-300">Money Managed</div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-pink-400">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modern Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to take control of your financial future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Smart Analytics</h3>
                <p className="text-gray-600 leading-relaxed">powered insights that reveal spending patterns and help optimize your financial decisions</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Bank-Level Security</h3>
                <p className="text-gray-600 leading-relaxed">Your data is protected with 256-bit encryption and multi-factor authentication</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Mobile First</h3>
                <p className="text-gray-600 leading-relaxed">Seamless experience across all devices with offline capabilities and real-time sync</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modern Call to Action */}
      {!user && (
        <section className="relative py-20 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute animate-pulse top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute animate-pulse top-20 right-20 w-2 h-2 bg-cyan-300 rounded-full animation-delay-1000"></div>
              <div className="absolute animate-pulse bottom-20 left-20 w-3 h-3 bg-pink-300 rounded-full animation-delay-2000"></div>
              <div className="absolute animate-pulse bottom-10 right-10 w-5 h-5 bg-purple-300 rounded-full animation-delay-3000"></div>
            </div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
                Financial Future?
              </span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed">
              Join thousands of smart individuals who are already building wealth with our platform
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/signup" 
                className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-indigo-600 bg-white rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Start Free - No Credit Card
                </span>
              </Link>
            </div>
            
            <div className="mt-8 text-gray-300">
              <p className="text-sm">✨ Free forever plan • 📱 Works on all devices • 🔒 Bank-level security</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default LandingPage
