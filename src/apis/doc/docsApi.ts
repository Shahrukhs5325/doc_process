import instance from "../apiInstance";

export const uploadFiles = async (payload: any) => {
    const response = await instance.post("/idp-dev/upload-and-split-file", payload);
    return response;
};

export const getAllFiles = async () => {
    const response = await instance.post("/idp-dev/get-main-files", { "userEmail": "aa@yopmail.com" });
    return response;
};

export const splitFiles = async (fileKey: string) => {
    const response = await instance.post("/idp-dev/get-splitted-files", { fileKey });
    return response;
};

export const deleteFiles = async (fileKey: string) => {
    const response = await instance.post(`/idp-dev/delete-files`, { fileKey });
    return response;
};

export const sendEmailNotification = async () => {
    const response = await instance.post(`/send-upload-email`);
    return response;
};