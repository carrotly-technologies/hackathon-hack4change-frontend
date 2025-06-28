'use client';

import { useState, useEffect } from 'react';
import { useThrashmapQuery } from '../../api/__generated__/graphql';
import { TrashAnalysis as TrashAnalysisType } from '../../api/openai/openai.service';

interface AnalysisResult {
  success: boolean;
  analysis: TrashAnalysisType;
  metadata: {
    totalPoints: number;
    analyzedAt: string;
  };
}

export default function TrashAnalysis() {
  const [analysis, setAnalysis] = useState<TrashAnalysisType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<string | null>(null);

  const { data: thrashmapData, loading: thrashmapLoading, error: thrashmapError } = useThrashmapQuery();

  const analyzeTrashPoints = async () => {
    if (!thrashmapData?.activitiesThrashMap || thrashmapData.activitiesThrashMap.length === 0) {
      setError('No trash points available for analysis');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-trash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trashPoints: thrashmapData.activitiesThrashMap
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze trash points');
      }

      const result: AnalysisResult = await response.json();
      
      if (result.success) {
        setAnalysis(result.analysis);
        setLastAnalyzed(result.metadata.analyzedAt);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze trash points');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (thrashmapLoading) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (thrashmapError) {
    return (
      <div className="w-full p-6 bg-red-50 rounded-lg shadow-lg border border-red-200">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
        <p className="text-red-600">{thrashmapError.message}</p>
      </div>
    );
  }

  const trashPointsCount = thrashmapData?.activitiesThrashMap?.length || 0;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trash Analysis</h2>
          <p className="text-gray-600">
            {trashPointsCount} trash points available for analysis
          </p>
        </div>
        <button
          onClick={analyzeTrashPoints}
          disabled={loading || trashPointsCount === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Analyzing...' : 'Generate Analysis'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {lastAnalyzed && (
        <div className="mb-4 text-sm text-gray-500">
          Last analyzed: {formatDate(lastAnalyzed)}
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* General Thoughts */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">General Thoughts</h3>
            <p className="text-blue-800 leading-relaxed">{analysis.thoughts}</p>
          </div>

          {/* Key Insights */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Key Insights</h3>
            <ul className="space-y-2">
              {analysis.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-green-800">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Recommendations</h3>
            <ul className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span className="text-yellow-800">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Environmental Impact */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Environmental Impact</h3>
            <p className="text-purple-800 leading-relaxed">{analysis.environmentalImpact}</p>
          </div>
        </div>
      )}

      {!analysis && !loading && trashPointsCount > 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-gray-600">Click &quot;Generate Analysis&quot; to get AI-powered insights about the trash points</p>
        </div>
      )}
    </div>
  );
} 