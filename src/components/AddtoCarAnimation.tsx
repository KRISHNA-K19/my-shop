import React, { useEffect } from "react";
import Lottie from "lottie-react";
import cartAnimation from "../assets/animations/shopping-cart.json";

type AddToCartAnimationProps = {
  onComplete?: () => void;
  message?: string;
};

export default function AddToCartAnimation({
  onComplete,
  message = "Added to Cart!",
}: AddToCartAnimationProps) {
  // Auto-close after 2 seconds if onComplete is passed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <Lottie
          animationData={cartAnimation}
          loop={false}
          autoplay
          style={{ width: 200, height: 200 }}
        />
        <p className="text-green-600 text-lg font-semibold mt-2">{message}</p>
      </div>
    </div>
  );
}
