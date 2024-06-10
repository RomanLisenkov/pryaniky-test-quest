import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import LoginForm from "./commons/LoginForm";
import CircularIndeterminate from "./commons/Progress";

const LoginPage = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  return <>{user.loading ? <CircularIndeterminate /> : <LoginForm />}</>;
};

export default LoginPage;
