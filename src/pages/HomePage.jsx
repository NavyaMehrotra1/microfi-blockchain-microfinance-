import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Brain, TrendingUp, Users, Globe } from 'lucide-react'
import Tooltip from '../components/Tooltip'

const HomePage = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Advice',
      description: 'Get personalized financial guidance from Google Gemini AI',
      tooltip: 'Our AI analyzes your financial situation and provides tailored recommendations for loans and savings',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Instant transactions on Solana blockchain with near-zero fees',
      tooltip: 'Solana processes 65,000 transactions per second with fees under $0.01',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Transparent',
      description: 'Smart contracts ensure fair and transparent loan terms',
      tooltip: 'All loan agreements are stored on the blockchain, making them immutable and verifiable',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Build Credit',
      description: 'Establish your financial reputation on-chain',
      tooltip: 'Your successful loan repayments create a verifiable credit history on the blockchain',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Peer-to-peer lending connects borrowers and lenders directly',
      tooltip: 'Remove traditional banking intermediaries and connect directly with lenders worldwide',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Access',
      description: 'Financial inclusion for underserved communities worldwide',
      tooltip: 'Anyone with internet access can participate, regardless of location or banking status',
    },
  ]

  const stats = [
    { value: '0.01%', label: 'Transaction Fees' },
    { value: '<1s', label: 'Transaction Time' },
    { value: '24/7', label: 'AI Support' },
    { value: '100%', label: 'Transparent' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent animate-slide-up">
              Democratizing Microfinance
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto animate-slide-up">
              AI-powered financial advice meets blockchain technology. 
              Access microloans with <span className="font-bold text-primary-600">zero barriers</span> and <span className="font-bold text-accent-600">near-zero fees</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/marketplace" className="btn-primary flex items-center space-x-2 text-lg">
                <span>Explore Loans</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/ai-advisor" className="btn-secondary flex items-center space-x-2 text-lg">
                <Brain className="w-5 h-5" />
                <span>Talk to AI Advisor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-800 py-12 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose MicroFi?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We combine cutting-edge AI and blockchain technology to make microfinance accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-3 rounded-lg text-primary-600 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <Tooltip content={feature.tooltip} icon />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Connect Wallet</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Install Phantom wallet and connect to MicroFi with one click
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Get AI Advice</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Chat with our Gemini AI advisor to find the perfect loan for you
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Request Loan</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Submit your loan request and get funded in seconds on Solana
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center justify-center space-x-2">
              <span>Learn more about how MicroFi works</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users accessing fair and transparent microfinance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg">
              Browse Loans
            </Link>
            <Link to="/ai-advisor" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
              Talk to AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
