import { Alert } from "react-bootstrap";

import { Loader } from "../UI";

export default function AsyncContent({
    loading,
    loaded,
    error,
    data,
    loadingMessage = "Cargando...",
    emptyMessage = "No hay datos disponibles.",
    isEmpty = (data) => !data,
    children,
}) {
    if (loading) {
        return <Loader message={loadingMessage} />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (loaded && isEmpty(data)) {
        return (
            <div className="text-center text-muted py-5">{emptyMessage}</div>
        );
    }

    if (!data) {
        return null;
    }

    return children;
}
