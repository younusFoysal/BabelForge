import Reviews from "@/components/Reviews/Reviews";

export const metadata = {
    title: "Reviews | BabelForge",
    description: "Reviews for BabelForge",
}

const page = () => {
    return (
        <div>
            <Reviews></Reviews>        
        </div>
    );
};

export default page;