function MenuItem({ icon, label, badge, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`shadow-lg shadow-black/20 flex items-center justify-between px-[5%] py-[4%] rounded-xl ${
        active ? "bg-green-50" : "hover:bg-gray-50"
      } active:scale-[0.98] transition cursor-pointer select-none`}
    >
      <div className="flex items-center gap-3">
        <div className="text-green-700/80">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
      {/* {badge && (
        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )} */}
    </div>
  );
}
export default MenuItem;
