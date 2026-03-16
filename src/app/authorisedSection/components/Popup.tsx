"use client";

interface PopupProps {
  message: string | null;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/50 
        flex justify-center items-center 
        z-50 animate-fadeIn
      "
    >
      <div
        className="
          bg-white w-[90%] max-w-[350px]
          rounded-2xl p-6 text-center 
          shadow-xl animate-popupScale
        "
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">Message</h3>

        <p className="text-gray-600 text-base mb-5">{message}</p>

        <button
          onClick={onClose}
          className="
            w-full py-2.5 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-[#4b79a1] to-[#283e51] 
            transition-transform duration-200 
            hover:scale-105
          "
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;