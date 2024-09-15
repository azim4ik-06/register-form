import { useState } from "react";
import Eye from "./Eye";

const LoginForm = ({ setOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    login: "",
    password: "",
    root: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!login || !password) {
      setErrors({
        login: !login ? "Введите это поле" : "",
        password: !password ? "Введите это поле" : "",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        (user.username === login || user.email === login) &&
        user.password === password
    );

    if (!user) {
      setErrors({ ...errors, root: "Неправильный логин или пароль" });
      setLogin("");
      setPassword("");
      return;
    }

    setOpen(true);
    setLogin("");
    setPassword("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white flex flex-col py-6 px-6 rounded-md"
    >
      <label className="flex flex-col font-medium">
        Логин
        <input
          onChange={(event) => setLogin(event.target.value)}
          value={login}
          className="input border border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Введите свой логин"
        />
        {errors.login && (
          <span className="text-red-500 my-2">{errors.login}</span>
        )}
      </label>
      <label className="flex flex-col my-3 font-medium relative">
        Пароль
        <input
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          className="input border border-gray-300 rounded-md p-2"
          placeholder="Введите свой пароль"
        />
        <Eye
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        {errors.password && (
          <span className="text-red-500 my-2">{errors.password}</span>
        )}
      </label>
      {errors.root && <span className="text-red-500 my-2">{errors.root}</span>}
      <div className="flex gap-12">
        <label htmlFor="remember-me">
          <input type="checkbox" id="remember-me" className="font-extrabold" />{" "}
          Запомнить меня
        </label>
        <a href="" className="text-[#813fb1]">
          Забыли пароль?
        </a>
      </div>
      <button
        type="submit"
        className="bg-[#812cbf] hover:bg-[#a760da] text-white rounded-md w-full py-4 mt-5"
      >
        Вход
      </button>
    </form>
  );
};

export default LoginForm;
