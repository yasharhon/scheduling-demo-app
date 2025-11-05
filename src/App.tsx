import React, { useState, useEffect, useRef } from 'react';

// --- UPDATED ---
// Import only the types and services we need now
import { Root } from './types/timefold';
import { modelService } from './services/timefold/service.mock';
import { schedulerproProps } from './SchedulerProConfig';
import { BryntumSchedulerPro, BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';
import './App.scss';

function App() {
  // === STATE ===
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // This state holds the config loaded directly from the JSON file.
  const [schedulerConfig, setSchedulerConfig] = useState<Partial<BryntumSchedulerProProps> | null>(null);

  const schedulerpro = useRef<BryntumSchedulerPro>(null);

  // === DATA FETCHING ===
  useEffect(() => {
    async function loadSchedulerData() {
      try {
        // Load the data (assuming /data.json from public folder)
        const response = await fetch('/data.json');

        if (!response.ok) {
          throw new Error(`Failed to fetch data.json: ${response.statusText}`);
        }

        const loadResponse = await response.json();

        // Transform the loaded data into the *prop* format
        const loadedData = {
          resources: loadResponse.resources.rows,
          events: loadResponse.events.rows,
          dependencies: loadResponse.dependencies.rows,
          assignments: loadResponse.assignments.rows
        };

        // Merge static config and loaded data
        const finalConfig = {
          ...schedulerproProps, // Spread all the static settings
          ...loadedData         // Add/overwrite with the loaded data
        };

        // 5. Set the final, combined object as your config
        setSchedulerConfig(finalConfig);

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
      console.log(schedulerConfig);
      return (
        <BryntumSchedulerPro
          ref={schedulerpro}
          {...schedulerConfig}
        />
      );
    }

    return <p>An unexpected error occurred.</p>;
  }

  return (
    <div className='App'>
      {renderContent()}
    </div>
  );
}

export default App;
