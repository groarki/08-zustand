import { Tags } from "@/types/note";
import css from "./SidebarNotes.module.css"
import Link from "next/link";

const tags: Tags[] = ["Work",  "Personal",  "Meeting",  "Shopping", "Todo"]

const SidebarNotes = () => {

    return (
        <div className={css.container}>
           <div className={css.sidebar}>
               <ul className={css.menuList}>
                    <li className={css.menuItem}>
                        <Link href={'/notes/filter/all'} className={css.menuLink}>All Notes</Link>
                    </li>
                    {tags.map((tag) => (<li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
                ))}
                </ul>
           </div>
        </div>
    )
};
export default SidebarNotes