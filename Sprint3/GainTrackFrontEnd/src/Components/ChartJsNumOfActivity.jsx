import axios from 'axios';
import { 
    Chart as CHARTJS,
    BarElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';

CHARTJS.register(
    BarElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
)

const ChartJsNumOfActivity = () => {
    const [walkingActivities, setWalkingActivities] = useState();
    const [runningActivities, setRunningActivities] = useState();
    const [swimmingActivities, setSwimmingActivities] = useState();
    const [bikingActivities, setBikingActivities] = useState();
    const [hikingActivities, setHikingActivities] = useState();

    useEffect(() => {
        axios.get('/chartjs/numOfActivity').then(({data})=> {
            setWalkingActivities(data.walkingActivities)
            setRunningActivities(data.runningActivities)
            setSwimmingActivities(data.swimmingActivities)
            setBikingActivities(data.bikingActivities)
            setHikingActivities(data.hikingActivities)

            
        });
    }, []);
    
    const data = {
        labels: ['walking','running', 'swimming', 'biking', 'hiking'],
        datasets: [
            {
                label: 'number of activity',
                data: [walkingActivities,runningActivities,swimmingActivities,bikingActivities,hikingActivities],
                backgroundColor: '#B38BFF',
            },
            
        ]
    }

    const options = {
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                grid: {
                    drawOnChartArea: false,
                    beginAtZero: false
                },
                ticks: {
                    color: 'white',
                    precision: 0
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    }

    

    
    return (
        <>
            <Bar
                style={
                    {}
                }
                data = {data}
                options = {options}
            ></Bar>
        </>
    );
};

export default ChartJsNumOfActivity