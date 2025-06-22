import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ICreateButtonProps extends Omit<ButtonProps, "className"> {
  btnClassName?: string;
  children: React.ReactNode;
}

export default function CreateButton({
  btnClassName,
  children,
  ...props
}: ICreateButtonProps) {
  return (
    <Button
      className={cn("border-2", btnClassName)}
      size={"sm"}
      {...props}
    >
      <Plus />
      {children}
    </Button>
  );
}
