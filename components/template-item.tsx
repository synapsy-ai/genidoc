import { Template, deleteTemplate, loadTemplates } from "@/lib/template";
import { Button } from "./ui/button";
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
import CreateTemplate from "./create-template";

export default function TemplateItem(props: {
  template: Template;
  setTemplates: Function;
  id?: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center">
      <h4 className="text-lg font-medium">{props.template.name}</h4>
      <span className="space-x-2">
        <CreateTemplate
          template={props.template}
          index={props.id}
          isEdit
          setTemplates={props.setTemplates}
        />
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
