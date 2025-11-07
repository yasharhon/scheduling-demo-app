# Scheduling Integration App

This is a React app demonstrating how to integrate with the Timefold.ai API and rendering data from there in a Bryntum scheduling component.

## Running the app

The app is installed by running `npm install`, which is done once. The app is then started by running `npm run dev`.

## App logic

The core idea of this app is the following:

1. Load data from a Timefold.ai dataset.
2. Transform the data to a Bryntum compatible format.
3. Render the data.
4. On a button click, read the updated data from the Bryntum component.
5. Transform the data back to a Timefold.ai compatible format.
6. Post the updates to the optimization API and parse the API response.
7. Update the loaded data with the optimized return.
8. Re-render the Bryntum component with updated data.

## What is done

- Creating the base app
- Adding Timefold.ai DTOs
- Loading test data
- Rendering the Bryntum component

## What is incomplete

- Transformation and update algorithms for the scheduling data
- Button logic and functionality
- Update logic for the Bryntum component