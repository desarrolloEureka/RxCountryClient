
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewerComponent: React.FC<PDFViewerProps> = ({ fileUrl }) => {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const { activateTab, attachmentPluginInstance, thumbnailPluginInstance, toggleTab, toolbarPluginInstance } = defaultLayoutPluginInstance;

    return (
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} theme="dark" />
            </Worker>
        </div>
    );
};

export default PDFViewerComponent;
