import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PdfSave = async ({ printDivId }) => {
    // Try multiple selectors to find the resume element
    let printElement = document.getElementById(printDivId);

    // Fallback: try to find by class
    if (!printElement) {
        printElement = document.querySelector('.resumePage');
    }

    // Fallback: try resumePages
    if (!printElement) {
        printElement = document.getElementById('resumePages');
    }

    if (!printElement) {
        console.error('Resume element not found. Tried:', printDivId, '.resumePage', '#resumePages');
        alert('Could not find the resume to download. Please try again.');
        return;
    }

    try {
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'pdf-loading';
        loadingOverlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 99999;';
        loadingOverlay.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="font-size: 48px; margin-bottom: 16px;">📄</div>
                <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Generating PDF...</div>
                <div style="font-size: 14px; color: #2EFF8A;">This may take a few seconds</div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);

        // Wait for any animations
        await new Promise(resolve => setTimeout(resolve, 500));

        // Clone the element for clean capture
        const clone = printElement.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.width = '210mm';
        clone.style.minWidth = '210mm';
        clone.style.backgroundColor = '#ffffff';
        document.body.appendChild(clone);

        // Wait for clone to render
        await new Promise(resolve => setTimeout(resolve, 200));

        // Capture the cloned element
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: clone.scrollWidth,
            height: clone.scrollHeight,
            allowTaint: true,
        });

        // Remove clone
        document.body.removeChild(clone);

        // Calculate PDF dimensions (A4 portrait)
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add image to PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (imgHeight <= pageHeight) {
            // Single page
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
            // Multi-page handling
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
        }

        // Remove loading overlay
        document.getElementById('pdf-loading')?.remove();

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 10);
        pdf.save(`resume-${timestamp}.pdf`);

    } catch (error) {
        console.error('Error generating PDF:', error);
        document.getElementById('pdf-loading')?.remove();
        alert('Failed to generate PDF: ' + error.message);
    }
};

export default PdfSave;



