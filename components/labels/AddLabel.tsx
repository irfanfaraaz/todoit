'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { createLabel } from '@/lib/actions/label.actions';

export default function AddLabelDialog({ userId }: { userId: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm();

  const onSubmit = async ({ name }: any) => {
    if (name) {
      setIsLoading(true);
      const label = await createLabel({ name, userId });

      if (label != undefined) {
        router.push(`/dashboard/filter-labels/${label._id}`);
        // document.getElementById("closeDialog")?.click();

        toast({
          title: '😎 Successfully created a Label!',
          duration: 5000,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <DialogContent className="flex max-w-xl flex-col text-right md:flex-row lg:h-56 lg:justify-between">
      <DialogHeader className="w-full">
        <DialogTitle>Add a Label</DialogTitle>
        <DialogDescription className="capitalize">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-2 space-y-4 rounded-sm  border-2 border-foreground/20 p-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Label name"
                        required
                        className="border-0 text-lg font-semibold"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}></FormField>
              <Button disabled={isLoading} className="">
                {isLoading ? (
                  <div className="flex gap-2">
                    <Loader className="h-5 w-5 text-primary" />
                  </div>
                ) : (
                  'Add'
                )}
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
