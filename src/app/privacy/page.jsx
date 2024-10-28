
const Privacy = () => {
    return (
        <section className="lg:px-0 bg-white/5 pb-[70px]  px-4 pt-[100px]">
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                    <p className="mb-2">
                        We collect information that you provide to us and that we gather from your usage of BabelForge. This includes:
                    </p>
                    <ul className="list-disc list-inside mb-2">
                        <li><strong>Personal Information:</strong> When you register, subscribe to our services, or interact with certain features, we may collect personal information, such as your name, email address, and billing information.</li>
                        <li><strong>Project and Task Data:</strong> Information related to projects, tasks, comments, and other content created or uploaded by you as part of your team collaboration activities.</li>
                        <li><strong>Usage Information:</strong> Information about your interactions with BabelForge, such as pages visited, features used, and timestamps, to improve user experience.</li>
                        <li><strong>Device Information:</strong> Information about the device and network you use to access BabelForge, including IP address, browser type, and operating system.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                    <p className="mb-2">
                        We use your information to provide, maintain, and enhance BabelForge, including:
                    </p>
                    <ul className="list-disc list-inside mb-2">
                        <li>Facilitating communication and collaboration between team members</li>
                        <li>Processing payments and managing subscriptions</li>
                        <li>Providing customer support and assistance</li>
                        <li>Improving our platform through user insights and analytics</li>
                        <li>Sending updates, notifications, and relevant information about BabelForge</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
                    <p className="mb-2">
                        We do not sell or share your information with third parties for their marketing purposes. We may share your information with:
                    </p>
                    <ul className="list-disc list-inside mb-2">
                        <li><strong>Service Providers:</strong> For essential services like payment processing, data storage, and customer support.</li>
                        <li><strong>Legal and Regulatory Requirements:</strong> When required by law, we may disclose your information to authorities or legal entities.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of BabelForge, user information may be transferred to the new entity.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
                    <p className="mb-2">
                        We prioritize data security and take reasonable measures to protect your information. However, no security system is foolproof, and we cannot guarantee the complete security of your data.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">5. Your Choices and Rights</h2>
                    <p className="mb-2">
                        You may:
                    </p>
                    <ul className="list-disc list-inside mb-2">
                        <li>Access or update your personal information within your BabelForge account.</li>
                        <li>Opt out of receiving promotional emails by following the unsubscribe link in those emails.</li>
                        <li>Request deletion of your account and personal data, subject to legal obligations.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">6. Children's Privacy</h2>
                    <p className="mb-2">
                        BabelForge is not intended for children under 13, and we do not knowingly collect personal information from children under 13.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
                    <p className="mb-2">
                        We may update this Privacy Policy from time to time. We encourage you to review this policy periodically. Continued use of BabelForge after changes will be deemed acceptance of the updated policy.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
                    <p className="mb-2">
                        If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:your-contact-email@example.com" className="text-blue-500 underline">babelforgeltd@gmail.com</a>.
                    </p>
                </section>
            </div>
        </section>
    );
};

export default Privacy;
