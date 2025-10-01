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
                completeness: 8.5,
                professionalism: 9.1,
                ticketManagement: 8.3,
                slaFirstResponse: 7.9,
                slaResolution: 8.1
            }
        },
        kpi4: { name: "FCR", value: "70%" },
        kpi5: { name: "Performance after coaching", value: "+50%" },
        kpi6: { name: "Average ticket handling time", value: "11 min" },
        kpi7: { name: "CSAT", value: "3.8/5" }
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
            completeness: Number,
            professionalism: Number,
            ticketManagement: Number,
            slaFirstResponse: Number,
            slaResolution: Number
        }
    },
    kpi4: { name: String, value: String },
    kpi5: { name: String, value: String },
    kpi6: { name: String, value: String },
    kpi7: { name: String, value: String }
};