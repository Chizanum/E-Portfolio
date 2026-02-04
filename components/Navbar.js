"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { themeChange } from "theme-change";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Learning", path: "/learning" },
    { name: "Weekly", path: "/weekly" },
    { name: "Concepts", path: "/concepts" },
    { name: "Projects", path: "/projects" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-base-100/80 border-b border-base-200 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link
                    href="/"
                    className="text-lg font-bold tracking-tight hover:text-primary transition-colors duration-200"
                >
                    chizanum.<span className="text-primary">dev</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.path ? "text-primary" : "text-base-content/70"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Theme Controller */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle text-xs">
                            Theme
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button data-set-theme="lofi">Lofi (Light)</button></li>
                            <li><button data-set-theme="nord">Nord (Cool)</button></li>
                            <li><button data-set-theme="business">Business (Dark)</button></li>
                        </ul>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden btn btn-ghost btn-circle"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-base-100 border-b border-base-200 p-4 shadow-lg animate-in slide-in-from-top-2">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`text-sm font-medium py-2 ${pathname === item.path ? "text-primary" : "text-base-content/70"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="divider my-0"></div>
                        <div className="flex gap-2 justify-center pb-2">
                            <button className="btn btn-xs" data-set-theme="lofi" onClick={() => setIsOpen(false)}>Lofi</button>
                            <button className="btn btn-xs" data-set-theme="nord" onClick={() => setIsOpen(false)}>Nord</button>
                            <button className="btn btn-xs" data-set-theme="business" onClick={() => setIsOpen(false)}>Dark</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
