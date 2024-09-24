"use client";
import BabelImage from "@/image/login/babel.avif";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Googleicon from "@/image/icon/google.png";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),

  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long.",
    })
    .max(20, {
      message: "Password must not be more than 20 characters long.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    }),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex">
        <Image
          src={BabelImage}
          height={800}
          width={600}
          alt="loginimage"
          className="h-screen object-cover"
        />
      </div>
      <div className="flex justify-center items-center w-full lg:w-[60%] h-screen">
        <div className="w-[90%] lg:w-[60%]">
          <h1
            className="text-3xl md:text-4xl font-bold text-center text-gray-700
          "
          >
            Welcome to BabelForge
          </h1>
          <p className="text-center py-4 text-gray-600">
            {" "}
            Get started - it's free. No credit card needed.
          </p>
          <div className="p-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 w-full "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your mail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full text-center rounded">
                  Continue
                </Button>
              </form>
            </Form>
            {/* from down */}
            <div className="flex items-center my-4 mt-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Button
              type="submit"
              className="w-full text-center rounded bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-200 text-[14px]"
            >
              <Image
                src={Googleicon}
                height={20}
                width={20}
                alt="googleicon"
                className="mr-2 h-5 w-5"
              />
              Continue With Google
            </Button>
            <div className="flex items-center justify-center mt-10">
              <p>
                {" "}
                Don't have an account yet?
                <Link
                  className="text-blue-500 duration-300 transition-all hover:underline ml-1"
                  href="/signup"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div>
              <p className="text-center py-1">
                {" "}
                Can't log in?
                <Link
                  className="text-blue-500 duration-300 transition-all hover:underline ml-1"
                  href=""
                >
                  Visit our help center
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;