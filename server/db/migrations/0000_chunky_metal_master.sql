DO $$ BEGIN
 CREATE TYPE "public"."userRoles" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"emailVerifiedAt" timestamp,
	"image" text,
	"password" text NOT NULL,
	"twoFactorEnabled" boolean DEFAULT false,
	"userRoles" "userRoles" DEFAULT 'user',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
