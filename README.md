# PrintFit

A simple, client-side web application that allows you to print images at exact sizes.

## Features

- **Upload Image**: Simple HTML file input for selecting images
- **Specify Size**: Enter the desired size in centimeters
- **Choose Dimension**: Select whether the size applies to width or height
- **Generate PDF**: Creates a PDF with the image at the exact specified size
- **Client-Side Only**: Everything runs in the browser, no backend required

## How to Use

1. Open `index.html` in a web browser
2. Click "Upload Image" and select an image file
3. Enter the desired size in centimeters
4. Choose whether the size should be the width or height
5. Click "Generate PDF"
6. The PDF will download automatically and can be printed

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
