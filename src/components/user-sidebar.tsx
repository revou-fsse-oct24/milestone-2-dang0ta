"use client";

import {
    BadgeCheck,
    ChevronsUpDown,
    Loader2Icon,
    LogInIcon,
    LogOut,
    TriangleAlert,
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
import { startTransition, useActionState, useEffect } from "react";
import { getUser, logout } from "@/actions/auth";
import { Response } from "@/actions/api";
import { defaultUser, User } from "@/models/user";
import useCookie from 'react-use-cookie';
import Link from "next/link";

export function NavUser() {
    const [token] = useCookie('access_token', "");
    console.log({token})
    const { isMobile } = useSidebar();
    const [response, action, loading] = useActionState(getUser, { status: "success", data: defaultUser() } as Response<User | null>);
    console.log({response})

    useEffect(() => {
        startTransition(() => action(token));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    if (response.status == "error") {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <button className="text-muted-foreground cursor-default" disabled>
                            failed to load current user {response.error}
                        </button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (!response.data) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        variant="outline"
                    >
                            <Link href="/login"  className="flex flex-row items-center justify-between w-full">
                            Log in
                            <LogInIcon size={16} />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (loading) {
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
                                <AvatarImage src={response.data.avatar} alt={response.data.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{response.data.name}</span>
                                <span className="truncate text-xs">{response.data.email}</span>
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
                                    <AvatarImage src={response.data.avatar} alt={response.data.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{response.data.name}</span>
                                    <span className="truncate text-xs">{response.data.email}</span>
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
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}


function LogoutButton() {
    const [error, action, loading] = useActionState(logout, null);

    if (error) {
        <DropdownMenuItem disabled>
            <TriangleAlert />
            {error}
        </DropdownMenuItem>;
    }

    if (loading) {
        <DropdownMenuItem disabled>
            <LogOut />
            Logging out...
        </DropdownMenuItem>;
    }

    return (
        <DropdownMenuItem onClick={() => startTransition(action)}>
            <LogOut />
            Log out
        </DropdownMenuItem>
    );
}