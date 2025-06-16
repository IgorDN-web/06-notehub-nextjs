import styles from './page.module.css';

export default function Home() {
  return (
    <section className={styles.container}>
      <h1>Welcome to NoteHub</h1>
      <p>NoteHub is a simple, clean app to manage your personal notes efficiently.</p>
      <p>Browse your notes, add new ones, and keep organized.</p>
    </section>
  );
}
