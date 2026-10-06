import { FiArrowRight, FiMapPin, FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";

const DiscoverHero = ({ search, onSearchChange, onFindEvents }) => {
    const submitSearch = (submitEvent) => {
        submitEvent.preventDefault();
        onFindEvents();
    };

    return (
        <section className={styles.hero} id="discover" aria-labelledby="hero-title">
            <div className={styles.copy}>
                <p className={styles.location}>
                    <FiMapPin aria-hidden="true" />
                    Portland, Oregon
                </p>
                <h1 id="hero-title">
                    Make room for a <span>good night out.</span>
                </h1>
                <p className={styles.description}>
                    Neighborhood markets, tucked-away music, and little plans
                    that turn into great stories.
                </p>
                <form className={styles.searchForm} role="search" onSubmit={submitSearch}>
                    <label className={styles.searchField}>
                        <FiSearch aria-hidden="true" />
                        <span className={styles.screenReaderOnly}>
                            Search local events
                        </span>
                        <input
                            type="search"
                            value={search}
                            onChange={(changeEvent) =>
                                onSearchChange(changeEvent.target.value)
                            }
                            placeholder="Try live music, coffee, or a market"
                        />
                    </label>
                    <button type="submit">
                        Find events
                        <FiArrowRight aria-hidden="true" />
                    </button>
                </form>
                <p className={styles.note}>
                    Small plans. Good people. Just around the corner.
                </p>
            </div>
            <div className={styles.photoGrid}>
                <figure className={styles.cityPhoto}>
                    <img
                        src={import.meta.env.BASE_URL + "images/city-evening.jpg"}
                        alt="A city skyline glowing at sunset"
                    />
                    <figcaption>
                        <span>Portland, after hours</span>
                        <strong>There's always somewhere to be.</strong>
                    </figcaption>
                </figure>
                <figure className={styles.smallPhoto}>
                    <img
                        src={import.meta.env.BASE_URL + "images/coffee-tasting.jpg"}
                        alt="Coffee being prepared at a tasting bar"
                    />
                    <figcaption>Coffee & conversations</figcaption>
                </figure>
                <figure className={styles.smallPhoto}>
                    <img
                        src={import.meta.env.BASE_URL + "images/farmers-market.jpg"}
                        alt="Fresh berries ready for a neighborhood market"
                    />
                    <figcaption>Saturday finds</figcaption>
                </figure>
            </div>
        </section>
    );
};

export { DiscoverHero };
