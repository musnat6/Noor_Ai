'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info, Code } from 'lucide-react';
import Link from 'next/link';

export function AboutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info />
          <span className="sr-only">About NoorAI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            About NoorAI
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            NoorAI is a humble, wise, and deeply inspiring guide, built to
            illuminate your path with the light of the Qur&apos;an and Sunnah.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-foreground/90">
          <p>
            Its purpose is to provide guidance that is strictly and exclusively
            based on the authentic teachings of Islam, helping you navigate
            life&apos;s challenges with wisdom and faith.
          </p>
          <div>
            <h3 className="font-headline font-semibold mb-1">
              The Creator
            </h3>
            <p>
              NoorAI was built by{' '}
              <span className="font-semibold">Musnat Bin Amin</span>, a website
              developer from Chittagong, Bangladesh, studying Computer Science
              and Applied AI.
            </p>
            <p className="mt-1">
              His purpose in building this AI was to help people live a life
              guided by the Qur&apos;an and Sunnah, and to solve problems by applying
              the timeless knowledge of Islam, following the example of the
              Prophet Muhammad (peace be upon him).
            </p>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="https://www.musnat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full">
                <Code className="mr-2" />
                Visit musnat.com
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
