"use client";

import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {registerSchema} from "@/server/schema/auth-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

type RegisterFormProps = {};

function RegisterForm(props: RegisterFormProps) {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirmation: ""
		}
	});

	const onSubmit = () => {

	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex gap-4 gap-y-2 items-center flex-wrap">
					<FormField
						control={form.control}
						name="firstName"
						render={({field}) => (
							<FormItem className="min-w-52 flex-1">
								<FormLabel className="text-xs font-medium">First Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your first name"
										type="text"
										autoComplete="given-name webauthn" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({field}) => (
							<FormItem className="min-w-52 flex-1">
								<FormLabel className="text-xs font-medium">Last Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your last name"
										type="text"
										autoComplete="family-name webauthn" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-xs font-medium">Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" type="email" autoComplete="username webauthn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-xs font-medium">Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter new password"
									type="password"
									autoComplete="new-password webauthn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-xs font-medium">Password confirmation</FormLabel>
							<FormControl>
								<Input
									placeholder="Confirm your password"
									type="password"
									autoComplete="new-password webauthn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">Register</Button>
			</form>
		</Form>
	);
}

export default RegisterForm;
