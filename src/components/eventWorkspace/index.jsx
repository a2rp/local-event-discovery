import { useCallback, useState } from "react";
import { FiHardDrive } from "react-icons/fi";
import { DiscoverHero } from "../discoverHero/index.jsx";
import { EventDetails } from "../eventDetails/index.jsx";
import { EventFilters } from "../eventFilters/index.jsx";
import { EventGallery } from "../eventGallery/index.jsx";
import { NeighborhoodGuide } from "../neighborhoodGuide/index.jsx";
import { sampleEvents } from "../../data/sampleEvents.js";
import styles from "./styles.module.css";

const savedEventsKey = "sidewalk-saved-events";
const interestedEventsKey = "sidewalk-interested-events";

const readStoredIds = (key) => {
    try {
        const storedIds = window.localStorage.getItem(key);
        const parsedIds = storedIds ? JSON.parse(storedIds) : [];

        return Array.isArray(parsedIds) ? parsedIds : [];
    } catch {
        return [];
    }
};

const getDateKey = (date) =>
    [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-");

const getWeekendRange = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);

    if (today.getDay() !== 0 && today.getDay() !== 6) {
        start.setDate(start.getDate() + ((5 - today.getDay() + 7) % 7));
    }

    const end = new Date(start);
    end.setDate(
        end.getDate() +
            (start.getDay() === 5 ? 2 : start.getDay() === 6 ? 1 : 0),
    );

    return { start: getDateKey(start), end: getDateKey(end) };
};

const EventWorkspace = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [dateRange, setDateRange] = useState("all");
    const [neighborhood, setNeighborhood] = useState("All neighborhoods");
    const [savedOnly, setSavedOnly] = useState(false);
    const [savedEventIds, setSavedEventIds] = useState(() =>
        readStoredIds(savedEventsKey),
    );
    const [interestedEventIds, setInterestedEventIds] = useState(() =>
        readStoredIds(interestedEventsKey),
    );
    const [selectedEvent, setSelectedEvent] = useState(null);
    const closeEventDetails = useCallback(() => setSelectedEvent(null), []);
    const [storageError, setStorageError] = useState(false);

    const normalizedSearch = search.trim().toLowerCase();
    const today = getDateKey(new Date());
    const inSevenDays = new Date();
    inSevenDays.setDate(inSevenDays.getDate() + 6);
    const weekEnd = getDateKey(inSevenDays);
    const weekend = getWeekendRange();

    const visibleEvents = sampleEvents
        .filter((event) => {
            const matchesSearch =
                !normalizedSearch ||
                [
                    event.title,
                    event.category,
                    event.neighborhood,
                    event.venue,
                    event.host,
                    event.description,
                    ...event.tags,
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedSearch);
            const matchesCategory =
                category === "all" || event.category === category;
            const matchesNeighborhood =
                neighborhood === "All neighborhoods" ||
                event.neighborhood === neighborhood;
            const matchesDate =
                dateRange === "all" ||
                (dateRange === "today" && event.date === today) ||
                (dateRange === "weekend" &&
                    event.date >= weekend.start &&
                    event.date <= weekend.end) ||
                (dateRange === "week" &&
                    event.date >= today &&
                    event.date <= weekEnd);
            const matchesSaved = !savedOnly || savedEventIds.includes(event.id);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesNeighborhood &&
                matchesDate &&
                matchesSaved
            );
        })
        .sort((first, second) => first.date.localeCompare(second.date));

    const categoryCounts = sampleEvents.reduce(
        (counts, event) => ({
            ...counts,
            [event.category]: (counts[event.category] ?? 0) + 1,
        }),
        { all: sampleEvents.length },
    );

    const neighborhoodCounts = sampleEvents.reduce(
        (counts, event) => ({
            ...counts,
            [event.neighborhood]: (counts[event.neighborhood] ?? 0) + 1,
        }),
        {},
    );

    const hasFilters =
        Boolean(normalizedSearch) ||
        category !== "all" ||
        dateRange !== "all" ||
        neighborhood !== "All neighborhoods" ||
        savedOnly;

    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setDateRange("all");
        setNeighborhood("All neighborhoods");
        setSavedOnly(false);
    };

    const toggleStoredId = (id, currentIds, updateIds, storageKey) => {
        const updatedIds = currentIds.includes(id)
            ? currentIds.filter((savedId) => savedId !== id)
            : [...currentIds, id];

        updateIds(updatedIds);

        try {
            window.localStorage.setItem(storageKey, JSON.stringify(updatedIds));
            setStorageError(false);
        } catch {
            setStorageError(true);
        }
    };

    const toggleSaved = (id) =>
        toggleStoredId(id, savedEventIds, setSavedEventIds, savedEventsKey);

    const toggleInterested = (id) =>
        toggleStoredId(
            id,
            interestedEventIds,
            setInterestedEventIds,
            interestedEventsKey,
        );

    const scrollToEvents = () => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        document.getElementById("events")?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
        });
    };

    const selectNeighborhood = (value) => {
        setNeighborhood(value);
        scrollToEvents();
    };

    return (
        <div className={styles.workspace}>
            <DiscoverHero
                search={search}
                onSearchChange={setSearch}
                onFindEvents={scrollToEvents}
            />

            <div className={styles.eventLayout}>
                <EventFilters
                    category={category}
                    dateRange={dateRange}
                    neighborhood={neighborhood}
                    savedOnly={savedOnly}
                    counts={categoryCounts}
                    hasFilters={hasFilters}
                    onCategoryChange={setCategory}
                    onDateRangeChange={setDateRange}
                    onNeighborhoodChange={setNeighborhood}
                    onSavedOnlyChange={() => setSavedOnly(!savedOnly)}
                    onClear={clearFilters}
                />
                <EventGallery
                    events={visibleEvents}
                    savedEventIds={savedEventIds}
                    interestedEventIds={interestedEventIds}
                    onSave={toggleSaved}
                    onOpen={setSelectedEvent}
                    onClear={clearFilters}
                />
            </div>

            <NeighborhoodGuide
                neighborhoodCounts={neighborhoodCounts}
                selectedNeighborhood={neighborhood}
                onSelect={selectNeighborhood}
            />

            <p
                className={styles.storageNote}
                role={storageError ? "status" : undefined}
            >
                <FiHardDrive aria-hidden="true" />
                {storageError
                    ? "Browser storage is unavailable. Changes will not stay after this page closes."
                    : "Saved events and interest are kept in this browser."}
            </p>

            {selectedEvent ? (
                <EventDetails
                    event={selectedEvent}
                    isSaved={savedEventIds.includes(selectedEvent.id)}
                    isInterested={interestedEventIds.includes(selectedEvent.id)}
                    onSave={toggleSaved}
                    onInterested={toggleInterested}
                    onClose={closeEventDetails}
                />
            ) : null}
        </div>
    );
};

export { EventWorkspace };
