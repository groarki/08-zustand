'use client'

import css from "./TagsMenu.module.css"
import type {Tags} from "../../types/note" 
import Link from "next/link";
import { useState } from "react";

const tags: Tags[] = ["Work",  "Personal",  "Meeting",  "Shopping", "Todo"]

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
        setIsOpen(!isOpen)
    };
  

    return (
        <div className={css.menuContainer}>
            <button onClick={toggle} className={css.menuButton}>
            Notes ▾
        </button>
            {isOpen && <ul className={css.menuList}>
                <li className={css.menuItem}>
                    <Link href={'/notes/filter/all'} className={css.menuLink}>All Notes</Link>
                </li>
                {tags.map((tag) => (<li key={tag} className={css.menuItem}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                    {tag}
                </Link>
            </li>
            ))}
        </ul> }
        </div>
    )
};
export default TagsMenu