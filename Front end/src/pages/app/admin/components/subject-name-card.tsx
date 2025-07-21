import { Blocks } from 'lucide-react'

type SubjectNameCardProps = {
  subjectName: string
}

export function SubjectNameCard({ subjectName }: SubjectNameCardProps) {
  return (
    <div className="bg-accent/50 border-border group hover:bg-accent/70 h-fit w-full cursor-pointer overflow-hidden rounded-md border transition-colors">
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
        <Blocks className="text-accent size-6" />
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-xs">DISCIPLINA</span>
        <strong className="text-base first-letter:uppercase">
          {subjectName}
        </strong>
      </div>
    </div>
  )
}
