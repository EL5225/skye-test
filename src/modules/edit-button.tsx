import { InputField } from "@/components/custom/inputfield";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUsersData } from "@/config/context/hook";
import { db } from "@/config/firebase";
import { cn } from "@/lib/utils";
import { getUsersData } from "@/utils/helper";
import { TGenders, TUser } from "@/utils/types";
import { doc, updateDoc } from "firebase/firestore";
import { EditIcon } from "lucide-react";
import { ChangeEvent, FC, ReactElement, useState } from "react";
import { TEditButtonProps } from "./types";

export const EditButtonTable: FC<TEditButtonProps> = ({
  users,
}): ReactElement => {
  const { setUsers } = useUsersData();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<TUser>({
    fullname: users.fullname,
    birthdate: users.birthdate,
    birthplace: users.birthplace,
    gender: users.gender,
    phoneNumber: users.phoneNumber,
    studyClass: users.studyClass,
    NIP: users.NIP,
    hobby: users.hobby,
  });

  const editData = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      await updateDoc(doc(db, "students", users?.id as string), payload);

      setLoading(false);
      setShowModal(false);
      getUsersData().then((res) => setUsers(res as TUser[]));
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <button>
          <EditIcon className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[605px]">
        <DialogHeader>
          <DialogTitle>Edit Data Siswa</DialogTitle>
          <DialogDescription>
            Ubah data siswa, klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <form id="add-data" onSubmit={editData} className="grid gap-6 py-4">
          <InputField
            name="fullname"
            label="Nama Lengkap"
            onChange={(e) => handleChange(e)}
            required
            defaultValue={users.fullname}
          />
          <InputField
            name="birthdate"
            label="Tanggal Lahir"
            type="date"
            onChange={(e) => handleChange(e)}
            required
            defaultValue={users.birthdate}
          />
          <InputField
            name="birthplace"
            label="Tempat Lahir"
            onChange={(e) => handleChange(e)}
            required
            defaultValue={users.birthplace}
          />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Jenis Kelamin</Label>
            <RadioGroup
              onValueChange={(e) =>
                setPayload({ ...payload, gender: e as TGenders })
              }
              defaultValue={users.gender}
              required
              name="gender"
              className="w-full items-center gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Laki-laki" id="g1" />
                <Label htmlFor="g1">Laki-laki</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Perempuan" id="g2" />
                <Label htmlFor="g2">Perempuan</Label>
              </div>
            </RadioGroup>
          </div>

          <InputField
            name="phoneNumber"
            label="No Whatsaap"
            onChange={(e) => handleChange(e)}
            required
            defaultValue={users.phoneNumber}
          />
          <InputField
            name="NIP"
            label="NIP"
            onChange={(e) => handleChange(e)}
            required
            defaultValue={users.NIP}
          />
          <InputField
            name="studyClass"
            label="Kelas"
            onChange={(e) => handleChange(e)}
            required
            defaultValue={users.studyClass}
          />
          <InputField
            name="hobby"
            label="Hobi"
            onChange={(e) => handleChange(e)}
            required
            defaultValue={users.hobby}
          />
        </form>
        <DialogFooter>
          <Button
            form="add-data"
            type="submit"
            disabled={loading}
            className={cn({
              "disabled:cursor-wait bg-slate-300 animate-pulse hover:bg-slate-300":
                loading,
            })}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
