import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="mt-16 bg-emerald-950 text-white">
            <div className="mx-auto max-w-6xl px-4 py-20 text-center">
                <h2 className="text-6xl font-extrabold tracking-tight text-white">
                    KeenKeeper
                </h2>
                <p className="mx-auto mt-6 max-w-4xl text-lg text-emerald-100">
                    Your personal shelf of meaningful connections. Browse, tend, and
                    nurture the relationships that matter most.
                </p>
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-white">Social Links</h3>
                    <div className="mt-6 flex items-center justify-center gap-5">
                        <a
                            href="#"
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 transition hover:scale-110"
                        >
                            <FaInstagram className="text-[22px]" />
                        </a>
                        <a
                            href="#"
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 transition hover:scale-110"
                        >
                            <FaFacebookF className="text-[20px]" />
                        </a>
                        <a
                            href="#"
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 transition hover:scale-110"
                        >
                            <FaXTwitter className="text-[20px]" />
                        </a>
                    </div>
                </div>
                <div className="mt-14 border-t border-emerald-900" />
                <div className="mt-8 flex flex-col items-center justify-between gap-6 text-sm text-emerald-200 md:flex-row">
                    <p>© 2026 KeenKeeper. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="transition hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Terms of Service
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}