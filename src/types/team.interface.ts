export interface ITeamItem {
  teamId: string;
  teamName: string;
  playerCount: number;
  region: string;
  country: string;
  players: string[] | null;
}