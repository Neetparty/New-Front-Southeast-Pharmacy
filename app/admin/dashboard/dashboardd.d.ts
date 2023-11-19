export type LineChartSalesValue = {
    data_this_year: number[];
    data_last_year: number[];
}

export type BarChartTotalOrders = {
    data_this_year: number[];
    data_last_year: number[];
};

export type PageVisits = {
    page_name: string;
    visitors: string;
    unique_users: string;
    bounce_rate:string;
}

export type SocialTraffic = {
    referral: string;
    visitors: string;
    percent: string;
}

export type CardNewUser = {
    new_user: string;
    percent_increase_or_decrease: string;
}

export type CardPerformance = {
    performance_percent: string;
    percent_increase_or_decrease: string;
}

export type CardTotalProduct = {
    sales: string;
    percent_increase_or_decrease: string;
}

export type CardSocialTraffic = {
    traffic: string;
    percent_increase_or_decrease: string;
}

