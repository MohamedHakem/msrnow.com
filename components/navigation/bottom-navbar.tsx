export const BottomNavbar = () => {
  const arr = new Array(20).fill(1);
  return (
    <div className="flex flex-row justify-between gap-2 items-center border-t p-1 h-8">
      {arr.map((a, i) => (
        <p key={i} className="w-full h-full bg-gray-100 dark:bg-stone-700"></p>
      ))}
    </div>
  );
};
