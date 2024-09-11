import { TUser } from "@/utils/types";
import { createContext } from "react";

type TContext = {
  users: TUser[];
  setUsers: React.Dispatch<React.SetStateAction<TUser[]>>;
};

export const UsersContext = createContext<TContext | null>(null);
