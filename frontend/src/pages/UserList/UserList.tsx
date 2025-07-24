import { NavBar, Space } from 'antd-mobile';
import { useSelector } from 'react-redux';

import { RootState } from 'app/store';
import { capitalizeFirstLetter } from 'utils';
import UserCard from './UserCard';

function UserList() {
  const userList = useSelector((state: RootState) => state.userList);
  const targetUserType = useSelector(
    (state: RootState) => state.userInfo.targetUserType
  );
  return (
    <>
      <NavBar
        backIcon={false}
        className="bg-brand-secondary text-white"
        style={{ borderBottom: '1px solid var(--color-gray-100)' }}
      >
        <h1>{capitalizeFirstLetter(targetUserType)} List</h1>
      </NavBar>
      <div className="h-[calc(100vh-96px)] overflow-y-auto p-2">
        <Space direction="vertical" block>
          {userList.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </Space>
      </div>
    </>
  );
}

export default UserList;
