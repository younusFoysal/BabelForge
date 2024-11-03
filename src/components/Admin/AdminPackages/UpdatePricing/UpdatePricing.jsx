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
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster"; // Import toast
import { toast } from "@/hooks/use-toast";
import usePlan from "@/hooks/usePlan";

import { axiosCommon } from "@/lib/axiosCommon";
import { useMutation } from "@tanstack/react-query";

const UpdatePricing = ({ pack, refetch, handlePay, priceingsec, title }) => {
  const [plan] = usePlan();
  const updatePricingCard = useMutation({
    mutationFn: async (updateData) => {
      const data = axiosCommon.patch(
        `/price/update-pricing/${pack?._id}`,
        updateData
      );

      return (await data).data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0 || data.upsertedCount > 0) {
        toast({
          title: "Updated!",
          description: "Card Updated successfully",
          variant: "success",
        });

        refetch();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Create updated data object
    const updatedPack = {
      title: e.target.titles.value,
      featuresTitle: e.target.description.value,
      price: parseInt(e.target.price.value),
      priceDetails: e.target.priceDetails.value,
      projects: parseInt(e.target.projects.value),
      team: parseInt(e.target.team.value),
      task: parseInt(e.target.task.value),
      groupchat: e.target.groupchat.checked,
      canvas: e.target.canvas.checked,
      BabelAi: e.target.babelAi.checked,
      meeting: e.target.meeting.checked,
    };

    updatePricingCard.mutate(updatedPack);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => handlePay(title)}
          className="overflow-hidden mt-auto w-full p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
        >
          {priceingsec ? "Purchase Now" : " Update"}
          {/* Button hover effect */}
          <span className="absolute w-full h-32 -top-20  -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-110 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
          <span className="absolute w-full h-32 -top-20 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-110 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
          <span className="absolute w-full h-32 -top-20 -left-2  bg-gradient-to-r from-blue-600 to-purple-600  rotate-12 transform scale-x-0 group-hover:scale-x-110 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
          <span className="w-full group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-1 z-10">
            {priceingsec ? "Checkout" : " Update"}
          </span>
        </button>
      </DialogTrigger>

      {priceingsec || (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Pricing Plan</DialogTitle>
            <DialogDescription>
              Update the pricing details and features for the selected package.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => handleUpdate(e, pack._id)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    name="titles"
                    id="title"
                    defaultValue={pack?.title}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    defaultValue={pack?.featuresTitle}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    name="price"
                    id="price"
                    type="number"
                    defaultValue={pack?.price}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="priceDetails">Per</Label>
                  <Input
                    name="priceDetails"
                    id="priceDetails"
                    defaultValue={pack?.priceDetails}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="projects">Projects</Label>
                  <Input
                    name="projects"
                    id="projects"
                    defaultValue={pack?.projects}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="team">Team</Label>
                  <Input
                    name="team"
                    id="team"
                    defaultValue={pack?.team}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="task">Task Limit</Label>
                  <Input
                    name="task"
                    id="task"
                    defaultValue={pack?.task}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="groupchat" className="text-right">
                    Group Chat
                  </Label>
                  <input
                    type="checkbox"
                    id="groupchat"
                    name="groupchat"
                    className="w-4 h-4"
                    defaultChecked={pack?.groupchat}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="canvas" className="text-right">
                    Canvas
                  </Label>
                  <input
                    type="checkbox"
                    id="canvas"
                    name="canvas"
                    className="w-4 h-4"
                    defaultChecked={pack?.canvas}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="babelAi" className="text-right">
                    BabelAi
                  </Label>
                  <input
                    type="checkbox"
                    id="babelAi"
                    name="babelAi"
                    className="w-4 h-4"
                    defaultChecked={pack?.BabelAi}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="meeting" className="text-right">
                    Meeting
                  </Label>
                  <input
                    type="checkbox"
                    id="meeting"
                    name="meeting"
                    className="w-4 h-4"
                    defaultChecked={pack?.meeting}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      )}

      <Toaster />
    </Dialog>
  );
};

export default UpdatePricing;
