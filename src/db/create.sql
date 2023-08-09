--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

-- Started on 2023-08-16 18:07:03 AEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 25476)
-- Name: public; Type: SCHEMA; Schema: -; Owner: daoadmin
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO daoadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 25563)
-- Name: consults; Type: TABLE; Schema: public; Owner: daoadmin
--

CREATE TABLE public.consults (
    consult_id integer NOT NULL,
    patient_id integer,
    doctor_id integer,
    consult_time timestamp without time zone,
    main_complaint text,
    tongue text,
    pulse text,
    prescription_name text,
    prescription_composition text,
    prescription_dosage text,
    prescription_notes text
);


ALTER TABLE public.consults OWNER TO daoadmin;

--
-- TOC entry 215 (class 1259 OID 25562)
-- Name: consults_consult_id_seq; Type: SEQUENCE; Schema: public; Owner: daoadmin
--

CREATE SEQUENCE public.consults_consult_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consults_consult_id_seq OWNER TO daoadmin;

--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 215
-- Name: consults_consult_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: daoadmin
--

ALTER SEQUENCE public.consults_consult_id_seq OWNED BY public.consults.consult_id;


--
-- TOC entry 209 (class 1259 OID 25482)
-- Name: doctors; Type: TABLE; Schema: public; Owner: daoadmin
--

CREATE TABLE public.doctors (
    doctor_id integer NOT NULL,
    ahpra text
);


ALTER TABLE public.doctors OWNER TO daoadmin;

--
-- TOC entry 210 (class 1259 OID 25487)
-- Name: patients; Type: TABLE; Schema: public; Owner: daoadmin
--

CREATE TABLE public.patients (
    patient_id integer NOT NULL,
    dob date
);


ALTER TABLE public.patients OWNER TO daoadmin;

--
-- TOC entry 211 (class 1259 OID 25490)
-- Name: roles; Type: TABLE; Schema: public; Owner: daoadmin
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name text
);


ALTER TABLE public.roles OWNER TO daoadmin;

--
-- TOC entry 212 (class 1259 OID 25495)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: daoadmin
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO daoadmin;

--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 212
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: daoadmin
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 213 (class 1259 OID 25496)
-- Name: users; Type: TABLE; Schema: public; Owner: daoadmin
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    pass text,
    role_id integer,
    first_name text,
    last_name text,
    email text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO daoadmin;

--
-- TOC entry 214 (class 1259 OID 25503)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: daoadmin
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO daoadmin;

--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: daoadmin
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3353 (class 2604 OID 25566)
-- Name: consults consult_id; Type: DEFAULT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.consults ALTER COLUMN consult_id SET DEFAULT nextval('public.consults_consult_id_seq'::regclass);


--
-- TOC entry 3349 (class 2604 OID 25504)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 3352 (class 2604 OID 25505)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3517 (class 0 OID 25563)
-- Dependencies: 216
-- Data for Name: consults; Type: TABLE DATA; Schema: public; Owner: daoadmin
--

COPY public.consults (consult_id, patient_id, doctor_id, consult_time, main_complaint, tongue, pulse, prescription_name, prescription_composition, prescription_dosage, prescription_notes) FROM stdin;
\.


--
-- TOC entry 3510 (class 0 OID 25482)
-- Dependencies: 209
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: daoadmin
--

COPY public.doctors (doctor_id, ahpra) FROM stdin;
\.


--
-- TOC entry 3511 (class 0 OID 25487)
-- Dependencies: 210
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: daoadmin
--

COPY public.patients (patient_id, dob) FROM stdin;
\.


--
-- TOC entry 3512 (class 0 OID 25490)
-- Dependencies: 211
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: daoadmin
--

COPY public.roles (role_id, role_name) FROM stdin;
\.


--
-- TOC entry 3514 (class 0 OID 25496)
-- Dependencies: 213
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: daoadmin
--

COPY public.users (user_id, pass, role_id, first_name, last_name, email, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 215
-- Name: consults_consult_id_seq; Type: SEQUENCE SET; Schema: public; Owner: daoadmin
--

SELECT pg_catalog.setval('public.consults_consult_id_seq', 1, false);


--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 212
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: daoadmin
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 1, false);


--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: daoadmin
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 3365 (class 2606 OID 25570)
-- Name: consults consults_pkey; Type: CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consults_pkey PRIMARY KEY (consult_id);


--
-- TOC entry 3355 (class 2606 OID 25509)
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);


--
-- TOC entry 3357 (class 2606 OID 25511)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (patient_id);


--
-- TOC entry 3359 (class 2606 OID 25513)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 3361 (class 2606 OID 25582)
-- Name: users user_email_unique; Type: CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- TOC entry 3363 (class 2606 OID 25515)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3369 (class 2606 OID 25571)
-- Name: consults consult_doctor_id; Type: FK CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_doctor_id FOREIGN KEY (doctor_id) REFERENCES public.doctors(doctor_id);


--
-- TOC entry 3370 (class 2606 OID 25576)
-- Name: consults consult_patient_id; Type: FK CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.consults
    ADD CONSTRAINT consult_patient_id FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);


--
-- TOC entry 3366 (class 2606 OID 25526)
-- Name: doctors doctor_user_key; Type: FK CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctor_user_key FOREIGN KEY (doctor_id) REFERENCES public.users(user_id);


--
-- TOC entry 3367 (class 2606 OID 25531)
-- Name: patients patient_user_id; Type: FK CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patient_user_id FOREIGN KEY (patient_id) REFERENCES public.users(user_id);


--
-- TOC entry 3368 (class 2606 OID 25536)
-- Name: users user_role_id; Type: FK CONSTRAINT; Schema: public; Owner: daoadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_role_id FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


-- Completed on 2023-08-16 18:07:03 AEST

--
-- PostgreSQL database dump complete
--

