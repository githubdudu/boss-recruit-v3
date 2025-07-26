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
        <h1>{capitalizeFirstLetter(targetUserType)} List</h1>
      </NavBar>
      <div className="flex-1 overflow-y-auto p-2">
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
