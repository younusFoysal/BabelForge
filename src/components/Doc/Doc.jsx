"use client"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Doc = () => {

    const [content, setContent] = useState('');

    const handleSave = async () => {
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
            if (response.ok) {
                console.log('Note saved successfully!');
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleDownloadPDF = () => {
        const docDefinition = { content: content };
        pdfMake.createPdf(docDefinition).download('document.pdf');
    };

    const handleShare = () => {
        const shareLink = window.location.href + `?note=${encodeURIComponent(content)}`;
        navigator.clipboard.writeText(shareLink);
        alert('Document link copied to clipboard: ' + shareLink);
    };

    return (
        <div>

            <div className="p-5 max-w-4xl mx-auto">
                <ReactQuill theme="snow" value={content} onChange={setContent}/>
                <div className="mt-4 space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                        Save Note
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleDownloadPDF}>
                        Download as PDF
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleShare}>
                        Share Doc
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Doc;