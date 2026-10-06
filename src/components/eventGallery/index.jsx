import { FiCalendarDays, FiSearch } from "react-icons/fi";
import { EventCard } from "../eventCard/index.jsx";
import styles from "./styles.module.css";

const EventGallery = ({
    events,
    savedEventIds,
    interestedEventIds,
    onSave,
    onOpen,
    onClear,
}) => (
    <section className={styles.gallery} id="events" aria-labelledby="events-title">
        <div className={styles.heading}>
            <div>
                <p>Events around Portland</p>
                <h2 id="events-title">Find something good.</h2>
            </div>
            <span className={styles.resultCount}>
                <FiCalendarDays aria-hidden="true" />
                {events.length} {events.length === 1 ? "event" : "events"}
            </span>
        </div>

        {events.length ? (
            <div className={styles.eventGrid}>
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        isSaved={savedEventIds.includes(event.id)}
                        isInterested={interestedEventIds.includes(event.id)}
                        onSave={onSave}
                        onOpen={onOpen}
                    />
                ))}
            </div>
        ) : (
            <div className={styles.empty}>
                <span className={styles.emptyIcon}>
                    <FiSearch aria-hidden="true" />
                </span>
                <h3>No events found</h3>
                <p>Try a different date, neighborhood, or search.</p>
                <button type="button" onClick={onClear}>
                    Clear filters
                </button>
            </div>
        )}
    </section>
);

export { EventGallery };
