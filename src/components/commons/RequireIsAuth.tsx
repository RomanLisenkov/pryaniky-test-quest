import LoginPage from '../LoginPage';

const RequireIsAuth = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const token:string|null = localStorage.getItem('token');

  if (!token) {
    return <LoginPage />;
  }

  return children;
};

export default RequireIsAuth;
