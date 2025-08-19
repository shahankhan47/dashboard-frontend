import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const axiosService = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
    "Content-Type": "application/json",
  },
});

// Health Check
export const getHealth = async () => {
    const response = await axiosService.get(`${BASE_URL}/`);
    return response.data;
};

// Distinct Get Projects
export const getProjects = async () => {
    const response = await axiosService.get(`${BASE_URL}/getProjects`);
    return response.data;
};

export const getProjectDetails = async (payload) => {
    const response = await axiosService.post(`${BASE_URL}/getProjectDetails`, payload);
    return response.data; 
};

// Get All Projects
export const getAllProjects = async () => {
    const response = await axiosService.get(`${BASE_URL}/getAllProjects`);
    return response.data;
};

// Get Owners
export const getOwners = async () => {
    const response = await axiosService.get(`${BASE_URL}/getOwners`);
    return response.data;
};

// Get Summary Users
export const getSummaryUsers = async () => {
    const response = await axiosService.get(`${BASE_URL}/getSummaryUsers`);
    return response.data;
};

// Get Conversation Users
export const getConversationUsers = async () => {
    const response = await axiosService.get(`${BASE_URL}/getConversationUsers`);
    return response.data;
};

// Get Checklist Assistant Threads
export const getChecklistAssistantThreads = async () => {
    const response = await axiosService.get(`${BASE_URL}/getChecklistAssistantThreads`);
    return response.data;
};

// Get Pins Users
export const getPinsUsers = async () => {
    const response = await axiosService.get(`${BASE_URL}/getPinsUsers`);
    return response.data;
};

const getDashboardServices = async () => {
    try {
        let [
            allProjects,
            projects,
            owners,
            summaryUsers,
            conversationUsers,
            threads,
            pinsUsers
        ] = await Promise.all([
            getAllProjects(),
            getProjects(),
            getOwners(),
            getSummaryUsers(),
            getConversationUsers(),
            getChecklistAssistantThreads(),
            getPinsUsers()
        ]);
    
        projects = projects?.projects || [];
        owners = owners?.owners || [];
        summaryUsers = summaryUsers || {};
        conversationUsers = conversationUsers || [];
        threads = threads?.checklist_assistant_threads || [];
        pinsUsers = pinsUsers || {};

        const totalProjects = projects.map(project => project.id);
        const summaryProjects = Object.keys(summaryUsers).map(user => summaryUsers[user]).flat(1);
        const usersWithNoProjects = Object.keys(summaryUsers).filter(user => summaryUsers[user].length === 0);
        let obsoleteProjects = summaryProjects.filter(project => !totalProjects.includes(project?.project_id));
        const activeUsers = Object.keys(summaryUsers).filter(user => summaryUsers[user].length > 0);

        allProjects.projects = allProjects?.projects?.map(project => {
            const summaryExists = summaryProjects.find(summary => summary.project_id === project.id && summary.project_name === project.name);
            return {
                ...project,
                status: (() => {
                    if (summaryExists?.status) {
                    if (["Awating codebase"].includes(summaryExists.status)) {
                        return "Awaiting Codebase";
                    }
                    if (summaryExists.status.includes("Error")) {
                        return "Error";
                    }
                    return "Active";
                    }
                    return "Inactive";
                })(),
            };
        })

        obsoleteProjects = [
          ...new Map(obsoleteProjects.map(item => [item.project_id, { 
              project_id: item.project_id, 
              project_name: item.project_name 
          }])).values()
        ];

        return {
        allProjects,
        totalProjects,
        owners,
        activeUsers,
        conversationUsers,
        usersWithNoProjects,
        obsoleteProjects
    }

    } catch (error) {
        console.error("Error loading dashboard data:", error);
        return null;
    }
}

export default getDashboardServices;