import Link from 'next/link';
import LogoMarquee from '../src/components/common/LogoMarquee';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            🗺️ Hack4Change
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Interactive trash mapping platform for community environmental awareness
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              View Trash Map
            </h2>
            <p className="text-gray-600 mb-6">
              Explore all recorded trash locations from community activities on an interactive map.
            </p>
            <Link 
              href="/thrashmap" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Open Trash Map
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🗑️ Community Data
              </h3>
              <p className="text-gray-600">
                All trash locations are collected by community members during their activities.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                📍 Interactive Map
              </h3>
              <p className="text-gray-600">
                Click on markers to see detailed location information and coordinates.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <LogoMarquee />
    </div>
  );
} 