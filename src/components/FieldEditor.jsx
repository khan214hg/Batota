import React, { useState } from 'react'
import { X, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { cn } from '../utils/cn'

const FieldEditor = ({ field, onUpdate, onClose }) => {
  const [showConditional, setShowConditional] = useState(false)

  const handleChange = (key, value) => {
    onUpdate({ [key]: value })
  }

  const addOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`]
    onUpdate({ options: newOptions })
  }

  const updateOption = (index, value) => {
    const newOptions = [...(field.options || [])]
    newOptions[index] = value
    onUpdate({ options: newOptions })
  }

  const removeOption = (index) => {
    const newOptions = (field.options || []).filter((_, i) => i !== index)
    onUpdate({ options: newOptions })
  }

  const hasOptions = ['radio', 'checkbox', 'select', 'multiselect'].includes(field.type)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Field Properties</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Basic Properties */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Basic Settings</h4>
          
          <div className="form-field">
            <label className="form-label">Field Label</label>
            <input
              type="text"
              value={field.label || ''}
              onChange={(e) => handleChange('label', e.target.value)}
              className="input"
              placeholder="Enter field label"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Placeholder Text</label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className="input"
              placeholder="Enter placeholder text"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea
              value={field.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="input resize-none"
              rows="3"
              placeholder="Enter field description"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="required"
              checked={field.required || false}
              onChange={(e) => handleChange('required', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="required" className="text-sm font-medium text-gray-700">
              Required field
            </label>
          </div>
        </div>

        {/* Field Type Specific Options */}
        {hasOptions && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Options</h4>
            
            <div className="space-y-2">
              {(field.options || []).map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="input flex-1"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              
              <button
                onClick={addOption}
                className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                <Plus size={14} />
                <span>Add Option</span>
              </button>
            </div>
          </div>
        )}

        {/* Validation Rules */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Validation</h4>
          
          {field.type === 'text' && (
            <div className="form-field">
              <label className="form-label">Minimum Length</label>
              <input
                type="number"
                value={field.validation?.minLength || ''}
                onChange={(e) => handleChange('validation', {
                  ...field.validation,
                  minLength: e.target.value ? parseInt(e.target.value) : undefined
                })}
                className="input"
                placeholder="Minimum characters"
              />
            </div>
          )}

          {field.type === 'text' && (
            <div className="form-field">
              <label className="form-label">Maximum Length</label>
              <input
                type="number"
                value={field.validation?.maxLength || ''}
                onChange={(e) => handleChange('validation', {
                  ...field.validation,
                  maxLength: e.target.value ? parseInt(e.target.value) : undefined
                })}
                className="input"
                placeholder="Maximum characters"
              />
            </div>
          )}

          {field.type === 'number' && (
            <div className="form-field">
              <label className="form-label">Minimum Value</label>
              <input
                type="number"
                value={field.validation?.min || ''}
                onChange={(e) => handleChange('validation', {
                  ...field.validation,
                  min: e.target.value ? parseFloat(e.target.value) : undefined
                })}
                className="input"
                placeholder="Minimum value"
              />
            </div>
          )}

          {field.type === 'number' && (
            <div className="form-field">
              <label className="form-label">Maximum Value</label>
              <input
                type="number"
                value={field.validation?.max || ''}
                onChange={(e) => handleChange('validation', {
                  ...field.validation,
                  max: e.target.value ? parseFloat(e.target.value) : undefined
                })}
                className="input"
                placeholder="Maximum value"
              />
            </div>
          )}

          {field.type === 'email' && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emailValidation"
                checked={field.validation?.email || false}
                onChange={(e) => handleChange('validation', {
                  ...field.validation,
                  email: e.target.checked
                })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="emailValidation" className="text-sm font-medium text-gray-700">
                Validate email format
              </label>
            </div>
          )}
        </div>

        {/* Conditional Logic */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">Conditional Logic</h4>
            <button
              onClick={() => setShowConditional(!showConditional)}
              className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
            >
              {showConditional ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{showConditional ? 'Hide' : 'Show'} Logic</span>
            </button>
          </div>

          {showConditional && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="form-field">
                <label className="form-label">Show this field when</label>
                <select
                  value={field.conditional?.field || ''}
                  onChange={(e) => handleChange('conditional', {
                    ...field.conditional,
                    field: e.target.value
                  })}
                  className="input"
                >
                  <option value="">Select a field</option>
                  {/* This would be populated with other field IDs */}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Has value</label>
                <input
                  type="text"
                  value={field.conditional?.value || ''}
                  onChange={(e) => handleChange('conditional', {
                    ...field.conditional,
                    value: e.target.value
                  })}
                  className="input"
                  placeholder="Enter condition value"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FieldEditor 