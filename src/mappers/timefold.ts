import { Root, Vehicle, Visit } from '../types/timefold';
import { BryntumData, BryntumEvent, BryntumResource, BryntumAssignment } from '../types/bryntum';

/**
 * Simple parser for common ISO 8601 Duration formats (e.g., 'PT2H', 'PT30M').
 * This is simplified for interview purposes and handles Hours (H) and Minutes (M).
 * @param isoDuration The ISO 8601 duration string.
 * @returns Duration in minutes.
 */
function parseIsoDuration(isoDuration: string): number {
    const matchHours = isoDuration.match(/(\d+)H/);
    const matchMinutes = isoDuration.match(/(\d+)M/);

    let totalMinutes = 0;
    if (matchHours) {
        totalMinutes += parseInt(matchHours[1] as string) * 60;
    }
    if (matchMinutes) {
        totalMinutes += parseInt(matchMinutes[1] as string);
    }

    return totalMinutes; // Duration in minutes
}

/**
 * Transforms a Timefold input dataset into the Bryntum data format.
 *
 * @param timefoldRoot The complete Timefold planning input model.
 * @returns A BryntumData object ready to be fed to the scheduler.
 */
export const transformTimefoldToBryntum = (timefoldRoot: Root): BryntumData => {
    const resources: BryntumResource[] = timefoldRoot.modelInput.vehicles.map((vehicle: Vehicle) => ({
        id: vehicle.id,
        name: vehicle.id, // Use vehicleType or another field for display name
        // You might add vehicle-specific custom fields here
    }));

    const events: BryntumEvent[] = timefoldRoot.modelInput.visits.map((visit: Visit) => {
        // Parse Duration
        const durationMinutes = parseIsoDuration(visit.serviceDuration);

        // Determine Initial Start/End Dates
        // The time windows define CONSTRAINTS. Since this is the INPUT model,
        // we assume the visit is UNSCHEDULED. We use the earliest constraint as
        // a default position for visualization.
        const firstTimeWindow = visit.timeWindows[0];

        // JS Date object handles the ISO 8601 timestamp and timezone offset automatically
        const startDate = firstTimeWindow ? new Date(firstTimeWindow.minStartTime) : new Date();

        // Calculate end date by adding the service duration
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000); // Minutes to milliseconds

        return {
            id: visit.id,
            name: visit.name,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            // For the input model, resourceId is initially null or undefined,
            // placing it in the unassigned area of the Bryntum scheduler.
            resourceId: null as unknown as string, // Cast to string to satisfy BryntumData DTO
            duration: durationMinutes,
            durationUnit: 'minute',
            // Preserve the original priority for display or styling
            priority: visit.priority,
            requiredSkills: visit.requiredSkills.map(s => s.name).join(', '),
            timeWindow: firstTimeWindow ? `${firstTimeWindow.minStartTime} - ${firstTimeWindow.maxEndTime}` : 'N/A'
        };
    }).slice(0, 3);

    // NOTE: This implementation does not currently handle dependencies or assignments,
    // as those would require further mapping of Timefold's itinerary structure.

    const assignments: BryntumAssignment[] = events.map((event: BryntumEvent) => {
        return {
            id: event.id + "_assign",
            event: event.id,
            resource: resources[0].id // Make this static for the moment
        }
    });

    return {
        resources,
        events,
        assignments
    };
};