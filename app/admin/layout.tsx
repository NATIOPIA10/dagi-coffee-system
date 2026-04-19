import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-surface-container-lowest text-on-surface">
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-surface">
        {children}
      </main>
    </div>
  );
}
