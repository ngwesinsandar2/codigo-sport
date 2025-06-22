import { cn } from "@/lib/utils";

interface IPageTitleProps {
  pageTitle: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageTitle({
  pageTitle,
  children,
  className
}: IPageTitleProps) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <h1 className="text-xl md:text-3xl text-primary font-[700]">
        {pageTitle}
      </h1>
      {children}
    </div>
  );
}
