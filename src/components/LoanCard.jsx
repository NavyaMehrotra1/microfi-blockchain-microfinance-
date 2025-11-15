import { TrendingUp, Clock, Target, Shield } from 'lucide-react'
import { formatSOL, calculateMonthlyPayment } from '../lib/utils'
import Tooltip from './Tooltip'
import { useWallet } from '../contexts/WalletContext'
import { useState } from 'react'

const LoanCard = ({ loan }) => {
  const { wallet } = useWallet()
  const [fundAmount, setFundAmount] = useState('')
  const [isFunding, setIsFunding] = useState(false)

  const fundingPercentage = (loan.funded / loan.amount) * 100
  const monthlyPayment = calculateMonthlyPayment(loan.amount, loan.interestRate, loan.duration)

  const handleFund = async () => {
    if (!wallet || !fundAmount) return
    
    setIsFunding(true)
    // Simulate funding transaction
    setTimeout(() => {
      alert(`Successfully funded ${fundAmount} SOL to this loan!`)
      setIsFunding(false)
      setFundAmount('')
    }, 2000)
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600 bg-green-100'
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'High':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-slate-600 bg-slate-100'
    }
  }

  return (
    <div className="card hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">{loan.purpose}</h3>
          <p className="text-sm text-slate-600">Borrower: {loan.borrower}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(loan.riskScore)}`}>
          {loan.riskScore} Risk
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-700 mb-4">{loan.description}</p>

      {/* Loan Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-primary-600" />
          <div>
            <p className="text-xs text-slate-600">Amount</p>
            <p className="font-semibold text-slate-900">{formatSOL(loan.amount)} SOL</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <div>
            <p className="text-xs text-slate-600">Interest Rate</p>
            <p className="font-semibold text-slate-900">{loan.interestRate}% APR</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <div>
            <p className="text-xs text-slate-600">Duration</p>
            <p className="font-semibold text-slate-900">{loan.duration} months</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-purple-600" />
          <div>
            <p className="text-xs text-slate-600">Monthly Payment</p>
            <Tooltip content="Estimated monthly payment including principal and interest">
              <p className="font-semibold text-slate-900">{formatSOL(monthlyPayment)} SOL</p>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Funding Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Funding Progress</span>
          <span className="text-sm font-semibold text-primary-600">
            {formatSOL(loan.funded)} / {formatSOL(loan.amount)} SOL
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-600 to-accent-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${fundingPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-600 mt-1">{fundingPercentage.toFixed(1)}% funded</p>
      </div>

      {/* Fund Input */}
      {wallet && fundingPercentage < 100 && (
        <div className="flex space-x-2">
          <input
            type="number"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            placeholder="Amount (SOL)"
            step="0.1"
            min="0.1"
            max={loan.amount - loan.funded}
            className="input-field flex-1"
          />
          <button
            onClick={handleFund}
            disabled={!fundAmount || isFunding || parseFloat(fundAmount) > (loan.amount - loan.funded)}
            className="btn-primary whitespace-nowrap"
          >
            {isFunding ? 'Funding...' : 'Fund Loan'}
          </button>
        </div>
      )}

      {fundingPercentage >= 100 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-green-800 font-semibold">✅ Fully Funded</p>
        </div>
      )}
    </div>
  )
}

export default LoanCard
