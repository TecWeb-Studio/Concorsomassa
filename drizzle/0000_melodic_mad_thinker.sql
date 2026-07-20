CREATE TABLE `categorie_competizione` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`slug` text NOT NULL,
	`descrizione` text DEFAULT '' NOT NULL,
	`chi_puo_iscriversi` text DEFAULT '' NOT NULL,
	`durata_prova` text DEFAULT '' NOT NULL,
	`criteri_valutazione` text DEFAULT '' NOT NULL,
	`premio_oro` real DEFAULT 0 NOT NULL,
	`premio_argento` real DEFAULT 0 NOT NULL,
	`premio_bronzo` real DEFAULT 0 NOT NULL,
	`prezzo_iscrizione` real NOT NULL,
	`posti_disponibili` integer NOT NULL,
	`posti_occupati` integer DEFAULT 0 NOT NULL,
	`attivo` integer DEFAULT true NOT NULL,
	`ordine` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categorie_competizione_slug_unique` ON `categorie_competizione` (`slug`);--> statement-breakpoint
CREATE TABLE `iscrizioni_categorie` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`categoria_id` text NOT NULL,
	`prezzo_bloccato` real NOT NULL,
	`numero_iscrizione` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoria_id`) REFERENCES `categorie_competizione`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `iscrizioni_categorie_numero_iscrizione_unique` ON `iscrizioni_categorie` (`numero_iscrizione`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`total_price` real NOT NULL,
	`stripe_session_id` text,
	`stripe_payment_intent_id` text,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`cognome` text DEFAULT '' NOT NULL,
	`email` text NOT NULL,
	`telefono` text DEFAULT '' NOT NULL,
	`professione` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);