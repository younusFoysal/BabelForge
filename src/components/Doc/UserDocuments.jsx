'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useAxiosCommon from '@/lib/axiosCommon';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import docImage from '../../../public/Images/doc.png'
import createDoc from '../../../public/Images/createDoc.png'
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import Alert from '../shared/Alert';

const UserDocuments = () => {
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const axiosCommon = useAxiosCommon();
    const router = useRouter();

    //console.log();
    

    const {data: documents, isLoading, isError, refetch} = useQuery({
        queryKey: ['documents', email],
        queryFn: async () => {
            const response = await axiosCommon.get(`/document/document/${email}`);
            return response.data;
        }
    })
        

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
       

        deleteDocument(docId); 
    };

    

    if(isLoading) return <div  className='mx-auto max-w-[1300px]'>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 mt-16 lg:grid-cols-4 lg:gap-8">
      <Skeleton className="h-[300px]  rounded-xl" />
      <div className="space-y-2">
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
      <Skeleton className="h-[300px]  rounded-xl" />     
      <Skeleton className="h-[300px]  rounded-xl" />     
      <Skeleton className="h-[300px]  rounded-xl" />      
      <Skeleton className="h-[300px]  rounded-xl" />   
      
    </div>
    </div>;


    return (
        <div className='mx-auto max-w-[1300px]'>
            <h1 className='text-2xl mb-3'>Start a new documents</h1>
           <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8'>
           <button className='h-[300px] rounded-md flex justify-center items-center bg-white border dark:bg-gray-600/70' onClick={handleCreate}> <Image height={180} width={180} src={createDoc} alt="doc" /></button>
           </div>
           <h3 className='mt-8 mb-2'>Your recent work</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8'>
                {documents?.map((doc, idx) => (
                     <Link key={doc._id} href={`/dashboard/doc/${doc?._id}`}>
                    <div onClick={(e) => e.stopPropagation()} className='p-4 h-[300px] bg-gray-200 my-2 rounded-md dark:bg-gray-700/60 hover:cursor-pointer max-w-'>
                       
                            <div className='h-5/6 bg-white dark:bg-gray-700/60  mb-4 p-5 flex justify-center items-center'>
                            <Image height={160} width={160} src={docImage} alt="doc" />
                            </div>     {/*  In this div i want to show the content of the document */}
                               <div className='flex items-center justify-between'>
                            <span>
                            {doc?.title || 'Untitled Document'}
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
                     
                      ><Alert
                      title='Delete Document'
                      description='Are you sure you want to delete this document?'
                       onContinue={() => handleDelete(doc._id)}>
                      {openDialog => (
                        <button
                          className="w-full text-left"
                          onClick={e => {
                            e.stopPropagation();
                            openDialog();
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </Alert></DropdownMenuItem>
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
