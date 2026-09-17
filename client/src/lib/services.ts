import { useEffect, useState } from 'react';
import { apiFetch } from './api';
import type { ServiceData } from '../data/serviceData';

export interface ServiceSummary {
    number: string;
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    label: string;
    heroMeta: string[];
}

interface ListResponse {
    success: boolean;
    count: number;
    data: ServiceSummary[];
}

interface DetailResponse {
    success: boolean;
    data: ServiceData;
}

/** Fetches the lightweight list of services for the Services grid. */
export const useServices = () => {
    const [services, setServices] = useState<ServiceSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError(null);

        apiFetch<ListResponse>('/services')
            .then((res) => {
                if (!cancelled) setServices(res.data);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message || 'Failed to load services');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { services, loading, error };
};

/** Fetches full detail for one service by slug, for ServiceDetail.tsx. */
export const useService = (slug: string | undefined) => {
    const [service, setService] = useState<ServiceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) {
            setService(null);
            setLoading(false);
            return;
        }

        let cancelled = false;

        setLoading(true);
        setError(null);

        apiFetch<DetailResponse>(`/services/${slug}`)
            .then((res) => {
                if (!cancelled) setService(res.data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setService(null);
                    setError(err.message || 'Failed to load service');
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    return { service, loading, error };
};
