import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full h-16 w-16 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2l4-4"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">Thank you for your payment!</p>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
