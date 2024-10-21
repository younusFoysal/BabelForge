'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useAxiosCommon from '@/lib/axiosCommon';
import { useRouter } from 'next/navigation';
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

    const openDocument = (docId) => {
        console.log("Opening document:", docId);

        // Navigate to document page for viewing/editing
        router.push(`/dashboard/doc/${docId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Your Documents</h1>
            <ul>
                {documents.map((doc) => (
                    <li key={doc._id}>
                        {/* If user's email matches the document email, allow editing */}
                        {doc.email === email ? (
                            <Link href={`/dashboard/doc/${doc?._id}`}>
                                {doc?.title || 'Untitled'} (Editable) - Document ID: {doc?._id}
                            </Link>
                        ) : (
                            <div>
                                {doc?.title || 'Untitled'} (View Only) - Document ID: {doc?._id}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDocuments;
