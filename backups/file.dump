--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-1)
-- Dumped by pg_dump version 11.5 (Ubuntu 11.5-1)

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

SET default_with_oids = false;

--
-- Name: face_stockword; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.face_stockword (
    id integer NOT NULL,
    name character varying(1000),
    texts character varying(1000),
    urls character varying(1000),
    visemes character varying(20000)
);


--
-- Name: face_stockword_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.face_stockword_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: face_stockword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.face_stockword_id_seq OWNED BY public.face_stockword.id;


--
-- Name: face_stockword id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.face_stockword ALTER COLUMN id SET DEFAULT nextval('public.face_stockword_id_seq'::regclass);


--
-- Data for Name: face_stockword; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.face_stockword (id, name, texts, urls, visemes) FROM stdin;
1	dog	"dog"	["prePreparedWords/audio/dog.wav"]	[[{"name": "d", "start": 0, "end": 60, "Viseme": "t", "stress": "0"}, {"name": "o", "start": 60, "end": 240, "Viseme": "e", "stress": "1"}, {"name": "g", "start": 240, "end": 340, "Viseme": "k", "stress": "0"}]]
2	jumper	"jumper"	["prePreparedWords/audio/jumper.wav"]	[[{"name": "jh", "start": 0, "end": 110, "Viseme": "s", "stress": "0"}, {"name": "uh", "start": 110, "end": 190, "Viseme": "e", "stress": "1"}, {"name": "m", "start": 190, "end": 260, "Viseme": "b", "stress": "0"}, {"name": "p", "start": 260, "end": 330, "Viseme": "b", "stress": "0"}, {"name": "@", "start": 330, "end": 380, "Viseme": "e", "stress": "0"}, {"name": "r", "start": 380, "end": 610, "Viseme": "r", "stress": "0"}]]
3	sweater	"sweater"	["prePreparedWords/audio/sweater.wav"]	[[{"name": "s", "start": 0, "end": 110, "Viseme": "s", "stress": "0"}, {"name": "w", "start": 110, "end": 150, "Viseme": "u", "stress": "0"}, {"name": "e", "start": 150, "end": 250, "Viseme": "e", "stress": "1"}, {"name": "t", "start": 250, "end": 310, "Viseme": "t", "stress": "0"}, {"name": "@", "start": 310, "end": 360, "Viseme": "e", "stress": "0"}, {"name": "r", "start": 360, "end": 590, "Viseme": "r", "stress": "0"}]]
4	jacket	"jacket"	["prePreparedWords/audio/jacket.wav"]	[[{"name": "jh", "start": 0, "end": 100, "Viseme": "s", "stress": "0"}, {"name": "a", "start": 100, "end": 220, "Viseme": "e", "stress": "1"}, {"name": "k", "start": 220, "end": 310, "Viseme": "k", "stress": "0"}, {"name": "i", "start": 310, "end": 400, "Viseme": "e", "stress": "0"}, {"name": "t", "start": 400, "end": 640, "Viseme": "t", "stress": "0"}]]
5	shirt	"shirt"	["prePreparedWords/audio/shirt.wav"]	[[{"name": "sh", "start": 0, "end": 140, "Viseme": "s", "stress": "0"}, {"name": "@@", "start": 140, "end": 230, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 230, "end": 290, "Viseme": "r", "stress": "0"}, {"name": "t", "start": 290, "end": 510, "Viseme": "t", "stress": "0"}]]
6	shirt	"shirt"	["prePreparedWords/audio/shirt.wav"]	[[{"name": "sh", "start": 0, "end": 140, "Viseme": "s", "stress": "0"}, {"name": "@@", "start": 140, "end": 230, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 230, "end": 290, "Viseme": "r", "stress": "0"}, {"name": "t", "start": 290, "end": 510, "Viseme": "t", "stress": "0"}]]
7	t	"t"	["prePreparedWords/audio/t.wav"]	[[{"name": "t", "start": 0, "end": 130, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 130, "end": 430, "Viseme": "e", "stress": "1"}]]
8	shirt	"shirt"	["prePreparedWords/audio/shirt.wav"]	[[{"name": "sh", "start": 0, "end": 140, "Viseme": "s", "stress": "0"}, {"name": "@@", "start": 140, "end": 230, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 230, "end": 290, "Viseme": "r", "stress": "0"}, {"name": "t", "start": 290, "end": 510, "Viseme": "t", "stress": "0"}]]
9	t	"t"	["prePreparedWords/audio/t.wav"]	[[{"name": "t", "start": 0, "end": 130, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 130, "end": 430, "Viseme": "e", "stress": "1"}]]
10	shirt	"shirt"	["prePreparedWords/audio/shirt.wav"]	[[{"name": "sh", "start": 0, "end": 140, "Viseme": "s", "stress": "0"}, {"name": "@@", "start": 140, "end": 230, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 230, "end": 290, "Viseme": "r", "stress": "0"}, {"name": "t", "start": 290, "end": 510, "Viseme": "t", "stress": "0"}]]
11	t	"t"	["prePreparedWords/audio/t.wav"]	[[{"name": "t", "start": 0, "end": 130, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 130, "end": 430, "Viseme": "e", "stress": "1"}]]
12	shirt	"shirt"	["prePreparedWords/audio/shirt.wav"]	[[{"name": "sh", "start": 0, "end": 140, "Viseme": "s", "stress": "0"}, {"name": "@@", "start": 140, "end": 230, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 230, "end": 290, "Viseme": "r", "stress": "0"}, {"name": "t", "start": 290, "end": 510, "Viseme": "t", "stress": "0"}]]
13	golf	"golf"	["prePreparedWords/audio/golf.wav"]	[[{"name": "g", "start": 0, "end": 60, "Viseme": "k", "stress": "0"}, {"name": "o", "start": 60, "end": 190, "Viseme": "e", "stress": "1"}, {"name": "l", "start": 190, "end": 300, "Viseme": "l", "stress": "0"}, {"name": "f", "start": 300, "end": 490, "Viseme": "f", "stress": "0"}]]
14	t	"t"	["prePreparedWords/audio/t.wav"]	[[{"name": "t", "start": 0, "end": 130, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 130, "end": 430, "Viseme": "e", "stress": "1"}]]
15	tee	"tee"	["prePreparedWords/audio/tee.wav"]	[[{"name": "t", "start": 0, "end": 130, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 130, "end": 430, "Viseme": "e", "stress": "1"}]]
16	polo	"polo"	["prePreparedWords/audio/polo.wav"]	[[{"name": "p", "start": 0, "end": 110, "Viseme": "b", "stress": "0"}, {"name": "ou", "start": 110, "end": 250, "Viseme": "e", "stress": "1"}, {"name": "l", "start": 250, "end": 340, "Viseme": "l", "stress": "0"}, {"name": "ou", "start": 340, "end": 620, "Viseme": "e", "stress": "0"}]]
17	dress	"dress"	["prePreparedWords/audio/dress.wav"]	[[{"name": "d", "start": 0, "end": 70, "Viseme": "t", "stress": "0"}, {"name": "r", "start": 70, "end": 140, "Viseme": "r", "stress": "0"}, {"name": "e", "start": 140, "end": 280, "Viseme": "e", "stress": "1"}, {"name": "s", "start": 280, "end": 520, "Viseme": "s", "stress": "0"}]]
18	dolphin	"dolphin"	["prePreparedWords/audio/dolphin.wav"]	[[{"name": "d", "start": 0, "end": 70, "Viseme": "t", "stress": "0"}, {"name": "o", "start": 70, "end": 180, "Viseme": "e", "stress": "1"}, {"name": "l", "start": 180, "end": 230, "Viseme": "l", "stress": "0"}, {"name": "f", "start": 230, "end": 320, "Viseme": "f", "stress": "0"}, {"name": "i", "start": 320, "end": 400, "Viseme": "e", "stress": "0"}, {"name": "n", "start": 400, "end": 550, "Viseme": "t", "stress": "0"}]]
19	dolphin	"dolphin"	["prePreparedWords/audio/dolphin.wav"]	[[{"name": "d", "start": 0, "end": 70, "Viseme": "t", "stress": "0"}, {"name": "o", "start": 70, "end": 180, "Viseme": "e", "stress": "1"}, {"name": "l", "start": 180, "end": 230, "Viseme": "l", "stress": "0"}, {"name": "f", "start": 230, "end": 320, "Viseme": "f", "stress": "0"}, {"name": "i", "start": 320, "end": 400, "Viseme": "e", "stress": "0"}, {"name": "n", "start": 400, "end": 550, "Viseme": "t", "stress": "0"}]]
20	boy	"boy"	["prePreparedWords/audio/boy.wav"]	[[{"name": "b", "start": 0, "end": 50, "Viseme": "b", "stress": "0"}, {"name": "oi", "start": 50, "end": 420, "Viseme": "e", "stress": "1"}]]
21	ole	"ole"	["prePreparedWords/audio/ole.wav"]	[[{"name": "ou", "start": 0, "end": 250, "Viseme": "e", "stress": "1"}, {"name": "l", "start": 250, "end": 470, "Viseme": "l", "stress": "0"}]]
22	boy	"boy"	["prePreparedWords/audio/boy.wav"]	[[{"name": "b", "start": 0, "end": 50, "Viseme": "b", "stress": "0"}, {"name": "oi", "start": 50, "end": 420, "Viseme": "e", "stress": "1"}]]
23	orphan	"orphan"	["prePreparedWords/audio/orphan.wav"]	[[{"name": "oo", "start": 0, "end": 170, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 170, "end": 220, "Viseme": "r", "stress": "0"}, {"name": "f", "start": 220, "end": 320, "Viseme": "f", "stress": "0"}, {"name": "@", "start": 320, "end": 400, "Viseme": "e", "stress": "0"}, {"name": "n", "start": 400, "end": 560, "Viseme": "t", "stress": "0"}]]
24	boy	"boy"	["prePreparedWords/audio/boy.wav"]	[[{"name": "b", "start": 0, "end": 50, "Viseme": "b", "stress": "0"}, {"name": "oi", "start": 50, "end": 420, "Viseme": "e", "stress": "1"}]]
25	shows	"shows"	["prePreparedWords/audio/shows.wav"]	[[{"name": "sh", "start": 0, "end": 160, "Viseme": "s", "stress": "0"}, {"name": "ou", "start": 160, "end": 390, "Viseme": "e", "stress": "1"}, {"name": "z", "start": 390, "end": 560, "Viseme": "s", "stress": "0"}]]
26	a	"a"	["prePreparedWords/audio/a.wav"]	[[{"name": "@", "start": 0, "end": 150, "Viseme": "e", "stress": "0"}]]
27	starting	"starting"	["prePreparedWords/audio/starting.wav"]	[[{"name": "s", "start": 0, "end": 120, "Viseme": "s", "stress": "0"}, {"name": "t", "start": 120, "end": 170, "Viseme": "t", "stress": "0"}, {"name": "aa", "start": 170, "end": 290, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 290, "end": 330, "Viseme": "r", "stress": "0"}, {"name": "t", "start": 330, "end": 420, "Viseme": "t", "stress": "0"}, {"name": "i", "start": 420, "end": 480, "Viseme": "e", "stress": "0"}, {"name": "ng", "start": 480, "end": 650, "Viseme": "k", "stress": "0"}]]
28	causing	"causing"	["prePreparedWords/audio/causing.wav"]	[[{"name": "k", "start": 0, "end": 120, "Viseme": "k", "stress": "0"}, {"name": "oo", "start": 120, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "z", "start": 260, "end": 350, "Viseme": "s", "stress": "0"}, {"name": "i", "start": 350, "end": 430, "Viseme": "e", "stress": "0"}, {"name": "ng", "start": 430, "end": 600, "Viseme": "k", "stress": "0"}]]
29	a	"a"	["prePreparedWords/audio/a.wav"]	[[{"name": "@", "start": 0, "end": 150, "Viseme": "e", "stress": "0"}]]
30	hands	"hands"	["prePreparedWords/audio/hands.wav"]	[[{"name": "h", "start": 0, "end": 120, "Viseme": "e", "stress": "0"}, {"name": "a", "start": 120, "end": 280, "Viseme": "e", "stress": "1"}, {"name": "n", "start": 280, "end": 390, "Viseme": "t", "stress": "0"}, {"name": "z", "start": 390, "end": 570, "Viseme": "s", "stress": "0"}]]
31	mother	"mother"	["prePreparedWords/audio/mother.wav"]	[[{"name": "m", "start": 0, "end": 100, "Viseme": "b", "stress": "0"}, {"name": "uh", "start": 100, "end": 190, "Viseme": "e", "stress": "1"}, {"name": "dh", "start": 190, "end": 260, "Viseme": "th", "stress": "0"}, {"name": "@", "start": 260, "end": 320, "Viseme": "e", "stress": "0"}, {"name": "r", "start": 320, "end": 560, "Viseme": "r", "stress": "0"}]]
32	lion	"lion"	["prePreparedWords/audio/lion.wav"]	[[{"name": "l", "start": 0, "end": 70, "Viseme": "l", "stress": "0"}, {"name": "ai", "start": 70, "end": 250, "Viseme": "e", "stress": "1"}, {"name": "@", "start": 250, "end": 320, "Viseme": "e", "stress": "0"}, {"name": "n", "start": 320, "end": 500, "Viseme": "t", "stress": "0"}]]
33	team	"team"	["prePreparedWords/audio/team.wav"]	[[{"name": "t", "start": 0, "end": 120, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 120, "end": 330, "Viseme": "e", "stress": "1"}, {"name": "m", "start": 330, "end": 490, "Viseme": "b", "stress": "0"}]]
34	woman	"woman"	["prePreparedWords/audio/woman.wav"]	[[{"name": "w", "start": 0, "end": 280, "Viseme": "u", "stress": "0"}, {"name": "u", "start": 280, "end": 340, "Viseme": "e", "stress": "1"}, {"name": "m", "start": 340, "end": 420, "Viseme": "b", "stress": "0"}, {"name": "@", "start": 420, "end": 490, "Viseme": "e", "stress": "0"}, {"name": "n", "start": 490, "end": 660, "Viseme": "t", "stress": "0"}]]
35	bear	"bear"	["prePreparedWords/audio/bear.wav"]	[[{"name": "b", "start": 0, "end": 60, "Viseme": "b", "stress": "0"}, {"name": "e", "start": 60, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 490, "Viseme": "r", "stress": "0"}]]
36	a	"a"	["prePreparedWords/audio/a.wav"]	[[{"name": "@", "start": 0, "end": 150, "Viseme": "e", "stress": "0"}]]
37	wears	"wears"	["prePreparedWords/audio/wears.wav"]	[[{"name": "w", "start": 0, "end": 360, "Viseme": "u", "stress": "0"}, {"name": "e@", "start": 360, "end": 530, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 530, "end": 600, "Viseme": "r", "stress": "0"}, {"name": "z", "start": 600, "end": 760, "Viseme": "s", "stress": "0"}]]
38	carries	"carries"	["prePreparedWords/audio/carries.wav"]	[[{"name": "k", "start": 0, "end": 140, "Viseme": "k", "stress": "0"}, {"name": "a", "start": 140, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 360, "Viseme": "r", "stress": "0"}, {"name": "ii", "start": 360, "end": 490, "Viseme": "e", "stress": "0"}, {"name": "z", "start": 490, "end": 690, "Viseme": "s", "stress": "0"}]]
39	gets	"gets"	["prePreparedWords/audio/gets.wav"]	[[{"name": "g", "start": 0, "end": 60, "Viseme": "k", "stress": "0"}, {"name": "e", "start": 60, "end": 190, "Viseme": "e", "stress": "1"}, {"name": "t", "start": 190, "end": 290, "Viseme": "t", "stress": "0"}, {"name": "s", "start": 290, "end": 460, "Viseme": "s", "stress": "0"}]]
40	deserves	"deserves"	["prePreparedWords/audio/deserves.wav"]	[[{"name": "d", "start": 0, "end": 60, "Viseme": "t", "stress": "0"}, {"name": "i", "start": 60, "end": 110, "Viseme": "e", "stress": "0"}, {"name": "z", "start": 110, "end": 230, "Viseme": "s", "stress": "0"}, {"name": "@@", "start": 230, "end": 350, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 350, "end": 410, "Viseme": "r", "stress": "0"}, {"name": "v", "start": 410, "end": 500, "Viseme": "f", "stress": "0"}, {"name": "z", "start": 500, "end": 680, "Viseme": "s", "stress": "0"}]]
41	played	"played"	["prePreparedWords/audio/played.wav"]	[[{"name": "p", "start": 0, "end": 120, "Viseme": "b", "stress": "0"}, {"name": "l", "start": 120, "end": 150, "Viseme": "l", "stress": "0"}, {"name": "ei", "start": 150, "end": 370, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 370, "end": 520, "Viseme": "t", "stress": "0"}]]
42	expected	"expected"	["prePreparedWords/audio/expected.wav"]	[[{"name": "i", "start": 0, "end": 70, "Viseme": "e", "stress": "0"}, {"name": "k", "start": 70, "end": 150, "Viseme": "k", "stress": "0"}, {"name": "s", "start": 150, "end": 210, "Viseme": "s", "stress": "0"}, {"name": "p", "start": 210, "end": 260, "Viseme": "b", "stress": "0"}, {"name": "e", "start": 260, "end": 400, "Viseme": "e", "stress": "1"}, {"name": "k", "start": 400, "end": 470, "Viseme": "k", "stress": "0"}, {"name": "t", "start": 470, "end": 560, "Viseme": "t", "stress": "0"}, {"name": "i", "start": 560, "end": 659, "Viseme": "e", "stress": "0"}, {"name": "d", "start": 659, "end": 829, "Viseme": "t", "stress": "0"}]]
43	horse	"horse"	["prePreparedWords/audio/horse.wav"]	[[{"name": "h", "start": 0, "end": 130, "Viseme": "e", "stress": "0"}, {"name": "o", "start": 130, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 340, "Viseme": "r", "stress": "0"}, {"name": "s", "start": 340, "end": 560, "Viseme": "s", "stress": "0"}]]
44	desensitize	"desensitize"	["prePreparedWords/audio/desensitize.wav"]	[[{"name": "d", "start": 0, "end": 50, "Viseme": "t", "stress": "0"}, {"name": "i", "start": 50, "end": 90, "Viseme": "e", "stress": "0"}, {"name": "s", "start": 90, "end": 200, "Viseme": "s", "stress": "0"}, {"name": "e", "start": 200, "end": 300, "Viseme": "e", "stress": "1"}, {"name": "n", "start": 300, "end": 370, "Viseme": "t", "stress": "0"}, {"name": "s", "start": 370, "end": 440, "Viseme": "s", "stress": "0"}, {"name": "@", "start": 440, "end": 480, "Viseme": "e", "stress": "0"}, {"name": "t", "start": 480, "end": 570, "Viseme": "t", "stress": "0"}, {"name": "ai", "start": 570, "end": 759, "Viseme": "e", "stress": "2"}, {"name": "z", "start": 759, "end": 949, "Viseme": "s", "stress": "0"}]]
45	rides	"rides"	["prePreparedWords/audio/rides.wav"]	[[{"name": "r", "start": 0, "end": 90, "Viseme": "r", "stress": "0"}, {"name": "ai", "start": 90, "end": 290, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 290, "end": 370, "Viseme": "t", "stress": "0"}, {"name": "z", "start": 370, "end": 530, "Viseme": "s", "stress": "0"}]]
46	ride	"ride"	["prePreparedWords/audio/ride.wav"]	[[{"name": "r", "start": 0, "end": 100, "Viseme": "r", "stress": "0"}, {"name": "ai", "start": 100, "end": 310, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 310, "end": 470, "Viseme": "t", "stress": "0"}]]
47	eat	"eat"	["prePreparedWords/audio/eat.wav"]	[[{"name": "ii", "start": 0, "end": 210, "Viseme": "e", "stress": "1"}, {"name": "t", "start": 210, "end": 440, "Viseme": "t", "stress": "0"}]]
48	stealing	"stealing"	["prePreparedWords/audio/stealing.wav"]	[[{"name": "s", "start": 0, "end": 110, "Viseme": "s", "stress": "0"}, {"name": "t", "start": 110, "end": 170, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 170, "end": 290, "Viseme": "e", "stress": "1"}, {"name": "l", "start": 290, "end": 350, "Viseme": "l", "stress": "0"}, {"name": "i", "start": 350, "end": 420, "Viseme": "e", "stress": "0"}, {"name": "ng", "start": 420, "end": 600, "Viseme": "k", "stress": "0"}]]
49	fly	"fly"	["prePreparedWords/audio/fly.wav"]	[[{"name": "f", "start": 0, "end": 120, "Viseme": "f", "stress": "0"}, {"name": "l", "start": 120, "end": 200, "Viseme": "l", "stress": "0"}, {"name": "ai", "start": 200, "end": 460, "Viseme": "e", "stress": "1"}]]
50	horse	"horse"	["prePreparedWords/audio/horse.wav"]	[[{"name": "h", "start": 0, "end": 130, "Viseme": "e", "stress": "0"}, {"name": "o", "start": 130, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 340, "Viseme": "r", "stress": "0"}, {"name": "s", "start": 340, "end": 560, "Viseme": "s", "stress": "0"}]]
51	thoroughbred	"thoroughbred"	["prePreparedWords/audio/thoroughbred.wav"]	[[{"name": "th", "start": 0, "end": 100, "Viseme": "th", "stress": "0"}, {"name": "uh", "start": 100, "end": 170, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 170, "end": 230, "Viseme": "r", "stress": "0"}, {"name": "@", "start": 230, "end": 260, "Viseme": "e", "stress": "0"}, {"name": "b", "start": 260, "end": 330, "Viseme": "b", "stress": "0"}, {"name": "r", "start": 330, "end": 430, "Viseme": "r", "stress": "0"}, {"name": "e", "start": 430, "end": 560, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 560, "end": 740, "Viseme": "t", "stress": "0"}]]
52	horse	"horse"	["prePreparedWords/audio/horse.wav"]	[[{"name": "h", "start": 0, "end": 130, "Viseme": "e", "stress": "0"}, {"name": "o", "start": 130, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 340, "Viseme": "r", "stress": "0"}, {"name": "s", "start": 340, "end": 560, "Viseme": "s", "stress": "0"}]]
53	flat	"flat"	["prePreparedWords/audio/flat.wav"]	[[{"name": "f", "start": 0, "end": 120, "Viseme": "f", "stress": "0"}, {"name": "l", "start": 120, "end": 190, "Viseme": "l", "stress": "0"}, {"name": "a", "start": 190, "end": 380, "Viseme": "e", "stress": "1"}, {"name": "t", "start": 380, "end": 550, "Viseme": "t", "stress": "0"}]]
54	horse	"horse"	["prePreparedWords/audio/horse.wav"]	[[{"name": "h", "start": 0, "end": 130, "Viseme": "e", "stress": "0"}, {"name": "o", "start": 130, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 340, "Viseme": "r", "stress": "0"}, {"name": "s", "start": 340, "end": 560, "Viseme": "s", "stress": "0"}]]
55	thoroughbred	"thoroughbred"	["prePreparedWords/audio/thoroughbred.wav"]	[[{"name": "th", "start": 0, "end": 100, "Viseme": "th", "stress": "0"}, {"name": "uh", "start": 100, "end": 170, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 170, "end": 230, "Viseme": "r", "stress": "0"}, {"name": "@", "start": 230, "end": 260, "Viseme": "e", "stress": "0"}, {"name": "b", "start": 260, "end": 330, "Viseme": "b", "stress": "0"}, {"name": "r", "start": 330, "end": 430, "Viseme": "r", "stress": "0"}, {"name": "e", "start": 430, "end": 560, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 560, "end": 740, "Viseme": "t", "stress": "0"}]]
56	horse	"horse"	["prePreparedWords/audio/horse.wav"]	[[{"name": "h", "start": 0, "end": 130, "Viseme": "e", "stress": "0"}, {"name": "o", "start": 130, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 340, "Viseme": "r", "stress": "0"}, {"name": "s", "start": 340, "end": 560, "Viseme": "s", "stress": "0"}]]
57	handicap	"handicap"	["prePreparedWords/audio/handicap.wav"]	[[{"name": "h", "start": 0, "end": 110, "Viseme": "e", "stress": "0"}, {"name": "a", "start": 110, "end": 220, "Viseme": "e", "stress": "1"}, {"name": "n", "start": 220, "end": 290, "Viseme": "t", "stress": "0"}, {"name": "d", "start": 290, "end": 320, "Viseme": "t", "stress": "0"}, {"name": "ii", "start": 320, "end": 420, "Viseme": "e", "stress": "0"}, {"name": "k", "start": 420, "end": 520, "Viseme": "k", "stress": "0"}, {"name": "a", "start": 520, "end": 660, "Viseme": "e", "stress": "2"}, {"name": "p", "start": 660, "end": 789, "Viseme": "b", "stress": "0"}]]
58	a	"a"	["prePreparedWords/audio/a.wav"]	[[{"name": "@", "start": 0, "end": 150, "Viseme": "e", "stress": "0"}]]
59	band	"band"	["prePreparedWords/audio/band.wav"]	[[{"name": "b", "start": 0, "end": 50, "Viseme": "b", "stress": "0"}, {"name": "a", "start": 50, "end": 220, "Viseme": "e", "stress": "1"}, {"name": "n", "start": 220, "end": 350, "Viseme": "t", "stress": "0"}, {"name": "d", "start": 350, "end": 480, "Viseme": "t", "stress": "0"}]]
60	fathers	"fathers"	["prePreparedWords/audio/fathers.wav"]	[[{"name": "f", "start": 0, "end": 110, "Viseme": "f", "stress": "0"}, {"name": "aa", "start": 110, "end": 250, "Viseme": "e", "stress": "1"}, {"name": "dh", "start": 250, "end": 310, "Viseme": "th", "stress": "0"}, {"name": "@", "start": 310, "end": 350, "Viseme": "e", "stress": "0"}, {"name": "r", "start": 350, "end": 480, "Viseme": "r", "stress": "0"}, {"name": "z", "start": 480, "end": 670, "Viseme": "s", "stress": "0"}]]
61	elements	"elements"	["prePreparedWords/audio/elements.wav"]	[[{"name": "e", "start": 0, "end": 130, "Viseme": "e", "stress": "1"}, {"name": "l", "start": 130, "end": 190, "Viseme": "l", "stress": "0"}, {"name": "@", "start": 190, "end": 220, "Viseme": "e", "stress": "0"}, {"name": "m", "start": 220, "end": 290, "Viseme": "b", "stress": "0"}, {"name": "@", "start": 290, "end": 340, "Viseme": "e", "stress": "0"}, {"name": "n", "start": 340, "end": 440, "Viseme": "t", "stress": "0"}, {"name": "t", "start": 440, "end": 540, "Viseme": "t", "stress": "0"}, {"name": "s", "start": 540, "end": 730, "Viseme": "s", "stress": "0"}]]
62	institutions	"institutions"	["prePreparedWords/audio/institutions.wav"]	[[{"name": "i", "start": 0, "end": 90, "Viseme": "e", "stress": "2"}, {"name": "n", "start": 90, "end": 160, "Viseme": "t", "stress": "0"}, {"name": "s", "start": 160, "end": 240, "Viseme": "s", "stress": "0"}, {"name": "t", "start": 240, "end": 290, "Viseme": "t", "stress": "0"}, {"name": "@", "start": 290, "end": 330, "Viseme": "e", "stress": "0"}, {"name": "t", "start": 330, "end": 410, "Viseme": "t", "stress": "0"}, {"name": "y", "start": 410, "end": 490, "Viseme": "e", "stress": "0"}, {"name": "uu", "start": 490, "end": 559, "Viseme": "u", "stress": "1"}, {"name": "sh", "start": 559, "end": 679, "Viseme": "s", "stress": "0"}, {"name": "@", "start": 679, "end": 719, "Viseme": "e", "stress": "0"}, {"name": "n", "start": 719, "end": 839, "Viseme": "t", "stress": "0"}, {"name": "z", "start": 839, "end": 1029, "Viseme": "s", "stress": "0"}]]
63	finalists	"finalists"	["prePreparedWords/audio/finalists.wav"]	[[{"name": "f", "start": 0, "end": 100, "Viseme": "f", "stress": "0"}, {"name": "ai", "start": 100, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "n", "start": 260, "end": 310, "Viseme": "t", "stress": "0"}, {"name": "@", "start": 310, "end": 340, "Viseme": "e", "stress": "0"}, {"name": "l", "start": 340, "end": 390, "Viseme": "l", "stress": "0"}, {"name": "i", "start": 390, "end": 460, "Viseme": "e", "stress": "0"}, {"name": "s", "start": 460, "end": 630, "Viseme": "s", "stress": "0"}, {"name": "t", "start": 630, "end": 700, "Viseme": "t", "stress": "0"}, {"name": "s", "start": 700, "end": 879, "Viseme": "s", "stress": "0"}]]
64	djs	"djs"	["prePreparedWords/audio/djs.wav"]	[[{"name": "jh", "start": 0, "end": 130, "Viseme": "s", "stress": "0"}, {"name": "z", "start": 130, "end": 210, "Viseme": "s", "stress": "0"}]]
65	horse	"horse"	["prePreparedWords/audio/horse.wav"]	[[{"name": "h", "start": 0, "end": 130, "Viseme": "e", "stress": "0"}, {"name": "o", "start": 130, "end": 260, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 260, "end": 340, "Viseme": "r", "stress": "0"}, {"name": "s", "start": 340, "end": 560, "Viseme": "s", "stress": "0"}]]
66	rode	"rode"	["prePreparedWords/audio/rode.wav"]	[[{"name": "r", "start": 0, "end": 110, "Viseme": "r", "stress": "0"}, {"name": "ou", "start": 110, "end": 300, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 300, "end": 440, "Viseme": "t", "stress": "0"}]]
67	riding	"riding"	["prePreparedWords/audio/riding.wav"]	[[{"name": "r", "start": 0, "end": 100, "Viseme": "r", "stress": "0"}, {"name": "ai", "start": 100, "end": 250, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 250, "end": 300, "Viseme": "t", "stress": "0"}, {"name": "i", "start": 300, "end": 390, "Viseme": "e", "stress": "0"}, {"name": "ng", "start": 390, "end": 560, "Viseme": "k", "stress": "0"}]]
68	desensitize	"desensitize"	["prePreparedWords/audio/desensitize.wav"]	[[{"name": "d", "start": 0, "end": 50, "Viseme": "t", "stress": "0"}, {"name": "i", "start": 50, "end": 90, "Viseme": "e", "stress": "0"}, {"name": "s", "start": 90, "end": 200, "Viseme": "s", "stress": "0"}, {"name": "e", "start": 200, "end": 300, "Viseme": "e", "stress": "1"}, {"name": "n", "start": 300, "end": 370, "Viseme": "t", "stress": "0"}, {"name": "s", "start": 370, "end": 440, "Viseme": "s", "stress": "0"}, {"name": "@", "start": 440, "end": 480, "Viseme": "e", "stress": "0"}, {"name": "t", "start": 480, "end": 570, "Viseme": "t", "stress": "0"}, {"name": "ai", "start": 570, "end": 759, "Viseme": "e", "stress": "2"}, {"name": "z", "start": 759, "end": 949, "Viseme": "s", "stress": "0"}]]
69	ride	"ride"	["prePreparedWords/audio/ride.wav"]	[[{"name": "r", "start": 0, "end": 100, "Viseme": "r", "stress": "0"}, {"name": "ai", "start": 100, "end": 310, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 310, "end": 470, "Viseme": "t", "stress": "0"}]]
70	lead	"lead"	["prePreparedWords/audio/lead.wav"]	[[{"name": "l", "start": 0, "end": 80, "Viseme": "l", "stress": "0"}, {"name": "ii", "start": 80, "end": 290, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 290, "end": 470, "Viseme": "t", "stress": "0"}]]
71	rides	"rides"	["prePreparedWords/audio/rides.wav"]	[[{"name": "r", "start": 0, "end": 90, "Viseme": "r", "stress": "0"}, {"name": "ai", "start": 90, "end": 290, "Viseme": "e", "stress": "1"}, {"name": "d", "start": 290, "end": 370, "Viseme": "t", "stress": "0"}, {"name": "z", "start": 370, "end": 530, "Viseme": "s", "stress": "0"}]]
72	dog	"dog"	["prePreparedWords/audio/dog.wav"]	[[{"name": "d", "start": 0, "end": 60, "Viseme": "t", "stress": "0"}, {"name": "o", "start": 60, "end": 240, "Viseme": "e", "stress": "1"}, {"name": "g", "start": 240, "end": 340, "Viseme": "k", "stress": "0"}]]
73	wags	"wags"	["prePreparedWords/audio/wags.wav"]	[[{"name": "w", "start": 0, "end": 320, "Viseme": "u", "stress": "0"}, {"name": "a", "start": 320, "end": 490, "Viseme": "e", "stress": "1"}, {"name": "g", "start": 490, "end": 570, "Viseme": "k", "stress": "0"}, {"name": "z", "start": 570, "end": 740, "Viseme": "s", "stress": "0"}]]
74	wagging	"wagging"	["prePreparedWords/audio/wagging.wav"]	[[{"name": "w", "start": 0, "end": 310, "Viseme": "u", "stress": "0"}, {"name": "a", "start": 310, "end": 440, "Viseme": "e", "stress": "1"}, {"name": "g", "start": 440, "end": 520, "Viseme": "k", "stress": "0"}, {"name": "i", "start": 520, "end": 580, "Viseme": "e", "stress": "0"}, {"name": "ng", "start": 580, "end": 750, "Viseme": "k", "stress": "0"}]]
75	pet	"pet"	["prePreparedWords/audio/pet.wav"]	[[{"name": "p", "start": 0, "end": 110, "Viseme": "b", "stress": "0"}, {"name": "e", "start": 110, "end": 310, "Viseme": "e", "stress": "1"}, {"name": "t", "start": 310, "end": 540, "Viseme": "t", "stress": "0"}]]
76	rescue	"rescue"	["prePreparedWords/audio/rescue.wav"]	[[{"name": "r", "start": 0, "end": 80, "Viseme": "r", "stress": "0"}, {"name": "e", "start": 80, "end": 170, "Viseme": "e", "stress": "1"}, {"name": "s", "start": 170, "end": 270, "Viseme": "s", "stress": "0"}, {"name": "k", "start": 270, "end": 350, "Viseme": "k", "stress": "0"}, {"name": "y", "start": 350, "end": 440, "Viseme": "e", "stress": "0"}, {"name": "uu", "start": 440, "end": 630, "Viseme": "u", "stress": "0"}]]
77	hear	"hear"	["prePreparedWords/audio/hear.wav"]	[[{"name": "h", "start": 0, "end": 120, "Viseme": "e", "stress": "0"}, {"name": "i", "start": 120, "end": 230, "Viseme": "e", "stress": "1"}, {"name": "r", "start": 230, "end": 450, "Viseme": "r", "stress": "0"}]]
78	surrender	"surrender"	["prePreparedWords/audio/surrender.wav"]	[[{"name": "s", "start": 0, "end": 120, "Viseme": "s", "stress": "0"}, {"name": "@", "start": 120, "end": 160, "Viseme": "e", "stress": "0"}, {"name": "r", "start": 160, "end": 240, "Viseme": "r", "stress": "0"}, {"name": "e", "start": 240, "end": 340, "Viseme": "e", "stress": "1"}, {"name": "n", "start": 340, "end": 420, "Viseme": "t", "stress": "0"}, {"name": "d", "start": 420, "end": 460, "Viseme": "t", "stress": "0"}, {"name": "@", "start": 460, "end": 510, "Viseme": "e", "stress": "0"}, {"name": "r", "start": 510, "end": 730, "Viseme": "r", "stress": "0"}]]
\.


--
-- Name: face_stockword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.face_stockword_id_seq', 78, true);


--
-- Name: face_stockword face_stockword_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.face_stockword
    ADD CONSTRAINT face_stockword_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

