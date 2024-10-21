'use client';
import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';

const DocumentPage = ({ params }) => {
    const id = params?.id;
    const [documentContent, setDocumentContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const quillRef = React.useRef(null);
    const axiosCommon = useAxiosCommon();
    const { user, isLoaded, isSignedIn } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    useEffect(() => {
        if (!id) return; // If ID is not yet available, do nothing

        const fetchDocument = async () => {
            try {
                const response = await axiosCommon.get(`/document/documents/${id}`);
                setDocumentContent(response.data.content); 
                
                
            } catch (err) {
                setError('Failed to fetch document');
                console.error(err);
            } finally {
                setLoading(false); // Set loading to false once fetch is done
            }
        };

        fetchDocument(); // Call the fetch function
    }, [axiosCommon, id]);

    console.log(documentContent?.content);
    

    useEffect(() => {
        if (documentContent?.content && quillRef.current) {
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: true, // Disable the toolbar for viewing
                },
                readOnly: email === documentContent.email ? false : true, 
            });

            // Set the content of the Quill editor
            quill.setContents(documentContent);
        }
    }, [documentContent, email]);

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>{error}</div>; // Show error if fetching fails

    return (
        <div>
      <div className="editor-container" ref={quillRef}></div>
    </div>
    );
};

export default DocumentPage;
