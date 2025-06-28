import ThrashMap from '../../src/components/widgets/ThrashMap';
import TrashAnalysis from '../../src/components/widgets/TrashAnalysis';

export default function ThrashMapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Trash Map & Analysis</h1>
        <p className="text-gray-600">
          View trash locations on the map and get AI-powered insights about the data.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trash Locations Map</h2>
          <ThrashMap />
        </div>
        
        <div>
          <TrashAnalysis />
        </div>
      </div>
    </div>
  );
} 