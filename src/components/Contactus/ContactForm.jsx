"use client";
import useAxiosCommon from "@/lib/axiosCommon";
import emailjs from "@emailjs/browser";
import { useMutation } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Checkbox } from "../ui/checkbox";

const ContactForm = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

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
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(gmt6Date.getUTCDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Format time as HH:MM AM/PM
    let hours = gmt6Date.getUTCHours();
    const minutes = String(gmt6Date.getUTCMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, "0");
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
    mutationFn: async (data) => {
      const res = await axiosCommon.post("/message/messages/add", data);
      // console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      // console.log('successfully');
      toast.success(" Message send Successfully!");
      reset();
    },
    onError: (error) => {
      // console.log(error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    data.mdate = currentDate;
    data.mtime = currentTime;

    // Sending email through EmailJS
    emailjs
      .sendForm(
        "service_69vnh7j",
        "template_fcmd8bd",
        form.current,
        "R0SQsAJVqN9XXxY0A"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email sent successfully!");
        },
        (error) => {
          console.error(error.text);
          toast.error("Failed to send the email.");
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
    emailjs.init("R0SQsAJVqN9XXxY0A");
  }, []);

  return (
    <div
      className="bg-blue-300 rounded-xl hover:shadow-2xl hover:shadow-blue-200 duration-500 dark:hover:shadow-gray-700"
      data-aos="slide-right"
    >
      <Head>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          async
        ></script>
      </Head>
      <div className="bg-blue-500 translate-x-3 -translate-y-3 rounded-xl -z-50">
        <div className="bg-white translate-x-2 -translate-y-2 dark:bg-gray-800 rounded-xl p-12 -z-50 shadow-md">
          <h2 className="text-2xl mb-5">Contact With our team</h2>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            {/* name parent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div class="mb-5">
                <label for="firstName" class="block mb-2 text-sm font-medium">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  id="firstName"
                  class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
                />
                {errors.firstName?.type === "required" && (
                  <p className="text-red-600 text-[12px] mt-1">
                    First name is required
                  </p>
                )}
              </div>
              <div class="mb-5">
                <label for="lastName" class="block mb-2 text-sm font-medium">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  id="lastName"
                  class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
                />
                {errors.lastName?.type === "required" && (
                  <p className="text-red-600 text-[12px] mt-1">
                    Last name is required
                  </p>
                )}
              </div>
            </div>
            {/* Mail and Job parent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium">
                  Work Email <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600 text-[12px] mt-1">
                    Email is required
                  </p>
                )}
              </div>
              <div class="mb-5">
                <label for="jobTitle" class="block mb-2 text-sm font-medium">
                  Job Title
                </label>
                <input
                  {...register("jobTitle")}
                  type="text"
                  id="jobTitle"
                  class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
                />
              </div>
            </div>
            {/* Phone */}
            <div class="mb-5">
              <label for="phone" class="block mb-2 text-sm font-medium">
                Phone number <span className="text-red-600">*</span>
              </label>
              <input
                {...register("phone", { required: true, valueAsNumber: true })}
                id="phone"
                class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
              />
              {errors.phone?.type === "required" && (
                <p className="text-red-600 text-[12px] mt-1">
                  Phone number is required
                </p>
              )}
            </div>
            {/* Company Name & size */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div class="mb-5">
                <label for="companyName" class="block mb-2 text-sm font-medium">
                  Company Name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("companyName", { required: true })}
                  type="text"
                  id="companyName"
                  class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
                />
                {errors.phone?.type === "required" && (
                  <p className="text-red-600 text-[12px] mt-1">
                    Company name is required
                  </p>
                )}
              </div>
              <div class="mb-5">
                <label for="companySize" class="block mb-2 text-sm font-medium">
                  Company Size <span className="text-red-600">*</span>
                </label>
                <select
                  {...register("companySize", { required: true })}
                  id="companySize"
                  name="companySize"
                  class="block w-full p-2.5 border rounded-md dark:bg-transparent dark:text-white dark:border-gray-700 "
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
                {errors.companySize?.type === "required" && (
                  <p className="text-red-600 text-[12px] mt-1">
                    Please select an option
                  </p>
                )}
              </div>
            </div>
            {/* Manage */}
            <div class="mb-5">
              <label for="manageMessage" class="block mb-2 text-sm font-medium">
                What would you like to manage with babelforge.com?{" "}
                <span className="text-red-600">*</span>
              </label>
              <textarea
                {...register("manageMessage", { required: true })}
                type="text"
                id="manageMessage"
                class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
              />
              {errors.manageMessage?.type === "required" && (
                <p className="text-red-600 text-[12px] mt-1">
                  Please fill up this field
                </p>
              )}
            </div>

            {/* Help */}
            <div class="mb-5">
              <label for="helpMessage" class="block mb-2 text-sm font-medium">
                How can our team help you?{" "}
                <span className="text-red-600">*</span>
              </label>
              <textarea
                {...register("helpMessage", { required: true })}
                type="text"
                id="helpMessage"
                class="block w-full p-2.5 border rounded-md text-sm dark:bg-transparent dark:text-white dark:border-gray-700 "
                placeholder="Tell us more about your tearn and what work you'd like to
manage with babelforge.com"
              />
              {errors.helpMessage?.type === "required" && (
                <p className="text-red-600 text-[12px] mt-1">
                  Please fill up this field
                </p>
              )}
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
                  By clicking submit, I acknowledge babelforge.com{" "}
                  <Link href="" className="text-blue-500">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="text-white bg-primary py-2 hover:scale-105 hover:shadow-xl hover:shadow-violet-200 duration-500 dark:hover:shadow-gray-700 dark:text-black px-6 rounded-md dark:font-semibold"
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
