"use client";
import BabelImage from "@/image/login/babel.avif";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import React, {useState} from "react";

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

import Link from "next/link";
import axios from "axios";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SocialButton } from "@/components/SocialButton/SocialButton";
import {SiSpinrilla} from "react-icons/si";

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
    }),
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter.",
  // })
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, {
  //   message: "Password must contain at least one special character.",
  // }),
});

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value) => {
    setLoading(true)
    const { email, password } = value;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.status === 200) {
      setLoading(false)
      router.push("/dashboard");
    }
  };

  if (session?.data?.user) {
    return router.push("/dashboard");
  }

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
            Get started - it&apos;s free. No credit card needed.
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
                  {!loading ? "Continue" : <> <SiSpinrilla className="animate-spin mr-2" /> Loading </>
                  }
                </Button>
              </form>
            </Form>
            {/* from down */}
            <div className="flex items-center my-4 mt-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* socail button */}
            <SocialButton />
            <div className="flex items-center justify-center mt-10">
              <p>
                {" "}
                Don&apos;t have an account yet?
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
                Can&apos;t log in?
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
