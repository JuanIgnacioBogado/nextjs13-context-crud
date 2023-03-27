'use client';
import dynamic from 'next/dynamic';

export const Toaster = dynamic(async () => (await import('react-hot-toast')).Toaster, {
  ssr: false
});
