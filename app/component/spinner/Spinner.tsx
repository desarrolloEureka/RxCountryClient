const Spinner = ({ visual, grow }: { visual?: boolean; grow?: boolean }) => {
  const type = grow ? 'spinner-grow' : 'spinner-border';
  return (
      <div className="flex flex-col bg-login-image bg-cover bg-bottom w-full min-h-screen justify-center items-center">
          <div className="flex flex-col justify-center items-center center">
              <div className={`${type} text-primary`} role="status" />
              <span className={`${visual && "visually-hidden"}`}>
                  Loading...
              </span>
          </div>
      </div>
  );
};

export default Spinner;
