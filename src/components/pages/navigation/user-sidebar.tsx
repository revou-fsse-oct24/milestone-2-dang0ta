import {
    BadgeCheck,
    ChevronsUpDown,
    Loader2Icon,
    LogInIcon,
    LogOut,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useSWR from "swr";
import { User } from "@/models/user";
import { handleResError } from "@/actions/error";
import { parseError } from "@/actions/exceptions";
import { useRouter } from "next/router";

export function UserSidebar() {
    const router = useRouter();
    const { isMobile } = useSidebar();
    const { data: user, isLoading, error } = useSWR<User | null>('/api/user', async (): Promise<User | null> => {
          const res = await fetch('/api/user');
          if (res.status == 401) {
                return null;
          }
          await handleResError(res);
          const user =  (await res.json()) as User;
          return user;
    });

    const logout =async () => {
        try {
            const res = await fetch('/api/logout');
            if (!res.ok) {
                const message = await res.text();
                console.warn(res.statusText, message);
            }

             if (res.redirected) {
                router.replace(res.url);
             } else {
                router.reload();
             }
        } catch(e) {
            const parsedErr = parseError(e);
            console.warn(parsedErr.message);
        }
    }

    if (error) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <button className="text-muted-foreground cursor-default" disabled>
                            failed to load current user {error.message}
                        </button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (!user) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        variant="outline"
                    >
                        <Link href="/login" className="flex flex-row items-center justify-between w-full">
                            Log in
                            <LogInIcon size={16} />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (isLoading) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        disabled
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Loader2Icon className="w-8 h-8 animate-spin" />
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Loading user information</span>
                            <span className="truncate text-xs">hang on a sec...</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <LogoutButton onLogout={() => logout()} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}


function LogoutButton({ onLogout }: { readonly onLogout: () => void; }) {
    return (
        <DropdownMenuItem onClick={onLogout}>
            <LogOut />
            Log out
        </DropdownMenuItem>
    );
}