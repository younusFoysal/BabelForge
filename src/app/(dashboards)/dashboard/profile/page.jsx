import React, {Suspense} from 'react';
import Profile from "@/components/UserProfile/Profile";

export const metadata = {
    title: "Profile | BabelForge",
    description: "User Profile for BabelForge",
}

const Page = () => {
    return (
        <div>
            <Suspense fallback={<p className="text-fuchsia-500">Loading Profile..</p>}>
                <Profile></Profile>
            </Suspense>


        </div>
    );
};

export default Page;