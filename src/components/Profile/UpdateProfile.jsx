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
import axios from "axios";
import { Toaster } from "../ui/toaster";

export function UpdateProfile({ user }) {
  const { toast } = useToast();
  const handleUpdate = (e) => {
    e.preventDefault();
    const userName = e.target.username.value;
    const displayName = e.target.name.value;
    const department = e.target.department.value;
    const organization = e.target.organization.value;
    const location = e.target.location.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    const data = {
      username: userName,
      name: displayName,
      department: department,
      organization: organization,
      location: location,
      email: email,
      image: image,
    };

    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${user?.email}`,
        data
      )
      .then((data) => {
        if (data.data.modifiedCount > 0 || data.data.upsertedCount > 0) {
          console.log("Test file", data.data);
          toast({ title: "Update", description: "Successfully Updated" });
        }
      })
      .catch((e) => console.log(e.message));
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
                Email
              </Label>
              <Input
                disabled
                id="email"
                defaultValue={user?.email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                defaultValue={user?.image}
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
              {" "}
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
