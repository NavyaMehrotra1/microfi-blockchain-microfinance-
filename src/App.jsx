import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './contexts/ServerWalletContext'
import { GeminiProvider } from './contexts/GeminiContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoanMarketplace from './pages/LoanMarketplace'
import MyLoans from './pages/MyLoans'
import AIAdvisor from './pages/AIAdvisor'
import HowItWorks from './pages/HowItWorks'
import SocialImpact from './pages/SocialImpact'
import Transactions from './pages/Transactions'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <WalletProvider>
          <GeminiProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/marketplace" element={<LoanMarketplace />} />
                  <Route path="/my-loans" element={<MyLoans />} />
                  <Route path="/ai-advisor" element={<AIAdvisor />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/impact" element={<SocialImpact />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </GeminiProvider>
        </WalletProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
