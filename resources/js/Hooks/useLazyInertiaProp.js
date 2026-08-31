import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function useLazyInertiaProp({ prop, active }) {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!active || loaded) {
            return;
        }

        router.reload({
            only: [prop],

            onStart: () => {
                setLoading(true);
                setError(null);
            },

            onSuccess: () => {
                setLoaded(true);
            },

            onError: () => {
                setError("No se pudieron cargar los datos.");
            },

            onFinish: () => {
                setLoading(false);
            },
        });
    }, [active]);

    return {
        loading,
        loaded,
        error,
    };
}
