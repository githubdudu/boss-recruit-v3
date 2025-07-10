import type { FC } from 'react';
import { TabBar } from 'antd-mobile';
import { useLocation, useNavigate } from 'react-router-dom';

export interface TabIcon {
  key: string;
  title: string;
  icon: React.ReactNode;
}

const BottomTabBar: FC<{ tabs: TabIcon[] }> = ({ tabs }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(`${value}`);
  };

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default BottomTabBar;
