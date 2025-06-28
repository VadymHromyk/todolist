type Props = {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ title, onClick, disabled, className }: Props) => {
  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {title}
    </button>
  );
};
