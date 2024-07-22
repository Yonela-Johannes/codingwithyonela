import { NoteForm } from "./NoteForm"

export function NewNote({ onSubmit, onAddTag })
{
  const [tags, setTags] = useLocalStorage([])
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={tags}
      />
    </>
  )
}
