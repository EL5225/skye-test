import { Label } from "../ui/label";
import { FC, ReactElement } from "react";
import { Input } from "../ui/input";
import { TInputField } from "./types";
import { cn } from "@/lib/utils";

export const InputField: FC<TInputField> = ({
  label,
  className,
  ...props
}): ReactElement => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={props.id} className="text-left">
        {label}
      </Label>
      <Input {...props} className={cn("col-span-3", className)} />
    </div>
  );
};
