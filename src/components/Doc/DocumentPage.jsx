'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { ShareLink } from '@/components/Doc/ShareLink';
import { Button } from '@/components/ui/button';
import { pdfExporter } from 'quill-to-pdf';
import { saveAs } from 'file-saver';


const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    [ 'blockquote', 'code-block'],
    ['clean'],
    ['link'],
];

const DocumentPage = ({ params }) => {
    const id = params?.id; 
    const [isChange, setIsChange] = useState(null);
    const [documentContent, setDocumentContent] = useState(null);
    const [documentTitle, setDocumentTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(null);
    const [isEditableTitle, setIsEditableTitle] = useState(false);
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
                setDocumentTitle(fetchedDoc?.content?.title);
                setIsEditable(fetchedDoc?.content?.email === email); 
            } catch (err) {
                setError('Failed to Fetch Document');
                //console.error(err);
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
            //console.log("Document saved successfully:", updatedData);
            const timeout = setTimeout(() => {
                setButtonLoading(false);
            }, 2000);
        },
        onError: (error) => {
            //console.error("Error saving document:", error);
        }
        
        
    });

    //save pdf
    const savePdf = async () => {
        if (!quillRef.current) return; 
    
        const delta = quillRef.current.getContents(); 
        const pdfAsBlob = await pdfExporter.generatePdf(delta); 
        saveAs(pdfAsBlob, `${documentTitle || 'Untitled Document'}.pdf`); 
    };
    


    // Save document content function
    const saveDocument = useCallback(() => {
        if (!quillRef.current) return;

        setButtonLoading(true);

        const content = quillRef.current.getContents();
        const data = {
            title: updateTitle,
            content,
            email,
        };
        updateDocument(data); 
    }, [updateTitle, email, updateDocument]);

    // Autosave with delay
    useEffect(() => {
        if (!isChange) return;

        const timeout = setTimeout(() => {
            saveDocument(); 
        }, 40000);

        return () => clearTimeout(timeout); 
    }, [isChange, saveDocument]);

    
    // change title function
    const handleTitleChange = (e) => {
        
        setIsEditableTitle(true);
        
    }
    

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
            <div className='flex justify-center px-20 md:flex-row flex-col gap-2 my-5'>
                <input className='font-bold bg-transparent text-2xl' onBlur={saveDocument} onChange={(e)=>{setUpdateTitle(e.target.value);
                }}  onClick={handleTitleChange} readOnly={!isEditableTitle} type="text" defaultValue={documentTitle ? documentTitle : "Untitled"} />
           
                <div className="flex gap-5 justify-center md:justify-end">
                {isEditable && (
                    <button onClick={saveDocument} disabled={buttonLoading} type="button" class="px-6 -py-1  capitalize bg-gradient-to-r from-blue-600 to-purple-600  rounded-md transition-all duration-500  hover:scale-105 flex gap-1 items-center group dark:bg-gray-50 text-white text-sm">
                    {buttonLoading ? <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                    </svg> : ''}
                        {buttonLoading ? 'Saving...' : 'Save'}
                    </button>)}
                    {/* pdf */}
                    <button onClick={savePdf} type="button" class="px-6 -py-1  capitalize bg-gradient-to-r from-blue-600 to-purple-600  rounded-md transition-all duration-500  hover:scale-105 flex gap-1 items-center group dark:bg-gray-50 text-white text-sm">
                       save PDF      
                    </button>
                    <ShareLink colour={true} />
                </div>
            
            
            </div>
            <div className="editor-container" ref={wrapperRef}></div>
        </div>
    );
};

export default DocumentPage;
