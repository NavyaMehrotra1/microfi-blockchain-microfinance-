import React, { useState, useEffect } from 'react'
import { useWallet } from '../contexts/ServerWalletContext'
import { ArrowUpRight, ArrowDownRight, ExternalLink, RefreshCw, Send, DollarSign } from 'lucide-react'

export default function Transactions() {
  const { wallet, balance, refreshBalance, platformInfo } = useWallet()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendForm, setForm] = useState({
    recipient: '',
    amount: '',
    loanId: ''
  })

  useEffect(() => {
    if (wallet) {
      loadTransactions()
    }
  }, [wallet])

  const loadTransactions = async () => {
    if (!wallet) return
    
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/api/solana/transactions/${wallet.publicKey}?limit=20`)
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error('Failed to load transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendSOL = async (e) => {
    e.preventDefault()
    
    if (!sendForm.recipient || !sendForm.amount) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/solana/loan/fund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          borrowerPublicKey: sendForm.recipient,
          amount: parseFloat(sendForm.amount),
          loanId: sendForm.loanId || 'transfer_' + Date.now()
        })
      })

      const result = await response.json()
      
      if (result.success) {
        alert('Transaction successful!')
        setShowSendModal(false)
        setForm({ recipient: '', amount: '', loanId: '' })
        await refreshBalance()
        await loadTransactions()
        
        // Open explorer
        if (result.explorerUrl) {
          window.open(result.explorerUrl, '_blank')
        }
      } else {
        alert('Transaction failed: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Transaction failed:', error)
      alert('Transaction failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const requestTestSOL = async () => {
    setLoading(true)
    try {
      // Request airdrop to platform
      const response = await fetch('http://localhost:3001/api/solana/platform/airdrop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2 })
      })

      const result = await response.json()
      
      if (result.signature) {
        alert('Airdrop successful! Platform wallet funded with 2 SOL. You can now send transactions.')
        await refreshBalance()
      }
    } catch (error) {
      console.error('Airdrop failed:', error)
      alert('Airdrop failed. Please try again in a few minutes.')
    } finally {
      setLoading(false)
    }
  }

  if (!wallet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Connect Your Account</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Create an account to view and make transactions
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Transactions</h1>
          <p className="text-slate-600 dark:text-slate-400">
            View and manage your Solana transactions
          </p>
        </div>

        {/* Balance Card */}
        <div className="card mb-8 bg-gradient-to-br from-primary-500 to-accent-500 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 mb-1">Your Balance</p>
              <h2 className="text-4xl font-bold">{balance.toFixed(4)} SOL</h2>
              <p className="text-white/60 text-sm mt-2">
                {wallet.publicKey.slice(0, 8)}...{wallet.publicKey.slice(-8)}
              </p>
            </div>
            <button
              onClick={refreshBalance}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowSendModal(true)}
              className="flex-1 bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send SOL
            </button>
            <button
              onClick={requestTestSOL}
              className="flex-1 bg-white/20 backdrop-blur py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              <DollarSign className="w-5 h-5" />
              Get Test SOL
            </button>
          </div>
        </div>

        {/* Platform Info */}
        {platformInfo && (
          <div className="card mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-slate-900 dark:text-white">Connected to Solana {platformInfo.network}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Platform Wallet: {platformInfo.platformWallet?.slice(0, 8)}...{platformInfo.platformWallet?.slice(-8)}
                </p>
                <a
                  href={`https://explorer.solana.com/address/${platformInfo.platformWallet}?cluster=${platformInfo.network}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                >
                  View on Solana Explorer →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Transactions</h2>
            <button
              onClick={loadTransactions}
              className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading && transactions.length === 0 ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
              <p className="text-slate-600 dark:text-slate-400">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">No transactions yet</p>
              <button
                onClick={() => setShowSendModal(true)}
                className="btn-primary"
              >
                Make Your First Transaction
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div
                  key={tx.signature || index}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      tx.status === 'confirmed' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    }`}>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {tx.signature?.slice(0, 8)}...{tx.signature?.slice(-8)}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleString() : 'Recent'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tx.status === 'confirmed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {tx.status || 'Confirmed'}
                    </span>
                    {tx.explorerUrl && (
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Send Modal */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Send SOL</h3>
              <form onSubmit={handleSendSOL} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={sendForm.recipient}
                    onChange={(e) => setForm({ ...sendForm, recipient: e.target.value })}
                    placeholder="Solana wallet address"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={sendForm.amount}
                    onChange={(e) => setForm({ ...sendForm, amount: e.target.value })}
                    placeholder="0.1"
                    className="input"
                    required
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Available: {balance.toFixed(4)} SOL
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Loan ID (optional)
                  </label>
                  <input
                    type="text"
                    value={sendForm.loanId}
                    onChange={(e) => setForm({ ...sendForm, loanId: e.target.value })}
                    placeholder="loan_123"
                    className="input"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSendModal(false)}
                    className="flex-1 btn-secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
