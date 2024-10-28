import {auth} from "@/server/auth";
import {redirect} from "next/navigation";

async function AuthPage() {
	const session = await auth();

	if (!session) {
		redirect("/auth/login");
	} else {
		redirect("/dashboard");
	}
}

export default AuthPage;
