# 🎯 Quick Demo Instructions for Technica

## ⚡ 5-Minute Setup

### 1. Create .env file
```bash
cp .env.example .env
```

Then edit `.env` and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
VITE_SOLANA_NETWORK=devnet
PORT=3001
```

Get your FREE Gemini API key: https://makersuite.google.com/app/apikey

### 2. Start the app (2 terminals)

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Open: http://localhost:5173

### 3. Set up Phantom Wallet
1. Install: https://phantom.app/
2. Create wallet
3. Switch to Devnet (Settings → Developer Settings → Testnet Mode)
4. Get free SOL: https://faucet.solana.com/

## 🎬 Demo Flow (3 minutes)

### Slide 1: Home Page (30 sec)
- Show beautiful landing page
- Highlight key features with tooltips
- Point out educational focus

### Slide 2: AI Advisor (60 sec)
- Click "Talk to AI Advisor"
- Connect wallet
- Ask: "What's the best loan amount for a small business?"
- Ask: "How does blockchain lending work?"
- Show real-time AI responses from Gemini

### Slide 3: Marketplace (60 sec)
- Navigate to Marketplace
- Show loan cards with risk scores
- Point out funding progress bars
- Try funding a loan (enter amount)
- Highlight fast Solana transactions

### Slide 4: How It Works (30 sec)
- Navigate to "How It Works"
- Scroll through educational sections
- Show blockchain explainers
- Highlight tooltips throughout

## 🏆 Judging Criteria Highlights

### Google Gemini API ✅
- **AI Chatbot**: Real-time financial advice
- **Risk Assessment**: Automated loan evaluation
- **Content Generation**: Personalized recommendations
- **Natural Language**: Understands complex financial questions

### Best Use of Solana ✅
- **Fast Transactions**: Near-instant loan funding
- **Low Fees**: <$0.01 per transaction
- **Scalability**: Can handle high volume
- **Real-world Use**: Microfinance for underserved communities

### Capital One - Best Financial Hack ✅
- **Financial Inclusion**: Removes banking barriers
- **Financial Literacy**: Educational explainers throughout
- **Accessible**: Anyone with internet can participate
- **Transparent**: Blockchain ensures fair terms

## 💡 Key Talking Points

1. **Problem**: 1.7 billion people lack access to financial services
2. **Solution**: AI + Blockchain = Democratized microfinance
3. **Innovation**: 
   - Gemini AI provides personalized advice
   - Solana enables instant, low-cost transactions
   - Smart contracts ensure transparency
4. **Impact**: Financial inclusion for underserved communities globally

## 🎨 Technical Highlights

- **Frontend**: React 18, Vite, TailwindCSS
- **AI**: Google Gemini Pro
- **Blockchain**: Solana Web3.js
- **Wallet**: Phantom integration
- **UI/UX**: Modern, responsive, educational

## 🐛 Quick Fixes

**AI not responding?**
- Check .env has GEMINI_API_KEY
- Restart backend server

**Wallet won't connect?**
- Install Phantom extension
- Refresh page

**No SOL?**
- Visit https://faucet.solana.com/
- Paste your wallet address
- Request airdrop

## 📸 Screenshot Checklist

Before demo, take screenshots of:
- [ ] Home page hero section
- [ ] AI Advisor chat with responses
- [ ] Marketplace with loan cards
- [ ] My Loans dashboard
- [ ] How It Works educational content
- [ ] Wallet connected with balance

## 🎤 Elevator Pitch (30 seconds)

"MicroFi democratizes microfinance using AI and blockchain. Our Google Gemini-powered advisor provides personalized financial guidance, while Solana blockchain enables instant, low-cost microloans. We're removing traditional banking barriers and making financial services accessible to 1.7 billion unbanked people worldwide. With educational explainers throughout, we're not just providing loans - we're building financial literacy."

## ✨ Wow Factors

1. **Real AI Integration**: Not fake/mocked - actual Gemini API calls
2. **Live Blockchain**: Real Solana devnet integration
3. **Beautiful UI**: Modern, polished design
4. **Educational**: Tooltips and explainers everywhere
5. **Complete**: Full-stack app with frontend + backend
6. **Fast Build**: Built in <24 hours for hackathon

Good luck! 🚀
