import { Copy } from "lucide-react";

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
import QRCode from "react-qr-code";
import { RiShareForwardFill } from "react-icons/ri";
import { toast } from "@/hooks/use-toast";

export function ShareLink({ colour }) {
  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          description: "Link copied to clipboard!",
          variant: "success",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${ colour &&
            "px-6 capitalize border-2 border-purple-700 bg-white dark:bg-gray-900  hover:bg-purple-700  rounded-md transition-all duration-500 group  hover:scale-105 hover:text-white flex gap-1 items-center group py-[22px]  text-purple-700 dark:text-purple-400 text-sm "
          }`}
        >
          Share{" "}
          {colour && (
            <span>
              <RiShareForwardFill className="text-purple-700 dark:text-purple-500 group-hover:text-white transition-all duration-500 " size={20} />
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark:bg-[#181024]">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription className="mb-10">
            Anyone who has this link will be able to view this.
          </DialogDescription>
          <div
            style={{
              padding: "10px",
              height: "auto",
              margin: "0 auto",
              maxWidth: 200,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={currentUrl}
              viewBox={`0 0 256 256`}
            />
          </div>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={window.location.href}
              readOnly
              className={`${colour && " dark:bg-[#181024]"}`}
            />
          </div>
          <Button
            onClick={handleCopy}
            size="sm"
            className={`px-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:text-white`}
          >
            <span className="sr-only">Copy</span>
            <Copy className={`h-4 w-4 ${colour && "text-white"}`} />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className={`
                px-6 capitalize bg-gradient-to-r from-blue-600 to-purple-600  rounded-md transition-all duration-500  hover:scale-105 flex gap-1 items-center group py-5 dark:bg-gray-50 text-white text-sm 
              `}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
