import DocumentPage from '@/components/Doc/DocumentPage';

export const metadata = {
    title: "Document | BabelForge",
    description: "Document for BabelForge",
}

const page = ({params}) => {
    return (
        <div>
            <DocumentPage params={params}></DocumentPage>
        </div>
    );
};

export default page;