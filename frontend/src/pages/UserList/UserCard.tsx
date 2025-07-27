import { Card } from 'antd-mobile';
import { type UserInfo } from 'reducer/userInfoSlice';

function UserCard({ user }: { user: UserInfo }) {
  return (
    <Card className="p-4">
      <div className="flex flex-col items-start gap-4 xs:flex-row">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <Avatar avatar={user.avatar} userName={user.userName} />
        </div>

        {/* Content Section */}
        <div className="min-w-0 flex-1">
          {/* Name */}
          <div className="mb-2">
            <h3 className="truncate text-lg font-semibold text-gray-900">
              {user.userName}
            </h3>
          </div>

          {/* Company, Position and Salary */}
          <div className="space-y-1">
            {user.company && (
              <div className="flex flex-col items-start gap-2 xs:flex-row">
                <span className="text-sm text-gray-600">Company:</span>
                <span className="text-sm font-medium">{user.company}</span>
              </div>
            )}
            {user.jobPosition && (
              <div className="flex flex-col items-start gap-2 xs:flex-row">
                <span className="text-sm text-gray-600">Position:</span>
                <span className="text-sm font-medium">{user.jobPosition}</span>
              </div>
            )}
            {user.salary && (
              <div className="flex flex-col items-start gap-2 xs:flex-row">
                <span className="text-sm text-gray-600">Salary:</span>
                <span className="text-sm font-medium">{user.salary}</span>
              </div>
            )}
            {user.address && (
              <div className="flex flex-col items-start gap-2 xs:flex-row">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="text-sm font-medium">{user.address}</span>
              </div>
            )}
          </div>

          {/* Education and Skills */}
          <div className="space-y-1">
            {user.education && user.education.length > 0 && (
              <div className="flex flex-col items-start gap-2 xs:flex-row">
                <span className="text-sm text-gray-600">Education:</span>
                <span className="text-sm font-medium">{user.education}</span>
              </div>
            )}
            {user.skills && user.skills.length > 0 && (
              <div className="flex flex-col items-start gap-2 xs:flex-row">
                <span className="text-sm text-gray-600">Skills:</span>
                <span className="text-sm font-medium">
                  {user.skills.join(' / ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;

function Avatar({ avatar, userName }: { avatar: string; userName: string }) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  let avatarSrc;
  if (avatar) {
    avatarSrc = `${BASE_URL}${avatar}`;
  } else {
    avatarSrc = `${BASE_URL}/default-avatar.png`;
  }
  return (
    <img
      src={avatarSrc}
      alt={userName}
      className="h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
    />
  );
}
