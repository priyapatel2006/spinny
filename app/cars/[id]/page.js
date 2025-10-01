'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CarImageSlider from '@/components/CarImageSlider';
import PriceCalculator from '@/components/PriceCalculator';
import { cars } from '@/data/cars';

export default function CarDetailPage({ params }) {
  const [activeImage, setActiveImage] = useState(0);
  const car = cars.find(car => car.id === parseInt(params.id));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Car Not Found</h2>
          <p className="text-gray-600 mb-8">The car you're looking for doesn't exist or has been removed.</p>
          <Link href="/cars" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Browse All Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Spinny</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/cars" className="text-gray-600 hover:text-gray-900">Browse Cars</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/cars" className="hover:text-gray-900">Cars</Link>
          <span>/</span>
          <span className="text-gray-900">{car.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <CarImageSlider 
              images={car.images} 
              images360={car.images360} 
              carName={car.name}
              currentIndex={activeImage}
              setCurrentIndex={setActiveImage}
            />
            
            <div className="grid grid-cols-4 gap-2">
              {car.images.map((img, i) => (
                <div 
                  key={i} 
                  className={`relative h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-all duration-200 ${
                    i === activeImage ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                  onClick={() => setActiveImage(i)}
                >
                  <Image
                    src={img}
                    alt={`${car.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {formatPrice(car.price)}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>📍 Mumbai, Maharashtra</span>
                <span>📅 {car.year}</span>
                <span>⛽ {car.fuel}</span>
              </div>
            </div>

            <PriceCalculator />
          </div>
        </div>
      </main>
    </div>
  );
}
