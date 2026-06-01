import Link from "next/link";
import styles from "./PromptCard.module.css";

export default function PromptCard({ prompt }) {
  return (
    <Link href={`/prompts/${prompt.promptId}`}>
      <div className={styles.card}>
        <span className={styles.category}>{prompt.categoryName}</span>
        <h3 className={styles.title}>{prompt.title}</h3>
        <p className={styles.author}>{prompt.userName}</p>
      </div>
    </Link>
  );
}


// -----------------------------------------------
// 백엔드 연동 전 코드
// -----------------------------------------------

// export default function PromptCard({ prompt }) {
//   return (
//     <Link href={`/prompts/${prompt.id}`}>
//       <div className={styles.card}>
//         <span className={styles.category}>{prompt.categoryName}</span>
//         <h3 className={styles.title}>{prompt.title}</h3>
//         <p className={styles.author}>{prompt.userName}</p>
//       </div>
//     </Link>
//   );
// }
