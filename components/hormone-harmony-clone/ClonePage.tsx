import fs from "node:fs";
import path from "node:path";
import { CloneRuntime } from "./CloneRuntime";

type ClonePageName = "index" | "cart" | "checkout";

const cloneRoot = path.join(process.cwd(), "hormone harmony clone");

function readCloneBody(page: ClonePageName) {
  const source = fs.readFileSync(path.join(cloneRoot, `${page}.html`), "utf8");
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? source;

  return body
    .replace(/((?:href|src)=["'])assets\//g, "$1/hormone-harmony-clone/assets/")
    .replace(/href=["']index\.html(?=["'#])/g, "href=\"/hormone-harmony")
    .replace(/href=["']cart\.html(?=["'#])/g, "href=\"/hormone-harmony/cart")
    .replace(/href=["']checkout\.html(?=["'#])/g, "href=\"/hormone-harmony/checkout")
    .replace(/<script[\s\S]*?<\/script>/gi, "");
}

export function ClonePage({ page }: { page: ClonePageName }) {
  return (
    <>
      {/* The supplied clone is a self-contained static surface; keep its stylesheet route-scoped. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/hormone-harmony-clone/assets/css/styles.css" />
      <div className="hormone-harmony-clone" dangerouslySetInnerHTML={{ __html: readCloneBody(page) }} />
      <CloneRuntime page={page} />
    </>
  );
}
