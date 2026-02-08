function MenuItem({ icon, label, badge, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`shadow-lg border-2   flex items-center justify-between px-[5%] py-[4%] rounded ${
        active ? "bg-green-50" : "hover:bg-gray-50"
      } active:scale-[0.98] transition cursor-pointer select-none`}
    >
      <div className="flex items-center gap-3 ">
        <div className="text-green-700/80">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}
export default MenuItem;
