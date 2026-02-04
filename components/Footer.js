import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-auto border-t border-base-200 bg-base-100 text-base-content/60">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <p>© {new Date().getFullYear()} Chizanum Idemili</p>
                    <p className="text-xs">Built with Next.js & Tailwind</p>
                </div>

                <div className="flex items-center gap-6">
                    {process.env.NODE_ENV === 'development' && (
                        <Link href="/admin" className="hover:text-primary transition-colors">
                            Admin
                        </Link>
                    )}
                    <a
                        href="https://github.com/Chizanum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:chizanum.dev@gmail.com"
                        className="hover:text-primary transition-colors"
                    >
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}
