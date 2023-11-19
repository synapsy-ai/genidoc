"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { resetGenerations } from "@/lib/generation";
import { resetSettings } from "@/lib/settings";
import { Trash2, X } from "lucide-react";

export default function DataPage() {
  return (
    <div className="space-y-2">
      <div>
        <h4 className="font-bold">Generation History</h4>
        <p>Manage your generation history.</p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="h-auto py-1 px-1" variant="destructive">
              <Trash2 height={14} />
              <p>Erase history</p>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                history and remove your Generation data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  resetGenerations();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div>
        <h4 className="font-bold">Reset settings</h4>
        <p>Reset Synapsy Genidoc settings to their default values.</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="h-auto py-1 px-1" variant="destructive">
              <X height={14} />
              <p>Reset Settings</p>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                settings and reset them back to their default values.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  resetSettings();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
