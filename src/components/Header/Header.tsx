import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">NoteHub</Link>
      </h1>
      <nav aria-label="Main Navigation">
        <ul className={styles.navList}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/notes">Notes</Link></li>
        </ul>
      </nav>
    </header>
  );
}
