# Crisis Pilot - AI-Powered Crisis Response Management

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Crisis Pilot is an advanced AI-powered crisis response management application built with React and TypeScript. This project leverages Google's Gemini API to provide intelligent crisis assessment, real-time response guidance, and comprehensive crisis template management. Crisis Pilot delivers an intuitive interface for managing emergency situations with AI-assisted decision-making, data parsing, and crisis response coordination.

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Core Features](#core-features)
- [Technologies Used](#technologies-used)
- [Performance & Troubleshooting](#performance--troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Key Features

- **AI-Powered Crisis Assessment**: Leverages Google's Gemini API to analyze crisis situations and provide intelligent recommendations.
- **Crisis Template Management**: Pre-built and customizable crisis response templates for various emergency scenarios.
- **Real-Time Data Parsing**: Efficiently parses and processes crisis data with robust error handling.
- **Responsive User Interface**: Modern, intuitive React-based UI with TypeScript for type safety and reliability.
- **Quick Setup**: Built with Vite for lightning-fast development and optimized production builds.
- **Comprehensive Documentation**: Detailed crisis response guides and configuration options for different scenarios.

---

## Getting Started

Follow these instructions to set up and run Crisis Pilot on your local machine.

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16.0.0 or higher)
- **npm** or **yarn** (Node Package Manager)
- **Git** for version control
- **Google Gemini API Key** (get one from [AI Studio](https://ai.studio/))
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Minimum 2 GB RAM for smooth operation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeMaster-D/crisispilot.git
   cd crisispilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory:
     ```bash
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - Replace `your_gemini_api_key_here` with your actual Gemini API key from [AI Studio](https://ai.studio/)

4. **Verify Installation**
   ```bash
   npm run dev
   ```
   The application should start on `http://localhost:5173` (or the next available port)

### Configuration

1. **Gemini API Configuration**:
   - Obtain your Gemini API key from [Google AI Studio](https://ai.studio/)
   - Add it to your `.env.local` file as shown in the Installation section
   - Ensure you have the appropriate API quota for your usage

2. **Customize Crisis Templates** (Optional):
   - Edit `src/data/templates.ts` to add or modify crisis response templates
   - Update template parameters to match your organization's protocols

3. **Adjust Application Parameters** (Optional):
   - Modify component configurations in `src/components/` to customize the UI
   - Adjust timeout values and data processing parameters as needed for your environment

4. **Optimize for Your Environment**:
   - For large datasets, ensure adequate browser memory allocation
   - Consider adjusting API request timeouts based on your network conditions

### Running the Application

**Development Mode**:
```bash
npm run dev
```

**Production Build**:
```bash
npm run build
```

**Preview Production Build**:
```bash
npm run preview
```

**Start Server** (if applicable):
```bash
npm run server
```

Once running:
- The application will open in your default browser
- Load crisis templates from the crisis interface
- Use the AI assistant for real-time guidance
- Monitor and coordinate crisis response activities
- Press `Ctrl+C` in the terminal to stop the application

---

## Project Structure

The project is organized for scalability and maintainability:

```
crisispilot/
├── src/
│   ├── components/
│   │   └── CrisisInterface.tsx      # Main crisis management UI component
│   ├── data/
│   │   └── templates.ts             # Crisis response templates
│   ├── utils/
│   │   └── parser.ts                # Data parsing utilities
│   ├── types.ts                     # TypeScript type definitions
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/
│   └── assets/                      # Static assets
├── .env.local                       # Environment variables (not committed)
├── .gitignore                       # Git ignore rules
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
├── server.ts                        # Server configuration
├── README.md                        # Project documentation
├── CONTRIBUTING.md                  # Contribution guidelines
├── CODE_OF_CONDUCT.md               # Community code of conduct
└── metadata.json                    # Application metadata
```

---

## Usage Guide

### Getting Started with Crisis Pilot

1. **Launch the Application**
   - Start the development server with `npm run dev`
   - Open the application in your browser

2. **Access Crisis Templates**
   - Navigate to the Crisis Interface
   - Select from pre-built templates or create a custom response plan
   - Review the AI-generated recommendations

3. **Use AI Assistant**
   - Input crisis parameters and situation details
   - Get real-time AI analysis and suggested responses
   - Refine recommendations based on your specific needs

4. **Manage Response Coordination**
   - Track response status and updates
   - Coordinate with team members
   - Document decisions and actions taken

5. **Review and Improve**
   - After crisis resolution, review the response effectiveness
   - Update templates based on lessons learned
   - Share insights with team members

### Core Workflows

- **Crisis Assessment**: Input situation details → AI analysis → Recommended actions
- **Template Selection**: Browse templates → Customize parameters → Deploy response plan
- **Real-Time Coordination**: Monitor updates → Adjust strategies → Track outcomes
- **Data Management**: Parse incident reports → Extract key information → Generate summaries

---

## Core Features

Crisis Pilot provides the following crisis management functionalities:

* **Intelligent Crisis Assessment**: Gemini AI analyzes situations and provides data-driven recommendations
* **Template System**: Pre-built response templates for common crisis scenarios with customization options
* **Real-Time Data Processing**: Efficient parsing and processing of crisis-related information
* **Responsive Interface**: Modern React UI with TypeScript for reliable, type-safe operations
* **API Integration**: Seamless integration with Google Gemini API for AI-powered insights
* **Crisis Documentation**: Comprehensive recording and tracking of all crisis response activities

## Technologies Used

Crisis Pilot is built with modern, production-ready technologies:

* **React**: Powerful JavaScript library for building interactive user interfaces with component-based architecture
* **TypeScript**: Superset of JavaScript providing strong typing and enhanced IDE support for reliable code
* **Vite**: Modern build tool delivering extremely fast development server and optimized production builds
* **Google Gemini API**: Advanced AI model providing intelligent crisis analysis and recommendations
* **Node.js**: JavaScript runtime for server-side development and tooling
* **CSS3**: Modern styling with responsive design for all screen sizes

---

## Performance & Troubleshooting

### Performance Optimization

- **Build Size**: Optimized with Vite for minimal bundle size
- **Load Time**: Application typically loads in under 2 seconds on modern networks
- **Memory Usage**: Efficient memory management with React optimization techniques
- **API Calls**: Batched Gemini API calls to minimize latency and costs

### Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Gemini API Key not recognized | Verify `.env.local` file exists and contains correct API key |
| Application won't start | Clear node_modules and reinstall: `rm -rf node_modules && npm install` |
| Slow performance | Check network connection, reduce data payload size, review browser console |
| Templates not loading | Verify `src/data/templates.ts` file exists and is properly formatted |
| API quota exceeded | Review API usage limits in AI Studio, consider optimizing request frequency |
| Build errors | Ensure Node.js version is 16.0.0 or higher: `node --version` |
| CSS not loading | Clear browser cache and restart development server |

### Environment-Specific Tips

- **Development**: Use `npm run dev` for hot module reloading during development
- **Production**: Use `npm run build` and `npm run preview` to test production build locally
- **Debugging**: Check browser console (F12) for TypeScript and React errors
- **API Testing**: Use the network tab in DevTools to monitor Gemini API requests

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/ImprovesCrisisResponse`)
3. Commit your Changes (`git commit -m 'Add improved crisis response feature'`)
4. Push to the Branch (`git push origin feature/ImprovesCrisisResponse`)
5. Open a Pull Request

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md) and review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the **Apache License 2.0**—see the **[LICENSE](LICENSE)** file for the full terms.
