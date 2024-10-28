import React from "react";

const Terms = () => {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
            <p className="mb-2 italic">Last updated: [Date]</p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="mb-2">
                    By accessing or using BabelForge, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. User Accounts</h2>
                <p className="mb-2">
                    To access certain features, you must create an account with BabelForge. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Use of the Platform</h2>
                <p className="mb-2">
                    BabelForge is designed for team collaboration and task management. You agree not to misuse our services by engaging in prohibited activities, such as:
                </p>
                <ul className="list-disc list-inside mb-2">
                    <li>Uploading content that is illegal, harmful, or offensive</li>
                    <li>Attempting to interfere with the platform's functionality or security</li>
                    <li>Violating intellectual property rights of BabelForge or other users</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Subscription and Payments</h2>
                <p className="mb-2">
                    BabelForge offers free and paid subscription plans. By subscribing to a paid plan, you agree to provide accurate payment information and authorize us to charge your payment method for the fees associated with your subscription. All fees are non-refundable except as required by law.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property Rights</h2>
                <p className="mb-2">
                    All content, features, and functionality of BabelForge, including text, graphics, logos, and software, are the exclusive property of BabelForge and are protected by copyright, trademark, and other intellectual property laws. You may not use any BabelForge materials without our prior written permission.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
                <p className="mb-2">
                    BabelForge is provided on an "as-is" and "as-available" basis. We do not guarantee the accuracy, completeness, or reliability of any content or features. To the maximum extent permitted by law, BabelForge disclaims all liability for any damages resulting from the use or inability to use the platform.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
                <p className="mb-2">
                    We reserve the right to suspend or terminate your access to BabelForge at our discretion if you violate these Terms and Conditions or if we need to perform maintenance or updates to the platform.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Changes to These Terms</h2>
                <p className="mb-2">
                    We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and by continuing to use BabelForge, you accept any modified terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
                <p className="mb-2">
                    If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:your-contact-email@example.com" className="text-blue-500 underline">[your-contact-email@example.com]</a>.
                </p>
            </section>
        </div>
    );
};

export default Terms;
