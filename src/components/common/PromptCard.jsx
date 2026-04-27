import Link from "next/link";

export default function PromptCard({ prompt }) {
  return (
    <>
      <Link href={`/prompts/${prompt.id}`}>
        <div>
          <p>{prompt.categoryName}</p>
          <h3>{prompt.title}</h3>
          <p>{prompt.userName}</p>
        </div>
      </Link>
    </>
  );
}
