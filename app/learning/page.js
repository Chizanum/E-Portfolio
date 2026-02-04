import { getContent } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
    title: "Currently Learning | Chizanum Idemili",
    description: "What I'm currently exploring and mastering.",
};

export const dynamic = "force-dynamic";

export default async function LearningPage() {
    const items = await getContent("learning");

    return (
        <div className="space-y-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Currently Learning</h1>
                <p className="text-xl text-base-content/70 font-light">
                    A snapshot of my current intellectual curiosity.
                </p>
            </header>

            <div className="grid gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group card bg-base-100 border border-base-200 hover:border-primary/50 transition-all p-6 hover:shadow-lg"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                                        {item.topic}
                                    </h2>
                                    <span className={`badge badge-sm font-medium
                        ${item.status === 'exploring' ? 'badge-ghost' :
                                            item.status === 'practicing' ? 'badge-secondary badge-outline' :
                                                item.status === 'applying' ? 'badge-primary badge-outline' : 'badge-neutral'}
                    `}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-base-content/80 text-lg leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {item.insights && (
                            <div className="mt-6 pt-4 border-t border-base-200 opacity-80 text-sm italic">
                                <span className="font-semibold not-italic text-primary/80">Insight: </span>
                                {item.insights}
                            </div>
                        )}
                    </div>
                ))}

                {items.length === 0 && (
                    <p className="text-base-content/50 italic">Nothing listed yet. Check back soon.</p>
                )}
            </div>
        </div>
    );
}
