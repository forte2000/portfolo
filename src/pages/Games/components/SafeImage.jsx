
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FALLBACK_IMAGE } from "../constants";

export default function SafeImage({ src, alt, className = "", ...props }) {
    const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

    useEffect(() => {
        setImgSrc(src || FALLBACK_IMAGE);
    }, [src]);

    return (
        <motion.img
            src={imgSrc}
            alt={alt || "image"}
            className={className}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            {...props}
        />
    );
}
