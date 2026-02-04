import Link from "next/link";
import { BookOpen, Calendar, Lightbulb, FolderKanban } from "lucide-react";

const adminSections = [
    {
        title: "Currently Learning",
        description: "Manage your active learning topics.",
        icon: <BookOpen className="w-8 h-8 mb-2 text-primary" />,
        href: "/admin/learning",
        color: "bg-primary/10 text-primary",
    },
    {
        title: "Weekly Learnings",
        description: "Log your weekly progress and insights.",
        icon: <Calendar className="w-8 h-8 mb-2 text-secondary" />,
        href: "/admin/weekly",
        color: "bg-secondary/10 text-secondary",
    },
    {
        title: "Concepts",
        description: "Explain concepts you've mastered.",
        icon: <Lightbulb className="w-8 h-8 mb-2 text-accent" />,
        href: "/admin/concepts",
        color: "bg-accent/10 text-accent",
    },
    {
        title: "Projects",
        description: "Showcase your mini-projects.",
        icon: <FolderKanban className="w-8 h-8 mb-2 text-info" />,
        href: "/admin/projects",
        color: "bg-info/10 text-info",
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-base-content/60">Manage your portfolio content from here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminSections.map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="card bg-base-100 shadow-sm border border-base-200 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer group"
                    >
                        <div className="card-body">
                            <div className={`p-3 rounded-xl w-fit ${section.color} mb-2 group-hover:scale-110 transition-transform`}>
                                {section.icon}
                            </div>
                            <h2 className="card-title text-xl">{section.title}</h2>
                            <p className="text-base-content/70">{section.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
