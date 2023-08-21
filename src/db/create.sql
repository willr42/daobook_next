CREATE SCHEMA public;

CREATE TABLE public.consults (
    consult_id serial PRIMARY KEY NOT NULL,
    patient_id uuid,
    doctor_id uuid,
    consult_time timestamp without time zone,
    main_complaint text,
    tongue text,
    pulse text,
    prescription_name text,
    prescription_composition text,
    prescription_dosage text,
    prescription_notes text
);

CREATE TABLE public.doctors (
    doctor_id uuid NOT NULL,
    ahpra text
);

CREATE TABLE public.patients (
    patient_id uuid NOT NULL,
    dob date
);


CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name text
);

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.users (
    user_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    pass text,
    role_id integer,
    first_name text,
    last_name text,
    email text,
    email_verified timestamp without time zone DEFAULT NULL,
    updated_at timestamp without time zone DEFAULT now()
);

CREATE TABLE public.accounts (
    account_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
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

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


CREATE TABLE public.sessions (
    session_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    expires timestamp without time zone,
    sessionToken text,
    user_id uuid
);

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);

SELECT pg_catalog.setval('public.consults_consult_id_seq', 1, false);

SELECT pg_catalog.setval('public.roles_role_id_seq', 1, false);

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (patient_id);

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_doctor_id FOREIGN KEY (doctor_id) REFERENCES public.doctors(doctor_id);

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_patient_id FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctor_user_key FOREIGN KEY (doctor_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patient_user_id FOREIGN KEY (patient_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_role_id FOREIGN KEY (role_id) REFERENCES public.roles(role_id);
