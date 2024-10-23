import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import QRCode from "react-qr-code"

export function ShareLink() {
    const currentUrl = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription className="mb-5">
            Anyone who has this link will be able to view this.
          </DialogDescription>
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
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
            />
          </div>
          <Button onClick={handleCopy
          } size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
