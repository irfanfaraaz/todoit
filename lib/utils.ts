import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Calendar, CalendarDays, Grid2X2, Inbox } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return '';

  const nameParts = name.split(' ');
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  const secondInitial =
    nameParts.length > 1 ? nameParts[1]?.charAt(0).toUpperCase() : '';

  return `${firstInitial}${secondInitial || firstInitial}`;
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
