const { google } = require('googleapis')

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    // Parse the request body
    const formData = JSON.parse(event.body)
    
    // Extract form configuration and submission data
    const { formConfig, submissionData } = formData
    
    // Validate required fields
    if (!formConfig.googleSheetsUrl || !formConfig.sheetName) {
      throw new Error('Google Sheets configuration is missing')
    }

    // Extract spreadsheet ID from URL
    const spreadsheetId = extractSpreadsheetId(formConfig.googleSheetsUrl)
    
    // Prepare data for Google Sheets
    const sheetsData = prepareSheetsData(formConfig, submissionData)
    
    // Send data to Google Sheets
    await writeToGoogleSheets(spreadsheetId, formConfig.sheetName, sheetsData)
    
    // Send email notification if enabled
    if (formConfig.emailNotifications && formConfig.notificationEmail) {
      await sendEmailNotification(formConfig, submissionData)
    }

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: formConfig.successMessage || 'Form submitted successfully!'
      })
    }

  } catch (error) {
    console.error('Form submission error:', error)
    
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        message: 'Failed to submit form. Please try again.'
      })
    }
  }
}

function extractSpreadsheetId(url) {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  if (!match) {
    throw new Error('Invalid Google Sheets URL')
  }
  return match[1]
}

function prepareSheetsData(formConfig, submissionData) {
  // Get current timestamp
  const timestamp = new Date().toISOString()
  
  // Prepare headers (field labels)
  const headers = formConfig.fields.map(field => field.label)
  headers.unshift('Timestamp') // Add timestamp column
  
  // Prepare row data
  const rowData = formConfig.fields.map(field => {
    const value = submissionData[field.id]
    
    // Handle different field types
    switch (field.type) {
      case 'checkbox':
      case 'multiselect':
        return Array.isArray(value) ? value.join(', ') : value || ''
      case 'radio':
      case 'select':
        return value || ''
      default:
        return value || ''
    }
  })
  rowData.unshift(timestamp) // Add timestamp
  
  return { headers, rowData }
}

async function writeToGoogleSheets(spreadsheetId, sheetName, { headers, rowData }) {
  const sheets = google.sheets({ version: 'v4', auth })
  
  try {
    // First, check if the sheet exists and get its properties
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId
    })
    
    const sheet = spreadsheet.data.sheets.find(s => 
      s.properties.title === sheetName
    )
    
    if (!sheet) {
      // Create new sheet if it doesn't exist
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }]
        }
      })
    }
    
    // Check if headers exist (first row)
    const firstRow = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:Z1`
    })
    
    const hasHeaders = firstRow.data.values && firstRow.data.values.length > 0
    
    if (!hasHeaders) {
      // Write headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        resource: {
          values: [headers]
        }
      })
    }
    
    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:A`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData]
      }
    })
    
  } catch (error) {
    console.error('Google Sheets API error:', error)
    throw new Error('Failed to write to Google Sheets')
  }
}

async function sendEmailNotification(formConfig, submissionData) {
  // This would integrate with your preferred email service
  // (SendGrid, Mailgun, etc.) or use Netlify's built-in email service
  
  const emailData = {
    to: formConfig.notificationEmail,
    subject: `New form submission: ${formConfig.title}`,
    body: `
      New form submission received:
      
      Form: ${formConfig.title}
      Time: ${new Date().toLocaleString()}
      
      Submission data:
      ${Object.entries(submissionData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}
    `
  }
  
  // For now, just log the email data
  console.log('Email notification:', emailData)
  
  // In production, you would send the actual email here
  // Example with SendGrid:
  // await sendGrid.send(emailData)
} 