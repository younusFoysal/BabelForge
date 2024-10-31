"use client";
import React, { useState } from 'react';

const Faq = () => {


    const categories = [
        {
            "_id": "672297532973b59333d86d23",
            "name": "Project",
            "questions": [
                {
                    "question": "How do I create a new project in BabelForge?",
                    "answer": "After successful Login/Signup navigate to the 'Projects' tab from dashboard and click on 'Create Project', then provide the necessary details and create."
                },
                {
                    "question": "Can I view all existing projects?",
                    "answer": "Yes, after navigate to the 'Projects' section, you can browse all the projects you are in and use filters for more precise searches."
                },
                {
                    "question": "How can I view Details about a project?",
                    "answer": "After Navigate to the project section, click on the project name to view details of that project."
                }
            ]
        },
        {
            "_id": "672297532973b59333d86d24",
            "name": "Team",
            "questions": [
                {
                    "question": "How do I invite team members in BabelForge?",
                    "answer": "In the view details of a team section under 'Teams' tab, use the 'Add Member' option to add a member to the team."
                },
                {
                    "question": "How do I remove a team member from a project?",
                    "answer": "In the view details of a team section under 'Teams' tab, use the 'Remove Member' option to remove a member to the team."
                }
            ]
        },
        {
            "_id": "672297532973b59333d86d25",
            "name": "Task",
            "questions": [
                {
                    "question": "How do I assign tasks to team members?",
                    "answer": "Navigate to Backlog tab under Task, Here you will see all the tasks, then clicking edit task to assign tasks."
                },
                {
                    "question": "Can I use drag-and-drop to rearrange tasks?",
                    "answer": "Yes, BabelForge supports drag-and-drop functionality, allowing you to organize tasks by workflow in the task board view."
                }
            ]
        },
        {
            "_id": "672297532973b59333d86d26",
            "name": "Tools",
            "questions": [
                {
                    "question": "What tools can I integrate with BabelForge?",
                    "answer": "BabelForge integrates with tools like AI assistant, Docs sharing, Notes, Group chat, Video conferencing and many more to enhance team collaboration."
                },
                {
                    "question": "How can I access all the tools?",
                    "answer": "Under the 'Tools' section you will find all the tools provided by the babelforge. But all the tools are not free, you need to be a premium user to access those tools."
                }
            ]
        },
        {
            "_id": "672297532973b59333d86d27",
            "name": "Payment & Subscription",
            "questions": [
                {
                    "question": "What subscription plans does BabelForge offer?",
                    "answer": "BabelForge offers multiple subscription plans to suit various team sizes and needs, including a Basic, Standard and Premium tiers with additional features."
                },
                {
                    "question": "What payment methods are accepted?",
                    "answer": "BabelForge accepts major credit cards like MasterCard, Visa for monthly and annual subscriptions. Check the 'Payment' section for full details."
                },
                {
                    "question": "Is my payment information secure?",
                    "answer": "Yes, BabelForge follows standard  ways to protect your payment details, ensuring your information is kept secure and confidential."
                }
            ]
        }
    ];

    const [activeCategory, setActiveCategory] = useState(categories[0]?.name);
    const [openQuestion, setOpenQuestion] = useState({ [categories[0]?.name]: 0 });

    const handleQuestionToggle = (categoryName, index) => {
        setOpenQuestion((prev) => ({
            ...prev,
            [categoryName]: prev[categoryName] === index ? null : index,
        }));
    };

    return (
        <div>
            <section className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg mb-24">
                <div className="container px-6 py-12 mx-auto">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
                        Have any Questions?
                    </h1>
                    <h2 className="text-lg font-light text-center text-gray-800 lg:text-lg dark:text-gray-300 mt-2">
                        <span className="border-b border-purple-700 mb-2 pb-4 px-16">
                            Let us answer your questions
                        </span>
                    </h2>

                    <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
                        {/* Left Column: Category Tabs */}
                        <div className="lg:mx-12 lg:w-1/6">
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                Table of Contents
                            </h1>
                            <div className="space-y-4">
                                {categories.map((category, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setActiveCategory(category.name);
                                            setOpenQuestion({ [category.name]: 0 });
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 transform ${
                                            activeCategory === category.name
                                                ? "text-purple-700 dark:text-purple-500 border-l-4 border-purple-700"
                                                : "text-gray-600 dark:text-gray-400"
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Questions for the Active Category */}
                        <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
                            {categories
                                .filter((category) => category.name === activeCategory)
                                .map((category) => (
                                    <div key={category.name}>
                                        {category.questions.map((question, qIndex) => (
                                            <div key={qIndex} className="mb-8">
                                                <button
                                                    className="flex items-center justify-between w-full focus:outline-none"
                                                    onClick={() => handleQuestionToggle(category.name, qIndex)}
                                                >
                                                    <div className="flex items-center">
                                                        <svg
                                                            className={`flex-shrink-0 w-6 h-6 ${
                                                                openQuestion[category.name] === qIndex
                                                                    ? "text-purple-700 rotate-90"
                                                                    : "text-purple-700"
                                                            } transition-transform`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M20 12H4"
                                                            />
                                                        </svg>
                                                        <h1 className="mx-4 text-lg text-gray-700 dark:text-white">
                                                            {question.question}
                                                        </h1>
                                                    </div>
                                                </button>

                                                {openQuestion[category.name] === qIndex && (
                                                    <div className="mt-4 md:mx-10">
                                                        <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                                            {question.answer}
                                                        </p>
                                                    </div>
                                                )}
                                                <hr className="my-8 border-gray-200 dark:border-gray-700" />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faq;
