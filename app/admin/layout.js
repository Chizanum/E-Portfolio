import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-base-100 border-r border-base-300 min-h-screen p-6 hidden md:flex flex-col gap-6 sticky top-0 h-screen">
                <div className="text-xl font-bold flex items-center gap-2">
                    <LayoutDashboard size={24} className="text-primary" />
                    Admin
                </div>

                <nav className="flex flex-col gap-2">
                    <Link href="/admin" className="btn btn-ghost justify-start gap-2">Home</Link>
                    <div className="divider my-0"></div>
                    <Link href="/admin/learning" className="btn btn-ghost btn-sm justify-start font-normal">Learning</Link>
                    <Link href="/admin/weekly" className="btn btn-ghost btn-sm justify-start font-normal">Weekly</Link>
                    <Link href="/admin/concepts" className="btn btn-ghost btn-sm justify-start font-normal">Concepts</Link>
                    <Link href="/admin/projects" className="btn btn-ghost btn-sm justify-start font-normal">Projects</Link>
                </nav>

                <div className="mt-auto">
                    <Link href="/" className="btn btn-outline btn-sm w-full gap-2">
                        <ArrowLeft size={16} /> Back to Site
                    </Link>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden bg-base-100 p-4 border-b border-base-300 flex justify-between items-center sticky top-0 z-30">
                <div className="font-bold flex gap-2"><LayoutDashboard /> Admin</div>
                <Link href="/" className="btn btn-xs btn-outline">Exit</Link>
            </div>

            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
