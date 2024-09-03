const Modal = ({ children, onClose }) => {
  return (
    <div
      className="absolute h-screen w-screen bg-black bg-opacity-50 grid place-items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white rounded-3xl p-10"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
