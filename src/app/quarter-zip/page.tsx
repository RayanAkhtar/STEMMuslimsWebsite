"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./quarter-zip.module.scss";
import {
  quarterZipPaymentSuccessPath,
  quarterZipStripePaymentLink,
} from "@/lib/globalVariables";
import { isStripePaymentReturnSuccess } from "@/lib/quarterZipPayment";

const QUARTER_ZIP_PATH = quarterZipPaymentSuccessPath.split("?")[0];

const SIZE_ROWS = [
  { size: "XS", chest: 49, bodyLength: 66, sleeve: 61 },
  { size: "S", chest: 54, bodyLength: 68, sleeve: 63 },
  { size: "M", chest: 59, bodyLength: 70, sleeve: 66 },
  { size: "L", chest: 64, bodyLength: 72, sleeve: 68 },
  { size: "XL", chest: 67, bodyLength: 74, sleeve: 69 },
  { size: "XXL", chest: 71, bodyLength: 76, sleeve: 70 },
  { size: "3XL", chest: 74, bodyLength: 78, sleeve: 71 },
] as const;

function PaymentConfirmationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-thank-you-title"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalIcon} aria-hidden="true">
          ✓
        </div>
        <h3 id="payment-thank-you-title" className={styles.modalTitle}>
          Payment successful
        </h3>
        <p className={styles.modalLead}>Jazakhallah Kheir</p>
        <p className={styles.modalBody}>
          Thank you for your order. You will receive a confirmation email from
          Stripe shortly.
        </p>
        <button type="button" className={styles.modalClose} onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

function QuarterZipPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const closePaymentModal = useCallback(() => {
    setShowPaymentModal(false);
    router.replace(QUARTER_ZIP_PATH);
  }, [router]);

  useEffect(() => {
    if (isStripePaymentReturnSuccess(searchParams)) {
      setShowPaymentModal(true);
    }
  }, [searchParams]);

  const stripeLink = quarterZipStripePaymentLink.startsWith("http")
    ? quarterZipStripePaymentLink
    : undefined;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <h1>STEM Muslims Quarter Zip</h1>
          <p>
            Order your official STEM Muslims quarter zip. Comfortable fit with
            room to layer — check the sizing guide below before you buy.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <header className={styles.productHeader}>
          <h2>Official STEM Muslims Quarter Zip</h2>
          <p className={styles.description}>
            Premium quality quarter zip featuring STEM Muslims branding — ideal
            for events, campus, and representing the society.
          </p>
        </header>

        <section className={styles.gallery} aria-label="Quarter zip images">
          <figure className={styles.galleryItem}>
            <Image
              src="/quarter-zip/front.jpg"
              alt="STEM Muslims quarter zip — front view"
              width={822}
              height={702}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.galleryImage}
              priority
            />
            <figcaption>Front</figcaption>
          </figure>
          <figure className={styles.galleryItem}>
            <Image
              src="/quarter-zip/back.jpg"
              alt="STEM Muslims quarter zip — back view"
              width={818}
              height={718}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.galleryImage}
            />
            <figcaption>Back</figcaption>
          </figure>
        </section>

        <section className={styles.productInfo}>
          <p className={styles.price}>Price shown at checkout</p>
          {stripeLink ? (
            <a href={stripeLink} className={styles.purchaseButton}>
              Purchase quarter zip
            </a>
          ) : (
            <span
              className={styles.purchaseButton}
              style={{ opacity: 0.65, cursor: "not-allowed" }}
              title="Stripe payment link coming soon"
            >
              Purchase quarter zip (link coming soon)
            </span>
          )}
        </section>

        <section className={styles.sizingSection} aria-labelledby="sizing-heading">
          <h2 id="sizing-heading">Sizing</h2>
          <p className={styles.sizingNote}>
            Measurements in cm. Body length taken from high point shoulder (HPS).
            Fits true to size with room to layer — size down for a closer fit.
          </p>
          <div className={styles.tableWrapper}>
            <table className={styles.sizeTable}>
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  <th scope="col">Chest</th>
                  <th scope="col">Body length (HPS)</th>
                  <th scope="col">Sleeve length</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_ROWS.map((row) => (
                  <tr key={row.size}>
                    <td>{row.size}</td>
                    <td>{row.chest}</td>
                    <td>{row.bodyLength}</td>
                    <td>{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showPaymentModal && (
        <PaymentConfirmationModal onClose={closePaymentModal} />
      )}
    </main>
  );
}

export default function QuarterZipPage() {
  return (
    <Suspense fallback={null}>
      <QuarterZipPageContent />
    </Suspense>
  );
}
