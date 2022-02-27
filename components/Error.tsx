const Error = ({
  message = "An error has occurred.",
}: {
  message?: string;
}) => (
  <div role="status" aria-live="polite" className="text-red-500">
    {message}
  </div>
);

export default Error;
