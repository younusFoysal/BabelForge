'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import useAxiosCommon from '@/lib/axiosCommon';
import Link from 'next/link';

const UserDocuments = () => {
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const axiosCommon = useAxiosCommon();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [email]);

    const openDocument = (docId) => {
        console.log("Opening document:", docId);

        
        
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Your Documents</h1>
            <ul>
                {documents.map((doc) => (
                    <li key={doc._id}>
                       <Link href={`/dashboard/doc/${doc?._id}`}>{doc?.title} Document ID: {doc?._id}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDocuments;
