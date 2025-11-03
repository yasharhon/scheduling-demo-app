import React, { useState, useEffect } from 'react';
// We import the MOCK service, just like index.ts did
import { userService } from './services/timefold/service.mock';
// Note: We don't need to import DTOs in a .jsx file,
// but we would if this were a .tsx file.

/**
 * A simple component to render data as a formatted JSON string.
 */
function JsonDisplay({ data }) {
  if (!data) return null;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

/**
 * Main application component.
 * Replaces the logic from `index.ts` and renders it to the UI.
 */
function App() {
  // === STATE ===
  // State to hold all our data, replacing the console.logs
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [user1, setUser1] = useState(null);
  const [user999Error, setUser999Error] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);

  // === DATA FETCHING ===
  // This useEffect hook runs once when the component mounts
  useEffect(() => {
    // We create an async function inside the hook to call our services
    async function loadData() {
      try {
        // 1. Get all users
        try {
          const users = await userService.getAllUsers();
          setAllUsers(users);
        } catch (error) {
          console.error('Failed to fetch all users:', error);
          // You could set an error state here
        }

        // 2. Get a single user (ID: 1)
        try {
          const user = await userService.getUserById(1);
          setUser1(user);
        } catch (error) {
          console.error('Failed to fetch user 1:', error);
        }
        
        // 3. Get a user that doesn't exist (ID: 999)
        try {
          await userService.getUserById(999);
        } catch (error) {
          // This is the expected path! We'll store the error to display it.
          if (error instanceof Error) {
            setUser999Error(error.message);
          } else {
            setUser999Error('An unknown error occurred.');
          }
        }

        // 4. Create a new user
        try {
          const newUserPayload = {
            name: 'Gemini User (Mocked)',
            username: 'gemini_mock',
            email: 'gemini@mock.example.com',
          };
          const newUser = await userService.createUser(newUserPayload);
          setCreatedUser(newUser);
        } catch (error) {
          console.error('Failed to create user:', error);
        }

      } catch (globalError) {
        console.error("An unexpected error occurred during data loading:", globalError);
      } finally {
        setLoading(false); // Data loading is complete (or failed)
      }
    }

    loadData(); // Call the function
  }, []); // The empty array [] means this effect runs only once

  // === RENDER ===
  // Render the state data to the screen
  return (
    <div>
      <h1>TypeScript API Client Demo (React UI)</h1>
      <p>
        This page fetches data from the <strong>mock user service</strong> on
        load and displays the results.
      </p>

      {loading && <p className="loading">Loading data...</p>}

      <div style={{ display: loading ? 'none' : 'block' }}>
        <h2>1. All Users</h2>
        <p>Found {allUsers.length} users.</p>
        <JsonDisplay data={allUsers} />

        <h2>2. User with ID 1</h2>
        <JsonDisplay data={user1} />

        <h2>3. User with ID 999 (Error Expected)</h2>
        {user999Error ? (
          <p className="error">
            Successfully caught expected error: {user999Error}
          </p>
        ) : (
          <p>Test did not run or no error was caught.</p>
        )}

        <h2>4. Created User</h2>
        <JsonDisplay data={createdUser} />
      </div>
    </div>
  );
}

export default App;
