import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../redux/types/userEnum";
import { useState } from "react";
import { RootState } from "../../redux/store/store";
import CircularIndeterminate from "./Progress";

const defaultTheme = createTheme();

const LoginForm = (): JSX.Element => {
  

  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorUsernameValidationMessage, setErrorUsernameValidationMessage] =
    useState<string>("");

  const [errorPasswordValidationMessage, setErrorPasswordValidationMessage] =
    useState<string>("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setErrorUsernameValidationMessage("");
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setErrorPasswordValidationMessage("");
    setPassword(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!username) {
      setErrorUsernameValidationMessage("Поле должно быть заполнено!");
    }
    if (!password) {
      setErrorPasswordValidationMessage("Поле должно быть заполнено!");
    } else {
      dispatch({
        type: UserType.loginRequested,
        payload: { username, password },
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              autoComplete="name"
              autoFocus
              value={username}
              onChange={handleUsername}
              error={!!errorUsernameValidationMessage}
              helperText={errorUsernameValidationMessage}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handlePassword}
              error={!!errorPasswordValidationMessage}
              helperText={errorPasswordValidationMessage}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginForm;
