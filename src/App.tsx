import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import RequireIsAuth from './components/commons/RequireIsAuth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { UserType } from './redux/types/userEnum';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      dispatch({ type: UserType.login });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireIsAuth>
              <MainPage />
            </RequireIsAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
