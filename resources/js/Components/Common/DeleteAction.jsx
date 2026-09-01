import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "react-bootstrap";

import { ConfirmModal } from "../UI";

export default function DeleteAction({
    resource,
    getUrl,
    message,
    errorKey,
    defaultErrorMessage = "No se pudo eliminar el elemento.",
    buttonLabel = "Eliminar",
}) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleOpen = () => {
        setError(null);
        setShow(true);
    };

    const handleClose = () => {
        if (isDeleting) {
            return;
        }

        setError(null);
        setShow(false);
    };

    const handleConfirm = () => {
        router.delete(getUrl(resource), {
            preserveScroll: true,

            onStart: () => {
                setIsDeleting(true);
                setError(null);
            },

            onSuccess: () => {
                setShow(false);
            },

            onError: (errors) => {
                setError(errors[errorKey] ?? defaultErrorMessage);
            },

            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    return (
        <>
            <Button variant="outline-danger" size="sm" onClick={handleOpen}>
                {buttonLabel}
            </Button>

            <ConfirmModal
                show={show}
                message={message}
                loading={isDeleting}
                error={error}
                onConfirm={handleConfirm}
                onClose={handleClose}
            />
        </>
    );
}
