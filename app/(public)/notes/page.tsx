import { NotesPageContent } from "@/components/public/notes/notes-page-content";

export const metadata = {
  title: "Lab Notes | Adyuta",
  description:
    "Brief observations, technical findings, and thoughts from the workbench. Documentation of the learning journey.",
};

export default function NotesPage() {
  return (
    <div className="pt-24">
      <NotesPageContent />
    </div>
  );
}
