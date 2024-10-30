import React from 'react';
import ProjectPage from "@/components/Projects/ProjectPage";

export const metadata = {
    title: "Projects | BabelForge",
    description: "Projects for BabelForge",
}

const Page = () => {
    return (
        <div>
            <ProjectPage></ProjectPage>
        </div>
    );
};

export default Page;