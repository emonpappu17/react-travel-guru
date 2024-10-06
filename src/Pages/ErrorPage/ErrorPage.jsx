import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    // console.log(error);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center space-y-4">
                <h1 className="text-5xl">Oops!</h1>
                <p className="text-2xl">{error.statusText || error.error.message}</p>
                <Link to="/"><button className="btn mt-3">Go to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;