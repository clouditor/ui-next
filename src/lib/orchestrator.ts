import type { AssessmentResult, Metric } from "./assessment";

export interface CloudService {
    id: number
    name: string
    description: string
    requirements: Requirements
}

export interface Requirements {
    requirementIds: string[]
}

export interface Requirement {
    id: string
    name: string
    description: string
    metricIds: string[]
}

export interface ListMetricsResponse {
    metrics: Metric[];
}

export interface Certificate {
    id: string
    name: string
    serviceId: string
    issueDate: string
    expirationDate: string
    standard: string
    assuranceLevel: string
    cab: string
    description: string
    states: States
}

export interface States {
    stateIds: string[]
}

export interface State {
    state: string
    tree_id: string
    timestamp: string
    certificate_id: string
}

export interface ListCertificatesResponse {
    certificates: Certificate[];
}

export interface ListAssessmentResultsResponse {
    results: AssessmentResult[]
}

export interface ListCloudServicesResponse {
    services: CloudService[]
}

export interface ListRequirementsResponse {
    requirements: Requirement[]
}

/**
 * Requests a list of assessment results from the orchestrator service.
 * 
 * @returns an array of {@link AssessmentResult}s.
 */
export async function listAssessmentResults(): Promise<AssessmentResult[]> {
    const apiUrl = `/v1/orchestrator/assessment_results`;

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListAssessmentResultsResponse) => {
            return response.results;
        });
}

/**
 * Retrieves a particular metric from the orchestrator service.
 * 
 * @param id the metric id
 * @returns 
 */
export async function getMetric(id: number): Promise<Metric> {
    const apiUrl = `/v1/orchestrator/metrics/${id}`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: Metric) => {
            return response;
        });
}

/**
 * Retrieves a list of metrics from the orchestrator service.
 * 
 * @returns an array of {@link Metric}s.
 */
export async function listCloudServices(): Promise<CloudService[]> {
    const apiUrl = `/v1/orchestrator/cloud_services`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListCloudServicesResponse) => {
            return response.services;
        });
}

export async function updateCloudService(service: CloudService): Promise<CloudService> {
    const apiUrl = `/v1/orchestrator/cloud_services/${service.id}`

    return fetch(apiUrl, {
        method: 'PUT',
        body: JSON.stringify(service),
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: CloudService) => {
            return response;
        });
}

/**
 * Retrieves a list of metrics from the orchestrator service.
 * 
 * @returns an array of {@link Metric}s.
 */
export async function listMetrics(): Promise<Metric[]> {
    const apiUrl = `/v1/orchestrator/metrics`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListMetricsResponse) => {
            return response.metrics;
        });
}

/**
 * Retrieves a list of requirements from the orchestrator service.
 * 
 * @returns an array of {@link Requirement}s.
 */
export async function listRequirements(): Promise<Requirement[]> {
    const apiUrl = `/v1/orchestrator/requirements`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListRequirementsResponse) => {
            return response.requirements;
        });
}

/**
 * Retrieves a list of certificates from the orchestrator service.
 * 
 * @returns an array of {@link Certificate}s.
 */
 export async function listCertificates(): Promise<Certificate[]> {
    const apiUrl = `/v1/orchestrator/certificates`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListCertificatesResponse) => {
            return response.certificates;
        });
}

