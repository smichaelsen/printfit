let uploadedImage = null;
let imageElement = null;

const imageUpload = document.getElementById('imageUpload');
const sizeInput = document.getElementById('size');
const dimensionSelect = document.getElementById('dimension');
const generateBtn = document.getElementById('generateBtn');
const previewSection = document.getElementById('preview');
const previewImage = document.getElementById('previewImage');
const previewDimensions = document.getElementById('previewDimensions');

imageUpload.addEventListener('change', handleImageUpload);
generateBtn.addEventListener('click', generatePDF);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage = e.target.result;
        
        imageElement = new Image();
        imageElement.onload = function() {
            previewImage.src = uploadedImage;
            updatePreview();
            previewSection.style.display = 'block';
        };
        imageElement.src = uploadedImage;
    };
    reader.readAsDataURL(file);
}

function updatePreview() {
    if (!imageElement) return;
    
    const sizeCm = parseFloat(sizeInput.value);
    const dimension = dimensionSelect.value;
    
    const widthPx = imageElement.width;
    const heightPx = imageElement.height;
    const aspectRatio = widthPx / heightPx;
    
    let finalWidthCm, finalHeightCm;
    
    if (dimension === 'width') {
        finalWidthCm = sizeCm;
        finalHeightCm = sizeCm / aspectRatio;
    } else {
        finalHeightCm = sizeCm;
        finalWidthCm = sizeCm * aspectRatio;
    }
    
    previewDimensions.innerHTML = `
        <strong>Original:</strong> ${widthPx} × ${heightPx}px<br>
        <strong>Print size:</strong> ${finalWidthCm.toFixed(2)} × ${finalHeightCm.toFixed(2)} cm
    `;
}

sizeInput.addEventListener('input', updatePreview);
dimensionSelect.addEventListener('change', updatePreview);

async function generatePDF() {
    if (!uploadedImage || !imageElement) {
        alert('Please upload an image first.');
        return;
    }
    
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    
    try {
        const sizeCm = parseFloat(sizeInput.value);
        const dimension = dimensionSelect.value;
        
        const widthPx = imageElement.width;
        const heightPx = imageElement.height;
        const aspectRatio = widthPx / heightPx;
        
        let finalWidthCm, finalHeightCm;
        
        if (dimension === 'width') {
            finalWidthCm = sizeCm;
            finalHeightCm = sizeCm / aspectRatio;
        } else {
            finalHeightCm = sizeCm;
            finalWidthCm = sizeCm * aspectRatio;
        }
        
        const widthMm = finalWidthCm * 10;
        const heightMm = finalHeightCm * 10;
        
        // A4 dimensions: 210mm x 297mm
        const a4Width = 210;
        const a4Height = 297;
        
        const orientation = widthMm > heightMm ? 'landscape' : 'portrait';
        const pageWidth = orientation === 'landscape' ? a4Height : a4Width;
        const pageHeight = orientation === 'landscape' ? a4Width : a4Height;
        
        // Place image at top-left with safety margin
        const margin = 5;
        const x = margin;
        const y = margin;
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: 'a4'
        });
        
        pdf.addImage(uploadedImage, 'JPEG', x, y, widthMm, heightMm);
        
        pdf.save(`printfit-${finalWidthCm.toFixed(1)}x${finalHeightCm.toFixed(1)}cm.pdf`);
        
        generateBtn.textContent = 'PDF Generated! ✓';
        setTimeout(() => {
            generateBtn.textContent = 'Generate PDF';
            generateBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
        generateBtn.textContent = 'Generate PDF';
        generateBtn.disabled = false;
    }
}
