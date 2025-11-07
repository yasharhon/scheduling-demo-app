import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Root } from './types/timefold';
import { BryntumData, BryntumEvent, BryntumResource } from './types/bryntum';
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
  
  // State to temporarily hold the captured Bryntum data
  const [capturedBryntumState, setCapturedBryntumState] = useState<BryntumData | null>(null);

  // Ref to access the underlying Bryntum component instance
  const schedulerpro = useRef<BryntumSchedulerPro>(null);

  // === HANDLERS ===

  /**
   * Reads the current state from the Bryntum SchedulerPro instance.
   */
  const captureSchedulerState = useCallback(() => {
    // Access the Bryntum component instance via the ref
    const scheduler = schedulerpro.current?.instance;

    if (!scheduler) {
      console.error('Bryntum Scheduler instance not available.');
      return;
    }

    try {
        // Extract Events (Tasks) data
        const eventsData = scheduler.eventStore.getRange().map((eventRecord): BryntumEvent => ({
            id: eventRecord.id as string,
            name: eventRecord.name as string,
            startDate: eventRecord.startDate as Date,
            endDate: eventRecord.endDate as Date,
            resourceId: eventRecord.resourceId as string,
            duration: eventRecord.duration,
        }));

        // Extract Resources (Staff/Vehicles) data
        const resourcesData = scheduler.resourceStore.getRange().map((resourceRecord): BryntumResource => ({
            id: resourceRecord.id as string,
            name: resourceRecord.name as string,
        }));

        // Combine and store the captured state
        const capturedState: BryntumData = {
            resources: resourcesData,
            events: eventsData,
            // Dependencies/Assignments would be extracted here too
        };

        // Store the captured state in React state variable
        setCapturedBryntumState(capturedState);
        console.log('--- Bryntum State Captured ---');
        console.log('Events:', eventsData);
        console.log('Resources:', resourcesData);

    } catch (e) {
        console.error("Failed to capture scheduler state:", e);
    }
  }, []);

  // === DATA FETCHING & TRANSFORMATION ===
  useEffect(() => {
    async function loadData() {
      try {
        // Load Bryntum-native static config (e.g., columns, dates)
        const bryntumStaticConfig = { ...schedulerproProps };

        // Load Timefold data
        const timefoldData = await modelService.loadModelInput();
        setTimefoldRoot(timefoldData);

        // Transform Timefold data into Bryntum format
        const bryntumTransformedData: BryntumData = transformTimefoldToBryntum(timefoldData);

        // Merge static config and transformed data
        const finalConfig = {
          ...bryntumStaticConfig,
          resources: bryntumTransformedData.resources,
          events: bryntumTransformedData.events,
          // Dependencies and Assignments are not mapped here yet
        };

        // Set the final, combined object as your config
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
  }, []);

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
        <>
          <div className="flex justify-center p-4 bg-gray-100 border-b">
            {/* The button's disabled state now relies on isSchedulerReady */}
            <button
              onClick={captureSchedulerState}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              Capture Bryntum State
            </button>
            {capturedBryntumState && (
                <span className='ml-4 p-3 bg-green-100 text-green-800 rounded-lg shadow-inner font-mono text-sm'>
                    State Captured! (Check console)
                </span>
            )}
          </div>
          <BryntumSchedulerPro
            ref={schedulerpro}
            {...schedulerConfig}
          />
        </>
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