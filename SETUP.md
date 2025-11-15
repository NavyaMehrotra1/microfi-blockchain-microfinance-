# 🚀 MicroFi Setup Guide

## Prerequisites

Before you begin, make sure you have:

1. **Node.js 18+** installed ([Download](https://nodejs.org/))
2. **Phantom Wallet** browser extension ([Install](https://phantom.app/))
3. **Google Gemini API Key** ([Get one free](https://makersuite.google.com/app/apikey))

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Google Gemini API Key (Required for AI features)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Solana Network (devnet for testing, mainnet-beta for production)
VITE_SOLANA_NETWORK=devnet

# Capital One Nessie API Key (Optional)
NESSIE_API_KEY=your_nessie_api_key_here

# Server Port
PORT=3001
```

### 3. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

### 4. Set Up Phantom Wallet

1. Install [Phantom Wallet](https://phantom.app/) browser extension
2. Create a new wallet or import existing one
3. Switch to **Devnet** network:
   - Click settings (gear icon)
   - Scroll to "Developer Settings"
   - Enable "Testnet Mode"
   - Select "Devnet"
4. Get free devnet SOL:
   - Copy your wallet address
   - Visit [Solana Faucet](https://faucet.solana.com/)
   - Paste your address and request airdrop

### 5. Start the Application

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

## 🎯 Testing the App

### 1. Connect Wallet
- Click "Connect Wallet" in the navbar
- Approve the connection in Phantom wallet
- You should see your wallet address and balance

### 2. Get Devnet SOL (if needed)
- If your balance is 0, you can request an airdrop
- Or visit [Solana Faucet](https://faucet.solana.com/)

### 3. Try AI Advisor
- Navigate to "AI Advisor" page
- Ask questions like:
  - "What's the best loan amount for a small business?"
  - "How does blockchain lending work?"
  - "What interest rate should I expect?"

### 4. Browse Marketplace
- Navigate to "Marketplace"
- View available loan requests
- Try funding a loan (requires connected wallet)

### 5. Create Loan Request
- Click "Request Loan" button
- Fill in loan details
- Get AI risk assessment
- Submit your request

## 🏆 Hackathon Demo Tips

### For Judges

1. **Google Gemini Integration**
   - Show the AI Advisor chat
   - Demonstrate loan risk assessment
   - Ask complex financial questions

2. **Solana Blockchain**
   - Show wallet connection
   - Demonstrate fast transactions
   - Highlight low fees (<$0.01)

3. **Educational Features**
   - Point out tooltips throughout the app
   - Show "How It Works" page
   - Demonstrate financial literacy focus

4. **User Experience**
   - Modern, responsive design
   - Intuitive navigation
   - Clear explainers for blockchain concepts

### Demo Script

1. **Introduction** (30 seconds)
   - "MicroFi democratizes microfinance using AI and blockchain"
   - "Built with Google Gemini, Solana, and React"

2. **AI Advisor Demo** (1 minute)
   - Connect wallet
   - Ask AI for financial advice
   - Show personalized recommendations

3. **Marketplace Demo** (1 minute)
   - Browse loan requests
   - Show loan details and risk scores
   - Demonstrate funding process

4. **Educational Features** (30 seconds)
   - Show tooltips and explainers
   - Navigate to "How It Works"
   - Highlight financial literacy focus

5. **Technical Highlights** (30 seconds)
   - Fast Solana transactions
   - Low fees
   - Transparent smart contracts

## 🐛 Troubleshooting

### "Failed to get AI response"
- Check that your Gemini API key is correctly set in `.env`
- Make sure the backend server is running
- Check browser console for errors

### "Please install Phantom wallet"
- Install Phantom wallet extension
- Refresh the page after installation

### "Insufficient funds"
- Make sure you're on Devnet network
- Request airdrop from Solana faucet
- Wait a few seconds for transaction to confirm

### Backend won't start
- Check that port 3001 is not in use
- Make sure all dependencies are installed
- Check for syntax errors in server/index.js

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🌐 Deployment

### Frontend (Netlify/Vercel)
1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Set environment variables in dashboard
4. Deploy!

### Backend (Heroku/Railway)
1. Create new app
2. Set environment variables
3. Deploy from GitHub
4. Update frontend API URL

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key (frontend) |
| `GEMINI_API_KEY` | Yes | Google Gemini API key (backend) |
| `VITE_SOLANA_NETWORK` | No | Solana network (default: devnet) |
| `NESSIE_API_KEY` | No | Capital One Nessie API key |
| `PORT` | No | Backend server port (default: 3001) |

## 🎓 Learning Resources

- [Solana Documentation](https://docs.solana.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Phantom Wallet Guide](https://phantom.app/learn)
- [DeFi Basics](https://ethereum.org/en/defi/)

## 🤝 Support

If you encounter any issues:
1. Check this guide first
2. Look at browser console for errors
3. Check backend server logs
4. Review the README.md

## 🎉 You're All Set!

Your MicroFi app should now be running. Good luck with your hackathon! 🚀
