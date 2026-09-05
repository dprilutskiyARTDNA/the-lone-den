/**
 * Waitlist + seller application submissions.
 * Persists locally until Lovable Cloud is enabled, then swap these two
 * functions for database inserts.
 */

export type SellerApplication = {
  name: string;
  email: string;
  brand: string;
  link: string;
  gearType: string;
  dropVolume: string;
};

function push(key: string, value: unknown) {
  try {
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push({ ...(value as object), created_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(prev));
  } catch {
    /* storage unavailable — fail silently */
  }
}

export async function submitWaitlist(email: string) {
  push("den_waitlist", { email });
}

export async function submitSellerApplication(app: SellerApplication) {
  push("den_seller_applications", app);
}
