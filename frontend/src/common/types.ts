export type TUser = {
  id: string;
  username: string;
  points?: number
}

export type Artist = {
  id: string;
  name: string;
  albums: Array<string>;
}

export type ContextType = {
  updateUser: (user: TUser | null) => void
}
