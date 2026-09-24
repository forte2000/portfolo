import PropTypes from "prop-types";
import "./Skeleton.css";

// Base Skeleton component
function Skeleton({ className = "", variant = "rectangular", animation = "pulse" }) {
    return (
        <div
            className={`skeleton skeleton--${variant} skeleton--${animation} ${className}`}
        />
    );
}

Skeleton.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["text", "circular", "rectangular", "rounded"]),
    animation: PropTypes.oneOf(["pulse", "wave", "none"]),
};

// Text Skeleton - for text content
function SkeletonText({ lines = 3, className = "" }) {
    return (
        <div className={`skeleton-text ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    variant="text"
                    className={`skeleton-text__line ${i === lines - 1 ? "skeleton-text__line--short" : ""}`}
                />
            ))}
        </div>
    );
}

SkeletonText.propTypes = {
    lines: PropTypes.number,
    className: PropTypes.string,
};

// Avatar Skeleton - for profile pictures
function SkeletonAvatar({ size = "md", className = "" }) {
    const sizeClass = {
        sm: "skeleton-avatar--sm",
        md: "skeleton-avatar--md",
        lg: "skeleton-avatar--lg",
        xl: "skeleton-avatar--xl",
    };

    return (
        <Skeleton
            variant="circular"
            className={`skeleton-avatar ${sizeClass[size]} ${className}`}
        />
    );
}

SkeletonAvatar.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    className: PropTypes.string,
};

// Card Skeleton - for card layouts
function SkeletonCard({ hasImage = true, lines = 3, className = "" }) {
    return (
        <div className={`skeleton-card ${className}`}>
            {hasImage && <Skeleton variant="rectangular" className="skeleton-card__image" />}
            <div className="skeleton-card__content">
                <Skeleton variant="text" className="skeleton-card__title" />
                <SkeletonText lines={lines} />
            </div>
        </div>
    );
}

SkeletonCard.propTypes = {
    hasImage: PropTypes.bool,
    lines: PropTypes.number,
    className: PropTypes.string,
};

// Image Skeleton - for images
function SkeletonImage({ aspectRatio = "16/9", className = "" }) {
    return (
        <Skeleton
            variant="rounded"
            className={`skeleton-image ${className}`}
            style={{ aspectRatio }}
        />
    );
}

SkeletonImage.propTypes = {
    aspectRatio: PropTypes.string,
    className: PropTypes.string,
};

// Button Skeleton
function SkeletonButton({ width = "100px", className = "" }) {
    return (
        <Skeleton
            variant="rounded"
            className={`skeleton-button ${className}`}
            style={{ width }}
        />
    );
}

SkeletonButton.propTypes = {
    width: PropTypes.string,
    className: PropTypes.string,
};

// Profile Skeleton - combination for profile sections
function SkeletonProfile({ className = "" }) {
    return (
        <div className={`skeleton-profile ${className}`}>
            <SkeletonAvatar size="xl" />
            <div className="skeleton-profile__info">
                <Skeleton variant="text" className="skeleton-profile__name" />
                <Skeleton variant="text" className="skeleton-profile__subtitle" />
                <div className="skeleton-profile__buttons">
                    <SkeletonButton width="80px" />
                    <SkeletonButton width="80px" />
                    <SkeletonButton width="80px" />
                </div>
            </div>
        </div>
    );
}

SkeletonProfile.propTypes = {
    className: PropTypes.string,
};

// Grid Skeleton - for grid layouts
function SkeletonGrid({ items = 6, columns = 3, className = "" }) {
    return (
        <div
            className={`skeleton-grid ${className}`}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {Array.from({ length: items }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

SkeletonGrid.propTypes = {
    items: PropTypes.number,
    columns: PropTypes.number,
    className: PropTypes.string,
};

// Page Loading Skeleton
function SkeletonPage({ className = "" }) {
    return (
        <div className={`skeleton-page ${className}`}>
            {/* Header skeleton */}
            <div className="skeleton-page__header">
                <SkeletonProfile />
            </div>

            {/* Content skeleton */}
            <div className="skeleton-page__content">
                <div className="skeleton-page__section">
                    <Skeleton variant="text" className="skeleton-page__section-title" />
                    <SkeletonText lines={4} />
                </div>
                <div className="skeleton-page__section">
                    <Skeleton variant="text" className="skeleton-page__section-title" />
                    <SkeletonGrid items={3} columns={3} />
                </div>
            </div>
        </div>
    );
}

SkeletonPage.propTypes = {
    className: PropTypes.string,
};

export {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonCard,
    SkeletonImage,
    SkeletonButton,
    SkeletonProfile,
    SkeletonGrid,
    SkeletonPage,
};

export default Skeleton;
