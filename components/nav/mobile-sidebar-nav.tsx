'use client';
import { Hash, Menu, PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Dialog, DialogTrigger } from '../ui/dialog';
import AddLabelDialog from '../labels/AddLabel';
import { useEffect, useState } from 'react';
import AddProjectDialog from '../projects/AddProject';
// import SearchForm from './SearchBar';

const MobileNav = ({
  projectList,
  userId,
}: {
  projectList: any[];
  userId: any;
}) => {
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
    if (projectList) {
      const projectItems = renderItems(projectList);
      const items = [...primaryNavItems, ...projectItems];
      setNavItems(items);
    }
  }, [primaryNavItems, projectList]);
  return (
    <div className="flex flex-col">
      <header className="flex items-center gap-4 border-b bg-muted/40 px-4 max-md:h-14  lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
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
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

export default MobileNav;
