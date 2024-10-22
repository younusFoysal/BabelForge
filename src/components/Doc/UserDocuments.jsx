'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useAxiosCommon from '@/lib/axiosCommon';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const UserDocuments = () => {
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const axiosCommon = useAxiosCommon();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!email) return;

            try {
                const response = await axiosCommon.get(`/document/document/${email}`);
                setDocuments(response.data);
            } catch (err) {
                setError("Failed to fetch documents");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [axiosCommon, email]);

    const handleCreate = async () => {
        try {
            const response = await axiosCommon.post('/document/documents', { email });
            const docId = response.data.docId;
            router.push(`/dashboard/doc/${docId}`);
        } catch (err) {
            console.error('Failed to create document:', err);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='mx-auto max-w-[500px]'>
            <h1>Your Documents</h1>
            <ul >
                {documents.map((doc, idx) => (
                    <li className='p-4 bg-gray-200 my-2 hover:cursor-pointer max-w-96' key={doc._id}>
                        {/* If user's email matches the document email, allow editing */}
                        {doc.email === email ? (
                            <Link href={`/dashboard/doc/${doc?._id}`}>
                                {doc?.title || 'Untitled Document-'}{idx+1} (Editable) - Document ID: {doc?._id}
                            </Link>
                        ) : (
                            <div>
                                {doc?.title || 'Untitled Document-'} {idx+1}(View Only) - Document ID: {doc?._id}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={handleCreate}>Create New Doc</button>
        </div>
    );
};

export default UserDocuments;
