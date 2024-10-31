import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { axiosCommon } from '@/lib/axiosCommon';
import { useMutation } from '@tanstack/react-query';
import { Toaster } from '../ui/toaster';

export function UpdateProfile({ user, refetch }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const UpdateProfile = useMutation({
    mutationFn: async updateData => {
      const data = axiosCommon.patch(`/api/users/update/${user?.email}`, updateData);
      return (await data).data;
    },
    onSuccess: data => {
      if (data.modifiedCount > 0 || data.upsertedCount > 0) {
        toast({
          title: 'Updated!',
          description: 'Profile updated successfully!',
          status: 'success',
        });

        refetch();
        setOpen(false);
      }
    },
    onError: error => {
      //console.log(error);
    },
  });

  const handleUpdate = e => {
    e.preventDefault();
    const updateData = {
      username: e.target.username.value,
      name: e.target.name.value,
      department: e.target.department.value,
      organization: e.target.organization.value,
      location: e.target.location.value,
      email: e.target.email.value,
    };

    UpdateProfile.mutate(updateData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full capitalize bg-gradient-to-r from-blue-600 to-purple-600  ] dark:hover:shadow-purple-800 text-white hover:text-white"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customise profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue={user?.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" defaultValue={user?.username} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" defaultValue={user?.email} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input id="department" defaultValue={user?.department} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organization" className="text-right">
                Organization
              </Label>
              <Input id="organization" defaultValue={user?.organization} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" defaultValue={user?.location} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
