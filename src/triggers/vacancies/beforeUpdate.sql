create or replace function increase_chosen_candidate_skills()
returns trigger as $$
declare 
	related_technology_ids_for_vacancy_requirements int[];
	user_skills_ids_related_to_vacancy_tech_requirements int[];
begin 
	select array (
		select "technologyId" 
		from vacancy_requirements
		where "vacancyId" = new.id
	)
	into related_technology_ids_for_vacancy_requirements;

	select array (
		select id from user_skills
		where "technologyId" = any(related_technology_ids_for_vacancy_requirements)
		and "userId" = new."chosenCandidateId"
	)
	into user_skills_ids_related_to_vacancy_tech_requirements;

	update user_skills
	set score = score + 100
	where id = any(user_skills_ids_related_to_vacancy_tech_requirements);

	return new;
end
$$ language plpgsql;

create trigger before_update_vacancy
before update of "chosenCandidateId" on vacancies
for each row 
execute function increase_chosen_candidate_skills();