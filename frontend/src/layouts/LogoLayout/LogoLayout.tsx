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
    <div className="h-screen flex flex-col bg-gray-100">
      <NavBar back={null} right={right}></NavBar>
      <Logo />
      <div className="flex flex-col h-full justify-end-safe">
        <Outlet />
      </div>
    </div>
  );
}

export default LogoLayout;
