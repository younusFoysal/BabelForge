import React, { useState } from 'react';

const Faq = ({ categories }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0].name);
    const [openQuestion, setOpenQuestion] = useState({ [categories[0].name]: 0 }); // Track open question for each category

    const handleQuestionToggle = (categoryName, index) => {
        setOpenQuestion((prev) => ({
            ...prev,
            [categoryName]: prev[categoryName] === index ? null : index
        }));
    };

    return (
        <div>
            <section className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg mb-24">
                <div className="container px-6 py-12 mx-auto">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
                        Have any Questions ?
                    </h1>

                    <h2 className="text-lg font-light text-center text-gray-800 lg:text-lg dark:text-gray-300 mt-2 ">
                        <span className="border-b border-purple-700 mb-2 pb-4 px-16"> Let us answer your questions </span>
                    </h2>



                    <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
                        {/* Left Column: Category Tabs */}
                        <div className="lg:mx-12 lg:w-1/6">
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Table of Contents</h1>
                            <div className="space-y-4">
                                {categories.map((category, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setActiveCategory(category.name);
                                            setOpenQuestion({ [category.name]: 0 }); // Reset open question for new category
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 transform ${
                                            activeCategory === category.name
                                                ? 'text-purple-700 dark:text-purple-500 border-l-4 border-purple-700'
                                                : 'text-gray-600 dark:text-gray-400'
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
                                                                    ? 'text-purple-700 rotate-90'
                                                                    : 'text-purple-700'
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
