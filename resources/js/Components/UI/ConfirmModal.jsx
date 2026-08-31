import { Button, Modal, Spinner, Alert } from "react-bootstrap";

export default function ConfirmModal({
    show,
    title = "Confirmar acción",
    message,
    error,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    confirmVariant = "danger",
    loading = false,
    onConfirm,
    onClose,
}) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{message}</Modal.Body>
            {error && (
                <Alert variant="danger" className="mb-0">
                    {error}
                </Alert>
            )}

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelLabel}
                </Button>

                <Button
                    variant={confirmVariant}
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Cargando...
                        </>
                    ) : (
                        confirmLabel
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
