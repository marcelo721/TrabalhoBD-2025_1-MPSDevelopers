type InfoCardProps = {
  title: string
  value: string | string[]
}

export function InfoCard({ title, value }: InfoCardProps) {
  return (
    <div className="bg-accent/30 border-border flex w-full flex-col rounded-sm border p-1">
      <span className="text-xs uppercase">{title}:</span>
      <br />
      <strong className="text-base leading-tight font-semibold">
        {Array.isArray(value) ? (
          <ul className="list-none">
            {value.map((item, index) => (
              <li key={index} className="text-base leading-tight">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-base leading-tight">{value}</span>
        )}
      </strong>
    </div>
  )
}
