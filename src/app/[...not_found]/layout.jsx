// app/not_found/layout.jsx
const NotFoundLayout = ({ children }) => {
    return (
        <html lang="en">
        <body>
        <main className="min-h-screen flex flex-col">
            {children}

        </main>
        </body>
        </html>
    );
};

export default NotFoundLayout;
