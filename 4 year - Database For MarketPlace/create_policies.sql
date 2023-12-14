CREATE POLICY "Enable insert to Reviews for authenticated users only" ON "public"."reviews"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can read their own ordersauth.uid() = id" ON "public"."orders"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = client);

CREATE POLICY "User can view only his info" ON "public"."client_users"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Courier has permission to his row only" ON "public"."courier_users"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert values" ON "public"."news"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() in (select user_id from admin_users));

CREATE POLICY "Only user or admin can read info" ON "public"."abstract_users"
AS PERMISSIVE FOR SELECT
TO authenticated
USING ((auth.uid() = user_id) OR (auth.uid() in (select user_id from admin_users)))
