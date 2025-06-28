import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const ThrashMap = dynamic(
  () => import('../../src/components/widgets/ThrashMap'),
  { ssr: false }
);

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Map
            </h1>
            <p className="text-lg text-gray-600">
              Explore the interactive map below.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ThrashMap />
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              This is an empty Leaflet map ready for customization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 