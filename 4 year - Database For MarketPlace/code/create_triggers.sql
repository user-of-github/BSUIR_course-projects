DROP TRIGGER IF EXISTS news_logging_trigger  ON public.news;

DROP FUNCTION IF EXISTS logging_trigger;


CREATE OR REPLACE FUNCTION logging_trigger() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        insert into "public"."logs" (user_id, description, time) values 
        (auth.uid(), 'Insert into ' || TG_TABLE_NAME || ' table', NOW());
    ELSIF TG_OP = 'UPDATE' THEN
        insert into "public"."logs" (user_id, description, time) values 
        (auth.uid(), 'Update in ' || TG_TABLE_NAME || ' table', NOW());
    ELSIF TG_OP = 'DELETE' THEN
        insert into "public"."logs" (user_id, description, time) values 
        (auth.uid(), 'Delete from ' || TG_TABLE_NAME || ' table', NOW());
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER news_logging_trigger
    AFTER INSERT OR UPDATE OR DELETE 
 ON public.news
    FOR EACH ROW
    EXECUTE FUNCTION logging_trigger();