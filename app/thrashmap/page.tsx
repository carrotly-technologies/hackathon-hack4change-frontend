import ThrashMap from '../../src/components/widgets/ThrashMap';

export default function ThrashMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🗺️ Trash Map
            </h1>
            <p className="text-lg text-gray-600">
              Interactive map showing all recorded trash locations from community activities.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ThrashMap />
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              This map displays trash locations collected by community members during their activities.
              Each marker represents a location where trash was found and recorded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 