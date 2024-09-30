import {type AdapterAccountType} from "next-auth/adapters";
import {boolean, integer, pgEnum, pgTable, primaryKey, text, timestamp} from "drizzle-orm/pg-core";
import {nanoid} from "nanoid";

export const userRoleEnum = pgEnum("userRoles", ["user", "admin"]);

export const users = pgTable("user", {
	id: text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: text("name").notNull(),
	email: text("email").unique(),
	emailVerifiedAt: timestamp("emailVerifiedAt", {mode: "date"}),
	image: text("image"),
	password: text("password"),
	twoFactorEnabled: boolean("twoFactorEnabled").notNull().default(false),
	role: userRoleEnum("userRoles").notNull().default("user")
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, {onDelete: "cascade"}),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state")
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);


export const emailVerificationTokens = pgTable(
	"emailVerificationToken",
	{
		id: text("id")
			.notNull()
			.$defaultFn(() => nanoid()),
		token: text("token").notNull(),
		expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
		email: text("email").notNull(),
	}, (verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.id, verificationToken.token],
		}),
	})
)

export const passwordResetTokens = pgTable(
	"passwordResetToken",
	{
		id: text("id")
			.notNull()
			.$defaultFn(() => nanoid()),
		token: text("token").notNull(),
		expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
		email: text("email").notNull(),
	}, (verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.id, verificationToken.token],
		}),
	})
)

export const twoFactorTokens = pgTable(
	"twoFactorToken",
	{
		id: text("id")
			.notNull()
			.$defaultFn(() => nanoid()),
		userId: text("userId").references(() => users.id, {onDelete: "cascade"}),
		token: text("token").notNull(),
		expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
		email: text("email").notNull(),
	}, (verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.id, verificationToken.token],
		}),
	})
)
