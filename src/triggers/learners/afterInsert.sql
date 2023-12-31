create or replace function increase_learner_skills()
returns trigger as $$
declare
	related_technology_ids_for_vacancy_requirements int[];
	user_skills_ids_related_to_vacancy_tech_requirements int[];
begin 
	select array (
		select "technologyId" 
		from vacancy_requirements
		where "vacancyId" = new."vacancyId"
	)
	into related_technology_ids_for_vacancy_requirements;

	select array (
		select id from user_skills
		where "technologyId" = any(related_technology_ids_for_vacancy_requirements)
		and "userId" = new."candidateId"
	)
	into user_skills_ids_related_to_vacancy_tech_requirements;

	update user_skills
	set score = score + 100
	where id = any(user_skills_ids_related_to_vacancy_tech_requirements);

	return new;
end
$$ language plpgsql;

create trigger after_insert_learner
after insert on learners
for each row 
execute function increase_learner_skills();