// import { type BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';

// const schedulerproProps: BryntumSchedulerProProps = {

//     startDate  : new Date(2022, 2, 23, 2),
//     endDate    : new Date(2022, 2, 23, 18),
//     rowHeight  : 60,
//     barMargin  : 15,
//     eventStyle : 'colored',
//     viewPreset : 'hourAndDay',

//     columns : [
//         { type : 'resourceInfo', width : 150 }
//     ],

//     project : {
//         autoLoad  : true,
//         transport : {
//             load : {
//                 url : 'data.json'
//             }
//         }
//     }

// };

// export { schedulerproProps };

import { type BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';

const schedulerproProps: BryntumSchedulerProProps = {
    // Basic setup
    startDate  : new Date(2022, 2, 23, 2),
    endDate    : new Date(2022, 2, 23, 18),
    rowHeight  : 60,
    barMargin  : 15,
    eventStyle : 'colored',
    viewPreset : 'hourAndDay',

    columns : [
        { type : 'resourceInfo', text: 'Staff', width : 150 }
    ],

    // --- TEST DATA ---
    // Added inline data to bypass file loading
    // resources : [
    //     { id : 1, name : 'Alice' },
    //     { id : 2, name : 'Bob' }
    // ],

    // events : [
    //     { id : 1, resourceId : 1, name : 'Meeting', startDate : '2022-03-23T04:00:00', endDate : '2022-03-23T06:00:00' },
    //     { id : 2, resourceId : 2, name : 'Dev Task', startDate : '2022-03-23T07:00:00', endDate : '2022-03-23T10:00:00' }
    // ],
    
    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'data.json'
            }
        }
    }
};

export { schedulerproProps };