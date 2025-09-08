
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
  const { setOpenMobile, isMobile } = useSidebar();
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-background/50 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className='hidden md:block'>
          <div className="flex items-center gap-2">
            <Logo className="size-6 shrink-0" />
            <span className="font-headline text-lg font-semibold">
              NoorAI
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <AboutButton />
      </div>
    </header>
  );
}


export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="size-8 shrink-0 text-sidebar-foreground" />
              <span className="font-headline text-xl font-semibold text-sidebar-foreground">
                NoorAI
              </span>
            </Link>
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
        <div className="hidden md:block">
           <SidebarTrigger className="absolute top-4 left-4 z-20"/>
        </div>
        <div className="md:hidden">
          <TopBar />
        </div>
        <div className='flex flex-col h-full'>
          <div className="hidden md:flex items-center justify-between p-2 pl-14 border-b">
              <div/>
             <AboutButton />
          </div>
          <div className='flex-grow'>
             {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
