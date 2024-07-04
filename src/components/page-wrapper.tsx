import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-gray-50 flex-grow overflow-y-hidden max-h-screen">
      {children}
    </div>
  );
}
