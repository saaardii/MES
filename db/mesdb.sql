--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: saaardii
--

CREATE TABLE public.jobs (
    sernum character varying(30),
    lotname character varying(30),
    product character varying(30),
    mouldcode character varying(30),
    norminalparts integer,
    numcavities integer,
    exptime integer,
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT (now())::timestamp(0) without time zone,
    mouldname character varying(30)
);


ALTER TABLE public.jobs OWNER TO saaardii;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: saaardii
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO saaardii;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saaardii
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: quality; Type: TABLE; Schema: public; Owner: saaardii
--

CREATE TABLE public.quality (
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    cyclecounter integer,
    lotname character varying(40),
    product character varying(40),
    job character varying(40),
    cycletime integer,
    sernum character varying(40),
    id integer NOT NULL,
    machinename character varying(30),
    cushionstroke integer,
    dosingtime integer,
    injectiontime integer
);


ALTER TABLE public.quality OWNER TO saaardii;

--
-- Name: quality_id_seq; Type: SEQUENCE; Schema: public; Owner: saaardii
--

CREATE SEQUENCE public.quality_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quality_id_seq OWNER TO saaardii;

--
-- Name: quality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saaardii
--

ALTER SEQUENCE public.quality_id_seq OWNED BY public.quality.id;


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: saaardii
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: quality id; Type: DEFAULT; Schema: public; Owner: saaardii
--

ALTER TABLE ONLY public.quality ALTER COLUMN id SET DEFAULT nextval('public.quality_id_seq'::regclass);


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: saaardii
--

COPY public.jobs (sernum, lotname, product, mouldcode, norminalparts, numcavities, exptime, id, created_at, mouldname) FROM stdin;
\.


--
-- Data for Name: quality; Type: TABLE DATA; Schema: public; Owner: saaardii
--

COPY public.quality ("timestamp", cyclecounter, lotname, product, job, cycletime, sernum, id, machinename, cushionstroke, dosingtime, injectiontime) FROM stdin;
\.


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saaardii
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: quality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saaardii
--

SELECT pg_catalog.setval('public.quality_id_seq', 1, false);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: saaardii
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: quality quality_pkey; Type: CONSTRAINT; Schema: public; Owner: saaardii
--

ALTER TABLE ONLY public.quality
    ADD CONSTRAINT quality_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

