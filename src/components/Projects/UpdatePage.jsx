'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';
import useAxiosCommon from '@/lib/axiosCommon';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import './UpdatePage.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';

const projectCategories = ['All', 'Software Engineering', 'Education', 'Non Profit Organization', 'Project Management'];

const UpdateProjectPage = ({ id }) => {
  const router = useRouter();
  const axiosCommon = useAxiosCommon();
  const [selectedCategory, setSelectedCategory] = useState(''); // Use state to store selected category

  // useEffect(() => {
  //   // Trigger the reload when the component is mounted (page is entered)
  //   window.location.reload();
  // }, []);

  const {
    data: person = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['updateproject', id],
    queryFn: async () => {
      const data = await axiosCommon.get(`/project/projects/single/${id}`);
      return data;
    },
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async data => {
      const res = await axiosCommon.patch(`project/projects/update/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      toast({
        description: 'Project Updated Successfully!',
        variant: 'success',
      });
      router.push('/dashboard/projects');
    },
    onError: () => {
      toast({
        description: 'Nothing Changed.',
        variant: 'error',
      });
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const onSubmit = data => {
    data.pcategory = selectedCategory;
    mutation.mutate(data);
  };



  const { pcategory, pdes, pname, pimg, purl } = person.data;

  return (
    <div className="flex justify-between items-center flex-col">
      <h2 className="text-4xl text-[#333] mb-4 dark:text-white">Update projects</h2>
      <div className="w-full md:w-[70%]">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-[12px]">
            <div className="mb-1">
              <Label htmlFor="tname" className="text-left mb-2 block font-semibold">
                Project Name <span className="text-red-600">*</span>
              </Label>
              <Input
                defaultValue={pname}
                {...register('pname', { required: true, minLength: 4 })}
                placeholder="e.g. HR Team, Design Team"
                id="pname"
                required
              />
              {errors.pname?.type === 'required' && <p className="text-red-600 mt-1">Project name required</p>}
              {errors.pname?.type === 'minLength' && <p className="text-red-600 mt-1">Name is too short!</p>}
            </div>

            <div className="mb-1">
              <Label htmlFor="purl" className="text-left mb-2 block font-semibold">
                Project Url <span className="text-red-600">*</span>
              </Label>
              <Input
                defaultValue={purl}
                type="purl"
                {...register('purl', { required: true })}
                placeholder="Please enter your project URL"
                id="purl"
                required
              />
            </div>

            <div className="mb-1">
              <Label htmlFor="pimg" className="text-left mb-2 block font-semibold">
                Project Image Url <span className="text-red-600">*</span>
              </Label>
              <Input
                type="pimg"
                defaultValue={pimg}
                {...register('pimg', { required: true })}
                placeholder="Please enter your project image URL"
                id="pimg"
                required
              />
            </div>

            <div className="mb-1">
              <Label htmlFor="pcategory" className="text-left mb-2 block font-semibold">
                Project Category <span className="text-red-600">*</span>
              </Label>
              <Select onValueChange={value => setSelectedCategory(value)} defaultValue={pcategory}>
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
              {errors.pcategory?.type === 'required' && <p className="text-red-600 mt-1">Category required</p>}
            </div>

            <div className="mb-1">
              <Label htmlFor="pdes" className="text-left mb-2 block font-semibold">
                Project Description <span className="text-red-600">*</span>
              </Label>
              <Textarea
                defaultValue={pdes}
                {...register('pdes', { required: true, minLength: 10 })}
                placeholder="Tell us about your project"
                id="tdes"
              />
              {errors.pdes?.type === 'required' && <p className="text-red-600 mt-1">Description required</p>}
              {errors.pdes?.type === 'minLength' && <p className="text-red-600 mt-1">Description too short!</p>}
            </div>

            <div className="flex  items-center gap-3 justify-end">
              <button
                className="px-6 py-3 mt-4 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group ${className} dark:bg-gray-50 text-white"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectPage;
