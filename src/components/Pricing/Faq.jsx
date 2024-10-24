'use client';

// aos package
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const accordionData = [
  {
    "question": "Which pricing plan is right for me?",
    "answer": "We understand that each organization is unique, requiring specific features to support its workflows and projects. Above you can see the features included in the different plans to support your needs."
  },
  {
    "question": "How does our pricing work?",
    "answer": "Our pricing is based on two factors; the feature plan you’d like to use, and the number of users on the platform. Once you’ve decided on the feature plan and users, choose your preferred subscription payment: month-to-month or annual. Payment is made in one upfront installment. If you purchase a plan for one year, you will pay for one year upfront."
  },
  {
    "question": "Do you offer any discounted plans?",
    "answer": "Yes, by choosing a yearly plan, you will receive an 18% discount."
  },
  {
    "question": "Can I change my plan?",
    "answer": "You can make changes to your plan at any time by changing your plan type and by adding or removing users. However, past the refund period, we offer no refunds for downgrades. To change your plan, simply go into the Admin div and click on the Billing option. From there, click 'change plan' and choose your desired plan."
  },
  {
    "question": "How secure is bableforge.com?",
    "answer": "The security of our customer’s data is our top priority. We use advanced security measures to preserve the integrity and privacy of your data, and adhere to strict data protection laws. bableforge.com is built with internationally recognized security standards and protocols in place, such as ISO/IEC 27001 and ISO/IEC 27018, and we undergo annual security audits and assessments."
  },
  {
    "question": "How can I manage my billing?",
    "answer": "If you are an admin of your account, you can access your purchase history, invoices, payment details, plan type, and more."
  }
]


const Faq = () => {
  // Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <section>
      <div>
        <div className=" flex flex-col lg:justify-center text-black dark:text-white  p-4 lg:w-[70%] mx-auto md:p-8">
          <h2 className="mb-12 text-4xl font-bold leading-none text-purple-700 dark:text-white text-center sm:text-4xl">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full text-xl">
      {accordionData?.map((item, index) => <AccordionItem data-aos="zoom-in-down" key={index} value={index+1}>
        <AccordionTrigger>{item?.question}</AccordionTrigger>
        <AccordionContent>
         {item?.answer}
        </AccordionContent>
      </AccordionItem>)}
    </Accordion>

        </div>
      </div>
    </section>
  );
};

export default Faq;
