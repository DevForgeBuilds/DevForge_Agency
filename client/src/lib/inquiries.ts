import { apiFetch } from './api';

export interface ProjectInquiry {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    serviceOther: string;
    timeline: string;
    website: string;
    message: string;
}

export interface CreateInquiryResponse {
    success: boolean;
    message: string;
    data: {
        projectId: string;
        name: string;
        email: string;
        phone: string;
        createdAt: string;
    };
}

export const submitInquiry = (
    inquiry: ProjectInquiry
) =>
    apiFetch<CreateInquiryResponse>(
        '/inquiries',
        {
            method: 'POST',
            body: JSON.stringify(inquiry),
        }
    );