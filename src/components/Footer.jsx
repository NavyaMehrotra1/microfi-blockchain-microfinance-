import { Github, Twitter, Heart, Sparkles } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                MicroFi
              </span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md">
              Democratizing microfinance with AI-powered advice and blockchain technology. 
              Built for Technica Hackathon 2024.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-slate-600 hover:text-primary-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/marketplace" className="text-slate-600 hover:text-primary-600 transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/ai-advisor" className="text-slate-600 hover:text-primary-600 transition-colors">
                  AI Advisor
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-slate-600 hover:text-primary-600 transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Powered By</h3>
            <ul className="space-y-2 text-slate-600">
              <li>🤖 Google Gemini AI</li>
              <li>⚡ Solana Blockchain</li>
              <li>⚛️ React + Vite</li>
              <li>🎨 TailwindCSS</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-slate-600 flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for Technica Hackathon 2024</span>
          </p>
          <p className="text-sm text-slate-500 mt-2">
            © 2024 MicroFi. Educational project for hackathon purposes.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
