export default function Card({ children, count, label, lavel }) {
  
  return (
    <div className="w-full h-[12rem] flex flex-col justify-between p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm border border-stone-200">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-blue-100">{children}</div>
        <span className="text-4xl font-bold text-stone-900">{count}</span>
      </div>
      <span className="text-lg font-medium text-stone-700">{label}</span>
      <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
        <div className={`${lavel} h-full bg-blue-500`}></div>
      </div>
    </div>
  );
}
