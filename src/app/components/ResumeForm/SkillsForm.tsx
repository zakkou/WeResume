import { useState } from "react";
import axios from "axios";
import { Form } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  InputGroupWrapper,
} from "components/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "components/ResumeForm/Form/FeaturedSkillInput";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectSkills, changeSkills } from "lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
  selectThemeColor,
} from "lib/redux/settingsSlice";

export const SkillsForm = () => {
  const [fetchedSkills, setFetchedSkills] = useState<string[]>([]);
  const [domain, setDomain] = useState("");
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const { featuredSkills, descriptions } = skills;
  const form = "skills";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";

  const handleSkillsChange = (
    field: "descriptions",
    value: string[]
  ) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(
      changeSkills({ field: "featuredSkills", idx, skill, rating })
    );
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/domainskill/${encodeURIComponent(
          domain
        )}`
      );
      setFetchedSkills(response.data);
      // Concatenate fetched skills with existing skills and update descriptions state
      const updatedSkills = [...descriptions, ...response.data];
      handleSkillsChange("descriptions", updatedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setFetchedSkills([]);
    }
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Skills"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleSkillsChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[10.5rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={() => handleShowBulletPoints(!showBulletPoints)}
            />
          </div>
        </div>
        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
        <InputGroupWrapper
          label="Featured Skills (Optional)"
          className="col-span-full"
        >
          <p className="mt-2 text-sm font-normal text-gray-600">
            Featured Skills are optional to highlight the best skills,
            More circles means more competition.
          </p>
        </InputGroupWrapper>

        {featuredSkills.map(({ skill, rating }, idx) => (
          <FeaturedSkillInput
            key={idx}
            className="col-span-3"
            skill={skill}
            rating={rating}
            setSkillRating={(newSkill, newRating) => {
              handleFeaturedSkillsChange(idx, newSkill, newRating);
            }}
            placeholder={`Skill ${idx + 1}`}
            circleColor={themeColor}
          />
        ))}

        <div className="col-span-full">
          <input
            type="text"
            placeholder="Enter domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button
            onClick={fetchSkills}
            className="generate-profile-button"
          >
            Generate Skills
          </button>
        </div>

        
      </div>
      <style>{`
        .generate-profile-button {
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

        .generate-profile-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </Form>
  );
};
