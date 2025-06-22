import { Suspense } from "react";
import PageLoading from "./PageLoading";

export default function SuspenseLazy({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={<PageLoading />}
    >
      {children}
    </Suspense>
  );
}
