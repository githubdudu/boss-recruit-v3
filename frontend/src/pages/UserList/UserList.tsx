import { useCallback, useEffect, useState } from 'react';
import { Skeleton, Space } from 'antd-mobile';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/store';
import UserCard from './UserCard';
import axiosInstance from 'api/axiosInstance';
import { setUserList } from 'reducer/userListSlice';
import useTimeout from 'hooks/useTimeout';

function UserList() {
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const userList = useSelector((state: RootState) => state.userList);
  const targetUserType = useSelector(
    (state: RootState) => state.userInfo.targetUserType
  );
  const dispatch = useDispatch();

  const getUserList = useCallback(async () => {
    try {
      if (!targetUserType) {
        return;
      }
      const userList = await axiosInstance.get(
        `/api/v1/users?usertype=${targetUserType}`,
        {
          withCredentials: true
        }
      );
      dispatch(setUserList(userList.data));
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  }, [dispatch, targetUserType]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  useTimeout(() => {
    setIsAnimationDone(true);
  }, 500);

  return (
    <Space direction="vertical" block>
      {userList.length > 0 && isAnimationDone
        ? userList.map((user) => <UserCard key={user._id} user={user} />)
        : [0, 1, 2, 3, 4].map((index) => (
            <Skeleton
              key={index}
              animated
              className="w-full"
              style={{
                height: '10rem',
                width: '100%',
                borderRadius: '0.5rem'
              }}
            />
          ))}
    </Space>
  );
}

export default UserList;
