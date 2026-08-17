/** Every price in the system is an integer. `$49`, never `$49.00` or `$49.99`. */
export function formatPrice(value: number): string {
  return "$" + Math.round(value).toLocaleString("en-US");
}

/**
 * Half price, rounded DOWN to a whole dollar so the figure stays an integer and
 * the rounding never goes against the customer. $39 becomes $19, not $20.
 * Derive the first-order figure with this, never by hand.
 */
export function firstOrderPrice(price: number, percent = 50): number {
  return Math.floor(Math.round(price) * (1 - percent / 100));
}
