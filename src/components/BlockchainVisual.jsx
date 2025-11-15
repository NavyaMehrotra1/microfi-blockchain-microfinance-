import { useState } from 'react'
import { ArrowRight, Check, Lock, Users, Coins, FileText } from 'lucide-react'

const BlockchainVisual = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 0,
      title: "1. Borrower Creates Request",
      description: "Amina needs $200 for her business",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      details: "Request is broadcast to the Solana network"
    },
    {
      id: 1,
      title: "2. AI Risk Assessment",
      description: "Gemini AI analyzes the request",
      icon: <FileText className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      details: "AI provides risk score and recommendations"
    },
    {
      id: 2,
      title: "3. Smart Contract Created",
      description: "Terms encoded on blockchain",
      icon: <Lock className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500",
      details: "Immutable, transparent, and automatic"
    },
    {
      id: 3,
      title: "4. Lenders Fund Loan",
      description: "Multiple lenders contribute SOL",
      icon: <Coins className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      details: "Funds transferred instantly (<1 second)"
    },
    {
      id: 4,
      title: "5. Loan Disbursed",
      description: "Amina receives funds immediately",
      icon: <Check className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      details: "Transaction recorded on blockchain forever"
    },
  ]

  const blockchainBlocks = [
    { id: 1, hash: "0x7a9f...", txns: 3, time: "2s ago" },
    { id: 2, hash: "0x4b2c...", txns: 5, time: "5s ago" },
    { id: 3, hash: "0x9e1d...", txns: 2, time: "8s ago" },
  ]

  return (
    <div className="space-y-12">
      {/* Interactive Flow */}
      <div className="card bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          🔗 How a Loan Flows Through the Blockchain
        </h3>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`w-full p-4 rounded-xl transition-all duration-300 ${
                  activeStep === step.id
                    ? 'bg-gradient-to-br ' + step.color + ' text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={activeStep === step.id ? 'text-white' : 'text-slate-400'}>
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold">{step.title.split('.')[1]}</div>
                </div>
              </button>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-slate-300 dark:text-slate-600 w-8 h-8" />
              )}
            </div>
          ))}
        </div>

        {/* Active Step Details */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-inner">
          <div className={`flex items-start space-x-4 p-6 rounded-lg bg-gradient-to-br ${steps[activeStep].color}`}>
            <div className="text-white">
              {steps[activeStep].icon}
            </div>
            <div className="flex-1 text-white">
              <h4 className="text-xl font-bold mb-2">{steps[activeStep].title}</h4>
              <p className="text-lg mb-2">{steps[activeStep].description}</p>
              <p className="text-sm opacity-90">{steps[activeStep].details}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Visualization */}
      <div className="card">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          ⛓️ Live Blockchain Representation
        </h3>
        
        <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
          {blockchainBlocks.map((block, index) => (
            <div key={block.id} className="flex items-center">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-6 rounded-lg shadow-lg min-w-[200px] animate-pulse-slow">
                <div className="text-white">
                  <div className="text-sm font-semibold mb-2">Block #{block.id}</div>
                  <div className="text-xs opacity-75 mb-1">Hash: {block.hash}</div>
                  <div className="text-xs opacity-75 mb-1">Transactions: {block.txns}</div>
                  <div className="text-xs opacity-75">{block.time}</div>
                </div>
              </div>
              {index < blockchainBlocks.length - 1 && (
                <div className="flex items-center">
                  <div className="w-8 h-1 bg-primary-300 dark:bg-primary-700"></div>
                  <Lock className="w-4 h-4 text-primary-500 -mx-2" />
                  <div className="w-8 h-1 bg-primary-300 dark:bg-primary-700"></div>
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center">
            <div className="w-8 h-1 bg-primary-300 dark:bg-primary-700"></div>
            <div className="bg-slate-200 dark:bg-slate-700 p-6 rounded-lg border-2 border-dashed border-primary-300 min-w-[200px]">
              <div className="text-slate-400 dark:text-slate-500 text-center">
                <div className="text-sm font-semibold mb-2">Next Block</div>
                <div className="text-xs">Mining...</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>💡 How it works:</strong> Each block contains multiple transactions (loans, payments, etc.). 
            Blocks are cryptographically linked together, making the history immutable. 
            On Solana, new blocks are created every ~400ms!
          </p>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Immutable</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Once recorded, transactions cannot be altered or deleted
          </p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-3">👁️</div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Transparent</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            All transactions are publicly verifiable on the blockchain
          </p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-3">⚡</div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Instant</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Solana processes 65,000 transactions per second
          </p>
        </div>
      </div>
    </div>
  )
}

export default BlockchainVisual
