interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;