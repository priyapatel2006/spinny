import Link from 'next/link';
import Image from 'next/image';
import { cars } from '@/data/cars';

export default function CarsPage() {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
              <Link href="/cars" className="text-blue-600 font-medium">Browse Cars</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Cars</h1>
          <p className="text-gray-600">Find your perfect car from our curated collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car, i) => (
            <Link href={`/cars/${car.id}`} key={car.id}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow h-96 flex flex-col">
                <div className="p-0">
                  <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                    <Image
                      src={car.images[i]}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                      {car.year}
                    </div>
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {car.fuel}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {car.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-blue-600">{formatPrice(car.price)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">KM Driven:</span>
                        <span className="font-medium">{car.kmDriven.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Transmission:</span>
                        <span className="font-medium">{car.transmission}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">Mumbai, MH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors">
            Load More Cars
          </button>
        </div>
      </main>
    </div>
  );
}
