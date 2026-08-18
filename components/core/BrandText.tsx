import { Fragment } from "react";
import { Wordmark } from "./Wordmark";

const TOKEN = "SUNNYCELLS";

/**
 * Renders a line of copy with the brand name set in the display face rather than the
 * text face it happens to be sitting in. Write SUNNYCELLS in the string and it comes
 * out as the wordmark, sized to whatever it sits inside.
 */
export function BrandText({ children }: { children: string }) {
  const parts = children.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 ? <Wordmark size="1em" style={{ display: "inline" }} /> : null}
          {part}
        </Fragment>
      ))}
    </>
  );
}
