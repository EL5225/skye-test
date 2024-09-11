import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TUser } from "@/utils/types";
import { FC, ReactElement, useEffect } from "react";
import { AddButtonTable } from "./add-button";
import { useUsersData } from "@/config/context/hook";
import { getUsersData } from "@/utils/helper";
import { EditButtonTable } from "./edit-button";
import { DeleteButton } from "./delete-button";

export const TableModule: FC = (): ReactElement => {
  const { users, setUsers } = useUsersData();

  useEffect(() => {
    getUsersData().then((res) => setUsers(res as TUser[]));
  }, [setUsers]);

  return (
    <section className="w-full flex flex-col gap-10">
      <AddButtonTable />

      <Table>
        <TableCaption>Data siswa sudah merupakan data terbaru.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>NIP</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Tempat Lahir</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>No Whatsaap</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Hobi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.NIP}</TableCell>
              <TableCell>{item.fullname}</TableCell>
              <TableCell>{item.birthdate}</TableCell>
              <TableCell>{item.birthplace}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.studyClass}</TableCell>
              <TableCell>{item.hobby}</TableCell>
              <TableCell className="space-x-2">
                <EditButtonTable users={item} />
                <DeleteButton id={item?.id as string} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
