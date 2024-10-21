'use client';
import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import useAxiosCommon from '@/lib/axiosCommon';

const DocumentPage = ({ params }) => {
    const id = params?.id;
    const [documentContent, setDocumentContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const quillRef = React.useRef(null);
    const axiosCommon = useAxiosCommon();

    useEffect(() => {
        if (!id) return; // If ID is not yet available, do nothing

        const fetchDocument = async () => {
            try {
                const response = await axiosCommon.get(`/document/documents/${id}`);
                setDocumentContent(response.data.content); // Set the fetched content
            } catch (err) {
                setError('Failed to fetch document');
                console.error(err);
            } finally {
                setLoading(false); // Set loading to false once fetch is done
            }
        };

        fetchDocument(); // Call the fetch function
    }, [axiosCommon, id]);

    useEffect(() => {
        if (documentContent && quillRef.current) {
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: true, // Disable the toolbar for viewing
                },
                readOnly: false, // Set the editor to read-only
            });

            // Set the content of the Quill editor
            quill.setContents(documentContent);
        }
    }, [documentContent]);

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>{error}</div>; // Show error if fetching fails

    return (
        <div>
      <div className="editor-container" ref={quillRef}></div>
    </div>
    );
};

export default DocumentPage;
