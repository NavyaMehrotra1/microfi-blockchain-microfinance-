import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Loader, Trash2 } from 'lucide-react'
import { useGemini } from '../contexts/GeminiContext'
import { useWallet } from '../contexts/WalletContext'
import Tooltip from '../components/Tooltip'

const AIAdvisor = () => {
  const [message, setMessage] = useState('')
  const { chatHistory, isLoading, sendMessage, clearHistory } = useGemini()
  const { wallet } = useWallet()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    try {
      await sendMessage(message)
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const suggestedQuestions = [
    "What's the best loan amount for a small business?",
    "How does blockchain lending work?",
    "What interest rate should I expect?",
    "How can I improve my credit score?",
    "What are the benefits of DeFi over traditional banking?",
  ]

  const handleSuggestedQuestion = (question) => {
    setMessage(question)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-3 rounded-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">AI Financial Advisor</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Get personalized financial advice powered by Google Gemini AI. 
          Ask anything about loans, savings, or financial planning!
        </p>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto">
        <div className="card min-h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-slate-900">MicroFi AI Assistant</span>
              <Tooltip content="Powered by Google Gemini - Advanced AI for financial advice and loan recommendations" icon />
            </div>
            {chatHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-slate-600 hover:text-red-600 transition-colors flex items-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear</span>
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4" style={{ maxHeight: '500px' }}>
            {chatHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Welcome to Your AI Financial Advisor!
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  I'm here to help you make informed financial decisions. Ask me anything about microloans, 
                  interest rates, repayment plans, or financial literacy.
                </p>
                
                {/* Suggested Questions */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Try asking:</p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="block w-full max-w-md mx-auto text-left px-4 py-3 bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-lg transition-all text-sm text-slate-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-3 max-w-[80%] ${
                        msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-primary-600 to-accent-600'
                            : 'bg-gradient-to-br from-slate-200 to-slate-300'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-slate-700" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-slate-700" />
                      </div>
                      <div className="px-4 py-3 bg-slate-100 rounded-lg">
                        <Loader className="w-5 h-5 animate-spin text-primary-600" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="pt-4 border-t border-slate-200">
            {!wallet && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                💡 Connect your wallet to get personalized loan recommendations based on your balance!
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about microfinance..."
                className="input-field flex-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="btn-primary flex items-center space-x-2"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <span>Powered by Gemini</span>
            </h3>
            <p className="text-sm text-slate-600">
              Google's most advanced AI model provides accurate, helpful financial advice
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-2">🔒 Private & Secure</h3>
            <p className="text-sm text-slate-600">
              Your conversations are private and never shared with third parties
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-2">📚 Financial Education</h3>
            <p className="text-sm text-slate-600">
              Learn about DeFi, blockchain, and smart financial decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAdvisor
