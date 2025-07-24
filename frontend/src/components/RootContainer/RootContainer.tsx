import { ReactNode } from 'react';

interface RootContainerProps {
  children: ReactNode;
}

function RootContainer({ children }: RootContainerProps) {
  return (
    <div className="flex h-screen min-w-xs flex-col bg-gray-100 md:mx-auto md:max-w-3xl">
      {children}
    </div>
  );
}

export default RootContainer;
