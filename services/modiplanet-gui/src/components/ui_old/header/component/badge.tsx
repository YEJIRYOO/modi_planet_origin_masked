import classNames from 'classnames';

interface Badge {
  className?: string;
}

export function Badge({ className }) {
  return (
    <div
      className={classNames(
        'mr-1 w-[35px] h-[18px] bg-brand text-white text-[10px] rounded-full flex items-center justify-center',
        className,
      )}
    >
      <p>NEW</p>
    </div>
  );
}

export default Badge;
