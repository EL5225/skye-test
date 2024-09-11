import { FC, PropsWithChildren, useState } from "react";
import { UsersContext } from "./context";
import { TUser } from "@/utils/types";

export const UsersContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<TUser[]>([]);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
      }}>
      {children}
    </UsersContext.Provider>
  );
};
