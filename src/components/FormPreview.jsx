import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '../utils/cn'

const FormPreview = ({ formData, onBackToBuilder }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()

  const watchedValues = watch()

  const shouldShowField = (field) => {
    if (!field.conditional) return true
    
    const { field: conditionalField, value } = field.conditional
    const conditionalValue = watchedValues[conditionalField]
    
    return conditionalValue === value
  }

  const validateField = (field, value) => {
    if (field.required && !value) {
      return 'This field is required'
    }

    if (field.validation) {
      const { minLength, maxLength, min, max, email } = field.validation

      if (minLength && value && value.length < minLength) {
        return `Minimum ${minLength} characters required`
      }

      if (maxLength && value && value.length > maxLength) {
        return `Maximum ${maxLength} characters allowed`
      }

      if (min !== undefined && value && parseFloat(value) < min) {
        return `Minimum value is ${min}`
      }

      if (max !== undefined && value && parseFloat(value) > max) {
        return `Maximum value is ${max}`
      }

      if (email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    return null
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // If Google Sheets integration is enabled, send data there
      if (formData.enableSheets && formData.googleSheetsUrl) {
        const response = await fetch('/.netlify/functions/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formConfig: formData,
            submissionData: data
          })
        })

        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to submit form')
        }
      } else {
        // Simulate API call for demo
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

      setIsSubmitted(true)
      reset()
    } catch (err) {
      setError(err.message || 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field) => {
    if (!shouldShowField(field)) return null

    const fieldId = field.id
    const fieldError = errors[fieldId]?.message

    const commonProps = {
      id: fieldId,
      className: cn(
        "input",
        fieldError && "border-red-500 focus:ring-red-500 focus:border-red-500"
      ),
      placeholder: field.placeholder,
      ...register(fieldId, {
        required: field.required && 'This field is required',
        validate: (value) => validateField(field, value)
      })
    }

    switch (field.type) {
      case 'text':
        return <input type="text" {...commonProps} />

      case 'email':
        return <input type="email" {...commonProps} />

      case 'phone':
        return <input type="tel" {...commonProps} />

      case 'number':
        return <input type="number" {...commonProps} />

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows="4"
            className={cn(commonProps.className, "resize-none")}
          />
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  {...register(fieldId, {
                    required: field.required && 'Please select an option'
                  })}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register(fieldId, {
                    required: field.required && 'Please select at least one option'
                  })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'multiselect':
        return (
          <select {...commonProps} multiple className={cn(commonProps.className, "h-24")}>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      default:
        return <input type="text" {...commonProps} />
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="text-green-500 mb-4">
            <CheckCircle size={64} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted!</h2>
          <p className="text-gray-600 mb-6">
            {formData.successMessage || 'Thank you! Your form has been submitted successfully.'}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              onBackToBuilder()
            }}
            className="btn-primary"
          >
            Back to Builder
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBackToBuilder}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={16} />
          <span>Back to Builder</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData.title || 'Registration Form'}
          </h1>
          {formData.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {formData.description}
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {formData.showProgress && (
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className={cn("card", formData.formWidth || "max-w-2xl")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formData.fields.map((field) => (
            <div key={field.id} className="form-field">
              <label htmlFor={field.id} className="form-label">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.description && (
                <p className="text-sm text-gray-500 mb-2">{field.description}</p>
              )}
              
              {renderField(field)}
              
              {errors[field.id] && (
                <p className="form-error">{errors[field.id].message}</p>
              )}
            </div>
          ))}

          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={20} className="text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "btn-primary w-full flex items-center justify-center space-x-2",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>{formData.submitButtonText || 'Submit'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormPreview 