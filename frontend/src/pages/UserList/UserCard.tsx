import { Card } from 'antd-mobile';
import { type UserInfo } from 'reducer/userInfoSlice';

function UserCard({ user }: { user: UserInfo }) {
  console.log({ user });
  return (
    <Card>
      <div>UserCard: {user.userName}</div>
      <div>{user.avatar}</div>
      <div>{user.email}</div>
      <div>{user.education}</div>
      <div>{user.experience}</div>
      <div>{user.skills}</div>
      <div>{user.phone}</div>
    </Card>
  );
}

export default UserCard;
