import React, { useState, useEffect } from 'react';

// --- UPDATED ---
// Import only the types and services we need now
import { Root } from './types/timefold';
import { modelService } from './services/timefold/service.mock';

/**
 * A simple component to render data as a formatted JSON string.
 */
interface JsonDisplayProps {
  data: any; 
}

function JsonDisplay({ data }: JsonDisplayProps) {
  if (!data) return null;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

/**
 * Main application component.
 * Refactored to focus only on loading the Root model object.
 */
function App() {
  // === STATE ===
  const [loading, setLoading] = useState<boolean>(true);
  const [modelRoot, setModelRoot] = useState<Root | null>(null);
  const [modelError, setModelError] = useState<string | null>(null);

  // === DATA FETCHING ===
  useEffect(() => {
    async function loadData() {
      try {
        // Load Model Data (from local JSON)
        const rootData = await modelService.loadModelInput();
        setModelRoot(rootData);
      } catch (error) {
         if (error instanceof Error) {
          setModelError(error.message);
        } else {
          setModelError('An unknown error occurred loading model.json.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []); // The empty array [] means this effect runs only once

  // === RENDER ===
  return (
    <div>
      <h1>Timefold Model Viewer</h1>
      <p>
        This page loads the <strong>model.json</strong> file from the{' '}
        <code>/public</code> directory on load.
      </p>

      {loading && <p className="loading">Loading model data...</p>}

      <div style={{ display: loading ? 'none' : 'block' }}>
        <h2>Loaded Model Input (from /public/model.json)</h2>
        {modelError ? (
          <p className="error">
            Failed to load model.json: {modelError}
          </p>
        ) : (
          <JsonDisplay data={modelRoot} />
        )}
      </div>
    </div>
  );
}

export default App;

