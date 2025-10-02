import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export function Heatmap() {

    return (
        <CalendarHeatmap
            startDate={new Date('2025-03-01')}
            endDate={new Date('2025-12-31')}

            // dummy data
            
            values={[
                { date: '2025-3-01', count: 5 },
                { date: '2025-3-05', count: 100 },
                { date: '2025-3-25', count: 50 },
                { date: '2025-3-28', count: 175}
            ]}
        />
    )
}