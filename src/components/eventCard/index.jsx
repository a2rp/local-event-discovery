import { FiArrowUpRight, FiClock, FiHeart, FiMapPin, FiUsers } from "react-icons/fi";
import styles from "./styles.module.css";

const formatDate = (dateValue) => {
    const date = new Date(dateValue + "T12:00:00");

    return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        number: date.getDate(),
    };
};

const EventCard = ({ event, isSaved, isInterested, onSave, onOpen }) => {
    const date = formatDate(event.date);

    return (
        <article className={styles.card}>
            <div className={styles.photo}>
                <img
                    src={import.meta.env.BASE_URL + "images/" + event.image}
                    alt={event.imageAlt}
                    loading="lazy"
                />
                <span className={styles.category}>{event.category}</span>
                <button
                    className={isSaved ? styles.savedButton : styles.saveButton}
                    type="button"
                    aria-label={(isSaved ? "Remove " : "Save ") + event.title}
                    aria-pressed={isSaved}
                    onClick={() => onSave(event.id)}
                >
                    <FiHeart aria-hidden="true" />
                </button>
                <div className={styles.date}>
                    <span>{date.month}</span>
                    <strong>{date.number}</strong>
                    <span>{date.day}</span>
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.meta}>
                    <span>
                        <FiClock aria-hidden="true" />
                        {event.time}
                    </span>
                    <span className={styles.price}>{event.price}</span>
                </div>
                <h3>{event.title}</h3>
                <p className={styles.place}>
                    <FiMapPin aria-hidden="true" />
                    {event.neighborhood} · {event.venue}
                </p>
                <div className={styles.cardFooter}>
                    <span className={isInterested ? styles.interested : styles.going}>
                        <FiUsers aria-hidden="true" />
                        {isInterested ? "You're interested" : event.goingCount + " going"}
                    </span>
                    <button
                        className={styles.detailsButton}
                        type="button"
                        onClick={() => onOpen(event)}
                    >
                        Details
                        <FiArrowUpRight aria-hidden="true" />
                    </button>
                </div>
            </div>
        </article>
    );
};

export { EventCard };
