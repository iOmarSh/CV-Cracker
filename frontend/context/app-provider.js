"use client";
import React, { useEffect, useRef, useState } from 'react';
import AppContext from './app-context';
import { getEmailAndName } from "@/lib/utils";
import { cvCreateUpdate, cvGetAction } from "@/actions/cvs";

// Default CV template - matching the AI Engineer template
import defaultCvTemplate from "@/lib/default-cv-template.json";

const AppProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(null);
    const [resumeList, setResumeList] = useState([]);
    const globalRefs = useRef({});
    const [controlPanel, setControlPanel] = useState(0);
    const [lastControlPanel, setLastControlPanel] = useState(0);
    const [currentEditIndex, setCurrentEditIndex] = useState({});


    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const setControlPanelIndex = (index) => {
        setLastControlPanel(controlPanel);
        setControlPanel(index);

    };


    const syncResumeData = async (data) => {
        const response = await cvCreateUpdate(data);
        if (response.success && resumeData.id === 'new') {
            setResumeData({
                ...response.response
            });

        }
    }

    // Default CV with the template data
    const defaultCv = {
        id: 'new',
        title: 'New CV',
        data: defaultCvTemplate
    };

    // Empty CV for starting fresh
    const emptyCv = {
        id: 'new',
        title: 'New CV',
        data: {
            name: '',
            position: '',
            contactInformation: '',
            email: '',
            address: '',
            socialMedia: [],
            summary: [],
            educations: [],
            courses: [],
            workExperience: [],
            projects: [],
            skills: [],
            languages: [],
            titles: {
                "profile": "PROFILE",
                "experience": "WORK EXPERIENCE",
                "education": "EDUCATION",
                "certification": "CERTIFICATIONS",
                "skills": "SKILLS",
                "languages": "LANGUAGES",
                "projects": "PROJECTS"
            },
            order: [
                "contactInformation",
                "profile",
                "workExperience",
                "projects",
                "education",
                "courses",
                "skills",
                "languages"
            ],
        }
    };

    const getResumeWithId = async (id) => {
        if (id === 'cvnew') {
            // If resumeData is already set (by clicking Add Resume or Use Template), keep it
            // Otherwise use empty CV as fallback
            if (!resumeData || resumeData.id !== 'new') {
                setResumeData({ ...emptyCv });
            }
            return;
        }

        if (id === 'cvempty') {
            // Use empty CV if explicitly requested
            setResumeData({ ...emptyCv });
            return;
        }


        let cv = resumeList.find(cv => cv.id == id);
        if (!cv) {
            const response = await cvGetAction(id);
            if (response.success) {
                cv = response.cv;
            }
        }
        setResumeData(cv);
    }


    const updateResumeData = (newData) => {
        setResumeData(newData);
    }

    const OnEditSectionTitle = (e, section) => {
        const value = e.target.innerText;
        const updatedTitles = { ...resumeData.titles, [section]: value };
        setResumeData({ ...resumeData, titles: updatedTitles });
    }


    const checkAuthStatus = () => {
        const data = getEmailAndName();
        if (data.isAuthenticated) {
            if (!user)
                login(data);
        } else {
            logout();
        }
    };

    useEffect(() => {
        checkAuthStatus();
        const interval = setInterval(checkAuthStatus, 1000 * 30);
        return () => clearInterval(interval);
    }, []);


    return (
        <AppContext.Provider value={{
            resumeData,
            setResumeData,
            globalRefs,
            updateResumeData,
            OnEditSectionTitle,
            controlPanel,
            lastControlPanel,
            setControlPanelIndex,
            currentEditIndex,
            setCurrentEditIndex,


            user, isAuthenticated, login, logout,
            resumeList, setResumeList, syncResumeData, getResumeWithId, defaultCv, emptyCv
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;