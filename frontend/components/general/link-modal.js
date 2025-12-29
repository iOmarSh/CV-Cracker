import React, { useState, useRef, useEffect } from 'react';

function LinkModal({ link, setLink, divRef, isModalOpen, setIsModalOpen }) {
    const inputRef = useRef(null);
    const [modalStyle, setModalStyle] = useState({});
    const [localLink, setLocalLink] = useState(link);


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddLink = () => {
        setLink(inputRef.current.value);
        setIsModalOpen(false);

    }



    useEffect(() => {
        setLocalLink(link);
    }, [link]);



    return (
        <>
            {isModalOpen && (
                <div
                    style={modalStyle}
                    className="box shadow-[0_0_20px_rgba(0,0,0,0.5)] absolute
          z-[1000] flex w-[280px] flex-col border border-solid border-[#2a2d32] bg-[#111316] p-4 md:w-[320px] rounded-lg"
                >
                    <label className="text-[#E6E9EB] mb-[2.5px] ml-[11px] inline-block w-full text-[14px] font-bold md:text-[15px]">
                        <span>Add Link</span>
                    </label>
                    <input type="text" placeholder="Enter Link"
                        className="h-12 w-full appearance-none rounded-lg text-base leading-normal shadow-none outline-none md:text-[17px] font-sans m-0 placeholder-[#6b7280] bg-[#1a1d21] border border-solid border-[#2a2d32] text-[#E6E9EB] p-2.5 focus:border-[#2EFF8A] focus:ring-1 focus:ring-[#2EFF8A]/30"
                        autoComplete="off"
                        value={localLink}
                        onChange={(e) => setLocalLink(e.target.value)}
                        ref={inputRef} />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        <button type="button" onClick={handleCloseModal}
                            className="cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-[#2EFF8A] hover:opacity-80 px-7 py-2 rounded-full font-extrabold text-[15px] min-w-[120px] text-[#9AA3A8] border border-solid border-[#2a2d32] h-10 hover:text-[#E6E9EB]">
                            Cancel
                        </button>
                        <button
                            onClick={handleAddLink}
                            type="button"
                            className="border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-[#2EFF8A] hover:opacity-80 px-7 py-2 rounded-full font-extrabold text-[15px] min-w-[120px] text-[#0f1113] bg-[#2EFF8A] h-10">
                            Add
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LinkModal;