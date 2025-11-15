import { Heart, Users, TrendingUp, Globe, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const SocialImpact = () => {
  const stories = [
    {
      name: "Amina",
      location: "Kenya",
      age: 32,
      story: "Single mother of three who used a $200 microloan to start a vegetable stand at her local market. Within 6 months, she doubled her income and sent her children to school.",
      impact: "Income increased by 120%",
      image: "👩🏾‍🌾",
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Priya",
      location: "India",
      age: 28,
      story: "Textile worker who borrowed $150 to buy a sewing machine. Now employs 3 other women in her village and creates traditional garments for export.",
      impact: "Created 3 jobs",
      image: "👩🏽‍🎨",
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Maria",
      location: "Guatemala",
      age: 45,
      story: "Coffee farmer who used a $300 loan to purchase better equipment. Her improved harvest quality led to premium prices and financial stability for her family.",
      impact: "Harvest value up 85%",
      image: "👩🏽‍🌾",
      color: "from-amber-500 to-orange-600"
    },
    {
      name: "Fatima",
      location: "Bangladesh",
      age: 35,
      story: "Started a small bakery with a $180 microloan. Her business now serves her entire neighborhood and provides steady income for her family's education and healthcare.",
      impact: "Serves 200+ families",
      image: "👩🏽‍🍳",
      color: "from-blue-500 to-cyan-600"
    },
  ]

  const stats = [
    {
      number: "1.7B",
      label: "People Without Bank Access",
      description: "Worldwide lack access to traditional financial services",
      icon: <Users className="w-8 h-8" />
    },
    {
      number: "80%",
      label: "Women Borrowers",
      description: "Of microfinance clients are women supporting families",
      icon: <Heart className="w-8 h-8" />
    },
    {
      number: "98%",
      label: "Repayment Rate",
      description: "Women have higher loan repayment rates than men",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      number: "$124B",
      label: "Market Size",
      description: "Global microfinance market helping millions",
      icon: <Globe className="w-8 h-8" />
    },
  ]

  const impactAreas = [
    {
      title: "Economic Empowerment",
      description: "Microloans enable women to start businesses, increase income, and achieve financial independence.",
      icon: "💰",
      benefits: [
        "Start or expand small businesses",
        "Increase household income by 50-200%",
        "Build savings and assets",
        "Break cycles of poverty"
      ]
    },
    {
      title: "Education Access",
      description: "Financial stability allows families to invest in children's education and break generational poverty.",
      icon: "📚",
      benefits: [
        "Send children to school",
        "Purchase books and supplies",
        "Pay for higher education",
        "Invest in skills training"
      ]
    },
    {
      title: "Healthcare Improvement",
      description: "Access to funds means better healthcare for families, reducing preventable illnesses and deaths.",
      icon: "🏥",
      benefits: [
        "Afford medical treatments",
        "Access preventive care",
        "Purchase medications",
        "Improve nutrition"
      ]
    },
    {
      title: "Community Development",
      description: "Successful women entrepreneurs create jobs and inspire others, strengthening entire communities.",
      icon: "🌍",
      benefits: [
        "Create local employment",
        "Mentor other women",
        "Strengthen local economy",
        "Build social capital"
      ]
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Heart className="w-12 h-12 text-pink-600 fill-current" />
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
                Our Impact
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Empowering women in developing countries through accessible microfinance. 
              Every loan creates ripples of positive change across entire communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace" className="btn-primary flex items-center justify-center space-x-2">
                <span>Support a Borrower</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/ai-advisor" className="btn-secondary flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-slate-900 dark:text-white mb-1">{stat.label}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Impact Areas */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How Microfinance Changes Lives
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The impact extends far beyond just money - it transforms entire communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <div key={index} className="card">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-5xl">{area.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {area.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {area.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {area.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                      <span className="text-green-500">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Blockchain Matters */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Blockchain + AI Changes Everything
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Instant Access
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Traditional banks take weeks. Blockchain enables instant loan funding - critical for emergencies and opportunities.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Near-Zero Fees
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Traditional microfinance charges 20-30% interest. Blockchain reduces costs to less than $0.01 per transaction.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                AI Guidance
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Gemini AI provides personalized financial advice and education - building financial literacy alongside access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Be Part of the Solution
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Every loan you fund changes a life. Every woman you empower strengthens a community. 
            Together, we can create financial inclusion for billions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg text-lg">
              Fund a Loan Today
            </Link>
            <Link to="/ai-advisor" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all text-lg">
              Learn How to Help
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SocialImpact
