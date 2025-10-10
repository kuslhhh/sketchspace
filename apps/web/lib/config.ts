const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!wsUrl) throw new Error("❌ Missing NEXT_PUBLIC_WS_URL in .env");
if (!backendUrl) throw new Error("❌ Missing NEXT_PUBLIC_BACKEND_URL in .env");

export const WS_URL = wsUrl;
export const BACKEND_URL = backendUrl;
