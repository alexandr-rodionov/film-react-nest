-- ============== !!! ЗАМЕЧАНИЕ !!! =================
--
-- Текущая реализация поля "taken" НЕОПТИМАЛЬНА,
-- так как хранит занятые места в виде строки,
-- что затрудняет последующую обработку и ведет
-- к снижению производительности при поиске
-- свободных мест и анализе расписаний.
--
-- На мой взгляд оптимальным является замена
-- поля "taken" на ARRAY (varchar[]).

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE USER afisha_user WITH PASSWORD 'afisha_password';

create database afisha
    with owner afisha_user;

create table public.films
(
    id          uuid default uuid_generate_v4() not null
        constraint "PK_697487ada088902377482c970d1"
            primary key,
    rating      double precision                not null,
    director    varchar                         not null,
    tags        text                            not null,
    image       varchar                         not null,
    cover       varchar                         not null,
    title       varchar                         not null,
    about       varchar                         not null,
    description varchar                         not null
);

alter table public.films
    owner to afisha_user;

create table public.schedule
(
    id       uuid default uuid_generate_v4() not null
        constraint "PK_7e33fc2ea755a5765e3564e66dd"
            primary key,
    daytime  varchar                         not null,
    hall     integer                         not null,
    rows     integer                         not null,
    seats    integer                         not null,
    price    double precision                not null,
    taken    text                            not null,
    "filmId" uuid
        constraint "FK_1c2f5e637713a429f4854024a76"
            references public.films
);

alter table public.schedule
    owner to afisha_user;
