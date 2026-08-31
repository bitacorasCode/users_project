import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { router } from "@inertiajs/react";

import FilterPanel from "../UI/FilterPanel";
import SelectField from "../UI/SelectField";
import { getRoles, getUserStates } from "../../Services/catalogService";

export default function UserFilters({ filters }) {
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);

    const [role, setRole] = useState(filters.role ?? "");
    const [state, setState] = useState(filters.state ?? "");

    const [loading, setLoading] = useState(false);

    const handleApplyFilters = () => {
        const newFilters = getFilterOptions();

        router.get(
            "/users",
            {
                ...newFilters,
                page: 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleClearFilters = () => {
        setRole("");
        setState("");
    };

    const getFilterOptions = () => {
        const filterOptions = {};

        if (role) {
            filterOptions.role = roles.find((r) => r.value === role)?.label;
        }
        if (state) {
            filterOptions.state = states.find((s) => s.value === state)?.label;
        }
        if (filters.search) {
            filterOptions.search = filters.search;
        }

        return filterOptions;
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
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">
                            Cargando filtros...
                        </span>
                    </Spinner>
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
