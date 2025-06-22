import DialogLayout from "@/components/shared/dialogs/DialogLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTeamContext } from "@/context/TeamContext";
import { IUseDialogReturn } from "@/hooks/useDialog";
import { ITeamItem } from "@/types/team.interface";
import { BalldontlieAPI } from "@balldontlie/sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface IManagePlayerUpdateDialogProps {
  dialog: IUseDialogReturn;
  teamItem: ITeamItem | null;
}

interface IManagePlayerForm {
  selectedPlayers: string[];
}

const api = new BalldontlieAPI({ apiKey: import.meta.env.VITE_API_SECRET_KEY });

export default function ManagePlayerDialog({
  dialog,
  teamItem
}: IManagePlayerUpdateDialogProps) {
  const formMethods = useForm<IManagePlayerForm>({
    defaultValues: {
      selectedPlayers: []
    }
  });

  const { updateTeam } = useTeamContext();

  const playerQuery = useInfiniteQuery({
    queryKey: ["teams"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.nba.getPlayers({ cursor: pageParam, per_page: 10 });
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
    enabled: false,
    refetchOnMount: false
  });

  useEffect(() => {
    if (dialog.isOpen) {
      if (
        teamItem?.players &&
        formMethods.watch("selectedPlayers").length === 0
      ) {
        formMethods.setValue("selectedPlayers", teamItem.players);
      }

      if (!playerQuery.isFetching && !playerQuery.isFetched) {
        playerQuery.refetch();
      }
    }
  }, [dialog.isOpen, teamItem?.players]);

  const onSubmit = (data: IManagePlayerForm) => {
    // const res = updateTeam(teamId, data);
    // if (res.code === 200) {
    //   toast.success("Update Successful", {
    //     description: res.message || "Team updated successfully!"
    //   });
    //   dialog.closeDialog();
    // } else {
    //   toast.warning("Bad Request", {
    //     description: res.message || "An error occurred while updating the team."
    //   });
    // }
  };

  return (
    <DialogLayout
      dialog={dialog}
      dialogTitle="Manage Players"
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
          <ScrollArea className="h-94 w-full">
            <Controller
              name="selectedPlayers"
              rules={{
                validate: (value) =>
                  value.length > 0 || "Please select at least one player."
              }}
              render={({ field: { onChange, value, ...restField } }) => (
                <div className="flex flex-col gap-3 mb-4">
                  {playerQuery.data?.pages?.map((groups, i) => (
                    <Fragment key={i}>
                      {groups?.data?.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.first_name}
                              checked={value.includes(item.id)}
                              onCheckedChange={(checkedState) => {
                                if (checkedState) {
                                  onChange([...value, item.id]);
                                } else {
                                  onChange(
                                    value.filter(
                                      (val: number) => val !== item.id
                                    )
                                  );
                                }
                              }}
                              {...restField}
                            />
                            <label
                              htmlFor={item.first_name}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-600"
                            >
                              {item.first_name} {item.last_name}
                            </label>
                          </div>
                        );
                      })}
                    </Fragment>
                  ))}
                </div>
              )}
            />
            <Button
              type="button"
              onClick={() => playerQuery.fetchNextPage()}
              disabled={!playerQuery.hasNextPage || playerQuery.isFetching}
              size={"sm"}
              variant={"secondary"}
              isLoading={playerQuery.isFetching}
            >
              {playerQuery.hasNextPage ? "Load More" : "No More"}
            </Button>
          </ScrollArea>
        </form>
      </FormProvider>
    </DialogLayout>
  );
}
