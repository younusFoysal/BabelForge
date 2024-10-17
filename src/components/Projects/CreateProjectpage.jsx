'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { TagsInput } from 'react-tag-input-component';
import useAxiosCommon from '@/lib/axiosCommon';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import './CreateProject.css';

const projectCategories = ['All', 'Software Engineering', 'Education', 'Non Profit Organization', 'Project Management'];

const CreateProjectpage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const router = useRouter();
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const [emails, setEmails] = useState([uemail]);
  const axiosCommon = useAxiosCommon();
  const [selectedCategory, setSelectedCategory] = useState('');
  const { resolvedTheme } = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const now = new Date();
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setCurrentDate(formattedDate);
  }, []);

  const mutation = useMutation({
    mutationFn: async data => {
      const res = await axiosCommon.post('/project/projects', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Project Created Successfully!');
      reset();
      setEmails([uemail]); // Reset emails to include the user's email only
      router.push('/dashboard/projects');
    },
    onError: () => {
      toast.error(`Something went Wrong!`);
    },
  });

  const onSubmit = (data) => {
    data.pmanager = uemail;
    data.pallmembers = emails;
    data.pedate = "";
    data.psdate = currentDate;
    data.pmname = user?.firstName;
    data.favorite = false;
    data.pcategory = selectedCategory;
    mutation.mutate(data);
  };
  // console.log("selected: ",selectedCategory);

  return (
    <div className="flex justify-between items-center flex-col">
      <h2 className="text-4xl text-[#333] mb-4 dark:text-white">Create projects</h2>
      <div className="w-[60%]">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-[12px]">
            <div className="mb-1">
              <Label htmlFor="tname" className="text-left mb-2 block font-semibold">
                Project Name <span className="text-red-600">*</span>
              </Label>
              <Input {...register('pname', { required: true, minLength: 4 })} placeholder="e.g. HR Team, Design Team" id="pname" />

              {errors.pname?.type === 'required' && <p className="text-red-600 mt-1">Project name required</p>}

              {errors.pname?.type === 'minLength' && <p className="text-red-600 mt-1">Name is too short!</p>}
            </div>

            <div className="mb-1">
              <Label htmlFor="purl" className="text-left mb-2 block font-semibold">
                Project Url <span className="text-red-600">*</span>
              </Label>
              <Input type="text" {...register('purl', { required: true })} placeholder="Please enter your project URL" id="purl" />
              {errors.purl?.type === 'required' && <p className="text-red-600 mt-1">Project URL required</p>}
            </div>

            <div className="mb-1">
              <Label htmlFor="pimg" className="text-left mb-2 block font-semibold">
                Project Image Url <span className="text-red-600">*</span>
              </Label>
              <Input type="text" {...register('pimg', { required: true })} placeholder="Please enter your project image URL" id="pimg" />
              {errors.pimg?.type === 'required' && <p className="text-red-600 mt-1">Project image URL required</p>}
            </div>

            <div className="mb-1">
              <Label htmlFor="pcategory" className="text-left mb-2 block font-semibold">
                Project Category <span className="text-red-600">*</span>
              </Label>
              <Select onValueChange={value => setSelectedCategory(value)} value={selectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {projectCategories.map(category => (
                      <SelectItem value={category} key={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!selectedCategory && <p className="text-red-600 mt-1">Category required</p>}
            </div>

            <div className="mb-1">
              <Label htmlFor="pdes" className="text-left mb-2 block font-semibold">
                Project Description <span className="text-red-600">*</span>
              </Label>
              <Textarea {...register('pdes', { required: true, minLength: 10 })} placeholder="Tell us about your project" id="tdes" />
              {errors.pdes?.type === 'required' && <p className="text-red-600 mt-1">Description required</p>}
              {errors.pdes?.type === 'minLength' && <p className="text-red-600 mt-1">Description too short!</p>}
            </div>

            <div className="mb-1">
              <Label htmlFor="members" className="text-left mb-2 block font-semibold">
                Who should be in this project?
              </Label>
              <div className={resolvedTheme === 'dark' && 'parent_Tags'}>
                <TagsInput value={emails} onChange={setEmails} placeHolder="Enter emails" />
              </div>
              <span>Press enter to add more</span>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button className="bg-bgColor hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-[#0362F3FF] font-medium px-4 py-2 rounded-md" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectpage;