import { 
  Connection, 
  Keypair, 
  LAMPORTS_PER_SOL, 
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js'
import bs58 from 'bs58'

// Initialize connection to Solana
const NETWORK = process.env.SOLANA_NETWORK || 'devnet'
const RPC_ENDPOINT = NETWORK === 'mainnet-beta' 
  ? 'https://api.mainnet-beta.solana.com'
  : `https://api.${NETWORK}.solana.com`

const connection = new Connection(RPC_ENDPOINT, 'confirmed')

// Platform wallet (holds platform funds, manages transactions)
let platformWallet = null

/**
 * Initialize platform wallet from environment variable
 * CRITICAL: Private key must be in .env, never hardcoded
 */
export function initializePlatformWallet() {
  const privateKeyString = process.env.SOLANA_PLATFORM_PRIVATE_KEY
  
  if (!privateKeyString) {
    console.warn('⚠️  No SOLANA_PLATFORM_PRIVATE_KEY found. Generating temporary wallet for demo.')
    // Generate temporary wallet for demo (will be lost on restart)
    platformWallet = Keypair.generate()
    console.log('📝 Demo wallet public key:', platformWallet.publicKey.toString())
    console.log('💡 For production, add this to .env:')
    console.log(`SOLANA_PLATFORM_PRIVATE_KEY=${bs58.encode(platformWallet.secretKey)}`)
    return platformWallet
  }

  try {
    // Decode private key from base58 string
    const privateKeyBytes = bs58.decode(privateKeyString)
    platformWallet = Keypair.fromSecretKey(privateKeyBytes)
    console.log('✅ Platform wallet loaded:', platformWallet.publicKey.toString())
    return platformWallet
  } catch (error) {
    console.error('❌ Failed to load platform wallet:', error.message)
    throw new Error('Invalid SOLANA_PLATFORM_PRIVATE_KEY format')
  }
}

/**
 * Get platform wallet balance
 */
export async function getPlatformBalance() {
  if (!platformWallet) {
    throw new Error('Platform wallet not initialized')
  }
  
  const balance = await connection.getBalance(platformWallet.publicKey)
  return balance / LAMPORTS_PER_SOL
}

/**
 * Request airdrop to platform wallet (devnet/testnet only)
 */
export async function requestAirdrop(amount = 1) {
  if (!platformWallet) {
    throw new Error('Platform wallet not initialized')
  }

  if (NETWORK === 'mainnet-beta') {
    throw new Error('Airdrop not available on mainnet')
  }

  try {
    const signature = await connection.requestAirdrop(
      platformWallet.publicKey,
      amount * LAMPORTS_PER_SOL
    )
    
    await connection.confirmTransaction(signature)
    return signature
  } catch (error) {
    console.error('Airdrop failed:', error.message)
    throw error
  }
}

/**
 * Create a user account (generates keypair, stores in database)
 * In production: Store encrypted private key in database
 * For demo: Generate and return public key only
 */
export function createUserAccount() {
  const userKeypair = Keypair.generate()
  
  // In production, you would:
  // 1. Encrypt the private key
  // 2. Store in database with user ID
  // 3. Only return public key to frontend
  
  return {
    publicKey: userKeypair.publicKey.toString(),
    // NEVER send private key to frontend!
    // privateKey: stored encrypted in database
  }
}

/**
 * Get balance for any public key
 */
export async function getBalance(publicKeyString) {
  try {
    const publicKey = new PublicKey(publicKeyString)
    const balance = await connection.getBalance(publicKey)
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error('Failed to get balance:', error.message)
    throw error
  }
}

/**
 * Transfer SOL from platform wallet to user
 * Used for: Loan disbursement
 */
export async function transferToUser(recipientPublicKey, amount) {
  if (!platformWallet) {
    throw new Error('Platform wallet not initialized')
  }

  try {
    const recipient = new PublicKey(recipientPublicKey)
    
    // Create transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: platformWallet.publicKey,
        toPubkey: recipient,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    )

    // Sign and send transaction (all happens on backend!)
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [platformWallet] // Platform wallet signs
    )

    console.log('✅ Transfer successful:', signature)
    
    return {
      signature,
      amount,
      from: platformWallet.publicKey.toString(),
      to: recipientPublicKey,
      explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=${NETWORK}`
    }
  } catch (error) {
    console.error('Transfer failed:', error.message)
    throw error
  }
}

/**
 * Transfer SOL from user to platform (for loan repayment)
 * In production: Retrieve user's encrypted private key from database
 * For demo: Simulate the transaction
 */
export async function transferFromUser(senderPublicKey, amount, userPrivateKey = null) {
  if (!platformWallet) {
    throw new Error('Platform wallet not initialized')
  }

  // In production:
  // 1. Fetch user's encrypted private key from database
  // 2. Decrypt it (never send to frontend!)
  // 3. Create keypair
  // 4. Sign transaction
  
  if (!userPrivateKey) {
    // For demo: simulate transaction
    console.log('📝 Simulating repayment transaction')
    return {
      signature: 'simulated_' + Date.now(),
      amount,
      from: senderPublicKey,
      to: platformWallet.publicKey.toString(),
      simulated: true
    }
  }

  try {
    const sender = Keypair.fromSecretKey(bs58.decode(userPrivateKey))
    const recipient = platformWallet.publicKey
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipient,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    )

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [sender]
    )

    console.log('✅ Repayment successful:', signature)
    
    return {
      signature,
      amount,
      from: senderPublicKey,
      to: recipient.toString(),
      explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=${NETWORK}`
    }
  } catch (error) {
    console.error('Repayment failed:', error.message)
    throw error
  }
}

/**
 * Get transaction history for an address
 */
export async function getTransactionHistory(publicKeyString, limit = 10) {
  try {
    const publicKey = new PublicKey(publicKeyString)
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit })
    
    return signatures.map(sig => ({
      signature: sig.signature,
      timestamp: sig.blockTime,
      status: sig.confirmationStatus,
      explorerUrl: `https://explorer.solana.com/tx/${sig.signature}?cluster=${NETWORK}`
    }))
  } catch (error) {
    console.error('Failed to get transaction history:', error.message)
    throw error
  }
}

/**
 * Verify a transaction exists on-chain
 */
export async function verifyTransaction(signature) {
  try {
    const tx = await connection.getTransaction(signature)
    return {
      exists: !!tx,
      confirmed: !!tx,
      details: tx
    }
  } catch (error) {
    return {
      exists: false,
      confirmed: false,
      error: error.message
    }
  }
}

/**
 * Get network info
 */
export function getNetworkInfo() {
  return {
    network: NETWORK,
    endpoint: RPC_ENDPOINT,
    platformWallet: platformWallet?.publicKey.toString() || null
  }
}

export default {
  initializePlatformWallet,
  getPlatformBalance,
  requestAirdrop,
  createUserAccount,
  getBalance,
  transferToUser,
  transferFromUser,
  getTransactionHistory,
  verifyTransaction,
  getNetworkInfo,
  connection
}
