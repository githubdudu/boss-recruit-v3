function Logo() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 pb-6">
      <img
        src="/logo.svg"
        alt="Boss Recruit App Logo"
        className="w-56 h-56 mx-auto"
      />
      <h1 className="text-3xl font-bold text-gray-800">Boss Recruit</h1>
    </div>
  );
}

export default Logo;
