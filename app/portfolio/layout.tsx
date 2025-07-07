import { ReactNode } from 'react';

export default function PortfolioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
}