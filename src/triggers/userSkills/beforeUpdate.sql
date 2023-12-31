create or replace function change_skill_level()
returns trigger as $$
begin
	if new.score >= 2000 then
        new."skillLevel" = 'Avançado';
    else
        if new.score >= 1000 then
            new."skillLevel" = 'Intermediário';
        else
            new."skillLevel" = 'Básico';
        end if;
    end if;
    return new;
end;
$$ language plpgsql;

create trigger before_update_vacancies
before update of score on user_skills
for each row 
execute function change_skill_level();