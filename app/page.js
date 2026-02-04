import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Learning in public.
          <br />
          <span className="text-primary">Building in small steps.</span>
        </h1>
        <p className="text-xl md:text-2xl text-base-content/80 font-light">
          Documenting my journey, one concept at a time.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link href="/learning" className="btn btn-primary btn-outline">
            See What I'm Learning
          </Link>
          <Link href="/projects" className="btn btn-ghost">
            View Projects
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-base-content/50">
        <ArrowDown size={24} />
      </div>
    </div>
  );
}
