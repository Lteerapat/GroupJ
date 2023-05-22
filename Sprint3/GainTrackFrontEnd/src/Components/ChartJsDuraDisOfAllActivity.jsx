import axios from 'axios';
import { 
    Chart as CHARTJS,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

CHARTJS.register(
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
)

const ChartJsDuraDisOfAllActivity = () => {
    const [walkingDuration, setWalkingDuration] = useState();
    const [runningDuration, setRunningDuration] = useState();
    const [swimmingDuration, setSwimmingDuration] = useState();
    const [bikingDuration, setBikingDuration] = useState();
    const [hikingDuration, setHikingDuration] = useState();

    useEffect(() => {
        axios.get('/chartjs/dura-dis').then(({data})=> {
            setWalkingDuration(data.walkingActivitiesDuration)
            setRunningDuration(data.runningActivitiesDuration)
            setSwimmingDuration(data.swimmingActivitiesDuration)
            setBikingDuration(data.bikingActivitiesDuration)
            setHikingDuration(data.hikingActivitiesDuration)
            
        });
    }, []);
    
    const data = {
        labels: ['walking','running', 'swimming', 'biking', 'hiking'],
        datasets: [
            {
                label: 'over all duration in minute',
                data: [walkingDuration,runningDuration,swimmingDuration,bikingDuration,hikingDuration],
                backgroundColor: '#B38BFF',
                borderColor: '#D9C5FF',
                cubicInterpolationMode: 'monotone',
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
            <Line
                style={
                    {}
                }
                data = {data}
                options = {options}
            ></Line>
        </>
    );
};

export default ChartJsDuraDisOfAllActivity