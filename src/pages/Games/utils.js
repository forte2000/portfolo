
export const classNames = (...arr) => arr.filter(Boolean).join(" ");

export const fmtDate = (ts) => {
    if (!ts) return "";
    const d = new Date(ts * 1000);
    return d.toLocaleString("vi", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const secondsToDHMS = (sec) => {
    if (sec <= 0) return "Expired";
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = Math.floor(sec % 60);
    return `${days}Day ${String(hours).padStart(2, "0")}Hour ${String(minutes).padStart(2, "0")}Minutes ${String(seconds).padStart(2, "0")}Seconds`;
};
