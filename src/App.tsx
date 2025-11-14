import React from 'react';
import { Routes, Route } from 'react-router';

// --- Page Components ---
// 1. The main page, which we created in the last step.
import MainScheduler from './pages/MainScheduler'; 
// 2. The results page, which we will create in the next steps.
// import ResultsViewer from './pages/ResultsViewer'; 

// Import global styles. This is a good place for it.
import './App.scss';

/**
 * App Component
 *
 * This component is now responsible *only* for defining the application's routes.
 * The <BrowserRouter> wrapper that powers this is set up in `main.tsx`.
 */
function App() {
  return (
    <Routes>
      {/* Route 1: The main page (URL: "/")
        Renders the main scheduling dashboard.
      */}
      <Route 
        path="/" 
        element={<MainScheduler />} 
      />
      
      {/* Route 2: The results page (URL: "/results/some-job-id")
        Renders the viewer for a specific, solved job.
        The ":jobId" part is a dynamic parameter.
      */}
      {/* <Route 
        path="/results/:jobId" 
        element={<ResultsViewer />} 
      /> */}
      
      {/* You could add a "Not Found" route here as well, e.g.:
        <Route path="*" element={<h1>404: Page Not Found</h1>} /> 
      */}
    </Routes>
  );
}

export default App;