import styles from "./brain.module.css";

/** Stands in for the pack shot until real photography exists. See the
    PHOTOGRAPHY FLAG in lib/products/brain.ts. */
export function BrainGallery() {
  return (
    <div className={styles.gallery}>
      <div className={styles.galleryStage}>
        <div className={`${styles.galleryShot} ${styles.placeholder}`} style={{ aspectRatio: "1 / 1" }}>
          Clear Mind
          <br />
          product photo
        </div>
      </div>
    </div>
  );
}
