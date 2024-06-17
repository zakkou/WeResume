import { Form, FormSection } from "components/ResumeForm/Form";
import { Input, BulletListTextarea } from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectProjects, changeProjects } from "lib/redux/resumeSlice";
import type { ResumeProject } from "lib/redux/types";
import { useState } from "react";
import axios from "axios";

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;

  const handleFetchEducation = async (idx: number) => {
    const description = projects[idx].descriptions.join("\n"); // Joining array of descriptions into a single string
    try {
      const response = await axios.get(`http://127.0.0.1:8000/edu/${encodeURIComponent(description)}`);
      const fetchedDescription = response.data[0];
      // Set fetched description to the descriptions field in the Redux state for the corresponding project
      dispatch(changeProjects({ idx, field: "descriptions", value: [fetchedDescription] }));
    } catch (error) {
      console.error("Error fetching education description:", error);
    }
  };

  return (
    <Form form="projects" addButtonText="Add Project">
      {projects.map(({ project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete project"}
          >
            <Input
              name="project"
              label="Project name"
              placeholder="WeResume"
              value={project}
              onChange={handleProjectChange}
              labelClassName="col-span-4"
            />
            <Input
              name="date"
              label="Date"
              placeholder="March 2024"
              value={date}
              onChange={handleProjectChange}
              labelClassName="col-span-2"
            />
            <BulletListTextarea
              name="descriptions"
              label="Description"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            <button
              onClick={() => handleFetchEducation(idx)}
              className="optimize-experience-button"
            >
              Optimize Project Description
            </button>
          </FormSection>
        );
      })}
    </Form>
  );
};
