import { Sparkles, Zap, Shield, Users, TrendingUp, BookOpen, Wallet, FileText } from 'lucide-react'
import Tooltip from '../components/Tooltip'
import BlockchainVisual from '../components/BlockchainVisual'

const HowItWorks = () => {
  const sections = [
    {
      icon: <Wallet className="w-12 h-12" />,
      title: 'Blockchain & Solana',
      color: 'from-purple-600 to-blue-600',
      content: [
        {
          subtitle: 'What is Blockchain?',
          text: 'Blockchain is a distributed ledger technology that records transactions across multiple computers. Think of it as a digital notebook that everyone can read, but no one can erase or alter.',
        },
        {
          subtitle: 'Why Solana?',
          text: 'Solana is one of the fastest blockchains, processing 65,000 transactions per second with fees under $0.01. This makes it perfect for microfinance where speed and low costs are crucial.',
        },
        {
          subtitle: 'Your Wallet',
          text: 'Your Phantom wallet is like a digital bank account. It stores your SOL (Solana\'s cryptocurrency) and allows you to interact with blockchain applications securely.',
        },
      ],
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'AI-Powered Advice',
      color: 'from-primary-600 to-accent-600',
      content: [
        {
          subtitle: 'Google Gemini AI',
          text: 'Our AI advisor uses Google\'s most advanced AI model to provide personalized financial guidance. It can answer questions, assess loan risks, and help you make informed decisions.',
        },
        {
          subtitle: 'Risk Assessment',
          text: 'When you request a loan, our AI analyzes factors like loan amount, duration, purpose, and your description to provide a risk score. This helps lenders make informed decisions.',
        },
        {
          subtitle: 'Financial Education',
          text: 'Ask the AI anything about personal finance, DeFi, interest rates, or loan management. It\'s like having a financial advisor available 24/7.',
        },
      ],
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Peer-to-Peer Lending',
      color: 'from-green-600 to-teal-600',
      content: [
        {
          subtitle: 'How It Works',
          text: 'Borrowers create loan requests specifying amount, interest rate, and duration. Lenders browse these requests and fund loans that match their risk tolerance. No banks or intermediaries needed!',
        },
        {
          subtitle: 'Smart Contracts',
          text: 'All loan agreements are encoded in smart contracts - self-executing programs on the blockchain. They automatically handle fund transfers, payment schedules, and ensure transparency.',
        },
        {
          subtitle: 'Community Driven',
          text: 'MicroFi connects people directly. Lenders earn interest on their investments, while borrowers get access to fair, transparent loans without traditional banking barriers.',
        },
      ],
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Security & Transparency',
      color: 'from-red-600 to-orange-600',
      content: [
        {
          subtitle: 'On-Chain Credit History',
          text: 'Every loan and repayment is recorded on the blockchain, creating a verifiable credit history. This helps you build trust and access better loan terms over time.',
        },
        {
          subtitle: 'Transparent Terms',
          text: 'All loan terms are visible on the blockchain. Interest rates, payment schedules, and loan status are publicly verifiable, ensuring complete transparency.',
        },
        {
          subtitle: 'Secure Transactions',
          text: 'Blockchain technology ensures that transactions are secure, immutable, and cannot be reversed or tampered with. Your funds are protected by cryptographic security.',
        },
      ],
    },
  ]

  const steps = [
    {
      number: 1,
      title: 'Connect Wallet',
      description: 'Install Phantom wallet extension and connect it to MicroFi',
      icon: <Wallet className="w-8 h-8" />,
    },
    {
      number: 2,
      title: 'Get SOL',
      description: 'Get some SOL from an exchange or request devnet airdrop for testing',
      icon: <Zap className="w-8 h-8" />,
    },
    {
      number: 3,
      title: 'Talk to AI',
      description: 'Consult our AI advisor to understand loan options and get recommendations',
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      number: 4,
      title: 'Request or Fund',
      description: 'Create a loan request as a borrower or fund existing loans as a lender',
      icon: <FileText className="w-8 h-8" />,
    },
    {
      number: 5,
      title: 'Track Progress',
      description: 'Monitor your loans, make payments, and track earnings in real-time',
      icon: <TrendingUp className="w-8 h-8" />,
    },
  ]

  const faqs = [
    {
      question: 'What is microfinance?',
      answer: 'Microfinance provides small loans to individuals who typically lack access to traditional banking services. It helps people start businesses, pay for education, or handle emergencies.',
    },
    {
      question: 'How much does it cost to use MicroFi?',
      answer: 'Transaction fees on Solana are typically less than $0.01. There are no platform fees - you only pay the interest rate agreed upon with lenders.',
    },
    {
      question: 'What happens if I can\'t repay my loan?',
      answer: 'Late or missed payments will be recorded on-chain and may affect your credit score. We encourage responsible borrowing and recommend only taking loans you can afford to repay.',
    },
    {
      question: 'How do I earn money as a lender?',
      answer: 'As a lender, you earn interest on the loans you fund. The interest rate is set by the borrower, and you receive monthly payments including principal and interest.',
    },
    {
      question: 'Is my money safe?',
      answer: 'Funds are secured by blockchain technology and smart contracts. However, lending always carries risk - borrowers may default. Diversify your lending to manage risk.',
    },
    {
      question: 'Can I use this on mainnet with real money?',
      answer: 'This is currently a demo running on Solana devnet. For production use, additional security audits and features would be needed.',
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-100 via-accent-50 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <BookOpen className="w-12 h-12 text-primary-600" />
            <h1 className="text-5xl font-bold text-slate-900">How MicroFi Works</h1>
          </div>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Learn about blockchain, AI, and peer-to-peer lending. 
            We've made it simple to understand, even if you're new to crypto!
          </p>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">
          Getting Started in 5 Steps
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Follow these simple steps to start using MicroFi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <div className="bg-primary-100 p-3 rounded-lg text-primary-600 w-fit mx-auto mb-3">
                {step.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blockchain Visual Explanation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
          Visual: How Blockchain Powers MicroFi
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          See exactly how your loan flows through the blockchain
        </p>
        <BlockchainVisual />
      </section>

      {/* Educational Sections */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Understanding the Technology
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Learn about the technologies that power MicroFi
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="card">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`bg-gradient-to-br ${section.color} p-4 rounded-xl text-white`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{section.title}</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="pl-4 border-l-4 border-primary-200">
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2">
                        <span>{item.subtitle}</span>
                        <Tooltip content="Click to learn more" icon />
                      </h4>
                      <p className="text-slate-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Got questions? We've got answers!
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="card group">
              <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-slate-700 mt-4 pt-4 border-t border-slate-200">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the future of microfinance today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/marketplace" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg">
              Explore Marketplace
            </a>
            <a href="/ai-advisor" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
              Talk to AI Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
