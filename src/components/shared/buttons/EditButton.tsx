import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomTooltip from "../common/CustomTooltip";
import { Edit } from "lucide-react";

interface IEditButtonProps extends Omit<ButtonProps, "className"> {
  btnClassName?: string;
}

export default function EditButton({
  btnClassName,
  ...props
}: IEditButtonProps) {
  return (
    <CustomTooltip tooltipContent="Edit">
      <Button
        className={cn(
          "border-2 bg-gray-200 text-gray-900 w-8 h-8",
          btnClassName
        )}
        size={"sm"}
        variant={"outline"}
        {...props}
      >
        <Edit />
      </Button>
    </CustomTooltip>
  );
}
