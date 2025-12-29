"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * CVIframePreview - Renders CV in an isolated iframe
 * 
 * CRITICAL: This component ensures CV rendering is completely isolated
 * from app shell styles. The iframe loads a standalone HTML template.
 */
const CVIframePreview = ({
    cvData,
    templateId = "minimal",
    scale = 0.75,
    className = "",
    onRenderComplete = () => { }
}) => {
    const iframeRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    // Send CV data to iframe when data changes or iframe loads
    useEffect(() => {
        if (!iframeRef.current || !isLoaded) return;

        try {
            const iframe = iframeRef.current;
            iframe.contentWindow.postMessage({
                type: 'CV_DATA',
                cvData: cvData
            }, '*');
        } catch (err) {
            console.error('Error sending data to CV iframe:', err);
            setError('Failed to render CV preview');
        }
    }, [cvData, isLoaded]);

    // Listen for messages from iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'CV_READY') {
                // Iframe is ready, send initial data
                if (iframeRef.current && cvData) {
                    iframeRef.current.contentWindow.postMessage({
                        type: 'CV_DATA',
                        cvData: cvData
                    }, '*');
                }
            }
            if (event.data?.type === 'CV_RENDERED') {
                onRenderComplete();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [cvData, onRenderComplete]);

    const handleIframeLoad = () => {
        setIsLoaded(true);
        setError(null);
    };

    const handleIframeError = () => {
        setError('Failed to load CV template');
        setIsLoaded(false);
    };

    // Toggle ATS-safe mode
    const setATSMode = (enabled) => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({
                type: 'ATS_MODE',
                enabled: enabled
            }, '*');
        }
    };

    // Get iframe HTML for export
    const getExportHTML = () => {
        if (!iframeRef.current) return null;
        try {
            return iframeRef.current.contentDocument.documentElement.outerHTML;
        } catch (err) {
            console.error('Error getting export HTML:', err);
            return null;
        }
    };

    // A4 dimensions at 96 DPI: 794 x 1123 pixels
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;

    return (
        <div className={`cv-iframe-container ${className}`}>
            {error && (
                <div className="cv-iframe-error">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Reload</button>
                </div>
            )}

            <div
                className="cv-iframe-wrapper"
                style={{
                    width: A4_WIDTH * scale,
                    height: A4_HEIGHT * scale,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    borderRadius: '4px',
                    background: '#ffffff'
                }}
            >
                <iframe
                    ref={iframeRef}
                    src={`/cv-templates/${templateId}/template.html`}
                    sandbox="allow-scripts allow-same-origin"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    style={{
                        width: A4_WIDTH,
                        height: A4_HEIGHT,
                        border: 'none',
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        background: '#ffffff'
                    }}
                    title="CV Preview"
                />
            </div>

            <style jsx>{`
                .cv-iframe-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .cv-iframe-error {
                    background: #1a1a1a;
                    border: 1px solid #ff4444;
                    color: #ff4444;
                    padding: 16px;
                    margin-bottom: 16px;
                    border-radius: 4px;
                    text-align: center;
                }
                .cv-iframe-error button {
                    margin-top: 8px;
                    padding: 8px 16px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

// Export helper functions
CVIframePreview.getExportHTML = (iframeRef) => {
    if (!iframeRef?.current) return null;
    try {
        return iframeRef.current.contentDocument.documentElement.outerHTML;
    } catch (err) {
        console.error('Error getting export HTML:', err);
        return null;
    }
};

export default CVIframePreview;
