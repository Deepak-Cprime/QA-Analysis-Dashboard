/**
 * Dashboard KPI Data Model
 * Contains the static dashboard metrics that will eventually come from external endpoints
 */

export const getDashboardKPIs = () => {
    return {
        kpi1: { name: "Average QA scores", value: "8.6" },
        kpi2: { name: "Error rates", value: "15%" },
        kpi3: {
            name: "Pillar wise performance",
            value: "Good",
            pillars: {
                empathy: 8.2,
                clarity: 7.8,
                professionalism: 9.1,
                completeness: 8.5,
                accuracy: 8.9,
                efficiency: 7.6,
                resolutionQuality: 8.7
            }
        },
        kpi4: { name: "FCR", value: "70%" },
        kpi5: { name: "Performance after coaching", value: "+50%" },
        kpi6: { name: "Average ticket handling time", value: "11 min" }
    };
};

/**
 * Dashboard data schema for validation
 */
export const dashboardSchema = {
    kpi1: { name: String, value: String },
    kpi2: { name: String, value: String },
    kpi3: {
        name: String,
        value: String,
        pillars: {
            empathy: Number,
            clarity: Number,
            professionalism: Number,
            completeness: Number,
            accuracy: Number,
            efficiency: Number,
            resolutionQuality: Number
        }
    },
    kpi4: { name: String, value: String },
    kpi5: { name: String, value: String },
    kpi6: { name: String, value: String }
};