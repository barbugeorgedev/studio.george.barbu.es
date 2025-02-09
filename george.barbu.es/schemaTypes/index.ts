// /schemaTypes/schema.ts

import {education, educationSection} from './education'
import {contact, contactSection} from './contact'
import {social} from './social'
import {summarySection} from './summary'
import {skill, skillsSection} from './skills'
import {
  experience,
  experienceSection,
  ngoExperience,
  ngoExperienceSection,
  earlyCareerExperienceSection,
  experienceDates,
} from './experience'
import resume from './resume'

export const schemaTypes = [
  resume,

  // Contact-related schemas
  contact,
  contactSection,

  // Social profiles schema
  social,

  summarySection,

  // Skills schemas
  skill,
  skillsSection,

  // Education-related schemas
  education,
  educationSection,

  // Experience-related schemas
  experience,
  ngoExperience,
  experienceSection,
  ngoExperienceSection,
  earlyCareerExperienceSection,
  experienceDates,
]
