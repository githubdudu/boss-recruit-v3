import { NavBar } from 'antd-mobile';
import { Outlet } from 'react-router';
import Logo from 'components/Logo';
import RootContainer from 'components/RootContainer';

function LogoLayout() {
  const right = (
    <div>
      <span className="text-brand-primary">about</span>
    </div>
  );
  return (
    <RootContainer>
      <NavBar back={null} right={right}></NavBar>
      <Logo />
      <div className="flex h-full flex-col justify-end-safe">
        <Outlet />
      </div>
    </RootContainer>
  );
}

export default LogoLayout;
