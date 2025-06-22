import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import CustomTooltip from "../common/CustomTooltip";

interface IDeleteButtonProps extends Omit<ButtonProps, "className"> {
  btnClassName?: string;
}

export default function DeleteButton({
  btnClassName,
  ...props
}: IDeleteButtonProps) {
  return (
    <CustomTooltip tooltipContent="Delete">
      <Button
        className={cn(
          "border-2 bg-red-100 text-red-400 w-8 h-8",
          btnClassName
        )}
        size={"sm"}
        variant={"outline"}
        {...props}
      >
        <Trash />
      </Button>
    </CustomTooltip>
  );
}
