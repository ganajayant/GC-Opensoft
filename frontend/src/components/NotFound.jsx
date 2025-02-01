import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>404 Not Found</h1>
            <button onClick={() => navigate('/home')}>Go Back</button>
        </div>
    );
};