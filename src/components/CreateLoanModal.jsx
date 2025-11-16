import { useState } from 'react'
import { X, Sparkles, AlertCircle } from 'lucide-react'
import { useWallet } from '../contexts/ServerWalletContext'
import { useGemini } from '../contexts/GeminiContext'
import { calculateMonthlyPayment } from '../lib/utils'
import Tooltip from './Tooltip'

const CreateLoanModal = ({ onClose }) => {
  const { wallet } = useWallet()
  const { assessLoanRisk, isLoading } = useGemini()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    amount: '',
    interestRate: '',
    duration: '',
    purpose: '',
    description: '',
  })
  const [aiAssessment, setAiAssessment] = useState(null)

  const purposes = [
    'Small Business',
    'Education',
    'Medical Emergency',
    'Agriculture',
    'Home Improvement',
    'Debt Consolidation',
    'Other',
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGetAIAssessment = async () => {
    try {
      const assessment = await assessLoanRisk({
        amount: parseFloat(formData.amount),
        interestRate: parseFloat(formData.interestRate),
        duration: parseInt(formData.duration),
        purpose: formData.purpose,
        description: formData.description,
      })
      setAiAssessment(assessment)
      setStep(2)
    } catch (error) {
      alert('Failed to get AI assessment. Please try again.')
    }
  }

  const handleSubmit = async () => {
    // Simulate loan creation on blockchain
    alert('Loan request created successfully! It will appear in the marketplace shortly.')
    onClose()
  }

  const monthlyPayment = formData.amount && formData.interestRate && formData.duration
    ? calculateMonthlyPayment(
        parseFloat(formData.amount),
        parseFloat(formData.interestRate),
        parseInt(formData.duration)
      )
    : 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Request a Loan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <>
              {/* Step 1: Loan Details */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Loan Amount (SOL)
                    <Tooltip content="Amount you want to borrow in SOL. Minimum 0.1 SOL, Maximum 10 SOL" icon />
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g., 2.5"
                    step="0.1"
                    min="0.1"
                    max="10"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interest Rate (% APR)
                    <Tooltip content="Annual interest rate you're willing to pay. Typical range: 5-15%" icon />
                  </label>
                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    placeholder="e.g., 8"
                    step="0.5"
                    min="1"
                    max="20"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration (months)
                    <Tooltip content="How long you need to repay the loan. Typical range: 3-24 months" icon />
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 12"
                    step="1"
                    min="1"
                    max="36"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Purpose
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select purpose...</option>
                    {purposes.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Explain why you need this loan and how you plan to use it..."
                    rows="4"
                    className="input-field resize-none"
                    required
                  />
                </div>

                {monthlyPayment > 0 && (
                  <div className="card bg-primary-50 border-primary-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Estimated Monthly Payment</h3>
                    <p className="text-3xl font-bold text-primary-600">
                      {monthlyPayment.toFixed(4)} SOL
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Total repayment: {(monthlyPayment * parseInt(formData.duration || 0)).toFixed(4)} SOL
                    </p>
                  </div>
                )}

                <button
                  onClick={handleGetAIAssessment}
                  disabled={
                    !formData.amount ||
                    !formData.interestRate ||
                    !formData.duration ||
                    !formData.purpose ||
                    !formData.description ||
                    isLoading
                  }
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{isLoading ? 'Getting AI Assessment...' : 'Get AI Assessment'}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: AI Assessment & Confirmation */}
              <div className="space-y-6">
                <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                  <div className="flex items-start space-x-3 mb-4">
                    <Sparkles className="w-6 h-6 text-primary-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">AI Risk Assessment</h3>
                      <p className="text-slate-700 text-sm">
                        Our AI has analyzed your loan request and provided recommendations to improve your chances of getting funded.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="font-semibold text-slate-900 mb-3">Loan Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amount:</span>
                      <span className="font-semibold">{formData.amount} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Interest Rate:</span>
                      <span className="font-semibold">{formData.interestRate}% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-semibold">{formData.duration} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Purpose:</span>
                      <span className="font-semibold">{formData.purpose}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-600">Monthly Payment:</span>
                      <span className="font-bold text-primary-600">{monthlyPayment.toFixed(4)} SOL</span>
                    </div>
                  </div>
                </div>

                <div className="card bg-blue-50 border-blue-200">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Important:</p>
                      <p>
                        By submitting this loan request, you agree to repay the full amount plus interest 
                        according to the terms. Failure to repay may affect your on-chain credit score.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 btn-primary"
                  >
                    Submit Loan Request
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateLoanModal
