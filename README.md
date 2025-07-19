# Froggie App 🐸

A simple React application featuring an interactive frog that changes its appearance on hover.

## Features

- 🐸 Frog image centered in the middle of the screen
- ✨ Smooth hover animation that changes the frog from closed to opened
- 🎨 Beautiful gradient background with glassmorphism effects
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Navigate to the project directory:

   ```bash
   cd "e:\Coding Related\froggie"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

## How it Works

The app displays a frog image in the center of the screen with a beautiful glassmorphism container. When you hover over the frog:

- The image smoothly transitions from `frog.png` to `frog_opened.png`
- The frog scales slightly larger (1.05x) and becomes brighter
- All transitions are smooth with CSS animations

## Project Structure

```
froggie/
├── public/
│   └── index.html
├── src/
│   ├── App.js       # Main component with frog logic
│   ├── App.css      # Styling for the frog container
│   ├── index.js     # React entry point
│   └── index.css    # Global styles
├── assets/
│   ├── frog.png     # Default frog image
│   └── frog_opened.png # Hover state frog image
└── package.json
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (use with caution)

## Customization

You can easily customize the app by:

- Replacing the frog images in the `assets/` folder
- Modifying the CSS in `App.css` for different styling
- Adjusting the hover effects and animations
- Changing the background gradient in `index.css`

Enjoy your interactive froggie! 🐸✨
