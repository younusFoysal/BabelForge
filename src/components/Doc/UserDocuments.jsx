'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useAxiosCommon from '@/lib/axiosCommon';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const UserDocuments = () => {
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const axiosCommon = useAxiosCommon();
    // const [documents, setDocuments] = useState([]);
    const router = useRouter();

    console.log();
    

    // useEffect(() => {
    //     const fetchDocuments = async () => {
    //         if (!email) return;

    //         try {
    //             const response = await axiosCommon.get(`/document/document/${email}`);
    //             setDocuments(response.data);
    //         } catch (err) {
    //             setError("Failed to fetch documents");
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    // //     };

    //     fetchDocuments();
    // }, [axiosCommon, email]);

    const {data: documents, isLoading, isError, refetch} = useQuery({
        queryKey: ['documents', email],
        queryFn: async () => {
            const response = await axiosCommon.get(`/document/document/${email}`);
            return response.data;
        }
    })
        console.log(documents);
        
        if (isError) return <div>{error}</div>;

        // create new document
    const handleCreate = async () => {
        try {
            
            const response = await axiosCommon.post('/document/documents', {email});
            const docId = response.data.docId;
            router.push(`/dashboard/doc/${docId}`);
        } catch (err) {
            console.error('Failed to create document:', err);
        }
    }

    // Delete document
    const { mutate: deleteDocument } = useMutation({
        mutationFn: async (docId) => {
            await axiosCommon.delete(`/document/documents/${docId}`);
        },
        onSuccess: () => {
            // Refetch the documents after a successful deletion
            refetch();
        },
        onError: (error) => {
            console.error('Error deleting document:', error);
        }
    });

    const handleDelete = async (docId, event) => {
        event.stopPropagation();

        deleteDocument(docId); 
    };

    const getDocumentContent = (contentObj) => {
        if (contentObj && contentObj.ops) {
            return contentObj.ops.map((op, index) => (
                <p key={index}>{op.insert}</p>
            ));
        }
        return <p className='text-sm text-gray-500'>No content available</p>;
    };

    if(isLoading) return <div>Loading.......</div>;


    return (
        <div className='mx-auto max-w-[500px'>
            <h1 className='text-2xl'>Start a new documents</h1>
            <button onClick={handleCreate}>Create New Doc</button>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8'>
                {documents.map((doc, idx) => (
                     <Link key={doc._id} href={`/dashboard/doc/${doc?._id}`}>
                    <div onClick={(e) => e.stopPropagation()} className='p-4 h-[500px] bg-gray-200 my-2 hover:cursor-pointer max-w-'>
                       
                            <div className='h-5/6 bg-white mb-8 p-5 '>
                            {getDocumentContent(doc?.content)}
                            </div>     {/*  In this div i want to show the content of the document */}
                               <div className='flex items-center justify-between'>
                            <span>
                            {doc?.title || 'Untitled Document-'}{idx+1}
                            </span>
                            <span>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                        <Button 
                        onClick={(e) => e.stopPropagation()}
                        variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={(e) => handleDelete(doc._id, e)}
                      >Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                            </DropdownMenu>
                            </span>
                               </div>
                    </div>
                    </Link>
                ))}
            </div>
            
        </div>
    );
};

export default UserDocuments;
