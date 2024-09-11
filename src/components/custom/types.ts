import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type TInputField = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};
