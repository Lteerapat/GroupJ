import axios from 'axios';
import { 
    Chart as CHARTJS,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale, //y
    Tooltip,
    Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

import { Bar, Doughnut } from 'react-chartjs-2';

CHARTJS.register(
    BarElement,
    ArcElement,
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
            console.log(data)
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
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1,
            },
            
        ]
    }

    const options = {

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