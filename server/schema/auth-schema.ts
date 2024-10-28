import {z} from "zod";

export const LoginSchema = z.object({
	email: z
		.string()
		.email("Введите корректную электронную почту."),
	password: z
		.string()
		.min(1, "Введите свой пароль."),
	twoFactor: z
		.optional(z
			.number()
			.gte(100000, "Введите корректный код подтверждения.")
			.lte(999999, "Введите корректный код подтверждения.")
		)
});

export const RegisterSchema = z.object({
	firstName: z
		.string()
		.min(2, "Введите свое имя."),
	lastName: z
		.string()
		.min(2, "Введите свою фамилию."),
	email: z
		.string()
		.email("Введите корректную электронную почту."),
	password: z
		.string()
		.min(8, "Пароль должен состоять из более 8 символов."),
	passwordConfirmation: z
		.string()
		.min(1, "Подтвердите свой пароль.")
}).refine(({password}) => {
		let score = 0;
		// Contains lowercase
		if (/[a-z]/.test(password)) score += 1;
		// Contains uppercase
		if (/[A-Z]/.test(password)) score += 1;
		// Contains numbers
		if (/\d/.test(password)) score += 1;
		// Contains special characters
		if (/[^A-Za-z0-9]/.test(password)) score += 1;

		return score > 2;
	}, {
		message: "Пароль слишком слабый.",
		path: ["password"]
	})
	.refine(({password, passwordConfirmation}) => password === passwordConfirmation, {
		message: "Пароли не совпадают.",
		path: ["passwordConfirmation"]
	});

export const CheckExistingEmailSchema = z.object({
	email: z
		.string()
		.email("Введите корректную электронную почту.")
});
