/* Tells the Marketing Dashboard an order was paid, through the same Apps Script web app that
   receives quiz leads. It flags the matching Quiz Leads rows as a customer, fills their phone and
   address, and adds the person to the Customer CRM. Never throws: a sheet problem must not fail
   the order webhook, which has already made the Shopify order by the time this runs. */
export type SheetOrder = {
  email: string;
  name: string;
  phone: string;
  address: string;
  orderName: string;
  /** "10/12/2026, 1:37:49 PM", Eastern, same shape as the Date column. */
  purchasedAt: string;
  /** "10/12/2026" */
  purchaseDate: string;
};

export async function recordOrderInSheet(order: SheetOrder): Promise<void> {
  const url = process.env.LEADS_SHEET_URL;
  const secret = process.env.LEADS_SHEET_SECRET;
  if (!url || !secret) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ secret, action: "order", order }),
      signal: AbortSignal.timeout(10_000),
    });
    const text = await res.text();
    if (!res.ok || !text.startsWith("ok")) console.error("leads sheet order", order.orderName, res.status, text.slice(0, 120));
  } catch (e) {
    console.error("leads sheet order failed", order.orderName, e);
  }
}

const ET = "America/New_York";

/** The two date strings the sheet wants, from a JS date. */
export function sheetDates(d: Date): { purchasedAt: string; purchaseDate: string } {
  return {
    purchasedAt: d.toLocaleString("en-US", { timeZone: ET }),
    purchaseDate: d.toLocaleDateString("en-US", { timeZone: ET, year: "numeric", month: "2-digit", day: "2-digit" }),
  };
}
