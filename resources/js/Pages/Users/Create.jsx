import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";

export default function Create() {
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        const loadOptions = async () => {
            const [rolesResponse, statesResponse] = await Promise.all([
                fetch("/roles"),
                fetch("/user-states"),
            ]);

            const [rolesData, statesData] = await Promise.all([
                rolesResponse.json(),
                statesResponse.json(),
            ]);

            setRoles(rolesData);
            setStates(statesData);
        };

        loadOptions();
    }, []);

    return (
        <>
            <Head title="Crear usuario" />

            <h1>Crear usuario</h1>

            <select>
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>

            <select>
                {states.map((state) => (
                    <option key={state.value} value={state.value}>
                        {state.label}
                    </option>
                ))}
            </select>
        </>
    );
}
