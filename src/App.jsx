import React, { useState } from 'react'
import FormBuilder from './components/FormBuilder'
import FormPreview from './components/FormPreview'
import Header from './components/Header'
import { cn } from './utils/cn'

function App() {
  const [currentView, setCurrentView] = useState('builder') // 'builder' or 'preview'
  const [formData, setFormData] = useState({
    title: 'Registration Form',
    description: 'Please fill out the form below',
    fields: []
  })

  const handleFormDataChange = (newData) => {
    setFormData(newData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
        formData={formData}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className={cn(
          "transition-all duration-300",
          currentView === 'preview' ? 'opacity-100' : 'opacity-100'
        )}>
          {currentView === 'builder' ? (
            <FormBuilder 
              formData={formData}
              onFormDataChange={handleFormDataChange}
            />
          ) : (
            <FormPreview 
              formData={formData}
              onBackToBuilder={() => setCurrentView('builder')}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App 