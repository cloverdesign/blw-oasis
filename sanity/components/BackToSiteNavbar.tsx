import { NavbarProps } from 'sanity'
import Link from 'next/link'
import { ArrowLeft } from 'iconoir-react'

export function BackToSiteNavbar(props: NavbarProps) {
  return (
    <div>
      <div style={{ padding: '8px 16px', background: '#101112' }}>
        <Link
          href="/"
          className="flex items-center gap-2 text-white text-sm"
        >
          <ArrowLeft className="size-4" />
          Back to Website
        </Link>
      </div>
      {props.renderDefault(props)}
    </div>
  )
}
