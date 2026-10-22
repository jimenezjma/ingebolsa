import { SiteNav } from "./SiteNav";
import s from "./Lines.module.css";
export function CategoryHeader({ title, description, href, action }: { title: string; description: string; href: string; action: string }) {
  return <header className={s.header}>
    <SiteNav />
    <div className={s.heading}>
      <h1 className={`${s.title} poster`} data-reveal>{title}</h1>
      <div className={s.headerBottom}>
        <p data-reveal>{description}</p>
        <a className="button" href={href} data-reveal>{action}</a>
      </div>
    </div>
  </header>;
}
