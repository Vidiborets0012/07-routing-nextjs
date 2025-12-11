import css from "./EmptyState.module.css";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export default function EmptyState({
  title = "This section is currently empty.",
  subtitle = "Create your first note.",
}: EmptyStateProps) {
  return (
    <div className={css.wrapper}>
      <svg
        className={css.illustration}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="70"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.25"
          className={css.circle}
        />

        <rect
          x="60"
          y="55"
          width="80"
          height="100"
          rx="8"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.9"
        />

        <line
          x1="75"
          y1="80"
          x2="125"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.6"
        />
        <line
          x1="75"
          y1="100"
          x2="135"
          y2="100"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.4"
        />
        <line
          x1="75"
          y1="120"
          x2="110"
          y2="120"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.4"
        />
      </svg>

      <p className={css.text}>
        {title}
        <span>{subtitle}</span>
      </p>
    </div>
  );
}
