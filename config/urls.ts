import { environmentConfig } from './environment';
const baseURL = environmentConfig.production.baseURL;
export const urls = {
    baseURL,
    login: `${baseURL}/login`,
    claims: `${baseURL}/u/claims?showTestClaims=true`,
};