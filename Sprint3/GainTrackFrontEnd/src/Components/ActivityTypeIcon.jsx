import "@fortawesome/fontawesome-free/css/all.min.css";

const ActivityCardIcon = ({activityCard, className=null}) => {
    switch (activityCard.activity_type) {
        case 'walking':
            className = 'fa-solid fa-person-walking';
            break;
        case 'running':
            className = 'fa-sharp fa-solid fa-person-running';
            break;
        case 'biking':
            className = 'fa-sharp fa-solid fa-person-biking';
            break;
        case 'swimming':
            className = 'fa-sharp fa-solid fa-person-swimming';
            break;
        case 'hiking':
            className = 'fa-sharp fa-solid fa-person-hiking';
            break;
        default:
            className = '';
    }
    return (
        <i className={className}></i>
    );
};

export default ActivityCardIcon;