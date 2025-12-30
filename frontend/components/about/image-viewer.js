'use client';
import { useState } from "react";


export default function ImageViewer() {
    const numberOfImages = 5;

    // Dynamically generate the image data for the gallery
    const data = Array.from({ length: numberOfImages }, (_, index) => ({
        imageLink: `/about/${index + 1}.png`, // Generate image link dynamically
    }));

    // State to manage the modal visibility and selected image
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to open the modal with the selected image
    const openModal = (imageLink) => {
        setSelectedImage(imageLink);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <h3 className="text-2xl font-extrabold mb-6 text-[#2EFF8A] text-center">Screenshots</h3>
            {/* Grid for images with proper spacing */}
            <div className="flex flex-col gap-8">
                {data.map(({ imageLink }, index) => (
                    <div
                        key={index}
                        className="rounded-xl overflow-hidden border-2 border-[#2EFF8A]/30 hover:border-[#2EFF8A] transition-colors shadow-lg"
                    >
                        <img
                            className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                            src={imageLink}
                            alt={`gallery-photo-${index + 1}`}
                            onClick={() => openModal(imageLink)}
                        />
                    </div>
                ))}
            </div>

            {/* Modal for full image view */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm z-50"
                    onClick={closeModal}
                >
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <img
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            src={selectedImage}
                            alt="Full view"
                        />
                        {/* Close button */}
                        <button
                            className="absolute -top-4 -right-4 w-10 h-10 bg-[#2EFF8A] text-[#0f1113] font-bold text-xl rounded-full flex items-center justify-center hover:bg-[#26d975] transition-colors shadow-lg"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}