import { LinkedTitle } from '../utils/resumeTypes'

interface TitleLinkProps {
  title: LinkedTitle
}

export default function TitleLink({ title }: TitleLinkProps): JSX.Element {
  if (title.url) {
    return (
      <a
        href={title.url}
        target="_blank"
        rel="noopener noreferrer"
        className="experience-title-link experience-link"
      >
        <span className="experience-title">{title.text}</span>
      </a>
    )
  }
  return <span className="experience-title">{title.text}</span>
}
