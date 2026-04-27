'use client'
import CategoryFilter from "@/components/home/CategoryFilter"
import PromptList from "@/components/home/PromptList"

export default function HomePage() {
  return (
    <main>
      <h1>프롬프트 저장소</h1>
      <CategoryFilter />
      <PromptList />
    </main>
  )
}