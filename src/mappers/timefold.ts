import { Root, Vehicle, Visit } from '../types/timefold';
import { BryntumData } from '../types/bryntum';
import { BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';

/**
 * Converts a Timefold Root DTO into a structure that can be directly consumed
 * by the Bryntum SchedulerPro component.
 *
 * NOTE: This is a placeholder implementation. Real implementation would
 * require careful mapping of Timefold's specific date/time strings
 * (like ISO 8601 strings) and complex object properties to simple
 * Bryntum properties (like 'id', 'name', 'startDate', 'resourceId').
 *
 * @param timefoldRoot - The full Timefold Root DTO.
 * @returns An object containing Bryntum-compatible resources and events arrays.
 */
export const transformTimefoldToBryntum = (timefoldRoot: Root): BryntumData => {
    const { vehicles, visits } = timefoldRoot.modelInput;

    // --- 1. Map Vehicles (Timefold's resources) to Bryntum Resources ---
    const bryntumResources: BryntumData['resources'] = vehicles.map((vehicle: Vehicle) => ({
        id: vehicle.id, // Use vehicle ID as the Bryntum Resource ID
        name: vehicle.id, // Use ID as name for now, or find a better name if available
        // You could also add vehicleType, technicianRating, etc. here
    }));

    // --- 2. Map Visits (Timefold's tasks) to Bryntum Events ---
    // This is the most complex part, as Timefold's visits don't inherently have
    // a resource assignment or start/end time until they are solved.
    // For *input* visualization, you may just plot them on a generic unassigned track,
    // or as fixed time constraints if they have hard time windows.
    //
    // For this example, we assume we want to visualize the *potential* visits.

    const bryntumEvents: BryntumData['events'] = visits.map((visit: Visit) => {
        // Find the earliest time window start as a mock start date
        const earliestTimeWindow = visit.timeWindows.length > 0
            ? visit.timeWindows[0].minStartTime
            : timefoldRoot.modelInput.planningWindow.startDate; // Fallback to planning start

        // Calculate a mock end date (start date + service duration)
        // NOTE: Bryntum expects a valid Date object or a parsable string.
        // Handling ISO 8601 duration strings (like 'PT15M') would be required here.
        // For demonstration, we'll use a placeholder date string.

        const mockStartDate = `${timefoldRoot.modelInput.planningWindow.startDate}T${earliestTimeWindow}`;
        const mockEndDate = `${timefoldRoot.modelInput.planningWindow.startDate}T${earliestTimeWindow}`;
        // !!! REAL LOGIC NEEDED HERE to calculate end date from serviceDuration !!!

        return {
            id: visit.id,
            name: visit.name,
            // Placeholder: Assign to a generic or unassigned resource ID for visualization
            // before the solver runs.
            resourceId: 'unassigned-placeholder',
            startDate: mockStartDate,
            endDate: mockEndDate,
            duration: visit.serviceDuration, // Store original duration string
            isPinned: visit.pinningRequested, // Example of mapping a flag
        };
    });

    // In a real implementation, you would need to merge the resources with a
    // dummy 'unassigned-placeholder' resource for the visits that aren't yet assigned
    // to a vehicle in the Timefold input.

    return {
        resources: bryntumResources,
        events: bryntumEvents,
    };
};

// You can export BryntumData interface here for use in App.tsx
//export type { BryntumData };