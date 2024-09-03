import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Modal from "./components/Modal";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <main className="h-screen flex justify-center items-center flex-col bg-[#f5e9ff]">
      <h1 className="mb-6 text-[28px] font-semibold font-mono">
        {isRegistering ? "Регистрация в личный кабинет" : "Войти в личный кабинет"}
      </h1>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1 className="text-3xl mb-5">Welcome</h1>
          <button
            onClick={() => setShowModal(false)}
            className="bg-indigo-700 text-white rounded-xl w-full py-2"
          >
            Close
          </button>
        </Modal>
      )}
      {isRegistering ? (
        <RegisterForm setOpen={() => setShowModal(true)} />
      ) : (
        <LoginForm setOpen={() => setShowModal(true)} />
      )}
      <button
        onClick={() => setIsRegistering((prev) => !prev)}
        className="mt-4 text-blue-600"
      >
        {isRegistering
          ? "Уже есть аккаунт? Войти"
          : "Нет аккаунта? Зарегистрироваться"}
      </button>
    </main>
  );
}
