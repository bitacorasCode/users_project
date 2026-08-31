import { Spinner } from "react-bootstrap";

export default function Loader({ message = "Cargando..." }) {
    return (
        <div className="text-center py-5">
            <Spinner animation="border" role="status" />

            <div className="text-muted mt-2">{message}</div>
        </div>
    );
}
