import {z} from "zod";

export const loginSchema = z.object({
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
})

export const registerSchema = z.object({
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
}).refine(({password, passwordConfirmation}) => password === passwordConfirmation, {
	message: "Пароли не совпадают.",
	path: ["passwordConfirmation"],
});
