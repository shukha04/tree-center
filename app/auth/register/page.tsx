import RegisterForm from "@/components/form/register-form";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

type RegisterPageProps = {};

function RegisterPage(props: RegisterPageProps) {
	return (
		<div className="h-[100vh] w-full flex items-center justify-center p-6 sm:p-0">
			<Card className="max-w-[32rem] w-full rounded-md">
				<CardHeader>
					<CardTitle className="text-3xl">Register</CardTitle>
					<CardDescription>Become our customer!</CardDescription>
				</CardHeader>
				<CardContent>
					<RegisterForm />
				</CardContent>
				<CardFooter className="justify-center">
					<p className="text-sm">
						Already have an account?{" "}
						<Button variant="link" asChild className="p-0">
							<Link href="/auth/login">
								Login!
							</Link>
						</Button>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}

export default RegisterPage;
