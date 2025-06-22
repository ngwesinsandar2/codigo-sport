import CustomTooltip from "@/components/shared/common/CustomTooltip";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserCog } from "lucide-react";

interface IManagePlayerButtonProps extends Omit<ButtonProps, "className"> {
  btnClassName?: string;
}

export default function ManagePlayerButton({
  btnClassName,
  ...props
}: IManagePlayerButtonProps) {
  return (
    <CustomTooltip tooltipContent="Manage Players">
      <Button
        className={cn(
          "border-2 w-8 h-8",
          btnClassName
        )}
        size={"sm"}
        {...props}
      >
        <UserCog />
      </Button>
    </CustomTooltip>
  );
}
