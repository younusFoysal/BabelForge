"use client"
import React from 'react';
import NoteItem from './NoteItem';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxiosCommon from "@/lib/axiosCommon";

const Notes = () => {
    const axiosCommon = useAxiosCommon();
    // Fetch all notes
    const { data: notes, refetch, isLoading } = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/note/notes');
            return data;
        },
        onError: () => {
            toast.error('Failed to load notes.');
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} refetch={refetch} />
            ))}
        </div>
    );
};

export default Notes;
