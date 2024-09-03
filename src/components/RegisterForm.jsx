import { useState } from "react";
import Eye from "./Eye";

const RegisterForm = ({ setOpen }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  function hasNumber(password) {
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "0" && password[i] <= "9") {
        return true;
      }
    }
    return false;
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setErrors({
        username: !username ? "Введите это поле" : "",
        email: !email ? "Введите это поле" : "",
        password: !password ? "Введите это поле" : "",
      });
      return;
    }

    if (username.length < 3) {
      setErrors((prev) => ({ ...prev, username: "Минимум 3 символа" }));
      return;
    }

    if (password.length < 8) {
      setErrors((prev) => ({ ...prev, password: "Минимум 8 символов" }));
      return;
    }

    if (!hasNumber(password)) {
      setErrors((prev) => ({ ...prev, password: "Хотя бы 1 цифра" }));
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      setErrors({
        username: "Пользователь уже существует",
        email: "Пользователь уже существует",
      });
      return;
    }

    const newUser = { username, email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setOpen(true);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white flex flex-col py-6 px-6 rounded-md w-1/5"
    >
      <label className="flex flex-col font-medium">
        Имя пользователя
        <input
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          className="input border border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Введите имя пользователя"
        />
        {errors.username && (
          <span className="text-red-500 my-2">{errors.username}</span>
        )}
      </label>
      <label className="flex flex-col my-3 font-medium">
        Email
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          className="input border border-gray-300 rounded-md p-2"
          type="email"
          placeholder="Введите свой email"
        />
        {errors.email && (
          <span className="text-red-500 my-2">{errors.email}</span>
        )}
      </label>
      <label className="flex flex-col my-3 font-medium">
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
      <div className="flex justify-between">
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
        Регистрация
      </button>
    </form>
  );
};

export default RegisterForm;
