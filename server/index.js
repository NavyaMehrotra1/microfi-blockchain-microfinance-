import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

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

    // Initialize model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Build chat history
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

    // Send message
    const result = await chat.sendMessage(message)
    const response = result.response.text()

    res.json({ response })
  } catch (error) {
    console.error('Error in chat endpoint:', error)
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    })
  }
})

// Loan risk assessment endpoint
app.post('/api/gemini/assess-loan', async (req, res) => {
  try {
    const { amount, interestRate, duration, purpose, description } = req.body

    if (!amount || !interestRate || !duration || !purpose) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

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

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

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
  } catch (error) {
    console.error('Error in financial-advice endpoint:', error)
    res.status(500).json({ 
      error: 'Failed to generate advice',
      details: error.message 
    })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'MicroFi API is running',
    geminiConfigured: !!process.env.GEMINI_API_KEY
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
