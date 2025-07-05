'use client'
import css from "./error.module.css"

type ErrorProp = {
    error: Error
    reset: () => void
}

const ErrorMessage = ({error, reset}: ErrorProp) => {
    console.log(error);
    return (
    <div>
        <p className={css.error}>Could not fetch the list of notes. {error.message}</p>
        <button onClick={reset} className={css.retry}>Retry</button>
    </div>
    );
};

export default ErrorMessage