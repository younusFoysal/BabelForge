'use client';
import useAxiosCommon from '@/lib/axiosCommon';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';
import usePerson from '@/hooks/usePerson';
import { toast } from '@/hooks/use-toast';
import { Input } from '../ui/input';

const TeamDialog = ({ id, refetch }) => {
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const axiosCommon = useAxiosCommon();
  const [teamMembers, setTeamMembers] = useState();
  const [person, isUserLoading] = usePerson(teamMembers);

  const handlesubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    setTeamMembers(email);
  };

  useEffect(() => {
    if (teamMembers) {
      if (!isUserLoading) {
        if (person.data) {
          axiosCommon
            .patch(`team/teams/${id}`, { addMember: teamMembers })
            .then(res => {
              if (res.data.result.modifiedCount) {
                refetch();
                toast({
                  description: 'Member Added',
                  variant: 'success',
                });
              } else {
                toast({
                  description: 'Member Already Exists.',
                  variant: 'error',
                });
              }
            })
            .catch(error => {
              if (error.status == 400) {
                toast({
                  description: 'Member Already Exists.',
                  variant: 'error',
                });
              }
            });
        } else {
          toast({
            description: 'Member Not Found.',
            variant: 'error',
          });
        }
      }
    }
  }, [teamMembers, person, axiosCommon, id, isUserLoading, refetch]);

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex-1 font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-purple-200 dark:hover:shadow-purple-800 text-white hover:text-white transition-all duration-500 hover:scale-105  p-2 mb-2 rounded-sm dark:bg-gray-800">
          Add Member
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add to Team member</DialogTitle>
          <p className="mb-2">
            Grow your team and work better together. Adding people to this team gives them access to all the team’s work. Learn more about
            teams.
          </p>
          <form onSubmit={handlesubmit}>
            <Input
              name="email"
              type="email"
              placeholder="Add Member"
              className="w-full rounded-sm px-2 mb-2 py-3 border border-gray-50 focus:border-gray-200"
              required
            />

            <button
              type="submit"
              className="flex-1 w-full font-medium bg-gradient-to-r from-blue-600 to-purple-600  dark:hover:shadow-purple-800 text-white hover:text-white transition-all duration-500   px-5 py-2 mb-2 rounded-sm dark:bg-gray-800 mt-2"
            >
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamDialog;
