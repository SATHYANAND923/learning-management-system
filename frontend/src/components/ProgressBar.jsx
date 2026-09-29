export default function ProgressBar({ value, showLabel = true }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div>
      {showLabel && (
        <div className="progress-label-row">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
