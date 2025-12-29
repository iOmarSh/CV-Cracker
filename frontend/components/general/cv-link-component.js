import useAppContext from "@/hooks/useAppContext";
import { useState, useEffect } from "react";
import CvLinkItem from "@/components/general/items/cv-link-item";
import OptionsItem from "@/components/general/items/options-item";

const CvLinkComponent = ({ className, ...props }) => {
    const { resumeData, setResumeData, globalRefs } = useAppContext();

    // Normalize social media name for consistent comparison
    const normalizeName = (name) => name?.toLowerCase().trim();

    const calculateAvailableLinks = () => {
        const data = [
            { "title": "LinkedIn", "url": "", "render": false },
            { "title": "Github", "url": "", "render": false },
            { "title": "GooglePlay", "url": "", "render": false },
            { "title": "AppStore", "url": "", "render": false },
        ];

        resumeData.data.socialMedia.forEach((item) => {
            // Case-insensitive comparison
            const index = data.findIndex((x) =>
                normalizeName(x.title) === normalizeName(item.socialMedia)
            );
            if (index !== -1) {
                data[index].render = true;
            }
        });

        return data;
    }

    const [availableLinks, setAvailableLinks] = useState(calculateAvailableLinks());

    // Re-calculate when resumeData changes (e.g., after paste)
    useEffect(() => {
        setAvailableLinks(calculateAvailableLinks());
    }, [resumeData.data.socialMedia]);


    const renderLink = (index) => {
        const newAvailableLinks = [...availableLinks];
        const willRender = !newAvailableLinks[index].render;
        const targetTitle = newAvailableLinks[index].title;

        newAvailableLinks[index].render = willRender;
        setAvailableLinks(newAvailableLinks);

        if (willRender) {
            // Check if already exists (case-insensitive) before adding
            const alreadyExists = resumeData.data.socialMedia.some(
                (x) => normalizeName(x.socialMedia) === normalizeName(targetTitle)
            );

            if (!alreadyExists) {
                // Add new social media to resumeData
                setResumeData({
                    ...resumeData,
                    data: {
                        ...resumeData.data,
                        socialMedia: [
                            ...resumeData.data.socialMedia,
                            {
                                socialMedia: targetTitle,
                                link: "",
                                displayName: targetTitle
                            }
                        ]
                    }
                });
            }
        }
        else {
            // Remove social media from resumeData (case-insensitive)
            const newSocialMedia = resumeData.data.socialMedia.filter(
                (x) => normalizeName(x.socialMedia) !== normalizeName(targetTitle)
            );
            setResumeData({
                ...resumeData,
                data: {
                    ...resumeData.data,
                    socialMedia: newSocialMedia
                }
            });
        }
    };

    // Get existing social media items from resumeData for rendering
    const getExistingSocialMediaForTitle = (title) => {
        return resumeData.data.socialMedia.find(
            (x) => normalizeName(x.socialMedia) === normalizeName(title)
        );
    };

    return <div className={` ${className}`}>
        {
            availableLinks.map((link, index) => {
                const existingItem = getExistingSocialMediaForTitle(link.title);
                return existingItem ? (
                    <CvLinkItem
                        key={index}
                        title={existingItem.socialMedia}
                        onRemove={() => renderLink(index)}
                    />
                ) : null;
            })
        }

        <div className={"mt-8 flex w-full flex-wrap items-center "}>
            {
                availableLinks.map((link, index) => {
                    const existingItem = getExistingSocialMediaForTitle(link.title);
                    return !existingItem ? (
                        <OptionsItem
                            key={index}
                            title={link.title}
                            onClick={() => renderLink(index)}
                        />
                    ) : null;
                })
            }
        </div>
    </div>
};

export default CvLinkComponent;