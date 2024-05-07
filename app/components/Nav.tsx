"use client";

export default function Nav() {
  return (
    <div className="fixed top-0 z-10 min-w-full pt-2 backdrop-blur-2xl">
      <div className="shadow-sm pb-2 flex flex-row items-center justify-between">
        <div className="pl-8 text-xl font-bold">TanyaDok</div>
        <ul className="flex flex-row items-center text-sm text-gray-600 font-medium gap-6">
          <li>Home</li>
          <li>Feature</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
        <div className="flex flex-row pr-8 items-center gap-3 ">
          <button className="px-4 py-1 border shadow-lg hover:bg-gray-200 rounded-xl">
            SignIn
          </button>
          <button className="px-4 py-1 border shadow-lg bg-yellow-500 rounded-xl hover:bg-yellow-600">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
