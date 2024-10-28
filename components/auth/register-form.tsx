"use client";

import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useToast} from "@/hooks/use-toast";
import {checkExistingEmail, register} from "@/server/actions/auth";
import {RegisterSchema} from "@/server/schema/auth-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useHookFormAction} from "@next-safe-action/adapter-react-hook-form/hooks";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useAction} from "next-safe-action/hooks";
import {useEffect, useMemo, useState} from "react";
import {z} from "zod";

type FormValuesType = z.infer<typeof RegisterSchema>

type StepType = {
	stepName: string,
	description: string,
	fields?: Array<keyof FormValuesType> // keyof form schema object
}

type PasswordCheckListType = {
	hasLength: boolean,
	hasLowercase: boolean,
	hasUppercase: boolean,
	hasNumber: boolean,
	hasSpecial: boolean
}

const steps: StepType[] = [
	{
		stepName: "Эл. почта",
		description: "Введити свою эл. почту для того чтобы продолжить",
		fields: ["email"]
	},
	{
		stepName: "Персональная информация",
		description: "Введитя имя и фамилию чтобы мы знали как к вам обращаться",
		fields: ["firstName", "lastName"]
	},
	{
		stepName: "Пароль",
		description: "Придумайте безопасный пароль",
		fields: ["password", "passwordConfirmation"]
	}
];

function RegisterForm() {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [passwordCheckList, setPasswordCheckList] = useState<Partial<PasswordCheckListType>>({});

	const {toast} = useToast();

	const passwordStrength = useMemo<number>(() => {
		return 100 / 5 * Object.values(passwordCheckList).filter(value => value).length;
	}, [passwordCheckList])

	const getByEmailAction = useAction(checkExistingEmail);
	const {
		form,
		action: registerAction,
		handleSubmitWithAction
	} = useHookFormAction(register, zodResolver(RegisterSchema), {
		formProps: {
			defaultValues: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				passwordConfirmation: ""
			},
			mode: "onChange"
		}
	});

	useEffect(() => {
		const currentPassword = form.watch("password");

		setPasswordCheckList({
			hasLength: currentPassword.length > 8,
			hasLowercase: /[a-z]/.test(currentPassword),
			hasUppercase: /[A-Z]/.test(currentPassword),
			hasNumber: /\d/.test(currentPassword),
			hasSpecial: /[^A-Za-z0-9]/.test(currentPassword)
		})
	}, [form.getValues("password")]);

	const handleCheckEmail = async () => {
		const isCurrentStepValid = await form.trigger("email", {shouldFocus: true});
		if (!isCurrentStepValid) return;

		getByEmailAction.executeAsync({email: form.getValues("email")}).then((result) => {
			if (result) {
				if (result.serverError) {
					toast({title: "Ошибка сервера.", description: result.serverError, variant: "destructive"})
				} else if (result.validationErrors?.email) {
					form.setError("email", {message: result.validationErrors?.email[0], type: "value"});
				} else {
					setCurrentStep((prevStep) => prevStep + 1);
				}
			} else {
				toast({title: "Ошибка сервера.", variant: "destructive"})
			}
		});
	};

	const handleNext = async () => {
		const fields = steps[currentStep].fields;
		const isCurrentStepValid = await form.trigger(fields as Array<keyof FormValuesType>, {shouldFocus: true});
		if (!isCurrentStepValid) return;

		if (currentStep < steps.length - 1) {
			setCurrentStep((prevStep) => prevStep + 1);
		}
	};

	const handlePrev = () => {
		if (currentStep > 0) {
			setCurrentStep((prevStep) => prevStep - 1);
		}
	};

	return (
		<AuthFormWrapper
			entry="register"
			title="Создать аккаунт"
			description={steps[currentStep].description}
		>
			<Form {...form}>
				<form onSubmit={handleSubmitWithAction} className="space-y-2">
					<div className="space-y-2">
						<FormField
							control={form.control}
							name="email"
							render={({field}) => (
								<FormItem className={currentStep === 0 ? "" : "hidden invisible"}>
									<FormControl>
										<Input placeholder="Эл. почта" type="email" autoComplete="home email webauthn" {...field} />
									</FormControl>
									<FormMessage className="text-start" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="firstName"
							render={({field}) => (
								<FormItem className={currentStep === 1 ? "" : "hidden invisible"}>
									<FormControl>
										<Input placeholder="Имя" type="text" autoComplete="given-name webauthn" {...field} />
									</FormControl>
									<FormMessage className="text-start" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({field}) => (
								<FormItem className={currentStep === 1 ? "" : "hidden invisible"}>
									<FormControl>
										<Input placeholder="Фамилия" type="text" autoComplete="family-name webauthn" {...field} />
									</FormControl>
									<FormMessage className="text-start" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({field}) => (
								<FormItem className={currentStep === 2 ? "" : "hidden invisible"}>
									<FormControl>
										<Input placeholder="Пароль" type="text" autoComplete="new-password webauthn" {...field} />
									</FormControl>
									<div className="flex items-center gap-2">
										<small>Надежность: </small>
										<Progress className="h-[3px]" value={passwordStrength} />
									</div>
									<FormMessage className="text-start" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="passwordConfirmation"
							render={({field}) => (
								<FormItem className={currentStep === 2 ? "" : "hidden invisible"}>
									<FormControl>
										<Input
											placeholder="Подтверждение пароля"
											type="password"
											autoComplete="new-password webauthn" {...field} />
									</FormControl>
									<FormMessage className="text-start" />
								</FormItem>
							)}
						/>
					</div>
					{currentStep === 0 ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										className="w-full"
										type="button"
										onClick={handleCheckEmail}
										disabled={getByEmailAction.isExecuting || !!form.formState.errors.email}
									>
										{getByEmailAction.isExecuting ? (
											<div className="border-2 w-4 h-4 border-primary-foreground border-r-primary rounded-full animate-spin" />
										) : "Продолжить"}
									</Button>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p>{steps[currentStep + 1].stepName}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<div className="flex justify-between items-center">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size="icon"
											variant="destructive"
											type="button"
											onClick={handlePrev}
										>
											<ArrowLeft />
										</Button>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>{steps[currentStep - 1].stepName}</p>
									</TooltipContent>
								</Tooltip>
								{currentStep === steps.length - 1 ? (
									<Button type="submit" disabled={registerAction.isExecuting}>
										Завершить регистрацию
									</Button>
								) : (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												size="icon"
												type="button"
												onClick={handleNext}
											>
												<ArrowRight />
											</Button>
										</TooltipTrigger>
										<TooltipContent side="bottom">
											<p>{steps[currentStep + 1].stepName}</p>
										</TooltipContent>
									</Tooltip>
								)}
							</TooltipProvider>
						</div>
					)}
				</form>
			</Form>
		</AuthFormWrapper>
	)
		;
}

export default RegisterForm;
