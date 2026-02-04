import { getContent } from "@/lib/content";

export const metadata = {
    title: "Weekly Learnings | Chizanum Idemili",
    description: "A chronological log of my growth.",
};

export const dynamic = "force-dynamic";

export default async function WeeklyPage() {
    const items = await getContent("weekly");
    // Sort by date desc (if dates conform to ISO) or id descending
    // Assuming simple structure for now.
    const sortedItems = [...items].reverse();

    return (
        <div className="space-y-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Weekly Learnings</h1>
                <p className="text-xl text-base-content/70 font-light">
                    Compound interest, applied to knowledge.
                </p>
            </header>

            <div className="space-y-8 relative border-l border-base-300 ml-3 md:ml-6 pl-8 md:pl-12 py-2">
                {sortedItems.map((week) => (
                    <div key={week.id} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[39px] md:-left-[55px] top-1 w-5 h-5 rounded-full bg-base-100 border-2 border-primary z-10"></div>

                        <div className="space-y-3 mb-10">
                            <span className="text-sm font-mono text-primary/80 tracking-widest uppercase">
                                {week.date || week.id}
                            </span>

                            <div className="card bg-base-100 border border-base-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <ul className="space-y-3 list-disc list-outside ml-4 text-lg text-base-content/90">
                                    {Array.isArray(week.learnings) ? week.learnings.map((learning, idx) => (
                                        <li key={idx} className="pl-2">{learning}</li>
                                    )) : (
                                        <li>{week.learnings}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
