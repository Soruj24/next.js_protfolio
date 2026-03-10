import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User } from "lucide-react";
import React from "react";

const EditProfileDialogforNormalUsers = ({
  isOpen,
  onClose,
  handleProfileUpdate,
  newName,
  setNewName,
  setIsEditDialogOpen,
  isUpdating,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleProfileUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  setNewName: (name: string) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  isUpdating: boolean;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your public name displayed on your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleProfileUpdate}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Full Name
              </Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-transparent border-white/10 text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialogforNormalUsers;
