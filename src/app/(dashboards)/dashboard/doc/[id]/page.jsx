'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean'],
    ['link'],
    ['formula'],
];

const DocumentPage = ({ params }) => {
    const id = params?.id; 
    const [documentContent, setDocumentContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const quillRef = React.useRef(null); // This will hold the Quill instance
    const axiosCommon = useAxiosCommon();
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    useEffect(() => {
        if (!id) return; 

        const fetchDocument = async () => {
            try {
                const response = await axiosCommon.get(`/document/documents/${id}`);
                const fetchedDoc = response.data;

                setDocumentContent(fetchedDoc.content.content);
                setIsEditable(fetchedDoc?.content?.email === email); 
            } catch (err) {
                setError('Failed to fetch document');
                console.error(err);
            } finally {
                setLoading(false); 
            }
        };

        fetchDocument(); 
    }, [axiosCommon, id, email]);

    const saveDocument = async () => {
        if (!quillRef.current) return;

        const content = quillRef.current.getContents(); // Fetch the content from the Quill instance

        try {
            const data = {
                content,
                email, 
            };

            const response = await axiosCommon.put(`/document/documents/${id}`, data);
            console.log("Document saved successfully:", response.data);
            alert("Document saved successfully!");
        } catch (error) {
            console.error("Error saving document:", error);
        }
    };

    const wrapperRef = useCallback((wrapper) => {
        if (!wrapper) return;

        wrapper.innerHTML = ''; 
        const editor = document.createElement('div');
        wrapper.append(editor);

        const quill = new Quill(editor, {
            theme: 'snow',
            modules: {
                toolbar: isEditable ? TOOLBAR_OPTIONS : false,
            },
            readOnly: !isEditable, 
        });

        // Set the initial content
        if (documentContent) {
            quill.setContents(documentContent);
        }

        // Assign the Quill instance to the ref
        quillRef.current = quill;
    }, [documentContent, isEditable]);

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>; 

    return (
        <div>
            {isEditable && (
                <div className="flex justify-end">
                    <button className="text-end" onClick={saveDocument}>
                        Save
                    </button>
                </div>
            )}
            <div className="editor-container" ref={wrapperRef}></div>
        </div>
    );
};

export default DocumentPage;
