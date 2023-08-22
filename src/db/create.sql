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
    account_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    id uuid,
    type text,
    provider text,
    providerAccountId text,
    refresh_token text,
    access_token text,
    expires_at int,
    token_type text,
    scope text,
    id_token text,
    session_state text
);

CREATE TABLE public.sessions (
    session_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    expires timestamp without time zone,
    sessionToken text,
    id uuid
);

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_id FOREIGN KEY (id) REFERENCES public.users(id);

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_id FOREIGN KEY (id) REFERENCES public.users(id);

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_id FOREIGN KEY (id) REFERENCES public.users(id);

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_patient_id FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);
