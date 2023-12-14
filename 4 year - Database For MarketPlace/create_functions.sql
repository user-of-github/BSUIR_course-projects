drop function if exists register_client;

create or replace function register_client (new_email varchar , new_hashed_password varchar, new_name varchar, new_surname varchar)
returns void
security definer
language plpgsql
as
$$
declare
created_uid uuid;
begin
if exists (Select 1 from "public"."abstract_users" where email = new_email) then 
    RAISE 'Email already linked to another account';
end if;

insert into "public"."abstract_users" (email, hashed_password, name, surname) values (new_email, new_hashed_password, new_name, new_surname);
select "public"."abstract_users"."user_id" into created_uid from "public"."abstract_users" where email = new_email;
insert into "public"."client_users" (user_id, registered_from) values (created_uid, NOW());
end;
$$;