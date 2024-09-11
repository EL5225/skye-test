import { useContext } from "react";
import { UsersContext } from "./context";

export const useUsersData = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }

  return context;
};
