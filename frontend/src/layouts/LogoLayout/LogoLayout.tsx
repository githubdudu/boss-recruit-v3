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
    <div>
      <NavBar back={null} right={right}></NavBar>
      <Logo />
      <Outlet />
    </div>
  );
}

export default LogoLayout;
