import DialogLayout from "@/components/shared/dialogs/DialogLayout";
import { Button } from "@/components/ui/button";
import { IUseDialogReturn } from "@/hooks/useDialog";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TeamForm, { ITeamForm } from "./TeamForm";
import { useTeamContext } from "@/context/TeamContext";
import { toast } from "sonner";

interface ITeamCreateDialogProps {
  dialog: IUseDialogReturn;
}

export default function TeamCreateDialog({ dialog }: ITeamCreateDialogProps) {
  const formMethods = useForm<ITeamForm>({
    defaultValues: {
      teamName: "",
      playerCount: "",
      region: "",
      country: ""
    }
  });

  useEffect(() => {
    formMethods.reset();

    return () => {};
  }, [dialog.isOpen]);

  const {createTeam} = useTeamContext();

  const onSubmit = (data: ITeamForm) => {
    const res = createTeam(data)

    if (res.code === 200) {
      formMethods.setValue("teamName", "")
      formMethods.setValue("playerCount", "")
      formMethods.setValue("region", "")
      formMethods.setValue("country", "")

      toast.success("Success", {
        description: res.message || "N/A"
      });
    } else {
      toast.warning("Bad Request", {
        description: res.message || "N/A"
      });
    }
  };

  return (
    <DialogLayout
      dialog={dialog}
      dialogTitle="Create New Team"
      customOpenChangeFunc={() => {
        dialog.closeDialog();
        formMethods.reset();
      }}
      dialogFooter={
        <div className="flex gap-2 items-center">
          <Button
            type="submit"
            form="createTeamForm"
          >
            Create
          </Button>
        </div>
      }
    >
      <FormProvider {...formMethods}>
        <form
          id="createTeamForm"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <TeamForm />
        </form>
      </FormProvider>
    </DialogLayout>
  );
}
