import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'
import solana from './solana.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Solana platform wallet
solana.initializePlatformWallet()

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Helper to get working model
function getModel() {
  // Try different model names based on API availability
  try {
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
  } catch (e) {
    try {
      return genAI.getGenerativeModel({ model: 'gemini-pro' })
    } catch (e2) {
      return genAI.getGenerativeModel({ model: 'models/gemini-pro' })
    }
  }
}

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 MicroFi API Server with Creative AI Features',
    status: 'running',
    endpoints: {
      health: 'GET /api/health',
      chat: 'POST /api/gemini/chat',
      assessLoan: 'POST /api/gemini/assess-loan',
      financialAdvice: 'POST /api/gemini/financial-advice',
      generateDescription: 'POST /api/gemini/generate-loan-description',
      suggestRepaymentPlan: 'POST /api/gemini/suggest-repayment-plan',
      matchLoans: 'POST /api/gemini/match-loans',
      dailyTip: 'GET /api/gemini/daily-tip'
    },
    creativeFeatures: [
      '✨ Auto-generate compelling loan descriptions',
      '📊 Personalized repayment plan suggestions',
      '🎯 Smart loan matching for lenders',
      '💡 Daily financial literacy tips'
    ]
  })
})

// System prompt for financial advisor
const FINANCIAL_ADVISOR_CONTEXT = `You are a helpful financial advisor for MicroFi, a blockchain-based microfinance platform. 
You help users understand microloans, interest rates, repayment plans, and financial literacy.
You should:
- Provide clear, simple explanations about financial concepts
- Help users make informed decisions about borrowing and lending
- Explain blockchain and DeFi concepts in simple terms
- Be encouraging but realistic about financial risks
- Always emphasize responsible borrowing and lending
Keep responses concise and friendly.`

// Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Try Gemini API first, fallback to mock responses
    try {
      const model = getModel()
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: FINANCIAL_ADVISOR_CONTEXT }],
          },
          {
            role: 'model',
            parts: [{ text: 'I understand. I\'m here to help you with financial advice for microfinance, loans, and blockchain concepts. How can I assist you today?' }],
          },
          ...history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
          })),
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      })

      const result = await chat.sendMessage(message)
      const response = result.response.text()
      return res.json({ response })
    } catch (apiError) {
      // Fallback to intelligent mock responses for demo
      console.log('Using fallback AI responses for demo')
      const response = generateMockResponse(message)
      return res.json({ response })
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error)
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    })
  }
})

// Mock response generator for demo purposes
function generateMockResponse(message) {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('microloan') || lowerMessage.includes('loan amount')) {
    return "For a small business, I'd recommend starting with a microloan between $200-$1,000. This amount is manageable to repay while providing enough capital to make a meaningful impact. Consider factors like your monthly revenue, existing expenses, and the specific purpose of the loan. On our platform, you can request loans with flexible terms (6-24 months) and competitive interest rates (8-15% APR). Would you like help calculating what monthly payment would work for your budget?"
  }
  
  if (lowerMessage.includes('blockchain') || lowerMessage.includes('how') && lowerMessage.includes('work')) {
    return "Blockchain lending on MicroFi works through smart contracts on the Solana network. Here's how: 1) You create a loan request that's recorded on the blockchain, 2) Lenders review and fund your request, 3) A smart contract automatically manages repayments, 4) All transactions are transparent and recorded permanently. The key benefits are: instant funding (<1 second), near-zero fees (<$0.01), and complete transparency. No banks or intermediaries needed!"
  }
  
  if (lowerMessage.includes('interest') || lowerMessage.includes('rate')) {
    return "Interest rates on MicroFi typically range from 8-15% APR, which is significantly lower than traditional microfinance (often 20-30%). The rate depends on factors like loan amount, duration, and your repayment history. For example, a $500 loan at 10% APR for 12 months would have monthly payments of about $44. The blockchain technology allows us to keep rates low by eliminating middlemen and reducing operational costs."
  }
  
  if (lowerMessage.includes('repay') || lowerMessage.includes('payment')) {
    return "Repayment on MicroFi is simple and automated. You'll make monthly payments directly from your connected Solana wallet. The smart contract tracks each payment automatically. Tips for successful repayment: 1) Set up reminders before due dates, 2) Keep enough SOL in your wallet, 3) Pay early if possible to build good credit, 4) Contact lenders if you anticipate difficulties. Remember, your repayment history is recorded on-chain and affects future loan eligibility."
  }
  
  if (lowerMessage.includes('risk') || lowerMessage.includes('safe')) {
    return "MicroFi uses several measures to manage risk: 1) AI-powered risk assessment for each loan, 2) Transparent borrower profiles and history, 3) Smart contracts that enforce terms automatically, 4) Diversification options for lenders. For borrowers, the main risk is over-borrowing - only request what you can afford to repay. For lenders, diversify across multiple loans to spread risk. The blockchain ensures all transactions are transparent and immutable."
  }
  
  if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('first')) {
    return "Great question! Here's how to get started: 1) Install the Phantom wallet extension and create a wallet, 2) Switch to Solana Devnet (for testing), 3) Get free test SOL from the faucet, 4) Connect your wallet to MicroFi, 5) Browse available loans or create a loan request. The whole process takes about 5 minutes. Would you like me to explain any of these steps in more detail?"
  }
  
  // Default response
  return "That's a great question! MicroFi combines AI and blockchain to make microfinance accessible to everyone. Our platform offers instant loan funding, transparent terms, and AI-powered financial advice. Whether you're looking to borrow or lend, we can help you understand the process, calculate payments, assess risks, and make informed decisions. What specific aspect of microfinance would you like to learn more about?"
}

// Loan risk assessment endpoint
app.post('/api/gemini/assess-loan', async (req, res) => {
  try {
    const { amount, interestRate, duration, purpose, description } = req.body

    if (!amount || !interestRate || !duration || !purpose) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Try real API first
    try {
      const model = getModel()
      const prompt = `As a financial risk assessor, analyze this microloan request and provide a brief assessment:

Loan Amount: ${amount} SOL
Interest Rate: ${interestRate}% APR
Duration: ${duration} months
Purpose: ${purpose}
Description: ${description}

Provide:
1. Risk Level (Low/Medium/High)
2. Key considerations (2-3 bullet points)
3. Recommendation for the borrower (1-2 sentences)

Keep the response concise and practical.`

      const result = await model.generateContent(prompt)
      const assessment = result.response.text()

      res.json({ 
        assessment,
        riskScore: assessment.toLowerCase().includes('low') ? 'Low' : 
                   assessment.toLowerCase().includes('high') ? 'High' : 'Medium'
      })
    } catch (apiError) {
      // Fallback mock assessment
      console.log('Using fallback risk assessment')
      const riskLevel = amount > 1000 ? 'Medium' : interestRate > 12 ? 'Medium' : 'Low'
      const assessment = `Risk Level: ${riskLevel}\n\nKey Considerations:\n• Loan amount of ${amount} SOL is ${amount > 1000 ? 'substantial' : 'manageable'} for microfinance\n• ${interestRate}% APR is ${interestRate > 12 ? 'above average' : 'competitive'} for this market\n• ${duration} month term provides ${duration > 12 ? 'extended' : 'reasonable'} repayment flexibility\n\nRecommendation: This loan appears ${riskLevel === 'Low' ? 'well-structured' : 'moderately risky'}. Ensure you have a solid repayment plan and consider the ${purpose} purpose carefully. ${duration > 12 ? 'The longer term means lower monthly payments but more total interest.' : 'The shorter term means higher monthly payments but less total interest.'}`
      
      res.json({ assessment, riskScore: riskLevel })
    }
  } catch (error) {
    console.error('Error in assess-loan endpoint:', error)
    res.status(500).json({ 
      error: 'Failed to assess loan',
      details: error.message 
    })
  }
})

// Financial advice endpoint
app.post('/api/gemini/financial-advice', async (req, res) => {
  try {
    const { income, expenses, goals, riskTolerance } = req.body

    // Try real API first
    try {
      const model = getModel()
      const prompt = `As a financial advisor, provide personalized advice for this user profile:

Monthly Income: ${income || 'Not specified'}
Monthly Expenses: ${expenses || 'Not specified'}
Financial Goals: ${goals || 'Not specified'}
Risk Tolerance: ${riskTolerance || 'Moderate'}

Provide:
1. Budget recommendations
2. Savings strategy
3. Investment suggestions for microfinance
4. Risk management tips

Keep advice practical and actionable. Limit to 200 words.`

      const result = await model.generateContent(prompt)
      const advice = result.response.text()

      res.json({ advice })
    } catch (apiError) {
      // Fallback mock advice
      console.log('Using fallback financial advice')
      const advice = `Based on your profile, here's personalized advice:\n\n1. Budget: ${income && expenses ? `With income of $${income} and expenses of $${expenses}, aim to save ${Math.max(0, income - expenses)} monthly.` : 'Track your income and expenses to identify savings opportunities.'}\n\n2. Savings Strategy: Start with a 3-month emergency fund, then invest in income-generating opportunities through microfinance lending.\n\n3. Microfinance Investment: Consider lending small amounts ($50-200) across multiple borrowers to diversify risk while earning 8-15% returns.\n\n4. Risk Management: ${riskTolerance === 'High' ? 'Your high risk tolerance allows for aggressive lending, but still diversify.' : riskTolerance === 'Low' ? 'Focus on lower-risk, shorter-term loans with proven borrowers.' : 'Balance between established and new borrowers for moderate risk-reward.'}\n\nGoals: ${goals || 'Set specific financial goals to guide your investment strategy.'}`
      
      res.json({ advice })
    }
  } catch (error) {
    console.error('Error in financial-advice endpoint:', error)
    res.status(500).json({ 
      error: 'Failed to generate advice',
      details: error.message 
    })
  }
})

// 🎨 CREATIVE AI FEATURE 1: Auto-generate loan descriptions
app.post('/api/gemini/generate-loan-description', async (req, res) => {
  try {
    const { purpose, amount, duration, businessType } = req.body
    
    try {
      const model = getModel()
      const prompt = `Write a compelling, professional loan request description for a microfinance platform. 

Purpose: ${purpose}
Amount: ${amount} SOL
Duration: ${duration} months
Business Type: ${businessType || 'Small business'}

Write a 2-3 sentence description that:
- Explains how the funds will be used
- Shows the borrower's commitment
- Builds trust with potential lenders
- Is authentic and personal

Keep it under 100 words.`

      const result = await model.generateContent(prompt)
      const description = result.response.text()
      res.json({ description })
    } catch (apiError) {
      // Fallback
      const descriptions = {
        'Business Expansion': `I'm seeking ${amount} SOL to expand my ${businessType || 'small business'} over the next ${duration} months. These funds will help me purchase inventory, improve operations, and reach more customers. I have a solid track record and am committed to transparent communication with my lenders.`,
        'Education': `I need ${amount} SOL to invest in education and skills training that will increase my earning potential. This ${duration}-month loan will cover course fees and materials, enabling me to secure better employment opportunities and repay with confidence.`,
        'Equipment Purchase': `I'm requesting ${amount} SOL to purchase essential equipment for my ${businessType || 'business'}. This investment will directly increase my productivity and income over ${duration} months, allowing me to serve more customers and grow sustainably.`,
        'Working Capital': `I need ${amount} SOL in working capital to manage cash flow and seize growth opportunities in my ${businessType || 'business'}. With ${duration} months to repay, I can maintain operations while scaling revenue to comfortably meet my obligations.`
      }
      const description = descriptions[purpose] || `I'm seeking ${amount} SOL for ${purpose.toLowerCase()}. This ${duration}-month loan will help me achieve my goals while maintaining a manageable repayment schedule.`
      res.json({ description })
    }
  } catch (error) {
    console.error('Error generating description:', error)
    res.status(500).json({ error: 'Failed to generate description' })
  }
})

// 🎨 CREATIVE AI FEATURE 2: Personalized repayment plan suggestions
app.post('/api/gemini/suggest-repayment-plan', async (req, res) => {
  try {
    const { amount, income, expenses, duration } = req.body
    
    try {
      const model = getModel()
      const prompt = `As a financial advisor, suggest an optimal repayment plan:

Loan Amount: ${amount} SOL
Monthly Income: $${income}
Monthly Expenses: $${expenses}
Desired Duration: ${duration} months

Provide:
1. Recommended monthly payment amount
2. Suggested payment schedule (weekly/bi-weekly/monthly)
3. Tips to ensure on-time payments
4. Warning if the loan seems too large for their budget

Be concise and practical.`

      const result = await model.generateContent(prompt)
      const plan = result.response.text()
      res.json({ plan })
    } catch (apiError) {
      // Fallback calculation
      const monthlyPayment = (amount * 1.1) / duration // Simplified with 10% interest
      const disposableIncome = income - expenses
      const paymentRatio = (monthlyPayment / disposableIncome) * 100
      
      const plan = `Recommended Plan:\n\n💰 Monthly Payment: $${monthlyPayment.toFixed(2)}\n📅 Schedule: ${paymentRatio < 20 ? 'Monthly payments work well' : 'Consider bi-weekly payments to ease cash flow'}\n\n${paymentRatio > 40 ? '⚠️ Warning: This loan may strain your budget. Consider a longer term or smaller amount.' : paymentRatio > 25 ? '⚡ Tip: Set up automatic payments to avoid missing due dates.' : '✅ This loan fits comfortably in your budget!'}\n\nPayment represents ${paymentRatio.toFixed(1)}% of your disposable income.`
      
      res.json({ plan })
    }
  } catch (error) {
    console.error('Error suggesting repayment plan:', error)
    res.status(500).json({ error: 'Failed to suggest plan' })
  }
})

// 🎨 CREATIVE AI FEATURE 3: Smart loan matching
app.post('/api/gemini/match-loans', async (req, res) => {
  try {
    const { investmentAmount, riskTolerance, preferredDuration, interests } = req.body
    
    try {
      const model = getModel()
      const prompt = `As an investment advisor, recommend loan types for this lender profile:

Investment Amount: $${investmentAmount}
Risk Tolerance: ${riskTolerance}
Preferred Duration: ${preferredDuration} months
Interests: ${interests || 'General'}

Suggest 3 loan categories they should focus on and explain why each matches their profile. Be specific and actionable.`

      const result = await model.generateContent(prompt)
      const recommendations = result.response.text()
      res.json({ recommendations })
    } catch (apiError) {
      // Fallback recommendations
      const recommendations = `Based on your profile, here are recommended loan types:\n\n${riskTolerance === 'Low' ? '1. ✅ Established Businesses: Focus on borrowers with 2+ year track records\n2. 📚 Education Loans: Lower default rates, predictable outcomes\n3. 🔄 Repeat Borrowers: Proven repayment history reduces risk' : riskTolerance === 'High' ? '1. 🚀 Startups: Higher returns, support innovation\n2. 🌍 International: Diversify across regions\n3. 💡 New Borrowers: Help build their credit while earning premium rates' : '1. 🏪 Small Retail: Balanced risk-reward\n2. 🛠️ Equipment Loans: Asset-backed security\n3. 📈 Growth Businesses: Moderate risk, good returns'}\n\nDiversify across ${Math.floor(investmentAmount / 100)} loans of ~$100 each for optimal risk management.`
      
      res.json({ recommendations })
    }
  } catch (error) {
    console.error('Error matching loans:', error)
    res.status(500).json({ error: 'Failed to match loans' })
  }
})

// 🎨 CREATIVE AI FEATURE 4: Financial literacy tips
app.get('/api/gemini/daily-tip', async (req, res) => {
  try {
    try {
      const model = getModel()
      const prompt = `Generate one practical financial literacy tip related to microfinance, blockchain, or personal finance. Make it actionable and under 50 words. Format: "💡 Tip: [your tip]"`

      const result = await model.generateContent(prompt)
      const tip = result.response.text()
      res.json({ tip })
    } catch (apiError) {
      // Fallback tips
      const tips = [
        "💡 Tip: Diversify your microfinance investments across at least 10 different borrowers to minimize risk. Never put all your eggs in one basket!",
        "💡 Tip: Set up automatic monthly investments in microloans. Dollar-cost averaging helps you build a steady lending portfolio over time.",
        "💡 Tip: Review borrower profiles carefully. Look for detailed descriptions, realistic goals, and transparent communication.",
        "💡 Tip: Start small when lending. Test the platform with $50-100 loans before committing larger amounts.",
        "💡 Tip: Track your lending returns monthly. Aim for 8-12% annual returns while maintaining low default rates.",
        "💡 Tip: Blockchain transactions are permanent. Always double-check wallet addresses before sending funds!",
        "💡 Tip: Build an emergency fund before investing in microloans. Keep 3-6 months of expenses in liquid savings."
      ]
      const tip = tips[Math.floor(Math.random() * tips.length)]
      res.json({ tip })
    }
  } catch (error) {
    console.error('Error generating tip:', error)
    res.status(500).json({ error: 'Failed to generate tip' })
  }
})

// ============================================
// SOLANA BLOCKCHAIN ENDPOINTS (Server-Side)
// ============================================

// Get Solana network info
app.get('/api/solana/info', (req, res) => {
  try {
    const info = solana.getNetworkInfo()
    res.json(info)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get platform wallet balance
app.get('/api/solana/platform/balance', async (req, res) => {
  try {
    const balance = await solana.getPlatformBalance()
    res.json({ balance })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Request airdrop to platform wallet (devnet only)
app.post('/api/solana/platform/airdrop', async (req, res) => {
  try {
    const { amount = 1 } = req.body
    const signature = await solana.requestAirdrop(amount)
    res.json({ 
      signature,
      amount,
      message: 'Airdrop successful. Wait 30 seconds for confirmation.'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new user account (generates Solana keypair)
app.post('/api/solana/account/create', (req, res) => {
  try {
    const account = solana.createUserAccount()
    // In production: Store in database with user ID
    res.json(account)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get balance for any address
app.get('/api/solana/balance/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params
    const balance = await solana.getBalance(publicKey)
    res.json({ publicKey, balance })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Fund a loan (transfer from platform to borrower)
app.post('/api/solana/loan/fund', async (req, res) => {
  try {
    const { borrowerPublicKey, amount, loanId } = req.body
    
    if (!borrowerPublicKey || !amount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await solana.transferToUser(borrowerPublicKey, amount)
    
    // In production: Record in database
    console.log(`💰 Loan ${loanId} funded: ${amount} SOL to ${borrowerPublicKey}`)
    
    res.json({
      success: true,
      ...result,
      loanId
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Repay a loan (transfer from borrower to platform)
app.post('/api/solana/loan/repay', async (req, res) => {
  try {
    const { borrowerPublicKey, amount, loanId } = req.body
    
    if (!borrowerPublicKey || !amount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // In production: Retrieve user's encrypted private key from database
    const result = await solana.transferFromUser(borrowerPublicKey, amount)
    
    console.log(`💵 Loan ${loanId} repayment: ${amount} SOL from ${borrowerPublicKey}`)
    
    res.json({
      success: true,
      ...result,
      loanId
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get transaction history
app.get('/api/solana/transactions/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params
    const { limit = 10 } = req.query
    const history = await solana.getTransactionHistory(publicKey, parseInt(limit))
    res.json({ publicKey, transactions: history })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Verify transaction
app.get('/api/solana/transaction/:signature', async (req, res) => {
  try {
    const { signature } = req.params
    const verification = await solana.verifyTransaction(signature)
    res.json(verification)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'MicroFi API is running',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    solanaConfigured: !!solana.getNetworkInfo().platformWallet
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MicroFi API server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  WARNING: GEMINI_API_KEY not found in environment variables')
    console.warn('   Please add your API key to .env file')
  } else {
    console.log('✅ Gemini API key configured')
  }
})
