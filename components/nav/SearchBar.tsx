'use client';
import { Search, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';

export default function SearchForm() {
  const form = useForm();
  const router = useRouter();

  const onSubmit = async ({ searchText }: any) => {
    console.log('submitted', { searchText });
    router.push(`/dashbard/search/${searchText}`);
  };

  return (
    <Form {...form}>
      <form
        className="w-full justify-end lg:flex lg:items-center"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative flex w-full items-center gap-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <FormField
            control={form.control}
            name="searchText"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    id="searchText"
                    type="search"
                    required
                    placeholder="Search tasks..."
                    className="h-10 w-full appearance-none bg-background pl-8 shadow-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}></FormField>
          <Button className="px-4 hover:bg-cyan-400">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
