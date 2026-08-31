export default function Skeleton({
    width = "100%",
    height = "1rem",
    className = "",
}) {
    return (
        <div className={`placeholder-glow ${className}`} aria-hidden="true">
            <span
                className="placeholder rounded"
                style={{
                    width,
                    height,
                    display: "block",
                }}
            />
        </div>
    );
}
