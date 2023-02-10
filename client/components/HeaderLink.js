import React from 'react'
import { Link } from 'react-router-dom'

const link = (url, externalUrl, selected, content) => {
  return externalUrl ? (
    <a href={externalUrl} className={selected ? 'selected' : ''}>
      {content}
    </a>
  ) : (
    <Link to={url} className={selected ? 'selected' : ''}>
      {content}
    </Link>
  )
}

const HeaderLink = ({ url, top, name, selected, externalUrl }) => {
  return top ? (
    <li>
      {link(url, externalUrl, selected, <img src={`/images/page-${name}-2x.png`} />)}
    </li>
  ) : (
    link(url, externalUrl, selected, <li>{name}</li>)
  )
}

export default HeaderLink
