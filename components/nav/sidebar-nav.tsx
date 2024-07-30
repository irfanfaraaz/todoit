'use client';
import { PlusIcon } from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Dialog, DialogTrigger } from '../ui/dialog';

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {siteConfig.primaryNavItems.map((item, idx) => (
              <div key={idx}>
                {item.id && (
                  <div
                    className={cn(
                      'mb-2 mt-6 flex items-center',
                      item.id === 'filters' && 'my-0',
                    )}>
                    {/* <p className="flex flex-1 text-base">
                      {LIST_OF_TITLE_IDS[id]}
                    </p>
                    {LIST_OF_TITLE_IDS[id] === 'My Projects' && (
                      <AddProjectDialog />
                    )} */}
                  </div>
                )}
                <div className={cn('flex items-center lg:w-full')}>
                  <div
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg p-2 text-left transition-all hover:text-primary lg:gap-3',
                      pathname === item.link
                        ? 'active rounded-lg bg-primary/10 text-primary transition-all hover:text-primary'
                        : 'text-foreground ',
                    )}>
                    <Link
                      key={idx}
                      href={item.link}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg text-left transition-all hover:text-primary',
                      )}>
                      <div className="flex w-full items-center gap-4">
                        <div className="flex items-center gap-2">
                          <p className="flex text-left text-base">
                            <item.icon className="h-4 w-4" />
                          </p>
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </Link>
                    {item.id === 'filters' && (
                      <Dialog>
                        <DialogTrigger id="closeDialog">
                          <PlusIcon
                            className="h-5 w-5"
                            aria-label="Add a Label"
                          />
                        </DialogTrigger>
                        {/* <AddLabelDialog /> */}
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
