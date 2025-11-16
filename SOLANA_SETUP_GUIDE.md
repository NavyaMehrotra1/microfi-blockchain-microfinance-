# 🔗 Solana Integration - Complete Setup Guide

## 📋 Table of Contents
1. [How Solana is Used in This Project](#how-solana-is-used)
2. [Step-by-Step Setup](#step-by-step-setup)
3. [Testing the Integration](#testing)
4. [Common Issues & Solutions](#troubleshooting)

---

## 🎯 How Solana is Used in This Project

### Current Implementation

#### 1. **Wallet Connection** 
- Uses Phantom wallet (browser extension)
- Connects to Solana Devnet (test network)
- Displays wallet address and balance
- Location: `src/contexts/WalletContext.jsx`

#### 2. **Balance Management**
- Reads SOL balance from connected wallet
- Updates in real-time
- Displays in navbar and throughout app

#### 3. **Airdrop Functionality** (Devnet Only)
- Request free test SOL from Solana faucet
- Used for testing without real money
- 1-2 SOL per request

#### 4. **Transaction Preparation** (Ready for Implementation)
- Infrastructure in place for:
  - Loan funding transactions
  - Repayment transactions
  - Smart contract interactions
- Currently simulated (no real transactions yet)

### What's NOT Implemented Yet
❌ Smart contracts for loan management  
❌ Actual SOL transfers between users  
❌ On-chain loan records  
❌ NFT receipts for loans  

**Note**: This is a hackathon MVP. The blockchain infrastructure is ready, but actual on-chain transactions are simulated for demo purposes.

---

## 🚀 Step-by-Step Setup

### Step 1: Install Phantom Wallet

#### For Chrome/Brave/Edge:
1. Go to https://phantom.app/
2. Click "Download"
3. Select "Chrome" (works for all Chromium browsers)
4. Click "Add to Chrome"
5. Click "Add Extension"

#### For Firefox:
1. Go to https://phantom.app/
2. Click "Download"
3. Select "Firefox"
4. Click "Add to Firefox"

#### After Installation:
1. Click the Phantom icon in your browser toolbar
2. Click "Create New Wallet"
3. **IMPORTANT**: Write down your secret recovery phrase
4. Set a password
5. Click "Continue"

✅ **You now have a Solana wallet!**

---

### Step 2: Switch to Devnet (Test Network)

**Why Devnet?**
- Free test SOL (no real money)
- Safe for testing
- Same functionality as mainnet

**How to Switch:**
1. Open Phantom wallet
2. Click the ⚙️ (Settings) icon at bottom
3. Scroll down to "Developer Settings"
4. Toggle "Testnet Mode" to ON
5. Click "Change Network"
6. Select "Devnet"

✅ **You're now on Devnet!**

---

### Step 3: Get Free Test SOL

#### Method 1: Through MicroFi App (Easiest)
1. Start your app: `npm run dev`
2. Open http://localhost:5173
3. Click "Connect Wallet" in navbar
4. Approve connection in Phantom popup
5. Once connected, you'll see an "Airdrop" button
6. Click it to get 1 SOL

#### Method 2: Solana Faucet Website
1. Copy your wallet address from Phantom
2. Go to https://faucet.solana.com/
3. Paste your address
4. Select "Devnet"
5. Click "Request Airdrop"
6. Wait 10-30 seconds

#### Method 3: Command Line
```bash
solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet
```

✅ **You now have test SOL!**

---

### Step 4: Configure Your Project

#### Update .env File
```bash
# Solana Configuration
VITE_SOLANA_NETWORK=devnet
# Options: devnet, testnet, mainnet-beta

# For production (don't use yet):
# VITE_SOLANA_NETWORK=mainnet-beta
```

#### Verify Configuration
```bash
# Check if .env exists
ls -la .env

# If not, copy from example
cp .env.example .env

# Edit the file
nano .env  # or use your editor
```

---

### Step 5: Test the Integration

#### Start Your App
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run dev
```

#### Test Wallet Connection
1. Open http://localhost:5173
2. Click "Connect Wallet" button
3. Phantom popup should appear
4. Click "Connect"
5. You should see:
   - ✅ Your wallet address in navbar
   - ✅ Your SOL balance
   - ✅ "Disconnect" button

#### Test Airdrop (if balance is low)
1. Click the airdrop button (if visible)
2. Wait 10-30 seconds
3. Balance should increase by 1 SOL

✅ **Solana integration is working!**

---

## 🔍 Understanding the Code

### Key Files

#### 1. `src/contexts/WalletContext.jsx`
```javascript
// This file manages all Solana interactions

// Connects to Solana network
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

// Connects to Phantom wallet
const response = await window.solana.connect()

// Gets balance
const balance = await connection.getBalance(publicKey)

// Requests airdrop (devnet only)
const signature = await connection.requestAirdrop(publicKey, amount)
```

#### 2. `src/components/Navbar.jsx`
```javascript
// Displays wallet connection status
const { wallet, balance, connectWallet, disconnectWallet } = useWallet()

// Shows "Connect Wallet" or wallet address
{wallet ? (
  <div>{wallet.publicKey.slice(0, 4)}...{wallet.publicKey.slice(-4)}</div>
) : (
  <button onClick={connectWallet}>Connect Wallet</button>
)}
```

#### 3. `package.json` Dependencies
```json
{
  "@solana/web3.js": "^1.87.6",  // Core Solana library
  "@solana/wallet-adapter-react": "^0.15.35",  // Wallet integration
  "@solana/wallet-adapter-wallets": "^0.19.32"  // Wallet providers
}
```

---

## 🎨 How Transactions Would Work (Future Implementation)

### Example: Funding a Loan

```javascript
// This is how it WOULD work with real transactions:

const fundLoan = async (loanId, amount) => {
  // 1. Create transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: lenderWallet,
      toPubkey: borrowerWallet,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  )
  
  // 2. Sign with Phantom
  const signed = await window.solana.signTransaction(transaction)
  
  // 3. Send to blockchain
  const signature = await connection.sendRawTransaction(signed.serialize())
  
  // 4. Confirm transaction
  await connection.confirmTransaction(signature)
  
  // 5. Record in database
  await recordLoanFunding(loanId, signature)
}
```

### Why It's Not Implemented Yet
- **Time constraint**: Hackathon MVP focus
- **Smart contracts needed**: Requires Rust programming
- **Security**: Needs thorough testing
- **Escrow logic**: Complex multi-party transactions

### What IS Working
✅ Wallet connection  
✅ Balance display  
✅ Network switching  
✅ Airdrop (devnet)  
✅ UI/UX for transactions  
⏳ Actual SOL transfers (simulated)  

---

## 🐛 Common Issues & Solutions

### Issue 1: "Phantom wallet not detected"
**Solution:**
1. Make sure Phantom is installed
2. Refresh the page
3. Check browser console for errors
4. Try a different browser

### Issue 2: "Failed to connect wallet"
**Solution:**
1. Open Phantom and unlock it
2. Make sure you're on Devnet
3. Clear browser cache
4. Try disconnecting and reconnecting

### Issue 3: "Airdrop failed"
**Solution:**
1. Devnet faucet has rate limits
2. Wait 5 minutes and try again
3. Use alternative faucet: https://faucet.solana.com/
4. Maximum 2 SOL per request

### Issue 4: "Balance shows 0"
**Solution:**
1. Make sure you're on Devnet
2. Request airdrop first
3. Wait 30 seconds for confirmation
4. Click refresh balance button

### Issue 5: "Wrong network"
**Solution:**
1. Open Phantom settings
2. Enable "Testnet Mode"
3. Switch to "Devnet"
4. Reconnect wallet in app

---

## 📊 Network Comparison

| Feature | Devnet | Testnet | Mainnet |
|---------|--------|---------|---------|
| **Purpose** | Development | Testing | Production |
| **SOL Cost** | Free (faucet) | Free (faucet) | Real money |
| **Speed** | Fast | Fast | Fast |
| **Stability** | Can reset | Can reset | Stable |
| **Use For** | Hackathons, demos | Pre-launch testing | Real users |

**For this hackathon: Use Devnet** ✅

---

## 🎯 Demo Script for Judges

### 1. Show Wallet Connection
> "First, I'll connect my Phantom wallet to the app. This establishes a secure connection to the Solana blockchain."

**Action**: Click "Connect Wallet" → Approve in Phantom

### 2. Show Balance
> "You can see my Devnet balance here. This is test SOL from the Solana faucet."

**Action**: Point to balance in navbar

### 3. Explain Architecture
> "We're using Solana's Devnet for testing. The infrastructure is ready for real transactions - we have wallet integration, balance tracking, and transaction preparation. For the hackathon, we're simulating the loan transactions, but the blockchain connection is live."

### 4. Show Airdrop (Optional)
> "On Devnet, we can request free test SOL to demonstrate the functionality."

**Action**: Click airdrop → Show balance increase

### 5. Explain Future Implementation
> "In production, when a lender funds a loan, we'd create a Solana transaction that transfers SOL from their wallet to an escrow account. The smart contract would hold the funds and release them based on the loan terms. All transactions would be recorded on-chain for complete transparency."

---

## 🚀 Next Steps for Full Implementation

### Phase 1: Basic Transactions (2-3 days)
- [ ] Implement direct SOL transfers
- [ ] Add transaction confirmation UI
- [ ] Record transaction signatures
- [ ] Add transaction history

### Phase 2: Smart Contracts (1-2 weeks)
- [ ] Write Rust smart contract for escrow
- [ ] Deploy to Devnet
- [ ] Test multi-party transactions
- [ ] Add automated repayment logic

### Phase 3: Advanced Features (2-3 weeks)
- [ ] NFT loan receipts
- [ ] On-chain credit scores
- [ ] Automated interest calculations
- [ ] Multi-signature approvals

### Phase 4: Production (1 week)
- [ ] Security audit
- [ ] Deploy to Mainnet
- [ ] Real money testing
- [ ] User onboarding

---

## 📚 Additional Resources

### Official Documentation
- Solana Docs: https://docs.solana.com/
- Phantom Docs: https://docs.phantom.app/
- Web3.js Guide: https://solana-labs.github.io/solana-web3.js/

### Tutorials
- Solana Cookbook: https://solanacookbook.com/
- Build on Solana: https://www.buildspace.so/solana

### Tools
- Solana Explorer: https://explorer.solana.com/?cluster=devnet
- Solana Faucet: https://faucet.solana.com/
- Phantom Wallet: https://phantom.app/

---

## ✅ Quick Checklist

Before demo:
- [ ] Phantom wallet installed
- [ ] Switched to Devnet
- [ ] Have 1-2 test SOL
- [ ] App running (frontend + backend)
- [ ] Wallet connected successfully
- [ ] Balance showing correctly

---

## 🎉 Summary

**What's Working:**
- ✅ Phantom wallet integration
- ✅ Solana Devnet connection
- ✅ Balance display
- ✅ Airdrop functionality
- ✅ Real-time updates

**What's Simulated:**
- ⏳ Loan funding transactions
- ⏳ Repayment transactions
- ⏳ Smart contract interactions

**Why This Approach:**
- Focus on UX and AI features for hackathon
- Blockchain infrastructure is ready
- Easy to add real transactions later
- Safe for demo (no real money at risk)

**For judges**: This demonstrates understanding of blockchain integration while prioritizing a working demo over complex smart contracts.
