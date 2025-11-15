import React, { createContext, useContext, useState, useEffect } from 'react'
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'

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
  const [connection, setConnection] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const network = import.meta.env.VITE_SOLANA_NETWORK || 'devnet'
    const conn = new Connection(clusterApiUrl(network), 'confirmed')
    setConnection(conn)
  }, [])

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      
      // Check if Phantom wallet is installed
      const { solana } = window
      
      if (!solana?.isPhantom) {
        alert('Please install Phantom wallet! Visit https://phantom.app/')
        return
      }

      // Connect to Phantom
      const response = await solana.connect()
      const publicKey = response.publicKey.toString()
      
      setWallet({
        publicKey,
        connected: true,
      })

      // Get balance
      if (connection) {
        const balance = await connection.getBalance(new PublicKey(publicKey))
        setBalance(balance / LAMPORTS_PER_SOL)
      }

      // Listen for account changes
      solana.on('accountChanged', (publicKey) => {
        if (publicKey) {
          setWallet({
            publicKey: publicKey.toString(),
            connected: true,
          })
        } else {
          disconnectWallet()
        }
      })

    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      const { solana } = window
      if (solana) {
        await solana.disconnect()
      }
      setWallet(null)
      setBalance(0)
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  const refreshBalance = async () => {
    if (wallet && connection) {
      try {
        const balance = await connection.getBalance(new PublicKey(wallet.publicKey))
        setBalance(balance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error('Error refreshing balance:', error)
      }
    }
  }

  const requestAirdrop = async (amount = 1) => {
    if (!wallet || !connection) {
      alert('Please connect your wallet first')
      return
    }

    try {
      const signature = await connection.requestAirdrop(
        new PublicKey(wallet.publicKey),
        amount * LAMPORTS_PER_SOL
      )
      
      await connection.confirmTransaction(signature)
      await refreshBalance()
      
      return signature
    } catch (error) {
      console.error('Error requesting airdrop:', error)
      throw error
    }
  }

  const value = {
    wallet,
    balance,
    connection,
    isConnecting,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    requestAirdrop,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
