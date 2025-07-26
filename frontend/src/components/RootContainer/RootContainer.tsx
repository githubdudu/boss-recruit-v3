import { ReactNode } from 'react';

interface RootContainerProps {
  children: ReactNode;
}

/**
 * RootContainer is a layout component that provides a consistent structure
 * for the application. It sets the height to fill the screen and applies
 * a background color.
 *
 * It sets layout for two screen sizes: 48rem/768px and rest.
 *
 * It is used in Home and LogoLayout components.
 */
function RootContainer({ children }: RootContainerProps) {
  return (
    <div className="flex h-screen min-w-xs flex-col bg-gray-100 md:mx-auto md:max-w-3xl">
      {children}
    </div>
  );
}

export default RootContainer;
