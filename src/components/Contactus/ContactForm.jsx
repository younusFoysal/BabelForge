'use client';
import useAxiosCommon from '@/lib/axiosCommon';
import emailjs from '@emailjs/browser';
import { useMutation } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { toast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const axiosCommon = useAxiosCommon();
  const form = useRef();

  // useeffects
  useEffect(() => {
    const now = new Date();

    // Convert to GMT+6
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    // Format date as YYYY-MM-DD
    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Format time as HH:MM AM/PM
    let hours = gmt6Date.getUTCHours();
    const minutes = String(gmt6Date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    // Set the formatted date and time
    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // create post req using tanStack
  const mutation = useMutation({
    mutationFn: async data => {
      const res = await axiosCommon.post('/message/messages/add', data);
      return res.data;
    },
    onSuccess: () => {
      reset();
    },
    onError: error => {},
  });

  const onSubmit = data => {
    data.mdate = currentDate;
    data.mtime = currentTime;

    // Sending email through EmailJS
    emailjs.sendForm('service_69vnh7j', 'template_fcmd8bd', form.current, 'R0SQsAJVqN9XXxY0A').then(
      result => {
        toast({
          description: 'Email sent successfully!',
          variant: 'success',
        });
      },
      error => {
        toast({
          description: 'Failed to send the email.',
          variant: 'error',
        });
      }
    );

    // console.log(data);
    mutation.mutate(data);
  };

  // Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    emailjs.init('R0SQsAJVqN9XXxY0A');
  }, []);

  return (
    <div className="bg-purple-500 dark:bg-purple-300 rounded-xl  duration-500 " data-aos="slide-right">
      <Head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" async></script>
      </Head>
      <div className="bg-purple-300 dark:bg-purple-500 text-black dark:text-white translate-x-3  rounded-xl -z-50">
        <div className=" translate-x-3 bg-purple-50 dark:bg-[#181024] rounded-xl p-12 -z-50 ">
          <h2 className="text-2xl mb-5">Contact With our team</h2>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            {/* name parent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="mb-5">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register('firstName', { required: true })}
                  type="text"
                  id="firstName"
                  className="block  w-full p-2.5 border rounded-md text-sm bg-transparent text-black dark:text-white border-gray-700 "
                />
                {errors.firstName?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">First name is required</p>}
              </div>
              <div className="mb-5">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register('lastName', { required: true })}
                  type="text"
                  id="lastName"
                  className="block w-full p-2.5 border rounded-md text-sm bg-transparent text-black dark:text-white border-gray-700 "
                />
                {errors.lastName?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">Last name is required</p>}
              </div>
            </div>
            {/* Mail and Job parent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Work Email <span className="text-red-600">*</span>
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  id="email"
                  className="block w-full p-2.5 border rounded-md text-sm bg-transparent text-black dark:text-white border-gray-700 "
                />
                {errors.email?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">Email is required</p>}
              </div>
              <div className="mb-5">
                <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium">
                  Job Title
                </label>
                <input
                  {...register('jobTitle')}
                  type="text"
                  id="jobTitle"
                  className="block w-full p-2.5 border rounded-md text-sm bg-transparent text-black dark:text-white border-gray-700 "
                />
              </div>
            </div>
            {/* Phone */}
            <div className="mb-5">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                Phone number <span className="text-red-600">*</span>
              </label>
              <input
                {...register('phone', { required: true, valueAsNumber: true })}
                id="phone"
                className="block w-full p-2.5 border rounded-md text-sm  bg-transparent  text-black dark:text-white  border-gray-700 "
              />
              {errors.phone?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">Phone number is required</p>}
            </div>
            {/* Company Name & size */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="mb-5">
                <label htmlFor="companyName" className="block mb-2 text-sm font-medium">
                  Company Name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register('companyName', { required: true })}
                  type="text"
                  id="companyName"
                  className="block w-full p-2.5 border rounded-md text-sm  bg-transparent  text-black dark:text-white  border-gray-700 "
                />
                {errors.phone?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">Company name is required</p>}
              </div>
              <div className="mb-5">
                <label htmlFor="companySize" className="block mb-2 text-sm font-medium">
                  Company Size <span className="text-red-600">*</span>
                </label>
                <select
                  {...register('companySize', { required: true })}
                  id="companySize"
                  name="companySize"
                  className="block w-full p-2.5 border rounded-md  bg-transparent text-black dark:text-white dark:bg-[#181024]  border-gray-700 "
                >
                  <option value="" disabled selected>
                    Please select
                  </option>
                  <option value="1-19">1-19</option>
                  <option value="20-49">20-49</option>
                  <option value="50-99">50-99</option>
                  <option value="100-250">100-250</option>
                  <option value="251-1500">251-1500</option>
                  <option value="1500+">1500+</option>
                </select>
                {errors.companySize?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">Please select an option</p>}
              </div>
            </div>
            {/* Manage */}
            <div className="mb-5">
              <label htmlFor="manageMessage" className="block mb-2 text-sm font-medium">
                What would you like to manage with babelforge.com? <span className="text-red-600">*</span>
              </label>
              <textarea
                {...register('manageMessage', { required: true })}
                type="text"
                id="manageMessage"
                className="block w-full p-2.5 border rounded-md text-sm  bg-transparent  text-black dark:text-white  border-gray-700 "
              />
              {errors.manageMessage?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">Please fill up this field</p>}
            </div>

            {/* Help */}
            <div className="mb-5">
              <label htmlFor="helpMessage" className="block mb-2 text-sm font-medium">
                How can our team help you? <span className="text-red-600">*</span>
              </label>
              <textarea
                {...register('helpMessage', { required: true })}
                type="text"
                id="helpMessage"
                className="block placeholder:text-white placeholder:opacity-40 w-full p-2.5 border rounded-md text-sm  bg-transparent text-black dark:text-white  border-gray-700 "
                placeholder="Tell us more about your tearn and what work you'd like to
manage with babelforge.com"
              />
              {errors.helpMessage?.type === 'required' && <p className="text-red-600 text-[12px] mt-1">Please fill up this field</p>}
            </div>
            <div className=" py-3 mx-auto max-w-96 text-xs flex space-x-2">
              <Checkbox className="border" id="terms1" required />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-[13px] leading-[19px] text-muted-foreground">
                  By clicking submit, I acknowledge babelforge.com{' '}
                    Privacy Policy
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className=" capitalize bg-gradient-to-r from-blue-600 to-purple-600  rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center dark:bg-white py-2  hover:shadow-lg  hover:dark:shadow-purple-800 text-white px-6  font-semibold"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
