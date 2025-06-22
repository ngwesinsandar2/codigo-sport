import Header from "@/components/shared/common/Header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4 sm:px-16 lg:px-64 py-[calc(var(--spacing)*19)]">
        {children}
      </main>
    </>
  );
}
