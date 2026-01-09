import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Detect if user is on mobile
const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
};

// Original desktop print method
const desktopPrint = (printDivId) => {
    const printElement = document.getElementById(printDivId);

    if (!printElement) {
        console.error(`Element with id ${printDivId} not found.`);
        return;
    }

    const printContents = printElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `
        <div style="width: 210mm; margin: 0 auto;">
            ${printContents}
        </div>
    `;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
};

// Mobile PDF generation using html2canvas + jsPDF
const mobilePdfSave = async (printDivId) => {
    let printElement = document.getElementById(printDivId);

    if (!printElement) {
        printElement = document.querySelector('.resumePage');
    }
    if (!printElement) {
        printElement = document.getElementById('resumePages');
    }

    if (!printElement) {
        alert('Could not find the resume to download. Please try again.');
        return;
    }

    try {
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

        await new Promise(resolve => setTimeout(resolve, 500));

        const clone = printElement.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.width = '210mm';
        clone.style.minWidth = '210mm';
        clone.style.backgroundColor = '#ffffff';
        document.body.appendChild(clone);

        await new Promise(resolve => setTimeout(resolve, 200));

        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            allowTaint: true,
        });

        document.body.removeChild(clone);

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));

        document.getElementById('pdf-loading')?.remove();

        const timestamp = new Date().toISOString().slice(0, 10);
        pdf.save(`resume-${timestamp}.pdf`);

    } catch (error) {
        console.error('Error generating PDF:', error);
        document.getElementById('pdf-loading')?.remove();
        alert('Failed to generate PDF: ' + error.message);
    }
};

// Main export - chooses method based on device
const PdfSave = async ({ printDivId }) => {
    if (isMobile()) {
        await mobilePdfSave(printDivId);
    } else {
        desktopPrint(printDivId);
    }
};

export default PdfSave;
