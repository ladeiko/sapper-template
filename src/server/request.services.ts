import type {Services} from "../shared/services";

export function setServicesForRequest(req: any, services: Services) {
    req.services = services;
}

export function getServicesFromRequest(req: any): Services {
    return req.services;
}
