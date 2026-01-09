import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Detect if user is on mobile
const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
};

// Detect iOS Safari
const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
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
    // Find the resumePage element (has proper styling with margins)
    let printElement = document.querySelector('.resumePage');

    if (!printElement) {
        printElement = document.getElementById(printDivId);
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

        // Clone the resumePage element (preserves margins and padding)
        const clone = printElement.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.width = '794px'; // A4 width in px at 96dpi
        clone.style.minWidth = '794px';
        clone.style.height = 'auto';
        clone.style.backgroundColor = '#ffffff';
        clone.style.padding = '40px'; // Ensure padding for margins
        document.body.appendChild(clone);

        await new Promise(resolve => setTimeout(resolve, 300));

        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            allowTaint: true,
            width: 794,
            windowWidth: 794,
        });

        document.body.removeChild(clone);

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Add margins to the PDF
        const margin = 0; // The margins are already in the captured image
        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth - (margin * 2), Math.min(imgHeight, pageHeight - (margin * 2)));

        document.getElementById('pdf-loading')?.remove();

        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `resume-${timestamp}.pdf`;

        // iOS Safari workaround - open PDF in new tab
        if (isIOS()) {
            const pdfBlob = pdf.output('blob');
            const blobUrl = URL.createObjectURL(pdfBlob);

            // Create a link and click it to open in new tab
            const link = document.createElement('a');
            link.href = blobUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            // Try to trigger download on iOS
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], filename, { type: 'application/pdf' })] })) {
                try {
                    await navigator.share({
                        files: [new File([pdfBlob], filename, { type: 'application/pdf' })],
                        title: 'Resume PDF',
                    });
                } catch (err) {
                    // Fallback: open in new tab
                    window.open(blobUrl, '_blank');
                    setTimeout(() => {
                        alert('PDF opened in new tab. Use Share button to save.');
                    }, 500);
                }
            } else {
                // Fallback: open in new tab
                window.open(blobUrl, '_blank');
                setTimeout(() => {
                    alert('PDF opened in new tab. Tap and hold to save.');
                }, 500);
            }
        } else {
            // Android and other mobile browsers
            pdf.save(filename);
        }

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
