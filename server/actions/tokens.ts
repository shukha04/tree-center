"use server";

import db from "@/server/db";
import {emailVerificationTokens} from "@/server/db/schema";
import crypto from "crypto";
import {eq} from "drizzle-orm";

export const getEmailVerificationToken = async (email: string) => {
	try {
		return await db.query.emailVerificationTokens.findFirst({
			where: eq(emailVerificationTokens.email, email)
		});
	} catch (error: any) {
		throw new Error(error)
	}
}

export const generateEmailVerificationToken = async (email: string) => {
	try {
		const token = crypto.randomUUID()
		const expiresAt = new Date(new Date().getTime() + 3600 * 1000)

		const existingToken = await getEmailVerificationToken(email)
		if (existingToken) {
			await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.id, existingToken.id))
		}

		const newToken = await db.insert(emailVerificationTokens).values({
			email,
			token,
			expiresAt
		}).returning();

		return newToken[0]
	} catch (error: any) {
		throw new Error(error)
	}
}
