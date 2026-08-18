/**
 * A simplified US flag for the made-in-the-USA badge. Thirteen stripes and a canton,
 * with a suggestion of stars rather than fifty of them: at 24px the real arrangement
 * is a grey smudge. Drawn rather than set as an emoji, which the system bars.
 */
export function UsaFlag({ size = 24 }: { size?: number }) {
  const W = 26;
  const H = 14;
  const stripe = H / 13;

  return (
    <svg width={size} height={(size * H) / W} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="United States">
      <rect width={W} height={H} rx="1.5" fill="#FFFFFF" />
      {/* Seven red stripes, drawn over the white ground on the odd rows. */}
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * stripe} width={W} height={stripe} fill="#B22234" />
      ))}
      <rect width={W * 0.42} height={stripe * 7} fill="#3C3B6E" />
      {[1.6, 4.3, 7.0, 9.7].map((x) =>
        [1.3, 3.2, 5.1, 7.0].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.55" fill="#FFFFFF" />),
      )}
      <rect x="0.4" y="0.4" width={W - 0.8} height={H - 0.8} rx="1.2" fill="none" stroke="#DCDCD6" strokeWidth="0.8" />
    </svg>
  );
}
