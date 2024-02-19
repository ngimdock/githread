import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthRequiredSession } from "@/lib/auth";
import { User2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DropdownMenuItemLogout } from "./dropdown-menu-item-logout";

export const UserProfile = async () => {
  const { user } = await getAuthRequiredSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          {user.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            {" "}
            <User2 className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
