export type PlayerStats = {
  avgRate: number;
  sumGoals: number;
  currentChampionship: number;
  percentageStarter: number;
};

export type Player = {
  id: string;
  firstname: string;
  lastname: string;
  position: number;
  ultraPosition: number;
  teamId: number;
  quotation: number;
  club: string;
  stats: PlayerStats;
};
