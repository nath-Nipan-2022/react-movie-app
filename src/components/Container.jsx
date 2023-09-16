const Container = ({ className, children }) => {
  return (
    <div className={`p-6 md:px-8 w-container mx-auto ${className || ""}`}>
      {children}
    </div>
  );
};
export default Container;
