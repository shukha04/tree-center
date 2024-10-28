CREATE TABLE IF NOT EXISTS "emailVerificationToken" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "emailVerificationToken_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "passwordResetToken_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactorToken" (
	"id" text NOT NULL,
	"userId" text,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "twoFactorToken_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "twoFactorToken" ADD CONSTRAINT "twoFactorToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
