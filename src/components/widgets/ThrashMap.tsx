'use client';

import { useEffect, useState, useRef } from 'react';
import { useThrashmapQuery } from '../../api/__generated__/graphql';

export default function ThrashMap() {
  const [isClient, setIsClient] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const { data, loading, error } = useThrashmapQuery();

  const trashLocations = data?.activitiesThrashMap || [];
  console.log(trashLocations);
  const centerLat = trashLocations.reduce((sum, loc) => sum + parseFloat(loc.lat), 0) / trashLocations.length;
  const centerLng = trashLocations.reduce((sum, loc) => sum + parseFloat(loc.lon), 0) / trashLocations.length;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainer.current) return;

    // Load MapLibre GL JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.href = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Initialize map after CSS is loaded
      setTimeout(() => {
        if (mapContainer.current && (window as any).maplibregl) {
          const map = new (window as any).maplibregl.Map({
            container: mapContainer.current,
            style: {
              version: 8,
              sources: {
                'satellite': {
                  type: 'raster',
                  tiles: [
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                  ],
                  tileSize: 256,
                  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }
              },
              layers: [
                {
                  id: 'satellite-layer',
                  type: 'raster',
                  source: 'satellite',
                  minzoom: 0,
                  maxzoom: 22
                }
              ]
            },
            center: [centerLng, centerLat],
            zoom: 10
          });

          mapRef.current = map;

          // Add navigation controls
          map.addControl(new (window as any).maplibregl.NavigationControl());

          // Wait for map to load before adding clustered data
          map.on('load', () => {
            if (data?.activitiesThrashMap) {
              addClusteredMarkers(map, data.activitiesThrashMap);
            }
          });
        }
      }, 100);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isClient, centerLat, centerLng]);

  useEffect(() => {
    if (mapRef.current && data?.activitiesThrashMap) {
      addClusteredMarkers(mapRef.current, data.activitiesThrashMap);
    }
  }, [data]);

  const addClusteredMarkers = (map: any, locations: any[]) => {
    // Remove existing sources and layers
    if (map.getSource('clusters')) {
      map.removeLayer('clusters');
      map.removeLayer('cluster-count');
      map.removeLayer('unclustered-point');
      map.removeSource('clusters');
    }

    // Convert locations to GeoJSON format
    const geojson = {
      type: 'FeatureCollection',
      features: locations.map((location, index) => ({
        type: 'Feature',
        properties: {
          id: index,
          lat: location.lat,
          lon: location.lon
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(location.lon), parseFloat(location.lat)]
        }
      }))
    };

    // Add clustered data source
    map.addSource('clusters', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });

    // Add cluster circles
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'clusters',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });

    // Add cluster count labels
    // map.addLayer({
    //   id: 'cluster-count',
    //   type: 'symbol',
    //   source: 'clusters',
    //   filter: ['has', 'point_count'],
    //   layout: {
    //     'text-field': ['concat', ['to-string', ['get', 'point_count']]],
    //     'text-font': ['Arial'],
    //     'text-size': 12,
    //     'text-allow-overlap': true,
    //     'text-ignore-placement': true
    //   },
    //   paint: {
    //     'text-color': '#ffffff',
    //     'text-halo-color': '#000000',
    //     'text-halo-width': 1
    //   }
    // });

     map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'clusters',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['concat', ['to-string', ['get', 'point_count']]],
            'text-font': ['Arial'],
            'text-size': 12,
            'text-allow-overlap': true,
            'text-ignore-placement': true
        },
    });

    // Add unclustered point markers
    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'clusters',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });

    // Handle cluster clicks
    map.on('click', 'clusters', (e: any) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      const clusterId = features[0].properties?.cluster_id;
      const pointCount = features[0].properties?.point_count;
      
      // Show cluster info popup
      const coordinates = features[0].geometry.coordinates.slice();
      const popup = new (window as any).maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; color: #51bbd6; font-weight: 600;">🗑️ Cluster</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">
              Contains ${pointCount} trash locations<br>
              Click to zoom in and expand
            </p>
          </div>
        `)
        .addTo(map);

      map.getSource('clusters').getClusterExpansionZoom(
        clusterId,
        (err: any, zoom: number) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        }
      );
    });

    // Handle individual point clicks
    map.on('click', 'unclustered-point', (e: any) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const lat = e.features[0].properties.lat;
      const lon = e.features[0].properties.lon;

      // Create popup
      const popup = new (window as any).maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; color: #ef4444; font-weight: 600;">🗑️ Trash Location</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">
              Lat: ${parseFloat(lat).toFixed(6)}<br>
              Lon: ${parseFloat(lon).toFixed(6)}
            </p>
          </div>
        `)
        .addTo(map);
    });

    // Change cursor on hover
    map.on('mouseenter', 'clusters', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = '';
    });
    map.on('mouseenter', 'unclustered-point', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', () => {
      map.getCanvas().style.cursor = '';
    });
  };

  console.log(centerLat, centerLng);
  if (trashLocations.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-600">No trash locations found</div>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-600">Loading map...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-600">Loading trash locations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-red-100 rounded-lg flex items-center justify-center">
        <div className="text-red-600">Error loading trash locations: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
} 