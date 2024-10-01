import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { axiosCommon } from "@/lib/axiosCommon";
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "../ui/toaster";

export function UpdateProfile({ user, refetch }) {
  const { toast } = useToast();
  const UpdateProfile = useMutation({
    mutationFn: async (updateData) => {
      const data = axiosCommon.patch(
        `/api/users/update/${user?.email}`,
        updateData
      );
      console.log("Test update", (await data).data);

      return (await data).data;
    },
    onSuccess: (data) => {
      console.log("Successsss", data.modifiedCount);

      if (data.modifiedCount > 0 || data.upsertedCount > 0) {
        console.log("Data updated!!!");
        toast({
          title: "Updated!",
          description: "Profile updated Successful!",
          status: "success",
        });

        refetch();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const userName = e.target.username.value;
    const displayName = e.target.name.value;
    const department = e.target.department.value;
    const organization = e.target.organization.value;
    const location = e.target.location.value;
    const email = e.target.email.value;
    const updateData = {
      username: userName,
      name: displayName,
      department: department,
      organization: organization,
      location: location,
      email: email,
    };

    UpdateProfile.mutate(updateData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customise profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={user?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue={user?.username}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                email
              </Label>
              <Input
                disable
                id="email"
                defaultValue={user?.email}
                className="col-span-3"
              />
            </div>
            {/* department */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                defaultValue={user?.department}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organization" className="text-right">
                Organization
              </Label>
              <Input
                id="organization"
                defaultValue={user?.organization}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                defaultValue={user?.location}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
