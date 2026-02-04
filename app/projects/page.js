import { getContent } from "@/lib/content";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Mini Projects | Chizanum Idemili",
    description: "Small builds to cement my learning.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
    const items = await getContent("projects");

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-4 max-w-3xl mx-auto text-center md:text-left">
                <h1 className="text-4xl font-bold tracking-tight">Mini Projects</h1>
                <p className="text-xl text-base-content/70 font-light">
                    Proof of work. Small, focused, completed.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((project) => (
                    <div
                        key={project.id}
                        className="group card bg-base-100 shadow-sm border border-base-200 hover:shadow-xl hover:border-primary/50 transition-all duration-300 overflow-hidden relative"
                    >
                        <div className="card-body">
                            <h2 className="card-title text-2xl group-hover:text-primary transition-colors">
                                {project.title}
                            </h2>

                            <div className="flex flex-wrap gap-2 my-2">
                                {Array.isArray(project.tools) && project.tools.map((tool) => (
                                    <span key={tool} className="badge badge-sm badge-neutral">{tool}</span>
                                ))}
                            </div>

                            <p className="text-base-content/70 mb-4">{project.goal}</p>

                            {/* Hover Overlay/Reveal */}
                            <div className="absolute inset-x-0 bottom-0 bg-base-100/95 backdrop-blur-sm p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-base-200 flex flex-col h-3/4">
                                <div className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-thin">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-primary sticky top-0 bg-base-100/95 pb-2">What I Learned</h4>
                                    <p className="text-sm leading-relaxed">{project.learned}</p>
                                </div>

                                <div className="pt-4 flex justify-end shrink-0">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-primary gap-2"
                                        >
                                            View Project <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Make sure content doesn't get covered completely if user is on mobile/no hover? Mobile usually treats tap as hover. */}
                        <div className="card-actions justify-end p-6 pt-0 md:hidden">
                            <Link href={project.link || "#"} className="btn btn-sm btn-ghost">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
            {items.length === 0 && (
                <p className="text-base-content/50 italic text-center">No projects showcased yet.</p>
            )}
        </div>
    );
}
