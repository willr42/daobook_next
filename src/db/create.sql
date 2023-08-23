CREATE SCHEMA public;

CREATE TABLE public.consults (
    consult_id serial PRIMARY KEY NOT NULL,
    patient_id uuid,
    id uuid,
    consult_time timestamp without time zone,
    main_complaint text,
    tongue text,
    pulse text,
    prescription_name text,
    prescription_composition text,
    prescription_dosage text,
    prescription_notes text
);

CREATE TABLE public.patients (
    patient_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    first_name text,
    last_name text,
    email text,
    dob date
);


CREATE TABLE public.users (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    pass text,
    role text,
    first_name text,
    last_name text,
    ahpra text,
    email text,
    email_verified timestamp without time zone DEFAULT NULL,
    updated_at timestamp without time zone DEFAULT now()
);

CREATE TABLE public.accounts (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    type text,
    provider text,
    provider_account_id text,
    refresh_token text,
    access_token text,
    expires_at int,
    token_type text,
    scope text,
    id_token text,
    session_state text
);

CREATE TABLE public.sessions (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    expires timestamp without time zone,
    session_token text,
    user_id uuid
);

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_user_id FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_patient_id FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;
