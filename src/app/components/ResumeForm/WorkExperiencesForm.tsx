import { Form, FormSection } from "components/ResumeForm/Form";
import {
    Input,
    BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
    changeWorkExperiences,
    selectWorkExperiences,
} from "lib/redux/resumeSlice";
import type { ResumeWorkExperience } from "lib/redux/types";
import axios from 'axios'; // Import axios for making HTTP requests

export const WorkExperiencesForm = () => {
    const workExperiences = useAppSelector(selectWorkExperiences);
    const dispatch = useAppDispatch();

    const showDelete = workExperiences.length > 1;

  
    // Function to optimize experience description
    const handleOptimizeExperience = async (idx: number) => {
        const description = workExperiences[idx].descriptions.join('\n');
        try {
            const response = await axios.get(`http://127.0.0.1:8000/exp/${encodeURIComponent(description)}`);
            const optimizedDescription = response.data.join('\n\n');
            dispatch(changeWorkExperiences({ idx, field: 'descriptions', value: [optimizedDescription] }));
        } catch (error) {
            console.error('Error optimizing experience description:', error);
        }
    };

    return (

      
        <Form form="workExperiences" addButtonText="Add Experience">
            {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
                const handleWorkExperienceChange = (
                    ...[
                        field,
                        value,
                    ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
                ) => {
                    // TS doesn't support passing union type to single call signature
                    // https://github.com/microsoft/TypeScript/issues/54027
                    // any is used here as a workaround
                    dispatch(changeWorkExperiences({ idx, field, value } as any));
                };
                const showMoveUp = idx !== 0;
                const showMoveDown = idx !== workExperiences.length - 1;

                return (
                    <FormSection
                        key={idx}
                        form="workExperiences"
                        idx={idx}
                        showMoveUp={showMoveUp}
                        showMoveDown={showMoveDown}
                        showDelete={showDelete}
                        deleteButtonTooltipText="Work Experience"
                    >
                        <Input
                            label="Company"
                            labelClassName="col-span-full"
                            name="company"
                            placeholder="RD"
                            value={company}
                            onChange={handleWorkExperienceChange}
                        />
                        <Input
                            label="Job"
                            labelClassName="col-span-4"
                            name="jobTitle"
                            placeholder="Software Engineer"
                            value={jobTitle}
                            onChange={handleWorkExperienceChange}
                        />
                        <Input
                            label="Date"
                            labelClassName="col-span-2"
                            name="date"
                            placeholder="Jun 2022 - Present"
                            value={date}
                            onChange={handleWorkExperienceChange}
                        />
                        <BulletListTextarea
                            label="Description"
                            labelClassName="col-span-full"
                            name="descriptions"
                            placeholder="Bullet points"
                            value={descriptions}
                            onChange={(name, value) => {
                                handleWorkExperienceChange(name, value);
                                // if (Array.isArray(value)) {
                                //     value.forEach((item) => handleGenerateExperience(idx, item)); // Call the function for each item in the array
                                // } else {
                                //     handleGenerateExperience(idx, value); // Call the function for single value
                                // }
                            }}
                        />
                                              <button
  onClick={() => handleOptimizeExperience(idx)}
  className="optimize-experience-button"
>
  Optimize Experience Description
</button>

<style>{`
  .optimize-experience-button {
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #4fc5eb;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: 0.4s;
  }

  .optimize-experience-button:hover {
    background-color: #45a049;
  }
`}</style>

                    </FormSection>
                );
            })}
            
        </Form>
    );
};
