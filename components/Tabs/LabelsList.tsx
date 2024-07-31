import { Tag } from 'lucide-react';
import Link from 'next/link';
import { Label } from '../ui/label';
import { getCurrentUser } from '@/lib/session';
import { getUserLabels } from '@/lib/actions/label.actions';
import AddLabelDialog from '../labels/AddLabel';

export default async function LabelsList() {
  const user = await getCurrentUser();
  const labels = await getUserLabels({ userId: user.id });
  return (
    <div className="px-10 md:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Labels</h1>
        {/* <AddLabelDialog userId={user.id} /> */}
      </div>
      <div className="flex flex-col gap-1 py-4">
        {labels?.map((label: any) => {
          return (
            <Link key={label._id} href={`/dashboard/labels/${label._id}`}>
              <div className="flex items-center space-x-2 border-b-2 border-gray-100 p-2">
                <Tag className="w-5 text-primary" />
                <Label
                  htmlFor="labels"
                  className="text-base font-normal hover:cursor-pointer">
                  {label.name}
                </Label>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
