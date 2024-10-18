"use server";

import {sendEmailVerificationEmail} from "@/server/actions/email";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import db from "@/server/db";
import {users} from "@/server/db/schema";
import {loginSchema, registerSchema} from "@/server/schema/auth-schema";
import bcrypt from "bcrypt";
import {eq} from "drizzle-orm";
import {createSafeActionClient} from "next-safe-action";

export const credentialsRegister = createSafeActionClient()
	.schema(registerSchema)
	.action(async ({parsedInput: {firstName, lastName, email, password}}) => {
		try {
			const existingUser = await db.query.users.findFirst({where: eq(users.email, email)});

			if (existingUser) {
				if (!existingUser.emailVerifiedAt) {
					const emailVerificationToken = await generateEmailVerificationToken(email);
					await sendEmailVerificationEmail(emailVerificationToken.email, emailVerificationToken.token);

					return {
						message: `Подтверждение электронной почты отправлено по адресу ${email}`
					}
				}
				throw new Error("Данная электронная почта уже зарегистрирована.");
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			await db.insert(users).values({
				email,
				name: firstName + " " + lastName,
				password: hashedPassword,
			})

			const emailVerificationToken = await generateEmailVerificationToken(email);
			await sendEmailVerificationEmail(emailVerificationToken.email, emailVerificationToken.token);

			return {
				message: `Подтверждение электронной почты отправлено по адресу ${email}`
			}
		} catch (error: any) {
			return new Error(error);
		}
	});

export const credentialsLogin = createSafeActionClient()
	.schema(loginSchema)
	.action(async ({parsedInput: {email, password, twoFactor}}) => {
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email)
		});
		if (!existingUser || !existingUser.email) {
			throw new Error("Пользователь не найден.");
		}
	});
