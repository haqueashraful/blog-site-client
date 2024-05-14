
import { useNavigate } from 'react-router-dom';
import error from '../assets/404-computer.svg';

const ErrorPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // This will navigate to the previous page
    };

    return (
        <div className='flex flex-col justify-center items-center space-y-3'>
            <div>
                <img src={error} alt="Error" />
            </div>
            <div>
                <h1 className='text-3xl font-bold text-secondary'>Oops! Something went wrong.</h1>
            </div>
            <div>
                <button onClick={goBack} className="btn btn-secondary">Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;
