import {z} from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.email("Please provide correct email address."),
	password: z
		.string()
		.min(1, "Please enter your password."),
	twoFactor: z
		.optional(z
			.number()
			.gte(100000, "Please enter correct 2FA code.")
			.lte(999999, "Please enter correct 2FA code.")
		)
})

export const registerSchema = z.object({
	firstName: z
		.string()
		.min(2, "Please provide correct first name. It should contain more than 2 letters."),
	lastName: z
		.string()
		.min(2, "Please provide correct last name. It should contain more than 2 letters."),
	email: z
		.string()
		.email("Please provide correct email address."),
	password: z
		.string()
		.min(8, "Password should contain more than 8 letters."),
	passwordConfirmation: z
		.string()
		.min(1, "Please enter your password confirmation.")
}).refine(({password, passwordConfirmation}) => password === passwordConfirmation, {
	message: "Password confirmation do not match the password.",
	path: ["passwordConfirmation"],
});
