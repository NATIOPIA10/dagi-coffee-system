import AdminSidebar from "./components/AdminSidebar";
import AdminAuthGuard from "./components/AdminAuthGuard";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-surface-container-lowest text-on-surface">
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-surface">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
