import { useState } from 'react'
import { TrendingUp, Clock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react'
import { useWallet } from '../contexts/WalletContext'
import { formatSOL } from '../lib/utils'
import Tooltip from '../components/Tooltip'

const MyLoans = () => {
  const { wallet } = useWallet()
  const [activeTab, setActiveTab] = useState('borrowed') // borrowed, lent

  // Mock data - in production, fetch from blockchain
  const borrowedLoans = [
    {
      id: 1,
      amount: 2.5,
      interestRate: 8,
      duration: 12,
      monthsRemaining: 10,
      monthlyPayment: 0.2188,
      totalPaid: 0.4376,
      purpose: 'Small Business Expansion',
      status: 'active',
      nextPaymentDate: '2024-12-15',
    },
  ]

  const lentLoans = [
    {
      id: 2,
      borrower: '4nQw...7kLm',
      amount: 1.5,
      interestRate: 10,
      duration: 24,
      monthsRemaining: 20,
      monthlyReturn: 0.0694,
      totalEarned: 0.2776,
      purpose: 'Education',
      status: 'active',
    },
    {
      id: 3,
      borrower: '9pRt...3xYz',
      amount: 0.8,
      interestRate: 6,
      duration: 6,
      monthsRemaining: 0,
      monthlyReturn: 0.1373,
      totalEarned: 0.8238,
      purpose: 'Emergency Medical',
      status: 'completed',
    },
  ]

  const stats = {
    borrowed: {
      total: borrowedLoans.reduce((sum, loan) => sum + loan.amount, 0),
      active: borrowedLoans.filter(l => l.status === 'active').length,
      totalPaid: borrowedLoans.reduce((sum, loan) => sum + loan.totalPaid, 0),
    },
    lent: {
      total: lentLoans.reduce((sum, loan) => sum + loan.amount, 0),
      active: lentLoans.filter(l => l.status === 'active').length,
      totalEarned: lentLoans.reduce((sum, loan) => sum + loan.totalEarned, 0),
    },
  }

  if (!wallet) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="card max-w-md mx-auto">
          <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Connect Your Wallet</h2>
          <p className="text-slate-600">
            Please connect your Phantom wallet to view your loans.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Loans</h1>
        <p className="text-lg text-slate-600">
          Track your borrowed and lent loans, payments, and earnings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('borrowed')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'borrowed'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Borrowed Loans
        </button>
        <button
          onClick={() => setActiveTab('lent')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'lent'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Lent Loans
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {activeTab === 'borrowed' ? (
          <>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Borrowed</p>
                  <p className="text-3xl font-bold text-slate-900">{formatSOL(stats.borrowed.total)} SOL</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Loans</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.borrowed.active}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Paid</p>
                  <p className="text-3xl font-bold text-slate-900">{formatSOL(stats.borrowed.totalPaid)} SOL</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Lent</p>
                  <p className="text-3xl font-bold text-slate-900">{formatSOL(stats.lent.total)} SOL</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Loans</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.lent.active}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Earned</p>
                  <p className="text-3xl font-bold text-slate-900">{formatSOL(stats.lent.totalEarned)} SOL</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Loans List */}
      <div className="space-y-6">
        {activeTab === 'borrowed' ? (
          borrowedLoans.length > 0 ? (
            borrowedLoans.map((loan) => (
              <div key={loan.id} className="card">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{loan.purpose}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {loan.status === 'active' ? '✓ Active' : '✓ Completed'}
                    </span>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-sm text-slate-600">Next Payment</p>
                    <p className="text-lg font-bold text-primary-600">{loan.nextPaymentDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Loan Amount</p>
                    <p className="font-semibold text-slate-900">{formatSOL(loan.amount)} SOL</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Interest Rate</p>
                    <p className="font-semibold text-slate-900">{loan.interestRate}% APR</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Monthly Payment</p>
                    <p className="font-semibold text-slate-900">{formatSOL(loan.monthlyPayment)} SOL</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Months Remaining</p>
                    <p className="font-semibold text-slate-900">{loan.monthsRemaining} / {loan.duration}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Repayment Progress</span>
                    <span className="text-sm font-semibold text-primary-600">
                      {((loan.duration - loan.monthsRemaining) / loan.duration * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all"
                      style={{ width: `${((loan.duration - loan.monthsRemaining) / loan.duration * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full btn-primary">
                  Make Payment ({formatSOL(loan.monthlyPayment)} SOL)
                </button>
              </div>
            ))
          ) : (
            <div className="card text-center py-12">
              <p className="text-slate-600">You haven't borrowed any loans yet.</p>
            </div>
          )
        ) : (
          lentLoans.length > 0 ? (
            lentLoans.map((loan) => (
              <div key={loan.id} className="card">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{loan.purpose}</h3>
                    <p className="text-sm text-slate-600">Borrower: {loan.borrower}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                      loan.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {loan.status === 'active' ? '⏳ Active' : '✓ Completed'}
                    </span>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-sm text-slate-600">Total Earned</p>
                    <p className="text-2xl font-bold text-green-600">{formatSOL(loan.totalEarned)} SOL</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Amount Lent</p>
                    <p className="font-semibold text-slate-900">{formatSOL(loan.amount)} SOL</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Interest Rate</p>
                    <p className="font-semibold text-slate-900">{loan.interestRate}% APR</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Monthly Return</p>
                    <p className="font-semibold text-slate-900">{formatSOL(loan.monthlyReturn)} SOL</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Months Remaining</p>
                    <p className="font-semibold text-slate-900">{loan.monthsRemaining} / {loan.duration}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card text-center py-12">
              <p className="text-slate-600">You haven't lent any loans yet.</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default MyLoans
