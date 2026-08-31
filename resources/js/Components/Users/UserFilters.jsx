import { useState } from "react";

import { FilterPanel, Loader, SelectField } from "../UI";
import { getRoles, getUserStates } from "../../Services/catalogService";

export default function UserFilters({ filters, onApply }) {
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);

    const [role, setRole] = useState(filters.role ?? "");
    const [state, setState] = useState(filters.state ?? "");

    const [loading, setLoading] = useState(false);

    const handleApplyFilters = () => {
        onApply({ role, state });
    };

    const handleClearFilters = () => {
        setRole("");
        setState("");
    };

    const loadOptions = async () => {
        try {
            setLoading(true);

            const [rolesData, statesData] = await Promise.all([
                getRoles(),
                getUserStates(),
            ]);

            const formattedRoles = rolesData.map((role) => ({
                value: role.name,
                label: role.name,
            }));

            const formattedStates = statesData.map((state) => ({
                value: state.label,
                label: state.label,
            }));

            setRoles(formattedRoles);
            setStates(formattedStates);
        } catch (error) {
            console.error("Error loading filter options:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FilterPanel
            title="Filtrar usuarios"
            onOpen={loadOptions}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
        >
            {loading ? (
                <div className="d-flex justify-content-center align-items-center py-5">
                    <Loader message="Cargando filtros..." />
                </div>
            ) : (
                <>
                    <SelectField
                        label="Rol"
                        value={role}
                        onChange={setRole}
                        options={roles}
                        placeholder="Todos los roles"
                    />

                    <SelectField
                        label="Estado"
                        value={state}
                        onChange={setState}
                        options={states}
                        placeholder="Todos los estados"
                    />
                </>
            )}
        </FilterPanel>
    );
}
