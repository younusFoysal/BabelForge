"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useEffect } from "react";

const ContactForm = () => {
  // Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div
      className="bg-blue-300 rounded-xl hover:shadow-2xl hover:shadow-blue-200 duration-500"
      data-aos="slide-right"
    >
      <div className="bg-blue-500 translate-x-3 -translate-y-3 rounded-xl -z-50">
        <div className="bg-white translate-x-2 -translate-y-2 dark:bg-[#2E073F] rounded-xl p-12 -z-50 shadow-md">
          <h2 className="text-2xl mb-5">Contact With our team</h2>
          <form>
            {/* name parent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div class="mb-5">
                <label for="firstName" class="block mb-2 text-sm font-medium">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  class="block w-full p-2.5 border rounded-md text-sm"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="lastName" class="block mb-2 text-sm font-medium">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  class="block w-full p-2.5 border rounded-md text-sm"
                  required
                />
              </div>
            </div>
            {/* Mail and Job parent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium">
                  Work Email*
                </label>
                <input
                  type="email"
                  id="email"
                  class="block w-full p-2.5 border rounded-md text-sm"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="jobTitle" class="block mb-2 text-sm font-medium">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  class="block w-full p-2.5 border rounded-md text-sm"
                />
              </div>
            </div>
            {/* Phone */}
            <div class="mb-5">
              <label for="phone" class="block mb-2 text-sm font-medium">
                Phone number*
              </label>
              <input
                type="text"
                id="phone"
                class="block w-full p-2.5 border rounded-md text-sm"
              />
            </div>
            {/* Company Name & size */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div class="mb-5">
                <label for="conpanyName" class="block mb-2 text-sm font-medium">
                  Company Name*
                </label>
                <input
                  type="text"
                  id="conpanyName"
                  class="block w-full p-2.5 border rounded-md text-sm"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="companySize" class="block mb-2 text-sm font-medium">
                  Company Size*
                </label>
                <select
                  id="range"
                  name="range"
                  class="block w-full p-2.5 border rounded-md"
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
              </div>
            </div>
            {/* Manage */}
            <div class="mb-5">
              <label for="manage" class="block mb-2 text-sm font-medium">
                What would you like to manage with babelforge.com?*
              </label>
              <textarea
                type="text"
                id="manage"
                class="block w-full p-2.5 border rounded-md text-sm"
              />
            </div>
            {/* Help */}
            <div class="mb-5">
              <label for="manage" class="block mb-2 text-sm font-medium">
                How can our team help you?
              </label>
              <textarea
                type="text"
                id="manage"
                class="block w-full p-2.5 border rounded-md text-sm"
                placeholder="Tell us more about your tearn and what work you'd like to
manage with babelforge.com"
              />
            </div>
            <p className="w-60 mx-auto  text-xs">
              By clicking submit, I acknowledge babelforge.com{" "}
              <Link href="" className="text-blue-500">
                Privacy Policy
              </Link>
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="text-white bg-primary rounded-full px-4 py-2 hover:scale-105 hover:shadow-xl hover:shadow-violet-200 duration-500"
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
