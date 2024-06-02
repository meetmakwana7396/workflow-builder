"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addWorkflow } from "@/lib/features/workflows/workflowSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ICreateWorkflowForm {
  name: string;
  description?: string;
}

export default function CreateWorkflowButton() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>();

  const defaultValues = {
    name: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICreateWorkflowForm>({
    defaultValues,
  });

  const createWorkflow = (formData: ICreateWorkflowForm) => {
    try {
      dispatch(addWorkflow(formData));
      reset();
      setOpen(false);
    } catch (error) {}
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="h-full">Create new workflow</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Create new workflow</DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(createWorkflow)}>
            <Input
              placeholder="Name of workflow"
              {...register("name", { required: true })}
            />
            <Textarea
              placeholder="Workflow description..."
              rows={6}
              {...register("description")}
            />
            <DialogFooter>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
