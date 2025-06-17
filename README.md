# CoverCraft AI

CoverCraft AI is a Chrome extension that automatically generates personalized cover letters based on job postings using OpenAI's GPT model. It helps job seekers save time by creating tailored cover letters that match their skills and experience with the job requirements.

## Features

- 🤖 AI-powered cover letter generation
- 📝 Automatic job description extraction
- 💾 Save your professional background and skills
- 🔒 Secure API key management
- 🎨 Clean and modern user interface

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the project folder

## Setup

1. Get an OpenAI API key from [OpenAI's platform](https://platform.openai.com/)
2. Click the CoverCraft AI extension icon in your browser
3. Enter your:
   - Professional background
   - Skills and experience
   - OpenAI API key
4. Optionally check "Remember API Key" to save it for future use

## How to Use

1. Navigate to a job posting page
2. Click the CoverCraft AI extension icon
3. Review your saved information
4. Click "Generate Cover Letter"
5. Wait a few seconds for the AI to generate your personalized cover letter
6. Copy and customize the generated cover letter as needed

## Technical Details

- Built as a Chrome extension (Manifest V3)
- Uses OpenAI's GPT model for content generation
- Implements content scripts for job description extraction
- Secure local storage for user data
- Modern CSS with responsive design

## Project Structure

```
covercraft_ai/
├── manifest.json        # Extension configuration
├── popup.html          # Extension popup interface
├── popup.js           # Popup functionality
├── content.js         # Content script for job description extraction
├── styles.css         # Styling
└── icons/
    └── icon.png       # Extension icon
```

## Privacy & Security

- API keys are stored locally and only sent directly to OpenAI
- No user data is collected or stored on external servers
- Job descriptions are processed locally

## Requirements

- Chrome Browser (Latest version recommended)
- OpenAI API key
- Active internet connection

## Development

To modify or enhance the extension:

1. Make changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Test your changes

## License

MIT License - Feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.