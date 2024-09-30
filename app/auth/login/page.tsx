import {Button} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import Link from "next/link";

type LoginPageProps = {};

function LoginPage(props: LoginPageProps) {
	return (
		<div className="h-[100vh] w-full flex items-center justify-center p-6 sm:p-0">
			<Card className="max-w-[32rem] w-full rounded-md">
				<CardHeader>
					<CardTitle className="text-3xl">Log In</CardTitle>
					<CardDescription>Welcome back!</CardDescription>
				</CardHeader>
				<CardContent>
				</CardContent>
				<CardFooter className="justify-center">
					<p className="text-sm">
						Do not have an account yet?{" "}
						<Button variant="link" asChild className="p-0">
							<Link href="/auth/register">
								Sign Up!
							</Link>
						</Button>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}

export default LoginPage;
