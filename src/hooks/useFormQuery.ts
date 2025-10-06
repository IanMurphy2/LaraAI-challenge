import { useQuery } from "@tanstack/react-query";
import type { IquestionResponse } from "../types";

async function fetchFormInfo() {
    const res = await fetch("/data/formInfo.Mockup.json");
    if (!res.ok) throw new Error("Error fetching form info");
    return res.json();
}

export function useFormInfo() {
    return useQuery({
        queryKey: ["formInfo"],
        queryFn: fetchFormInfo,
    });
}

export function useFormInfoById(id: number) {
    return useQuery({
        queryKey: ["formInfo", id],
        queryFn: async () => {
            const res = await fetch("/data/formInfo.Mockup.json");
            if (!res.ok) throw new Error("Error fetching form info");
            const data = await res.json();
            const formData: IquestionResponse[] = data.data;
            if (!formData.some((q) => q.id === id)) {
                throw new Error("Form not found");
            } else {
                return formData.find((q) => q.id === id);
            }
        },
        enabled: !!id,
    });
}

// export function usePostFormInfo() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async (newQuestion) => {
//             console.log("Simulating POST:", newQuestion);
//             return { ...newQuestion, id: Date.now() };
//         },
//         onSuccess: (data) => {
//             queryClient.setQueryData(["formInfo"], (old) => {
//                 if (!old) return old;
//                 return {
//                     ...old,
//                     questions: [...old.questions, data],
//                 };
//             });
//         },
//     });
// }
