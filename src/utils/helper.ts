import { collection, getDocs } from "firebase/firestore";
import { TUser } from "./types";
import { db } from "@/config/firebase";

export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getUsersData = async () => {
  try {
    const query = await getDocs(collection(db, "students"));

    const users = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TUser[];

    return users;
  } catch (error) {
    console.error(error);
  }
};
