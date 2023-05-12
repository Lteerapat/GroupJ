import { useRouteError } from "react-router-dom";
import '../Styles/Error.css';

const Error = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="error-text">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default Error;