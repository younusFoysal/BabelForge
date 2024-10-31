import { FaUserLarge } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { cookies } from "next/headers";

const UserManual = async () => {
  const manual = [
    {
      question: "How do I create a new project in BabelForge?",
      answer:
        "To create a new project, log in to your BabelForge account, navigate to the 'Projects' section, and click on 'Create New Project'. Follow the prompts to set up your project details.",
    },
    {
      question: "How can I add team members to my project?",
      answer:
        "Within your project dashboard, go to the 'Teams' section and click on 'Team' and Click on Add Member Enter the email addresses of the users you'd like to add, and they will added.",
    },
    {
      question: "What is the process for assigning tasks to team members?",
      answer:
        "In the 'Dashboard' section, create a new task in backlogs and assign it to a team by selecting team name from the assignee dropdown menu.",
    },
    {
      question: "How do I track the progress of my project?",
      answer:
        " Go to Dashboard feature to monitor task completion, view project timelines, and assess overall project health through various metrics and charts.",
    },
  ];

  return (
    <div className=" mt-32 bg-white dark:bg-white/5 border-[#ffffff22]  backdrop-blur-lg  border-[1px] w-[90%] mx-auto  shadow-xl text-white px-2 md:px-5 py-10 my-10 mb-20  rounded-xl space-y-16">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div className="text-center">
          <p className="mt-4 text-sm leading-7 text-white/70 font-regular">
            F.A.Q
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-black dark:text-white/90">
            Frequently Asked <span className="text-purple-700">Questions</span>
          </h3>
        </div>

        <div className=" mt-16">
          <ul className="">
            {manual.map((item, index) => (
              <li key={index} className="text-left mb-10">
                <div className="flex flex-row items-start mb-5">
                  <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-white dark:bg-[#5D2BD2] text-white border-4 border-purple-700 text-xl font-semibold">
                    <FaQuestion className="m-1 text-[#7E22CE] dark:text-white" />
                  </div>
                  <div className=" bg-gray-100  dark:bg-white/5 p-5 px-10 w-full rounded-md flex items-center">
                    <h4 className="text-md leading-6 font-medium text-gray-900 dark:text-gray-100">
                      {item.question}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-row items-start">
                  <div className=" bg-gray-100 dark:bg-white/25 p-5 px-10 rounded-md w-full flex items-center">
                    <p className=" text-black dark:text-gray-100 text-sm">
                      {item.answer}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full bg-white dark:bg-[#5D2BD2] text-white border-4 border-purple-700 text-xl font-semibold">
                    <FaUserLarge className="m-1 text-[#7E22CE] dark:text-white" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
