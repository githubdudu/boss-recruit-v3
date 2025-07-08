import { NavBar } from 'antd-mobile';
import { Outlet } from 'react-router';
import Logo from 'components/Logo';

function LogoLayout() {
  const right = (
    <div>
      <span className="text-brand-primary">about</span>
    </div>
  );
  return (
    <div className="flex h-screen flex-col bg-gray-100 md:mx-auto md:max-w-3xl">
      <NavBar back={null} right={right}></NavBar>
      <Logo />
      <div className="flex h-full flex-col justify-end-safe">
        <Outlet />
      </div>
    </div>
  );
}

export default LogoLayout;
