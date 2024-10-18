import MotionNavCard from "@/components/navigation/motion-nav-card";
import {Button} from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from "@/components/ui/navigation-menu";
import Logo from "@/images/logo";
import {LogIn, ShoppingCart} from "lucide-react";
import Link from "next/link";

type NavbarProps = {};

function Navbar(props: NavbarProps) {
	return (
		<NavigationMenu className="max-w-8xl w-full fixed top-4 left-1/2 -translate-x-1/2">
			<MotionNavCard // needed it as a separate component to keep Navbar component ssr
				className="w-full px-8 py-3"
				initial={{y: -75, opacity: 0}}
				animate={{y: 0, opacity: 1}}
			>
				<NavigationMenuList className="flex justify-between items-center space-x-2">
					<NavigationMenuItem className="flex-1">
						<Link href="/" passHref legacyBehavior>
							<NavigationMenuLink>
								<Logo className="h-8" />
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Button variant="ghost">
								Корзина <ShoppingCart />
							</Button>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Button asChild>
							<NavigationMenuLink asChild>
								<Link href="/auth/login">
									Войти <LogIn />
								</Link>
							</NavigationMenuLink>
						</Button>
					</NavigationMenuItem>
				</NavigationMenuList>
			</MotionNavCard>
		</NavigationMenu>
	);
}

export default Navbar;
