import { Template, deleteTemplate, loadTemplates } from "@/lib/template";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
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
} from "./ui/alert-dialog";

export default function TemplateItem(props: {
  template: Template;
  setTemplates: Function;
}) {
  return (
    <div className="grid grid-cols-[1fr,auto] m-2 shadow-lg bg-white dark:bg-slate-800 px-2 py-1 rounded-md items-center">
      <p className="font-medium">{props.template.name}</p>
      <span className="flex space-x-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" className="p-0 h-auto flex items-center">
              <Trash2 height={14} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                template and you will not be able to recover it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteTemplate(props.template);
                  props.setTemplates(loadTemplates());
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </span>
    </div>
  );
}
