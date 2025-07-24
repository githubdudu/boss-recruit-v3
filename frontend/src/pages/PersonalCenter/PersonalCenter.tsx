import { useAuth } from 'hooks/useAuth';
function PersonalCenter() {
  const { logout } = useAuth();
  return (
    <>
      <h1>Me</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default PersonalCenter;
