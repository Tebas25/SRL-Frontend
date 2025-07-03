import type { ReactNode } from 'react';
import Sidebar from './sidebar.component';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
