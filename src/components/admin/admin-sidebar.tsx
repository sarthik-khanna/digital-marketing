"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardCheckIcon,
  ExternalLinkIcon,
  InboxIcon,
  LogOutIcon,
  NewspaperIcon,
  PhoneCallIcon,
  ReceiptIcon,
} from "lucide-react";
import { logout } from "@/app/admin/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { site } from "@/lib/site";

const nav = [
  { title: "Enquiries", href: "/admin", icon: InboxIcon },
  { title: "Call-back requests", href: "/admin/callbacks", icon: PhoneCallIcon },
  { title: "Audit requests", href: "/admin/audits", icon: ClipboardCheckIcon },
];

/** `account` is streamed in by the layout (it reads the session). */
export function AdminSidebar({ account }: { account: React.ReactNode }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/admin"
          onClick={close}
          aria-label={`${site.name} admin`}
          className="flex h-12 items-center px-2 group-data-[collapsible=icon]:px-0"
        >
          <Image
            src={site.logo.src}
            alt=""
            width={site.logo.width}
            height={site.logo.height}
            className="h-9 w-auto group-data-[collapsible=icon]:hidden"
          />
          <Image
            src="/brand/tdm-app-icon.png"
            alt=""
            width={32}
            height={32}
            className="hidden size-8 rounded-md group-data-[collapsible=icon]:block"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Leads</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} onClick={close} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Billing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/admin/invoices" onClick={close} />}
                  isActive={pathname.startsWith("/admin/invoices")}
                  tooltip="Invoices"
                >
                  <ReceiptIcon />
                  <span>Invoices</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/admin/blog" onClick={close} />}
                  isActive={pathname.startsWith("/admin/blog")}
                  tooltip="Blog posts"
                >
                  <NewspaperIcon />
                  <span>Blog posts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Site</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/" />} tooltip="View website">
                  <ExternalLinkIcon />
                  <span>View website</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="truncate px-2 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
              {account}
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form action={logout}>
              <SidebarMenuButton type="submit" tooltip="Sign out">
                <LogOutIcon />
                <span>Sign out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
