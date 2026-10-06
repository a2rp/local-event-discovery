import { useEffect, useRef } from "react";
import {
    FiCalendar,
    FiClock,
    FiHeart,
    FiMapPin,
    FiUsers,
    FiX,
} from "react-icons/fi";
import styles from "./styles.module.css";

const formatDate = (dateValue) =>
    new Date(dateValue + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

const EventDetails = ({
    event,
    isSaved,
    isInterested,
    onSave,
    onInterested,
    onClose,
}) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const previousElement = document.activeElement;
        const dialog = dialogRef.current;
        const closeButton = dialog?.querySelector("button");

        closeButton?.focus();

        const handleKeys = (keyEvent) => {
            if (keyEvent.key === "Escape") {
                onClose();
                return;
            }

            if (keyEvent.key !== "Tab") return;

            const buttons = dialog?.querySelectorAll("button:not(:disabled)");
            if (!buttons?.length) return;

            const firstButton = buttons[0];
            const lastButton = buttons[buttons.length - 1];

            if (keyEvent.shiftKey && document.activeElement === firstButton) {
                keyEvent.preventDefault();
                lastButton.focus();
            } else if (
                !keyEvent.shiftKey &&
                document.activeElement === lastButton
            ) {
                keyEvent.preventDefault();
                firstButton.focus();
            }
        };

        document.addEventListener("keydown", handleKeys);

        return () => {
            document.removeEventListener("keydown", handleKeys);
            previousElement?.focus?.();
        };
    }, [event.id, onClose]);

    return (
        <div
            className={styles.overlay}
            role="presentation"
            onMouseDown={(mouseEvent) => {
                if (mouseEvent.target === mouseEvent.currentTarget) onClose();
            }}
        >
            <section
                className={styles.dialog}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="event-title"
                aria-describedby="event-description"
            >
                <div className={styles.photo}>
                    <img
                        src={import.meta.env.BASE_URL + "images/" + event.image}
                        alt={event.imageAlt}
                    />
                    <span className={styles.category}>{event.category}</span>
                    <button
                        className={styles.closeButton}
                        type="button"
                        aria-label="Close event details"
                        onClick={onClose}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.titleRow}>
                        <div>
                            <h2 id="event-title">{event.title}</h2>
                            <p className={styles.host}>Hosted by {event.host}</p>
                        </div>
                        <span className={styles.price}>{event.price}</span>
                    </div>

                    <p className={styles.description} id="event-description">
                        {event.description}
                    </p>

                    <div className={styles.eventInfo}>
                        <div>
                            <FiCalendar aria-hidden="true" />
                            <span>{formatDate(event.date)}</span>
                        </div>
                        <div>
                            <FiClock aria-hidden="true" />
                            <span>{event.time}</span>
                        </div>
                        <div>
                            <FiMapPin aria-hidden="true" />
                            <span>{event.venue}, {event.neighborhood}</span>
                        </div>
                        <div>
                            <FiUsers aria-hidden="true" />
                            <span>{event.goingCount + Number(isInterested)} people are interested</span>
                        </div>
                    </div>

                    <div className={styles.tags}>
                        {event.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={isSaved ? styles.savedButton : styles.saveButton}
                            type="button"
                            aria-pressed={isSaved}
                            onClick={() => onSave(event.id)}
                        >
                            <FiHeart aria-hidden="true" />
                            {isSaved ? "Saved" : "Save event"}
                        </button>
                        <button
                            className={styles.interestedButton}
                            type="button"
                            aria-pressed={isInterested}
                            onClick={() => onInterested(event.id)}
                        >
                            {isInterested ? "You're interested" : "I'm interested"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export { EventDetails };
