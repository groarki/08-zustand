'use client'

type ErrorProp = {
    error: Error
    reset: () => void
}

const ErrorMessage = ({error, reset}: ErrorProp) => {
    console.log(error);
    return (
    <div>
        <p >Could not fetch the list of notes. {error.message}</p>
        <button onClick={reset}>Retry</button>
    </div>
    );
};

export default ErrorMessage