import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <p>
        Developer: Ihor | Contact: {' '}
        <a href="mailto:student@notehub.app" target="_blank" rel="noopener noreferrer">
          student@notehub.app
        </a>
      </p>
    </footer>
  );
}
