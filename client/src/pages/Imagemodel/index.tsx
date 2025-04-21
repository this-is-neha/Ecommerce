// src/components/common/ImageModal.tsx
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
  <>
  <HeaderComponent/>
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="relative">
        <img src={imageUrl} alt="Selected" className="max-w-full max-h-full" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-black rounded-full p-1"
        >
          X
        </button>
      </div>
    </div>
  <FooterComponent/>
  </>
  );
};

export default ImageModal;
