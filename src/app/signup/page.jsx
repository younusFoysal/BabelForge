'use client';
import BabelImage from '@/image/login/babel.avif';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Googleicon from '@/image/icon/google.png';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SocialButton } from '@/components/SocialButton/SocialButton';
import toast from 'react-hot-toast';
import { SiSpinrilla } from 'react-icons/si';
import useAxiosCommon from '@/lib/axiosCommon';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),

  name: z.string().min(4, {
    message: 'name must be at least 4 characters.',
  }),

  email: z.string().email({
    message: 'Invalid email address.',
  }),

  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long.',
    })
    .max(20, {
      message: 'Password must not be more than 20 characters long.',
    }),
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter.",
  // })
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, {
  //   message: "Password must contain at least one special character.",
  // }),
});

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
    },
  });
  const axioncommon = useAxiosCommon();

  const onSubmit = async value => {
    setLoading(true);
    const { email, password, username, name } = value;
    ////console.log(value)
    try {
      const { data } = await axioncommon.post(
        `/api/users/add`,
        {
          email,
          password,
          username,
          name,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      //console.log(data);
      if (data.insertedId) {
        setLoading(false);
        toast.success('Sign up successfully.');
        router.push(`/login`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex">
      <div className="flex justify-center items-center w-full lg:w-[60%] h-screen">
        <div className="w-[90%] lg:w-[60%]">
          <h1
            className="text-3xl md:text-4xl font-bold text-center text-gray-700 dark:text-white
          "
          >
            Welcome to BabelForge
          </h1>
          <p className="text-center py-4 text-gray-600 dark:text-white"> Get started - it&apos;s free. No credit card needed.</p>
          <div className="p-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" className="bg-transparent border-gray-800" placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="bg-transparent border-gray-800" type="text" placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="bg-transparent border-gray-800" type="email" placeholder="Enter your mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-transparent border-gray-800"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ShowPass word button */}
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <Button type="submit" className="w-full text-center rounded">
                  {!loading ? (
                    'Continue'
                  ) : (
                    <>
                      {' '}
                      <SiSpinrilla className="animate-spin mr-2" /> Loading{' '}
                    </>
                  )}
                </Button>
              </form>
            </Form>
            {/* from down */}
            <div className="flex items-center my-4 mt-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 dark:text-white">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* social button */}
            <SocialButton />

            <div className="text-center py-5">
              <p>By proceeding, you agree to the</p>
              <p>
                {' '}
                <span className="text-blue-500 duration-300 transition-all hover:underline">Terms of Service</span> and{' '}
                <span className="text-blue-500 duration-300 transition-all hover:underline">Privacy Policy</span>
              </p>
            </div>
            <div className="flex items-center justify-center mt-12">
              <p>
                {' '}
                Already have an account?
                <Link className="text-blue-500 duration-300 transition-all hover:underline ml-1" href="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex">
        <Image src={BabelImage} height={800} width={600} alt="loginimage" className="h-screen object-cover" />
      </div>
    </div>
  );
};

export default Signup;
