create policy dependencies_policy on dependencies
    using (current_setting('request.jwt.claim.role', true) = 'superadmin')
    with check (current_setting('request.jwt.claim.role', true) = 'superadmin');
grant select on dependencies to superadmin;
grant insert on dependencies to superadmin;