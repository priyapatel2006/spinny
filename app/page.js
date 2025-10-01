import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Spinny Car Showcase</h1>
          <p className="text-gray-600 mb-8">
            Discover your perfect car with our interactive 360° view and detailed specifications
          </p>
        </div>
        
        <Link href="/cars" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-8 py-3 rounded-lg transition-colors">
          Browse Cars
        </Link>
      </div>
    </div>
  );
}