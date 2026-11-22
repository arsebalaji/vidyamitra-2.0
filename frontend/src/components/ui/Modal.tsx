import { useEffect, useRef, type ReactNode } from "react";
export default function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !ref.current?.open) ref.current?.showModal();
    else if (!open) ref.current?.close();
  }, [open]);
  return (
    <dialog ref={ref} onCancel={onClose} className="card" aria-label={title}>
      <h2>{title}</h2>
      {children}
      <button className="soft-button" onClick={onClose}>
        Close · మూసివేయండి
      </button>
    </dialog>
  );
}
