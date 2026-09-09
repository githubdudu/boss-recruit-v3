import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NavBar, SpinLoading } from 'antd-mobile';
import {
  UserContactOutline,
  MessageOutline,
  UserOutline
} from 'antd-mobile-icons';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from 'reducer/userInfoSlice';

import axiosInstance from 'api/axiosInstance';
import BottomTabBar, { type TabIcon } from 'components/BottomTabBar';
import RootContainer from 'components/RootContainer';
import { RootState } from 'app/store';
import { capitalizeFirstLetter } from 'utils';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const targetUserType = useSelector(
    (state: RootState) => state.userInfo.targetUserType
  );

  const getUserInfo = useCallback(async () => {
    try {
      const userInfo = await axiosInstance.get('/api/v1/users/me', {
        withCredentials: true
      });
      dispatch(setUserInfo(userInfo.data));
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/home') {
      navigate('/home/list', { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const tabs: TabIcon[] = [
    {
      key: '/home/list',
      title: `${capitalizeFirstLetter(targetUserType)} List`,
      icon: <UserContactOutline />
    },
    {
      key: '/home/messages',
      title: 'Messages',
      icon: <MessageOutline />
    },
    {
      key: '/home/me',
      title: 'Me',
      icon: <UserOutline />
    }
  ];

  // The NavBar title and the tab label are the same string by construction.
  const activeTab = tabs.find((tab) => tab.key === location.pathname);

  if (!targetUserType) {
    return (
      <div
        className="flex flex-1 items-center justify-center"
        data-testid="spin-loading"
      >
        <SpinLoading style={{ '--size': '4rem' }} color="primary" />
      </div>
    );
  }

  return (
    // This layout is a mimic of mobile app: fixed header, scrollable content,
    // fixed footer. Only the middle section scrolls.
    <RootContainer>
      <NavBar
        backIcon={false}
        // relative z-10: .adm-nav-bar has no stacking context of its own, so the
        // shadow would be painted over by the scroll container below it.
        // rounded-b-lg: 8px. Align with Card
        className={`font-semibold relative z-10 transition-shadow rounded-b-lg duration-200 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <h1>{activeTab?.title}</h1>
      </NavBar>
      <div
        className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300"
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
      >
        <Outlet />
      </div>
      <div className="border-t-2 border-brand-primary">
        <BottomTabBar tabs={tabs} />
      </div>
    </RootContainer>
  );
}

export default Home;
