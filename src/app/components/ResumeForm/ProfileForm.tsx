import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location, url_github, url_linkedin } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  const [domain, setDomain] = useState('');

  const handleGenerateProfile = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/skills/${encodeURIComponent(domain)}`);
      dispatch(changeProfile({ field: 'summary', value: response.data[0] }));
    } catch (error) {
      console.error('Error generating profile description:', error);
      dispatch(changeProfile({ field: 'summary', value: 'Failed to generate profile description.' }));
    }
  };

  const handleInputChange = (name: string, value: string) => {
    handleProfileChange(name as keyof ResumeProfile, value);
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Hamdi Baklouti"
          value={name}
          onChange={handleInputChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="user@weresume.dev"
          value={email}
          onChange={handleInputChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="+56999999999"
          value={phone}
          onChange={handleInputChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="https://weresume.co"
          value={url}
          onChange={handleInputChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="Tunis, Tunisia"
          value={location}
          onChange={handleInputChange}
        />
        <Input
          label="Git Projects"
          labelClassName="col-span-3"
          name="url_github"
          placeholder="https://github.com/username"
          value={url_github}
          onChange={handleInputChange}
        />
        <Input
          label="Linkedin"
          labelClassName="col-span-3"
          name="url_linkedin"
          placeholder="https://www.linkedin.com/in/user_profile/"
          value={url_linkedin}
          onChange={handleInputChange}
        />
        <div className="col-span-full">
          <Input
            label="Domain"
            labelClassName="col-span-full"
            name="domain"
            placeholder="Enter your domain"
            value={domain}
            onChange={(name, value) => setDomain(value)}
          />
          <button
            onClick={handleGenerateProfile}
            className="generate-profile-button"
          >
            Generate Profile Description
          </button>
        </div>
        <Textarea
          label="Resume"
          labelClassName="col-span-full"
          name="summary"
          placeholder="obsessed with making education accessible to all."
          value={summary}
          onChange={handleInputChange}
        />
      </div>
      <style>{`
        .generate-profile-button {
          padding: 10px 20px;
          margin-top: 10px;
          background-color: #4fc5eb;
          border: none;
          color: white;s
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
    </BaseForm>
  );
};
