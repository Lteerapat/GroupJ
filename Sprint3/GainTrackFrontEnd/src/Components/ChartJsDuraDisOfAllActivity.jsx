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
                label: 'number of activity',
                data: [walkingDuration,runningDuration,swimmingDuration,bikingDuration,hikingDuration],
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

export default ChartJsDuraDisOfAllActivity