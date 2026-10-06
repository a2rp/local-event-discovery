import { FiBookmark, FiCheck, FiX } from "react-icons/fi";
import {
    categoryOptions,
    dateOptions,
    neighborhoodOptions,
} from "../../data/eventOptions.js";
import styles from "./styles.module.css";

const EventFilters = ({
    category,
    dateRange,
    neighborhood,
    savedOnly,
    counts,
    hasFilters,
    onCategoryChange,
    onDateRangeChange,
    onNeighborhoodChange,
    onSavedOnlyChange,
    onClear,
}) => (
    <aside className={styles.filtersPanel} aria-label="Filter local events">
        <div className={styles.heading}>
            <h2>Find your kind of thing</h2>
            <span>{counts.all ?? 0}</span>
        </div>
        <button
            className={savedOnly ? styles.savedActive : styles.savedButton}
            type="button"
            aria-pressed={savedOnly}
            onClick={onSavedOnlyChange}
        >
            <FiBookmark aria-hidden="true" />
            Saved events
            {savedOnly ? <FiCheck aria-hidden="true" /> : null}
        </button>

        <label className={styles.field}>
            <span>Date</span>
            <select
                value={dateRange}
                onChange={(changeEvent) =>
                    onDateRangeChange(changeEvent.target.value)
                }
            >
                {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>

        <label className={styles.field}>
            <span>Neighborhood</span>
            <select
                value={neighborhood}
                onChange={(changeEvent) =>
                    onNeighborhoodChange(changeEvent.target.value)
                }
            >
                {neighborhoodOptions.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </label>

        <div className={styles.categories}>
            <h3>Browse by category</h3>
            <div className={styles.categoryList}>
                {categoryOptions.map((option) => {
                    const value = option === "All events" ? "all" : option;
                    const active = category === value;

                    return (
                        <button
                            className={
                                active ? styles.categoryActive : styles.category
                            }
                            type="button"
                            key={option}
                            aria-pressed={active}
                            onClick={() => onCategoryChange(value)}
                        >
                            <span>{option}</span>
                            <span>{counts[value] ?? 0}</span>
                        </button>
                    );
                })}
            </div>
        </div>

        {hasFilters ? (
            <button
                className={styles.clearButton}
                type="button"
                onClick={onClear}
            >
                <FiX aria-hidden="true" />
                Clear filters
            </button>
        ) : null}
    </aside>
);

export { EventFilters };
