import React, { useState, useEffect, useRef } from 'react';

import { Root } from './types/timefold';
import { BryntumData } from './types/bryntum';
import { modelService } from './services/timefold/service.mock';
import { transformTimefoldToBryntum } from './mappers/timefold';
import { schedulerproProps } from './SchedulerProConfig';
import { BryntumSchedulerPro, BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';
import './App.scss';

function App() {
  // === STATE ===
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // This state now holds the raw Timefold model input
  const [timefoldRoot, setTimefoldRoot] = useState<Root | null>(null);

  // This state holds the config loaded directly from the JSON file.
  const [schedulerConfig, setSchedulerConfig] = useState<Partial<BryntumSchedulerProProps> | null>(null);

  const schedulerpro = useRef<BryntumSchedulerPro>(null);

  // === DATA FETCHING & TRANSFORMATION ===
  useEffect(() => {
    async function loadData() {
      try {
        // 1. Load Bryntum-native config (e.g., columns, dates)
        const bryntumStaticConfig = { ...schedulerproProps };

        // 2. Load Timefold data
        const timefoldData = await modelService.loadModelInput();
        setTimefoldRoot(timefoldData);

        // 3. Transform Timefold data into Bryntum format
        const bryntumTransformedData: BryntumData = transformTimefoldToBryntum(timefoldData);

        // 4. Merge static config and transformed data
        const finalConfig = {
          ...bryntumStaticConfig,
          resources: bryntumTransformedData.resources,
          events: bryntumTransformedData.events,
          // Note: Dependencies and Assignments are not mapped here yet
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

    loadData();
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
      console.log('Final Scheduler Config:', schedulerConfig);
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
      <h1>Timefold Scheduler Prototype</h1>
      {renderContent()}
    </div>
  );
}

export default App;