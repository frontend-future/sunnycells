import Link from "next/link";

export default function ThanksPage() {
  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "64px 20px", textAlign: "center", color: "var(--ink)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, margin: "0 0 12px" }}>Thank you</h1>
      <p style={{ fontSize: 20, fontWeight: 500, margin: "0 0 28px" }}>Your order is in. Your Inside-Out Itch Bundle and free gifts are on the way.</p>
      <Link href="/" style={{ color: "var(--cobalt)", fontSize: 18, fontWeight: 700 }}>Back to Friday Zoomies</Link>
    </main>
  );
}
