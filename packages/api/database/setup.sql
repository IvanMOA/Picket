CREATE ROLE authenticator noinherit login password 'mysecretpassword';
CREATE ROLE web_anon nologin;
CREATE ROLE superadmin nologin;
GRANT web_anon TO authenticator;
GRANT superadmin TO authenticator;
GRANT USAGE ON SCHEMA public TO superadmin;
GRANT USAGE ON SCHEMA public TO web_anon;
GRANT SELECT ON administrators TO superadmin;
create policy administrators_policy on administrators
    using ((current_setting('request.jwt.claim.dependencyId', true) = dependency_id) OR
           (current_setting('request.jwt.claim.role', true) = 'superadmin'));
