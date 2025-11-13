// Bryntum uses 'ResourceModel' for schedulable items (like staff/vehicles)
export interface BryntumResource {
    id: string;
    name: string;
    // Add other necessary resource fields here
}

// Bryntum uses 'EventModel' for scheduled items (like visits/tasks)
export interface BryntumEvent {
    id: string;
    name: string;
    startDate: Date | string;
    endDate: Date | string;
    // In Bryntum SchedulerPro, the 'resourceId' links the event to the resource
    resourceId: string;
    // Add other necessary event fields here
}

export interface BryntumAssignment {
    id: string,
    event: string, // Event ID
    resource: string // Resource ID
}

/**
 * Types representing the core data structure needed by Bryntum SchedulerPro.
 * This structure is typically passed as props (or via data stores).
 */
export interface BryntumData {
    resources: BryntumResource[];
    events: BryntumEvent[];
    assignments: BryntumAssignment[];
    // SchedulerPro also often deals with dependencies and assignments,
    // but we'll focus on resources and events for this initial step.
}