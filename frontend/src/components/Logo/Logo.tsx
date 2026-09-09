function Logo() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 pb-6">
      <img
        src="/logo.svg"
        alt="Boss Recruit App Logo"
        className="mx-auto h-56 w-56"
      />
      <h1 className="text-3xl font-bold text-gray-800">Boss Recruit</h1>
    </div>
  );
}

export default Logo;
