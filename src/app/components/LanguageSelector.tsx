import { useState } from 'react';

export const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish', pro: true },
    { code: 'de', name: 'German', pro: true },
    { code: 'it', name: 'Italian', pro: true },
    { code: 'pt', name: 'Portuguese', pro: true },
    { code: 'ru', name: 'Russian', pro: true },
    { code: 'zh', name: 'Chinese', pro: true },
    { code: 'ja', name: 'Japanese', pro: true },
    { code: 'ko', name: 'Korean', pro: true },
    { code: 'ar', name: 'Arabic', pro: true },
    { code: 'hi', name: 'Hindi', pro: true },
  ];

  return (
    <div className="relative">
      <select
        className="rounded-md px-2 py-1 text-gray-500 border border-gray-300"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {languages.map(({ code, name, pro }) => (
          <option key={code} value={code}>
            {name} {pro && '(Pro)'}
          </option>
        ))}
      </select>
    </div>
  );
};
