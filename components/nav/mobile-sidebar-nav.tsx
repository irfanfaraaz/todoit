'use client';
import { Menu, PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Dialog, DialogTrigger } from '../ui/dialog';
// import SearchForm from './SearchBar';

const MobileNav = () => {
  const pathname = usePathname();
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
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-1 py-2 md:justify-between md:gap-2">
          {/* <div className="lg:flex-1">
            <Link href={navLink}>
              <p className="text-sm font-semibold text-foreground/70 w-24">
                {navTitle}
              </p>
            </Link>
          </div> */}
          <div className="w-full flex-1 place-content-center">
            {/* <SearchForm /> */}
          </div>
          <div className="h-12 w-12 place-content-center lg:h-20 lg:w-16">
            {/* <Image alt="logo" src={todovexLogo} /> */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default MobileNav;
