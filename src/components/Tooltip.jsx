import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

const Tooltip = ({ children, content, icon = false }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {icon ? (
          <HelpCircle className="w-4 h-4 text-slate-400 hover:text-primary-600 transition-colors" />
        ) : (
          children
        )}
      </div>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg max-w-xs whitespace-normal animate-fade-in">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-slate-900"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
