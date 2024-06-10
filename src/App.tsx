import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import RequireIsAuth from './components/commons/RequireIsAuth';


const App = (): JSX.Element => {
  



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
