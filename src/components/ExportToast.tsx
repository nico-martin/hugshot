import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ExportToastProps {
  message: string;
  visible: boolean;
}

export default function ExportToast({ message, visible }: ExportToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-full shadow-xl text-sm font-mono transition-all duration-300 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <CheckCircle size={16} />
      {message}
    </div>
  );
}
