import React from 'react';
import Notes from "@/components/Notes/Notes";
import Note from '@/components/Note/Note';

export const metadata = {
    title: "Notes | BabelForge",
    description: "Notes for BabelForge",
}

const Page = () => {
    return (
        <>

          <Note></Note>

        </>
    );
};

export default Page;