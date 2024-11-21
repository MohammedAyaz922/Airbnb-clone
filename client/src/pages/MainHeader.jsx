import { Link } from "react-router-dom";

export default function MainHeader() {
  return (
    <header className="flex flex-col items-center py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center w-full max-w-screen-xl px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-red-500 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl text-red-500">airbnc</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center border border-gray-300 rounded-full shadow-md px-4 py-2 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search destinations"
          className="flex-grow outline-none px-4 py-2 text-gray-700"
        />
        <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
