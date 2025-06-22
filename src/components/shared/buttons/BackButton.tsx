import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface IBackButtonProps extends Omit<ButtonProps, "className"> {
  btnClassName?: string;
}

export default function BackButton({
  btnClassName,
  ...props
}: IBackButtonProps) {
  return (
    <Button
      className={cn(btnClassName)}
      size={"sm"}
      {...props}
    >
      <ArrowLeft />
    </Button>
  );
}
