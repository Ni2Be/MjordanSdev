import axios, { AxiosResponse } from "axios";
import { IContactRequest } from "../models/contact";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const developmentSleep = (ms: number) => (response: AxiosResponse) => {
    if (process.env.REACT_APP_DEVELOPMENT_SLEEPT === "true") {
      return new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms)
      );
    } else {
      return response;
    }
  };


axios.interceptors.response.use(undefined, error => {
    console.log(error);
    console.log(error.response);
    if (error.message === "Network Error" && !error.response) {
        console.log("Network error, can't connect to server");
    }
    const { status } = error.response;
    switch (status) {
        case 404:
            // TODO add not found page
            console.log("/notfound");
            break;
        case 500:
            console.log("Server error");
            break;
        default:
            break;
    }
    throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) =>
        axios
            .get(url)
            .then(developmentSleep(500))
            .then(responseBody),
    getWithParams: (url: string, params: URLSearchParams) =>
        axios
            .get(url, { params: params })
            .then(developmentSleep(500))
            .then(responseBody),
    post: (url: string, body: {}) =>
        axios
            .post(url, body)
            .then(developmentSleep(500))
            .then(responseBody),
    put: (url: string, body: {}) =>
        axios
            .put(url, body)
            .then(developmentSleep(500))
            .then(responseBody),
    delete: (url: string) =>
        axios
            .delete(url)
            .then(developmentSleep(500))
            .then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append("File", file);
        return axios
            .post(url, formData, {
                headers: { "Content-type": "multipart/form-data" }
            })
            .then(developmentSleep(500))
            .then(responseBody);
    }
};

const Projects = {
    graphQL: (graph: string) => requests.post(`graphql`, { query: graph }).then(data => data.data),
    getAll: () => requests.get(`projects/list`),
    getDetails: (id: string) => requests.get(`projects/${id}`),
    getImage: (id: string, name: string) => requests.get(`projects/${id}/image/${name}`)
};

const Skills = {
    getAll: () => requests.get(`skills/list`)
};

const Contact = {
    sendContactRequest: (contactRequest: IContactRequest): Promise<string> =>
      requests.post(`contact/mail`, contactRequest)
};

const Agent = {
    Projects,
    Skills,
    Contact
};

export default Agent;