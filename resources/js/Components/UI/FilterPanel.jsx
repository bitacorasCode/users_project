import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

export default function FilterPanel({
    title = "Filtros",
    buttonLabel = "Filtros",
    buttonVariant = "outline-secondary",
    children,
    onOpen,
    onApply,
    onClear,
}) {
    const [show, setShow] = useState(false);

    const handleOpen = () => {
        setShow(true);
        onOpen?.();
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleApply = () => {
        onApply?.();
        handleClose();
    };

    const handleClear = () => {
        onClear?.();
    };

    return (
        <>
            <Button variant={buttonVariant} onClick={handleOpen}>
                {buttonLabel}
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <div className="d-flex flex-column h-100">
                        <div className="flex-grow-1">{children}</div>

                        <div className="d-flex gap-2 pt-3 border-top">
                            <Button
                                variant="outline-secondary"
                                className="flex-fill"
                                onClick={handleClear}
                            >
                                Limpiar
                            </Button>

                            <Button
                                variant="primary"
                                className="flex-fill"
                                onClick={handleApply}
                            >
                                Aplicar
                            </Button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
