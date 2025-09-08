
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  BrainCircuit,
  History,
  Sparkles,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { AboutButton } from './about-button';
import { Button } from './ui/button';

const menuItems = [
  { href: '/', label: "Qur'an Guidance", icon: BookOpen },
  { href: '/hadith', label: 'Hadith Insight', icon: Sparkles },
  { href: '/advice', label: 'Personalized Advice', icon: BrainCircuit },
  { href: '/history', label: 'Islamic History', icon: History },
];

function TopBar() {
  const { setOpenMobile } = useSidebar();
  return (
    <div className="flex items-center justify-between p-2 pl-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpenMobile(true)}
      >
        <Logo className="size-6" />
        <span className="sr-only">Open Menu</span>
      </Button>
      <div className="flex items-center gap-2">
        <AboutButton />
      </div>
    </div>
  );
}


export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-1">
            <Logo className="size-8 shrink-0 text-sidebar-foreground" />
            <span className="font-headline text-xl font-semibold text-sidebar-foreground">
              NoorAI
            </span>
            {/* This trigger is only for collapsing the sidebar */}
            <SidebarTrigger className="ml-auto text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  className="font-headline text-base"
                >
                  <Link href={item.href}>
                    <item.icon className="shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        {/* This trigger is for opening the sidebar when it's collapsed */}
        <div className="absolute top-2 left-2 z-20">
           <SidebarTrigger />
        </div>
        <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
          <AboutButton />
        </div>
        <div className="md:hidden">
          <TopBar />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
