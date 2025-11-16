import { Link, useLocation } from 'react-router-dom'
import { Wallet, Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../contexts/ServerWalletContext'
import { truncateAddress, formatSOL } from '../lib/utils'
import Tooltip from './Tooltip'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { wallet, balance, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/my-loans', label: 'My Loans' },
    { path: '/ai-advisor', label: 'AI Advisor' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/impact', label: 'Our Impact' },
    { path: '/how-it-works', label: 'How It Works' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              MicroFi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="hidden md:flex items-center space-x-3">
            {wallet ? (
              <div className="flex items-center space-x-3">
                <Tooltip content="Your SOL balance on Solana devnet">
                  <div className="text-sm">
                    <div className="text-slate-600 dark:text-slate-400">Balance</div>
                    <div className="font-bold text-primary-600">{formatSOL(balance)} SOL</div>
                  </div>
                </Tooltip>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{truncateAddress(wallet.publicKey)}</span>
                </button>
              </div>
            ) : (
              <Tooltip content="Create your Solana account to start using MicroFi">
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isConnecting ? 'Creating Account...' : 'Connect Account'}</span>
                </button>
              </Tooltip>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-200">
              {wallet ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-600">Balance</div>
                    <div className="font-bold text-primary-600">{formatSOL(balance)} SOL</div>
                    <div className="text-xs text-slate-500 mt-1">{truncateAddress(wallet.publicKey, 8)}</div>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="w-full btn-secondary"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full btn-primary"
                >
                  {isConnecting ? 'Creating Account...' : 'Connect Account'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
