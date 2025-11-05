import { type BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';

const schedulerproProps: BryntumSchedulerProProps = {
    // Basic setup
    startDate: new Date(2022, 2, 23, 2),
    endDate: new Date(2022, 2, 23, 18),
    rowHeight: 60,
    barMargin: 15,
    eventStyle: 'colored',
    viewPreset: 'hourAndDay',

    columns: [
        { type: 'resourceInfo', text: 'Staff', width: 150 }
    ],
};

export { schedulerproProps };