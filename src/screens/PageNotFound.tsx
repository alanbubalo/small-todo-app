import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};
