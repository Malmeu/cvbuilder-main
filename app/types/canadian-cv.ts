export interface CanadianPersonalDetails {
  firstName: string;
  lastName: string;
  currentPosition: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  linkedIn?: string;
  summary: string;
}

export interface CanadianExperience {
  position: string;
  company: string;
  city: string;
  province: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

export interface CanadianEducation {
  diploma: string;
  institution: string;
  city: string;
  province: string;
  startYear: string;
  endYear: string;
  equivalence?: string; // Pour les diplômes étrangers
}

export interface CanadianSkill {
  category: string; // ex: "Langues", "Compétences techniques", etc.
  skills: string[];
}

export interface CanadianInterest {
  name: string;
  description?: string;
}

export interface CanadianReference {
  available: boolean;
  text?: string; // "Références disponibles sur demande" ou personnalisé
}

// Modèle complet du CV
export interface CanadianCV {
  personalDetails: CanadianPersonalDetails;
  experiences: CanadianExperience[];
  education: CanadianEducation[];
  skills: CanadianSkill[];
  interests: CanadianInterest[];
  references: CanadianReference;
  language: 'fr' | 'en'; // Support bilingue
}
