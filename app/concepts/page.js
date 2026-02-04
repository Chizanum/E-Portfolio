import { getContent } from "@/lib/content";

export const metadata = {
    title: "Concepts | Chizanum Idemili",
    description: "Things I finally understood.",
};

export const dynamic = "force-dynamic";

export default async function ConceptsPage() {
    const items = await getContent("concepts");

    return (
        <div className="space-y-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Concepts</h1>
                <p className="text-xl text-base-content/70 font-light">
                    The "Aha!" moments that stick.
                </p>
            </header>

            <div className="flex flex-col gap-4">
                {items.map((concept) => (
                    <details
                        key={concept.id}
                        className="group collapse collapse-arrow bg-base-100 border border-base-200 hover:border-accent/50 transition-colors"
                    >
                        <summary className="collapse-title text-xl font-medium group-hover:text-accent transition-colors">
                            {concept.title}
                        </summary>
                        <div className="collapse-content space-y-4">
                            <p className="text-lg leading-relaxed pt-2">
                                {concept.explanation}
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="p-4 bg-error/5 rounded-lg border border-error/10">
                                    <h4 className="font-bold text-error mb-2">Why it was confusing:</h4>
                                    <p>{concept.confusion}</p>
                                </div>
                                <div className="p-4 bg-success/5 rounded-lg border border-success/10">
                                    <h4 className="font-bold text-success mb-2">What made it click:</h4>
                                    <p>{concept.click}</p>
                                </div>
                            </div>

                            {concept.example && (
                                <div className="mockup-code bg-neutral text-neutral-content text-sm relative">
                                    <pre className="px-6 py-4"><code>{concept.example}</code></pre>
                                    <div className="absolute top-2 right-4 text-xs opacity-50">example</div>
                                </div>
                            )}
                        </div>
                    </details>
                ))}

                {items.length === 0 && (
                    <p className="text-base-content/50 italic">No concepts logged yet.</p>
                )}
            </div>
        </div>
    );
}
