import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { useForm } from "laravel-precognition-react-inertia";
import { Alert, Button } from "react-bootstrap";

import { PersonalDataSection, AddressSection, NotesSection } from "./Form";

import { getRoles, getUserStates } from "../../Services/catalogService";
import { Loader } from "../UI";

const initialData = {
    name: "",
    last_name: "",
    email: "",
    rut: "",
    phone: "",
    role_id: "",
    state: "",
    address: { street: "", city: "", zip_code: "" },
    notes: [{ note: "" }],
};

export default function UserForm() {
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState(null);

    const form = useForm("post", "/users", initialData);

    form.setValidationTimeout(250);

    useEffect(() => {
        loadOptions();
    }, []);

    const loadOptions = async () => {
        try {
            setLoadingOptions(true);
            setOptionsError(null);

            const [rolesData, statesData] = await Promise.all([
                getRoles(),
                getUserStates(),
            ]);

            setRoles(
                rolesData.map((role) => ({ value: role.id, label: role.name })),
            );

            setStates(statesData);
        } catch (error) {
            console.error("Error loading form options:", error);

            setOptionsError("No se pudieron cargar los roles y estados.");
        } finally {
            setLoadingOptions(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        form.submit({ preserveScroll: true });
    };

    const handleCancel = () => {
        router.get("/users");
    };

    if (loadingOptions) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Loader message="Cargando opciones del formulario..." />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {optionsError && <Alert variant="danger"> {optionsError} </Alert>}

            {form.errors.createUser && (
                <Alert variant="danger"> {form.errors.createUser} </Alert>
            )}

            <PersonalDataSection form={form} roles={roles} states={states} />

            <AddressSection form={form} />

            <NotesSection form={form} />

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                    type="button"
                    variant="outline-secondary"
                    disabled={form.processing}
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={form.processing || !!optionsError}
                >
                    {form.processing ? "Guardando..." : "Guardar"}
                </Button>
            </div>
        </form>
    );
}
