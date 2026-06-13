"use client"
import { createContext, useContext, useState } from 'react';

const UploadContext = createContext(null);

export function UploadProvider({ children }) {
    const [files, setFiles] = useState([]);
    
    const clearFiles = () => setFiles([]);

    return (
        <UploadContext.Provider value={{ files, setFiles, clearFiles }}>
            {children}
        </UploadContext.Provider>
    );
}

export function useUpload() {
    return useContext(UploadContext);
}
