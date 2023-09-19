import emptyState from "../assets/images/no-results.png";

export const EmptyState = ({ title }) => (
  <div className="grid place-items-center">
    <div className="max-w-xs text-center h-96">
      <img src={emptyState} alt="no results icon" width={300} height={300} />
      <h1 className="mt-6 text-xl text-gray-200">{title}</h1>
    </div>
  </div>
);
