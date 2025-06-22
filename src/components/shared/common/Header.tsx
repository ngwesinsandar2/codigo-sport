import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import { ChevronsUpDown, LogOut } from "lucide-react";

export default function Header() {
  const { getProfile, onLogout } = useAuthContext();

  const userData = getProfile();

  return (
    <header className="fixed top-0 bg-white border-b-2 p-4 sm:px-16 lg:px-64 py-0.5 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="float-end"
        >
          <Button
            variant={"ghost"}
            className={`p-0`}
          >
            <div className="flex items-center gap-2">
              <div>
                <p className="text-left">{userData?.userName}</p>
              </div>
              <ChevronsUpDown />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full border-2">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={onLogout}
          >
            <LogOut />
            <p>Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
