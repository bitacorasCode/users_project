import { Col, Row } from "react-bootstrap";

import { formatDate } from "../../../Helpers";
import { useLazyInertiaProp } from "../../../Hooks";
import { AsyncContent } from "../../Common";

export default function UserGeneralTab({ active, data }) {
    const { loading, loaded, error } = useLazyInertiaProp({
        prop: "general",
        active,
    });

    const fields = [
        { label: "Nombre", value: data?.name },
        { label: "Apellido", value: data?.last_name },
        { label: "Email", value: data?.email },
        { label: "RUT/RUN", value: data?.rut },
        { label: "Teléfono", value: data?.phone },
        { label: "Rol", value: data?.role },
        { label: "Estado", value: data?.state },
        {
            label: "Fecha de creación",
            value: formatDate(data?.created_at),
        },
    ];

    return (
        <AsyncContent
            loading={loading}
            loaded={loaded}
            error={error}
            data={data}
            loadingMessage="Cargando información general..."
            emptyMessage="Este usuario no tiene información general registrada."
        >
            <Row className="pt-4">
                {fields.map((field) => (
                    <Col md={6} className="mb-4" key={field.label}>
                        <div className="text-muted small mb-1">
                            {field.label}
                        </div>
                        <div className="fw-medium"> {field.value || "—"} </div>
                    </Col>
                ))}
            </Row>
        </AsyncContent>
    );
}
