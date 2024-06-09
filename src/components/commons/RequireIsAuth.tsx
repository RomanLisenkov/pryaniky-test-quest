import { useSelector } from 'react-redux';
import LoginPage from '../LoginPage';

import { RootState } from '../../redux/store/store';

const RequireIsAuth = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {

  const user = useSelector((state:RootState) => state.user);

  if (!user.isAuth) {
    return <LoginPage />;
  }

  return children;
};

export default RequireIsAuth;
