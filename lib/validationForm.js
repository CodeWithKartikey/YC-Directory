import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(10).max(250),
    category: z.string().min(3).max(25),
    image: z.string().url(),
    pitch: z.string().min(10).max(1000)
});