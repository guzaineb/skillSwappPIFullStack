const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="d-none d-lg-flex justify-content-center align-items-center bg-light p-5">
      <div className="text-center max-w-md">
        <div className="row row-cols-3 g-3 mb-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-3 shadow-sm bg-primary opacity-10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              style={{ width: "80px", height: "80px" }}
            />
          ))}
        </div>
        <h2 className="fs-2 fw-bold mb-3">{title}</h2>
        <p className="text-muted">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
