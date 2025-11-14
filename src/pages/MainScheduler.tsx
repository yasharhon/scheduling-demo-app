import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router'; 
import { Root } from '../types/timefold';
import { BryntumData, BryntumEvent, BryntumResource } from '../types/bryntum';
import { modelService } from '../services/timefold/service.mock';
import { transformTimefoldToBryntum } from '../mappers/timefold';
import { schedulerproProps } from '../SchedulerProConfig';
import { JobCreationResponse } from '../types/timefold';
import { BryntumSchedulerPro, BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';
import '../App.scss';

const SubmittedJobsList = ({ jobs }: { jobs: JobCreationResponse[] }) => {
  if (jobs.length === 0) {
    return null; // Don't render anything if there are no jobs
  }

  return (
    <div className="p-4 mt-6 bg-gray-100 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-3">Submitted Jobs</h3>
      <ul className="list-disc pl-5 space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="text-blue-600 hover:text-blue-800">
            {/* This Link creates a URL like /results/job-abc-123 */}
            <Link to={`/results/${job.id}`}>
              View Solution: {job.id} (Status: {job.solverStatus})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


function MainScheduler() {
  // === STATE ===
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- NEW STATE ---
  // Store the original Timefold input to merge changes with
  const [originalTimefoldInput, setOriginalTimefoldInput] = useState<Root | null>(null);
  // Store the list of submitted job "tickets"
  const [submittedJobs, setSubmittedJobs] = useState<JobCreationResponse[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // This state now holds the raw Timefold model input
  const [timefoldRoot, setTimefoldRoot] = useState<Root | null>(null);

  // This state holds the config loaded directly from the JSON file.
  const [schedulerConfig, setSchedulerConfig] = useState<Partial<BryntumSchedulerProProps> | null>(null);
  
  // State to temporarily hold the captured Bryntum data
  const [capturedBryntumState, setCapturedBryntumState] = useState<BryntumData | null>(null);

  // Ref to access the underlying Bryntum component instance
  const schedulerpro = useRef<BryntumSchedulerPro>(null);

  // === HANDLERS ===

  // === NEW: JOB SUBMISSION HANDLER ===
  const handleSubmitToSolver = useCallback(async () => {
    // Double-check if scheduler is ready and we have the original data
    if (!schedulerpro.current || !timefoldRoot) {
      console.error('Scheduler not ready or original input data is missing.');
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Capture the current state from Bryntum UI
      const bryntumInstance = schedulerpro.current?.instance;

      if (!bryntumInstance) {
        return;
      }
      const capturedBryntumData: BryntumData = {
        // Use .allRecords to originalTimefoldInputget all data, including modified/unmodified
        resources: bryntumInstance.resourceStore.allRecords.map((r: any) => r.data),
        events: bryntumInstance.eventStore.allRecords.map((e: any) => e.data),
        assignments: []
      };
      console.log('Captured Bryntum State:', capturedBryntumData);

      // 2. Transform this state back into the Timefold API payload
      // We pass both the origoriginalTimefoldInputinal data and the UI data for merging
      // const timefoldPayload = transformBryntumToTimefold(
      //   originalTimefoldInput,
      //   capturedBryntumData
      // );
      // console.log('Transformed Timefold Payload:', timefoldPayload);

      // 3. Post the payload to the mock service
      const jobTicket = await modelService.postSolutionRequest(timefoldRoot as Root);
      console.log('Received Job Ticket:', jobTicket);
      
      // 4. Add the new job ticket to our list to be rendered
      setSubmittedJobs(prevJobs => [...prevJobs, jobTicket]);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during submission.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [originalTimefoldInput]); // Dependency on originalTimefoldInput

  // === DATA FETCHING & TRANSFORMATION ===
  useEffect(() => {
    async function loadData() {
      try {
        // Load Bryntum-native static config (e.g., columns, dates)
        const bryntumStaticConfig = { ...schedulerproProps };

        // Load Timefold datatimefoldPayload
        const timefoldData = await modelService.loadModelInput();
        setTimefoldRoot(timefoldData);

        // Transform Timefold data into Bryntum format
        const bryntumTransformedData: BryntumData = transformTimefoldToBryntum(timefoldData);

        // Merge static config and transformed data
        const finalConfig = {
          ...bryntumStaticConfig,
          resources: bryntumTransformedData.resources,
          events: bryntumTransformedData.events,
          assignments: bryntumTransformedData.assignments
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
              onClick={handleSubmitToSolver}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              Capture Bryntum State
            </button>
            {/* The new component to render the list of job links */}
            <SubmittedJobsList jobs={submittedJobs} />
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

export default MainScheduler;