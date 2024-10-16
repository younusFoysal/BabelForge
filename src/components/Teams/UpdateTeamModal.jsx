import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Use Shadcn Dialog
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import useAxiosCommon from "@/lib/axiosCommon";

const UpdateTeamModal = ({ isOpen, setIsOpen, team, refetch }) => {

    console.log("update team page",team._id);

    const axiosCommon = useAxiosCommon();
  
    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault()
        const form = e.target;
        const tname = form.tname.value;
        const tdes = form.tdes.value;
        const tcategory = form.tcategory.value;
        const tpic = form.tpic.value;
        const updateTeam= {tname, tdes, tcategory, tpic};
        console.log("update team form", updateTeam);

        const res = await axiosCommon.patch(`/team/teams/${team._id}`, updateTeam)
        console.log(res.data);

        if (res.data.modifiedCount > 0) {
            // show success popup

            Swal.fire({
                title: 'Success!',
                text: `team info update  successfully`,
                icon: 'success',
                confirmButtonText: 'Cool'
            })

            refetch();

        }
        

        // Logic to send the updated team data to the server (e.g., axios post)
        // refetch() after successful submission

        // Close modal
        setIsOpen(false); 
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Team</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {/* Team Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Team Name</label>
                        <Input
                            type="text"
                           
                            //   onChange={(e) => setTeamName(e.target.value)}
                            name="tname"
                            defaultValue={team?.tname}
                            placeholder="Enter team name"
                        />
                    </div>

                    {/* Team Description Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Team Description</label>
                        <Input
                            type="text"
                            defaultValue={team?.tdes}
                            // onChange={(e) => setTeamDescription(e.target.value)}
                            name="tdes"
                            placeholder="Enter team description"
                        />
                    </div>
                    {/* Team category Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Team Category</label>
                        <Input
                            type="text"
                            defaultValue={team?.tcategory}
                            // onChange={(e) => setTeamDescription(e.target.value)}
                            name="tcategory"
                            placeholder="Enter team category"
                        />
                    </div>
                    {/* Team picture Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Team Image Url</label>
                        <Input
                            type="text"
                            defaultValue={team?.tpic
                                }
                            // onChange={(e) => setTeamDescription(e.target.value)}
                            name="tpic"
                            placeholder="Enter team image url"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <DialogFooter>
                        <Button type="submit" className="bg-primary text-white">
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateTeamModal;
