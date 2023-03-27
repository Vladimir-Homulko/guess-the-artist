export type TUser = {
  id: string;
  username: string;
  points?: number;
};

export type TGameRound = {
  username: string;
  points: number;
  albumName: string;
  attempts: number;
  isWinner: boolean;
  isGameOver: boolean;
};

export type TGameData = {
  albumName: string;
  attempts: number;
  isWinner: boolean;
  isGameOver: boolean;
};

export type ContextType = {
  updateUser: (user: TUser | null) => void;
  isGameOver: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
};
