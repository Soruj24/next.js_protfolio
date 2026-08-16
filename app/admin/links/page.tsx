import LinksManager from "./LinksManager";

export const metadata = {
  title: "Links | Admin",
};

export default function AdminLinksPage() {
  return (
    <div className="p-6">
      <LinksManager />
    </div>
  );
}
