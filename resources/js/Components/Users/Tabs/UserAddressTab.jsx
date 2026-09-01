import { Col, Row } from "react-bootstrap";

import { useLazyInertiaProp } from "../../../Hooks";
import { AsyncContent } from "../../Common";

export default function UserAddressTab({ active, data }) {
    const { loading, loaded, error } = useLazyInertiaProp({
        prop: "address",
        active,
    });

    const fields = [
        { label: "Calle", value: data?.street },
        { label: "Ciudad", value: data?.city },
        { label: "Código postal", value: data?.zip_code },
    ];

    return (
        <AsyncContent
            loading={loading}
            loaded={loaded}
            error={error}
            data={data}
            loadingMessage="Cargando dirección..."
            emptyMessage="Este usuario no tiene una dirección registrada."
        >
            <Row className="pt-4">
                {fields.map((field) => (
                    <Col md={4} className="mb-4" key={field.label}>
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
