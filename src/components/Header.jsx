import React from 'react'
import { Settings, Eye, Edit3, Download } from 'lucide-react'
import { cn } from '../utils/cn'

const Header = ({ currentView, onViewChange, formData }) => {
  const exportForm = () => {
    const formConfig = {
      ...formData,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(formConfig, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.title.replace(/\s+/g, '-').toLowerCase()}-config.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Registration Form Builder
            </h1>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onViewChange('builder')}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  currentView === 'builder'
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Edit3 size={16} />
                <span>Builder</span>
              </button>
              
              <button
                onClick={() => onViewChange('preview')}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  currentView === 'preview'
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={exportForm}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 