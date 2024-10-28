import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {FaFacebook, FaYandex} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";

type AuthFormWrapperProps = {
	children?: React.ReactNode,
	entry: "login" | "register" | "forgot" | "reset", // type of form in children
	title: string,
	description: string
};

function AuthFormWrapper(props: AuthFormWrapperProps) {
	return (
		<section className="flex flex-col items-center h-full px-4 py-10">
			<div className="flex justify-end items-center w-full">
				<p className="text-sm text-muted-foreground">
					{props.entry === "login" ? "Еще не зарегистрированы? " : "Уже есть аккаунт? "}
				</p>
				<Button variant="link" className="px-2" asChild>
					<Link href={props.entry === "login" ? "/auth/register" : "/auth/login"}>
						{props.entry === "login" ? "Регистрация" : "Вход"}
					</Link>
				</Button>
			</div>
			<div className="flex-1 flex items-center justify-center max-w-[400px] w-full">
				<Card className="text-center w-full">
					<CardHeader>
						<CardTitle className="text-2xl">{props.title}</CardTitle>
						<CardDescription>{props.description}</CardDescription>
					</CardHeader>
					<CardContent>
						{props.children}
					</CardContent>
					<CardFooter className="flex flex-col gap-2">
						<div className="w-full pb-4 relative">
							<Separator />
							<small className="text-muted-foreground bg-background px-2 absolute -top-1/2 left-1/2 -translate-x-1/2 text-nowrap">Или войти с помощью</small>
						</div>
						<Button variant="outline" className="w-full"><FcGoogle /> Google</Button>
						<Button variant="outline" className="w-full"><FaYandex className="text-red-500" /> Яндекс</Button>
						<Button variant="outline" className="w-full"><FaFacebook className="text-blue-600" /> Facebook</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}

export default AuthFormWrapper;
