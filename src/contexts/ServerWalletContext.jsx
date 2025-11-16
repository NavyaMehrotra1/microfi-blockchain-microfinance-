import React, { createContext, useContext, useState, useEffect } from 'react'

const WalletContext = createContext()

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null)
  const [balance, setBalance] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)
  const [platformInfo, setPlatformInfo] = useState(null)

  // Get platform info on mount
  useEffect(() => {
    fetchPlatformInfo()
  }, [])

  const fetchPlatformInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/solana/info')
      const data = await response.json()
      setPlatformInfo(data)
    } catch (error) {
      console.error('Failed to fetch platform info:', error)
    }
  }

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      
      // Create a new user account on backend
      const response = await fetch('http://localhost:3001/api/solana/account/create', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      setWallet({
        publicKey: data.publicKey,
        connected: true,
      })

      // Get initial balance
      await refreshBalance(data.publicKey)
      
    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to create account. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWallet(null)
    setBalance(0)
  }

  const refreshBalance = async (publicKey = wallet?.publicKey) => {
    if (!publicKey) return
    
    try {
      const response = await fetch(`http://localhost:3001/api/solana/balance/${publicKey}`)
      const data = await response.json()
      setBalance(data.balance)
    } catch (error) {
      console.error('Error refreshing balance:', error)
    }
  }

  const requestAirdrop = async (amount = 1) => {
    if (!wallet) {
      alert('Please connect your wallet first')
      return
    }

    try {
      // For demo: Request airdrop to platform, then transfer to user
      const airdropResponse = await fetch('http://localhost:3001/api/solana/platform/airdrop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      })
      
      if (!airdropResponse.ok) {
        throw new Error('Airdrop failed')
      }

      // Wait a bit for confirmation
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Transfer to user
      const transferResponse = await fetch('http://localhost:3001/api/solana/loan/fund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          borrowerPublicKey: wallet.publicKey,
          amount: amount,
          loanId: 'airdrop_' + Date.now()
        })
      })

      const result = await transferResponse.json()
      
      if (result.success) {
        await refreshBalance()
        return result.signature
      }
    } catch (error) {
      console.error('Error requesting airdrop:', error)
      throw error
    }
  }

  const value = {
    wallet,
    balance,
    connection: null, // Not needed for server-side
    isConnecting,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    requestAirdrop,
    platformInfo,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
