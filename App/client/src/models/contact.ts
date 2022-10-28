import { IReCaptchaRequest } from "./recaptcha";

export interface IContactInfo {
    name: string;
    mail: string;
    message: string;
}
export interface IContactRequest {
    contactInfo: IContactInfo;
    reCaptchaRequest: IReCaptchaRequest;
}