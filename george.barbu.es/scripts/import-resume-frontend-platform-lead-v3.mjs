/**
 * Imports CV content from George-Barbu_Frontend-Platform-Lead_v3.docx into Sanity.
 * By default removes existing resume-related documents (resume, experience, skill,
 * education, ngoExperience) then creates the new bundle. Skip wipe with:
 *   SANITY_IMPORT_NO_WIPE=1
 *
 *   SANITY_API_TOKEN=... node scripts/import-resume-frontend-platform-lead-v3.mjs
 */
import {createClient} from '@sanity/client'

const PREFIX = 'cvFpV3'

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

const skills = [
  skillDoc('react', 'React'),
  skillDoc('nextjs', 'Next.js'),
  skillDoc('typescript', 'TypeScript'),
  skillDoc('frontend-architecture', 'Frontend Architecture'),
  skillDoc('monorepo-nx', 'Monorepo Systems (Nx)'),
  skillDoc('nodejs', 'Node.js'),
  skillDoc('php-cakephp', 'PHP (CakePHP)'),
  skillDoc('graphql', 'GraphQL'),
  skillDoc('rest', 'REST'),
  skillDoc('sql', 'SQL'),
  skillDoc('docker', 'Docker'),
  skillDoc('cicd', 'CI/CD'),
  skillDoc('cloudflare', 'Cloudflare'),
  skillDoc('tech-leadership', 'Technical Leadership'),
  skillDoc('team-delivery', 'Team Delivery'),
  skillDoc('stakeholder-mgmt', 'Stakeholder Management'),
  skillDoc('cursor-ai', 'Cursor'),
  skillDoc('copilot', 'GitHub Copilot'),
  skillDoc('vue', 'Vue.js'),
  skillDoc('lang-en', 'English — C1 (professional working proficiency)'),
  skillDoc('lang-ro', 'Romanian — C2 (native)'),
  skillDoc('lang-es', 'Spanish — B2 (upper intermediate)'),
]

const experiences = [
  {
    _id: expId('liquidity'),
    _type: 'experience',
    company: 'Liquidity Media',
    role: 'Engineering Team Lead — Frontend Platform',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2025-01-01',
      presentDate: true,
    },
    duties: [
      'Led a team of 4 engineers across two product streams delivering customer-facing applications.',
      'Drove architecture for a React/Next.js monorepo supporting multiple brands.',
      'Led migration from legacy VanillaJS/.NET to Next.js, including OAuth and 2FA implementation.',
      'Improved delivery consistency and reduced rework by 20% through earlier QA involvement.',
      'Worked directly with C-level stakeholders to align engineering roadmap with business objectives.',
      'Introduced AI-assisted development workflows (Cursor, Copilot) to improve development speed.',
    ],
    skills: [
      ref(skillId('react')),
      ref(skillId('nextjs')),
      ref(skillId('typescript')),
      ref(skillId('cursor-ai')),
      ref(skillId('copilot')),
      ref(skillId('tech-leadership')),
      ref(skillId('stakeholder-mgmt')),
    ],
    earlyCareer: false,
  },
  {
    _id: expId('kindred'),
    _type: 'experience',
    company: 'Kindred Group',
    role: 'Senior Full Stack Engineer — Technical Owner',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2021-01-01',
      endDate: '2025-01-01',
      presentDate: false,
    },
    duties: [
      'Technical owner for core customer-facing systems at 32Red.com — wallet/cashier, casino lobby, and landing pages used by hundreds of thousands of users.',
      'Built internal platforms for provider onboarding, CRM, and third-party integrations used across multiple teams.',
      'Established Docker-based CI/CD pipelines, achieving a 30% reduction in QA feedback cycles.',
      'Mentored engineers through code reviews and architectural guidance, raising engineering standards.',
      'Stack: React, TypeScript, CakePHP, MySQL, Docker, GraphQL, REST.',
    ],
    skills: [
      ref(skillId('react')),
      ref(skillId('typescript')),
      ref(skillId('php-cakephp')),
      ref(skillId('docker')),
      ref(skillId('graphql')),
      ref(skillId('rest')),
      ref(skillId('sql')),
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
      'Led refactoring of the landing page platform to a Vue.js SPA on Sitecore.',
      'Reduced page creation time by 90% through improved tooling and architecture.',
      'Improved WordPress performance by 95% via caching, lazy loading, and CDN optimisation.',
      'Delivered projects for Coral and Ladbrokes before global rollout, working closely with Product and UX leadership.',
    ],
    skills: [ref(skillId('vue')), ref(skillId('cloudflare'))],
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
      'Built scalable web applications for high-traffic marketing campaigns.',
      'Developed interactive micro-apps improving user engagement and conversion.',
      'Collaborated with product and content teams to deliver A/B tested features.',
    ],
    skills: [],
    earlyCareer: false,
  },
  {
    _id: expId('gowild'),
    _type: 'experience',
    company: 'GoWild Gaming',
    role: 'Tech Lead / Full Stack Developer / Project Lead',
    experienceDates: {
      _type: 'experienceDates',
      startDate: '2014-01-01',
      endDate: '2018-01-01',
      presentDate: false,
    },
    duties: [
      'Promoted to define frontend architecture and lead a 5-person delivery team.',
      'Managed platform migration from MicroGaming to Finnplay, ensuring system stability.',
      'Established engineering best practices, SEO strategy, and coding standards.',
    ],
    skills: [ref(skillId('tech-leadership')), ref(skillId('team-delivery'))],
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
    company: "AMPA Parents' Association (180+ members)",
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
    cvpurpose: 'Frontend Platform Lead — CV v3 (Word import)',
    slug: {_type: 'slug', current: 'frontend-platform-lead-v3'},
    ...(settingsId ? {settings: ref(settingsId)} : {}),
    seoSection: {
      _type: 'seoSection',
      seoTitle: 'George Barbu | Frontend Platform Lead — React / Next.js',
      seoKeywords: [
        'Frontend Platform Lead',
        'React',
        'Next.js',
        'TypeScript',
        'iGaming',
        'monorepo',
        'Nx',
        'engineering leadership',
        'Spain',
        'remote',
      ],
      seoDescription:
        'Frontend Platform Lead specializing in scaling high-traffic, multi-brand platforms in iGaming. React/Next.js monorepos, architecture, and delivery.',
    },
    fullname: 'George Barbu',
    role: 'Frontend Platform Lead  |  React / Next.js',
    slogan: 'Scaling Multi-Brand Platforms  ·  Architecture  ·  Delivery',
    summarySection: {
      _type: 'summarySection',
      label: 'Summary',
      summary:
        'Frontend Platform Lead specializing in scaling high-traffic, multi-brand platforms in iGaming. Experience includes working on platforms for major brands such as Ladbrokes, Coral, Bwin, 32Red, PartyCasino, and Gala Casino. Leads frontend architecture and delivery using React/Next.js monorepos (Nx-based), focusing on scalability, performance, and engineering velocity while aligning technical decisions with business outcomes.',
    },
    skillsSections: [
      {
        _type: 'skillsSection',
        label: 'Frontend',
        view: 'tags',
        disabled: false,
        items: [ref(skillId('react')), ref(skillId('nextjs')), ref(skillId('typescript'))],
      },
      {
        _type: 'skillsSection',
        label: 'Architecture',
        view: 'tags',
        disabled: false,
        items: [ref(skillId('frontend-architecture')), ref(skillId('monorepo-nx'))],
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
          ref(skillId('sql')),
        ],
      },
      {
        _type: 'skillsSection',
        label: 'DevOps',
        view: 'tags',
        disabled: false,
        items: [ref(skillId('docker')), ref(skillId('cicd')), ref(skillId('cloudflare'))],
      },
      {
        _type: 'skillsSection',
        label: 'Leadership',
        view: 'tags',
        disabled: false,
        items: [
          ref(skillId('tech-leadership')),
          ref(skillId('team-delivery')),
          ref(skillId('stakeholder-mgmt')),
        ],
      },
      {
        _type: 'skillsSection',
        label: 'AI development',
        view: 'tags',
        disabled: false,
        items: [ref(skillId('cursor-ai')), ref(skillId('copilot'))],
      },
      {
        _type: 'skillsSection',
        label: 'Languages',
        view: 'list',
        disabled: false,
        items: [ref(skillId('lang-en')), ref(skillId('lang-ro')), ref(skillId('lang-es'))],
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
        {_type: 'contact', service: 'location', label: 'Location', showLabel: false, value: 'Spain (EU Remote)'},
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
    homepage: true,
  }
}

async function deleteIds(client, ids) {
  if (!ids.length) return
  const tx = client.transaction()
  for (const id of ids) tx.delete(id)
  await tx.commit()
}

/** Delete in reference order: resumes → experiences → ngos → education → skills */
async function wipeCvDocuments(client) {
  const resumeIds = await client.fetch(`*[_type == "resume"]._id`)
  const experienceIds = await client.fetch(`*[_type == "experience"]._id`)
  const ngoIds = await client.fetch(`*[_type == "ngoExperience"]._id`)
  const educationIds = await client.fetch(`*[_type == "education"]._id`)
  const skillIds = await client.fetch(`*[_type == "skill"]._id`)

  await deleteIds(client, resumeIds)
  await deleteIds(client, experienceIds)
  await deleteIds(client, ngoIds)
  await deleteIds(client, educationIds)
  await deleteIds(client, skillIds)

  const n =
    resumeIds.length +
    experienceIds.length +
    ngoIds.length +
    educationIds.length +
    skillIds.length
  console.log(
    `Wiped ${n} documents (resume: ${resumeIds.length}, experience: ${experienceIds.length}, ngo: ${ngoIds.length}, education: ${educationIds.length}, skill: ${skillIds.length}).`
  )
}

async function main() {
  let client
  try {
    client = await getClient()
  } catch (e) {
    console.error('Could not create Sanity client.', e)
    process.exit(1)
  }

  if (!process.env.SANITY_IMPORT_NO_WIPE) {
    await wipeCvDocuments(client)
  } else {
    console.log('SANITY_IMPORT_NO_WIPE set — skipping delete of existing CV documents.')
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
  console.log(`Committed ${docs.length} documents. Resume _id: ${resumeId}`)
}

export default main

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
