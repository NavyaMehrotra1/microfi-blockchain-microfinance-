import { useState } from 'react'
import { Plus, TrendingUp, Clock, DollarSign, AlertCircle } from 'lucide-react'
import { useWallet } from '../contexts/WalletContext'
import Tooltip from '../components/Tooltip'
import { formatSOL, calculateMonthlyPayment } from '../lib/utils'
import CreateLoanModal from '../components/CreateLoanModal'
import LoanCard from '../components/LoanCard'

const LoanMarketplace = () => {
  const { wallet } = useWallet()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState('all') // all, borrower, lender

  // Mock loan data - in production, this would come from blockchain
  const [loans] = useState([
    {
      id: 1,
      borrower: '7xKX...9mPq',
      amount: 2.5,
      interestRate: 8,
      duration: 12,
      purpose: 'Small Business Expansion',
      status: 'active',
      funded: 1.5,
      description: 'Need funds to expand my local bakery and purchase new equipment.',
      riskScore: 'Low',
    },
    {
      id: 2,
      borrower: '4nQw...7kLm',
      amount: 5.0,
      interestRate: 10,
      duration: 24,
      purpose: 'Education',
      status: 'active',
      funded: 3.2,
      description: 'Pursuing online certification in blockchain development.',
      riskScore: 'Medium',
    },
    {
      id: 3,
      borrower: '9pRt...3xYz',
      amount: 1.0,
      interestRate: 6,
      duration: 6,
      purpose: 'Emergency Medical',
      status: 'active',
      funded: 0.8,
      description: 'Unexpected medical expenses for family member.',
      riskScore: 'Low',
    },
    {
      id: 4,
      borrower: '2mKl...5vBn',
      amount: 3.5,
      interestRate: 9,
      duration: 18,
      purpose: 'Agricultural Equipment',
      status: 'active',
      funded: 0.5,
      description: 'Purchase irrigation system for small farm to increase crop yield.',
      riskScore: 'Medium',
    },
  ])

  const stats = [
    { label: 'Total Loans', value: loans.length, icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Avg Interest', value: '8.25%', icon: <DollarSign className="w-5 h-5" /> },
    { label: 'Active Loans', value: loans.filter(l => l.status === 'active').length, icon: <Clock className="w-5 h-5" /> },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Loan Marketplace</h1>
          <p className="text-lg text-slate-600">
            Browse available microloans or create your own loan request
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          disabled={!wallet}
          className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Request Loan</span>
        </button>
      </div>

      {!wallet && (
        <div className="card bg-amber-50 border-amber-200 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Connect Your Wallet</h3>
              <p className="text-amber-800">
                Connect your Phantom wallet to request loans or fund existing loan requests.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg text-primary-600">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm font-medium text-slate-700">Filter:</span>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Loans
        </button>
        <button
          onClick={() => setFilter('low-risk')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'low-risk'
              ? 'bg-primary-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Low Risk
        </button>
        <button
          onClick={() => setFilter('high-return')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'high-return'
              ? 'bg-primary-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          High Return
        </button>
      </div>

      {/* Educational Banner */}
      <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200 mb-8">
        <div className="flex items-start space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Tooltip content="Learn about how peer-to-peer lending works on the blockchain" icon />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">💡 How Marketplace Works</h3>
            <p className="text-sm text-slate-700 mb-2">
              <strong>For Borrowers:</strong> Create a loan request with your desired amount, interest rate, and repayment period. 
              Once fully funded, SOL is transferred to your wallet instantly.
            </p>
            <p className="text-sm text-slate-700">
              <strong>For Lenders:</strong> Browse loan requests and fund those that match your risk tolerance. 
              Earn interest as borrowers make repayments. All transactions are secured by smart contracts.
            </p>
          </div>
        </div>
      </div>

      {/* Loan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>

      {/* Create Loan Modal */}
      {showCreateModal && (
        <CreateLoanModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}

export default LoanMarketplace
