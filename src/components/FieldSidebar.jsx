import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { 
  Type, 
  Mail, 
  Phone, 
  Hash, 
  FileText, 
  Circle, 
  CheckSquare, 
  ChevronDown, 
  List,
  GripVertical
} from 'lucide-react'
import { cn } from '../utils/cn'

const fieldTypes = [
  {
    id: 'text',
    label: 'Short Text',
    description: 'Single line text input',
    icon: Type,
    color: 'text-blue-600'
  },
  {
    id: 'email',
    label: 'Email',
    description: 'Email address input',
    icon: Mail,
    color: 'text-green-600'
  },
  {
    id: 'phone',
    label: 'Phone Number',
    description: 'Phone number input',
    icon: Phone,
    color: 'text-purple-600'
  },
  {
    id: 'number',
    label: 'Number',
    description: 'Numeric input',
    icon: Hash,
    color: 'text-orange-600'
  },
  {
    id: 'textarea',
    label: 'Long Text',
    description: 'Multi-line text area',
    icon: FileText,
    color: 'text-indigo-600'
  },
  {
    id: 'radio',
    label: 'Radio Buttons',
    description: 'Single choice from options',
    icon: Circle,
    color: 'text-pink-600'
  },
  {
    id: 'checkbox',
    label: 'Checkboxes',
    description: 'Multiple choice options',
    icon: CheckSquare,
    color: 'text-teal-600'
  },
  {
    id: 'select',
    label: 'Dropdown',
    description: 'Single choice dropdown',
    icon: ChevronDown,
    color: 'text-red-600'
  },
  {
    id: 'multiselect',
    label: 'Multi-Select',
    description: 'Multiple choice dropdown',
    icon: List,
    color: 'text-yellow-600'
  }
]

const FieldSidebar = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Form Fields</h3>
        <p className="text-sm text-gray-500 mt-1">
          Drag fields to build your form
        </p>
      </div>

      <Droppable droppableId="sidebar" isDropDisabled={true}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto"
          >
            {fieldTypes.map((fieldType, index) => (
              <Draggable
                key={fieldType.id}
                draggableId={fieldType.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "group flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-move transition-all hover:bg-gray-100 hover:border-gray-300",
                      snapshot.isDragging && "shadow-lg bg-white border-primary-300"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <GripVertical size={14} className="text-gray-400" />
                      <fieldType.icon 
                        size={20} 
                        className={cn("flex-shrink-0", fieldType.color)} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {fieldType.label}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {fieldType.description}
                      </p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default FieldSidebar 