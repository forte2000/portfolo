import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "../Skeleton";

function LazyImage({
    src,
    alt,
    className = "",
    skeletonClassName = "",
    aspectRatio = "auto",
    fallback = null,
    onLoad,
    onError,
    ...props
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);

        const img = new Image();
        img.src = src;

        img.onload = () => {
            setImgSrc(src);
            setIsLoading(false);
            onLoad?.();
        };

        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
            onError?.();
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, onLoad, onError]);

    if (isLoading) {
        return (
            <Skeleton
                variant="rounded"
                className={`lazy-image-skeleton ${skeletonClassName}`}
                style={{ aspectRatio, width: "100%" }}
            />
        );
    }

    if (hasError) {
        if (fallback) {
            return fallback;
        }
        return (
            <div
                className={`lazy-image-error bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center rounded-xl p-4 text-center ${className}`}
                style={{ aspectRatio }}
            >
                <svg
                    className="w-12 h-12 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">Image not found</span>
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            loading="lazy"
            {...props}
        />
    );
}

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    skeletonClassName: PropTypes.string,
    aspectRatio: PropTypes.string,
    fallback: PropTypes.node,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
};

export default LazyImage;
