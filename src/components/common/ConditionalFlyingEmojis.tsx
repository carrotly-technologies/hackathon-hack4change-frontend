'use client';

import { usePathname } from 'next/navigation';
import FlyingEmojis from './FlyingEmojis';

export default function ConditionalFlyingEmojis() {
  const pathname = usePathname();
  
  // Don't show flying emojis on the thrash map page
  if (pathname === '/thrashmap') {
    return null;
  }
  
  return <FlyingEmojis />;
} 