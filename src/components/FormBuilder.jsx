import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, GripVertical, Trash2, Copy, Settings } from 'lucide-react'
import FieldSidebar from './FieldSidebar'
import FormSettings from './FormSettings'
import FieldEditor from './FieldEditor'
import { cn } from '../utils/cn'

const FormBuilder = ({ formData, onFormDataChange }) => {
  const [selectedField, setSelectedField] = useState(null)
  const [showSettings, setShowSettings] = useState(false)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === 'sidebar' && destination.droppableId === 'form') {
      // Adding new field from sidebar
      const fieldType = result.draggableId
      const newField = createField(fieldType)
      const newFields = Array.from(formData.fields)
      newFields.splice(destination.index, 0, newField)
      
      onFormDataChange({
        ...formData,
        fields: newFields
      })
      
      setSelectedField(newField.id)
    } else if (source.droppableId === 'form' && destination.droppableId === 'form') {
      // Reordering fields within form
      const newFields = Array.from(formData.fields)
      const [removed] = newFields.splice(source.index, 1)
      newFields.splice(destination.index, 0, removed)
      
      onFormDataChange({
        ...formData,
        fields: newFields
      })
    }
  }

  const createField = (type) => {
    const id = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const baseField = {
      id,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      placeholder: '',
      description: '',
      validation: {},
      conditional: null
    }

    switch (type) {
      case 'text':
        return { ...baseField, placeholder: 'Enter text...' }
      case 'email':
        return { ...baseField, label: 'Email Address', placeholder: 'Enter your email...' }
      case 'phone':
        return { ...baseField, label: 'Phone Number', placeholder: 'Enter your phone number...' }
      case 'number':
        return { ...baseField, label: 'Number', placeholder: 'Enter a number...' }
      case 'textarea':
        return { ...baseField, label: 'Long Text', placeholder: 'Enter your message...' }
      case 'radio':
        return { 
          ...baseField, 
          label: 'Radio Options',
          options: ['Option 1', 'Option 2', 'Option 3']
        }
      case 'checkbox':
        return { 
          ...baseField, 
          label: 'Checkbox Options',
          options: ['Option 1', 'Option 2', 'Option 3']
        }
      case 'select':
        return { 
          ...baseField, 
          label: 'Dropdown',
          options: ['Option 1', 'Option 2', 'Option 3']
        }
      case 'multiselect':
        return { 
          ...baseField, 
          label: 'Multi-Select',
          options: ['Option 1', 'Option 2', 'Option 3']
        }
      default:
        return baseField
    }
  }

  const updateField = (fieldId, updates) => {
    const newFields = formData.fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    )
    
    onFormDataChange({
      ...formData,
      fields: newFields
    })
  }

  const deleteField = (fieldId) => {
    const newFields = formData.fields.filter(field => field.id !== fieldId)
    onFormDataChange({
      ...formData,
      fields: newFields
    })
    
    if (selectedField === fieldId) {
      setSelectedField(null)
    }
  }

  const duplicateField = (fieldId) => {
    const fieldToDuplicate = formData.fields.find(field => field.id === fieldId)
    if (!fieldToDuplicate) return
    
    const duplicatedField = {
      ...fieldToDuplicate,
      id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      label: `${fieldToDuplicate.label} (Copy)`
    }
    
    const newFields = [...formData.fields, duplicatedField]
    onFormDataChange({
      ...formData,
      fields: newFields
    })
  }

  const updateFormSettings = (settings) => {
    onFormDataChange({
      ...formData,
      ...settings
    })
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Field Sidebar */}
      <div className="w-80 flex-shrink-0">
        <FieldSidebar />
      </div>

      {/* Main Form Area */}
      <div className="flex-1 flex gap-6">
        {/* Form Canvas */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Form Design</h2>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings size={16} />
                <span>Form Settings</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="form">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 min-h-[400px]"
                  >
                    {formData.fields.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Plus size={48} className="mx-auto" />
                        </div>
                        <p className="text-gray-500">Drag fields from the sidebar to start building your form</p>
                      </div>
                    ) : (
                      formData.fields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                "group relative bg-white border-2 rounded-lg p-4 transition-all",
                                selectedField === field.id
                                  ? "border-primary-500 bg-primary-50"
                                  : "border-gray-200 hover:border-gray-300",
                                snapshot.isDragging && "shadow-lg"
                              )}
                              onClick={() => setSelectedField(field.id)}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div {...provided.dragHandleProps} className="flex items-center space-x-2">
                                  <GripVertical size={16} className="text-gray-400 cursor-move" />
                                  <span className="text-sm font-medium text-gray-700">
                                    {field.label}
                                  </span>
                                  {field.required && (
                                    <span className="text-red-500 text-sm">*</span>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      duplicateField(field.id)
                                    }}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                  >
                                    <Copy size={14} />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteField(field.id)
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="text-sm text-gray-500">
                                {renderFieldPreview(field)}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Field Editor Sidebar */}
        <div className="w-80 flex-shrink-0">
          {selectedField ? (
            <FieldEditor
              field={formData.fields.find(f => f.id === selectedField)}
              onUpdate={(updates) => updateField(selectedField, updates)}
              onClose={() => setSelectedField(null)}
            />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center text-gray-500">
                <Settings size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a field to edit its properties</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Settings Modal */}
      {showSettings && (
        <FormSettings
          formData={formData}
          onUpdate={updateFormSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

const renderFieldPreview = (field) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
    case 'number':
      return `Text input: ${field.placeholder || 'Enter value...'}`
    case 'textarea':
      return `Text area: ${field.placeholder || 'Enter text...'}`
    case 'radio':
      return `Radio buttons: ${field.options?.length || 0} options`
    case 'checkbox':
      return `Checkboxes: ${field.options?.length || 0} options`
    case 'select':
      return `Dropdown: ${field.options?.length || 0} options`
    case 'multiselect':
      return `Multi-select: ${field.options?.length || 0} options`
    default:
      return field.type
  }
}

export default FormBuilder 