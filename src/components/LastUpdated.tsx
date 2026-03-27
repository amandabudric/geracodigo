interface LastUpdatedProps {
  date: string
  isoDate?: string
}

export default function LastUpdated({ date, isoDate }: LastUpdatedProps) {
  return (
    <p className="text-xs text-gray-400 mt-2">
      Atualizado em <time dateTime={isoDate ?? date}>{date}</time>
    </p>
  )
}
