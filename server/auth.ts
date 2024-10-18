import db from "@/server/db";
import {accounts, users} from "@/server/db/schema";
import {loginSchema} from "@/server/schema/auth-schema";
import {eq} from "drizzle-orm";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import bcrypt from "bcrypt";

export const {handlers, auth, signIn, signOut} = NextAuth({
	adapter: DrizzleAdapter(db),
	session: {
		strategy: "jwt"
	},
	providers: [
		Credentials({
			name: "Email",
			credentials: {
				email: {label: "Email", type: "email", required: true},
				password: {label: "Password", type: "password", required: true},
				twoFactor: {label: "2FA Code", type: "text", required: false}
			},
			authorize: async (credentials) => {
				const {success, error, data} = loginSchema.safeParse(credentials);

				if (success) {
					const {email, password} = data;

					const existingUser = await db.query.users.findFirst({
						where: eq(users.email, email)
					});

					if (!existingUser || !existingUser.password) {
						throw new Error("User not found.");
					}

					const matchingPassword = await bcrypt.compare(password, existingUser.password);
					if (!matchingPassword) {
						throw new Error("Wrong credentials.");
					}

					return existingUser;
				} else {
					throw new Error(error?.message || "Something went wrong.");
				}
			}
		})
	],
	callbacks: {
		async jwt({token}) {
			if (!token.sub) return token;

			const existingUser = await db.query.users.findFirst({
				where: eq(users.id, token.sub)
			});
			if (!existingUser) return token;

			const existingAccount = await db.query.accounts.findFirst({
				where: eq(accounts.userId, existingUser.id)
			});

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.image = existingUser.image;
			token.twoFactorEnabled = existingUser.twoFactorEnabled;
			token.role = existingUser.role;

			return token;
		},
		async session({session, token}) {
			if (session && token.sub) {
				session.user.id = token.sub;
			}

			if (session.user && token.role) {
				session.user.role = token.role as string;
			}

			if (session.user) {
				session.user.twoFactorEnabled = token.twoFactorEnabled as boolean;
				session.user.name = token.name;
				session.user.email = token.email!;
				session.user.isOAuth = token.isOAuth;
				session.user.image = token.image;
			}

			return session;
		}
	}
});
