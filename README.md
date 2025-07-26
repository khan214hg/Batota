# Registration Form Builder

A powerful, drag-and-drop form builder with advanced features like conditional logic, validation, and Google Sheets integration. Built with React and deployed on Netlify.

## 🚀 Features

### Form Builder
- **Drag & Drop Interface**: Intuitive form building with visual field management
- **Multiple Field Types**: Text, email, phone, number, textarea, radio buttons, checkboxes, dropdown, multi-select
- **Field Properties**: Customize labels, placeholders, descriptions, and validation rules
- **Conditional Logic**: Show/hide fields based on other field values
- **Form Settings**: Configure title, description, styling, and submission behavior

### Advanced Features
- **Real-time Preview**: Test your forms before publishing
- **Validation Rules**: Required fields, length limits, number ranges, email validation
- **Google Sheets Integration**: Automatic data collection in Google Sheets
- **Email Notifications**: Get notified when forms are submitted
- **Responsive Design**: Works perfectly on all devices
- **Export/Import**: Save and load form configurations

### Field Types Supported
- ✅ Short Text Input
- ✅ Email Address
- ✅ Phone Number
- ✅ Number Input
- ✅ Long Text (Textarea)
- ✅ Radio Buttons
- ✅ Checkboxes
- ✅ Dropdown Select
- ✅ Multi-Select

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Form Handling**: React Hook Form
- **Drag & Drop**: React Beautiful DnD
- **Icons**: Lucide React
- **Backend**: Netlify Functions
- **Data Storage**: Google Sheets API
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd registration-form-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Netlify Functions dependencies**
   ```bash
   cd netlify/functions
   npm install
   cd ../..
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Google Sheets Setup

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API

### 2. Create Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Give it a name (e.g., "form-builder")
4. Grant "Editor" role
5. Create and download the JSON key file

### 3. Set up Google Sheets
1. Create a new Google Sheets document
2. Share it with your service account email (from the JSON file)
3. Give it "Editor" permissions

### 4. Configure Environment Variables
Add these to your Netlify environment variables:
```
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

## 🚀 Deployment

### Deploy to Netlify

1. **Connect to Netlify**
   - Push your code to GitHub
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Configure Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add `GOOGLE_SERVICE_ACCOUNT_KEY` with your service account JSON

3. **Deploy**
   - Netlify will automatically deploy on every push
   - Your form builder will be live at your Netlify URL

### Local Development with Netlify Functions

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start development server with functions
netlify dev
```

## 📖 Usage

### Building a Form

1. **Add Fields**: Drag field types from the sidebar to the form area
2. **Configure Fields**: Click on any field to edit its properties
3. **Set Validation**: Add validation rules like required fields, length limits, etc.
4. **Add Conditional Logic**: Show/hide fields based on other field values
5. **Preview**: Switch to preview mode to test your form
6. **Configure Settings**: Set up Google Sheets integration and other options

### Form Settings

- **Basic Info**: Title, description, styling
- **Submission**: Success message, button text, progress bar
- **Google Sheets**: URL, sheet name, enable/disable
- **Email Notifications**: Notification email, enable/disable
- **Styling**: Primary color, form width

### Google Sheets Integration

1. Enable Google Sheets integration in form settings
2. Enter your Google Sheets URL
3. Set the sheet name (will be created if it doesn't exist)
4. Form submissions will automatically appear in your sheet

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in `src/index.css`
- Form appearance in form settings

### Adding New Field Types
1. Add the field type to `fieldTypes` array in `FieldSidebar.jsx`
2. Add field creation logic in `FormBuilder.jsx`
3. Add rendering logic in `FormPreview.jsx`
4. Add validation rules in `FieldEditor.jsx`

## 🔒 Security

- Google Sheets API uses service account authentication
- Form data is sent securely via HTTPS
- No sensitive data is stored in the frontend
- CORS is properly configured for Netlify Functions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify your Google Sheets setup
3. Check Netlify function logs
4. Ensure environment variables are set correctly

## 🚀 Roadmap

- [ ] File upload fields
- [ ] Date/time pickers
- [ ] Signature fields
- [ ] Payment integration
- [ ] Advanced conditional logic
- [ ] Form templates
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] A/B testing
- [ ] Advanced styling options

---

Built with ❤️ using React and Netlify 