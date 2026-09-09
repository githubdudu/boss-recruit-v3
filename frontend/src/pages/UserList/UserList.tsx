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
  const [isScrolled, setIsScrolled] = useState(false);
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
        // relative z-10: .adm-nav-bar has no stacking context of its own, so the
        // shadow would be painted over by the scroll container below it.
        // rounded-b-lg: 8px. Align with Card
        className={`font-semibold relative z-10 transition-shadow rounded-b-lg duration-200 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        {/* Either Recruiter List or Applicant List */}
        <h1>{capitalizeFirstLetter(targetUserType)} List</h1>
      </NavBar>
      <div
        className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300"
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
      >
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
