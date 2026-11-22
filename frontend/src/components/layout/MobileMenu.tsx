import Sidebar from "./Sidebar";
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Sidebar menu={open} setMenu={onClose} />
      {open && (
        <button className="scrim" aria-label="Close menu" onClick={onClose} />
      )}
    </>
  );
}
