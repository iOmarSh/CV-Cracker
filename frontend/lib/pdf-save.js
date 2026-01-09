import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PdfSave = async ({ printDivId }) => {
    const printElement = document.getElementById(printDivId);

    if (!printElement) {
        console.error(`Element with id ${printDivId} not found.`);
        return;
    }

    try {
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'pdf-loading';
        loadingOverlay.innerHTML = `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="text-align: center; color: white;">
                    <div style="font-size: 24px; margin-bottom: 10px;">📄</div>
                    <div style="font-size: 16px; font-weight: bold;">Generating PDF...</div>
                    <div style="font-size: 12px; margin-top: 5px; color: #2EFF8A;">Please wait</div>
                </div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);

        // Wait a bit for any animations to settle
        await new Promise(resolve => setTimeout(resolve, 300));

        // Capture the element
        const canvas = await html2canvas(printElement, {
            scale: 2, // Higher quality
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: printElement.scrollWidth,
            windowHeight: printElement.scrollHeight,
        });

        // Calculate PDF dimensions (A4 portrait)
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let heightLeft = imgHeight;
        let position = 0;

        // Add image to PDF (handle multi-page if needed)
        const imgData = canvas.toDataURL('image/png');

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add more pages if content is longer than one page
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Remove loading overlay
        document.getElementById('pdf-loading')?.remove();

        // Save the PDF - works on iOS and Android
        pdf.save('resume.pdf');

    } catch (error) {
        console.error('Error generating PDF:', error);
        document.getElementById('pdf-loading')?.remove();
        alert('Failed to generate PDF. Please try again.');
    }
};

export default PdfSave;



