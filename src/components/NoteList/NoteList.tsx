"use client";

import React from "react";
import Link from "next/link";
import { Note } from "@/types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.item}>
          <Link href={`/notes/${note.id}`} className={styles.link}>
            <h2 className={styles.title}>{note.title}</h2>
            <p className={styles.preview}>{note.body.slice(0, 100)}...</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
