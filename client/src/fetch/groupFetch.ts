import { GROUP_CHAT_URL } from "@/lib/apiEndPoints";

export async function fetchChatGroup(token: string) {
    const res = await fetch(GROUP_CHAT_URL, {
        headers: {
            Authorization: token
        },
        next: {
            revalidate: 60 * 60,
            tags: ["dashboard"]
        }
    })
    console.log('res :>> ', res);
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    const response = await res.json()

    if (response?.data) {
        return response?.data
    }
    return []
}