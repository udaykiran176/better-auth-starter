"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { currentUser: null };
        }

        const currentUser = await db.query.user.findFirst({
            where: eq(user.id, session.user.id),
        });

        if (!currentUser) {
            return { currentUser: null };
        }

        return {
            ...session,
            currentUser
        };
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        return { currentUser: null };
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })

        return {
            success: true,
            message: "Signed in successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const signUp = async (email: string, password: string, username: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username
            }
        })

        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const getUsers = async () => {
    try {
        const users = await db.query.user.findMany();

        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}