// /schemaTypes/schema.ts

import {settings, themeSettings} from './Resume/settings'
import {seoSection} from './Resume/seo'
import {education, educationSection} from './Resume/education'
import {contact, contactSection} from './Resume/contact'
import {social} from './Resume/social'
import {summarySection} from './Resume/summary'
import {skill, skillsSection} from './Resume/skills'
import {
  experience,
  experienceSection,
  ngoExperience,
  ngoExperienceSection,
  earlyCareerExperienceSection,
  experienceDates,
} from './Resume/experience'
import resume from './Resume/intex'

import contactFormPortfolio from './Portfolio/contactForm'
import client from './Portfolio/clients'
import category from './Portfolio/category'
import project from './Portfolio/project'
import galleryItem from './Portfolio/galleryItem'
import customLink from './Portfolio/customLink'
import { 
  song, 
  persona, 
  analytics, 
  socialLinks, 
  album, 
  distributionConfiguration, 
  distributionStatus,
  spotifyConfiguration,
  youtubeMusicConfiguration,
  youtubeConfiguration,
  autoSyncSettings,
  platformStatus,
  genre
} from './Music'

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

  settings,
  themeSettings,

  seoSection,

  contactFormPortfolio,
  client,
  category,
  galleryItem,
  project,
  customLink,
  // Add music schemas
  song,
  persona,
  analytics,
  socialLinks,
  album,
  distributionConfiguration,
  distributionStatus,
  spotifyConfiguration,
  youtubeMusicConfiguration,
  youtubeConfiguration,
  autoSyncSettings,
  platformStatus,
  genre,
]
