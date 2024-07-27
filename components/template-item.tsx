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
    <div className="grid grid-cols-[1fr,auto] shadow-lg items-center">
      <h4 className="text-lg font-medium">{props.template.name}</h4>
      <span className="space-x-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="secondary" className="h-auto flex items-center">
              Delete
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
