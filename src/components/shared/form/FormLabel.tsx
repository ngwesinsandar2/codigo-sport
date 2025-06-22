import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { memo } from "react";

interface IFormLabelProps {
  label: string;
  showAsterisk?: boolean;
  id: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default memo(function FormLabel({
  label,
  showAsterisk,
  id,
  labelClassName,
  containerClassName
}: IFormLabelProps) {
  return (
    <div className={cn("flex items-center", containerClassName)}>
      <Label
        htmlFor={id}
        className={cn("", labelClassName)}
      >
        {label}
      </Label>
      {showAsterisk ? <p className="text-red-500">*</p> : <></>}
    </div>
  );
});
