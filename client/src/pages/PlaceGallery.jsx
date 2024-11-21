import { useState } from "react";
import Image from "./Image.jsx";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-90 text-white min-h-screen z-50 flex flex-col">
        <div className="flex justify-between items-center px-8 py-4">
          <h2 className="text-3xl">Photos of {place.title}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full shadow hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="grid gap-4 px-8 py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-2 rounded-3xl overflow-hidden">
        {/* Large Image */}
        <div className="col-span-2 row-span-2">
          {place.photos?.[0] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full cursor-pointer object-cover aspect-[4/3]"
              src={place.photos[0]}
              alt=""
            />
          )}
        </div>
        {/* Smaller Thumbnails */}
        {place.photos?.slice(1, 5).map((photo, index) => (
          <Image
            key={index}
            onClick={() => setShowAllPhotos(true)}
            className="w-full h-full cursor-pointer object-cover aspect-[4/3]"
            src={photo}
            alt=""
          />
        ))}
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex items-center gap-2 absolute bottom-4 right-4 py-2 px-4 bg-white text-black rounded-xl shadow hover:shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show all photos
      </button>
    </div>
  );
}
