const UserManual = () => {
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
    <div className=" mt-32  bg-white/10 border-[#ffffff22]  backdrop-blur-lg  border-[1px] w-[90%] mx-auto   text-white px-2 md:px-5 py-10 my-10 mb-20  rounded-xl space-y-16">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div className="text-center">
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
            F.A.Q
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-300">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h3>
        </div>

        <div className="mt-20">
          <ul className="">
            {manual.map((item, index) => (
              <li key={index} className="text-left mb-10">
                <div className="flex flex-row items-start mb-5">
                  <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                    <svg
                      width="30px"
                      fill="white"
                      height="30px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g data-name="Layer 2">
                        <g data-name="menu-arrow">
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(180 12 12)"
                            opacity="0"
                          ></rect>
                          <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                          <circle cx="12" cy="19" r="1"></circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="bg-[#33363B] p-5 px-10 w-full flex items-center">
                    <h4 className="text-md leading-6 font-medium text-gray-100">
                      {item.question}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-row items-start">
                  <div className="bg-[#1E1F22] p-5 px-10 w-full flex items-center">
                    <p className="text-gray-200 text-sm">{item.answer}</p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                    <svg
                      height="25px"
                      fill="white"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 295.238 295.238"
                      style={{ enableBackground: "new 0 0 295.238 295.238" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <g>
                            <path
                              d="M277.462,0.09l-27.681,20.72l-27.838,64.905h-22.386l-8.79-19.048h5.743c10.505,0,19.048-8.452,19.048-18.957V28.571
                                              h9.524V0H196.51v28.571h9.524V47.71c0,5.248-4.271,9.433-9.524,9.433h-10.138L174.2,30.81l14.581-7.267L141.038,3.095
                                              l-11.224,39.281c-0.305-23.371-19.386-42.29-42.829-42.29c-23.633,0-42.857,19.224-42.857,42.857
                                              c0,14.281,7.233,27.676,19.048,35.595v7.176H51.643L50.9,89.619c-2.314,12.005-2.529,24.343-0.638,36.648l-32.486,57.905
                                              l35.876,8.195v60.014h47.619v42.857h114.286v-66.357c33.333-23.581,52.371-61.495,52.343-101.943l0.01-17.371
                                              c0-6.548-0.605-13.276-1.824-19.905l-0.705-3.948h-9.348l21.429-51.338V0.09z M206.033,19.138V9.614h9.524v9.524H206.033z
                                              M189.067,85.714h-18.062l-8.657-19.048h17.929L189.067,85.714z M147.219,16.119l18.929,8.11l-4.467,2.19l14.2,30.724h-17.862
                                              l-11.605-25.471l-4.262,2.152L147.219,16.119z M160.543,85.715h-21.176v-9.433c0-5.252,4.271-9.614,9.524-9.614h2.995v-0.001
                                              L160.543,85.715z M141.843,44.652l5.776,12.71c-9.905,0.667-17.776,8.848-17.776,18.919v9.433h-19.048v-7.176
                                              c9.529-6.386,15.995-16.352,18.176-27.452L141.843,44.652z M53.653,42.948c0-18.376,14.957-33.333,33.333-33.333
                                              c18.376,0,33.333,14.957,33.333,33.333c0,11.829-6.39,22.881-16.671,28.838l-2.376,1.371v12.557h-9.524V56.352
                                              c5.529-1.971,9.524-7.21,9.524-13.41c0-7.876-6.41-14.286-14.286-14.286c-7.876,0-14.286,6.411-14.286,14.287
                                              c0,6.2,3.995,11.438,9.524,13.41v29.362H72.7V73.157l-2.376-1.376C60.043,65.824,53.653,54.776,53.653,42.948z M86.986,47.71
                                              c-2.629,0-4.762-2.139-4.762-4.762c0-2.629,2.133-4.762,4.762-4.762c2.629,0,4.762,2.133,4.762,4.762S89.615,47.71,86.986,47.71z
                                              M257.366,95.239c0.691,4.761,1.039,9.59,1.039,14.285l0.01,17.405c0.029,38.148-18.795,73.871-50.286,95.552l-2.095,1.429
                                              v61.805h-95.238v-42.857h-47.62v-58.086l-30.862-7.043l27.876-49.7l-0.271-1.7c-1.771-10.419-1.871-21.567-0.333-31.09h3.59
                                              h47.619H257.366z M245.714,85.714H232.3l23.738-55.343l10.557,5.257L245.714,85.714z M267.938,25.714l-5.267-2.633l5.267-3.943
                                              V25.714z"
                            ></path>
                            <path d="M96.51,123.81h-23.81v9.524h23.81V123.81z"></path>
                            <path d="M81.71,190.81h-23.81v9.524h23.81V190.81z"></path>
                            <path d="M123.81,190.81h-23.81v9.524h23.81V190.81z"></path>
                            <path d="M165.81,190.81h-23.81v9.524h23.81V190.81z"></path>
                            <path d="M207.81,190.81h-23.81v9.524h23.81V190.81z"></path>
                            <path d="M81.71,228.81h-23.81v9.524h23.81V228.81z"></path>
                            <path d="M123.81,228.81h-23.81v9.524h23.81V228.81z"></path>
                            <path d="M165.81,228.81h-23.81v9.524h23.81V228.81z"></path>
                            <path d="M207.81,228.81h-23.81v9.524h23.81V228.81z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
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
