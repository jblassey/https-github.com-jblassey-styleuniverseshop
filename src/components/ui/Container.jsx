/**
 * Page-width container with the site's standard responsive gutters.
 * Use this instead of repeating max-width/padding utilities on every page.
 */
export default function Container({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={`container-page ${className}`}>{children}</Tag>;
}
