import AppShell from "../components/AppShell";
import Table from "../components/Table";
import BookForm from "../components/BookForm";
import BookCard from "../components/BookCard";


export default function RecordPage() {
  return (
      <>
        <AppShell activePage="Records"></AppShell>
        <Table></Table>
        <BookCard></BookCard>
      </>
  )
}
