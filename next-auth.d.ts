import {type DefaultJWT} from "next-auth/jwt";
import {type DefaultSession} from "next-auth";

export type ExtendSessionUser = DefaultSession["user"] & {
	id: string
	role: string
	twoFactorEnabled: boolean
	isOAuth: boolean
	image: string | null
}

export type ExtendJWTUser = DefaultJWT["user"] & {
	id: string
	role: string
	twoFactorEnabled: boolean
	isOAuth: boolean
	image: string | null
}

declare module "next-auth" {
	interface Session {
		user: ExtendSessionUser;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends ExtendJWTUser {
	}
}
