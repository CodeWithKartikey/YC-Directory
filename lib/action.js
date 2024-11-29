'use server';

import slugify from 'slugify';

import { auth } from '@/auth';

import { writeClient } from '@/sanity/lib/write-client';

import { parseServerActionResponse } from '@/lib/utils';

export const createPitch = async (state, formData, image, pitch) => {
    
    const session = await auth();
    if(!session) return parseServerActionResponse({ error: "You are not login, Please login first.", status: "ERROR"});
    const { title, description, category } = Object.fromEntries(
        Array.from(formData).filter(([key]) => key !== "pitch" && key !== "image")
    );
    const slug = slugify(title, { lower: true, strict: true });
    try {
        const startup = {
            _type: "startup",
            title,
            slug: {
                _type: "slug",
                current: slug,
            },
            description,
            category,
            image,
            author: {
                _type: "reference",
                _ref: session?.user?.id,
            },
            pitch,
        }
    const result = await writeClient.create(startup);
    return parseServerActionResponse({ ...result, error: "", status: "SUCCESS" });
    } catch (error) {
        return parseServerActionResponse({ error: "Failed to create pitch.", status: "ERROR" });
    }
};