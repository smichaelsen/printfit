# PrintFit

A simple, client-side web application that allows you to print images at exact sizes.

## Features

- **Select Image**: Simple HTML file input for selecting images
- **Specify Size**: Enter the desired size in centimeters
- **Choose Dimension**: Select whether the size applies to width or height
- **Generate PDF**: Creates a PDF with the image at the exact specified size
- **100% Client-Side & Private**: Everything runs in the browser, your images never leave your device

## How to Use

1. Open `index.html` in a web browser
2. Click "Select Image" and choose an image file from your device
3. Enter the desired size in centimeters
4. Choose whether the size should be the width or height
5. Click "Generate PDF"
6. The PDF will download automatically and can be printed

**Privacy**: All processing happens in your browser. Your images are never uploaded or sent to any server.

## Technical Details

- Pure HTML, CSS, and JavaScript
- Uses jsPDF library (loaded via CDN) for PDF generation
- All processing happens client-side
- The image maintains its aspect ratio - you specify one dimension and the other is calculated automatically

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling
- `app.js` - Application logic
- `README.md` - This file

## Browser Compatibility

Works in all modern browsers that support:
- FileReader API
- Canvas API
- ES6+ JavaScript

## License

Free to use and modify.
