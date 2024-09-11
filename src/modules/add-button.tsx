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
import { addDoc, collection } from "firebase/firestore";
import { ChangeEvent, FC, ReactElement, useState } from "react";

export const AddButtonTable: FC = (): ReactElement => {
  const { setUsers } = useUsersData();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<TUser>({
    fullname: "",
    birthdate: "",
    birthplace: "",
    gender: "Laki-laki",
    phoneNumber: "",
    studyClass: "",
    NIP: "",
    hobby: "",
  });

  const addData = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      await addDoc(collection(db, "students"), payload);

      setLoading(false);
      setShowModal(false);
      const users = await getUsersData();
      setUsers(users as TUser[]);
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
        <Button variant="default" className="w-[10rem]">
          Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[605px]">
        <DialogHeader>
          <DialogTitle>Tambah Data Siswa</DialogTitle>
          <DialogDescription>
            Masukan data siswa, klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <form id="add-data" onSubmit={addData} className="grid gap-6 py-4">
          <InputField
            name="fullname"
            label="Nama Lengkap"
            onChange={(e) => handleChange(e)}
            required
          />
          <InputField
            name="birthdate"
            label="Tanggal Lahir"
            type="date"
            onChange={(e) => handleChange(e)}
            required
          />
          <InputField
            name="birthplace"
            label="Tempat Lahir"
            onChange={(e) => handleChange(e)}
            required
          />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Jenis Kelamin</Label>
            <RadioGroup
              onValueChange={(e) =>
                setPayload({ ...payload, gender: e as TGenders })
              }
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
          />
          <InputField
            name="NIP"
            label="NIP"
            onChange={(e) => handleChange(e)}
            required
          />
          <InputField
            name="studyClass"
            label="Kelas"
            onChange={(e) => handleChange(e)}
            required
          />
          <InputField
            name="hobby"
            label="Hobi"
            onChange={(e) => handleChange(e)}
            required
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
