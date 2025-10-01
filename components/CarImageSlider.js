'use client';
import { useState } from 'react';
import Image from 'next/image';
import Car360Modal from './Car360Modal';

export default function CarImageSlider({ images, images360, carName, currentIndex, setCurrentIndex }) {
  const [showModal, setShowModal] = useState(false);

  const nextImg = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const jumpTo = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative w-full">
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt={`${carName} view ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-300 ease-in-out"
            priority={currentIndex === 0}
          />
          
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              360° View
            </button>
          </div>
          
          <button
            onClick={prevImg}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-700 p-2 rounded-full hover:bg-white transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextImg}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-700 p-2 rounded-full hover:bg-white transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        
        <div className="flex justify-center mt-3 space-x-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === currentIndex 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      <Car360Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        images360={images360}
        carName={carName}
      />
    </>
  );
}
