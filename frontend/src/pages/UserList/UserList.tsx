import { useCallback, useEffect, useState } from 'react';
import { NavBar, Skeleton, Space } from 'antd-mobile';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/store';
import { capitalizeFirstLetter } from 'utils';
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
    // This layout is a mimic of mobile app
    // the container of these components enabled flex column layout
    // There is fixed height for footer, and fixed height for header
    // The height of the content area is calculated.
    // The content area is scrollable.
    <>
      <NavBar
        backIcon={false}
        className="bg-brand-secondary text-white"
        style={{ borderBottom: '1px solid var(--color-gray-100)' }}
      >
        {/* Either Recruiter List or Applicant List */}
        <h1>{capitalizeFirstLetter(targetUserType)} List</h1>
      </NavBar>
      <div className="flex-1 overflow-y-auto p-2">
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
      </div>
    </>
  );
}

export default UserList;
