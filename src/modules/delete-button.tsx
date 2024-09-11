import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUsersData } from "@/config/context/hook";
import { db } from "@/config/firebase";
import { getUsersData } from "@/utils/helper";
import { TUser } from "@/utils/types";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash2Icon } from "lucide-react";
import { FC, ReactElement, useState } from "react";

export const DeleteButton: FC<{ id: string }> = ({ id }): ReactElement => {
  const { setUsers } = useUsersData();
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "students", id));
      getUsersData().then((res) => setUsers(res as TUser[]));
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <button>
          <Trash2Icon className="size-5 stroke-red-600 fill-red-100" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Apakah Anda yakin untuk menghapus data ini?</DialogTitle>
          <DialogDescription>
            Data yang di hapus tidak dapat dikembalikan
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={() => handleDelete(id)}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700">
          Hapus Data
        </Button>
      </DialogContent>
    </Dialog>
  );
};
