'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';

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
];

const DocumentPage = ({ params }) => {
    const id = params?.id; 
    const [isChange, setIsChange] = useState(null);
    const [documentContent, setDocumentContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const quillRef = React.useRef(null); 
    const axiosCommon = useAxiosCommon();
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    // Fetch document content
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

    // UseMutation for updating the document
    const { mutate: updateDocument } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosCommon.put(`/document/doc/${id}`, data);
            return response.data;
        },

        onSuccess: (updatedData) => {
            console.log("Document saved successfully:", updatedData);
            const timeout = setTimeout(() => {
                setButtonLoading(false);
            }, 2000);
        },
        onError: (error) => {
            console.error("Error saving document:", error);
        }
        
        
    });


    // Save document content function
    const saveDocument = useCallback(() => {
        if (!quillRef.current) return;

        setButtonLoading(true);

        const content = quillRef.current.getContents();
        const data = {
            content,
            email,
        };
        updateDocument(data); 
    }, [updateDocument, email]);

    // Autosave with delay
    useEffect(() => {
        if (!isChange) return;

        const timeout = setTimeout(() => {
            saveDocument(); 
        }, 40000);

        return () => clearTimeout(timeout); 
    }, [isChange, saveDocument]);

    // Share button
    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    // Quill editor setup
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

        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                setIsChange(delta);  
            }
        });

        if (documentContent) {
            quill.setContents(documentContent);
        }

        quillRef.current = quill;
    }, [documentContent, isEditable]);

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>; 

    return (
        <div>
            <div className='flex justify-evenly my-5'>
                <h1 className='font-bold text-2xl'>{documentContent?.title ? documentContent?.title : "Untitled"}</h1>
            {isEditable && (
                <div className="flex justify-end">
                    <button className="bg-blue-400 px-3 rounded-xl text-white" onClick={saveDocument}>
                        {buttonLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            )}
            <button className="bg-green-400 px-3 rounded-xl text-white" onClick={handleShare}>
                    Share
                </button>
            </div>
            <div className="editor-container" ref={wrapperRef}></div>
        </div>
    );
};

export default DocumentPage;
