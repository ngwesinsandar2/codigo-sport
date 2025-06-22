import { Skeleton } from '@/components/ui/skeleton';

export default function FormCheckboxLoading() {
  return (
    <div className="flex items-end gap-1">
      <Skeleton className="size-5 rounded-md" />
      <Skeleton className="h-5 w-[160px] rounded-md" />
    </div>
  );
}
