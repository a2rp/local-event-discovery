import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiMapPin, FiMenu, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const closeOnOutsideClick = (mouseEvent) => {
            if (!headerRef.current?.contains(mouseEvent.target)) {
                setMenuOpen(false);
            }
        };
        const closeOnEscape = (keyEvent) => {
            if (keyEvent.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);
    const navClass = [styles.navigation, menuOpen ? styles.open : ""]
        .filter(Boolean)
        .join(" ");

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.inner}>
                <a className={styles.brand} href="#top" onClick={closeMenu}>
                    <span className={styles.brandIcon}>
                        <FiMapPin aria-hidden="true" />
                    </span>
                    <span>Sidewalk</span>
                </a>
                <nav
                    className={navClass}
                    id="site-navigation"
                    aria-label="Main navigation"
                >
                    <a href="#discover" onClick={closeMenu}>
                        Discover
                    </a>
                    <a href="#events" onClick={closeMenu}>
                        Events
                    </a>
                    <a href="#neighborhoods" onClick={closeMenu}>
                        Neighborhoods
                    </a>
                </nav>
                <div className={styles.actions}>
                    <a
                        className={styles.repositoryLink}
                        href="https://github.com/a2rp/local-event-discovery"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub aria-hidden="true" />
                        <span>Repository</span>
                    </a>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={menuOpen}
                        aria-controls="site-navigation"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <FiX aria-hidden="true" />
                        ) : (
                            <FiMenu aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export { SiteHeader };
