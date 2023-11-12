export const BottomNavbar = () => {
  const arr = new Array(20).fill(1);
  return (
    // <div className="flex flex-row justify-between gap-2 items-center border-t p-1 h-8">
    // <div className="absolute bottom-0 bg-white z-50 w-full flex flex-row justify-between gap-2 items-center border-t p-1 h-8">
    // <div className="bg-white z-50 w-full flex flex-row justify-between gap-2 items-center border-t p-1 h-8">
    // <div className="absolute bottom-0 bg-white z-50 w-full border-t p-1 h-8 text-center">
    <div className="absolute bottom-0 flex bg-white z-50 w-full border-t p-1 h-10 text-center justify-center items-center">
      <p>شكرا لإستخدامك موقع مصر-الان Msrnow.com</p>
      {/* {arr.map((a, i) => (
        <p key={i} className="w-full h-full bg-gray-100 dark:bg-stone-700"></p>
      ))} */}
    </div>
  );
};
