import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { neighborhoodOptions } from "../../data/eventOptions.js";
import styles from "./styles.module.css";

const neighborhoodDescriptions = {
    "Alberta Arts": "Small galleries and colorful corners",
    "Central Eastside": "Coffee spots and creative studios",
    "Forest Park": "Trail meetups and fresh air",
    Hawthorne: "Workshops and neighborhood shops",
    "Mississippi Avenue": "Live music and late dinners",
    "Northwest District": "Green paths close to town",
    "Pearl District": "Rooftop screens and gallery nights",
    "South Waterfront": "Easy mornings by the river",
    Waterfront: "Markets, makers, and river walks",
};

const NeighborhoodGuide = ({
    neighborhoodCounts,
    selectedNeighborhood,
    onSelect,
}) => {
    const neighborhoods = neighborhoodOptions.slice(1);

    return (
        <section
            className={styles.neighborhoods}
            id="neighborhoods"
            aria-labelledby="neighborhood-title"
        >
            <div className={styles.heading}>
                <div>
                    <h2 id="neighborhood-title">Pick a part of town.</h2>
                    <p>Good plans are closer than you think.</p>
                </div>
                <span className={styles.city}>
                    <FiMapPin aria-hidden="true" />
                    Portland, Oregon
                </span>
            </div>
            <div className={styles.areaGrid}>
                {neighborhoods.map((neighborhood) => {
                    const selected = selectedNeighborhood === neighborhood;
                    const count = neighborhoodCounts[neighborhood] ?? 0;

                    return (
                        <button
                            className={
                                selected ? styles.areaActive : styles.area
                            }
                            type="button"
                            key={neighborhood}
                            aria-pressed={selected}
                            onClick={() => onSelect(neighborhood)}
                        >
                            <span className={styles.areaTop}>
                                <span className={styles.areaIcon}>
                                    <FiMapPin aria-hidden="true" />
                                </span>
                                <span className={styles.count}>
                                    {count} {count === 1 ? "event" : "events"}
                                </span>
                            </span>
                            <strong>{neighborhood}</strong>
                            <span className={styles.description}>
                                {neighborhoodDescriptions[neighborhood]}
                            </span>
                            <FiArrowRight
                                className={styles.arrow}
                                aria-hidden="true"
                            />
                        </button>
                    );
                })}
            </div>
            {selectedNeighborhood !== "All neighborhoods" ? (
                <button
                    className={styles.showAll}
                    type="button"
                    onClick={() => onSelect("All neighborhoods")}
                >
                    Show events in every neighborhood
                </button>
            ) : null}
        </section>
    );
};

export { NeighborhoodGuide };
