import CreateButton from "@/components/shared/buttons/CreateButton";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import EditButton from "@/components/shared/buttons/EditButton";
import PageTitle from "@/components/shared/common/PageTitle";
import { DataTable } from "@/components/shared/data-table/DataTable";
import ConfirmDialog from "@/components/shared/dialogs/ConfirmDialog";
import { useTeamContext } from "@/context/TeamContext";
import useDialog from "@/hooks/useDialog";
import Layout from "@/layout/Layout";
import { ITeamItem } from "@/types/team.interface";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import TeamCreateDialog from "./components/TeamCreateDialog";
import TeamUpdateDialog from "./components/TeamUpdateDialog";
import ManagePlayerButton from "./components/ManagePlayerButton";
import ManagePlayerDialog from "./components/ManagePlayerDialog";

const columns: ColumnDef<ITeamItem>[] = [
  {
    accessorKey: "teamName",
    header: "Team",
    cell: ({ row }) => <div>{row.getValue("teamName")}</div>
  },
  {
    accessorKey: "playerCount",
    header: "Player Count",
    cell: ({ row }) => <div>{row.getValue("playerCount")}</div>
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => <div>{row.getValue("region")}</div>
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>
  }
];

export default function TeamList() {
  const createDialog = useDialog();
  const updateDialog = useDialog();
  const confirmDialog = useDialog();
  const managePlayersDialog = useDialog();

  const { teams, deleteTeam } = useTeamContext();
  const [selectedItem, setSelectedItem] = useState<ITeamItem | null>(null);

  const mutatedCols = useMemo(() => {
    return [
      ...columns,
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const item = row.original as ITeamItem;
          return (
            <div className="flex gap-2">
              <ManagePlayerButton
                onClick={() => {
                  setSelectedItem(item);
                  managePlayersDialog.openDialog();
                }}
              />
              <EditButton
                onClick={() => {
                  setSelectedItem(item);
                  updateDialog.openDialog();
                }}
              />
              <DeleteButton
                onClick={() => {
                  setSelectedItem(item);
                  confirmDialog.openDialog();
                }}
              />
            </div>
          );
        }
      }
    ];
  }, [columns]);

  return (
    <Layout>
      <PageTitle pageTitle="Team List">
        <CreateButton onClick={createDialog.openDialog}>
          Create Team
        </CreateButton>
      </PageTitle>
      <DataTable
        data={teams || []}
        columns={mutatedCols}
      />
      <TeamCreateDialog dialog={createDialog} />
      <TeamUpdateDialog
        dialog={updateDialog}
        teamId={selectedItem?.teamId || ""}
      />
      <ConfirmDialog
        dialog={confirmDialog}
        confirmContent={{
          title: "Confirm",
          description: `Are you sure to delete ${selectedItem?.teamName}?`
        }}
        handleConfirm={() => {
          const res = deleteTeam(selectedItem?.teamId || "");
          if (res.code === 200) {
            toast.success("Success", {
              description: res.message || "N/A"
            });
            confirmDialog.closeDialog();
          } else {
            toast.warning("Bad Request", {
              description: res.message || "N/A"
            });
          }
        }}
      />
      <ManagePlayerDialog dialog={managePlayersDialog} teamItem={selectedItem} />
    </Layout>
  );
}
