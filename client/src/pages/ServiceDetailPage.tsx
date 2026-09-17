import {
    Navigate,
    useParams,
} from 'react-router-dom';

import ServiceDetail from '../components/ServiceDetail/ServiceDetail';


const VALID_SERVICES = [
    'web-ui-design',
    'web-development',
    'full-stack-mern',
    'frontend-engineering',
    'backend-api-systems',
    'admin-dashboards',
] as const;


type ServiceSlug = typeof VALID_SERVICES[number];


const ServiceDetailPage = () => {

    const {
        service,
    } = useParams<{
        service: string;
    }>();


    /*
     * Validate the service slug before rendering
     * the detail experience.
     */
    if (
        !service ||
        !VALID_SERVICES.includes(
            service as ServiceSlug
        )
    ) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    /*
     * ServiceDetail handles the actual API request
     * through useService(serviceSlug).
     *
     * The original ServiceDetail UI and animations
     * remain untouched.
     */
    return (
        <ServiceDetail
            serviceSlug={service}
        />
    );
};


export default ServiceDetailPage;