import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { Toast, ToastContainer } from "react-bootstrap";

const defaultTitles = {
    success: "Éxito",
    danger: "Error",
    warning: "Advertencia",
    info: "Información",
    primary: "Información",
};

export default function FlashToast() {
    const { flash } = usePage().props;

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (flash?.message) {
            setShow(true);
        }
    }, [flash?.message]);

    if (!flash?.message) {
        return null;
    }

    const type = flash.type ?? "info";

    const title = flash.title ?? defaultTitles[type] ?? "Notificación";

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                show={show}
                onClose={() => setShow(false)}
                delay={4000}
                autohide
                bg={type}
            >
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>

                <Toast.Body
                    className={type === "warning" ? "text-dark" : "text-white"}
                >
                    {flash.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
