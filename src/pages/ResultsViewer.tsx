import React, { useState, useEffect } from 'react';
// Use 'react-router' as requested
import { useParams, Link } from 'react-router'; 
import { BryntumSchedulerPro, BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';
import { modelService } from '../services/timefold/service.mock';
// import { transformTimefoldSolutionToBryntum } from '../mappers/timefoldSolution';
import { JobStatusResponse } from '../types/timefold';

/**
 * The Results Viewer Page
 * * Fetches and displays the *solved* schedule for a specific Job ID.
 */
function ResultsViewer() {
  // --- STATE ---
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [valErrors, setValErrors] = useState<string[]>([]);
  const [schedulerConfig, setSchedulerConfig] = useState<Partial<BryntumSchedulerProProps> | null>(null);
  
  // --- ROUTING ---
  // Get the {jobId} from the URL (e.g., /results/job-123)
  const { jobId } = useParams<{ jobId: string }>();

  // --- DATA FETCHING ---
  useEffect(() => {
    // Guard clause: Don't fetch if jobId isn't available yet
    if (!jobId) return;

    async function loadSolutionData() {
      try {
        setLoading(true);
        setError(null);

        const solvedTimefoldData: JobStatusResponse = await modelService.getSolutionStatus(jobId as string);

        if (solvedTimefoldData.metadata.validationResult != null) {
          setValErrors(solvedTimefoldData.metadata.validationResult.errors);
        }

        // 2. Transform the *solution* data into Bryntum format
        //    (This mapper reads the assignments from the itinerary)
        // const bryntumData = transformTimefoldSolutionToBryntum(solvedTimefoldData);

        // 3. Set the config for the Bryntum component
        // setSchedulerConfig(bryntumData);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred loading the solution.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadSolutionData();
  }, [jobId]); // Re-run this effect if the jobId in the URL changes

  // --- RENDER LOGIC ---
  const renderContent = () => {
    if (loading) {
      return <p className="loading">Loading solution data for Job: {jobId}...</p>;
    }

    if (error) {
      return (
        <p className="error">
          Failed to load solution: {error}
        </p>
      );
    }

    if (valErrors.length > 0) {
        return (
        <div className="p-4 mt-6 bg-gray-100 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Validation errors</h3>
          <ul className="list-disc pl-5 space-y-2">
            {valErrors.map((valError, i) => (
              <li key={i} className="text-blue-600 hover:text-blue-800">
                <p>{valError}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (schedulerConfig) {
      return (
        <BryntumSchedulerPro
          {...schedulerConfig}
          // Note: We don't need a ref here unless we want to
          // read data *from* this solved schedule.
        />
      );
    }

    return <p>No solution data found for this job.</p>;
  };

  // --- RENDER ---
  return (
    <div>
      <header className="app-header">
        <h1>Timefold Solution: {jobId}</h1>
        {/* Add a link to go back to the main page */}
        <Link to="/" className="back-link">
          &larr; Back to Main Scheduler
        </Link>
      </header>
      
      <div className="scheduler-container">
        {renderContent()}
      </div>
    </div>
  );
}

export default ResultsViewer;