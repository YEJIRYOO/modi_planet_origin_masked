interface ISpinnerLoader {
  className?: string;
}

function SpinnerLoader({ className }: ISpinnerLoader) {
  return (
    <img
      className={className}
      src="/assets/loading/spinner-loading.gif"
      alt="spinner"
    />
  );
}

export default SpinnerLoader;
