export interface AssessmentResult {
    evidenceId: string
    resourceId: string
    resourceTypes: string[]
    compliant: boolean
    metricId: string
    timestamp: string
    metricConfiguration: MetricConfiguration
}

export interface MetricConfiguration {
    targetValue: object
    operator: string
    isDefault: boolean
}

export interface Metric {
    id: string
    name: string
    description: string
    category: string
}

export interface MetricImplementation {
    metricId: string
    lang: string
    code: string
}
