import styles from "./membership.module.css";

/* One vet and one dog per step, so no two screens share a photo (except the two cancelled ones). */
const ALT: Record<string, string> = {
  email: "A smiling veterinarian beside a happy Corgi",
  sent: "A friendly veterinarian with a content Beagle",
  home: "A smiling veterinarian petting a calm Border Collie",
  price: "A veterinarian in a white coat resting a hand on a sad yellow Labrador",
  much: "A veterinarian sitting on the floor beside a sad Golden Retriever",
  results: "A veterinarian holding the paw of a worried pit bull on an exam table",
  better: "A veterinarian with a gentle German Shepherd",
  eat: "A veterinarian looking kindly at a sad little Shih Tzu mix",
  other: "A veterinarian listening to a sad Boxer's heartbeat",
  skip: "A veterinarian showing a calendar card to an attentive Husky",
  confirm: "A veterinarian comforting a sad Bernese Mountain Dog",
  kept: "A veterinarian giving a happy dog a high five",
  cancelled: "A gentle veterinarian sitting beside a sad Dachshund in a blanket",
};

export default function Photo({ k }: { k: string }) {
  return <img className={styles.photo} src={`/quiz/fridayzoomies/membership/vet-${k}.jpg`} alt={ALT[k] ?? ""} width={960} height={720} />;
}
