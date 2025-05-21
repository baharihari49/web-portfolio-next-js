import type { ReactNode } from 'react';

interface BlogPostLayoutProps {
  children: ReactNode;
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return <main className="min-h-screen">{children}</main>;
}
