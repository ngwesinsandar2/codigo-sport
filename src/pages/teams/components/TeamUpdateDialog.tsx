import DialogLayout from "@/components/shared/dialogs/DialogLayout";
import { Button } from "@/components/ui/button";
import { IUseDialogReturn } from "@/hooks/useDialog";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TeamForm, { ITeamForm } from "./TeamForm";
import { useTeamContext } from "@/context/TeamContext";
import { toast } from "sonner";

interface ITeamUpdateDialogProps {
  dialog: IUseDialogReturn;
  teamId: string;
}

export default function TeamUpdateDialog({
  dialog,
  teamId
}: ITeamUpdateDialogProps) {
  const formMethods = useForm<ITeamForm>({
    defaultValues: {
      teamName: "",
      playerCount: "",
      region: "",
      country: ""
    }
  });

  const { getTeamDetail, updateTeam } = useTeamContext();

  useEffect(() => {
    if (dialog.isOpen && teamId) {
      const teamData = getTeamDetail(teamId);

      if (teamData) {
        formMethods.setValue("teamName", teamData.data?.teamName || "");
        formMethods.setValue(
          "playerCount",
          String(teamData.data?.playerCount) || ""
        );
        formMethods.setValue("region", teamData.data?.region || "");
        formMethods.setValue("country", teamData.data?.country || "");
      } else {
        toast.warning("Team not found", {
          description: `No team found with ID "${teamId}".`
        });
        dialog.closeDialog();
      }
    }
  }, [dialog.isOpen, teamId]);

  const onSubmit = (data: ITeamForm) => {
    const res = updateTeam(teamId, data);

    if (res.code === 200) {
      toast.success("Update Successful", {
        description: res.message || "Team updated successfully!"
      });
      dialog.closeDialog();
    } else {
      toast.warning("Bad Request", {
        description: res.message || "An error occurred while updating the team."
      });
    }
  };

  return (
    <DialogLayout
      dialog={dialog}
      dialogTitle="Update Team"
      customOpenChangeFunc={() => {
        dialog.closeDialog();
        formMethods.reset();
      }}
      dialogFooter={
        <div className="flex gap-2 items-center">
          <Button
            type="submit"
            form="updateTeamForm"
          >
            Update
          </Button>
        </div>
      }
    >
      <FormProvider {...formMethods}>
        <form
          id="updateTeamForm"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <TeamForm />
        </form>
      </FormProvider>
    </DialogLayout>
  );
}
