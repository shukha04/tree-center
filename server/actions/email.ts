"use server";

import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_KEY);

const domain = () => {
	if (typeof window !== "undefined") return "";
	if (process.env.VERCEL_URL) return `https://${process.env.DOMAIL_URL}`;
	return "http://localhost:3000";
};

export const sendEmailVerificationEmail = async (email: string, token: string) => {
	try {
		const verificationLink = `${domain}/auth/verify?token=${token}`;

		const {data, error} = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject: "Tree Center - Verify your email",
			html: `<p>Click <a href="${verificationLink}">here</a> to verify your email and continue!</p>`
		});

		if (error) {
			return Error(error.message);
		}

		if (data) return data;
	} catch (error: any) {
		throw new Error(error);
	}
};
