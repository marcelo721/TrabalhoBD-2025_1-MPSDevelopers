import { useId, useState, type SetStateAction } from 'react'
import { type Tag, TagInput as TagField } from 'emblor'

type TagInputProps = {
  tags: Tag[]
  onTagsChange: (tags: SetStateAction<Tag[]>) => void
  placeholder?: string
}

export function TagInput({ tags, onTagsChange, placeholder }: TagInputProps) {
  const id = useId()

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  return (
    <TagField
      id={id}
      tags={tags}
      setTags={onTagsChange}
      styleClasses={{
        tagList: {
          container: 'gap-1',
        },
        input:
          'rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        tag: {
          body: 'relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7',
          closeButton:
            'absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground',
        },
      }}
      placeholder={placeholder}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      inlineTags={false}
      inputFieldPosition="top"
    />
  )
}
