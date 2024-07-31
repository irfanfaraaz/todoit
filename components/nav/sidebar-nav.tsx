'use client';
import { Hash, PlusIcon } from 'lucide-react';

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
import { useEffect, useState } from 'react';
import AddProjectDialog from '../projects/AddProject';
import AddLabelDialog from '../labels/AddLabel';

export function SidebarNav({
  projectList,
  userId,
}: {
  projectList: any[];
  userId: any;
}) {
  const primaryNavItems = siteConfig.primaryNavItems;
  const pathname = usePathname();
  const LIST_OF_TITLE_IDS: any = {
    primary: '',
    projects: 'My Projects',
  };

  const [navItems, setNavItems] = useState([...primaryNavItems]);

  const renderItems = (projectList: any) => {
    return projectList.map(
      ({ _id, name }: { _id: any; name: any }, idx: any) => {
        return {
          ...(idx === 0 && { id: 'projects' }),
          name,
          link: `/dashboard/projects/${_id.toString()}`,
          icon: Hash, // Change here: use the component directly
        };
      },
    );
  };
  useEffect(() => {
    const projectItems = renderItems(projectList);
    const items = [...primaryNavItems, ...projectItems];
    setNavItems(items);
  }, [primaryNavItems, projectList]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item, idx) => (
              <div key={idx}>
                {item.id && (
                  <div
                    className={cn(
                      'mb-2 mt-6 flex items-center p-2',
                      item.id === 'filters' && 'my-0',
                    )}>
                    <p className="flex flex-1 text-base">
                      {LIST_OF_TITLE_IDS[item.id]}
                    </p>
                    {LIST_OF_TITLE_IDS[item.id] === 'My Projects' && (
                      <AddProjectDialog userId={userId} />
                    )}
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
                            <item.icon className="h-4 w-4" />{' '}
                            {/* Change here: render the component */}
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
                        <AddLabelDialog userId={userId} />
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Ensure "My Projects" section is always visible */}
            {projectList.length === 0 && (
              <div className="mb-2 mt-6 flex items-center p-2">
                <p className="flex flex-1 text-base">My Projects</p>
                <AddProjectDialog userId={userId} />
              </div>
            )}
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
