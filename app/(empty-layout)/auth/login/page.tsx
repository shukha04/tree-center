import AuthFormWrapper from "@/components/auth/auth-form-wrapper";

function LoginPage() {
	return (
		<AuthFormWrapper
			entry="login"
			title="Войти в аккаунт"
			description="Войдите в свой аккаунт для доступа к своим данным"
		>
			<h1>Login page</h1>
		</AuthFormWrapper>
	);
}

export default LoginPage;
