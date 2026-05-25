type SearchParamsLike = {
  get(name: string): string | null;
};

/** Query params Stripe may send when redirecting back after a successful Payment Link / Checkout. */
export function isStripePaymentReturnSuccess(params: SearchParamsLike): boolean {
  if (params.get("payment") === "success") return true;
  if (params.get("redirect_status") === "succeeded") return true;

  const sessionId = params.get("session_id");
  if (sessionId?.startsWith("cs_")) return true;

  return false;
}
