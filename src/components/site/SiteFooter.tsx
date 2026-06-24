import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { nav, site } from "@/lib/content";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Explore
          </h4>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-clay"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Connect
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
            <li>
              <Link href="/about" className="transition-colors hover:text-clay">
                {site.author}
              </Link>
            </li>
            <li>
              <a href={`https://orcid.org/${site.orcid}`} className="transition-colors hover:text-clay">
                ORCID {site.orcid}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-4">
            <span className="text-muted-foreground/40 cursor-not-allowed">
              <FaFacebook className="size-5" />
            </span>
            <a
              href={`https://twitter.com/${site.twitter.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/70 transition-colors hover:text-clay"
              aria-label="Twitter / X"
            >
              <FaXTwitter className="size-5" />
            </a>
            <span className="text-muted-foreground/40 cursor-not-allowed">
              <FaInstagram className="size-5" />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Rational Medicine Network. For education and advocacy.</p>
          <p>Better care · Lower cost · Honest evidence</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
