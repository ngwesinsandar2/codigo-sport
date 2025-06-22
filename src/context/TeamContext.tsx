import { v4 as uuidv4 } from "uuid"; // generate unique IDs :contentReference[oaicite:6]{index=6}
import { EStorageKeys } from "@/constants/storage-keys";
import { ITeamForm } from "@/pages/teams/components/TeamForm";
import { IContextRes } from "@/types/context-res.interface";
import { ITeamItem } from "@/types/team.interface";
import { decrypt, encrypt } from "@/utils/encrypt-decrypt";
import React, { createContext, useContext, useState, useEffect } from "react";

export type ITeamRes = IContextRes<ITeamItem | null>;

interface ITeamContext {
  teams: ITeamItem[] | null;
  createTeam: (data: ITeamForm) => ITeamRes;
  getTeamDetail: (teamId: string) => ITeamRes;
  updateTeam: (teamId: string, data: ITeamForm) => ITeamRes;
  deleteTeam: (teamId: string) => ITeamRes;
}

const TeamContext = createContext<ITeamContext | undefined>(undefined);

export const useTeamContext = (): ITeamContext => {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeamContext must be used within TeamProvider");
  return ctx;
};

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<ITeamItem[] | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(EStorageKeys.TeamKey);
    if (raw) setTeams(decrypt<ITeamItem[]>(raw));
  }, []);

  const persist = (items: ITeamItem[]) => {
    localStorage.setItem(EStorageKeys.TeamKey, encrypt(items));
    setTeams(items);
  };

  const getTeamDetail = (teamId: string): ITeamRes => {
    const team = teams?.find(t => t.teamId === teamId) ?? null;
    return team
      ? { status: "success", code: 200, message: "", data: team }
      : { status: "error", code: 404, message: "Team not found", data: null };
  };

  const createTeam = (data: ITeamForm): ITeamRes => {
    if (teams?.some(t => t.teamName === data.teamName)) {
      return { status: "error", code: 400, message: "Duplicate team name", data: null };
    }
    const newTeam: ITeamItem = {
      teamId: uuidv4(),
      ...data,
      playerCount: Number(data.playerCount),
      players: null,
    };
    const updated = teams ? [...teams, newTeam] : [newTeam];
    persist(updated);
    return { status: "success", code: 200, message: "Team created", data: newTeam };
  };

  const updateTeam = (teamId: string, data: ITeamForm): ITeamRes => {
    const existing = teams?.find(t => t.teamId === teamId);
    if (!existing) {
      return { status: "error", code: 404, message: "Team not found", data: null };
    }
    const updatedTeam: ITeamItem = {
      teamId,
      ...data,
      playerCount: Number(data.playerCount),
      players: existing.players,
    };
    persist(teams!.map(t => (t.teamId === teamId ? updatedTeam : t)));
    return { status: "success", code: 200, message: "Team updated", data: updatedTeam };
  };

  const deleteTeam = (teamId: string): ITeamRes => {
    const existing = teams?.find(t => t.teamId === teamId);
    if (!existing) {
      return { status: "error", code: 404, message: "Team not found", data: null };
    }
    persist(teams!.filter(t => t.teamId !== teamId));
    return { status: "success", code: 200, message: "Team deleted", data: existing };
  };

  return (
    <TeamContext.Provider value={{ teams, createTeam, getTeamDetail, updateTeam, deleteTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
