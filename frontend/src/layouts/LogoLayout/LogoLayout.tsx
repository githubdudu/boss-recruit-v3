import { NavBar } from 'antd-mobile';
import { Outlet } from 'react-router';
import Logo from 'components/Logo';
import RootContainer from 'components/RootContainer';

/**
 * LogoLayout is a layout component that provides a consistent structure
 * for the application with a logo and a navigation bar.
 *
 * It is used for routes: /login, /register, and /about.
 */
function LogoLayout() {
  const right = (
    <div>
      <span className="text-base text-brand-primary">about</span>
    </div>
  );
  return (
    <RootContainer>
      <NavBar
        back={null}
        right={right}
        className="shrink-0"
        style={{
          '--height': '3rem',
          '--border-bottom': '1px solid var(--color-gray-300)'
        }}
      ></NavBar>
      <div className="flex flex-1 scrollbar-thin scrollbar-thumb-gray-300 flex-col overflow-y-auto">
        <Logo />
        <div className="flex flex-1 flex-col justify-end-safe">
          <Outlet />
        </div>
      </div>
    </RootContainer>
  );
}

export default LogoLayout;
