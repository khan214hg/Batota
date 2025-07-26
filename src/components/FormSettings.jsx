import React from 'react'
import { X, Save } from 'lucide-react'

const FormSettings = ({ formData, onUpdate, onClose }) => {
  const handleChange = (key, value) => {
    onUpdate({ [key]: value })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Form Settings</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Basic Form Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div className="form-field">
              <label className="form-label">Form Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="input"
                placeholder="Enter form title"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Form Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="input resize-none"
                rows="3"
                placeholder="Enter form description"
              />
            </div>
          </div>

          {/* Submission Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Submission Settings</h3>
            
            <div className="form-field">
              <label className="form-label">Success Message</label>
              <input
                type="text"
                value={formData.successMessage || 'Thank you! Your form has been submitted successfully.'}
                onChange={(e) => handleChange('successMessage', e.target.value)}
                className="input"
                placeholder="Enter success message"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Submit Button Text</label>
              <input
                type="text"
                value={formData.submitButtonText || 'Submit'}
                onChange={(e) => handleChange('submitButtonText', e.target.value)}
                className="input"
                placeholder="Enter submit button text"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showProgress"
                checked={formData.showProgress || false}
                onChange={(e) => handleChange('showProgress', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="showProgress" className="text-sm font-medium text-gray-700">
                Show progress bar
              </label>
            </div>
          </div>

          {/* Google Sheets Integration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Google Sheets Integration</h3>
            
            <div className="form-field">
              <label className="form-label">Google Sheets URL</label>
              <input
                type="url"
                value={formData.googleSheetsUrl || ''}
                onChange={(e) => handleChange('googleSheetsUrl', e.target.value)}
                className="input"
                placeholder="https://docs.google.com/spreadsheets/d/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the URL of your Google Sheets document where form data will be saved
              </p>
            </div>

            <div className="form-field">
              <label className="form-label">Sheet Name</label>
              <input
                type="text"
                value={formData.sheetName || 'Form Responses'}
                onChange={(e) => handleChange('sheetName', e.target.value)}
                className="input"
                placeholder="Enter sheet name"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableSheets"
                checked={formData.enableSheets || false}
                onChange={(e) => handleChange('enableSheets', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="enableSheets" className="text-sm font-medium text-gray-700">
                Enable Google Sheets integration
              </label>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
            
            <div className="form-field">
              <label className="form-label">Notification Email</label>
              <input
                type="email"
                value={formData.notificationEmail || ''}
                onChange={(e) => handleChange('notificationEmail', e.target.value)}
                className="input"
                placeholder="Enter email for notifications"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={formData.emailNotifications || false}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                Send email notifications on form submission
              </label>
            </div>
          </div>

          {/* Styling Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Styling</h3>
            
            <div className="form-field">
              <label className="form-label">Primary Color</label>
              <input
                type="color"
                value={formData.primaryColor || '#3b82f6'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Form Width</label>
              <select
                value={formData.formWidth || 'max-w-2xl'}
                onChange={(e) => handleChange('formWidth', e.target.value)}
                className="input"
              >
                <option value="max-w-sm">Narrow</option>
                <option value="max-w-md">Medium</option>
                <option value="max-w-lg">Wide</option>
                <option value="max-w-2xl">Extra Wide</option>
                <option value="max-w-full">Full Width</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="btn-primary flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSettings 