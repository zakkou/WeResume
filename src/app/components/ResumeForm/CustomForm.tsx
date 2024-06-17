import { Form } from "components/ResumeForm/Form";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import { BulletListTextarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustom, selectCustom } from "lib/redux/resumeSlice";
import { selectShowBulletPoints, changeShowBulletPoints } from "lib/redux/settingsSlice";
import axios from "axios";
import { useState } from "react";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  
  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  const handleFetchEducation = async () => {
    const description = descriptions.join("\n"); // Joining array of descriptions into a single string
    try {
      const response = await axios.get(`http://127.0.0.1:8000/edu/${encodeURIComponent(description)}`);
      const fetchedDescription = response.data[0];
      // Set fetched description to the descriptions field in the Redux state
      dispatch(changeCustom({ field: "descriptions", value: [fetchedDescription] }));
    } catch (error) {
      console.error("Error fetching education description:", error);
    }
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Text Custom"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[7.7rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
          <button
            onClick={handleFetchEducation}
            className="optimize-experience-button"
          >
            Optimize Description
          </button>
        </div>
      </div>
    </Form>
  );
};
