import React, { createContext, useContext, useState } from 'react'

const GeminiContext = createContext()

export const useGemini = () => {
  const context = useContext(GeminiContext)
  if (!context) {
    throw new Error('useGemini must be used within GeminiProvider')
  }
  return context
}

export const GeminiProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (message) => {
    try {
      setIsLoading(true)
      
      // Add user message to history
      const userMessage = { role: 'user', content: message }
      setChatHistory(prev => [...prev, userMessage])

      // Call backend API
      const response = await fetch('http://localhost:3001/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: chatHistory,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      
      // Add AI response to history
      const aiMessage = { role: 'assistant', content: data.response }
      setChatHistory(prev => [...prev, aiMessage])

      return data.response
    } catch (error) {
      console.error('Error sending message to Gemini:', error)
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please make sure the backend server is running and your API key is configured.' 
      }
      setChatHistory(prev => [...prev, errorMessage])
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const assessLoanRisk = async (loanData) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('http://localhost:3001/api/gemini/assess-loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
      })

      if (!response.ok) {
        throw new Error('Failed to assess loan risk')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error assessing loan risk:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const generateFinancialAdvice = async (userProfile) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('http://localhost:3001/api/gemini/financial-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      })

      if (!response.ok) {
        throw new Error('Failed to generate financial advice')
      }

      const data = await response.json()
      return data.advice
    } catch (error) {
      console.error('Error generating financial advice:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = () => {
    setChatHistory([])
  }

  const value = {
    chatHistory,
    isLoading,
    sendMessage,
    assessLoanRisk,
    generateFinancialAdvice,
    clearHistory,
  }

  return <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>
}
