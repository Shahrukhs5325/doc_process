import axios from 'axios'
// import { API_URL } from "@env"



const currentSession = async () => {
    try {
        // const data = await Auth.currentSession();
        // return data
    } catch (err) {
        console.log(err);
        return null;
    }
}

const instance = axios.create({
    baseURL: "https://fozw51xzx4.execute-api.us-east-1.amazonaws.com"
})

// global request from all apis,
instance.interceptors.request.use(
    async (config) => {

        config.headers.Accept = "application/json";
        config.headers['Content-Type'] = 'application/json';
        const token = await currentSession();

        // if (token) {
        //     config.headers.Authorization = `Bearer ${token?.accessToken?.jwtToken}`;
        // }

        // console.log("\n\n\n** url **\n",(API_URL+config?.url))
        // console.log("\n\n\n** token **\n",(token?.accessToken?.jwtToken))
        return config;
    },
    (error) => Promise.reject(error)
),

    // global response from all apis
    instance.interceptors.response.use(
        async (response) => {
            return response
        },

        (error) => {
            if ([401].includes(error.response.status)) {
                console.log("Invalid token or expired token.");

            }
            return Promise.reject(error)
        }
    )

export default instance