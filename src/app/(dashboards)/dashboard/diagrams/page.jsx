import React from 'react';
import Diagram from "@/components/Canvas/Diagram";

export const metadata = {
    title: "Diagram | BabelForge",
    description: "Diagram for BabelForge",
}

const Page = () => {
    return (
        <div>
            <Diagram/>
        </div>
    );
};

export default Page;