import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAxiosCommon from '@/lib/axiosCommon';
import { toast } from '@/hooks/use-toast';

const UpdateTeamModal = ({ isOpen, setIsOpen, team, refetch }) => {
  const axiosCommon = useAxiosCommon();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const tname = form.tname.value;
    const tdes = form.tdes.value;
    const tcategory = form.tcategory.value;
    const tpic = form.tpic.value;
    const updateTeam = { tname, tdes, tcategory, tpic };

    const res = await axiosCommon.patch(`/team/teams/${team._id}`, updateTeam);

    if (res.data) {
      toast({
        description: 'Update team succesfully',
        variant: 'success',
      });
      refetch();
    }

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="dark:bg-[#181024]">
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
              defaultValue={team?.tpic}
              // onChange={(e) => setTeamDescription(e.target.value)}
              name="tpic"
              placeholder="Enter team image url"
            />
          </div>

          {/* Footer Buttons */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary mb-4 md:mb-0 text-white dark:bg-gray-800">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTeamModal;
