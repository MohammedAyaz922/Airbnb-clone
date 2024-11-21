import { Link } from "react-router-dom";

export default function SubHeader() {
  return (
    <header className="flex justify-between items-center py-4 px-8 shadow-md bg-white sticky top-0 z-50">
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

      {/* Search Options */}
      <div className="flex items-center gap-4">
        <div className="text-gray-700 hover:border-b-2 hover:border-black pb-1 cursor-pointer">
          Anywhere
        </div>
        <div className="text-gray-700 hover:border-b-2 hover:border-black pb-1 cursor-pointer">
          Any week
        </div>
        <div className="text-gray-700 hover:border-b-2 hover:border-black pb-1 cursor-pointer">
          Add guests
        </div>
        <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
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
