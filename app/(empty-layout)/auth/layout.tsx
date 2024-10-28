import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import {ScrollArea} from "@/components/ui/scroll-area";
import Logo from "@/images/logo";
import Link from "next/link";

type AuthLayoutProps = Readonly<{children?: React.ReactNode}>;

function AuthLayout(props: AuthLayoutProps) {
	return (
		<div className="h-svh w-screen flex">
			<div className="w-1/2 bg-primary text-primary-foreground p-6 pb-10 xl:p-12 xl:pb-16 flex-col justify-between items-start hidden lg:flex">
				<Link href="/">
					<Logo className="h-10" />
				</Link>
				<p className="">
					Добро пожаловать в Tree Center, ваш лучший выбор для приобретения красивых, отборных растений! Войдите в свой
					аккаунт, чтобы получить доступ к заказам и ознакомиться с нашим постоянно растущим ассортиментом растений для
					сада. Давайте внесём в вашу жизнь немного больше зелени — одно растение за раз!
				</p>
			</div>
			<ScrollArea className="w-full lg:w-1/2 h-full">
				{props.children}
			</ScrollArea>
		</div>
	);
}

export default AuthLayout;
