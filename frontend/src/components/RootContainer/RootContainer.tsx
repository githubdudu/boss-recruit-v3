import { ReactNode } from 'react';

interface RootContainerProps {
  children: ReactNode;
}

/**
 * RootContainer is a layout component that provides a consistent structure
 * for the application. It sets the height to fill the screen and applies
 * a background color.
 *
 * It sets layout for screen sizes: 20rem/320px and iphone 14/15 similar 390×844
 *
 * It is used in Home and LogoLayout components.
 */
function RootContainer({ children }: RootContainerProps) {
  return (
    <div className="mx-auto flex h-screen max-h-211 min-w-xs flex-col overflow-clip bg-gray-100 md:my-auto md:max-w-97.5 md:rounded-2xl md:shadow-xl">
      {children}
    </div>
  );
}

export default RootContainer;
