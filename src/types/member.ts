export const CATEGORIES = ["kreatif", "komunikasi", "data", "teknologi", "bisnis"] as const;
export type Category = (typeof CATEGORIES)[number];
export const REQUEST_STATUS = ["menunggu", "diterima", "dijadwalkan", "selesai"] as const;
export type RequestStatus = (typeof REQUEST_STATUS)[number];
export interface Member { id: string; name: string; role: string; category: Category; skills: string[]; wants: string; rating: number; sessions: number; bio: string }
export interface SwapSession { id: string; withId: string; topic: string; when: string; status: RequestStatus }
export interface ChatMsg { from: "me" | "them"; text: string }
