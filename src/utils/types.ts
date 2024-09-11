export type TGenders = "Laki-laki" | "Perempuan";

export type TUser = {
  id?: string;
  fullname: string;
  birthdate: string;
  birthplace: string;
  gender: TGenders;
  phoneNumber: string;
  studyClass: string;
  NIP: string;
  hobby: string;
};
