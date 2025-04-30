// src/components/StartupCleanup.tsx
import { useEffect } from "react";

const StartupCleanup = () => {
  useEffect(() => {
    localStorage.removeItem("persist:root");
  }, []);

  return null;
};

export default StartupCleanup;
