import React, { useState, useEffect, useRef } from 'react';

// --- UPDATED ---
// Import only the types and services we need now
import { Root } from './types/timefold';
import { modelService } from './services/timefold/service.mock';
import { schedulerproProps } from './SchedulerProConfig';
import { BryntumSchedulerPro, BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';

function App() {
  // === STATE ===
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // This state holds the config loaded directly from the JSON file.
  const [schedulerConfig, setSchedulerConfig] = useState<Partial<BryntumSchedulerProProps> | null>(null);

  // === DATA FETCHING ===
  useEffect(() => {
    async function loadSchedulerData() {
      try {
        // 1. Load the pre-formatted Bryntum data
        // (This file is in the /public directory)
        const response = await fetch('/public/data.json');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch bryntum-data.json: ${response.statusText}`);
        }

        const data: Partial<BryntumSchedulerProProps> = await response.json();
        
        // 2. Set this data directly as our config
        setSchedulerConfig(data);

      } catch (err) {
         if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred loading data.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadSchedulerData();
  }, []); // The empty array [] means this effect runs only once

  // === RENDER ===
  const renderContent = () => {
    if (loading) {
      return <p className="loading">Loading scheduler data...</p>;
    }
    
    if (error) {
      return (
        <p className="error">
          Failed to load data: {error}
        </p>
      );
    }
    
    // Only render BryntumSchedulerPro if the config is ready
    if (schedulerConfig) {
      return (
        <BryntumSchedulerPro
          {...schedulerConfig}
        />
      );
    }
    
    return <p>An unexpected error occurred.</p>;
  }
  
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1>Bryntum Scheduler (Direct Load)</h1>
      <div style={{ flex: 1, position: 'relative' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;

