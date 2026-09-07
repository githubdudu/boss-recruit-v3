import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { SpinLoading } from 'antd-mobile';
import {
  UserContactOutline,
  MessageOutline,
  UserOutline
} from 'antd-mobile-icons';
import { useEffect, useCallback } from 'react';
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
  return (
    <RootContainer>
      {targetUserType ? (
        <>
          <Outlet />
          <div className="border-t-2 border-brand-primary">
            <BottomTabBar tabs={tabs} />
          </div>
        </>
      ) : (
        <div
          className="flex flex-1 items-center justify-center"
          data-testid="spin-loading"
        >
          <SpinLoading style={{ '--size': '4rem' }} color="primary" />
        </div>
      )}
    </RootContainer>
  );
}

export default Home;
