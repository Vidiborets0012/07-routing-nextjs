import css from "./InlineError.module.css";

interface InlineErrorProps {
  message: string;
}

export default function InlineError({ message }: InlineErrorProps) {
  if (!message) return null;

  return (
    <div className={css.wrapper}>
      <svg className={css.icon} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="7" x2="12" y2="13" />
        <circle cx="12" cy="17" r="1" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
