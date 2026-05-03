/**
 * Imports George-Barbu_senior-frontend-engineer (3).docx into Sanity (resume slug senior-frontend-engineer).
 * Uses _id prefix cvSFE-* — createOrReplace updates the same bundle when re-run.
 *
 *   npm run import:cv-sfe
 *   SANITY_API_TOKEN=... npm run import:cv-sfe:node
 */
import {createClient} from '@sanity/client'

const PREFIX = 'cvSFE'

const projectId = 'bet7jatc'
const dataset = 'production'

async function getClient() {
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN
  if (token) {
    return createClient({
      projectId,
      dataset,
      apiVersion: '2025-05-01',
      token,
      useCdn: false,
    })
  }
  const cliMod = await import('sanity/cli')
  const {getCliClient} = cliMod.default
  return getCliClient({apiVersion: '2025-05-01'})
}

const ref = (_ref) => ({_type: 'reference', _ref})

const skillId = (slug) => `${PREFIX}-skill-${slug}`
const expId = (slug) => `${PREFIX}-exp-${slug}`
const eduId = (slug) => `${PREFIX}-edu-${slug}`
const ngoId = (slug) => `${PREFIX}-ngo-${slug}`
const resumeId = `${PREFIX}-resume`

function skillDoc(slug, title) {
  return {_id: skillId(slug), _type: 'skill', title}
}

/** Matches SKILLS + stack lines in George-Barbu_senior-frontend-engineer (3).docx */
const skills = [
  skillDoc('react', 'React'),
  skillDoc('nextjs', 'Next.js (App Router)'),
  skillDoc('typescript', 'TypeScript'),
  skillDoc('javascript-es6', 'JavaScript ES6+'),
  skillDoc('vue', 'Vue.js'),
  skillDoc('angularjs', 'AngularJS'),
  skillDoc('backbone', 'Backbone.js'),
  skillDoc('monorepo-nx-turbo', 'Monorepo (Nx, Turborepo)'),
  skillDoc('component-lib', 'Component library design'),
  skillDoc('ssr-ssg', 'SSR / SSG'),
  skillDoc('nodejs', 'Node.js'),
  skillDoc('php-cakephp', 'PHP (CakePHP)'),
  skillDoc('php', 'PHP'),
  skillDoc('graphql', 'GraphQL'),
  skillDoc('rest', 'REST'),
  skillDoc('mysql', 'MySQL'),
  skillDoc('redis', 'Redis'),
  skillDoc('docker', 'Docker'),
  skillDoc('cicd', 'CI/CD (GitLab CI, Jenkins)'),
  skillDoc('cloudflare', 'Cloudflare'),
  skillDoc('git', 'Git'),
  skillDoc('wordpress', 'WordPress'),
  skillDoc('sitecore', 'Sitecore'),
  skillDoc('cdn-opt', 'CDN optimisation'),
  skillDoc('jquery', 'jQuery'),
  skillDoc('scss', 'SCSS'),
  skillDoc('vanillajs', 'VanillaJS'),
  skillDoc('lang-en', 'English — C1 — Professional working proficiency'),
  skillDoc('lang-es', 'Spanish — B2 — Upper intermediate'),
  skillDoc('lang-ro', 'Romanian — C2 — Native'),
]

const experiences = [
  {
    _id: expId('liquidity'),
    _type: 'experience',
    company: 'Liquidity Media',
    role: 'Senior Frontend Engineer',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2025-01-01',
      presentDate: true,
    },
    duties: [
      'Built and maintained a React/Next.js monorepo powering multiple customer-facing brands.',
      'Defined component structure, state management patterns, and SSR/SSG rendering strategy across the platform.',
      'Delivered full migration from legacy VanillaJS/.NET to Next.js App Router, implementing OAuth and 2FA authentication flows.',
      'Improved development speed by 20% through refined engineering workflows and earlier QA integration.',
      'Introduced AI-assisted development tooling (Cursor, Copilot) to reduce repetitive work and accelerate delivery.',
      'Stack: React, Next.js (App Router), TypeScript, Node.js, Docker, CI/CD',
    ],
    skills: [
      ref(skillId('react')),
      ref(skillId('nextjs')),
      ref(skillId('typescript')),
      ref(skillId('nodejs')),
      ref(skillId('docker')),
      ref(skillId('cicd')),
    ],
    earlyCareer: false,
  },
  {
    _id: expId('kindred'),
    _type: 'experience',
    company: 'Kindred Group (32Red)',
    role: 'Senior Full Stack Engineer — Technical Owner',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2021-01-01',
      endDate: '2025-01-01',
      presentDate: false,
    },
    duties: [
      'Key contributor to core frontend systems at 32Red.com — wallet/cashier, casino lobby, and high-traffic landing pages serving hundreds of thousands of users.',
      'Built and maintained internal platforms for provider onboarding, CRM, and third-party integrations (SEO, compliance) used across multiple teams.',
      'Implemented Docker-based CI/CD pipelines, reducing QA feedback cycles by 30%.',
      'Contributed to architectural decisions around scalability and performance across multiple product areas; raised engineering standards through code reviews.',
      'Stack: React, TypeScript, PHP (CakePHP), Backbone.js, MySQL, Docker, GraphQL, REST, GitLab CI, Jenkins',
    ],
    skills: [
      ref(skillId('react')),
      ref(skillId('typescript')),
      ref(skillId('php-cakephp')),
      ref(skillId('backbone')),
      ref(skillId('mysql')),
      ref(skillId('docker')),
      ref(skillId('graphql')),
      ref(skillId('rest')),
      ref(skillId('cicd')),
    ],
    earlyCareer: false,
  },
  {
    _id: expId('entain-senior-fe'),
    _type: 'experience',
    company: 'Entain',
    role: 'Senior Frontend Engineer — Staff-Level Contributor',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2019-01-01',
      endDate: '2021-01-01',
      presentDate: false,
    },
    duties: [
      'Delivered refactoring of the landing page platform from legacy stack to Vue.js SPA on Sitecore, cutting page creation time by 90%.',
      'Boosted WordPress blog performance by 95% via caching, lazy loading, and CDN optimisation; custom theme adopted across Bwin, PartyCasino, and other brands.',
      'Implemented platform-wide frontend improvements for Coral and Ladbrokes ahead of global rollout.',
      'Stack: Vue.js, WordPress, SiteCore, Cloudflare, CDN optimisation',
    ],
    skills: [
      ref(skillId('vue')),
      ref(skillId('wordpress')),
      ref(skillId('sitecore')),
      ref(skillId('cloudflare')),
      ref(skillId('cdn-opt')),
    ],
    earlyCareer: false,
  },
  {
    _id: expId('entain-web'),
    _type: 'experience',
    company: 'Entain',
    role: 'Web Developer',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2018-01-01',
      endDate: '2019-01-01',
      presentDate: false,
    },
    duties: [
      'Built performant web applications handling real-world marketing campaign traffic.',
      'Developed interactive micro-apps and animated promotional experiences improving engagement and conversion.',
      'Delivered A/B tested features in collaboration with product and content teams.',
      'Stack: JavaScript ES6+, jQuery, PHP, SCSS',
    ],
    skills: [
      ref(skillId('javascript-es6')),
      ref(skillId('jquery')),
      ref(skillId('php')),
      ref(skillId('scss')),
    ],
    earlyCareer: false,
  },
  {
    _id: expId('gowild'),
    _type: 'experience',
    company: 'GoWild Gaming',
    role: 'Tech Lead / Full Stack Developer',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2014-01-01',
      endDate: '2018-01-01',
      presentDate: false,
    },
    duties: [
      'Defined frontend architecture and technical direction; promoted into leadership after consistent delivery.',
      'Delivered platform migration from MicroGaming to Finnplay, maintaining system stability throughout.',
      'Built dynamic UI components with AngularJS; established SEO strategy and coding standards.',
      'Stack: AngularJS, PHP, VanillaJS, MySQL',
    ],
    skills: [
      ref(skillId('angularjs')),
      ref(skillId('php')),
      ref(skillId('vanillajs')),
      ref(skillId('mysql')),
    ],
    earlyCareer: true,
  },
]

const education = {
  _id: eduId('edmond-nicolau'),
  _type: 'education',
  institution: 'Edmond Nicolau Technical College',
  degree: 'Computer Science & Electronics',
  type: 'Secondary technical education',
  certifications: ['Oracle Databases Certification'],
}

const ngos = [
  {
    _id: ngoId('andalusia-diversity'),
    _type: 'ngoExperience',
    company: 'Andalusia Diversity Alliance',
    role: 'President',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2024-01-01',
      presentDate: true,
    },
    duties: [],
  },
  {
    _id: ngoId('ampa'),
    _type: 'ngoExperience',
    company: "AMPA Parents' Association, 180+ members",
    role: 'Director',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2024-01-01',
      presentDate: true,
    },
    duties: [],
  },
]

function buildResume(settingsId) {
  return {
    _id: resumeId,
    _type: 'resume',
    cvpurpose: 'Senior Frontend Engineer — Word import (v3)',
    slug: {_type: 'slug', current: 'senior-frontend-engineer'},
    ...(settingsId ? {settings: ref(settingsId)} : {}),
    seoSection: {
      _type: 'seoSection',
      seoTitle: 'George Barbu | Senior Frontend Engineer — React · Next.js · TypeScript',
      seoKeywords: [
        'Senior Frontend Engineer',
        'React',
        'Next.js',
        'TypeScript',
        'iGaming',
        'monorepo',
        'Nx',
        'Turborepo',
        'Gibraltar',
        'Spain',
        'remote',
      ],
      seoDescription:
        'Senior Frontend Engineer with 12+ years building high-performance web applications for major iGaming brands. React/Next.js monorepos, performance, component systems.',
    },
    fullname: 'George Barbu',
    role: 'Senior Frontend Engineer  |  React · Next.js · TypeScript',
    slogan: '12+ years · iGaming · Performance · Monorepos',
    summarySection: {
      _type: 'summarySection',
      label: 'Professional summary',
      summary:
        'Senior Frontend Engineer with 12+ years building high-performance, scalable web applications for major iGaming brands — Ladbrokes, Coral, Bwin, 32Red, PartyCasino, and Gala Casino. Deep expertise in React/Next.js monorepo architecture, performance optimisation, and component system design. Experienced building and delivering complex frontend systems end-to-end, from technical decisions to production, in fast-paced cross-functional teams.',
    },
    skillsSections: [
      {
        _type: 'skillsSection',
        label: 'Frontend',
        view: 'tags',
        disabled: false,
        items: [
          ref(skillId('react')),
          ref(skillId('nextjs')),
          ref(skillId('typescript')),
          ref(skillId('javascript-es6')),
          ref(skillId('vue')),
        ],
      },
      {
        _type: 'skillsSection',
        label: 'Architecture',
        view: 'tags',
        disabled: false,
        items: [
          ref(skillId('monorepo-nx-turbo')),
          ref(skillId('component-lib')),
          ref(skillId('ssr-ssg')),
        ],
      },
      {
        _type: 'skillsSection',
        label: 'Backend',
        view: 'tags',
        disabled: false,
        items: [
          ref(skillId('nodejs')),
          ref(skillId('php-cakephp')),
          ref(skillId('graphql')),
          ref(skillId('rest')),
          ref(skillId('mysql')),
          ref(skillId('redis')),
        ],
      },
      {
        _type: 'skillsSection',
        label: 'DevOps',
        view: 'tags',
        disabled: false,
        items: [
          ref(skillId('docker')),
          ref(skillId('cicd')),
          ref(skillId('cloudflare')),
          ref(skillId('git')),
        ],
      },
      {
        _type: 'skillsSection',
        label: 'Languages',
        view: 'list',
        disabled: false,
        items: [ref(skillId('lang-en')), ref(skillId('lang-es')), ref(skillId('lang-ro'))],
      },
    ],
    experienceSection: {
      _type: 'experienceSection',
      label: 'Professional experience',
      items: [
        ref(expId('liquidity')),
        ref(expId('kindred')),
        ref(expId('entain-senior-fe')),
        ref(expId('entain-web')),
      ],
    },
    earlyCareerExperienceSection: {
      _type: 'earlyCareerExperienceSection',
      label: 'Early career',
      disabled: false,
      items: [ref(expId('gowild'))],
    },
    ngoExperienceSection: {
      _type: 'ngoExperienceSection',
      label: 'Leadership beyond work',
      disabled: false,
      items: [ref(ngoId('andalusia-diversity')), ref(ngoId('ampa'))],
    },
    educationSection: {
      _type: 'educationSection',
      label: 'Education & certifications',
      disabled: false,
      items: [ref(eduId('edmond-nicolau'))],
    },
    contactSection: {
      _type: 'contactSection',
      label: 'Contact',
      items: [
        {
          _type: 'contact',
          service: 'location',
          label: 'Location',
          showLabel: false,
          value: 'Gibraltar / Spain (EU Remote)',
        },
        {_type: 'contact', service: 'phone', label: 'Phone', showLabel: false, value: '+34 722 853 139'},
        {_type: 'contact', service: 'email', label: 'Email', showLabel: false, value: 'george@barbu.es'},
        {_type: 'contact', service: 'web', label: 'Website', showLabel: false, value: 'george.barbu.es'},
        {
          _type: 'contact',
          service: 'linkedin',
          label: 'LinkedIn',
          showLabel: false,
          value: 'linkedin.com/in/barbugeorge',
        },
      ],
    },
    social: [
      {_type: 'social', service: 'LinkedIn', url: 'https://linkedin.com/in/barbugeorge'},
      {_type: 'social', service: 'Website', url: 'https://george.barbu.es'},
    ],
    homepage: false,
  }
}

async function main() {
  let client
  try {
    client = await getClient()
  } catch (e) {
    console.error('Could not create Sanity client.', e)
    process.exit(1)
  }

  const settingsId = await client.fetch(`*[_type == "settings"][0]._id`)

  const docs = [
    ...skills,
    ...experiences,
    education,
    ...ngos,
    buildResume(settingsId || undefined),
  ]

  const tx = client.transaction()
  for (const doc of docs) {
    tx.createOrReplace(doc)
  }
  await tx.commit()
  console.log(`Committed ${docs.length} documents. Resume _id: ${resumeId} slug: senior-frontend-engineer`)

  const keepSkillIds = new Set(skills.map((s) => s._id))
  const allSkillIds = await client.fetch(`*[_type == "skill"]._id`)
  const orphanSkillIds = allSkillIds.filter(
    (id) => typeof id === 'string' && id.startsWith('cvSFE-skill-') && !keepSkillIds.has(id),
  )
  if (orphanSkillIds.length) {
    const delTx = client.transaction()
    for (const id of orphanSkillIds) delTx.delete(id)
    await delTx.commit()
    console.log(`Removed ${orphanSkillIds.length} obsolete cvSFE skill documents.`)
  }
}

export default main

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
