interface ILogoSpinnerLoader {
  className: string;
}

function LogoSpinnerLoader({ className }: ILogoSpinnerLoader) {
  return (
    <img
      className={className}
      src="/assets/loading/logo-spinner-loading.gif"
      alt="spinner"
    />
  );
}

export default LogoSpinnerLoader;
