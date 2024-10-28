"use server";

import {sendEmailVerificationEmail} from "@/server/actions/email";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import db from "@/server/db";
import {users} from "@/server/db/schema";
import {LoginSchema, RegisterSchema, CheckExistingEmailSchema} from "@/server/schema/auth-schema";
import bcrypt from "bcrypt";
import {eq} from "drizzle-orm";
import {createSafeActionClient, flattenValidationErrors, returnValidationErrors} from "next-safe-action";

export const register = createSafeActionClient()
	.schema(RegisterSchema, {
		handleValidationErrorsShape: (validationErrors) => flattenValidationErrors(validationErrors).fieldErrors
	})
	.action(async ({parsedInput: {firstName, lastName, email, password}}) => {
		try {
			const existingUser = await db.query.users.findFirst({where: eq(users.email, email)});

			if (existingUser) {
				if (!existingUser.emailVerifiedAt) {
					const emailVerificationToken = await generateEmailVerificationToken(email);
					await sendEmailVerificationEmail(emailVerificationToken.email, emailVerificationToken.token);

					return {
						message: `Подтверждение электронной почты отправлено по адресу ${email}`
					};
				}
				return new Error("Данная электронная почта уже зарегистрирована.", {cause: {code: 400}});
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			await db.insert(users).values({
				email,
				name: firstName + " " + lastName,
				password: hashedPassword
			});

			const emailVerificationToken = await generateEmailVerificationToken(email);
			await sendEmailVerificationEmail(emailVerificationToken.email, emailVerificationToken.token);

			return {
				message: `Подтверждение электронной почты отправлено по адресу ${email}`
			};
		} catch (error: any) {
			return new Error("Что-то пошло не так. Попробуйте снова позже.", {cause: {code: 500}});
		}
	});

export const login = createSafeActionClient()
	.schema(LoginSchema, {
		handleValidationErrorsShape: (validationErrors) => flattenValidationErrors(validationErrors).fieldErrors
	})
	.action(async ({parsedInput: {email, password, twoFactor}}) => {
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email)
		});
		if (!existingUser || !existingUser.email) {
			return {serverError: "Пользователь не найден."};
		}
	});

export const checkExistingEmail = createSafeActionClient({throwValidationErrors: true})
	.schema(CheckExistingEmailSchema, {
		handleValidationErrorsShape: (validationErrors) => flattenValidationErrors(validationErrors).fieldErrors
	})
	.action((async ({parsedInput: {email}}) => {
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email)
		});

		if (!existingUser) {
			returnValidationErrors(CheckExistingEmailSchema, {
				email: {
					_errors: ["Эл. почта уже зарегистрирована."]
				}
			});
		}
	}));
