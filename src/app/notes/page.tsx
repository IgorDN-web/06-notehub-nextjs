import NotesClient from './Notes.client';

export const revalidate = 0;

export default async function NotesPage() {
  // Данные будут подгружены внутри клиента через React Query
  return (
    <section>
      <NotesClient />
    </section>
  );
}
