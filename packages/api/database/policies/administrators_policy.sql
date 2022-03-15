create policy administrators_policy on administrators
    using ( (current_setting('request.jwt.claim.dependencyId', true) = dependency_id) OR (current_setting('request.jwt.claim.role', true) = 'superadmin') );

drop policy administrators_policy on administrators;

grant select on administrators to superadmin;