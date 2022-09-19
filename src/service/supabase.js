import Axios from "axios";
import { getGoals } from "./clickup";
import _ from 'lodash';
import credentials from "constants/credentials";
const defaultAxios = Axios.create({
    headers: {
        apiKey: credentials.SUPABASE_API_KEY,
        Authorization:
            `Bearer ${credentials.SUPABASE_API_KEY}`,
    },
});

defaultAxios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export const getMetricsSelect = async ({
    data = {},
    headers = {},
    params = {},
    path = {},
} = {}) => {
    let goals = await getGoals();
    goals = goals.goals;
    let response = await defaultAxios({
        url: `${credentials.SUPABASE_URL}/rest/v1/metrics?select=*`,
        method: "get",
        headers,
        data,
    });
    let metricsData = [];
    for (let r in response) {
        let goal = goals.find(g => g.id === response[r].goalId);
        let categories = await defaultAxios({
            url: `${credentials.SUPABASE_URL}/rest/v1/metricsCategories?metricsId=eq.${response[r]?.id}&select=name,id`,
            method: "get",
            headers,
            data,
        });
        let categoryTargets = [];
        if(categories?.length){
            for (let c in categories) {
                let target = await getCategoryResult(categories[c].id);
                if (target.length) {
                    for (let t in target) {
                        categoryTargets.push({
                            categoryId: categories[c].id,
                            categoryName: categories[c].name,
                            month: target[t].month,
                            result: target[t].target
                        })
                    }
                }
            }
            categoryTargets = _.groupBy(categoryTargets, 'month');
            metricsData.push(
                {
                    goalId: goal?.id,
                    name: response[r].name,
                    goalName: goal?.name,
                    goalPercentage: Math.round(goal?.percent_completed * 100),
                    link: `https://app.clickup.com/${goal?.team_id}/goals/${goal?.pretty_id}`,
                    categories: categories.map(c => { return { name: c.name, id: c.id } }),
                    results: categoryTargets
                }
            );
        }
        
    }
    return metricsData;
};

export const createMetrics = (input) => {
    return defaultAxios({
        url: `${credentials.SUPABASE_URL}/rest/v1/metrics`,
        method: "post",
        data: input,
        headers: {
            Prefer: "return=representation"
        }
    });
}

export const createCategories = (input) => {
    return defaultAxios({
        url: `${credentials.SUPABASE_URL}/rest/v1/metricsCategories`,
        method: "post",
        data: input,
        headers: {
            Prefer: "return=representation"
        }
    });
}

const getCategoryResult = (catId) => {
    return defaultAxios({
        url: `${credentials.SUPABASE_URL}/rest/v1/categoryResult?categoryId=eq.${catId}&select=*`,
        method: "get",
        headers: {
            Prefer: "return=representation"
        }
    });
}

export const createTargets = (input) => {
    return defaultAxios({
        url: `${credentials.SUPABASE_URL}/rest/v1/categoryResult`,
        method: "post",
        data: input,
        headers: {
            Prefer: "return=representation"
        }
    });
}