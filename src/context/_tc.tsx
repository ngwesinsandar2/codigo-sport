// import { EStorageKeys } from "@/constants/storage-keys";
// import { ITeamForm } from "@/pages/teams/components/TeamForm";
// import { IContextRes } from "@/types/context-res.interface";
// import { ITeamItem } from "@/types/team.interface";
// import { decrypt, encrypt } from "@/utils/encrypt-decrypt";
// import { createContext, useContext } from "react";

// export type ITeamRes = IContextRes<ITeamItem | string>;

// interface ITeamContext {
//   createTeam: (data: ITeamForm) => ITeamRes;
//   getTeams: () => ITeamItem[] | null;
//   getTeamDetail: (teamName: string) => ITeamRes;
//   updateTeam: (data: ITeamForm) => ITeamRes;
//   deleteTeam: (teamName: string) => ITeamRes;
// }

// const TeamContext = createContext<ITeamContext | undefined>(undefined);

// export const useTeamContext = (): ITeamContext => {
//   const context = useContext(TeamContext);
//   if (context === undefined) {
//     throw new Error("useTeamContext must be used within an TeamProvider");
//   }
//   return context;
// };

// export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
//   const setEncryptItems = (data: ITeamItem[]) => {
//     const encryptData = encrypt<ITeamItem[]>(data);
//     localStorage.setItem(EStorageKeys.TeamKey, encryptData);
//   };

//   const getTeams = () => {
//     const encryptData = localStorage.getItem(EStorageKeys.TeamKey);
//     if (encryptData) {
//       return decrypt<ITeamItem[]>(encryptData);
//     }

//     return null;
//   };

//   const getTeamDetail = (teamName: string) => {
//     const teams = getTeams();

//     const item = (teams as ITeamItem[]).find(
//       (team) => team.teamName === teamName
//     );

//     if (item) {
//       return {
//         status: "success",
//         code: 200,
//         message: "",
//         data: item
//       };
//     }

//     return {
//       status: "error",
//       code: 400,
//       message: "Not found!",
//       data: null
//     };
//   };

//   const createTeam = (data: ITeamForm) => {
//     const newItem = {
//       ...data,
//       players: null
//     };
//     const successRes = {
//       status: "success",
//       code: 200,
//       message: "Team created successfully!",
//       data: newItem.teamName
//     };
//     const teams = getTeams();

//     if (teams) {
//       const item = getTeamDetail(newItem.teamName);
//       if (item.data) {
//         return {
//           status: "error",
//           code: 400,
//           message: "Duplicate team name",
//           data: null
//         };
//       } else {
//         const newTeams = [...teams, newItem];
//         setEncryptItems(newTeams);
//         return successRes;
//       }
//     } else {
//       const newTeams = [newItem];
//       setEncryptItems(newTeams);
//       return successRes;
//     }
//   };

//   const updateTeam = (data: ITeamForm) => {
//     const newItem = {
//       ...data,
//       players: null
//     };
//     const successRes = {
//       status: "success",
//       code: 200,
//       message: "Team updated successfully!",
//       data: newItem.teamName
//     };
//     const teams = getTeams();

//     if (teams) {
//       const item = getTeamDetail(newItem.teamName);
//       if (item.data) {
//         const newTeams = teams.map((team) =>
//           team.teamName === item.data.teamName ? newItem : item.data
//         );
//         setEncryptItems(newTeams);
//         return successRes;
//       } else {
//         return {
//           status: "error",
//           code: 400,
//           message: "Not found!",
//           data: null
//         };
//       }
//     } else {
//       return {
//         status: "error",
//         code: 400,
//         message: "Not found!",
//         data: null
//       };
//     }
//   };

//   const deleteTeam = (teamName: string) => {
//     const item = getTeamDetail(teamName);
//     const teams = getTeams();
//     const successRes = {
//       status: "success",
//       code: 200,
//       message: "Team deleted successfully!",
//       data: null
//     };

//     if (item.data) {
//       const newItems = teams?.filter(
//         (team) => team.teamName !== item.data.teamName
//       );
//       setEncryptItems(newItems as ITeamItem[]);
//       return successRes;
//     } else {
//       return {
//         status: "error",
//         code: 400,
//         message: "Not found!",
//         data: null
//       };
//     }
//   };

//   const value = {
//     getTeamDetail,
//     getTeams,
//     createTeam,
//     updateTeam,
//     deleteTeam
//   };

//   return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
// };
