
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
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { AboutButton } from './about-button';
import { ThemeToggle } from './theme-toggle';

const menuItems = [
  { href: '/', label: "Qur'an Guidance", icon: BookOpen },
  { href: '/hadith', label: 'Hadith Insight', icon: Sparkles },
  { href: '/advice', label: 'Personalized Advice', icon: BrainCircuit },
  { href: '/history', label: 'Islamic History', icon: History },
];

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
        <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
          <ThemeToggle />
          <AboutButton />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
