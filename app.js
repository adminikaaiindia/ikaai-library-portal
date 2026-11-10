/**
 * IKAAI ACADEMY – LEARNING PORTAL
 * Plain JavaScript Application Logic & LocalStorage State Management
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATA DEFINITION
  // ==========================================

  const INITIAL_DATA = {
    profile: {
      name: 'Sudhir Kumar',
      initials: 'SK',
      email: 's.kumar@ikaaiindia.org',
      role: 'Intern',
      branch: 'New Delhi / Remote',
      position: 'Human Resources Intern',
      memberSince: 'October 2026',
      verified: true
    },
    programmes: {
      hr: {
        id: 'hr',
        title: 'Human Resources',
        roleTag: 'Human Resources',
        description: "As a Recruitment Intern, you'll run recruitment for every role at Ikaai — Social Researchers, Data Analysts, Project Managers and Strategic Advisors. You will master sourcing talent, conducting initial screenings, coordinating interviews, and maintaining company-wide onboarding excellence.",
        modules: [
          {
            id: 'mod_0',
            indexNumber: 0,
            title: '0. Onboarding & Digital Workspace',
            grade: 'A (90%)',
            quizTitle: 'Digital Workspace & Security',
            objectives: [
              "Familiarize yourself with Ikaai's digital toolstack and communication standards.",
              "Complete your workspace profile and sign required policy compliance documents.",
              "Set up your secure @ikaaiindia.org credentials, 2FA, and official email signature.",
              "Learn security protocols including phishing detection and data privacy principles."
            ],
            resources: [
              {
                id: 'res_0_1',
                title: '0.1 New Joiner Checklist',
                type: 'Document',
                storage_path: 'human-resources/module-0/0.1-new-joiner-checklist.docx',
                fileExt: 'DOC',
                completed: true,
                slides: [
                  {
                    title: 'Ikaai New Joiner Checklist',
                    subtitle: 'Day 1 to Week 2 Essentials',
                    points: [
                      '1. Accept workspace invitation and complete your Ikaai directory profile.',
                      '2. Configure Two-Factor Authentication (2FA) on your Google Workspace.',
                      '3. Read and sign the Ikaai Foundation Code of Ethics and Privacy Charter.',
                      '4. Schedule your 1-on-1 welcome session with your HR Mentor.'
                    ]
                  }
                ]
              },
              {
                id: 'res_0_2',
                title: '0.2 Onboarding Presentation',
                type: 'PDF',
                storage_path: 'human-resources/module-0/0.2-onboarding-presentation.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Welcome to Ikaai Academy',
                    subtitle: 'Impact Assessment & Social Innovation',
                    points: [
                      'Founded to bridge grassroots research with measurable social impact.',
                      'We partner with non-profits, CSR funds, and government institutions.',
                      'Our interns play a direct role in real projects and community evaluations.',
                      'Branches in New Delhi, Lucknow, Bengaluru, and remote field teams across India.'
                    ],
                    hasTimeline: true
                  },
                  {
                    title: 'Internship Milestones & Timeline',
                    subtitle: '3-Month Growth Path',
                    points: [
                      'Month 1: Getting Started in Your Role – tool mastery and shadowing.',
                      'Month 2: Active Contribution – independent project execution.',
                      'Month 3: Top Performance & Leadership – mentoring and final evaluations.'
                    ],
                    hasTimeline: true
                  }
                ]
              },
              {
                id: 'res_0_3',
                title: '0.3 Recruitment Intern Handbook',
                type: 'PDF',
                storage_path: 'human-resources/module-0/0.3-recruitment-intern-handbook.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Recruitment Intern Handbook',
                    subtitle: 'End-to-End Talent Acquisition Workflow',
                    points: [
                      'Standard operating procedures for applicant screening.',
                      'Maintaining neutral, unbiased evaluation rubrics.',
                      'Response turnaround times: Maximum 48 hours for applicants.',
                      'Escalation pathways for candidate special accommodation requests.'
                    ]
                  }
                ]
              },
              {
                id: 'res_0_4',
                title: '0.4 Weekly Report Template',
                type: 'Document',
                storage_path: 'human-resources/module-0/0.4-weekly-report-template.docx',
                fileExt: 'DOC',
                completed: true,
                slides: [
                  {
                    title: 'Weekly Intern Progress Report (WPR)',
                    subtitle: 'Submission Guidelines: Every Friday by 6:00 PM IST',
                    points: [
                      'Section A: Key accomplishments and completed recruitment pipelines.',
                      'Section B: Challenges encountered and support requested.',
                      'Section C: Upcoming week priorities and personal learning goals.',
                      'All reports are reviewed directly by the HR Lead.'
                    ]
                  }
                ]
              },
              {
                id: 'res_0_5',
                title: '0.5 Setting Up Your Ikaai Email',
                type: 'PDF',
                storage_path: 'human-resources/module-0/0.5-setting-up-ikaai-email.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Google Workspace Setup Guide',
                    subtitle: 'Secure Access & Password Protocol',
                    points: [
                      'Access via https://mail.google.com with your @ikaaiindia.org address.',
                      'Set a strong passphrase containing at least 14 characters.',
                      'Install Google Authenticator for mandatory time-based OTPs.',
                      'Do not use personal accounts for Ikaai official correspondence.'
                    ]
                  }
                ]
              },
              {
                id: 'res_0_6',
                title: '0.6 Phishing Prevention – Required Reading',
                type: 'PDF',
                storage_path: 'human-resources/module-0/0.6-phishing-prevention-reading.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Cybersecurity & Phishing Prevention',
                    subtitle: 'Safeguarding Beneficiary and Research Data',
                    points: [
                      'Always verify sender domains before opening email attachments.',
                      'Report suspicious emails immediately to security@ikaaiindia.org.',
                      'Ikaai IT will never ask for your password or SMS OTP via message.',
                      'Lock your device whenever stepping away from your workspace.'
                    ]
                  }
                ]
              },
              {
                id: 'res_0_7',
                title: '0.7 Your Email Signature',
                type: 'PDF',
                storage_path: 'human-resources/module-0/0.7-email-signature-guide.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Official Email Signature Standard',
                    subtitle: 'Brand Alignment & Transparency',
                    points: [
                      '[Full Name] | Human Resources Intern',
                      'Ikaai India Foundation – Unlocking Insights, Transforming Lives',
                      'Web: https://ikaaiindia.in | Email: [username]@ikaaiindia.org',
                      'Confidentiality Notice included in all external communication.'
                    ]
                  }
                ]
              },
              {
                id: 'res_0_8',
                title: '0.8 Employer Branding – Corporate Background Meeting Image',
                type: 'Image',
                storage_path: 'human-resources/module-0/0.8-employer-branding-background.png',
                fileExt: 'IMG',
                completed: true,
                slides: [
                  {
                    title: 'Virtual Meeting Background Assets',
                    subtitle: 'Professional Standards for Video Interviews',
                    points: [
                      'Use official high-resolution virtual backgrounds during Google Meet calls.',
                      'Ensure adequate lighting and an un-distracted quiet background.',
                      'Brand asset downloaded: Ikaai_Green_Minimalist_Background.png'
                    ]
                  }
                ]
              }
            ],
            quiz: {
              completed: true,
              score: 10,
              total: 10,
              questions: [
                {
                  id: 'q0_1',
                  question: 'What is the required deadline for submitting your Weekly Intern Progress Report (WPR)?',
                  options: [
                    'Every Monday morning before 10:00 AM IST',
                    'Every Friday by 6:00 PM IST',
                    'Bi-weekly on the 15th and 30th of the month',
                    'Whenever your module is completed'
                  ],
                  correctIndex: 1,
                  explanation: 'Weekly Progress Reports must be submitted every Friday by 6:00 PM IST to your designated HR Lead.'
                },
                {
                  id: 'q0_2',
                  question: 'What must you do if you receive an unexpected email requesting sensitive candidate data or login credentials?',
                  options: [
                    'Forward it immediately to security@ikaaiindia.org and do not click links',
                    'Reply with dummy data to test the sender',
                    'Click the unsubscribe button inside the email',
                    'Share your credentials only if the sender looks internal'
                  ],
                  correctIndex: 0,
                  explanation: 'Always treat unknown requests with caution and report them immediately to the security team without clicking links.'
                },
                {
                  id: 'q0_3',
                  question: 'What is the maximum turnaround time for responding to applicant inquiries at Ikaai?',
                  options: [
                    '24 hours',
                    '48 hours',
                    '7 business days',
                    '2 weeks'
                  ],
                  correctIndex: 1,
                  explanation: 'Ikaai standard operating procedure requires a response within 48 hours to maintain a professional candidate experience.'
                }
              ]
            },
            faqs: [
              {
                id: 'faq_0_1',
                q: "I applied for Branch X, but I've been assigned to Branch Y. Why?",
                a: "Branch assignments are optimized based on current project workload, regional language requirements for fieldwork, and team mentorship availability. If you have special location or timing constraints, you can discuss this with your coordinator during your welcome 1-on-1.",
                read: true
              },
              {
                id: 'faq_0_2',
                q: "When will I receive my official Ikaai email credentials?",
                a: "Official @ikaaiindia.org accounts are provisioned within 24 hours of onboarding paperwork completion. Check your alternate contact email for the temporary login link.",
                read: true
              },
              {
                id: 'faq_0_3',
                q: "How do I access internal Google Workspace drives and documents?",
                a: "Once your 2FA is activated, access the Ikaai Shared Drive through your Google Drive web interface. Folders are permission-scoped according to your department.",
                read: true
              },
              {
                id: 'faq_0_4',
                q: "Who do I contact if I face technical difficulties logging in?",
                a: "Message our portal administrator directly via the 'Message Instructor' sidebar menu or send an email to support@ikaaiindia.org.",
                read: true
              }
            ]
          },
          {
            id: 'mod_1',
            indexNumber: 1,
            title: '1. Company Overview & Culture',
            grade: 'A (100%)',
            quizTitle: 'Company Overview & Culture',
            objectives: [
              "Understand Ikaai's mission, values, and organizational structure.",
              "Understand the responsibilities of the Human Resources Department.",
              "Familiarise yourself with your role and performance expectations."
            ],
            resources: [
              {
                id: 'res_1_1',
                title: '1.1 Our Journey & Growth',
                type: 'PDF',
                storage_path: 'human-resources/module-1/1.1-our-journey-and-growth.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Our Journey & Growth',
                    subtitle: 'From Grassroots Research to Policy Impact',
                    points: [
                      'Ikaai India Foundation operates across multiple states with over 50+ research initiatives.',
                      'Core pillars: Evidence-based data collection, monitoring & evaluation, and livelihood research.',
                      'Supported major CSR initiatives and community development partnerships.'
                    ]
                  }
                ]
              },
              {
                id: 'res_1_2',
                title: '1.2 Organisation Chart',
                type: 'PDF',
                storage_path: 'human-resources/module-1/1.2-organisation-chart.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Ikaai Leadership & Hierarchy',
                    subtitle: 'Collaborative Governance Structure',
                    points: [
                      'Board of Trustees & Advisory Council',
                      'Executive Director & Program Directors',
                      'Research Leads & Regional M&E Coordinators',
                      'Recruitment & Talent Operations Team'
                    ]
                  }
                ]
              },
              {
                id: 'res_1_3',
                title: "1.3 Ikaai Foundation's Mission & Values",
                type: 'PDF',
                storage_path: 'human-resources/module-1/1.3-mission-and-values.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Mission & Guiding Principles',
                    subtitle: 'Unlocking Insights, Transforming Lives',
                    points: [
                      'Integrity: Ethical data collection without fabrication or bias.',
                      'Inclusivity: Amplifying voices of underserved rural and urban communities.',
                      'Excellence: Rigorous analytical standards in every report produced.'
                    ]
                  }
                ]
              },
              {
                id: 'res_1_4',
                title: '1.4 Research & Social Impact Framework',
                type: 'PDF',
                storage_path: 'human-resources/module-1/1.4-social-impact-framework.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Social Research Methodology',
                    subtitle: 'Mixed-Methods Approach',
                    points: [
                      'Baseline, Midline, and Endline studies for community development projects.',
                      'Participatory rural appraisals (PRA) and focus group discussions (FGD).',
                      'Statistically sound sampling and robust quality checks.'
                    ]
                  }
                ]
              },
              {
                id: 'res_1_5',
                title: '1.5 Code of Conduct & Ethics',
                type: 'Document',
                storage_path: 'human-resources/module-1/1.5-code-of-conduct-ethics.docx',
                fileExt: 'DOC',
                completed: true,
                slides: [
                  {
                    title: 'Code of Professional Conduct',
                    subtitle: 'Safety, Respect, and Zero Tolerance',
                    points: [
                      'Equal opportunity employer with strict anti-harassment protections.',
                      'Confidentiality regarding proprietary research methodologies and client agreements.',
                      'Conflict of interest disclosure requirements for all consultants and interns.'
                    ]
                  }
                ]
              },
              {
                id: 'res_1_6',
                title: '1.6 Community Engagement Principles',
                type: 'PDF',
                storage_path: 'human-resources/module-1/1.6-community-engagement-principles.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Fieldwork Protocol & Respect',
                    subtitle: 'Ethical Engagement Standards',
                    points: [
                      'Informed consent required before recording any interviews or photographs.',
                      'Cultural sensitivity and adherence to local community customs.',
                      'Ensuring respondent dignity and safeguarding personal identifiers.'
                    ]
                  }
                ]
              },
              {
                id: 'res_1_7',
                title: '1.7 Communication Norms & Slack Guide',
                type: 'Document',
                storage_path: 'human-resources/module-1/1.7-communication-norms-guide.docx',
                fileExt: 'DOC',
                completed: true,
                slides: [
                  {
                    title: 'Communication Channels',
                    subtitle: 'Where and How We Coordinate',
                    points: [
                      '#general for org-wide announcements.',
                      '#recruitment-ops for candidate pipelines and interview tracking.',
                      'Keep communications transparent, empathetic, and organized in threads.'
                    ]
                  }
                ]
              }
            ],
            quiz: {
              completed: true,
              score: 10,
              total: 10,
              questions: [
                {
                  id: 'q1_1',
                  question: "What is Ikaai India Foundation's core guiding motto?",
                  options: [
                    'Leading with Technology',
                    'Unlocking Insights, Transforming Lives',
                    'Scale at all Costs',
                    'Consulting Without Borders'
                  ],
                  correctIndex: 1,
                  explanation: "Ikaai's official slogan and mission statement is 'Unlocking Insights, Transforming Lives'."
                },
                {
                  id: 'q1_2',
                  question: 'What step is mandatory prior to recording any community interview or photographing respondents?',
                  options: [
                    'Offering monetary incentives',
                    'Obtaining verifiable informed consent',
                    'Sending a written letter 14 days in advance',
                    'Getting approval from local law enforcement'
                  ],
                  correctIndex: 1,
                  explanation: 'Informed consent is ethically and legally mandatory for all social research engagements.'
                }
              ]
            },
            faqs: [
              {
                id: 'faq_1_1',
                q: "How does the HR Department interact with field research teams?",
                a: "HR coordinates with project managers to understand language requirements, geographic deployment needs, and training prerequisites before recruiting field associates.",
                read: true
              },
              {
                id: 'faq_1_2',
                q: "What opportunities exist for high-performing interns after 3 months?",
                a: "Top performers are evaluated for Junior Associate positions, extended project fellowships, and receive personalized recommendation letters signed by our executive directors.",
                read: true
              }
            ]
          },
          {
            id: 'mod_2',
            indexNumber: 2,
            title: '2. Understanding Ikaai Roles',
            grade: 'A (100%)',
            quizTitle: 'Understanding Ikaai Roles Test',
            objectives: [
              'Understand the requirements of each Ikaai consulting and development role.',
              'Learn the distinct profiles of Field Researchers, Data Analysts, and Project Coordinators.',
              'Master candidate matching criteria based on project scope.'
            ],
            resources: [
              {
                id: 'res_2_1',
                title: '2.1 Roles & Requirements',
                type: 'PDF',
                storage_path: 'human-resources/module-2/2.1-roles-and-requirements.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Ikaai Consulting Roles Matrix',
                    subtitle: 'Competencies & Evaluation Rubrics',
                    points: [
                      'Research Associate: Qualitative survey design, field execution, FGD facilitation.',
                      'Data Analyst: Quantitative data cleaning (Python, R, SPSS), visualization.',
                      'Business Development: CSR grant drafting, stakeholder pitching, partnership agreements.'
                    ]
                  }
                ]
              },
              {
                id: 'res_2_2',
                title: '2.2 Field Research Associate Guidelines',
                type: 'PDF',
                storage_path: 'human-resources/module-2/2.2-field-research-guidelines.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Field Research Associate Profile',
                    subtitle: 'Key Responsibilities',
                    points: [
                      'Conducting household surveys using digital CAPI tools (KoboToolbox, ODK).',
                      'Ensuring zero survey fabrication with geo-tagged verification.',
                      'Drafting daily field diaries and qualitative notes.'
                    ]
                  }
                ]
              },
              {
                id: 'res_2_3',
                title: '2.3 Project Monitoring & Evaluation Specialist',
                type: 'PDF',
                storage_path: 'human-resources/module-2/2.3-monitoring-evaluation-specialist.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'M&E Specialist Core Competencies',
                    subtitle: 'Logframes and Indicator Tracking',
                    points: [
                      'Designing Theory of Change (ToC) and Results Frameworks.',
                      'Tracking KPIs against quarterly deliverables for donor reporting.'
                    ]
                  }
                ]
              }
            ],
            quiz: {
              completed: true,
              score: 10,
              total: 10,
              questions: [
                {
                  id: 'q2_1',
                  question: 'What digital CAPI tools are commonly used by Ikaai field researchers for survey collection?',
                  options: [
                    'KoboToolbox and ODK',
                    'Photoshop and Figma',
                    'WordPress and Drupal',
                    'Salesforce CRM only'
                  ],
                  correctIndex: 0,
                  explanation: 'KoboToolbox and Open Data Kit (ODK) are industry standards for verified, offline-capable mobile field surveys.'
                }
              ]
            },
            faqs: [
              {
                id: 'faq_2_1',
                q: "What should I do if a candidate asks me something I don't know the answer to?",
                a: "Never guess or invent policies. Politely inform the candidate: 'That is a great question. Let me verify the exact details with our Project Lead and get back to you by tomorrow.' Note the question in your interview tracker.",
                read: true
              }
            ]
          },
          {
            id: 'mod_3',
            indexNumber: 3,
            title: '3. Business Development & Partnerships',
            grade: 'No grade yet',
            quizTitle: 'Business Development Overview',
            objectives: [
              'Understand how Ikaai builds strategic partnerships with non-profits and CSR funders.',
              'Review email templates for prospective corporate partners.',
              'Learn the stages of research proposal development.'
            ],
            resources: [
              {
                id: 'res_3_1',
                title: '3.1 Job Description: B. Development Intern',
                type: 'PDF',
                storage_path: 'human-resources/module-3/3.1-jd-business-development-intern.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Job Description: BD Intern',
                    subtitle: 'Growth & Outreach Operations',
                    points: [
                      'Prospecting potential CSR sponsors and multilateral funding agencies.',
                      'Preparing initial credential decks and capability briefs.',
                      'Scheduling introduction calls with foundations and corporate donors.'
                    ]
                  }
                ]
              },
              {
                id: 'res_3_2',
                title: '3.2 Shortlisting Email B. Development Intern',
                type: 'Document',
                storage_path: 'human-resources/module-3/3.2-shortlisting-email-template.docx',
                fileExt: 'DOC',
                completed: true,
                slides: [
                  {
                    title: 'Shortlisting Communication Template',
                    subtitle: 'For Business Development Candidates',
                    points: [
                      'Acknowledge strong qualifications and pitch writing background.',
                      'Provide clear instructions for Round 2 case presentation.'
                    ]
                  }
                ]
              },
              {
                id: 'res_3_3',
                title: '3.3 Acceptance Email B. Development Intern',
                type: 'Document',
                storage_path: 'human-resources/module-3/3.3-acceptance-email-template.docx',
                fileExt: 'DOC',
                completed: true,
                slides: [
                  {
                    title: 'Offer Letter & Acceptance Template',
                    subtitle: 'Formal Offer Notification',
                    points: [
                      'Detailing program duration, deliverables, and team placement.',
                      'Specifying starting date and onboarding checklist link.'
                    ]
                  }
                ]
              },
              {
                id: 'res_3_4',
                title: '3.4 Follow-Up Email B. Development Intern',
                type: 'PDF',
                storage_path: 'human-resources/module-3/3.4-follow-up-email-template.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Candidate Follow-Up Protocols',
                    subtitle: 'Timely Engagement',
                    points: [
                      'Gentle reminder format for pending application materials.',
                      'Guidelines on maintaining enthusiasm and professional warmth.'
                    ]
                  }
                ]
              },
              {
                id: 'res_3_5',
                title: '3.5 Official LinkedIn Image Recruitment',
                type: 'PDF',
                storage_path: 'human-resources/module-3/3.5-linkedin-recruitment-asset.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'LinkedIn Recruitment Creative Guidelines',
                    subtitle: 'Brand Cohesion',
                    points: [
                      'Using approved Ikaai color palette and fonts.',
                      'Clear role badges and application call-to-action link.'
                    ]
                  }
                ]
              },
              {
                id: 'res_3_6',
                title: '3.6 Rejection Email Template B. Development Intern',
                type: 'PDF',
                storage_path: 'human-resources/module-3/3.6-rejection-email-template.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Empathetic Rejection Template',
                    subtitle: 'Preserving Brand Goodwill',
                    points: [
                      'Express genuine appreciation for the candidate’s time and effort.',
                      'Encourage future applications as new project openings emerge.'
                    ]
                  }
                ]
              }
            ],
            quiz: {
              completed: false,
              score: null,
              total: 5,
              questions: [
                {
                  id: 'q3_1',
                  question: 'What constitutes the foundation of an Ikaai CSR partnership proposal?',
                  options: [
                    'Demonstrating rigorous research metrics and verifiable community impact',
                    'Promising viral social media reach only',
                    'Guaranteeing financial returns to the non-profit',
                    'Selling generic software subscriptions'
                  ],
                  correctIndex: 0,
                  explanation: 'CSR funders require verifiable, evidence-based data and demonstrable social change metrics.'
                }
              ]
            },
            faqs: [
              {
                id: 'faq_3_1',
                q: "How are corporate partnerships initiated at Ikaai?",
                a: "Partnerships usually start through research needs-assessment calls with CSR heads, followed by a formal scoping proposal drafted by our development team.",
                read: true
              },
              {
                id: 'faq_3_2',
                q: "What role do interns play during partner calls?",
                a: "Interns take detailed minutes of the meeting, track agreed action items, and compile background research dossiers on prospective partners.",
                read: true
              }
            ]
          },
          {
            id: 'mod_4',
            indexNumber: 4,
            title: '4. Recruitment Intern & Talent Acquisition',
            grade: 'No grade yet',
            quizTitle: 'LinkedIn Job Posting Test',
            objectives: [
              'Master the complete candidate sourcing and screening lifecycle.',
              'Draft and publish compliant job advertisements on LinkedIn and university portals.',
              'Coordinate interviews and manage candidate tracking spreadsheets.'
            ],
            resources: [
              {
                id: 'res_4_1',
                title: '4.1 Step-by-Step Guide to Posting a Job Ad',
                type: 'PDF',
                storage_path: 'human-resources/module-4/4.1-guide-to-posting-job-ad.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Job Posting SOP',
                    subtitle: 'LinkedIn and College Placement Portals',
                    points: [
                      'Use approved title standards (e.g. "Research Intern - Social Impact").',
                      'Highlight key learning outcomes, mentorship, and certification.',
                      'Provide explicit deadline and application link.'
                    ]
                  }
                ]
              },
              {
                id: 'res_4_2',
                title: '4.2 Recruitment Workflow',
                type: 'PDF',
                storage_path: 'human-resources/module-4/4.2-recruitment-workflow.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Candidate Journey Stages',
                    subtitle: 'From Application to Onboarding',
                    points: [
                      'Stage 1: CV Screening against basic eligibility criteria.',
                      'Stage 2: Short 15-minute introductory screening call.',
                      'Stage 3: Task-based assignment evaluation.',
                      'Stage 4: Final Interview & Offer Letter issuance.'
                    ]
                  }
                ]
              }
            ],
            quiz: {
              completed: false,
              score: null,
              total: 5,
              questions: [
                {
                  id: 'q4_1',
                  question: 'What is the primary objective of the Stage 2 introductory screening call?',
                  options: [
                    'To assess communication skills, role alignment, and availability',
                    'To conduct a 2-hour technical programming examination',
                    'To negotiate executive compensation',
                    'To give an immediate unreviewed job offer'
                  ],
                  correctIndex: 0,
                  explanation: 'Introductory screening evaluates candidate motivation, basic communication skills, and scheduling availability.'
                }
              ]
            },
            faqs: [
              {
                id: 'faq_4_1',
                q: 'What happens if I am not able to make a job post on time?',
                a: 'Immediately notify your HR Coordinator in the #recruitment-ops channel. Another team member can step in with backup posting credentials to ensure posting schedules are met.',
                read: true
              }
            ]
          },
          {
            id: 'mod_5',
            indexNumber: 5,
            title: '5. Project Manager & Strategic Advisor',
            grade: 'No grade yet',
            quizTitle: 'Project Management Foundations',
            objectives: [
              'Understand the deliverables and sprint tracking for multi-month field studies.',
              'Coordinate between data collectors, quality auditors, and senior analysts.',
              'Implement risk mitigation for field research delays.'
            ],
            resources: [
              {
                id: 'res_5_1',
                title: '5.1 Job Description: Project Manager',
                type: 'PDF',
                storage_path: 'human-resources/module-5/5.1-jd-project-manager.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Role: Project Manager',
                    subtitle: 'Field Operations & Timeline Accountability',
                    points: [
                      'Overseeing regional surveyor logistics, travel, and daily quotas.',
                      'Ensuring data sync to centralized cloud servers without loss.',
                      'Maintaining client milestone schedules and deliverables.'
                    ]
                  }
                ]
              },
              {
                id: 'res_5_2',
                title: '5.2 Job Description: Strategic Advisor',
                type: 'PDF',
                storage_path: 'human-resources/module-5/5.2-jd-strategic-advisor.pdf',
                fileExt: 'PDF',
                completed: true,
                slides: [
                  {
                    title: 'Role: Strategic Advisor',
                    subtitle: 'Policy Insights & Actionable Recommendations',
                    points: [
                      'Translating raw statistical outputs into policy whitepapers.',
                      'Presenting recommendations to government departments and NGO boards.'
                    ]
                  }
                ]
              }
            ],
            quiz: {
              completed: false,
              score: null,
              total: 5,
              questions: [
                {
                  id: 'q5_1',
                  question: 'What is the foremost priority for an Ikaai Project Manager when unexpected rain disrupts field surveys?',
                  options: [
                    'Ensure surveyor safety, trigger contingency buffer days, and notify stakeholders',
                    'Demand surveyors continue in hazardous conditions',
                    'Fabricate missing questionnaire responses to keep the timeline',
                    'Abandon the project without notice'
                  ],
                  correctIndex: 0,
                  explanation: 'Safety is the paramount priority, followed by disciplined timeline contingency management.'
                }
              ]
            },
            faqs: [
              {
                id: 'faq_5_1',
                q: 'How frequently do Project Managers meet with intern coordinators?',
                a: 'Weekly standup meetings happen on Tuesdays at 11:00 AM IST to review pipeline progress, workload balance, and feedback.',
                read: true
              }
            ]
          }
        ],
        exam: {
          submitted: false,
          submittedDate: null,
          answers: {},
          questions: [
            {
              id: 'exam_q1',
              title: '1. Ikaai Mission & Social Impact Philosophy',
              prompt: 'Explain how Ikaai India Foundation differentiates its social research approach from conventional commercial market research. Mention at least three core principles discussed in your onboarding modules.',
              placeholder: 'Type your explanation here (minimum 100 words)...'
            },
            {
              id: 'exam_q2',
              title: '2. Ethical Recruitment & Bias Mitigation Scenario',
              prompt: 'Suppose a candidate applying for a Field Research Associate role lacks formal academic credentials but demonstrates extensive grassroots community organizing experience and fluency in regional dialects. How would you evaluate their profile according to Ikaai recruitment guidelines?',
              placeholder: 'Outline your evaluation methodology and decision rationale...'
            },
            {
              id: 'exam_q3',
              title: '3. Data Security & Confidentiality Protocols',
              prompt: 'A partner organization requests an un-anonymized spreadsheet of rural survey respondents including contact details. How do you respond based on Ikaai data protection policies and ethics charters?',
              placeholder: 'Draft your proposed response and the compliance protocols you would reference...'
            }
          ]
        },
        chatRoom: {
          title: 'Human Resources',
          instructors: 'Devashish Chauhan, Neha Singhal, Gehna Sahni',
          messages: []
        },
        feedbackList: []
      },
      data: {
        "id": "data",
        "title": "Data Analyst",
        "roleTag": "Data Analytics",
        "description": "As a Data Analyst at Ikaai India, you will transform raw social development datasets into high-fidelity statistical evidence, interactive dashboards, and decision-support intelligence for ministries, UN agencies, and CSR foundations.",
        "modules": [
          {
            "id": "data_mod_0",
            "indexNumber": 0,
            "title": "0. Analytics Toolstack & Data Governance",
            "grade": "A (95%)",
            "quizTitle": "Analytics Infrastructure & Data Protocols",
            "objectives": [
              "Set up your secure analytical environment: Python 3.x, Jupyter Notebooks, Git repository access, and Power BI Desktop.",
              "Master Ikaai's Data Governance & PII Protection Guidelines complying with the Digital Personal Data Protection (DPDP) Act 2023.",
              "Learn the standardized file directory hierarchy, naming conventions, and data dictionary documentation practices.",
              "Configure automated cloud backups on Ikaai's encrypted Google Workspace & Azure data storage."
            ],
            "resources": [
              {
                "id": "data_res_0_1",
                "title": "0.1 Data Analyst Setup & Environment Guide",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "Analytics Environment Configuration",
                    "subtitle": "Toolchain Standards & Reproducibility",
                    "bullets": [
                      "Official Ikaai standard Python distribution: Anaconda 2024 or standalone Python 3.11+ with virtual environments.",
                      "Mandatory analytical libraries: pandas, numpy, scipy, statsmodels, matplotlib, seaborn, openpyxl.",
                      "Version control: All data pipelines and cleaning notebooks must be committed to git with structured commit messages.",
                      "Local database connections: Setting up PostgreSQL and SQLite drivers for micro-survey caching."
                    ],
                    "takeaway": "Never work in the base Python environment; always initialize a project-specific virtualenv or conda environment."
                  },
                  {
                    "title": "Data Security & Anonymization",
                    "subtitle": "Strict Compliance with DPDP Act 2023",
                    "bullets": [
                      "Personally Identifiable Information (PII) including Aadhaar, phone numbers, and respondent names must be separated into secure keyfiles.",
                      "Generate anonymized Respondent IDs (RID) prior to feeding datasets to statistical models or visualization engines.",
                      "Never upload raw survey microdata containing GPS coordinates to unvetted cloud tools or public LLMs.",
                      "Encrypted storage: At-rest AES-256 encryption required for all primary evaluation datasets."
                    ],
                    "takeaway": "Data ethics is the foundation of evidence-based policy research; protect respondent identity at all costs."
                  }
                ]
              },
              {
                "id": "data_res_0_2",
                "title": "0.2 Ikaai Data Dictionary & Schema Template",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Structuring Analytical Data Dictionaries",
                    "subtitle": "Standard Variable Nomenclature",
                    "bullets": [
                      "Variable naming format: snake_case prefix denoting module (e.g., hh_income, edu_highest_grade, agri_land_acres).",
                      "Explicit coding of missing values: -99 (Refused to answer), -98 (Don't know), -97 (Not applicable).",
                      "Value labels: Every categorical integer must map to an explicit label in the accompanying metadata table.",
                      "Audit trail: Maintain a changelog recording raw input version, cleaning operations applied, and output hash."
                    ],
                    "takeaway": "Clean code is useless without a comprehensive data dictionary; if it is not documented, it cannot be audited."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "dq_0_1",
                  "question": "Under Ikaai's data security guidelines, what must be done with direct respondent PII (phone number, name, GPS)?",
                  "options": [
                    "Keep them in the main analysis sheet for easy follow-ups",
                    "Isolate them into an encrypted mapping file and use anonymized Respondent IDs (RID) in working datasets",
                    "Delete them immediately without generating any unique identifier",
                    "Share them with external visualization contractors via Google Drive"
                  ],
                  "correctIndex": 1,
                  "explanation": "PII must always be decoupled from survey responses and stored in an encrypted key file, with working data referencing only pseudo-anonymized IDs."
                }
              ]
            },
            "faqs": [
              {
                "id": "dfaq_0_1",
                "q": "Which Python environment management tool is officially approved?",
                "a": "Both venv (Python native) and conda are approved. Always keep an updated requirements.txt or environment.yml at the root of your project directory.",
                "read": true
              }
            ]
          },
          {
            "id": "data_mod_1",
            "indexNumber": 1,
            "title": "1. Data Cleaning & Validation with Python & Excel",
            "grade": "A (100%)",
            "quizTitle": "Data Wrangling & Pipeline Automation",
            "objectives": [
              "Master automated pipeline development using Pandas, NumPy, and OpenPyXL for large-scale field survey ingests.",
              "Implement robust outlier detection algorithms: Interquartile Range (IQR), Z-Score, and Mahalanobis distance.",
              "Handle duplicate records, irregular timestamp formatting, string normalizations, and multi-select binary splitting.",
              "Build automated reconciliation scripts between CAPI cloud servers and local clean working tables."
            ],
            "resources": [
              {
                "id": "data_res_1_1",
                "title": "1.1 The Comprehensive Data Cleaning SOP",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Systematic Data Cleaning Workflow",
                    "subtitle": "From Raw Ingestion to Analytical Readiness",
                    "bullets": [
                      "Phase 1: Ingestion audit - confirm record counts against field supervisor dispatch logs.",
                      "Phase 2: Structural reshaping - unpivoting roster items, standardizing datetime objects to ISO-8601.",
                      "Phase 3: Range & logic verification - bounds checking on continuous variables.",
                      "Phase 4: Categorical harmonisation - fuzzy matching and regex standardisation of district/block spellings."
                    ],
                    "takeaway": "Never alter the original raw survey data directly; all transformations must be reproducible through non-destructive Python scripts."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "dq_1_1",
                  "question": "Why does Ikaai strictly mandate non-destructive data cleaning pipelines?",
                  "options": [
                    "Because raw files are too large to store on Google Drive",
                    "To ensure complete auditability, reproducibility, and legal verification of research findings",
                    "Because Python cannot modify Excel files in place",
                    "To prevent field enumerators from seeing survey results"
                  ],
                  "correctIndex": 1,
                  "explanation": "Non-destructive scripts preserve the pristine raw data state so any external auditor, donor, or evaluation committee can reproduce the exact steps taken."
                }
              ]
            },
            "faqs": [
              {
                "id": "dfaq_1_1",
                "q": "What should I do when an outlier is legitimate (e.g. an ultra-high earner)?",
                "a": "Flag the observation with an audit column is_outlier_confirmed = True and document the verification with the field team before applying winsorization or median trimming.",
                "read": true
              }
            ]
          },
          {
            "id": "data_mod_2",
            "indexNumber": 2,
            "title": "2. Statistical Modeling & Survey Analytics (SPSS/R)",
            "grade": "A (100%)",
            "quizTitle": "Inferential Statistics & Econometric Analysis",
            "objectives": [
              "Calculate complex sampling weights, stratification adjustments, and cluster design effects in R and SPSS.",
              "Execute Difference-in-Differences (DiD), Propensity Score Matching (PSM), and regression discontinuity designs.",
              "Perform hypothesis testing (Chi-square, Mann-Whitney U, ANOVA, multivariate linear/logistic regressions).",
              "Generate publication-quality regression tables with robust standard errors clustered at district/village levels."
            ],
            "resources": [
              {
                "id": "data_res_2_1",
                "title": "2.1 Econometric Evaluation Methodology Guide",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Quasi-Experimental Impact Evaluation",
                    "subtitle": "Counterfactual Construction & Selection Bias",
                    "bullets": [
                      "Difference-in-Differences (DiD): Measuring the differential effect of a treatment versus control group over time.",
                      "Parallel trends assumption: Validating that treatment and control groups trended identically prior to intervention.",
                      "Propensity Score Matching (PSM): Balancing observable baseline covariates between treatment and control households.",
                      "Cluster-robust standard errors: Essential when respondents are sampled in village or school clusters."
                    ],
                    "takeaway": "Correlation is never causation; social research requires rigorous identification strategies to prove developmental impact."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "dq_2_1",
                  "question": "Why must standard errors be clustered at the village/block level in community survey evaluations?",
                  "options": [
                    "Because individuals within the same village share unobserved common characteristics and economic conditions",
                    "To reduce computation time in statistical software",
                    "Because it automatically doubles the sample size",
                    "To make p-values artificially smaller"
                  ],
                  "correctIndex": 0,
                  "explanation": "Cluster-robust standard errors correct for intra-cluster correlation among respondents in the same community, preventing false-positive statistical significance."
                }
              ]
            },
            "faqs": [
              {
                "id": "dfaq_2_1",
                "q": "Should I use R or SPSS for regression analysis at Ikaai?",
                "a": "Both are supported. R is preferred for automated reproducible pipeline scripts and complex matching, while SPSS is widely used for client deliverables requiring traditional syntax scripts.",
                "read": true
              }
            ]
          },
          {
            "id": "data_mod_3",
            "indexNumber": 3,
            "title": "3. Power BI & Interactive Dashboard Engineering",
            "grade": "A (90%)",
            "quizTitle": "Business Intelligence & Executive Dashboards",
            "objectives": [
              "Architect star-schema data models in Power BI with optimized relationship cardinalities and DAX measures.",
              "Design accessible, interactive visual interfaces adhering to Ikaai's institutional color palette and UI guidelines.",
              "Implement Row-Level Security (RLS) ensuring state/district officials view only their jurisdictions.",
              "Publish and maintain automated incremental refreshes via Power BI Gateway and cloud REST APIs."
            ],
            "resources": [
              {
                "id": "data_res_3_1",
                "title": "3.1 Power BI Architecture for Development Sector",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "Data Modeling Best Practices",
                    "subtitle": "Star Schemas Over Flat Tables",
                    "bullets": [
                      "Separate central fact tables (survey responses, test scores) from dimension tables (geography, demographics, calendar).",
                      "Never create bi-directional cross-filtering unless strictly required for specific disconnected slicers.",
                      "Use explicit DAX measures instead of implicit summarizations.",
                      "Optimize memory consumption by removing unnecessary high-cardinality text columns."
                    ],
                    "takeaway": "A clean dimensional model makes reports run 10x faster and prevents subtle aggregation bugs."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "dq_3_1",
                  "question": "In Power BI data modeling for social research, which schema pattern is strongly recommended by Ikaai?",
                  "options": [
                    "Single flat denormalized table with 300 columns",
                    "Star schema with centralized fact tables and linked dimension tables",
                    "Cyclic relationship graph with bi-directional cross filtering",
                    "Unlinked tables with separate disconnected visual filters"
                  ],
                  "correctIndex": 1,
                  "explanation": "Star schemas provide optimal DAX query performance, unambiguous relationship propagation, and clear analytical boundaries."
                }
              ]
            },
            "faqs": [
              {
                "id": "dfaq_3_1",
                "q": "Where can I find Ikaai's official Power BI color theme JSON?",
                "a": "The .json theme file with Ikaai's exact Emerald and Mint hex values is available in the shared Google Drive under Assets/Branding/PowerBI/Ikaai_Theme.json.",
                "read": true
              }
            ]
          },
          {
            "id": "data_mod_4",
            "indexNumber": 4,
            "title": "4. Field Survey Data Processing & Quality Audits",
            "grade": "A (100%)",
            "quizTitle": "High-Frequency Field Checks & Enumerator Audits",
            "objectives": [
              "Build daily High-Frequency Check (HFC) algorithms detecting enumerator fraud, speed-running, and digit preference.",
              "Calculate GPS proximity clusters and interview duration distributions across field teams.",
              "Conduct automated back-check comparisons between primary surveys and quality auditor re-interviews.",
              "Deliver daily field correction logs to survey managers and project leads."
            ],
            "resources": [
              {
                "id": "data_res_4_1",
                "title": "4.1 High-Frequency Check (HFC) Protocol",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Detecting Field Anomalies in Real Time",
                    "subtitle": "Daily Quality Control Routines",
                    "bullets": [
                      "Survey duration distribution: Flagging surveys completed in under 40% of the median pilot duration.",
                      "Digit preference analysis: Measuring heaping on round numbers (e.g., ages ending in 0 or 5).",
                      "Enumerator productivity outliers: Identifying surveyors completing an unfeasible number of daily submissions.",
                      "Variable non-response rates: Detecting enumerators who systematically select 'No' to skip detailed rosters."
                    ],
                    "takeaway": "Catching field errors within 24 hours saves weeks of expensive re-surveying costs."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "dq_4_1",
                  "question": "What does a high concentration of answers at round numbers (e.g., age 30, 40, 50) indicate in field audits?",
                  "options": [
                    "Flawless representative sampling",
                    "Digit preference (heaping) error indicating rough estimation rather than verified inquiry",
                    "Surveyor speed bonus qualification",
                    "Correct application of sampling weights"
                  ],
                  "correctIndex": 1,
                  "explanation": "Digit heaping is a classic diagnostic of enumerators estimating answers instead of checking documents or probing respondents thoroughly."
                }
              ]
            },
            "faqs": [
              {
                "id": "dfaq_4_1",
                "q": "How frequently are HFC reports run during live data collection?",
                "a": "HFCs are scheduled every evening at 8:00 PM IST following the daily server sync, with flags sent to Field Supervisors before 8:30 AM the next morning.",
                "read": true
              }
            ]
          },
          {
            "id": "data_mod_5",
            "indexNumber": 5,
            "title": "5. Executive Reporting & Visual Insights Delivery",
            "grade": "A (95%)",
            "quizTitle": "Analytical Storytelling & Policy Translation",
            "objectives": [
              "Translate complex multivariate regression coefficients into plain-language executive summaries for government stakeholders.",
              "Create publication-ready charts following Edward Tufte and Stephen Few data visualization design principles.",
              "Structure technical appendixes detailing sample sizes, attrition rates, power calculations, and sensitivity tests.",
              "Present analytical findings in client walkthroughs and policy dissemination workshops."
            ],
            "resources": [
              {
                "id": "data_res_5_1",
                "title": "5.1 Visual Data Storytelling for Public Policy",
                "type": "Presentation",
                "fileExt": "PPT",
                "completed": true,
                "slides": [
                  {
                    "title": "Effective Public Sector Data Presentation",
                    "subtitle": "Insight Over Complexity",
                    "bullets": [
                      "Eliminate chart junk: remove heavy background grids, 3D effects, and redundant legend labels.",
                      "Direct labeling: place data labels adjacent to line ends rather than relying on distant color legends.",
                      "Highlight with brand emerald: use muted grays for contextual series and Ikaai green for the key focus finding.",
                      "Always state the 'So What?': every chart title must be a conclusion statement, not just a description."
                    ],
                    "takeaway": "Policymakers have seconds to absorb your findings; clarity and visual hierarchy are paramount."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "dq_5_1",
                  "question": "What is the best practice for chart titles in Ikaai executive reports?",
                  "options": [
                    "Vague academic names like 'Figure 4: Chart of Data'",
                    "Action-oriented insight statements (e.g. 'Student Learning Outcomes Rose 18% in Intervened Schools')",
                    "A list of software packages used",
                    "The raw Python command used to plot it"
                  ],
                  "correctIndex": 1,
                  "explanation": "Insight-led titles allow decision-makers to immediately understand the core finding without parsing complex technical legends."
                }
              ]
            },
            "faqs": [
              {
                "id": "dfaq_5_1",
                "q": "Where do I submit my final analytical report draft for peer review?",
                "a": "Upload your draft and reproducible code repository to the project drive folder under 04_Draft_Reports and notify your Lead Data Scientist on Slack/Chat.",
                "read": true
              }
            ]
          }
        ],
        "exam": {
          "submitted": false,
          "submittedDate": null,
          "answers": {},
          "questions": [
            {
              "id": "data_exam_q1",
              "title": "1. Data Pipeline Architecture & Anonymization",
              "prompt": "Outline step-by-step how you would ingest 50,000 raw household survey records from KoboToolbox, execute deduplication, handle missing value imputation, decouple PII, and export an analytical dataset adhering to the DPDP Act 2023.",
              "placeholder": "Detail your data pipeline architecture, data structures, and compliance checkpoints...",
              "rubric": "Evaluates understanding of reproducible data wrangling, data hygiene, and privacy compliance."
            },
            {
              "id": "data_exam_q2",
              "title": "2. High-Frequency Quality Checks & Fraud Diagnostics",
              "prompt": "Describe four statistical indicators you would monitor on a daily basis to identify enumerator fabrication, speed-running, or systematic skip-pattern exploitation during field data collection.",
              "placeholder": "Explain your diagnostics, threshold criteria, and operational escalation protocol...",
              "rubric": "Evaluates quality control rigor and practical field monitoring capabilities."
            },
            {
              "id": "data_exam_q3",
              "title": "3. Power BI Executive Dashboard Conceptualization",
              "prompt": "A state education department requires an interactive monitoring dashboard tracking foundational literacy and numeracy across 30 districts. Propose the star-schema data model, key DAX metrics, visual hierarchy, and Row-Level Security (RLS) implementation.",
              "placeholder": "Detail fact/dimension tables, DAX measures, visual components, and access controls...",
              "rubric": "Evaluates business intelligence, UX design for government users, and data modeling competency."
            }
          ]
        },
        "chatRoom": {
          "title": "Data Analytics Cohort",
          "instructors": "Pooja Sharma (Lead Data Scientist), Dr. Vikram Rao",
          "messages": [
            {
              "id": "dmsg_1",
              "sender": "instructor",
              "author": "Pooja Sharma",
              "time": "Yesterday at 11:15 AM",
              "text": "Welcome to the Ikaai Data Analytics Cohort! Please ensure your Python virtual environment and Power BI Desktop installations are completed before tomorrow's pipeline review."
            },
            {
              "id": "dmsg_2",
              "sender": "user",
              "author": "Sudhir Kumar",
              "time": "Yesterday at 12:30 PM",
              "text": "Thank you Pooja ma'am! I have configured Python 3.11 with the required analytical libraries and cloned the repository."
            }
          ]
        },
        "feedbackList": []
      },
      research: {
        "id": "research",
        "title": "Social Research & Policy",
        "roleTag": "Social Research",
        "description": "As a Social Researcher at Ikaai India, you will lead evidence-based public policy research, baseline/endline evaluations, and impact assessments for government ministries, multilateral agencies, and CSR foundations across India.",
        "modules": [
          {
            "id": "res_mod_0",
            "indexNumber": 0,
            "title": "0. Research Ethics, Protocols & Ikaai Methodology",
            "grade": "A (90%)",
            "quizTitle": "Institutional Review Board & Ethics Protocols",
            "objectives": [
              "Internalize Ikaai's ethical research standards: informed consent, voluntary participation, and non-maleficence.",
              "Master child protection and vulnerable population safeguarding protocols during field surveys.",
              "Understand Ikaai's mixed-methods research framework integrating quantitative rigor with qualitative depth.",
              "Learn the lifecycle of a public policy evaluation: from inception and CAPI scripting to final dissemination."
            ],
            "resources": [
              {
                "id": "res_res_0_1",
                "title": "0.1 Ikaai Research Ethics & Safeguarding Manual",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Informed Consent & Dignity in Fieldwork",
                    "subtitle": "Institutional Ethical Obligations",
                    "bullets": [
                      "Informed consent must be recorded orally or in writing in the respondent's native regional dialect.",
                      "Respondents must be explicitly notified of their right to pause, skip questions, or terminate interviews at any stage.",
                      "Special protections for minor respondents: parental assent plus child affirmative assent required.",
                      "Confidentiality agreements: all field enumerators must execute non-disclosure agreements prior to deployment."
                    ],
                    "takeaway": "Ethical integrity is non-negotiable; research must empower communities rather than extract from them."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "rq_0_1",
                  "question": "When conducting field interviews with children under 18 years, what dual requirement must be satisfied?",
                  "options": [
                    "No consent required if school principal approves",
                    "Parental/guardian written or verbal consent PLUS affirmative child assent",
                    "Only child consent if they can read the questionnaire",
                    "Financial compensation to the village head"
                  ],
                  "correctIndex": 1,
                  "explanation": "Ethical research mandates obtaining legal guardian consent alongside direct affirmative assent from the minor respondent."
                }
              ]
            },
            "faqs": [
              {
                "id": "rfaq_0_1",
                "q": "What should an enumerator do if a respondent shows signs of distress?",
                "a": "Immediately pause the interview, offer support, respect their choice to terminate without consequence, and provide contact details for local healthcare/counseling services if applicable.",
                "read": true
              }
            ]
          },
          {
            "id": "res_mod_1",
            "indexNumber": 1,
            "title": "1. Quantitative & Qualitative Sample Design",
            "grade": "A (100%)",
            "quizTitle": "Sampling Theory & Power Calculations",
            "objectives": [
              "Determine required sample sizes using statistical power calculations (Optimal Design, G*Power, Stata).",
              "Design multi-stage stratified cluster sampling plans aligned with Census 2011 and NFHS-5 primary sampling units.",
              "Establish systematic random sampling protocols for household selection (Right-Hand Rule, interval k).",
              "Construct purposive and snowball sampling matrices for Key Informant Interviews (KII) and Focus Groups (FGD)."
            ],
            "resources": [
              {
                "id": "res_res_1_1",
                "title": "1.1 Sample Design & Statistical Power Handbook",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "Multi-Stage Sampling Architecture",
                    "subtitle": "Representativeness & Minimum Detectable Effect Size",
                    "bullets": [
                      "Primary Sampling Units (PSUs): selection of blocks/villages using Probability Proportional to Size (PPS).",
                      "Secondary Sampling Units (SSUs): household listing and systematic interval selection.",
                      "Intra-cluster correlation coefficient (ICC): inflating sample size based on expected clustering effects.",
                      "Non-response buffer: incorporating a standard 8-10% replacement/over-sampling allowance."
                    ],
                    "takeaway": "Flawed sampling ruins even the most sophisticated statistical models; ensure design rigor before field launch."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "rq_1_1",
                  "question": "What is the primary rationale for using Probability Proportional to Size (PPS) when selecting sample villages?",
                  "options": [
                    "It ensures all villages have an equal probability of selection regardless of population",
                    "It gives larger villages a proportionately higher chance of selection, ensuring equal probability of selection for individuals across the entire population",
                    "It eliminates the need for household listings",
                    "It reduces survey translation costs"
                  ],
                  "correctIndex": 1,
                  "explanation": "PPS sampling balances selection probabilities so that when combined with a fixed number of household interviews per cluster, every citizen has an equal chance of being sampled."
                }
              ]
            },
            "faqs": [
              {
                "id": "rfaq_1_1",
                "q": "What is the minimum recommended power for social impact assessments at Ikaai?",
                "a": "Ikaai standardizes on a statistical power of 0.80 (80%) with a significance level of alpha = 0.05 for detecting minimum policy-relevant effect sizes.",
                "read": true
              }
            ]
          },
          {
            "id": "res_mod_2",
            "indexNumber": 2,
            "title": "2. Designing CAPI Tools & Survey Instruments (Kobo/CSPro)",
            "grade": "A (95%)",
            "quizTitle": "Survey Instrument Architecture & Logic Constraints",
            "objectives": [
              "Script complex XLSForm surveys deployed on KoboToolbox and ODK Collect.",
              "Program dynamic skip logic, relevance expressions, repeat rosters, and mathematical regex constraints.",
              "Implement audit metadata tracking: start/end timestamps, question-level timing, and background audio auditing.",
              "Pilot and pre-test instruments in the field to eliminate ambiguous phrasing, cognitive fatigue, and leading questions."
            ],
            "resources": [
              {
                "id": "res_res_2_1",
                "title": "2.1 Advanced XLSForm Programming Guide",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Rigorous CAPI Scripting Standards",
                    "subtitle": "Building Error-Proof Digital Questionnaires",
                    "bullets": [
                      "Use strict regex validation: phone numbers must adhere to ^[6-9][0-9]{9}$.",
                      "Implement soft vs hard constraint warnings for improbable but possible outliers.",
                      "Design intuitive enumerator hints and instructions in regional languages alongside English.",
                      "Test all survey skip branches against edge-case household structures before locking the form version."
                    ],
                    "takeaway": "Every error caught in the survey script saves hundreds of field hours and prevents missing data."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "rq_2_1",
                  "question": "In XLSForm syntax, what expression ensures that a child education question only triggers if the household member is aged between 6 and 18?",
                  "options": [
                    "relevant: ${age} >= 6 and ${age} <= 18",
                    "constraint: ${age} == 6-18",
                    "calculation: ${age} in (6, 18)",
                    "appearance: child_filter"
                  ],
                  "correctIndex": 0,
                  "explanation": "The 'relevant' column controls conditional display; ${age} >= 6 and ${age} <= 18 ensures the roster item renders only for school-aged members."
                }
              ]
            },
            "faqs": [
              {
                "id": "rfaq_2_1",
                "q": "Can I edit an active survey form during live data collection?",
                "a": "Never deploy destructive schema edits on live forms. If an update is necessary, create a versioned release (v1.1) and coordinate with the Data Team to handle column migration.",
                "read": true
              }
            ]
          },
          {
            "id": "res_mod_3",
            "indexNumber": 3,
            "title": "3. Field Team Management & High-Frequency Data Audits",
            "grade": "A (100%)",
            "quizTitle": "Field Operations & Quality Assurance",
            "objectives": [
              "Lead field surveyor training bootcamps: mock interviews, roleplays, and digital tablet troubleshooting.",
              "Establish operational hierarchy: Lead Researcher -> State Coordinator -> Field Supervisors -> Enumerators.",
              "Execute independent back-checks (re-interviewing 5-10% of households) and reconcile discrepancy rates.",
              "Manage field logistics, transport coordination, community liaison, and local administrative permissions."
            ],
            "resources": [
              {
                "id": "res_res_3_1",
                "title": "3.1 Field Team Operations & Supervision SOP",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "Field Supervision Protocols",
                    "subtitle": "Maintaining Rigorous Data Quality in the Field",
                    "bullets": [
                      "Supervisor accompaniment: supervisors must directly observe at least 2 full interviews per surveyor daily.",
                      "Spot checks: unplanned visits to verify that household visits actually occurred at registered GPS coordinates.",
                      "Daily debrief meetings: mandatory evening team reviews to resolve terminology questions and logistical blockers.",
                      "Zero tolerance for fabrication: automated fraud flags result in immediate audit and disciplinary review."
                    ],
                    "takeaway": "Strong supervisory presence in the field directly correlates with zero-error survey deliverables."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "rq_3_1",
                  "question": "What is the standard proportion of sample households designated for independent back-check audits?",
                  "options": [
                    "0%",
                    "5% to 10%",
                    "50%",
                    "100%"
                  ],
                  "correctIndex": 1,
                  "explanation": "Ikaai mandates independent back-check audits on 5% to 10% of all surveyed households to statistically benchmark enumerator reliability."
                }
              ]
            },
            "faqs": [
              {
                "id": "rfaq_3_1",
                "q": "How are surveyor travel allowances and field stipends disbursed?",
                "a": "Travel advances are disbursed weekly via direct bank transfer upon supervisor verification of signed vehicle logs and fuel receipts.",
                "read": true
              }
            ]
          },
          {
            "id": "res_mod_4",
            "indexNumber": 4,
            "title": "4. Qualitative Synthesis & NVivo Thematic Coding",
            "grade": "A (90%)",
            "quizTitle": "Qualitative Rigor & Thematic Analysis",
            "objectives": [
              "Conduct semi-structured Key Informant Interviews (KII) and Focus Group Discussions (FGD).",
              "Develop inductive and deductive qualitative codebooks in NVivo and ATLAS.ti.",
              "Establish inter-coder reliability (Cohen's Kappa >= 0.80) across research analysts.",
              "Extract grounded narrative themes, verbatim quotes, and community journey maps."
            ],
            "resources": [
              {
                "id": "res_res_4_1",
                "title": "4.1 Qualitative Research Framework & Coding Guide",
                "type": "Presentation",
                "fileExt": "PPT",
                "completed": true,
                "slides": [
                  {
                    "title": "Rigorous Qualitative Synthesis",
                    "subtitle": "Moving Beyond Anecdotes to Systematic Evidence",
                    "bullets": [
                      "Verbatim transcription: transcribing audio recordings in local dialects with accurate translation checks.",
                      "Two-cycle coding: initial open descriptive coding followed by focused thematic pattern categorization.",
                      "Triangulation: systematically cross-verifying qualitative community narratives against quantitative survey findings.",
                      "Reflexivity: researchers must explicitly document and mitigate their own unconscious biases and social positionality."
                    ],
                    "takeaway": "Qualitative research explains the 'Why' behind the quantitative 'What'; both are essential for holistic policy impact."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "rq_4_1",
                  "question": "What metric is used by Ikaai research teams to benchmark inter-coder reliability in qualitative coding?",
                  "options": [
                    "Number of pages typed per hour",
                    "Cohen's Kappa statistic (target >= 0.80)",
                    "Word count of the interview transcript",
                    "Total number of codes created"
                  ],
                  "correctIndex": 1,
                  "explanation": "Cohen's Kappa measures statistical agreement between multiple independent coders, accounting for agreement occurring by chance."
                }
              ]
            },
            "faqs": [
              {
                "id": "rfaq_4_1",
                "q": "Can audio recordings of FGDs be shared externally?",
                "a": "No. Raw audio recordings contain identifying voice data and are confidential; only anonymized transcripts may be referenced in deliverables.",
                "read": true
              }
            ]
          },
          {
            "id": "res_mod_5",
            "indexNumber": 5,
            "title": "5. Drafting Policy Briefs & Evaluation Reports",
            "grade": "A (100%)",
            "quizTitle": "Policy Translation & High-Impact Dissemination",
            "objectives": [
              "Structure comprehensive evaluation reports aligned with NITI Aayog and OECD-DAC evaluation criteria.",
              "Draft concise 2-4 page executive policy briefs for senior bureaucrats and foundation trustees.",
              "Synthesize actionable, prioritized recommendations tied to institutional budgets and policy levers.",
              "Prepare policy dissemination slide decks and facilitate high-level stakeholder workshops."
            ],
            "resources": [
              {
                "id": "res_res_5_1",
                "title": "5.1 Writing Policy Briefs That Drive Action",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "OECD-DAC Evaluation Criteria",
                    "subtitle": "Global Standards for Development Effectiveness",
                    "bullets": [
                      "Relevance: Is the intervention doing the right things aligned with community priorities?",
                      "Coherence: How well does the policy fit with other government welfare schemes?",
                      "Effectiveness: Has the intervention achieved its primary objectives and milestones?",
                      "Efficiency: Are financial and human resources being converted into outputs cost-effectively?",
                      "Impact: What higher-level significant positive/negative changes have occurred?",
                      "Sustainability: Will the developmental benefits continue after project termination?"
                    ],
                    "takeaway": "Frame your findings around international evaluation criteria to ensure universal credibility and utility."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "rq_5_1",
                  "question": "Under the OECD-DAC evaluation criteria, which dimension evaluates whether intervention benefits will persist after donor funding ends?",
                  "options": [
                    "Relevance",
                    "Efficiency",
                    "Sustainability",
                    "Coherence"
                  ],
                  "correctIndex": 2,
                  "explanation": "Sustainability assesses the continuation of positive outcomes over the long term without ongoing external subsidies."
                }
              ]
            },
            "faqs": [
              {
                "id": "rfaq_5_1",
                "q": "What is the standard turnaround time for peer review on policy briefs?",
                "a": "Policy briefs undergo 48-hour internal peer review by the Research Committee before final copyediting and client submission.",
                "read": true
              }
            ]
          }
        ],
        "exam": {
          "submitted": false,
          "submittedDate": null,
          "answers": {},
          "questions": [
            {
              "id": "res_exam_q1",
              "title": "1. Multi-Stage Sampling & Field Strategy",
              "prompt": "You are commissioned by a multilateral agency to evaluate a maternal and child nutrition programme across 12 high-burden districts in Uttar Pradesh. Propose your complete sampling design, sample size justification, clustering adjustments, and household selection methodology.",
              "placeholder": "Detail sampling frames, stratification, cluster calculations, and field protocols...",
              "rubric": "Evaluates sampling theory, logistical awareness, and statistical precision."
            },
            {
              "id": "res_exam_q2",
              "title": "2. Mixed-Methods Triangulation Framework",
              "prompt": "Explain how you would triangulate quantitative survey findings with Focus Group Discussions and Key Informant Interviews to assess why a rural drinking water initiative achieved high infrastructure installation but low community utilization.",
              "placeholder": "Detail your mixed-methods matrix, qualitative sampling, and analytical synthesis...",
              "rubric": "Evaluates qualitative-quantitative synthesis and development sector diagnostic capability."
            },
            {
              "id": "res_exam_q3",
              "title": "3. Executive Policy Recommendation Framing",
              "prompt": "Draft an executive summary and three actionable policy recommendations for a state Ministry of Health based on findings showing a 35% dropout rate in immunisation booster doses among migrant urban poor households.",
              "placeholder": "Write an executive brief: context, core evidence, root causes, and actionable recommendations...",
              "rubric": "Evaluates policy writing, clarity, persuasiveness, and practical feasibility."
            }
          ]
        },
        "chatRoom": {
          "title": "Research & Policy Cohort",
          "instructors": "Dr. Ananya Sen (Head of Research), Kunal Verma",
          "messages": [
            {
              "id": "rmsg_1",
              "sender": "instructor",
              "author": "Dr. Ananya Sen",
              "time": "Yesterday at 10:00 AM",
              "text": "Welcome everyone to the Social Research & Policy programme! Please review Module 0's safeguarding manual before our field methodology kickoff call."
            },
            {
              "id": "rmsg_2",
              "sender": "user",
              "author": "Sudhir Kumar",
              "time": "Yesterday at 11:30 AM",
              "text": "Thank you Dr. Ananya. Looking forward to mastering the survey instruments and field evaluation frameworks."
            }
          ]
        },
        "feedbackList": []
      },
      design: {
        "id": "design",
        "title": "Design & Social Media",
        "roleTag": "Design & Media",
        "description": "As a Graphic Design & Social Media Intern at Ikaai India, you will shape our institutional brand identity, craft publication-ready evaluation reports, design engaging data infographics, and manage multi-channel digital campaigns.",
        "modules": [
          {
            "id": "des_mod_0",
            "indexNumber": 0,
            "title": "0. Ikaai Brand Identity & Visual Guidelines",
            "grade": "A (100%)",
            "quizTitle": "Institutional Typography, Palettes & Brand Governance",
            "objectives": [
              "Master Ikaai's brand color system: Emerald Green (#00511e), Vibrant Accent (#00a544), Mint (#5ee9b5), and dark/light neutrals.",
              "Implement typography standards: Manrope for primary headings and Inter for body copy across all institutional collaterals.",
              "Understand official logo clearance zones, minimum display sizes, and forbidden modifications (no drop-shadows or distortions).",
              "Access official vector asset repositories, iconography sets, and digital brand templates."
            ],
            "resources": [
              {
                "id": "des_res_0_1",
                "title": "0.1 Ikaai Institutional Brand Styleguide 2026",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Official Brand Palette & Proportions",
                    "subtitle": "The 60-30-10 Design Balance",
                    "bullets": [
                      "Dominant base (60%): Clean white/slate backgrounds in print, near-black #0c0e12 in digital portals.",
                      "Structural balance (30%): Deep Ikaai Emerald (#00511e) for major cards, sidebars, and title blocks.",
                      "Action accent (10%): High-energy vibrant green (#00a544) strictly reserved for CTAs, active states, and highlights.",
                      "Supporting tints: Mint #5ee9b5 for success badges and secondary visual accents."
                    ],
                    "takeaway": "Consistent color harmony builds institutional trust and establishes brand recognition across all client touchpoints."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "desq_0_1",
                  "question": "What is Ikaai's primary brand accent hex code used for interactive buttons and key progress indicators?",
                  "options": [
                    "#00a544",
                    "#3b82f6",
                    "#e11d48",
                    "#f59e0b"
                  ],
                  "correctIndex": 0,
                  "explanation": "Ikaai's vibrant accent green is #00a544, grounded by deep emerald #00511e and bright mint #5ee9b5."
                }
              ]
            },
            "faqs": [
              {
                "id": "desfaq_0_1",
                "q": "Where can I download high-resolution SVG and PNG logos?",
                "a": "All official vector and raster logo assets are located in the shared branding drive at Assets/Branding/Logos/.",
                "read": true
              }
            ]
          },
          {
            "id": "des_mod_1",
            "indexNumber": 1,
            "title": "1. Publication Design & High-Impact Report Layouts",
            "grade": "A (95%)",
            "quizTitle": "Editorial Design & Multi-Page Document Architecture",
            "objectives": [
              "Design publication-grade research reports in Adobe InDesign, Illustrator, and professional Canva enterprise templates.",
              "Master multi-column grid layouts, baseline grids, typographic hierarchy, and pull-quote treatments.",
              "Format dense statistical tables, executive callout boxes, and methodology sidebars with optical balance.",
              "Prepare print-ready PDFs with bleed, trim marks, CMYK profiles, and interactive digital PDFs with hyperlinked TOCs."
            ],
            "resources": [
              {
                "id": "des_res_1_1",
                "title": "1.1 Editorial Design Manual for Development Reports",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Editorial Grid Architecture",
                    "subtitle": "Balancing Information Density and Whitespace",
                    "bullets": [
                      "Adopt a flexible 12-column grid allowing seamless transitions between 2-column, 3-column, and 4-column content.",
                      "Enforce strict typographic scale: Title 32pt, H1 24pt, H2 18pt, Body 10pt with 14pt leading.",
                      "Executive callouts: use 2pt solid Ikaai green left borders with 10% tinted background fills.",
                      "Running headers and footers: include chapter name, institutional logo watermark, and folio page numbers."
                    ],
                    "takeaway": "Whitespace is not empty space; it is a structural design tool that guides executive readability."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "desq_1_1",
                  "question": "What is the recommended leading (line-spacing) for 10pt body text in Ikaai analytical reports?",
                  "options": [
                    "10pt (solid)",
                    "14pt to 15pt",
                    "24pt",
                    "30pt"
                  ],
                  "correctIndex": 1,
                  "explanation": "A proportional leading of 14-15pt on 10pt type ensures comfortable eye-tracking across multi-column text."
                }
              ]
            },
            "faqs": [
              {
                "id": "desfaq_1_1",
                "q": "What color mode should be exported for reports sent to commercial offset printers?",
                "a": "Export in CMYK with FOGRA39 or Coated GRACoL color profiles, including 3mm bleed and crop marks.",
                "read": true
              }
            ]
          },
          {
            "id": "des_mod_2",
            "indexNumber": 2,
            "title": "2. Social Data Infographics & Visualizing Complex Findings",
            "grade": "A (100%)",
            "quizTitle": "Information Design & Quantitative Visuals",
            "objectives": [
              "Transform complex econometrics into compelling visual infographics for public and media understanding.",
              "Select optimal visualization archetypes: flowcharts, geographic heatmaps, treemaps, and waffle charts.",
              "Design clear, accessible data keys, annotations, and contextual reference benchmarks.",
              "Ensure accessibility: color-blind safe palettes (WCAG AAA contrast) and responsive layouts."
            ],
            "resources": [
              {
                "id": "des_res_2_1",
                "title": "2.1 Infographic Design Principles for Social Evidence",
                "type": "Presentation",
                "fileExt": "PPT",
                "completed": true,
                "slides": [
                  {
                    "title": "Transforming Numbers Into Narratives",
                    "subtitle": "Clarity Over Decoration",
                    "bullets": [
                      "Hierarchy of data: guide the viewer's eye to the primary insight within the first 3 seconds.",
                      "Never distort proportions: bar chart axes must start at zero; bubble charts must scale by area, not radius.",
                      "Contextual benchmarks: always compare local indicators against national averages or SDG targets.",
                      "Export optimization: clean vector SVGs for web reports and high-res PNGs for mobile social cards."
                    ],
                    "takeaway": "An infographic that misleads data proportions destroys institutional credibility; accuracy is our highest aesthetic."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "desq_2_1",
                  "question": "Why must bar chart vertical axes always start at zero in research infographics?",
                  "options": [
                    "To prevent optical distortion and artificial exaggeration of percentage differences",
                    "To save ink during printing",
                    "Because Canva does not support custom axes",
                    "To make all bars look the same height"
                  ],
                  "correctIndex": 0,
                  "explanation": "Truncating the baseline distorts the visual area ratio, creating a false perception of radical differences where only minor variances exist."
                }
              ]
            },
            "faqs": [
              {
                "id": "desfaq_2_1",
                "q": "Which tool is preferred for complex interactive map visualizations?",
                "a": "QGIS combined with Adobe Illustrator, or Mapbox Studio for interactive web embedding.",
                "read": true
              }
            ]
          },
          {
            "id": "des_mod_3",
            "indexNumber": 3,
            "title": "3. Social Media Content Strategy & LinkedIn Advocacy",
            "grade": "A (90%)",
            "quizTitle": "B2B Social Media Growth & Thought Leadership",
            "objectives": [
              "Devise content calendars across LinkedIn, Twitter/X, and institutional newsletters promoting Ikaai's research.",
              "Write compelling hook-driven post copy, executive summaries, and carousel slide narratives.",
              "Design high-performing LinkedIn document carousels (1080x1350px format) breaking down complex policy briefs.",
              "Implement growth strategies: tag partner organizations, leverage trending developmental hashtags, and engage sector leaders."
            ],
            "resources": [
              {
                "id": "des_res_3_1",
                "title": "3.1 The Ikaai LinkedIn Playbook for Policy Think Tanks",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "High-Impact LinkedIn Architecture",
                    "subtitle": "Educate, Empower, and Influence",
                    "bullets": [
                      "Hook on slide 1: bold thesis statement or counter-intuitive statistical finding.",
                      "Carousel structure: 6 to 8 slides maximum, focusing on one central developmental challenge.",
                      "Design layout: 1080x1350 portrait ratio fills 20% more mobile screen real estate than square posts.",
                      "Clear call to action: direct followers to download the full evaluation report from ikaaiindia.in."
                    ],
                    "takeaway": "Social posts are the front door to our research; make complex evidence accessible to millions."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "desq_3_1",
                  "question": "What aspect ratio delivers the highest visual engagement for LinkedIn PDF document carousels on mobile devices?",
                  "options": [
                    "16:9 widescreen",
                    "1:1 square",
                    "4:5 portrait (1080x1350px)",
                    "9:16 vertical video"
                  ],
                  "correctIndex": 2,
                  "explanation": "4:5 portrait format maximizes screen real estate on mobile feeds, driving higher click-through rates and dwell time."
                }
              ]
            },
            "faqs": [
              {
                "id": "desfaq_3_1",
                "q": "What is the recommended posting cadence on LinkedIn?",
                "a": "Ikaai publishes 3 thought-leadership pieces weekly: Tuesday, Wednesday, and Thursday mornings at 9:00 AM IST.",
                "read": true
              }
            ]
          },
          {
            "id": "des_mod_4",
            "indexNumber": 4,
            "title": "4. Short-Form Video & Multimedia Production",
            "grade": "A (100%)",
            "quizTitle": "Video Storytelling & Field Documentation",
            "objectives": [
              "Produce 60-90 second research explainers and field beneficiary spotlight reels for YouTube Shorts and LinkedIn.",
              "Master Adobe Premiere Pro, CapCut, and DaVinci Resolve editing workflows.",
              "Record clear field audio with wireless lavaliers, apply noise reduction, and select royalty-free background scores.",
              "Generate accurate open and closed captions (SRT) in Hindi and English for mobile accessibility."
            ],
            "resources": [
              {
                "id": "des_res_4_1",
                "title": "4.1 Video Production SOP for Field Research",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "Short-Form Video Best Practices",
                    "subtitle": "Capturing Human Impact Respectfully",
                    "bullets": [
                      "Opening hook: First 3 seconds must introduce the core human question or surprising metric.",
                      "Subtitles: 85% of social videos are watched with sound muted; subtitles are mandatory.",
                      "Dignified framing: avoid sensationalized portrayals of poverty; emphasize agency, resilience, and solutions.",
                      "Color grading: maintain natural skin tones with clean, warm developmental aesthetics."
                    ],
                    "takeaway": "Video brings raw data to life; show the real humans behind every percentage point."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "desq_4_1",
                  "question": "Why are burned-in or open captions mandatory for all Ikaai social video content?",
                  "options": [
                    "Because algorithms disqualify silent videos",
                    "Because over 80% of social media users consume video with sound muted on mobile feeds",
                    "To replace the need for voiceover artists",
                    "Because video editing software requires them"
                  ],
                  "correctIndex": 1,
                  "explanation": "Mobile users predominantly scroll feeds silently in public or workplace environments; captions ensure message retention."
                }
              ]
            },
            "faqs": [
              {
                "id": "desfaq_4_1",
                "q": "Where can I source licensed music tracks for Ikaai video edits?",
                "a": "Use Ikaai's licensed enterprise account on Epidemic Sound or Artlist. Never use copyrighted commercial tracks without explicit licensing.",
                "read": true
              }
            ]
          },
          {
            "id": "des_mod_5",
            "indexNumber": 5,
            "title": "5. Campaign Analytics & Digital Outreach Optimization",
            "grade": "A (95%)",
            "quizTitle": "Analytics & Audience Conversion",
            "objectives": [
              "Track web referral traffic and report downloads using Google Analytics 4 (GA4) and UTM parameters.",
              "Analyze social metrics: Impressions, Engagement Rate, Click-Through Rate (CTR), and follower growth.",
              "Conduct A/B testing on report cover designs, thumbnail images, and post copy headlines.",
              "Compile monthly Digital Impact Reports for executive leadership and donor transparency."
            ],
            "resources": [
              {
                "id": "des_res_5_1",
                "title": "5.1 Digital Campaign Measurement Framework",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "Measuring What Matters in Policy Outreach",
                    "subtitle": "From Vanity Metrics to Real Influence",
                    "bullets": [
                      "Distinguish vanity metrics (likes, views) from high-value actions (full report PDF downloads, policy citations).",
                      "Implement standardized UTM naming: utm_source=linkedin&utm_medium=carousel&utm_campaign=education_eval_2026.",
                      "Audience segmentation: analyzing whether senior bureaucrats, researchers, or journalists are engaging.",
                      "Continuous refinement: iteratively improving visual hooks based on monthly CTR analytics."
                    ],
                    "takeaway": "Data drives our design decisions just as it drives our policy research."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "desq_5_1",
                  "question": "What is considered the most significant conversion event for a digital research campaign at Ikaai?",
                  "options": [
                    "A random profile visit",
                    "A full evaluation report PDF download driven through tracked campaign UTM links",
                    "An automated bot comment",
                    "A post retweet"
                  ],
                  "correctIndex": 1,
                  "explanation": "Full report downloads represent genuine high-intent engagement by decision-makers seeking evidence for policy action."
                }
              ]
            },
            "faqs": [
              {
                "id": "desfaq_5_1",
                "q": "How do I generate an official Ikaai campaign UTM tracking link?",
                "a": "Use the Campaign URL Builder sheet pinned in the #design-team Slack channel to ensure consistent tagging syntax.",
                "read": true
              }
            ]
          }
        ],
        "exam": {
          "submitted": false,
          "submittedDate": null,
          "answers": {},
          "questions": [
            {
              "id": "des_exam_q1",
              "title": "1. Multi-Page Publication Design & Typographic Strategy",
              "prompt": "You are assigned to design the layout for a 60-page flagship evaluation report on rural healthcare interventions. Detail your typographic scale, grid structure, executive summary layout, chart styling, and print/digital export specifications.",
              "placeholder": "Detail your software workflow, grids, fonts, margins, and brand balance...",
              "rubric": "Evaluates editorial design proficiency, typography discipline, and production standards."
            },
            {
              "id": "des_exam_q2",
              "title": "2. Data Infographic Conception for Non-Technical Audiences",
              "prompt": "Translate a multi-district baseline study showing complex correlations between female literacy, household sanitation, and childhood stunting into a high-impact infographic concept. Describe the visual layout, chart choices, and color strategy.",
              "placeholder": "Describe visual hierarchy, chart archetypes, color palette, and key narrative points...",
              "rubric": "Evaluates information architecture, data accuracy, and visual storytelling."
            },
            {
              "id": "des_exam_q3",
              "title": "3. Integrated Social Media Launch Campaign",
              "prompt": "Create a 2-week digital launch campaign strategy for a newly published policy evaluation. Detail your content calendar, LinkedIn carousel slide breakdown, video teaser format, and key performance indicators (KPIs).",
              "placeholder": "Outline schedule, carousel outline, visual assets, copy hooks, and target metrics...",
              "rubric": "Evaluates digital strategy, marketing acumen, and knowledge of sector audiences."
            }
          ]
        },
        "chatRoom": {
          "title": "Design & Media Studio",
          "instructors": "Rhea Mukherjee (Creative Director), Amit Patel",
          "messages": [
            {
              "id": "desmsg_1",
              "sender": "instructor",
              "author": "Rhea Mukherjee",
              "time": "Yesterday at 11:00 AM",
              "text": "Hello designers! Please download the official Ikaai Figma design system and InDesign CC templates before our brand review workshop."
            },
            {
              "id": "desmsg_2",
              "sender": "user",
              "author": "Sudhir Kumar",
              "time": "Yesterday at 12:15 PM",
              "text": "Hello Rhea ma'am! Assets downloaded. Looking forward to designing the upcoming publication layouts."
            }
          ]
        },
        "feedbackList": []
      },
      bd: {
        "id": "bd",
        "title": "Business Development",
        "roleTag": "Partnerships & BD",
        "description": "As a Partnerships & Business Development Associate at Ikaai India, you will drive strategic growth, identify high-value public procurement tenders and CSR consulting briefs, write winning technical/financial proposals, and manage institutional client relationships.",
        "modules": [
          {
            "id": "bd_mod_0",
            "indexNumber": 0,
            "title": "0. Development Sector Landscape & Ikaai Consulting Offerings",
            "grade": "A (90%)",
            "quizTitle": "Development Consulting & Ikaai Value Proposition",
            "objectives": [
              "Understand the social sector institutional architecture: Central/State Ministries, Multilateral Agencies (World Bank, ADB, UNICEF), and CSR Foundations.",
              "Master Ikaai's core consulting capabilities: Baseline/Endline Surveys, Third-Party Monitoring (TPM), Impact Assessments, and Policy Advisory.",
              "Learn Ikaai's competitive advantages: technological rigor, Pan-India CAPI field footprint, and high-speed statistical delivery.",
              "Familiarize yourself with statutory procurement norms: GFR 2017, CSR Section 135 (Companies Act 2013), and GeM Portal guidelines."
            ],
            "resources": [
              {
                "id": "bd_res_0_1",
                "title": "0.1 Ikaai Corporate Profile & Capability Deck",
                "type": "Presentation",
                "fileExt": "PPT",
                "completed": true,
                "slides": [
                  {
                    "title": "Ikaai Strategic Positioning",
                    "subtitle": "Evidence-Driven Public Policy Consulting",
                    "bullets": [
                      "Core mission: empowering public and philanthropic institutions with uncompromised empirical evidence.",
                      "Track record: over 250,000+ primary household surveys conducted across 18 Indian states.",
                      "Client ecosystem: NITI Aayog, Ministry of Rural Development, leading corporate foundations (Tata, Reliance, Adani).",
                      "Differentiators: end-to-end proprietary CAPI technology, daily high-frequency quality audits, and econometric modeling."
                    ],
                    "takeaway": "Our client pitch is simple: we provide bulletproof evidence that stands up to the highest audit and policy scrutiny."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "bdq_0_1",
                  "question": "Under Section 135 of the Indian Companies Act 2013, which companies are legally mandated to conduct independent CSR Impact Assessments?",
                  "options": [
                    "Every startup registered in India",
                    "Companies with an average CSR obligation of Rs 10 Crore or more in the three preceding financial years, for projects of Rs 1 Crore or more",
                    "Only public sector banks",
                    "Companies that have suffered annual net losses"
                  ],
                  "correctIndex": 1,
                  "explanation": "Statutory CSR rules mandate third-party independent impact assessments for projects of Rs 1 Cr+ by companies with average CSR spends of Rs 10 Cr+."
                }
              ]
            },
            "faqs": [
              {
                "id": "bdfaq_0_1",
                "q": "Where can I find Ikaai's latest past-performance credentials and completion certificates?",
                "a": "All signed client completion certificates, work orders, and reference letters are archived in Drive at BD_Repository/01_Credentials/.",
                "read": true
              }
            ]
          },
          {
            "id": "bd_mod_1",
            "indexNumber": 1,
            "title": "1. RFP Sourcing & Bid Tracking (GeM, DevNetJobs, CPP Portal)",
            "grade": "A (100%)",
            "quizTitle": "Procurement Portals & Opportunity Qualification",
            "objectives": [
              "Master daily opportunity tracking across Government e-Marketplace (GeM), Central Public Procurement Portal (CPPP), DevNetJobs, and state e-tenders.",
              "Evaluate tender documents: Eligibility Criteria (Turnover, Past Experience, Team Qualifications) and Scope of Work (SOW).",
              "Execute Go / No-Go decision matrix evaluating win probability, margin feasibility, and strategic partnership value.",
              "Maintain the institutional CRM pipeline tracking deals from Prospecting through Submission to Award."
            ],
            "resources": [
              {
                "id": "bd_res_1_1",
                "title": "1.1 The Opportunity Qualification SOP",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "Rigorous Go / No-Go Decision Framework",
                    "subtitle": "Focusing Resources on High-Win Opportunities",
                    "bullets": [
                      "Criteria 1: Technical feasibility - does Ikaai possess the exact domain expertise and geographic presence?",
                      "Criteria 2: Financial viability - is the budget aligned with field survey sample size requirements?",
                      "Criteria 3: Competitor landscape - who is likely bidding, and what is our distinctive technical advantage?",
                      "Criteria 4: Compliance checklist - EMD (Earnest Money Deposit), PBG, turnover certificates, and blacklisting affidavits."
                    ],
                    "takeaway": "Bidding on everything wins nothing; disciplined qualification ensures an industry-leading 45%+ win rate."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "bdq_1_1",
                  "question": "What is the primary purpose of an Earnest Money Deposit (EMD) in public procurement tenders?",
                  "options": [
                    "To pay the salaries of government evaluators",
                    "A financial guarantee demonstrating genuine bidder commitment, returned to unsuccessful bidders after tender award",
                    "A non-refundable application fee",
                    "An upfront advance payment for consulting services"
                  ],
                  "correctIndex": 1,
                  "explanation": "EMD protects procurement authorities against frivolous bids; it is refunded to all bidders once the contract is awarded."
                }
              ]
            },
            "faqs": [
              {
                "id": "bdfaq_1_1",
                "q": "How can Micro and Small Enterprises (MSEs) claim EMD exemptions on GeM?",
                "a": "By submitting a valid Udyam Registration Certificate under the Ministry of MSME, fulfilling statutory exemption guidelines.",
                "read": true
              }
            ]
          },
          {
            "id": "bd_mod_2",
            "indexNumber": 2,
            "title": "2. Technical Proposal Writing & Methodology Framing",
            "grade": "A (95%)",
            "quizTitle": "Technical Bidding & Winning Proposal Architecture",
            "objectives": [
              "Draft compelling technical proposals responding meticulously to Terms of Reference (TOR).",
              "Frame research methodologies: sampling approaches, data quality protocols, analytical frameworks, and work plans.",
              "Develop detailed GANTT milestone schedules, staffing matrices, and risk mitigation strategies.",
              "Write persuasive executive summaries highlighting Ikaai's innovations, field capacity, and sector leadership."
            ],
            "resources": [
              {
                "id": "bd_res_2_1",
                "title": "2.1 Technical Proposal Blueprint & Master Templates",
                "type": "PDF",
                "fileExt": "PDF",
                "completed": true,
                "slides": [
                  {
                    "title": "The Winning Technical Proposal Structure",
                    "subtitle": "Maximizing Scoring in QCBS Evaluations",
                    "bullets": [
                      "Section 1: Understanding of the TOR - demonstrating deep contextual grasp of the client's problem.",
                      "Section 2: Technical Approach & Methodology - detailed sampling formulas, CAPI protocols, and analytical models.",
                      "Section 3: Work Plan & GANTT Chart - clear milestones, review gates, and deliverable commitments.",
                      "Section 4: Key Personnel Profiles - CVs formatted to showcase exact alignment with qualification criteria.",
                      "Section 5: Institutional Credentials - case studies of past successful assignments."
                    ],
                    "takeaway": "Evaluators score proposals against explicit rubrics; make it effortless for them to award maximum marks."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "bdq_2_1",
                  "question": "In a Quality and Cost Based Selection (QCBS 80:20) procurement, which component carries 80% of the overall evaluation weight?",
                  "options": [
                    "The lowest price quoted in the financial bid",
                    "The technical proposal score evaluated by the expert committee",
                    "The age of the consulting company",
                    "The number of social media followers"
                  ],
                  "correctIndex": 1,
                  "explanation": "In 80:20 QCBS, technical merit constitutes 80% of the composite score, meaning the highest quality proposal frequently wins even with premium pricing."
                }
              ]
            },
            "faqs": [
              {
                "id": "bdfaq_2_1",
                "q": "What is the standard proposal review workflow before submission?",
                "a": "All technical bids undergo a 3-tier review: Peer Review -> Technical Director Sign-off -> Commercial Director Approval.",
                "read": true
              }
            ]
          },
          {
            "id": "bd_mod_3",
            "indexNumber": 3,
            "title": "3. Financial Modeling & Resource Costing for Bids",
            "grade": "A (100%)",
            "quizTitle": "Budget Architecture & Financial Bid Strategy",
            "objectives": [
              "Build granular financial models: enumerator per-diems, travel/logistics, tablet rentals, software licenses, and expert mandays.",
              "Calculate gross margins, overhead absorption, contingency reserves, and statutory GST taxation (18%).",
              "Formulate strategic financial bidding tactics (L1 competitive pricing vs premium quality pricing).",
              "Prepare statutory financial bidding formats: BoQ spreadsheets, breakdown of remuneration, and out-of-pocket expenses."
            ],
            "resources": [
              {
                "id": "bd_res_3_1",
                "title": "3.1 Consulting Financial Costing Model & Guidelines",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "Cost Modeling Architecture",
                    "subtitle": "Protecting Margins While Remaining Competitive",
                    "bullets": [
                      "Direct Field Costs: calculating interviewer daily rates, local transport per cluster, and respondent refreshments.",
                      "Human Resource Costing: calculating expert day-rates based on annual CTC and billable utilization targets.",
                      "Overhead Allocation: covering institutional management, IT infrastructure, and quality assurance overheads.",
                      "Contingency: budgeting an essential 5% risk buffer for unexpected weather delays or field re-visits."
                    ],
                    "takeaway": "An under-costed winning bid is worse than losing; ensure every operational expense is accounted for."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "bdq_3_1",
                  "question": "What is the applicable Goods and Services Tax (GST) rate for management and technical research consultancy in India?",
                  "options": [
                    "0%",
                    "5%",
                    "12%",
                    "18%"
                  ],
                  "correctIndex": 3,
                  "explanation": "Professional consulting and socio-economic research services fall under SAC 9983 and are taxed at standard 18% GST."
                }
              ]
            },
            "faqs": [
              {
                "id": "bdfaq_3_1",
                "q": "Are financial bids submitted in the same envelope as technical bids?",
                "a": "Never in two-cover bidding. Placing financial figures in the technical envelope leads to immediate disqualification.",
                "read": true
              }
            ]
          },
          {
            "id": "bd_mod_4",
            "indexNumber": 4,
            "title": "4. Institutional Pitching & Client Presentations",
            "grade": "A (90%)",
            "quizTitle": "Pitch Deck Mastery & High-Stakes Negotiations",
            "objectives": [
              "Deliver high-impact technical presentations to government evaluation committees and corporate CSR boards.",
              "Structure 15-minute pitch decks focusing on problem diagnostic, customized methodology, and strategic value.",
              "Handle aggressive Q&A sessions, scope clarifications, and methodological challenges with poise.",
              "Navigate pre-contract negotiation meetings to protect intellectual property and milestone payment schedules."
            ],
            "resources": [
              {
                "id": "bd_res_4_1",
                "title": "4.1 The Art of the Development Pitch Deck",
                "type": "Presentation",
                "fileExt": "PPT",
                "completed": true,
                "slides": [
                  {
                    "title": "Winning the Technical Defense",
                    "subtitle": "Commanding the Room with Confidence and Evidence",
                    "bullets": [
                      "First 2 minutes: establish immediate credibility by referencing proprietary field data from the client's target districts.",
                      "Methodology walkthrough: show interactive prototypes of the survey tablet tool rather than static bullet points.",
                      "Addressing committee doubts: never be defensive; reframe objections around shared developmental outcomes.",
                      "Closing hook: articulate the transformative impact of the evidence on the client's ongoing welfare schemes."
                    ],
                    "takeaway": "Committees buy confidence and competence; demonstrate that Ikaai will de-risk their entire evaluation."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "bdq_4_1",
                  "question": "What is the most effective approach when an evaluation committee challenges your proposed sample size as being too small?",
                  "options": [
                    "Argue with the committee members",
                    "Walk through the statistical power calculation showing 80% power at alpha=0.05, while offering optional booster cluster scenarios",
                    "Immediately agree to double the sample size without discussing budget",
                    "Refer them to a textbook"
                  ],
                  "correctIndex": 1,
                  "explanation": "Grounding your response in mathematical power calculations validates your scientific rigor while demonstrating collaborative flexibility."
                }
              ]
            },
            "faqs": [
              {
                "id": "bdfaq_4_1",
                "q": "Who leads client pitch presentations?",
                "a": "Presentations are co-led by the BD Lead (framing value & credentials) and the Lead Researcher (methodology & execution defense).",
                "read": true
              }
            ]
          },
          {
            "id": "bd_mod_5",
            "indexNumber": 5,
            "title": "5. Key Account Management & Long-term Partnerships",
            "grade": "A (95%)",
            "quizTitle": "Client Retention & Repeat Business Expansion",
            "objectives": [
              "Manage ongoing client relationships across project delivery lifecycles, ensuring milestone sign-offs and timely invoicing.",
              "Conduct post-project review sessions and Net Promoter Score (NPS) client satisfaction evaluations.",
              "Identify cross-sell and up-sell opportunities: moving clients from one-off baseline evaluations to multi-year monitoring retainers.",
              "Draft formal MoUs and institutional partnership agreements with universities and think tanks."
            ],
            "resources": [
              {
                "id": "bd_res_5_1",
                "title": "5.1 Key Account Management Playbook",
                "type": "Document",
                "fileExt": "DOC",
                "completed": true,
                "slides": [
                  {
                    "title": "From Vendor to Strategic Advisor",
                    "subtitle": "Building Decade-Long Institutional Alliances",
                    "bullets": [
                      "Regular client check-ins: schedule monthly executive briefings sharing preliminary field observations.",
                      "Value-add insights: share curated sector policy updates and funding briefs free of charge.",
                      "Smooth contract renewals: initiate extension dialogues 90 days prior to contract expiration.",
                      "Client advocacy: secure glowing video testimonials and formal letters of commendation."
                    ],
                    "takeaway": "Acquiring a new client costs 5x more than retaining an existing partner; excellence in delivery is our best sales strategy."
                  }
                ]
              }
            ],
            "quiz": {
              "completed": true,
              "score": 10,
              "total": 10,
              "questions": [
                {
                  "id": "bdq_5_1",
                  "question": "How many days in advance of contract expiration should a BD manager initiate renewal or follow-on phase discussions?",
                  "options": [
                    "The day before expiration",
                    "90 days prior",
                    "1 year prior",
                    "After funding stops"
                  ],
                  "correctIndex": 1,
                  "explanation": "A 90-day horizon allows sufficient time for client budgetary approvals, board sanction, and contract extension formalization."
                }
              ]
            },
            "faqs": [
              {
                "id": "bdfaq_5_1",
                "q": "What CRM software does Ikaai use for deal pipeline tracking?",
                "a": "Ikaai manages sales pipelines in HubSpot CRM Enterprise. All client emails, meeting notes, and deal stages must be logged weekly.",
                "read": true
              }
            ]
          }
        ],
        "exam": {
          "submitted": false,
          "submittedDate": null,
          "answers": {},
          "questions": [
            {
              "id": "bd_exam_q1",
              "title": "1. Tender Sourcing & Go/No-Go Evaluation",
              "prompt": "You identify an RFP on GeM issued by a state livelihood mission for an impact evaluation of rural self-help groups (Budget: Rs 45 Lakhs, Sample: 12,000 households, Timeline: 4 months). Outline your Go/No-Go evaluation framework assessing technical feasibility, margin, and risk.",
              "placeholder": "Detail qualification parameters, cost estimation, timeline feasibility, and decision verdict...",
              "rubric": "Evaluates commercial judgment, operational realism, and risk assessment."
            },
            {
              "id": "bd_exam_q2",
              "title": "2. Competitive Technical Proposal Structuring",
              "prompt": "Structure the executive summary and methodology section of a winning technical proposal responding to an international donor's RFP for third-party monitoring of rural solar electrification across 200 tribal villages in Odisha and Jharkhand.",
              "placeholder": "Draft executive summary, technical approach, sampling, and risk mitigation...",
              "rubric": "Evaluates technical proposal writing, institutional persuasiveness, and sector competence."
            },
            {
              "id": "bd_exam_q3",
              "title": "3. Commercial Proposal Budget Breakdown",
              "prompt": "Construct a comprehensive commercial budget breakdown for a 6,000 household primary survey across 4 districts. Account for field staff remuneration, supervisor oversight, travel/logistics, tablet tech, management fee, and 18% GST.",
              "placeholder": "Present cost heads, unit rates, assumptions, and final commercial quote...",
              "rubric": "Evaluates financial modeling, unit economics, and public procurement costing acumen."
            }
          ]
        },
        "chatRoom": {
          "title": "Partnerships & BD Directorate",
          "instructors": "Siddharth Malhotra (VP Partnerships), Neha Gupta",
          "messages": [
            {
              "id": "bdmsg_1",
              "sender": "instructor",
              "author": "Siddharth Malhotra",
              "time": "Yesterday at 10:30 AM",
              "text": "Welcome to the Ikaai Partnerships team! We have two major Ministry of Rural Development tenders opening this month. Let's review the qualification SOP."
            },
            {
              "id": "bdmsg_2",
              "sender": "user",
              "author": "Sudhir Kumar",
              "time": "Yesterday at 11:45 AM",
              "text": "Thank you Siddharth sir! Reviewing the Go/No-Go matrix and tender tracking pipelines now."
            }
          ]
        },
        "feedbackList": []
      }
    },
    announcements: [
      {
        id: 'ann_1',
        title: 'October 2026 – HR Department Updates',
        icon: '📢',
        paragraphs: [
          'Hi everyone,',
          'A few important updates as we start the new month:',
          '🎂 <strong>Ikaai India Foundation 6th Anniversary!</strong> This month marks 6 years since Ikaai India was established! It is great to see how much our organisation has grown, evaluated, and touched lives since November 2020. A big thank you to our founders, advisors, field teams, and every intern past and present who has contributed to this transformative journey. Here is to another impactful year ahead! 🎉✨',
          '🎉 <strong>Global HR Team Growing:</strong> Congratulations to <strong>Sasha El Mendelek</strong> on her promotion to Global HR Associate! Her dedication to intern mentorship, leadership motivation, and operational excellence continues to elevate our entire team.',
          'This month we will also review regional intern rankings, performance recommendation letters, our new Academy portal features, and direct coordination guidelines with the Global HR team.',
          'Attendance is mandatory: all HR Team Leads must attend at least one of the two scheduled mid-month orientation sessions.',
          'Meeting links have been shared by email and will also be reposted one hour before each session via the official WhatsApp coordination group.',
          'Please save the dates and plan your schedule accordingly.'
        ],
        author: 'Sasha El Mendelek',
        authorRole: 'Global HR Associate',
        isCoordinator: true,
        timestamp: '11 Oct 2026, 7:34pm'
      },
      {
        id: 'ann_2',
        title: 'October HR Team Lead Sessions',
        icon: '📢',
        paragraphs: [
          'As part of our October HR activities, please take note of the following upcoming mid-month coordination sessions:',
          '💬 <strong>HR Team Lead Mid-Month Sessions:</strong><br>• 13 October | 6:00 PM IST / UK Time<br>• 18 October | 6:00 PM IST / UK Time',
          'These sessions are designed to provide HR Team Leads with a dedicated space to raise questions, address candidate sourcing bottlenecks, clarify evaluation rubrics, and receive real-time support directly from senior HR associates.',
          'Best wishes,<br><strong>Sasha El Mendelek</strong><br>Global HR Associate'
        ],
        author: 'Sasha El Mendelek',
        authorRole: 'Global HR Associate',
        isCoordinator: true,
        timestamp: '11 Oct 2026, 7:34pm'
      }
    ]
  };

  const STORAGE_KEY = 'ikaai_india_library_portal_v3';

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================


  // ==========================================
  // PROGRAMME BACKEND METADATA & MAPPINGS
  // ==========================================
  const PROGRAMME_META = {
    hr: {
      id: '10000000-0000-0000-0000-000000000001',
      slug: 'human-resources',
      name: 'Human Resources'
    },
    data: {
      id: '10000000-0000-0000-0000-000000000002',
      slug: 'data-analyst',
      name: 'Data Analyst'
    },
    research: {
      id: '10000000-0000-0000-0000-000000000003',
      slug: 'social-research-policy',
      name: 'Social Research & Policy'
    },
    design: {
      id: '10000000-0000-0000-0000-000000000004',
      slug: 'design-social-media',
      name: 'Design & Social Media'
    },
    bd: {
      id: '10000000-0000-0000-0000-000000000005',
      slug: 'business-development',
      name: 'Business Development'
    }
  };

  function getProgrammeDbId(keyOrSlug) {
    if (PROGRAMME_META[keyOrSlug]) return PROGRAMME_META[keyOrSlug].id;
    for (const k of Object.keys(PROGRAMME_META)) {
      if (PROGRAMME_META[k].slug === keyOrSlug || PROGRAMME_META[k].id === keyOrSlug) {
        return PROGRAMME_META[k].id;
      }
    }
    return PROGRAMME_META.hr.id;
  }

  function getProgrammeKey(idOrSlug) {
    for (const k of Object.keys(PROGRAMME_META)) {
      if (PROGRAMME_META[k].slug === idOrSlug || PROGRAMME_META[k].id === idOrSlug || k === idOrSlug) {
        return k;
      }
    }
    return 'hr';
  }

  let state = loadState();
  const savedProgId = localStorage.getItem('ikaai_active_programme');
  let currentProgrammeId = (savedProgId && INITIAL_DATA.programmes[savedProgId]) ? savedProgId : 'hr';
  let currentModuleIndex = 0;
  let expandedModules = new Set([0]);
  let activeScreen = 'module'; // 'module', 'exam', 'messages', 'chat', 'announcements', 'feedback', 'grade', 'settings'
  let activeQuizState = null;

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.programmes) parsed.programmes = {};
        Object.keys(INITIAL_DATA.programmes).forEach(pid => {
          if (!parsed.programmes[pid] || !parsed.programmes[pid].modules || parsed.programmes[pid].modules.length === 0) {
            parsed.programmes[pid] = JSON.parse(JSON.stringify(INITIAL_DATA.programmes[pid]));
          }
        });
        return Object.assign({}, INITIAL_DATA, parsed);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage, resetting state:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  // ==========================================
  // 3. DOM ELEMENTS
  // ==========================================

  const el = {
    // Top bar & Sidebar
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebarClose: document.getElementById('sidebarClose'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    sidebarBrandHome: document.getElementById('sidebarBrandHome'),
    mainContentScroll: document.getElementById('mainContentScroll'),
    topBarBrand: document.getElementById('topBarBrand'),
    userMenuBtn: document.getElementById('userMenuBtn'),
    userAvatarInitials: document.getElementById('userAvatarInitials'),

    // Sidebar items
    programmeSelect: document.getElementById('programmeSelect'),
    sidebarRoleBadge: document.getElementById('sidebarRoleBadge'),
    sidebarProgressPercent: document.getElementById('sidebarProgressPercent'),
    sidebarProgressBar: document.getElementById('sidebarProgressBar'),
    sidebarModulesList: document.getElementById('sidebarModulesList'),
    sidebarExamBadge: document.getElementById('sidebarExamBadge'),

    // Nav buttons
    navWrittenExam: document.getElementById('navWrittenExam'),
    navMessageInstructor: document.getElementById('navMessageInstructor'),
    navChat: document.getElementById('navChat'),
    navAnnouncements: document.getElementById('navAnnouncements'),
    navFeedback: document.getElementById('navFeedback'),
    navGrade: document.getElementById('navGrade'),
    navAccountSettings: document.getElementById('navAccountSettings'),
    navAdmin: document.getElementById('navAdmin'),

    // Company Resources Elements
    navCompanyResources: document.getElementById('navCompanyResources'),
    sidebarCompanyResourcesCountBadge: document.getElementById('sidebarCompanyResourcesCountBadge'),
    companyResourcesScreenView: document.getElementById('companyResourcesScreenView'),
    compResProgChip: document.getElementById('compResProgChip'),
    compResProgChipText: document.getElementById('compResProgChipText'),
    compResProgSelectWrapper: document.getElementById('compResProgSelectWrapper'),
    compResProgSelect: document.getElementById('compResProgSelect'),
    openIssueDocBtn: document.getElementById('openIssueDocBtn'),
    compResTabsBar: document.getElementById('compResTabsBar'),
    compResTabPublished: document.getElementById('compResTabPublished'),
    compResTabDrafts: document.getElementById('compResTabDrafts'),
    compResPublishedCount: document.getElementById('compResPublishedCount'),
    compResDraftsCount: document.getElementById('compResDraftsCount'),
    compResSearchInput: document.getElementById('compResSearchInput'),
    compResSearchClear: document.getElementById('compResSearchClear'),
    compResViewGridBtn: document.getElementById('compResViewGridBtn'),
    compResViewListBtn: document.getElementById('compResViewListBtn'),
    compResTypeChipsBar: document.getElementById('compResTypeChipsBar'),
    compResContent: document.getElementById('compResContent'),
    compResSkeleton: document.getElementById('compResSkeleton'),
    compResEmptyState: document.getElementById('compResEmptyState'),
    compResEmptyTitle: document.getElementById('compResEmptyTitle'),
    compResEmptyDesc: document.getElementById('compResEmptyDesc'),

    // Programme Header
    programmeHeaderCard: document.getElementById('programmeHeaderCard'),
    programmeTitle: document.getElementById('programmeTitle'),
    programmeDescription: document.getElementById('programmeDescription'),
    showMoreToggle: document.getElementById('showMoreToggle'),

    // Screen views
    screens: {
      module: document.getElementById('moduleScreenView'),
      jobDescriptions: document.getElementById('jdsScreenView'),
      companyResources: document.getElementById('companyResourcesScreenView'),
      exam: document.getElementById('examScreenView'),
      messages: document.getElementById('messagesScreenView'),
      chat: document.getElementById('chatScreenView'),
      announcements: document.getElementById('announcementsScreenView'),
      feedback: document.getElementById('feedbackScreenView'),
      grade: document.getElementById('gradeScreenView'),
      settings: document.getElementById('settingsScreenView'),
      admin: document.getElementById('adminScreenView')
    },

    // Module View Elements
    moduleTitle: document.getElementById('moduleTitle'),
    moduleGradeBadge: document.getElementById('moduleGradeBadge'),
    moduleFeedbackBtn: document.getElementById('moduleFeedbackBtn'),
    moduleObjectivesList: document.getElementById('moduleObjectivesList'),
    moduleCompletedRatio: document.getElementById('moduleCompletedRatio'),
    moduleProgressBar: document.getElementById('moduleProgressBar'),
    resourcesList: document.getElementById('resourcesList'),
    quizTitle: document.getElementById('quizTitle'),
    quizStatus: document.getElementById('quizStatus'),
    startQuizBtn: document.getElementById('startQuizBtn'),
    quizStatusIcon: document.getElementById('quizStatusIcon'),
    faqsSubtitle: document.getElementById('faqsSubtitle'),
    faqsCompletedIcon: document.getElementById('faqsCompletedIcon'),
    faqsList: document.getElementById('faqsList'),
    prevModuleBtn: document.getElementById('prevModuleBtn'),
    nextModuleBtn: document.getElementById('nextModuleBtn'),

    // Written Exam Elements
    examStatusPill: document.getElementById('examStatusPill'),
    examIntroSection: document.getElementById('examIntroSection'),
    examPromptSubtitle: document.getElementById('examPromptSubtitle'),
    startExamBtn: document.getElementById('startExamBtn'),
    examForm: document.getElementById('examForm'),
    examQuestionsContainer: document.getElementById('examQuestionsContainer'),
    saveDraftExamBtn: document.getElementById('saveDraftExamBtn'),
    submitExamBtn: document.getElementById('submitExamBtn'),
    cancelExamBtn: document.getElementById('cancelExamBtn'),
    examSubmittedNotice: document.getElementById('examSubmittedNotice'),
    examSubmittedTitle: document.getElementById('examSubmittedTitle'),
    examSubmittedDesc: document.getElementById('examSubmittedDesc'),
    examGradedDetails: document.getElementById('examGradedDetails'),
    examFinalGradeBadge: document.getElementById('examFinalGradeBadge'),
    examInstructorComment: document.getElementById('examInstructorComment'),
    reviewExamBtn: document.getElementById('reviewExamBtn'),
    retakeExamBtn: document.getElementById('retakeExamBtn'),
    instructorExamReviewSection: document.getElementById('instructorExamReviewSection'),
    instructorExamProgFilter: document.getElementById('instructorExamProgFilter'),
    filterExamSubAll: document.getElementById('filterExamSubAll'),
    filterExamSubPending: document.getElementById('filterExamSubPending'),
    filterExamSubGraded: document.getElementById('filterExamSubGraded'),
    instructorExamTableBody: document.getElementById('instructorExamTableBody'),
    emptyInstructorExamsState: document.getElementById('emptyInstructorExamsState'),
    gradeExamModal: document.getElementById('gradeExamModal'),
    closeGradeExamModalBtn: document.getElementById('closeGradeExamModalBtn'),
    cancelGradeExamBtn: document.getElementById('cancelGradeExamBtn'),
    gradeExamForm: document.getElementById('gradeExamForm'),
    gradeSubId: document.getElementById('gradeSubId'),
    gradeLearnerName: document.getElementById('gradeLearnerName'),
    gradeLearnerMeta: document.getElementById('gradeLearnerMeta'),
    gradeSubmissionDatePill: document.getElementById('gradeSubmissionDatePill'),
    gradeQuestionsList: document.getElementById('gradeQuestionsList'),
    gradeOverallMarks: document.getElementById('gradeOverallMarks'),
    gradeOverallComment: document.getElementById('gradeOverallComment'),
    allowRetakeBtn: document.getElementById('allowRetakeBtn'),
    saveGradeBtn: document.getElementById('saveGradeBtn'),

    // Support Inbox Elements
    supportInfoCard: document.getElementById('supportInfoCard'),
    supportReplyTimeText: document.getElementById('supportReplyTimeText'),
    supportOfficeHoursText: document.getElementById('supportOfficeHoursText'),
    supportInstructorsList: document.getElementById('supportInstructorsList'),
    roleLearnerToggleBtn: document.getElementById('roleLearnerToggleBtn'),
    roleInstructorToggleBtn: document.getElementById('roleInstructorToggleBtn'),
    instructorStatsStrip: document.getElementById('instructorStatsStrip'),
    statOpenThreads: document.getElementById('statOpenThreads'),
    statAvgReplyTime: document.getElementById('statAvgReplyTime'),
    statCategoriesCount: document.getElementById('statCategoriesCount'),
    statSatisfactionRate: document.getElementById('statSatisfactionRate'),
    supportLayoutContainer: document.getElementById('supportLayoutContainer'),
    supportInboxPanel: document.getElementById('supportInboxPanel'),
    openNewThreadBtn: document.getElementById('openNewThreadBtn'),
    inboxSearchInput: document.getElementById('inboxSearchInput'),
    clearInboxSearchBtn: document.getElementById('clearInboxSearchBtn'),
    inboxStatusFilters: document.getElementById('inboxStatusFilters'),
    countStatusAll: document.getElementById('countStatusAll'),
    countStatusOpen: document.getElementById('countStatusOpen'),
    countStatusAnswered: document.getElementById('countStatusAnswered'),
    countStatusResolved: document.getElementById('countStatusResolved'),
    inboxCategoryFilter: document.getElementById('inboxCategoryFilter'),
    inboxInstructorFilter: document.getElementById('inboxInstructorFilter'),
    threadsList: document.getElementById('threadsList'),
    supportConversationPanel: document.getElementById('supportConversationPanel'),
    noThreadSelectedView: document.getElementById('noThreadSelectedView'),
    startFirstThreadBtn: document.getElementById('startFirstThreadBtn'),
    activeConversationView: document.getElementById('activeConversationView'),
    backToInboxBtn: document.getElementById('backToInboxBtn'),
    threadStatusBadge: document.getElementById('threadStatusBadge'),
    threadCategoryBadge: document.getElementById('threadCategoryBadge'),
    threadModuleLinkChip: document.getElementById('threadModuleLinkChip'),
    threadModuleLinkLabel: document.getElementById('threadModuleLinkLabel'),
    threadSubjectHeading: document.getElementById('threadSubjectHeading'),
    threadAssignedInstructorText: document.getElementById('threadAssignedInstructorText'),
    threadCreatedDateText: document.getElementById('threadCreatedDateText'),
    threadStaffActions: document.getElementById('threadStaffActions'),
    threadStatusSelect: document.getElementById('threadStatusSelect'),
    threadAssignSelect: document.getElementById('threadAssignSelect'),
    threadMessagesScroll: document.getElementById('threadMessagesScroll'),
    threadRatingCard: document.getElementById('threadRatingCard'),
    ratingPromptText: document.getElementById('ratingPromptText'),
    ratingActionsBox: document.getElementById('ratingActionsBox'),
    thumbUpBtn: document.getElementById('thumbUpBtn'),
    thumbDownBtn: document.getElementById('thumbDownBtn'),
    ratingCommentWrap: document.getElementById('ratingCommentWrap'),
    ratingCommentInput: document.getElementById('ratingCommentInput'),
    submitRatingBtn: document.getElementById('submitRatingBtn'),
    ratingThankYouMessage: document.getElementById('ratingThankYouMessage'),
    changeRatingBtn: document.getElementById('changeRatingBtn'),
    reopenThreadBtn: document.getElementById('reopenThreadBtn'),
    threadComposerBox: document.getElementById('threadComposerBox'),
    staffComposerToolbar: document.getElementById('staffComposerToolbar'),
    toggleInternalNoteBtn: document.getElementById('toggleInternalNoteBtn'),
    internalNoteToggleLabel: document.getElementById('internalNoteToggleLabel'),
    openCannedRepliesBtn: document.getElementById('openCannedRepliesBtn'),
    composerAttachmentsPreview: document.getElementById('composerAttachmentsPreview'),
    threadComposerForm: document.getElementById('threadComposerForm'),
    composerTextarea: document.getElementById('composerTextarea'),
    composerFileInput: document.getElementById('composerFileInput'),
    composerCharCount: document.getElementById('composerCharCount'),
    sendReplyBtn: document.getElementById('sendReplyBtn'),
    messagesUnreadBadge: document.getElementById('messagesUnreadBadge'),
    newMessageModal: document.getElementById('newMessageModal'),
    closeNewMessageModalBtn: document.getElementById('closeNewMessageModalBtn'),
    newThreadForm: document.getElementById('newThreadForm'),
    newThreadInstructorSelect: document.getElementById('newThreadInstructorSelect'),
    newThreadCategorySelect: document.getElementById('newThreadCategorySelect'),
    newThreadModuleSelect: document.getElementById('newThreadModuleSelect'),
    newThreadSubjectInput: document.getElementById('newThreadSubjectInput'),
    subjectCharCount: document.getElementById('subjectCharCount'),
    quickAnswersBox: document.getElementById('quickAnswersBox'),
    quickAnswersList: document.getElementById('quickAnswersList'),
    dismissQuickAnswersBtn: document.getElementById('dismissQuickAnswersBtn'),
    newThreadBodyInput: document.getElementById('newThreadBodyInput'),
    messageCharCount: document.getElementById('messageCharCount'),
    newThreadDropzone: document.getElementById('newThreadDropzone'),
    newThreadFileInput: document.getElementById('newThreadFileInput'),
    newThreadFileError: document.getElementById('newThreadFileError'),
    newThreadFilesList: document.getElementById('newThreadFilesList'),
    newThreadErrorAlert: document.getElementById('newThreadErrorAlert'),
    cancelNewThreadBtn: document.getElementById('cancelNewThreadBtn'),
    submitNewThreadBtn: document.getElementById('submitNewThreadBtn'),
    cannedRepliesModal: document.getElementById('cannedRepliesModal'),
    closeCannedRepliesModalBtn: document.getElementById('closeCannedRepliesModalBtn'),
    cannedRepliesList: document.getElementById('cannedRepliesList'),
    cannedRepliesAdminFooter: document.getElementById('cannedRepliesAdminFooter'),
    addNewTemplateBtn: document.getElementById('addNewTemplateBtn'),

    // Announcements
    announcementsScreenView: document.getElementById('announcementsScreenView'),
    announcementsFeed: document.getElementById('announcementsFeed'),
    announcementsUnreadBadge: document.getElementById('announcementsUnreadBadge'),
    announcementsViewSwitch: document.getElementById('announcementsViewSwitch'),
    announcementsFeedTabBtn: document.getElementById('announcementsFeedTabBtn'),
    announcementsManageTabBtn: document.getElementById('announcementsManageTabBtn'),
    markAllAnnouncementsReadBtn: document.getElementById('markAllAnnouncementsReadBtn'),
    openNewAnnouncementBtn: document.getElementById('openNewAnnouncementBtn'),
    announcementsFeedContainer: document.getElementById('announcementsFeedContainer'),
    announcementCategoryChips: document.getElementById('announcementCategoryChips'),
    announcementsSearchInput: document.getElementById('announcementsSearchInput'),
    emptyAnnouncementsState: document.getElementById('emptyAnnouncementsState'),
    announcementsManageContainer: document.getElementById('announcementsManageContainer'),
    filterAnnStatusPublished: document.getElementById('filterAnnStatusPublished'),
    filterAnnStatusDraft: document.getElementById('filterAnnStatusDraft'),
    filterAnnStatusArchived: document.getElementById('filterAnnStatusArchived'),
    announcementsManageTableBody: document.getElementById('announcementsManageTableBody'),
    emptyAnnouncementsManageState: document.getElementById('emptyAnnouncementsManageState'),
    announcementFormModal: document.getElementById('announcementFormModal'),
    announcementFormModalTitle: document.getElementById('announcementFormModalTitle'),
    closeAnnouncementFormModalBtn: document.getElementById('closeAnnouncementFormModalBtn'),
    cancelAnnouncementFormBtn: document.getElementById('cancelAnnouncementFormBtn'),
    announcementForm: document.getElementById('announcementForm'),
    announcementEditId: document.getElementById('announcementEditId'),
    announcementTitleInput: document.getElementById('announcementTitleInput'),
    announcementCategorySelect: document.getElementById('announcementCategorySelect'),
    announcementAudienceSelect: document.getElementById('announcementAudienceSelect'),
    announcementAudienceProgWrap: document.getElementById('announcementAudienceProgWrap'),
    announcementProgSelect: document.getElementById('announcementProgSelect'),
    announcementAudienceRoleWrap: document.getElementById('announcementAudienceRoleWrap'),
    announcementRoleSelect: document.getElementById('announcementRoleSelect'),
    announcementIsPinnedCheck: document.getElementById('announcementIsPinnedCheck'),
    announcementIsUrgentCheck: document.getElementById('announcementIsUrgentCheck'),
    announcementRequiresAckCheck: document.getElementById('announcementRequiresAckCheck'),
    announcementCommentsCheck: document.getElementById('announcementCommentsCheck'),
    announcementPublishAtInput: document.getElementById('announcementPublishAtInput'),
    announcementExpiresAtInput: document.getElementById('announcementExpiresAtInput'),
    announcementBodyText: document.getElementById('announcementBodyText'),
    announcementFilesInput: document.getElementById('announcementFilesInput'),
    saveAnnouncementDraftBtn: document.getElementById('saveAnnouncementDraftBtn'),
    publishAnnouncementBtn: document.getElementById('publishAnnouncementBtn'),
    announcementAuditModal: document.getElementById('announcementAuditModal'),
    closeAnnouncementAuditModalBtn: document.getElementById('closeAnnouncementAuditModalBtn'),
    auditTotalReadCount: document.getElementById('auditTotalReadCount'),
    auditTotalAckCount: document.getElementById('auditTotalAckCount'),
    exportAnnouncementAuditCsvBtn: document.getElementById('exportAnnouncementAuditCsvBtn'),
    announcementAuditTableBody: document.getElementById('announcementAuditTableBody'),

    // Feedback
    feedbackProgrammeName: document.getElementById('feedbackProgrammeName'),
    feedbackForm: document.getElementById('feedbackForm'),
    feedbackCategory: document.getElementById('feedbackCategory'),
    feedbackModuleSelect: document.getElementById('feedbackModuleSelect'),
    feedbackText: document.getElementById('feedbackText'),
    feedbackCharCount: document.getElementById('feedbackCharCount'),
    feedbackIsAnonymousCheckbox: document.getElementById('feedbackIsAnonymousCheckbox'),
    submitFeedbackBtn: document.getElementById('submitFeedbackBtn'),
    feedbackHistoryCard: document.getElementById('feedbackHistoryCard'),
    feedbackHistoryList: document.getElementById('feedbackHistoryList'),
    emptyFeedbackState: document.getElementById('emptyFeedbackState'),
    instructorFeedbackInboxCard: document.getElementById('instructorFeedbackInboxCard'),
    instructorFeedbackProgFilter: document.getElementById('instructorFeedbackProgFilter'),
    filterFeedbackAll: document.getElementById('filterFeedbackAll'),
    filterFeedbackNew: document.getElementById('filterFeedbackNew'),
    filterFeedbackReviewed: document.getElementById('filterFeedbackReviewed'),
    instructorFeedbackList: document.getElementById('instructorFeedbackList'),
    emptyInstructorFeedbackState: document.getElementById('emptyInstructorFeedbackState'),

    // Grade Report
    gradeSummaryText: document.getElementById('gradeSummaryText'),
    gradeAverageDisplay: document.getElementById('gradeAverageDisplay'),
    gradeExamDisplay: document.getElementById('gradeExamDisplay'),
    gradeCompletionDisplay: document.getElementById('gradeCompletionDisplay'),
    learnerGradeSummaryCards: document.getElementById('learnerGradeSummaryCards'),
    learnerGradeEmptyState: document.getElementById('learnerGradeEmptyState'),
    learnerGradeTablesWrap: document.getElementById('learnerGradeTablesWrap'),
    gradeModulesList: document.getElementById('gradeModulesList'),
    gradeTableBody: document.getElementById('gradeTableBody'),
    cohortGradeRosterSection: document.getElementById('cohortGradeRosterSection'),
    cohortRosterProgFilter: document.getElementById('cohortRosterProgFilter'),
    exportCohortCsvBtn: document.getElementById('exportCohortCsvBtn'),
    cohortRosterTableBody: document.getElementById('cohortRosterTableBody'),
    emptyCohortRosterState: document.getElementById('emptyCohortRosterState'),

    // Account Settings
    profileEmail: document.getElementById('profileEmail'),
    profileSignInMethod: document.getElementById('profileSignInMethod'),
    profileRole: document.getElementById('profileRole'),
    profileProgramme: document.getElementById('profileProgramme'),
    profileBranch: document.getElementById('profileBranch'),
    profilePosition: document.getElementById('profilePosition'),
    profileMemberSince: document.getElementById('profileMemberSince'),
    profileVerifiedBadge: document.getElementById('profileVerifiedBadge'),
    settingsAvatarPreview: document.getElementById('settingsAvatarPreview'),
    avatarFileInput: document.getElementById('avatarFileInput'),
    uploadAvatarBtn: document.getElementById('uploadAvatarBtn'),
    removeAvatarBtn: document.getElementById('removeAvatarBtn'),
    avatarFeedback: document.getElementById('avatarFeedback'),
    profileActionsForm: document.getElementById('profileActionsForm'),
    userNameInput: document.getElementById('userNameInput'),
    userPhoneInput: document.getElementById('userPhoneInput'),
    profileDetailsFeedback: document.getElementById('profileDetailsFeedback'),
    saveProfileBtn: document.getElementById('saveProfileBtn'),
    googleUserNotice: document.getElementById('googleUserNotice'),
    emailUserPasswordWrap: document.getElementById('emailUserPasswordWrap'),
    passwordChangeForm: document.getElementById('passwordChangeForm'),
    newPasswordInput: document.getElementById('newPasswordInput'),
    confirmPasswordInput: document.getElementById('confirmPasswordInput'),
    changePasswordBtn: document.getElementById('changePasswordBtn'),
    passwordFeedback: document.getElementById('passwordFeedback'),
    accountSignOutBtn: document.getElementById('accountSignOutBtn'),
    accountSignOutAllBtn: document.getElementById('accountSignOutAllBtn'),
    sessionFeedback: document.getElementById('sessionFeedback'),

    // Quiz Modal
    quizModalOverlay: document.getElementById('quizModalOverlay'),
    quizModalTitle: document.getElementById('quizModalTitle'),
    quizStepText: document.getElementById('quizStepText'),
    quizProgressFill: document.getElementById('quizProgressFill'),
    quizQuestionBody: document.getElementById('quizQuestionBody'),
    quizNextBtn: document.getElementById('quizNextBtn'),
    closeQuizModal: document.getElementById('closeQuizModal'),

    // Doc Viewer Modal
    docViewerModalOverlay: document.getElementById('docViewerModalOverlay'),
    docViewerTitle: document.getElementById('docViewerTitle'),
    docViewerType: document.getElementById('docViewerType'),
    docViewerBody: document.getElementById('docViewerBody'),
    docViewerDownloadBtn: document.getElementById('docViewerDownloadBtn'),
    closeDocViewerModal: document.getElementById('closeDocViewerModal'),
    markDocReadBtn: document.getElementById('markDocReadBtn'),
    docViewerProgress: document.getElementById('docViewerProgress'),

    // Toast
    toastNotification: document.getElementById('toastNotification'),
    toastMessage: document.getElementById('toastMessage'),
    adminUserSearchInput: document.getElementById('adminUserSearchInput'),
    adminSearchUsersBtn: document.getElementById('adminSearchUsersBtn'),
    adminUsersTableBody: document.getElementById('adminUsersTableBody'),
    // Access Gating Screens
    accessPendingScreen: document.getElementById('accessPendingScreen'),
    pendingUserEmail: document.getElementById('pendingUserEmail'),
    pendingRefreshBtn: document.getElementById('pendingRefreshBtn'),
    pendingSignOutBtn: document.getElementById('pendingSignOutBtn'),
    accessRevokedScreen: document.getElementById('accessRevokedScreen'),
    revokedUserEmail: document.getElementById('revokedUserEmail'),
    revokedSignOutBtn: document.getElementById('revokedSignOutBtn'),

    // Admin Users & Access Elements
    adminPendingAlert: document.getElementById('adminPendingAlert'),
    adminPendingAlertTitle: document.getElementById('adminPendingAlertTitle'),
    adminPendingAlertDesc: document.getElementById('adminPendingAlertDesc'),
    adminFilterPendingBtn: document.getElementById('adminFilterPendingBtn'),
    adminTabSingleInviteBtn: document.getElementById('adminTabSingleInviteBtn'),
    adminTabBulkInviteBtn: document.getElementById('adminTabBulkInviteBtn'),
    adminSingleInviteForm: document.getElementById('adminSingleInviteForm'),
    adminInviteEmail: document.getElementById('adminInviteEmail'),
    adminInviteRole: document.getElementById('adminInviteRole'),
    adminInviteProgramme: document.getElementById('adminInviteProgramme'),
    adminInviteProgNote: document.getElementById('adminInviteProgNote'),
    adminSubmitInviteBtn: document.getElementById('adminSubmitInviteBtn'),
    adminBulkInviteSection: document.getElementById('adminBulkInviteSection'),
    adminBulkTextInput: document.getElementById('adminBulkTextInput'),
    adminBulkCsvInput: document.getElementById('adminBulkCsvInput'),
    adminBulkValidateBtn: document.getElementById('adminBulkValidateBtn'),
    adminBulkClearBtn: document.getElementById('adminBulkClearBtn'),
    adminBulkPreviewBox: document.getElementById('adminBulkPreviewBox'),
    adminBulkPreviewTbody: document.getElementById('adminBulkPreviewTbody'),
    adminBulkConfirmBtn: document.getElementById('adminBulkConfirmBtn'),
    adminUsersCountChip: document.getElementById('adminUsersCountChip'),
    adminFilterRole: document.getElementById('adminFilterRole'),
    adminFilterProg: document.getElementById('adminFilterProg'),
    adminFilterStatus: document.getElementById('adminFilterStatus'),
    adminEditUserModal: document.getElementById('adminEditUserModal'),
    adminEditUserId: document.getElementById('adminEditUserId'),
    adminEditUserName: document.getElementById('adminEditUserName'),
    adminEditUserEmail: document.getElementById('adminEditUserEmail'),
    adminEditRoleSelect: document.getElementById('adminEditRoleSelect'),
    adminEditProgSelect: document.getElementById('adminEditProgSelect'),
    adminEditProgNote: document.getElementById('adminEditProgNote'),
    adminSaveEditUserBtn: document.getElementById('adminSaveEditUserBtn'),
    adminCancelEditUserBtn: document.getElementById('adminCancelEditUserBtn'),
    closeAdminEditUserModalBtn: document.getElementById('closeAdminEditUserModalBtn'),

    // Auth Screen Elements
    authScreen: document.getElementById('authScreen'),
    appShell: document.getElementById('appShell'),
    demoBanner: document.getElementById('demoBanner'),
    tabLoginBtn: document.getElementById('tabLoginBtn'),
    tabSignupBtn: document.getElementById('tabSignupBtn'),
    authErrorAlert: document.getElementById('authErrorAlert'),
    authErrorMessage: document.getElementById('authErrorMessage'),
    loginForm: document.getElementById('loginForm'),
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),
    toggleLoginPasswordBtn: document.getElementById('toggleLoginPasswordBtn'),
    loginSubmitBtn: document.getElementById('loginSubmitBtn'),
    signupForm: document.getElementById('signupForm'),
    signupName: document.getElementById('signupName'),
    signupEmail: document.getElementById('signupEmail'),
    signupPassword: document.getElementById('signupPassword'),
    signupConfirmPassword: document.getElementById('signupConfirmPassword'),
    toggleSignupPasswordBtn: document.getElementById('toggleSignupPasswordBtn'),
    signupSubmitBtn: document.getElementById('signupSubmitBtn'),
    googleAuthBtn: document.getElementById('googleAuthBtn'),

    // Top Bar Desktop Search & Dropdown
    userMenuBtn: document.getElementById('userMenuBtn'),
    userDropdownCard: document.getElementById('userDropdownCard'),
    topBarUserName: document.getElementById('topBarUserName'),
    dropdownUserName: document.getElementById('dropdownUserName'),
    dropdownUserEmail: document.getElementById('dropdownUserEmail'),
    dropdownSettingsBtn: document.getElementById('dropdownSettingsBtn'),
    dropdownJdBtn: document.getElementById('dropdownJdBtn'),
    dropdownLogoutBtn: document.getElementById('dropdownLogoutBtn'),
    settingsLogoutBtn: document.getElementById('settingsLogoutBtn'),
    globalSearchInput: document.getElementById('globalSearchInput'),
    profileFullNameDisplay: document.getElementById('profileFullNameDisplay'),

    // Job Descriptions Elements
    navJobDescriptions: document.getElementById('navJobDescriptions'),
    sidebarJdCountBadge: document.getElementById('sidebarJdCountBadge'),
    jdGalleryView: document.getElementById('jdGalleryView'),
    jdsCardsGrid: document.getElementById('jdsCardsGrid'),
    jdVisibleCount: document.getElementById('jdVisibleCount'),
    jdSearchInput: document.getElementById('jdSearchInput'),
    jdFilterChips: document.getElementById('jdFilterChips'),
    jdDetailView: document.getElementById('jdDetailView'),
    backToJdsBtn: document.getElementById('backToJdsBtn'),
    jdDetailCategoryBadge: document.getElementById('jdDetailCategoryBadge'),
    jdDetailHeading: document.getElementById('jdDetailHeading'),
    jdDetailFileName: document.getElementById('jdDetailFileName'),
    downloadJdBtn: document.getElementById('downloadJdBtn'),
    printJdBtn: document.getElementById('printJdBtn'),
    jdDetailHtmlContent: document.getElementById('jdDetailHtmlContent'),
    programmeJdsCard: document.getElementById('programmeJdsCard'),
    programmeJdsChipsList: document.getElementById('programmeJdsChipsList'),
    viewAllJdsFromModBtn: document.getElementById('viewAllJdsFromModBtn'),

    // Desktop Grade Table
    gradeTableBody: document.getElementById('gradeTableBody')
  };

  // ==========================================
  // 4. TOAST NOTIFICATION UTILITY
  // ==========================================

  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    el.toastMessage.textContent = message;
    el.toastNotification.classList.add('show');
    toastTimer = setTimeout(() => {
      el.toastNotification.classList.remove('show');
    }, 2400);
  }

  // ==========================================
  // 5. SIDEBAR CONTROLS
  // ==========================================

  function openSidebar() {
    el.sidebar.classList.add('open');
    el.sidebarOverlay.classList.add('active');
  }

  function closeSidebar() {
    el.sidebar.classList.remove('open');
    el.sidebarOverlay.classList.remove('active');
  }

  el.sidebarToggle.addEventListener('click', openSidebar);
  el.sidebarClose.addEventListener('click', closeSidebar);
  el.sidebarOverlay.addEventListener('click', closeSidebar);
  function navigateToModuleZero() {
    currentModuleIndex = 0;
    expandedModules.add(0);
    switchScreen('module');
    const scrollElem = el.mainContentScroll || document.getElementById('mainContentScroll');
    if (scrollElem) {
      scrollElem.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (el.sidebarBrandHome) {
    el.sidebarBrandHome.addEventListener('click', navigateToModuleZero);
  }
  if (el.topBarBrand) {
    el.topBarBrand.addEventListener('click', navigateToModuleZero);
  }

  // User avatar click opens Account Settings
  el.userMenuBtn.addEventListener('click', () => {
    switchScreen('settings');
  });

  // ==========================================
  // 6. SCREEN SWITCHING LOGIC
  // ==========================================

  function switchScreen(screenKey) {
    clearModuleTimer();
    activeScreen = screenKey;
    closeSidebar();

    // Hide all screens
    Object.keys(el.screens).forEach(key => {
      if (el.screens[key]) {
        el.screens[key].classList.toggle('active', key === screenKey);
      }
    });

    // Update sidebar navigation active highlight
    const navButtons = [
      { btn: el.navJobDescriptions, key: 'jobDescriptions' },
      { btn: el.navCompanyResources, key: 'companyResources' },
      { btn: el.navWrittenExam, key: 'exam' },
      { btn: el.navMessageInstructor, key: 'messages' },
      { btn: el.navChat, key: 'chat' },
      { btn: el.navAnnouncements, key: 'announcements' },
      { btn: el.navFeedback, key: 'feedback' },
      { btn: el.navGrade, key: 'grade' },
      { btn: el.navAccountSettings, key: 'settings' },
      { btn: el.navAdmin, key: 'admin' }
    ];

    navButtons.forEach(({ btn, key }) => {
      if (btn) {
        btn.classList.toggle('active', key === screenKey);
      }
    });

    // Show or hide programme header
    // The video shows Programme Header on Module, Exam, Announcements, Feedback, and Grade Report
    const showHeaderScreens = ['module', 'exam', 'announcements', 'feedback', 'grade'];
    if (showHeaderScreens.includes(screenKey)) {
      el.programmeHeaderCard.style.display = 'block';
    } else {
      el.programmeHeaderCard.style.display = 'none';
    }

    // Synchronize sidebar active module & nav buttons
    renderSidebar();

    // Render screen content
    if (screenKey === 'module') {
      renderModulePage();
    } else if (screenKey === 'jobDescriptions') {
      renderJobDescriptionsScreen();
    } else if (screenKey === 'companyResources') {
      renderCompanyResourcesScreen();
    } else if (screenKey === 'exam') {
      renderExamScreen();
    } else if (screenKey === 'messages') {
      renderMessagesScreen();
    } else if (screenKey === 'chat') {
      renderTeamChatScreen();
    } else if (screenKey === 'announcements') {
      renderAnnouncementsScreen();
    } else if (screenKey === 'feedback') {
      renderFeedbackScreen();
    } else if (screenKey === 'grade') {
      renderGradeReportScreen();
    } else if (screenKey === 'settings') {
      wireAccountSettingsEvents();
      renderAccountSettingsScreen();
    } else if (screenKey === 'admin') {
      renderAdminPortal();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Register sidebar screen navigation events
  if (el.navJobDescriptions) {
    el.navJobDescriptions.addEventListener('click', () => {
      resetJdViewToGallery();
      switchScreen('jobDescriptions');
    });
  }

  
  if (el.navCompanyResources) {
    el.navCompanyResources.addEventListener('click', () => {
      switchScreen('companyResources');
    });
  }

  
  el.navWrittenExam.addEventListener('click', () => switchScreen('exam'));
  el.navMessageInstructor.addEventListener('click', () => switchScreen('messages'));
  el.navChat.addEventListener('click', () => switchScreen('chat'));
  el.navAnnouncements.addEventListener('click', () => switchScreen('announcements'));
  el.navFeedback.addEventListener('click', () => switchScreen('feedback'));
  el.navGrade.addEventListener('click', () => switchScreen('grade'));
  el.navAccountSettings.addEventListener('click', () => switchScreen('settings'));
  if (el.navAdmin) {
    el.navAdmin.addEventListener('click', () => switchScreen('admin'));
  }
  // Admin Users & Access Event Listeners
  if (typeof wireAdminPortalEvents === 'function') wireAdminPortalEvents();

  // Access Gating Screens Handlers
  if (el.pendingRefreshBtn) {
    el.pendingRefreshBtn.addEventListener('click', async () => {
      el.pendingRefreshBtn.disabled = true;
      el.pendingRefreshBtn.textContent = 'Checking...';
      try {
        const sessionUser = await window.DataLayer.getCurrentUser();
        if (sessionUser && sessionUser.id) {
          const profile = await window.DataLayer.getProfile(sessionUser.id);
          if (profile && profile.access_status === 'active') {
            showToast('Access approved! Welcome to Ikaai Academy.');
            await handleSuccessfulAuth({ id: sessionUser.id, email: sessionUser.email, name: profile.full_name });
            return;
          }
        }
        showToast('Your account is still awaiting approval.');
      } catch (err) {
        console.warn('Check access error:', err);
        showToast('Could not check access status.');
      } finally {
        el.pendingRefreshBtn.disabled = false;
        el.pendingRefreshBtn.textContent = 'Check Status';
      }
    });
  }

  
  if (el.pendingSignOutBtn) {
    el.pendingSignOutBtn.addEventListener('click', signOutUser);
  }
  if (el.revokedSignOutBtn) {
    el.revokedSignOutBtn.addEventListener('click', signOutUser);
  }

  // "Show more" toggle on programme header
  el.showMoreToggle.addEventListener('click', () => {
    const isExpanded = el.programmeDescription.classList.toggle('expanded');
    el.showMoreToggle.textContent = isExpanded ? 'Show less' : 'Show more';
  });

  // ==========================================
  // 7. PROGRAMME SELECTOR & SIDEBAR RENDERING
  // ==========================================

  el.programmeSelect.addEventListener('change', (e) => {
    clearModuleTimer();
    currentProgrammeId = e.target.value;
    localStorage.setItem('ikaai_active_programme', currentProgrammeId);
    currentModuleIndex = 0;
    expandedModules = new Set([0]);
    renderAll();
    showToast(`Switched to ${getCurrentProgramme().title}`);
  });

  function getCurrentProgramme() {
    return state.programmes[currentProgrammeId] || state.programmes.hr;
  }

  function calculateProgrammeCompletion(prog) {
    if (!prog || !prog.modules || prog.modules.length === 0) return 100;
    let totalItems = 0;
    let completedItems = 0;

    prog.modules.forEach(m => {
      if (m.resources) {
        m.resources.forEach(r => {
          totalItems++;
          if (r.completed) completedItems++;
        });
      }
      if (m.quiz) {
        totalItems++;
        if (m.quiz.completed) completedItems++;
      }
    });

    if (totalItems === 0) return 100;
    return Math.round((completedItems / totalItems) * 100);
  }

  function renderSidebar() {
    const prog = getCurrentProgramme();
    if (typeof updateSidebarCompanyResourcesBadge === 'function') {
      updateSidebarCompanyResourcesBadge();
    }
    el.programmeSelect.value = prog.id;
    el.sidebarRoleBadge.textContent = prog.roleTag;

    const completionRate = calculateProgrammeCompletion(prog);
    el.sidebarProgressPercent.textContent = `${completionRate}%`;
    el.sidebarProgressBar.style.width = `${completionRate}%`;

    // Render exam status in sidebar
    if (prog.exam && prog.exam.submitted) {
      el.sidebarExamBadge.textContent = 'Submitted';
      el.sidebarExamBadge.classList.add('submitted');
    } else {
      el.sidebarExamBadge.textContent = 'Not submitted';
      el.sidebarExamBadge.classList.remove('submitted');
    }

    // Render modules accordion list
    el.sidebarModulesList.innerHTML = '';
    if (!prog.modules || prog.modules.length === 0) {
      el.sidebarModulesList.innerHTML = '<div style="color: var(--text-muted); font-size: 12px; padding: 8px;">No modules in this programme yet.</div>';
      return;
    }

    prog.modules.forEach((mod, idx) => {
      const isCurrent = (activeScreen === 'module' && idx === currentModuleIndex);
      if (isCurrent) {
        expandedModules.add(idx);
      }
      const isExpanded = expandedModules.has(idx);
      const modCompletion = calculateModuleCompletion(mod);

      const itemDiv = document.createElement('div');
      itemDiv.className = `sidebar-module-item ${isExpanded ? 'expanded' : ''}`;
      itemDiv.dataset.moduleIndex = idx;

      const isSequentialUnlocked = (idx === 0) || Boolean(prog.modules[idx - 1] && calculateModuleCompletion(prog.modules[idx - 1]) >= 80);
      const isTimerUnlocked = isModuleTimerUnlocked(mod);
      const isFullyUnlocked = isSequentialUnlocked && isTimerUnlocked;

      // Accordion header
      const headerBtn = document.createElement('div');
      headerBtn.className = `module-accordion-header ${isCurrent ? 'active' : ''} ${!isSequentialUnlocked ? 'prereq-locked' : ''}`;
      headerBtn.innerHTML = `
        <span class="module-header-title">${mod.title}</span>
        <div class="module-header-right">
          ${!isSequentialUnlocked ? `
            <span class="module-lock-badge" title="Locked: Complete Module ${idx} first">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
          ` : (!isTimerUnlocked ? `
            <span class="module-lock-badge" title="30-second review required">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
          ` : `
            <span class="module-percent-badge ${modCompletion === 100 ? 'complete' : ''}" title="${modCompletion}% completed">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              ${modCompletion}%
            </span>
          `)}
          <span class="module-chevron" title="Open / close resources" role="button" tabindex="0" aria-label="Toggle resources for ${mod.title}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      `;

      // Dedicated click on the side arrow (chevron)
      const chevronBtn = headerBtn.querySelector('.module-chevron');
      if (chevronBtn) {
        chevronBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (expandedModules.has(idx)) {
            expandedModules.delete(idx);
            itemDiv.classList.remove('expanded');
          } else {
            expandedModules.add(idx);
            itemDiv.classList.add('expanded');
          }
        });
        chevronBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            chevronBtn.click();
          }
        });
      }

      // Clicking accordion header switches to that module & opens its resources
      headerBtn.addEventListener('click', (e) => {
        if (activeScreen === 'module' && currentModuleIndex === idx) {
          // If already viewing this module, toggle accordion
          if (expandedModules.has(idx)) {
            expandedModules.delete(idx);
            itemDiv.classList.remove('expanded');
          } else {
            expandedModules.add(idx);
            itemDiv.classList.add('expanded');
          }
        } else {
          // Switch to clicked module and expand it
          currentModuleIndex = idx;
          expandedModules.add(idx);
          switchScreen('module');
        }
      });

      // Accordion body with resource sublinks
      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'module-accordion-body';

      if (mod.resources && mod.resources.length > 0) {
        mod.resources.forEach((res) => {
          const isResDone = isResourceTimerUnlocked(res);
          const isTimerActive = Boolean(activeResourceTimer && activeResourceTimer.resId === res.id);
          const sublink = document.createElement('div');
          sublink.className = `sidebar-resource-sublink ${isTimerActive ? 'timer-active' : ''}`;
          sublink.innerHTML = `
            <div class="sidebar-resource-left">
              <span class="sidebar-res-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </span>
              <span class="sidebar-res-title">${res.title}</span>
            </div>
            ${isResDone ? `
              <div class="completed-check-icon checked" style="width: 14px; height: 14px;" title="Completed">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ` : (isTimerActive ? `
              <span class="res-mini-timer" id="sideResTimer_${res.id}">${activeResourceTimer.remaining}s</span>
            ` : `
              <div class="completed-check-icon timer-locked" style="width: 14px; height: 14px;" title="Review required">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            `)}
          `;

          sublink.addEventListener('click', (e) => {
            e.stopPropagation();
            currentModuleIndex = idx;
            expandedModules.add(idx);
            switchScreen('module');
            // Expand preview of this resource & trigger its timer
            setTimeout(() => {
              const resCard = document.querySelector(`[data-resource-id="${res.id}"]`);
              if (resCard) {
                resCard.classList.add('preview-open');
                resCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (!isResourceTimerUnlocked(res)) {
                  startResourceTimer(res, mod);
                }
              }
            }, 100);
          });

          bodyDiv.appendChild(sublink);
        });
      }

      itemDiv.appendChild(headerBtn);
      itemDiv.appendChild(bodyDiv);
      el.sidebarModulesList.appendChild(itemDiv);
    });
  }

  

  function calculateModuleCompletion(mod) {
    if (!mod) return 0;
    let total = 0;
    let completed = 0;
    if (mod.resources && mod.resources.length > 0) {
      total += mod.resources.length;
      completed += mod.resources.filter(r => r.completed).length;
    }
    if (mod.quiz) {
      total += 1;
      if (mod.quiz.completed) completed += 1;
    }
    if (total === 0) return 100;
    return Math.round((completed / total) * 100);
  }

  // ==========================================
  // 8. MODULE PAGE RENDERING & INTERACTIONS
  // ==========================================


  // ==========================================
  // MODULE TIMER CONTROLLER (30 SECONDS & PAGE VISIBILITY API)
  // ==========================================

  const MODULE_TIMER_SECONDS = 30;
  const TIMER_CIRCUMFERENCE = 113.1; // 2 * PI * 18

  let activeTimerModuleId = null;
  let activeTimerSecondsRemaining = MODULE_TIMER_SECONDS;
  let moduleTimerInterval = null;
  let isTimerPausedDueToVisibility = false;

  // Sub-module Resource Timer (0.1, 0.2, etc.)
  const RESOURCE_TIMER_SECONDS = 15;
  let activeResourceTimer = null; // { resId, modId, remaining, total, interval, paused }

  function getCurrentUserId() {
    return (state.profile && state.profile.email)
      ? state.profile.email.trim().toLowerCase()
      : 'default_user';
  }

  function getModuleTimerStorageKey(moduleId) {
    const userId = getCurrentUserId();
    return `ikaai_timer_${userId}_${currentProgrammeId}_${moduleId}`;
  }

  function getResourceTimerStorageKey(resId) {
    const userId = getCurrentUserId();
    return `ikaai_timer_res_${userId}_${currentProgrammeId}_${resId}`;
  }

  function isModuleTimerUnlocked(mod) {
    if (!mod) return false;
    const key = getModuleTimerStorageKey(mod.id);
    const stored = localStorage.getItem(key);
    if (stored === 'unlocked' || stored === 'completed') return true;
    if (mod.timerUnlocked === true) return true;
    return false;
  }

  function isResourceTimerUnlocked(res) {
    if (!res) return false;
    if (res.completed) return true;
    const key = getResourceTimerStorageKey(res.id);
    const stored = localStorage.getItem(key);
    return stored === 'unlocked' || stored === 'completed';
  }

  function clearResourceTimer() {
    if (activeResourceTimer && activeResourceTimer.interval) {
      clearInterval(activeResourceTimer.interval);
    }
    activeResourceTimer = null;
  }

  function clearModuleTimer() {
    if (moduleTimerInterval) {
      clearInterval(moduleTimerInterval);
      moduleTimerInterval = null;
    }
    clearResourceTimer();
    isTimerPausedDueToVisibility = false;
    activeTimerModuleId = null;
  }

  function startResourceTimer(res, mod) {
    if (!res || !mod) return;
    if (isResourceTimerUnlocked(res)) {
      updateResourceTimerUI(res, 0, RESOURCE_TIMER_SECONDS, false);
      return;
    }

    if (activeResourceTimer && activeResourceTimer.resId === res.id) {
      return; // already running for this resource
    }

    clearResourceTimer();

    activeResourceTimer = {
      resId: res.id,
      modId: mod.id,
      remaining: RESOURCE_TIMER_SECONDS,
      total: RESOURCE_TIMER_SECONDS,
      paused: (document.visibilityState === 'hidden')
    };

    updateResourceTimerUI(res, activeResourceTimer.remaining, activeResourceTimer.total, activeResourceTimer.paused);
    renderSidebar();

    activeResourceTimer.interval = setInterval(() => {
      if (!activeResourceTimer) return;
      if (document.visibilityState === 'hidden') {
        activeResourceTimer.paused = true;
        updateResourceTimerUI(res, activeResourceTimer.remaining, activeResourceTimer.total, true);
        return;
      }

      activeResourceTimer.paused = false;
      activeResourceTimer.remaining--;

      if (activeResourceTimer.remaining > 0) {
        updateResourceTimerUI(res, activeResourceTimer.remaining, activeResourceTimer.total, false);
        const sideBadge = document.getElementById(`sideResTimer_${res.id}`);
        if (sideBadge) sideBadge.textContent = `${activeResourceTimer.remaining}s`;
      } else {
        clearResourceTimer();
        unlockResource(res, mod);
      }
    }, 1000);
  }

  function updateResourceTimerUI(res, remaining, total, isPaused) {
    const wrap = document.getElementById(`resTimer_${res.id}`);
    if (!wrap) return;

    const fill = wrap.querySelector('.res-timer-progress-fill');
    const badgeText = wrap.querySelector('.res-timer-text');
    const headerTitle = wrap.querySelector('.res-timer-title');

    if (remaining <= 0) {
      wrap.className = 'resource-timer-bar-wrap completed';
      if (fill) fill.style.width = '100%';
      if (badgeText) {
        badgeText.innerHTML = `✓ Review Completed`;
      }
      if (headerTitle) headerTitle.textContent = 'Resource unlocked and verified';
    } else {
      wrap.className = `resource-timer-bar-wrap ${isPaused ? 'paused' : ''}`;
      const pct = Math.round(((total - remaining) / total) * 100);
      if (fill) fill.style.width = `${pct}%`;
      if (badgeText) {
        badgeText.innerHTML = `⏱️ ${isPaused ? 'Paused (tab inactive)' : `${remaining}s remaining`}`;
      }
      if (headerTitle) {
        headerTitle.textContent = isPaused ? 'Please switch back to complete review' : 'Active resource review in progress';
      }
    }
  }

  function unlockResource(res, mod) {
    res.completed = true;
    const key = getResourceTimerStorageKey(res.id);
    localStorage.setItem(key, 'unlocked');

    if (window.DataLayer) {
      window.DataLayer.markResourceComplete(res.id).catch(err => {
        console.warn('[DataLayer] markResourceComplete:', err?.message || err);
      });
    }

    saveState();
    updateResourceTimerUI(res, 0, RESOURCE_TIMER_SECONDS, false);

    const card = document.querySelector(`[data-resource-id="${res.id}"]`);
    if (card) {
      const checkBtn = card.querySelector('.completed-check-icon');
      if (checkBtn) {
        checkBtn.classList.remove('timer-locked');
        checkBtn.classList.add('checked');
        checkBtn.title = 'Resource completed';
      }
    }

    renderSidebar();
    showToast(`✓ Completed review: ${res.title}`);
  }

  function updateTimerRingUI(remaining, total, isPaused) {
    const ringCircle = document.getElementById('timerRingCircle');
    const ringCenter = document.getElementById('timerRingCenter');
    const timerCard = document.getElementById('moduleTimerCard');
    const timerTitle = document.getElementById('timerStatusTitle');
    const timerSub = document.getElementById('timerStatusSub');
    if (!ringCircle || !ringCenter || !timerCard) return;

    if (remaining <= 0) {
      // Unlocked state
      timerCard.classList.remove('paused');
      timerCard.classList.add('unlocked');
      ringCircle.style.strokeDashoffset = '0';
      ringCircle.style.stroke = 'var(--accent-primary)';
      ringCenter.innerHTML = `
        <svg class="timer-unlocked-tick" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      if (timerTitle) timerTitle.textContent = 'Unlocked';
      if (timerSub) timerSub.textContent = 'All module actions available';
    } else {
      // Countdown running
      timerCard.classList.remove('unlocked');
      const offset = TIMER_CIRCUMFERENCE * (1 - remaining / total);
      ringCircle.style.strokeDashoffset = String(offset);

      if (isPaused) {
        timerCard.classList.add('paused');
        if (timerTitle) timerTitle.textContent = 'Paused (come back to this tab)';
        if (timerSub) timerSub.textContent = 'Tab not visible';
      } else {
        timerCard.classList.remove('paused');
        if (timerTitle) timerTitle.textContent = 'Time remaining to unlock';
        if (timerSub) timerSub.textContent = 'Please spend at least 30s';
      }

      ringCenter.innerHTML = `<span class="timer-seconds-text">${remaining}s</span>`;
    }
  }

  function startModuleTimer(moduleId) {
    clearModuleTimer();

    const prog = getCurrentProgramme();
    const modules = prog.modules || [];
    const mod = modules.find(m => m.id === moduleId) || modules[currentModuleIndex];
    if (!mod) return;

    // Trigger server-side open timestamp
    if (window.DataLayer) {
      const dbModId = mod.dbId || mod.id;
      window.DataLayer.openModule(dbModId).catch(err => {
        console.warn('[DataLayer] openModule note:', err?.message || err);
      });
    }

    const isUnlocked = isModuleTimerUnlocked(mod);
    const isLastModule = (currentModuleIndex === modules.length - 1);
    const nextBtnLabel = isLastModule ? 'Written Exam ›' : 'Next module ›';

    if (isUnlocked) {
      // Module already unlocked: show completed ring and unlock all features
      updateTimerRingUI(0, MODULE_TIMER_SECONDS, false);
      setModuleControlsLockState(false, mod, nextBtnLabel);
      renderSidebar();
      return;
    }

    // Locked: start fresh 30-second countdown
    activeTimerModuleId = mod.id;
    activeTimerSecondsRemaining = MODULE_TIMER_SECONDS;
    isTimerPausedDueToVisibility = (document.visibilityState === 'hidden');

    const initialNextText = isLastModule
      ? `Written Exam (${activeTimerSecondsRemaining}s)`
      : `Next module (${activeTimerSecondsRemaining}s)`;

    setModuleControlsLockState(true, mod, initialNextText);
    updateTimerRingUI(activeTimerSecondsRemaining, MODULE_TIMER_SECONDS, isTimerPausedDueToVisibility);

    moduleTimerInterval = setInterval(() => {
      if (isTimerPausedDueToVisibility || document.visibilityState === 'hidden') {
        return; // Do NOT decrement timer while user is away from tab
      }

      activeTimerSecondsRemaining--;
      if (activeTimerSecondsRemaining > 0) {
        updateTimerRingUI(activeTimerSecondsRemaining, MODULE_TIMER_SECONDS, false);
        const lockedText = isLastModule
          ? `Written Exam (${activeTimerSecondsRemaining}s)`
          : `Next module (${activeTimerSecondsRemaining}s)`;
        if (el.nextModuleBtn) {
          const span = el.nextModuleBtn.querySelector('span');
          if (span) span.textContent = lockedText;
        }
      } else {
        // Timer reached 0!
        clearModuleTimer();
        unlockCurrentModule(mod);
      }
    }, 1000);
  }

  async function unlockCurrentModule(mod) {
    const dbModId = mod.dbId || mod.id;

    if (window.DataLayer) {
      try {
        await window.DataLayer.completeModuleTimer(dbModId);
      } catch (err) {
        console.warn('[DataLayer] completeModuleTimer check:', err);
        if (err.message && err.message.includes('TIMER_NOT_ELAPSED')) {
          showToast('Server clock verification: Please spend at least 30 seconds');
          return;
        }
      }
    }

    const key = getModuleTimerStorageKey(mod.id);
    localStorage.setItem(key, 'unlocked');
    mod.timerUnlocked = true;
    saveState();

    const prog = getCurrentProgramme();
    const modules = prog.modules || [];
    const isLastModule = (currentModuleIndex === modules.length - 1);
    const nextBtnLabel = isLastModule ? 'Written Exam ›' : 'Next module ›';

    updateTimerRingUI(0, MODULE_TIMER_SECONDS, false);
    setModuleControlsLockState(false, mod, nextBtnLabel);
    renderSidebar();

    showToast('Module unlocked ✓');
  }

  function setModuleControlsLockState(isLocked, mod, nextBtnLabel) {
    // 1. Next module button
    if (el.nextModuleBtn) {
      el.nextModuleBtn.disabled = isLocked;
      el.nextModuleBtn.classList.toggle('timer-locked', isLocked);
      el.nextModuleBtn.title = isLocked ? 'Please spend at least 30 seconds on this module' : '';
      const span = el.nextModuleBtn.querySelector('span');
      if (span && nextBtnLabel) span.textContent = nextBtnLabel;
    }

    // 2. Module quiz button
    if (el.startQuizBtn) {
      el.startQuizBtn.disabled = isLocked;
      el.startQuizBtn.classList.toggle('timer-locked', isLocked);
      el.startQuizBtn.title = isLocked ? 'Please spend at least 30 seconds on this module' : '';
    }

    // 3. Resource tick circles in resources list
    const checkIcons = document.querySelectorAll('.resource-card-item .completed-check-icon');
    checkIcons.forEach(icon => {
      icon.classList.toggle('timer-locked', isLocked);
      icon.title = isLocked ? 'Please spend at least 30 seconds on this module' : 'Mark completion';
    });

    // 4. Fullscreen modal mark read button
    if (el.markDocReadBtn) {
      el.markDocReadBtn.disabled = isLocked;
      el.markDocReadBtn.classList.toggle('timer-locked', isLocked);
      el.markDocReadBtn.title = isLocked ? 'Please spend at least 30 seconds on this module' : '';
    }
  }

  // Page Visibility API - Pause/Resume Timer Automatically
  document.addEventListener('visibilitychange', () => {
    if (activeScreen !== 'module') return;
    const prog = getCurrentProgramme();
    const mod = prog.modules ? prog.modules[currentModuleIndex] : null;

    if (mod && !isModuleTimerUnlocked(mod)) {
      if (document.visibilityState === 'hidden') {
        isTimerPausedDueToVisibility = true;
        updateTimerRingUI(activeTimerSecondsRemaining, MODULE_TIMER_SECONDS, true);
      } else {
        isTimerPausedDueToVisibility = false;
        updateTimerRingUI(activeTimerSecondsRemaining, MODULE_TIMER_SECONDS, false);
      }
    }

    // Sub-resource timer visibility pause/resume
    if (activeResourceTimer && activeResourceTimer.remaining > 0) {
      const isHidden = (document.visibilityState === 'hidden');
      activeResourceTimer.paused = isHidden;
      const res = mod && mod.resources ? mod.resources.find(r => r.id === activeResourceTimer.resId) : null;
      if (res) {
        updateResourceTimerUI(res, activeResourceTimer.remaining, activeResourceTimer.total, isHidden);
      }
    }
  });

  function renderModulePage() {
    const prog = getCurrentProgramme();
    const modules = prog.modules || [];
    const mod = modules[currentModuleIndex];

    if (!mod) {
      el.moduleTitle.textContent = 'No module found';
      return;
    }

    // Header card
    el.programmeTitle.textContent = prog.title;
    el.programmeDescription.textContent = prog.description;
    const dtTitle = document.getElementById('desktopPageTitle');
    if (dtTitle) dtTitle.textContent = prog.title;

    el.moduleTitle.textContent = mod.title;
    el.moduleGradeBadge.textContent = mod.grade || 'No grade yet';

    // Learning Objectives
    el.moduleObjectivesList.innerHTML = '';
    (mod.objectives || []).forEach(obj => {
      const li = document.createElement('li');
      li.textContent = obj;
      el.moduleObjectivesList.appendChild(li);
    });

    // Completion Ratio
    const totalResources = (mod.resources || []).length;
    const completedResources = (mod.resources || []).filter(r => r.completed).length;
    el.moduleCompletedRatio.textContent = `${completedResources} / ${totalResources} completed`;
    const modPercent = totalResources > 0 ? (completedResources / totalResources) * 100 : 100;
    el.moduleProgressBar.style.width = `${modPercent}%`;

    // Feedback Button on top-right of module card
    el.moduleFeedbackBtn.onclick = () => {
      switchScreen('feedback');
      el.feedbackCategory.value = `Module ${mod.indexNumber}: ${mod.title.split('. ')[1] || 'Module'}`;
    };

    // Render Resources
    renderResourcesList(mod);

    // Render Quiz Card
    renderQuizCard(mod);

    // Render FAQs Card
    renderFaqsCard(mod);

    // Render Programme-specific JDs
    renderProgrammeJds(prog.id);

    // Sticky Navigation (Prev / Next) with Timer Guard
    const isLastModule = (currentModuleIndex === modules.length - 1);
    el.prevModuleBtn.disabled = (currentModuleIndex <= 0);
    el.prevModuleBtn.style.opacity = (currentModuleIndex <= 0) ? '0.4' : '1';

    el.prevModuleBtn.onclick = () => {
      if (currentModuleIndex > 0) {
        clearModuleTimer();
        currentModuleIndex--;
        expandedModules.add(currentModuleIndex);
        renderModulePage();
        renderSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    el.nextModuleBtn.onclick = (e) => {
      if (!isModuleTimerUnlocked(mod)) {
        e.preventDefault();
        showToast('Please spend at least 30 seconds on this module');
        return;
      }
      clearModuleTimer();
      if (currentModuleIndex < modules.length - 1) {
        currentModuleIndex++;
        expandedModules.add(currentModuleIndex);
        renderModulePage();
        renderSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        switchScreen('exam');
      }
    };

    // Start 30-Second Module Timer
    startModuleTimer(mod.id);
  }

  function renderResourcesList(mod) {
    el.resourcesList.innerHTML = '';
    (mod.resources || []).forEach(res => {
      const card = document.createElement('div');
      card.className = 'resource-card-item';
      card.dataset.resourceId = res.id;

      // Icon determination
      let iconSvg = '';
      if (res.type === 'Document') {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>`;
      } else if (res.type === 'Image') {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>`;
      } else {
        // PDF
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M9 13v4"></path>
          <path d="M12 11v6"></path>
          <path d="M15 13v4"></path>
        </svg>`;
      }

      card.innerHTML = `
        <div class="resource-row-main">
          <div class="resource-type-icon">
            ${iconSvg}
          </div>
          <div class="resource-meta">
            <span class="resource-title">${res.title}</span>
            <span class="resource-type-text">${res.type}</span>
          </div>
          <div class="resource-actions">
            <button class="download-icon-btn" title="Download ${res.title}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
            <div class="completed-check-icon ${isResourceTimerUnlocked(res) ? 'checked' : 'timer-locked'}" title="${isResourceTimerUnlocked(res) ? 'Completed' : '15s review required'}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <!-- Inline Preview Accordion Drawer -->
        <div class="inline-doc-preview">
          <!-- Resource Review Timer Bar -->
          <div class="resource-timer-bar-wrap ${isResourceTimerUnlocked(res) ? 'completed' : ''}" id="resTimer_${res.id}">
            <div class="res-timer-header">
              <span class="res-timer-title">${isResourceTimerUnlocked(res) ? 'Resource unlocked and verified' : 'Active resource review'}</span>
              <span class="res-timer-badge">
                <span class="res-timer-text">
                  ${isResourceTimerUnlocked(res) ? '✓ Review Completed' : `⏱️ ${RESOURCE_TIMER_SECONDS}s review required`}
                </span>
              </span>
            </div>
            <div class="res-timer-progress-track">
              <div class="res-timer-progress-fill" style="width: ${isResourceTimerUnlocked(res) ? '100%' : '0%'}"></div>
            </div>
          </div>

          <div class="doc-slides-mock">
            <div class="doc-watermark">IKAAI</div>
            <div class="slide-content">
              <h4>${res.title}</h4>
              <p>Official document resource for Ikaai Academy interns.</p>
              ${renderSampleSlidePoints(res)}
            </div>
            ${res.slides && res.slides[0] && res.slides[0].hasTimeline ? `
              <div class="timeline-stages">
                <div class="stage-box stage-1">First Month<br><span style="font-size:8.5px;font-weight:normal;">Role Setup</span></div>
                <div class="stage-arrow">→</div>
                <div class="stage-box stage-2">Second Month<br><span style="font-size:8.5px;font-weight:normal;">Active Contribution</span></div>
                <div class="stage-arrow">→</div>
                <div class="stage-box stage-3">Third Month<br><span style="font-size:8.5px;font-weight:normal;">Top Performance</span></div>
              </div>
            ` : ''}
          </div>
          <div class="inline-preview-controls">
            <button class="fullscreen-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      `;

      // Tap row to toggle inline preview
      const mainRow = card.querySelector('.resource-row-main');
      mainRow.addEventListener('click', (e) => {
        // If clicking download or check icon, do not toggle accordion
        if (e.target.closest('.download-icon-btn') || e.target.closest('.completed-check-icon')) {
          return;
        }
        const willOpen = !card.classList.contains('preview-open');
        card.classList.toggle('preview-open');
        if (willOpen && !isResourceTimerUnlocked(res)) {
          startResourceTimer(res, mod);
        }
      });

      // Download button action
      const dlBtn = card.querySelector('.download-icon-btn');
      dlBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerDownloadResource(res);
      });

      // Checkmark toggle
      const checkBtn = card.querySelector('.completed-check-icon');
      const isResUnlocked = isResourceTimerUnlocked(res);
      if (!isResUnlocked) {
        checkBtn.classList.add('timer-locked');
        checkBtn.title = 'Please review this resource for at least 15 seconds';
      }

      checkBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!isResourceTimerUnlocked(res)) {
          showToast(`Please review "${res.title}" for at least 15 seconds to complete`);
          card.classList.add('preview-open');
          startResourceTimer(res, mod);
          return;
        }
        const newState = !res.completed;
        res.completed = newState;
        if (window.DataLayer && newState) {
          window.DataLayer.markResourceComplete(res.id).catch(err => {
            console.warn('[DataLayer] markResourceComplete:', err?.message || err);
          });
        }
        saveState();
        renderModulePage();
        renderSidebar();
        showToast(res.completed ? `Marked "${res.title}" as complete` : `Marked as incomplete`);
      });

      // Fullscreen button action
      const fsBtn = card.querySelector('.fullscreen-btn');
      fsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDocViewer(res);
      });

      el.resourcesList.appendChild(card);
    });
  }

  

  function getSlidePoints(s, defaultTitle) {
    if (!s) return [];
    let pts = (s.points && s.points.length > 0) ? s.points :
      (s.bullets && s.bullets.length > 0) ? s.bullets :
        (s.items && s.items.length > 0) ? s.items :
          (s.content && Array.isArray(s.content)) ? s.content : [];
    if (!pts || pts.length === 0) {
      pts = [
        `Core operating procedures and frameworks for ${s.title || defaultTitle || 'this module'}.`,
        `Mandatory standards, research protocols, and quality assurance criteria.`,
        `Deliverable checklists and step-by-step implementation milestones.`,
        `Reporting requirements and supervisor sign-off procedures.`
      ];
    }
    return pts;
  }

  function renderSampleSlidePoints(res) {
    const s = res.slides && res.slides[0];
    const points = getSlidePoints(s, res.title);
    return `<ul>${points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cleanPdfText(str) {
    if (!str) return "";
    return String(str).replace(/[\\()]/g, "").replace(/[^\x20-\x7E]/g, " ");
  }

  function findResourceObject(titleOrId, currentProg, allProgs) {
    if (!titleOrId) return null;
    const search = String(titleOrId).toLowerCase().trim();
    if (currentProg && currentProg.modules) {
      for (const m of currentProg.modules) {
        if (m.resources) {
          for (const r of m.resources) {
            if (r.id === titleOrId || r.title.toLowerCase().trim() === search) return r;
          }
        }
      }
    }
    if (allProgs) {
      for (const p of Object.values(allProgs)) {
        if (p.modules) {
          for (const m of p.modules) {
            if (m.resources) {
              for (const r of m.resources) {
                if (r.id === titleOrId || r.title.toLowerCase().trim() === search) return r;
              }
            }
          }
        }
      }
    }
    return null;
  }

  function getResourceSlides(res) {
    let slides = [];
    if (res && res.slides && res.slides.length > 0) {
      slides = [...res.slides];
    } else {
      slides = [
        {
          title: (res && res.title) || "Official Academy Reference Material",
          subtitle: "Core Curriculum & Methodological Standards",
          points: [
            "Comprehensive module guide designed for Ikaai Academy interns.",
            "Review all chapters thoroughly and complete associated assessments.",
            "Follow the standardized formatting guides available in the Academy toolkit.",
            "Contact your instructor if you have specific doubts regarding field implementation."
          ]
        }
      ];
    }

    if (slides.length === 1) {
      const primarySlide = slides[0];
      slides.push({
        title: `${primarySlide.title} — Implementation & Standards`,
        subtitle: "Quality Assurance & Delivery Benchmarks",
        points: [
          "Peer review protocol: all draft findings and deliverables must be vetted before final submission.",
          "Strict version control: maintain files using official naming schemas (v1.0_Final_YYYYMMDD).",
          "Document discrepancies and maintain clear audit trails in designated project drives.",
          "Direct all escalation points and technical queries to your assigned mentor or lead."
        ]
      });
    }
    return slides;
  }

  function generatePurePdfBlob(title, type, slides) {
    const contentOps = [];
    contentOps.push("BT", "/F1 16 Tf", "40 780 Td", `(${cleanPdfText("IKAAI INDIA FOUNDATION - ACADEMY LIBRARY")}) Tj`, "ET");
    contentOps.push("BT", "/F1 14 Tf", "40 755 Td", `(${cleanPdfText(title)}) Tj`, "ET");
    contentOps.push("BT", "/F2 9 Tf", "40 738 Td", `(${cleanPdfText(`Resource: ${type} - Verified 2026 Edition`)}) Tj`, "ET");

    let y = 705;
    slides.forEach((s, sIdx) => {
      if (y < 80) return;
      contentOps.push("BT", "/F1 11 Tf", `40 ${y} Td`, `(${cleanPdfText(`Section ${sIdx + 1}: ${s.title || "Curriculum Overview"}`)}) Tj`, "ET");
      y -= 14;
      if (s.subtitle) {
        contentOps.push("BT", "/F2 9 Tf", `40 ${y} Td`, `(${cleanPdfText(s.subtitle)}) Tj`, "ET");
        y -= 14;
      }
      const bullets = getSlidePoints(s, title);
      bullets.forEach(b => {
        if (y < 60) return;
        const truncated = b.length > 90 ? b.slice(0, 87) + "..." : b;
        contentOps.push("BT", "/F2 9 Tf", `45 ${y} Td`, `(${cleanPdfText("- " + truncated)}) Tj`, "ET");
        y -= 13;
      });
      y -= 8;
    });

    contentOps.push("BT", "/F2 8 Tf", "40 30 Td", `(${cleanPdfText("Ikaai India Foundation - ikaaiindia.in - Official Document")}) Tj`, "ET");

    const streamContent = contentOps.join("\n");
    const streamLen = new TextEncoder().encode(streamContent).length;

    const objects = [
      `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`,
      `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`,
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj`,
      `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`,
      `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`,
      `6 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream\nendobj`
    ];

    let offset = 9;
    const xref = ["0000000000 65535 f "];
    let body = "%PDF-1.4\n";
    for (let i = 0; i < objects.length; i++) {
      xref.push(String(offset).padStart(10, "0") + " 00000 n ");
      body += objects[i] + "\n";
      offset += new TextEncoder().encode(objects[i] + "\n").length;
    }
    const xrefOffset = offset;
    let trailer = `xref\n0 ${objects.length + 1}\n` + xref.join("\n") + "\n";
    trailer += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    return new Blob([body + trailer], { type: "application/pdf" });
  }

  function generateResourcePdf(res) {
    const title = (res && res.title) || "Ikaai Academy Official Curriculum";
    const type = (res && res.type) || "PDF Document";
    const slides = getResourceSlides(res);

    const jsPdfClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    if (!jsPdfClass) {
      return generatePurePdfBlob(title, type, slides);
    }

    try {
      const doc = new jsPdfClass({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 16;
      const contentWidth = pageWidth - (margin * 2);

      function drawHeaderBand() {
        doc.setFillColor(0, 81, 30);
        doc.rect(0, 0, pageWidth, 13, "F");

        doc.setFillColor(0, 165, 68);
        doc.rect(0, 13, pageWidth, 1.5, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(255, 255, 255);
        doc.text("IKAAI INDIA FOUNDATION", margin, 8.5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(220, 245, 230);
        doc.text("ACADEMY LEARNING PORTAL · OFFICIAL CURRICULUM", pageWidth - margin, 8.5, { align: "right" });
      }

      function drawFooter(p, total) {
        doc.setDrawColor(220, 224, 230);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(120, 130, 140);
        doc.text("Ikaai India Foundation · ikaaiindia.in · Internal Learning Repository · Confidential", margin, pageHeight - 7);
        doc.text(`Page ${p} of ${total}`, pageWidth - margin, pageHeight - 7, { align: "right" });
      }

      drawHeaderBand();
      let y = 23;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(12, 14, 18);
      const titleLines = doc.splitTextToSize(title, contentWidth);
      doc.text(titleLines, margin, y);
      y += (titleLines.length * 6.8) + 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(0, 120, 50);
      doc.text(`Resource Type: ${type}   |   Format: Standard Verified PDF   |   Release: 2026 Edition`, margin, y);
      y += 4.5;

      doc.setDrawColor(0, 165, 68);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 7;

      slides.forEach((s, idx) => {
        if (y > pageHeight - 45) {
          doc.addPage();
          drawHeaderBand();
          y = 23;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 81, 30);
        const sTitleLines = doc.splitTextToSize(`Slide ${idx + 1}: ${s.title || "Curriculum Overview"}`, contentWidth - 4);
        doc.text(sTitleLines, margin + 2, y);
        y += (sTitleLines.length * 5.5) + 1.5;

        if (s.subtitle) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.setTextColor(90, 105, 120);
          const sSubLines = doc.splitTextToSize(s.subtitle, contentWidth - 4);
          doc.text(sSubLines, margin + 2, y);
          y += (sSubLines.length * 4.5) + 2;
        }

        const bullets = getSlidePoints(s, title);
        bullets.forEach(b => {
          if (y > pageHeight - 22) {
            doc.addPage();
            drawHeaderBand();
            y = 23;
          }

          doc.setFont("helvetica", "bold");
          doc.setFontSize(8.5);
          doc.setTextColor(0, 165, 68);
          doc.text("•", margin + 3, y);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(8.5);
          doc.setTextColor(30, 41, 59);
          const wrapped = doc.splitTextToSize(b, contentWidth - 10);
          doc.text(wrapped, margin + 8, y);
          y += (wrapped.length * 4.2) + 2;
        });

        if (s.takeaway) {
          if (y > pageHeight - 25) {
            doc.addPage();
            drawHeaderBand();
            y = 23;
          }
          y += 2;
          const takeLines = doc.splitTextToSize(s.takeaway, contentWidth - 46);
          const boxH = Math.max(9, takeLines.length * 4.2 + 4);

          doc.setFillColor(236, 253, 245);
          doc.setDrawColor(167, 243, 208);
          doc.rect(margin + 2, y - 2, contentWidth - 4, boxH, "FD");

          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(6, 95, 70);
          doc.text("EXECUTIVE TAKEAWAY:", margin + 5, y + 2.5);

          doc.setFont("helvetica", "normal");
          doc.setTextColor(4, 120, 87);
          doc.text(takeLines, margin + 42, y + 2.5);
          y += boxH + 4;
        }

        y += 6;
      });

      const totalPages = doc.internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        drawFooter(p, totalPages);
      }

      return doc.output("blob");
    } catch (err) {
      console.warn("jsPDF generation failed, falling back to pure PDF generator:", err);
      return generatePurePdfBlob(title, type, slides);
    }
  }

  function generateResourceDoc(res) {
    const title = (res && res.title) || "Ikaai Academy Official Curriculum";
    const type = (res && res.type) || "Document";
    const slides = getResourceSlides(res);

    let sectionsHtml = "";
    slides.forEach((s, idx) => {
      const bullets = getSlidePoints(s, title);
      sectionsHtml += `
        <div style="border: 1px solid #cbd5e1; background-color: #f8fafc; border-radius: 4px; padding: 14pt 16pt; margin-bottom: 16pt;">
          <h2 style="font-size: 13pt; color: #00511e; margin: 0 0 4pt 0;">Section ${idx + 1}: ${escapeHtml(s.title || "Curriculum Overview")}</h2>
          ${s.subtitle ? `<div style="font-size: 10pt; color: #64748b; font-style: italic; margin-bottom: 8pt;">${escapeHtml(s.subtitle)}</div>` : ""}
          <ul style="margin: 0 0 8pt 16pt; padding: 0;">
            ${bullets.map(b => `<li style="margin-bottom: 4pt; color: #334155;">${escapeHtml(b)}</li>`).join("")}
          </ul>
          ${s.takeaway ? `
            <div style="background-color: #ecfdf5; border-left: 3px solid #00a544; padding: 6pt 10pt; margin-top: 8pt; font-size: 9.5pt; color: #065f46;">
              <strong>Executive Takeaway:</strong> ${escapeHtml(s.takeaway)}
            </div>
          ` : ""}
        </div>
      `;
    });

    const docHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(title)}</title>
        <!--[if gte mso 9]>
        <xml>
        <w:WordDocument>
        <w:View>Print</w:View>
        <w:Zoom>100</w:Zoom>
        <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          body { font-family: Calibri, "Segoe UI", Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 30pt; }
          h1 { font-size: 18pt; color: #ffffff; margin: 0; }
        </style>
      </head>
      <body>
        <div style="background-color: #00511e; color: #ffffff; padding: 16pt 18pt; border-radius: 4px; margin-bottom: 20pt; border-bottom: 4px solid #00a544;">
          <div style="font-size: 9pt; font-weight: bold; letter-spacing: 1px; color: #5ee9b5; text-transform: uppercase;">IKAAI INDIA FOUNDATION · ACADEMY LIBRARY</div>
          <h1 style="font-size: 18pt; color: #ffffff; margin: 6pt 0 4pt 0;">${escapeHtml(title)}</h1>
          <div style="font-size: 9.5pt; color: #e2e8f0;">Resource Type: ${escapeHtml(type)} | Format: Official Document Specification | Release: 2026 Edition</div>
        </div>
        ${sectionsHtml}
        <div style="border-top: 1px solid #e2e8f0; margin-top: 24pt; padding-top: 8pt; font-size: 8.5pt; color: #94a3b8; text-align: center;">
          Ikaai India Foundation · ikaaiindia.in · Internal Learning Portal · All Rights Reserved
        </div>
      </body>
      </html>
    `;

    return new Blob([docHtml], { type: "application/msword;charset=utf-8" });
  }

  async function triggerDownloadResource(resOrTitle, fallbackExt) {
    let res = null;
    let title = "";
    let ext = "PDF";

    if (typeof resOrTitle === "object" && resOrTitle !== null) {
      res = resOrTitle;
      title = res.title || "Ikaai Academy Resource";
      ext = (res.fileExt || fallbackExt || "PDF").toUpperCase();
    } else if (typeof resOrTitle === "string") {
      title = resOrTitle;
      ext = (fallbackExt || "PDF").toUpperCase();
      res = findResourceObject(title, state ? state.programmes[currentProgrammeId] : null, state ? state.programmes : INITIAL_DATA.programmes);
      if (!res) {
        res = {
          title: title,
          fileExt: ext,
          type: ext === "DOC" ? "Document" : ext === "PPT" ? "Presentation" : "PDF"
        };
      }
    }

    // 1. Try downloading real file from Supabase storage bucket (course-files)
    if (res && res.storage_path && window.DataLayer) {
      try {
        const signedUrl = await window.DataLayer.getResourceSignedUrl(res.storage_path);
        if (signedUrl) {
          const headRes = await fetch(signedUrl, { method: 'HEAD' });
          if (headRes.ok && headRes.status < 400) {
            const fileName = res.storage_path.split('/').pop() || `${title}.${ext.toLowerCase()}`;
            const a = document.createElement('a');
            a.href = signedUrl;
            a.download = fileName;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast(`Downloading ${fileName}... ✓`);
            return;
          }
        }
      } catch (err) {
        console.warn('[StorageDownload] Storage check failed:', err);
      }
      showToast('File not uploaded yet', 'warning');
    }

    // 2. Fallback to generating local document summary
    const safeFilename = title.replace(/[^a-zA-Z0-9_-]/g, "_");
    let blob = null;
    let downloadFilename = "";

    if (ext === "DOC" || ext === "DOCX") {
      blob = generateResourceDoc(res);
      downloadFilename = `${safeFilename}.doc`;
    } else {
      blob = generateResourcePdf(res);
      downloadFilename = `${safeFilename}.pdf`;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      try { URL.revokeObjectURL(url); } catch (e) { }
    }, 4000);

    showToast(`Downloaded summary ${downloadFilename} ✓`);
  }

  // Alias for backward compatibility
  const triggerFakeDownload = triggerDownloadResource;
  window.triggerFakeDownload = triggerDownloadResource;
  window.triggerDownloadResource = triggerDownloadResource;

  // ==========================================
  // 9. MODULE QUIZ COMPONENT & MODAL
  // ==========================================

  function renderQuizCard(mod) {
    if (!mod.quiz) {
      el.quizTitle.textContent = 'No quiz for this module';
      el.quizStatus.textContent = 'None required';
      el.startQuizBtn.style.display = 'none';
      el.quizStatusIcon.style.display = 'none';
      return;
    }

    el.quizTitle.textContent = mod.quizTitle || 'Module Assessment';
    if (mod.quiz.completed) {
      el.quizStatus.textContent = `Completed · Score ${mod.quiz.score}/${mod.quiz.total}`;
      el.startQuizBtn.textContent = 'Retake quiz';
      el.quizStatusIcon.classList.add('checked');
    } else {
      el.quizStatus.textContent = 'Not started';
      el.startQuizBtn.textContent = 'Start quiz';
      el.quizStatusIcon.classList.remove('checked');
    }

    el.startQuizBtn.style.display = 'inline-flex';
    el.quizStatusIcon.style.display = 'inline-flex';

    const isUnlocked = isModuleTimerUnlocked(mod);
    if (!isUnlocked) {
      el.startQuizBtn.disabled = true;
      el.startQuizBtn.classList.add('timer-locked');
      el.startQuizBtn.title = 'Please spend at least 30 seconds on this module';
    } else {
      el.startQuizBtn.disabled = false;
      el.startQuizBtn.classList.remove('timer-locked');
      el.startQuizBtn.title = '';
    }

    el.startQuizBtn.onclick = () => {
      if (!isModuleTimerUnlocked(mod)) {
        showToast('Please spend at least 30 seconds on this module');
        return;
      }
      openQuizModal(mod);
    };
  }

  async function openQuizModal(mod) {
    let quizData = null;
    const dbModId = mod.dbId || mod.id;

    if (window.DataLayer) {
      try {
        quizData = await window.DataLayer.getQuizForModule(dbModId);
      } catch (err) {
        console.warn('[DataLayer] getQuizForModule error:', err);
      }
    }

    if (quizData && quizData.questions && quizData.questions.length > 0) {
      activeQuizState = {
        module: mod,
        quizId: quizData.id,
        questionIndex: 0,
        score: 0,
        total: quizData.questions.length,
        questions: quizData.questions,
        userAnswers: [],
        isServerScored: true
      };
      el.quizModalTitle.textContent = quizData.title || mod.quizTitle;
    } else {
      if (!mod.quiz || !mod.quiz.questions || mod.quiz.questions.length === 0) {
        showToast('No questions configured for this quiz.');
        return;
      }
      activeQuizState = {
        module: mod,
        questionIndex: 0,
        score: 0,
        total: mod.quiz.questions.length,
        questions: mod.quiz.questions,
        userAnswers: [],
        isServerScored: false
      };
      el.quizModalTitle.textContent = mod.quizTitle;
    }

    el.quizModalOverlay.style.display = 'flex';
    renderQuizCurrentQuestion();
  }

  function renderQuizCurrentQuestion() {
    const qState = activeQuizState;
    const questions = qState.questions || qState.module.quiz.questions;
    const q = questions[qState.questionIndex];

    el.quizStepText.textContent = `Question ${qState.questionIndex + 1} of ${qState.total}`;
    const percent = ((qState.questionIndex + 1) / qState.total) * 100;
    el.quizProgressFill.style.width = `${percent}%`;

    el.quizNextBtn.disabled = true;
    el.quizNextBtn.textContent = (qState.questionIndex === qState.total - 1) ? 'Submit Quiz' : 'Next Question';

    const optsHtml = qState.isServerScored
      ? (q.options || []).map((opt, i) => `
          <button class="quiz-opt-btn" data-opt-id="${opt.id}" data-index="${i}">
            <span class="opt-prefix">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt.option_text}</span>
          </button>
        `).join('')
      : (q.options || []).map((opt, i) => `
          <button class="quiz-opt-btn" data-index="${i}">
            <span class="opt-prefix">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt}</span>
          </button>
        `).join('');

    el.quizQuestionBody.innerHTML = `
      <p class="quiz-prompt">${q.question}</p>
      <div class="quiz-options-list" id="quizOptionsList">
        ${optsHtml}
      </div>
      <div id="quizFeedbackBox" class="quiz-feedback-box" style="display: none;"></div>
    `;

    const optButtons = el.quizQuestionBody.querySelectorAll('.quiz-opt-btn');
    const feedbackBox = document.getElementById('quizFeedbackBox');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.dataset.index, 10);
        optButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        if (qState.isServerScored) {
          const optId = btn.dataset.optId;
          qState.userAnswers[qState.questionIndex] = {
            question_id: q.id,
            option_id: optId
          };
        } else {
          const isCorrect = (selectedIdx === q.correctIndex);
          optButtons.forEach(b => b.disabled = true);
          if (isCorrect) {
            btn.classList.add('correct');
            qState.score++;
          } else {
            btn.classList.add('incorrect');
            if (optButtons[q.correctIndex]) optButtons[q.correctIndex].classList.add('correct');
          }
        }

        if (el.quizNextBtn) el.quizNextBtn.disabled = false;
      });
    });
  }

  

  if (el.quizNextBtn) el.quizNextBtn.addEventListener('click', () => {
    const qState = activeQuizState;
    if (qState.questionIndex < qState.total - 1) {
      qState.questionIndex++;
      renderQuizCurrentQuestion();
    } else {
      // Completed quiz!
      finishQuiz();
    }
  });

  async function finishQuiz() {
    const qState = activeQuizState;
    let finalScore = 0;
    let total = qState.total;
    let percentage = 0;
    let passed = false;

    if (qState.isServerScored && window.DataLayer) {
      try {
        const result = await window.DataLayer.submitQuiz(qState.quizId, qState.userAnswers);
        finalScore = result.score;
        total = result.total;
        percentage = result.percentage;
        passed = result.passed;
      } catch (err) {
        console.warn('[DataLayer] submitQuiz error:', err);
        finalScore = qState.userAnswers.length;
        percentage = Math.round((finalScore / total) * 100);
        passed = percentage >= 80;
      }
    } else {
      finalScore = qState.score;
      percentage = Math.round((finalScore / total) * 100);
      passed = percentage >= 80;
    }

    let gradeStr = 'A (100%)';
    if (percentage >= 90) gradeStr = `A (${percentage}%)`;
    else if (percentage >= 80) gradeStr = `B (${percentage}%)`;
    else if (percentage >= 70) gradeStr = `C (${percentage}%)`;
    else gradeStr = `Needs Retake (${percentage}%)`;

    if (qState.module && qState.module.quiz) {
      qState.module.quiz.completed = passed;
      qState.module.quiz.score = finalScore;
      qState.module.quiz.total = total;
      qState.module.grade = gradeStr;
    }
    saveState();

    el.quizQuestionBody.innerHTML = `
      <div style="text-align: center; padding: 20px 10px; display: flex; flex-direction: column; align-items: center; gap: 12px;">
        <div class="success-icon-circle" style="width: 56px; height: 56px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="font-size: 18px; font-weight: 800;">Quiz Completed!</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px;">Your Final Score: <strong>${finalScore} / ${total} (${percentage}%)</strong></p>
        <div class="role-badge" style="background-color: rgba(0, 165, 68, 0.15); border-color: rgba(0, 165, 68, 0.3); color: var(--accent-light); font-size: 12px; padding: 4px 12px;">
          Grade Awarded: ${gradeStr}
        </div>
        <p style="color: var(--text-muted); font-size: 12px; margin-top: 6px;">Your grade has been saved and updated on your Grade Report.</p>
      </div>
    `;

    el.quizNextBtn.textContent = 'Close & Return';
    el.quizNextBtn.onclick = () => {
      closeQuizModalWindow();
      renderModulePage();
      renderSidebar();
    };
  }

  function closeQuizModalWindow() {
    el.quizModalOverlay.style.display = 'none';
    activeQuizState = null;
  }

  if (el.closeQuizModal) el.closeQuizModal.addEventListener('click', closeQuizModalWindow);

  // ==========================================
  // 10. FAQS COMPONENT
  // ==========================================

  function renderFaqsCard(mod) {
    const faqs = mod.faqs || [];
    const readCount = faqs.filter(f => f.read).length;
    el.faqsSubtitle.textContent = `Common questions and answers for this module. ${readCount} / ${faqs.length} read.`;

    if (faqs.length > 0 && readCount === faqs.length) {
      el.faqsCompletedIcon.classList.add('checked');
    } else {
      el.faqsCompletedIcon.classList.remove('checked');
    }

    el.faqsList.innerHTML = '';
    faqs.forEach((faq, idx) => {
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = `
        <div class="faq-header">
          <div class="faq-number-badge">${idx + 1}</div>
          <div class="faq-question-text">${faq.q}</div>
          <div class="faq-right">
            <div class="completed-check-icon ${faq.read ? 'checked' : ''}" style="width: 16px; height: 16px;">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="faq-chevron">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>
        <div class="faq-answer">${faq.a}</div>
      `;

      item.querySelector('.faq-header').addEventListener('click', () => {
        const isExpanded = item.classList.toggle('expanded');
        if (isExpanded && !faq.read) {
          faq.read = true;
          saveState();
          // Update checkmark
          item.querySelector('.completed-check-icon').classList.add('checked');
          const newReadCount = faqs.filter(f => f.read).length;
          el.faqsSubtitle.textContent = `Common questions and answers for this module. ${newReadCount} / ${faqs.length} read.`;
          if (newReadCount === faqs.length) el.faqsCompletedIcon.classList.add('checked');
        }
      });

      el.faqsList.appendChild(item);
    });
  }

  

  // ==========================================
  // 11. FULLSCREEN DOCUMENT VIEWER MODAL
  // ==========================================

  let currentViewingDoc = null;
  async function openDocViewer(res) {
    currentViewingDoc = res;
    const modal = el.docViewerModalOverlay || document.getElementById('docViewerModalOverlay');
    const titleEl = el.docViewerTitle || document.getElementById('docViewerTitle');
    const typeEl = el.docViewerType || document.getElementById('docViewerType');
    const bodyEl = el.docViewerBody || document.getElementById('docViewerBody');
    const progressEl = el.docViewerProgress || document.getElementById('docViewerProgress');

    if (!modal) {
      console.error('[DocViewer] Modal overlay element not found in DOM.');
      return;
    }

    if (titleEl) titleEl.textContent = res.title;
    if (typeEl) typeEl.textContent = (res.type || 'Document').toUpperCase();
    modal.style.display = 'flex';

    if (!bodyEl) return;

    // Show initial loading state while querying Supabase signed URL
    bodyEl.innerHTML = `
      <div class="doc-viewer-loading-state">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Loading study material...</span>
      </div>
    `;

    // Check signed URL from Supabase private course-files bucket
    let signedUrl = null;
    let fileExistsInStorage = false;

    if (res.storage_path && window.DataLayer) {
      try {
        signedUrl = await window.DataLayer.getResourceSignedUrl(res.storage_path);
        if (signedUrl) {
          const headRes = await fetch(signedUrl, { method: 'HEAD' });
          if (headRes.ok && headRes.status < 400) {
            fileExistsInStorage = true;
          }
        }
      } catch (err) {
        console.warn('[DocViewer] Could not verify signed URL:', err);
        fileExistsInStorage = false;
      }
    }

    bodyEl.innerHTML = '';

    // If file exists in course storage bucket, display it
    if (fileExistsInStorage && signedUrl) {
      const lowerType = (res.type || '').toLowerCase();
      const ext = (res.storage_path || '').split('.').pop().toLowerCase();

      if (lowerType === 'pdf' || ext === 'pdf') {
        const frameWrap = document.createElement('div');
        frameWrap.innerHTML = `
          <iframe src="${signedUrl}" class="doc-viewer-iframe" title="${res.title}"></iframe>
        `;
        bodyEl.appendChild(frameWrap);
      } else if (lowerType === 'image' || ['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
        const imgWrap = document.createElement('div');
        imgWrap.style.textAlign = 'center';
        imgWrap.style.padding = '16px';
        imgWrap.innerHTML = `
          <img src="${signedUrl}" alt="${res.title}" style="max-width: 100%; max-height: 60vh; border-radius: var(--radius-md); box-shadow: var(--shadow-card);">
        `;
        bodyEl.appendChild(imgWrap);
      } else {
        // Document / Presentation
        const fileCard = document.createElement('div');
        fileCard.className = 'doc-file-card';
        const fileName = res.storage_path.split('/').pop();
        fileCard.innerHTML = `
          <div style="font-size: 38px; margin-bottom: 8px;">📑</div>
          <h4 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${res.title}</h4>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
            Official course file: <code>${fileName}</code>
          </p>
          <a href="${signedUrl}" download="${fileName}" target="_blank" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: var(--radius-full); text-decoration: none; font-weight: 600; font-size: 13px; color: #fff; background: var(--accent-primary);">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download ${res.type ? res.type.toUpperCase() : 'FILE'}
          </a>
        `;
        bodyEl.appendChild(fileCard);
      }
    } else {
      // CLEAR USER-FACING MESSAGE: File not uploaded yet
      const notUploadedDiv = document.createElement('div');
      notUploadedDiv.className = 'file-not-uploaded-state';
      notUploadedDiv.innerHTML = `
        <div class="file-not-uploaded-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h3 class="file-not-uploaded-title">File not uploaded yet</h3>
        <p class="file-not-uploaded-desc">
          The file for <strong>${res.title}</strong> has not been uploaded to the course storage bucket yet.
        </p>
        <div class="file-not-uploaded-path-box">
          <span class="path-label">Expected bucket path:</span>
          <code>course-files/${res.storage_path || 'not-assigned'}</code>
        </div>
      `;
      bodyEl.appendChild(notUploadedDiv);
      showToast('File not uploaded yet');
    }

    // Append curriculum study slides below for reference
    let slides = [];
    if (res.slides && res.slides.length > 0) {
      slides = [...res.slides];
    } else {
      slides = [
        {
          title: res.title,
          subtitle: 'Official Academy Reference Material',
          points: [
            'Comprehensive module guide designed for Ikaai Academy interns.',
            'Review all chapters thoroughly and complete associated assessments.',
            'Follow the standardized formatting guides available in the Academy toolkit.',
            'Contact your instructor if you have specific doubts regarding field implementation.'
          ]
        }
      ];
    }

    if (slides.length === 1) {
      const primarySlide = slides[0];
      slides.push({
        title: `${primarySlide.title} — Implementation & Standards`,
        subtitle: 'Quality Assurance & Delivery Benchmarks',
        points: [
          'Peer review protocol: all draft findings and deliverables must be vetted before final submission.',
          'Strict version control: maintain files using official naming schemas (v1.0_Final_YYYYMMDD).',
          'Document discrepancies and maintain clear audit trails in designated project drives.',
          'Direct all escalation points and technical queries to your assigned mentor or lead.'
        ]
      });
    }

    slides.forEach((s, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'doc-viewer-slide';
      const points = getSlidePoints(s, res.title);

      slideDiv.innerHTML = `
        <div class="slide-header-bar">
          <span class="slide-logo-badge">IKAAI INDIA FOUNDATION</span>
          <span class="slide-num-badge">SLIDE ${idx + 1} OF ${slides.length}</span>
        </div>
        <div class="slide-content">
          <h4>${s.title}</h4>
          <p class="slide-subtitle">${s.subtitle || 'Standard Operating Document'}</p>
          <ul class="slide-points-list">
            ${points.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        ${s.hasTimeline ? `
          <div class="timeline-stages" style="margin-top: 14px;">
            <div class="stage-box stage-1">First Month<br><span style="font-size:9px;font-weight:normal;">Getting Started in Your Role</span></div>
            <div class="stage-arrow">→</div>
            <div class="stage-box stage-2">Second Month<br><span style="font-size:9px;font-weight:normal;">Active Contribution</span></div>
            <div class="stage-arrow">→</div>
            <div class="stage-box stage-3">Third Month<br><span style="font-size:9px;font-weight:normal;">Top Performance</span></div>
          </div>
        ` : ''}
      `;
      bodyEl.appendChild(slideDiv);
    });

    if (progressEl) {
      progressEl.textContent = fileExistsInStorage ? `Course file loaded · 100% completed` : `Notice: File not uploaded yet · Study notes loaded`;
    }
  }

  if (el.markDocReadBtn) el.markDocReadBtn.addEventListener('click', () => {
    const prog = getCurrentProgramme();
    const currentMod = prog.modules ? prog.modules[currentModuleIndex] : null;
    if (currentMod && !isModuleTimerUnlocked(currentMod)) {
      showToast('Please spend at least 30 seconds on this module');
      return;
    }
    if (currentViewingDoc) {
      currentViewingDoc.completed = true;
      saveState();
      renderModulePage();
      renderSidebar();
      showToast(`Marked "${currentViewingDoc.title}" as read ✓`);
      const modal = el.docViewerModalOverlay || document.getElementById('docViewerModalOverlay');
      if (modal) modal.style.display = 'none';
    }
  });

  const docModal = el.docViewerModalOverlay || document.getElementById('docViewerModalOverlay');
  if (docModal) {
    docModal.addEventListener('click', (e) => {
      if (e.target === docModal) docModal.style.display = 'none';
    });
  }

  

  const closeDocBtn = el.closeDocViewerModal || document.getElementById('closeDocViewerModal');
  if (closeDocBtn) {
    closeDocBtn.addEventListener('click', () => {
      const modal = el.docViewerModalOverlay || document.getElementById('docViewerModalOverlay');
      if (modal) modal.style.display = 'none';
    });
  }

  

  const downloadDocBtn = el.docViewerDownloadBtn || document.getElementById('docViewerDownloadBtn');
  if (downloadDocBtn) {
    downloadDocBtn.addEventListener('click', () => {
      if (currentViewingDoc) {
        triggerDownloadResource(currentViewingDoc);
      }
    });
  }

  

  // ==========================================
  // 12. WRITTEN EXAM SCREEN CONTROLLER
  // ==========================================

  let currentExamQuestions = [];
  let currentExamSubmission = null;
  let instructorExamSubmissions = [];
  let instructorExamFilter = 'all'; // 'all' | 'pending' | 'graded'
  let instructorExamProgSelected = '';

  async function renderExamScreen() {
    const prog = getCurrentProgramme();
    const dbProgId = getProgrammeDbId(currentProgrammeId);
    if (el.programmeTitle) el.programmeTitle.textContent = prog.title;
    if (el.programmeDescription) el.programmeDescription.textContent = prog.description;

    const userRole = state.profile?.role || 'intern';
    const isStaff = (userRole === 'instructor' || userRole === 'admin');

    // 1. Load Real Questions from DB
    if (window.DataLayer) {
      try {
        const dbQuestions = await window.DataLayer.getExamQuestions(dbProgId);
        if (dbQuestions && dbQuestions.length > 0) {
          currentExamQuestions = dbQuestions.map(q => ({
            id: q.id,
            title: q.question,
            prompt: q.prompt,
            max_marks: q.max_marks || 25,
            placeholder: 'Type your detailed analysis and response here...'
          }));
        } else if (prog.exam && prog.exam.questions) {
          currentExamQuestions = prog.exam.questions;
        }
      } catch (err) {
        console.warn('[DataLayer] Error loading exam questions:', err);
      }
    }

    // 2. Load Learner's Submission from DB
    if (window.DataLayer) {
      try {
        currentExamSubmission = await window.DataLayer.getExamSubmission(dbProgId);
      } catch (err) {
        console.warn('[DataLayer] getExamSubmission error:', err);
      }
    }

    // Determine state
    const status = currentExamSubmission?.status || (prog.exam?.submitted ? 'submitted' : 'not_submitted');
    const allowRetake = !!currentExamSubmission?.allow_retake;

    // Reset visibility
    if (el.examForm) el.examForm.style.display = 'none';
    if (el.examIntroSection) el.examIntroSection.style.display = 'none';
    if (el.examSubmittedNotice) el.examSubmittedNotice.style.display = 'none';
    if (el.examGradedDetails) el.examGradedDetails.style.display = 'none';
    if (el.retakeExamBtn) el.retakeExamBtn.style.display = allowRetake ? 'inline-flex' : 'none';

    if (status === 'draft') {
      if (el.examStatusPill) {
        el.examStatusPill.textContent = 'Draft (In Progress)';
        el.examStatusPill.className = 'exam-pill';
        el.examStatusPill.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
        el.examStatusPill.style.color = '#f59e0b';
      }
      if (el.examIntroSection) {
        el.examIntroSection.style.display = 'flex';
        if (el.examPromptSubtitle) el.examPromptSubtitle.textContent = 'You have a saved exam draft. Resume when ready.';
      }
      if (el.startExamBtn) el.startExamBtn.textContent = 'Resume Exam Draft';
    } else if (status === 'submitted') {
      if (el.examStatusPill) {
        el.examStatusPill.textContent = 'Submitted · Under Review';
        el.examStatusPill.className = 'exam-pill submitted';
        el.examStatusPill.style.backgroundColor = '';
        el.examStatusPill.style.color = '';
      }
      if (el.examSubmittedNotice) {
        el.examSubmittedNotice.style.display = 'flex';
        if (el.examSubmittedTitle) el.examSubmittedTitle.textContent = 'Exam Submitted · Under Review';
        if (el.examSubmittedDesc) el.examSubmittedDesc.textContent = 'Your responses have been securely submitted to your instructor for evaluation. Once graded, your final score and qualitative feedback will appear here and in your Grade Report.';
      }
    } else if (status === 'graded') {
      if (el.examStatusPill) {
        const gradeText = currentExamSubmission.grade || `${currentExamSubmission.score}%`;
        el.examStatusPill.textContent = `Graded (${gradeText})`;
        el.examStatusPill.className = 'exam-pill submitted';
        el.examStatusPill.style.backgroundColor = '';
        el.examStatusPill.style.color = '';
      }
      if (el.examSubmittedNotice) {
        el.examSubmittedNotice.style.display = 'flex';
        if (el.examSubmittedTitle) el.examSubmittedTitle.textContent = 'Examination Evaluated & Graded';
        if (el.examSubmittedDesc) el.examSubmittedDesc.textContent = 'Your instructor has reviewed and graded your submission.';
      }
      if (el.examGradedDetails) {
        el.examGradedDetails.style.display = 'block';
        if (el.examFinalGradeBadge) {
          el.examFinalGradeBadge.textContent = currentExamSubmission.grade ? `${currentExamSubmission.grade} (${currentExamSubmission.score || 0}%)` : `${currentExamSubmission.score || 0}%`;
        }
        if (el.examInstructorComment) {
          el.examInstructorComment.textContent = currentExamSubmission.instructor_comment || 'No specific instructor comment provided.';
        }
      }
    } else {
      // not_submitted
      if (el.examStatusPill) {
        el.examStatusPill.textContent = 'Not submitted';
        el.examStatusPill.className = 'exam-pill';
        el.examStatusPill.style.backgroundColor = '';
        el.examStatusPill.style.color = '';
      }
      if (el.examIntroSection) {
        el.examIntroSection.style.display = 'flex';
        if (el.examPromptSubtitle) el.examPromptSubtitle.textContent = 'End of programme written examination';
      }
      if (el.startExamBtn) el.startExamBtn.textContent = 'Start Exam';
    }

    // 3. Instructor & Admin Submissions Review Card
    if (isStaff && el.instructorExamReviewSection) {
      el.instructorExamReviewSection.style.display = 'block';
      await renderInstructorExamSubmissions();
    } else if (el.instructorExamReviewSection) {
      el.instructorExamReviewSection.style.display = 'none';
    }
  }

  // Helper to open exam form for editing
  function openExamFormForEditing(savedAnswers = {}) {
    if (!el.examForm || !el.examQuestionsContainer) return;
    if (el.examIntroSection) el.examIntroSection.style.display = 'none';
    if (el.examSubmittedNotice) el.examSubmittedNotice.style.display = 'none';
    el.examForm.style.display = 'flex';

    if (el.submitExamBtn) el.submitExamBtn.style.display = 'inline-flex';
    if (el.saveDraftExamBtn) el.saveDraftExamBtn.style.display = 'inline-flex';
    if (el.cancelExamBtn) el.cancelExamBtn.textContent = 'Back to Overview';

    el.examQuestionsContainer.innerHTML = '';
    (currentExamQuestions || []).forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'exam-question-item';
      qDiv.style.marginBottom = '20px';

      const existingVal = savedAnswers[q.id] || '';
      const charCount = existingVal.length;

      qDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <label class="exam-q-title" for="ans_${q.id}" style="font-weight: 700; font-size: 14.5px;">Question ${idx + 1}: ${q.title}</label>
          <span style="font-size: 11.5px; color: var(--accent-light); font-weight: 600;">Max Marks: ${q.max_marks}</span>
        </div>
        <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 8px;">${q.prompt}</p>
        <textarea id="ans_${q.id}" class="exam-textarea form-text-input" rows="6" maxlength="2000" placeholder="${q.placeholder || 'Type your detailed response here (max 2000 chars)...'}" required style="resize: vertical; width: 100%;">${existingVal}</textarea>
        <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
          <span class="field-char-counter" id="counter_ans_${q.id}" style="font-size: 11px; color: var(--text-muted);">${charCount} / 2000</span>
        </div>
      `;
      el.examQuestionsContainer.appendChild(qDiv);

      const textarea = qDiv.querySelector(`#ans_${q.id}`);
      const counter = qDiv.querySelector(`#counter_ans_${q.id}`);
      if (textarea && counter) {
        textarea.addEventListener('input', () => {
          counter.textContent = `${textarea.value.length} / 2000`;
        });
      }
    });
  }

  

  // Start / Resume Exam Button
  if (el.startExamBtn) {
    el.startExamBtn.addEventListener('click', () => {
      const savedAnswers = {};
      if (currentExamSubmission?.exam_answers) {
        currentExamSubmission.exam_answers.forEach(a => {
          savedAnswers[a.question_id] = a.answer_text;
        });
      }
      openExamFormForEditing(savedAnswers);
    });
  }

  

  // Cancel Exam / Back to Overview
  if (el.cancelExamBtn) {
    el.cancelExamBtn.addEventListener('click', () => {
      renderExamScreen();
    });
  }

  

  // Save Draft Exam
  if (el.saveDraftExamBtn) {
    el.saveDraftExamBtn.addEventListener('click', async () => {
      const dbProgId = getProgrammeDbId(currentProgrammeId);
      const answersMap = {};
      (currentExamQuestions || []).forEach(q => {
        const field = document.getElementById(`ans_${q.id}`);
        if (field) {
          answersMap[q.id] = field.value.trim();
        }
      });

      try {
        el.saveDraftExamBtn.disabled = true;
        el.saveDraftExamBtn.textContent = 'Saving Draft...';
        if (window.DataLayer) {
          await window.DataLayer.saveExamDraft(dbProgId, answersMap);
        }
        showToast('✓ Exam draft saved successfully to database!');
        await renderExamScreen();
      } catch (err) {
        console.error('Error saving exam draft:', err);
        alert(`Error saving draft: ${err.message}`);
      } finally {
        if (el.saveDraftExamBtn) {
          el.saveDraftExamBtn.disabled = false;
          el.saveDraftExamBtn.textContent = 'Save as Draft';
        }
      }
    });
  }

  

  // Submit Exam Form
  if (el.examForm) {
    el.examForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dbProgId = getProgrammeDbId(currentProgrammeId);

      let allFilled = true;
      let missingQuestion = null;
      const answersMap = {};

      (currentExamQuestions || []).forEach((q, idx) => {
        const field = document.getElementById(`ans_${q.id}`);
        if (field) {
          const val = field.value.trim();
          answersMap[q.id] = val;
          if (!val && !missingQuestion) {
            allFilled = false;
            missingQuestion = idx + 1;
          }
        }
      });

      if (!allFilled) {
        alert(`Please complete Question ${missingQuestion} before submitting your exam.`);
        return;
      }

      if (!confirm('Are you sure you want to submit your final written exam? You cannot modify answers after submission.')) {
        return;
      }

      try {
        if (el.submitExamBtn) {
          el.submitExamBtn.disabled = true;
          el.submitExamBtn.textContent = 'Submitting...';
        }

        if (window.DataLayer) {
          await window.DataLayer.submitExam(dbProgId, answersMap);
        }

        showToast('✓ Written Exam submitted successfully! Under Review.');
        await renderExamScreen();
        if (typeof renderSidebar === 'function') renderSidebar();
      } catch (err) {
        console.error('submitExam error:', err);
        alert(err.message || 'Error submitting exam: Retakes are not allowed unless permitted by an instructor.');
      } finally {
        if (el.submitExamBtn) {
          el.submitExamBtn.disabled = false;
          el.submitExamBtn.textContent = 'Submit Exam';
        }
      }
    });
  }

  

  // Review Your Responses Button
  if (el.reviewExamBtn) {
    el.reviewExamBtn.addEventListener('click', () => {
      if (!el.examForm || !el.examQuestionsContainer) return;
      if (el.examSubmittedNotice) el.examSubmittedNotice.style.display = 'none';
      el.examForm.style.display = 'flex';

      const answersMap = {};
      const marksMap = {};
      const commentsMap = {};
      if (currentExamSubmission?.exam_answers) {
        currentExamSubmission.exam_answers.forEach(a => {
          answersMap[a.question_id] = a.answer_text;
          marksMap[a.question_id] = a.marks;
          commentsMap[a.question_id] = a.comment;
        });
      }

      el.examQuestionsContainer.innerHTML = '';
      (currentExamQuestions || []).forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'exam-question-item';
        qDiv.style.marginBottom = '20px';

        const awardedMarks = marksMap[q.id] !== undefined && marksMap[q.id] !== null ? `${marksMap[q.id]} / ${q.max_marks} marks` : `Max Marks: ${q.max_marks}`;
        const questionComment = commentsMap[q.id];

        qDiv.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <label class="exam-q-title" style="font-weight: 700; font-size: 14.5px;">Question ${idx + 1}: ${q.title}</label>
            <span style="font-size: 12px; color: var(--accent-light); font-weight: 700;">${awardedMarks}</span>
          </div>
          <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 8px;">${q.prompt}</p>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; font-size: 13px; color: #e2e8f0; white-space: pre-wrap; line-height: 1.5;">${answersMap[q.id] || '(No response recorded)'}</div>
          ${questionComment ? `<div style="margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-sm); background: rgba(0, 165, 68, 0.08); border-left: 3px solid var(--accent-light); font-size: 12px; color: var(--accent-light);"><strong>Instructor Note:</strong> ${questionComment}</div>` : ''}
        `;
        el.examQuestionsContainer.appendChild(qDiv);
      });

      if (el.submitExamBtn) el.submitExamBtn.style.display = 'none';
      if (el.saveDraftExamBtn) el.saveDraftExamBtn.style.display = 'none';
      if (el.cancelExamBtn) {
        el.cancelExamBtn.textContent = 'Back to Submission Status';
        el.cancelExamBtn.onclick = () => {
          renderExamScreen();
        };
      }
    });
  }

  

  // Start Retake Button (Learner)
  if (el.retakeExamBtn) {
    el.retakeExamBtn.addEventListener('click', () => {
      if (!confirm('Start an exam retake? Your instructor has authorized this re-evaluation.')) return;
      openExamFormForEditing({});
    });
  }

  

  // -------------------------------------------------------------------------
  // INSTRUCTOR / ADMIN EXAM REVIEW CONTROLLER
  // -------------------------------------------------------------------------
  async function renderInstructorExamSubmissions() {
    if (!el.instructorExamTableBody) return;
    const userRole = state.profile?.role || 'intern';
    const isAdmin = (userRole === 'admin');
    const currentDbProgId = getProgrammeDbId(currentProgrammeId);
    const filterProgId = isAdmin ? (instructorExamProgSelected || null) : currentDbProgId;

    // Admin programme filter dropdown
    if (el.instructorExamProgFilter) {
      if (isAdmin) {
        el.instructorExamProgFilter.style.display = 'inline-block';
        el.instructorExamProgFilter.innerHTML = '<option value="">All Programmes</option>';
        PROGRAMMES_LIST.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.dbId;
          opt.textContent = p.title;
          if (instructorExamProgSelected === p.dbId) opt.selected = true;
          el.instructorExamProgFilter.appendChild(opt);
        });
      } else {
        el.instructorExamProgFilter.style.display = 'none';
      }
    }

    // Load submissions
    if (window.DataLayer) {
      try {
        instructorExamSubmissions = await window.DataLayer.getInstructorExamSubmissions(filterProgId);
      } catch (err) {
        console.warn('getInstructorExamSubmissions error:', err);
        instructorExamSubmissions = [];
      }
    }

    // Filter by tab
    let filtered = (instructorExamSubmissions || []).filter(s => s.status !== 'draft'); // Only show submitted or graded
    if (instructorExamFilter === 'pending') {
      filtered = filtered.filter(s => s.status === 'submitted');
    } else if (instructorExamFilter === 'graded') {
      filtered = filtered.filter(s => s.status === 'graded');
    }

    el.instructorExamTableBody.innerHTML = '';
    if (filtered.length === 0) {
      if (el.emptyInstructorExamsState) el.emptyInstructorExamsState.style.display = 'block';
      return;
    }
    if (el.emptyInstructorExamsState) el.emptyInstructorExamsState.style.display = 'none';

    filtered.forEach(sub => {
      const learnerName = sub.profiles?.full_name || 'Learner';
      const learnerEmail = sub.profiles?.email || 'N/A';
      const progName = sub.programmes?.name || 'Programme';
      const submittedDate = sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) : '--';
      const isGraded = sub.status === 'graded';
      const statusPill = isGraded
        ? '<span class="exam-status-tag submitted">Graded</span>'
        : '<span class="exam-status-tag in-review">Needs Grading</span>';
      const gradeDisplay = isGraded ? (sub.grade || `${sub.score}%`) : '--';

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-subtle)';
      tr.innerHTML = `
        <td style="padding: 12px;">
          <div style="font-weight: 700; color: var(--text-primary);">${learnerName}</div>
          <div style="font-size: 11.5px; color: var(--text-muted);">${learnerEmail}</div>
        </td>
        <td style="padding: 12px; color: var(--text-secondary); font-size: 12.5px;">${progName}</td>
        <td style="padding: 12px; color: var(--text-secondary); font-size: 12px;">${submittedDate}</td>
        <td style="padding: 12px;">${statusPill}</td>
        <td style="padding: 12px; font-weight: 700; color: ${isGraded ? 'var(--accent-light)' : 'var(--text-secondary)'};">${gradeDisplay}</td>
        <td style="padding: 12px; text-align: right;">
          <button type="button" class="primary-accent-btn grade-sub-btn" data-sub-id="${sub.id}" style="padding: 6px 14px; font-size: 12.5px;">
            ${isGraded ? 'Review / Edit Grade' : 'Grade Submission'}
          </button>
        </td>
      `;
      el.instructorExamTableBody.appendChild(tr);
    });

    // Wire Grade Submission buttons
    el.instructorExamTableBody.querySelectorAll('.grade-sub-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subId = btn.getAttribute('data-sub-id');
        openGradeExamModal(subId);
      });
    });
  }

  

  // Filter tab events
  if (el.filterExamSubAll) {
    el.filterExamSubAll.addEventListener('click', () => {
      instructorExamFilter = 'all';
      el.filterExamSubAll.classList.add('active');
      if (el.filterExamSubPending) el.filterExamSubPending.classList.remove('active');
      if (el.filterExamSubGraded) el.filterExamSubGraded.classList.remove('active');
      renderInstructorExamSubmissions();
    });
  }

  
  if (el.filterExamSubPending) {
    el.filterExamSubPending.addEventListener('click', () => {
      instructorExamFilter = 'pending';
      el.filterExamSubPending.classList.add('active');
      if (el.filterExamSubAll) el.filterExamSubAll.classList.remove('active');
      if (el.filterExamSubGraded) el.filterExamSubGraded.classList.remove('active');
      renderInstructorExamSubmissions();
    });
  }

  
  if (el.filterExamSubGraded) {
    el.filterExamSubGraded.addEventListener('click', () => {
      instructorExamFilter = 'graded';
      el.filterExamSubGraded.classList.add('active');
      if (el.filterExamSubAll) el.filterExamSubAll.classList.remove('active');
      if (el.filterExamSubPending) el.filterExamSubPending.classList.remove('active');
      renderInstructorExamSubmissions();
    });
  }

  
  if (el.instructorExamProgFilter) {
    el.instructorExamProgFilter.addEventListener('change', () => {
      instructorExamProgSelected = el.instructorExamProgFilter.value;
      renderInstructorExamSubmissions();
    });
  }

  

  // Open Grade Exam Modal
  let activeGradingSub = null;
  function openGradeExamModal(submissionId) {
    activeGradingSub = (instructorExamSubmissions || []).find(s => s.id === submissionId);
    if (!activeGradingSub || !el.gradeExamModal) return;

    if (el.gradeSubId) el.gradeSubId.value = activeGradingSub.id;
    if (el.gradeLearnerName) el.gradeLearnerName.textContent = activeGradingSub.profiles?.full_name || 'Learner';
    if (el.gradeLearnerMeta) el.gradeLearnerMeta.textContent = `${activeGradingSub.profiles?.email || ''} • ${activeGradingSub.programmes?.name || ''}`;
    if (el.gradeSubmissionDatePill) {
      el.gradeSubmissionDatePill.textContent = activeGradingSub.submitted_at ? `Submitted: ${new Date(activeGradingSub.submitted_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}` : 'Submitted';
    }

    if (el.gradeOverallMarks) el.gradeOverallMarks.value = activeGradingSub.score !== null ? activeGradingSub.score : '';
    if (el.gradeOverallComment) el.gradeOverallComment.value = activeGradingSub.instructor_comment || '';

    // Render Answers per question
    if (el.gradeQuestionsList) {
      el.gradeQuestionsList.innerHTML = '';
      const answersList = activeGradingSub.exam_answers || [];
      const answersByQ = {};
      answersList.forEach(a => { answersByQ[a.question_id] = a; });

      (currentExamQuestions || []).forEach((q, idx) => {
        const ans = answersByQ[q.id] || {};
        const qItem = document.createElement('div');
        qItem.className = 'grade-question-review-card';
        qItem.style.padding = '14px';
        qItem.style.border = '1px solid var(--border-subtle)';
        qItem.style.borderRadius = 'var(--radius-md)';
        qItem.style.background = 'var(--bg-surface)';

        qItem.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <strong style="font-size: 13.5px; color: var(--text-primary);">Q${idx + 1}: ${q.title}</strong>
            <span style="font-size: 12px; color: var(--accent-light); font-weight: 600;">Max Marks: ${q.max_marks}</span>
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">${q.prompt}</p>
          <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px; font-size: 13px; line-height: 1.5; white-space: pre-wrap; color: #f1f5f9; margin-bottom: 10px;">${ans.answer_text || '(No response recorded)'}</div>
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 10px;">
            <div class="modal-form-group">
              <label class="modal-field-label" style="font-size: 11.5px;">Awarded Marks</label>
              <input type="number" class="form-text-input q-marks-input" data-q-id="${q.id}" min="0" max="${q.max_marks}" value="${ans.marks !== undefined && ans.marks !== null ? ans.marks : ''}" placeholder="0 - ${q.max_marks}">
            </div>
            <div class="modal-form-group">
              <label class="modal-field-label" style="font-size: 11.5px;">Question Feedback</label>
              <input type="text" class="form-text-input q-comment-input" data-q-id="${q.id}" value="${ans.comment || ''}" placeholder="Specific feedback for this answer...">
            </div>
          </div>
        `;
        el.gradeQuestionsList.appendChild(qItem);
      });
    }

    el.gradeExamModal.style.display = 'flex';
  }

  function closeGradeExamModal() {
    if (el.gradeExamModal) el.gradeExamModal.style.display = 'none';
    activeGradingSub = null;
  }

  if (el.closeGradeExamModalBtn) el.closeGradeExamModalBtn.addEventListener('click', closeGradeExamModal);
  if (el.cancelGradeExamBtn) el.cancelGradeExamBtn.addEventListener('click', closeGradeExamModal);

  // Grade Exam Form Submit
  if (el.gradeExamForm) {
    el.gradeExamForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!activeGradingSub) return;

      const subId = activeGradingSub.id;
      const overallMarks = parseFloat(el.gradeOverallMarks?.value || '0');
      const overallComment = el.gradeOverallComment?.value?.trim() || '';

      if (isNaN(overallMarks) || overallMarks < 0 || overallMarks > 100) {
        alert('Please enter a valid overall score percentage between 0 and 100.');
        return;
      }

      // Collect question marks & comments
      const answersGrades = [];
      const marksInputs = el.gradeQuestionsList.querySelectorAll('.q-marks-input');
      marksInputs.forEach(input => {
        const qId = input.getAttribute('data-q-id');
        const marksVal = input.value !== '' ? parseFloat(input.value) : null;
        const commentInput = el.gradeQuestionsList.querySelector(`.q-comment-input[data-q-id="${qId}"]`);
        const commentVal = commentInput ? commentInput.value.trim() : '';

        answersGrades.push({
          question_id: qId,
          marks: marksVal,
          comment: commentVal
        });
      });

      try {
        if (el.saveGradeBtn) {
          el.saveGradeBtn.disabled = true;
          el.saveGradeBtn.textContent = 'Saving Grade...';
        }

        if (window.DataLayer) {
          await window.DataLayer.gradeExam(subId, overallMarks, overallComment, answersGrades);
        }

        showToast('✓ Official exam grade and feedback saved successfully!');
        closeGradeExamModal();
        await renderInstructorExamSubmissions();
      } catch (err) {
        console.error('gradeExam error:', err);
        alert(`Error grading exam: ${err.message}`);
      } finally {
        if (el.saveGradeBtn) {
          el.saveGradeBtn.disabled = false;
          el.saveGradeBtn.textContent = 'Submit Official Grade';
        }
      }
    });
  }

  

  // Allow Exam Retake (Instructor / Admin action)
  if (el.allowRetakeBtn) {
    el.allowRetakeBtn.addEventListener('click', async () => {
      if (!activeGradingSub) return;
      if (!confirm(`Are you sure you want to allow an exam retake for ${activeGradingSub.profiles?.full_name || 'this learner'}? This will unlock their examination screen.`)) {
        return;
      }

      try {
        el.allowRetakeBtn.disabled = true;
        if (window.DataLayer) {
          await window.DataLayer.allowExamRetake(activeGradingSub.id);
        }
        showToast('✓ Exam retake permitted for this learner.');
        closeGradeExamModal();
        await renderInstructorExamSubmissions();
      } catch (err) {
        console.error('allowExamRetake error:', err);
        alert(`Error permitting retake: ${err.message}`);
      } finally {
        if (el.allowRetakeBtn) el.allowRetakeBtn.disabled = false;
      }
    });
  }

  

  // ==========================================
  // 13. MESSAGES SCREEN (PROFESSIONAL SUPPORT INBOX)
  // ==========================================

  const INSTRUCTOR_REPLY_TEXT = "Typically replies within 24 hours";
  const OFFICE_HOURS_TEXT = "Mon–Fri: 10:00 AM – 6:00 PM IST";

  const PROGRAMME_INSTRUCTORS = {
    hr: [
      { id: 'inst_devashish', name: 'Devashish Chauhan', role: 'Lead HR & Operations Instructor', initials: 'DC' },
      { id: 'inst_neha', name: 'Neha Singhal', role: 'Talent Acquisition & People Mentor', initials: 'NS' },
      { id: 'inst_gehna', name: 'Gehna Sahni', role: 'Research Associate', initials: 'GS' }
    ],
    bd: [
      { id: 'inst_devashish', name: 'Devashish Chauhan', role: 'Lead BD & RFP Proposal Specialist', initials: 'DC' },
      { id: 'inst_neha', name: 'Neha Singhal', role: 'Strategic Partnerships Mentor', initials: 'NS' },
      { id: 'inst_gehna', name: 'Gehna Sahni', role: 'Research Associate', initials: 'GS' }
    ],
    data: [
      { id: 'inst_devashish', name: 'Devashish Chauhan', role: 'Lead Data Analytics Instructor', initials: 'DC' },
      { id: 'inst_neha', name: 'Neha Singhal', role: 'Statistical Modeling Mentor', initials: 'NS' },
      { id: 'inst_gehna', name: 'Gehna Sahni', role: 'Research Associate', initials: 'GS' }
    ],
    research: [
      { id: 'inst_devashish', name: 'Devashish Chauhan', role: 'Lead Research Methodologies Instructor', initials: 'DC' },
      { id: 'inst_neha', name: 'Neha Singhal', role: 'Qualitative Fieldwork Mentor', initials: 'NS' },
      { id: 'inst_gehna', name: 'Gehna Sahni', role: 'Research Associate', initials: 'GS' }
    ],
    design: [
      { id: 'inst_devashish', name: 'Devashish Chauhan', role: 'Lead Design Instructor', initials: 'DC' },
      { id: 'inst_neha', name: 'Neha Singhal', role: 'Creative & UI/UX Mentor', initials: 'NS' },
      { id: 'inst_gehna', name: 'Gehna Sahni', role: 'Research Associate', initials: 'GS' }
    ],
    partnerships: [
      { id: 'inst_devashish', name: 'Devashish Chauhan', role: 'Lead Institutional Relations Mentor', initials: 'DC' },
      { id: 'inst_neha', name: 'Neha Singhal', role: 'Partnerships & Outreach Mentor', initials: 'NS' },
      { id: 'inst_gehna', name: 'Gehna Sahni', role: 'Research Associate', initials: 'GS' }
    ]
  };

  const DEFAULT_CANNED_REPLIES = [
    {
      id: 'cr_1',
      title: 'Office Hours & Review Timeline',
      body: 'Hello! Thank you for reaching out. We have received your query and our team reviews submitted threads during daily office hours (Mon–Fri, 10:00 AM – 6:00 PM IST). We typically reply within 24 hours.'
    },
    {
      id: 'cr_2',
      title: 'Assignment Formatting Standard',
      body: 'Please ensure all assignment submissions are exported as PDF or DOCX format following the naming convention: [YourName]_[ModuleNumber]_[AssignmentTitle]. Tables and appendices should be clearly titled.'
    },
    {
      id: 'cr_3',
      title: 'RFP Proposal Scoring Guideline',
      body: 'Hi! As outlined in the evaluation framework, technical proposal scoring is weighted based on methodology (40%), team credentials (30%), and past client references (30%). Please review the rubric in Module 2.1.'
    },
    {
      id: 'cr_4',
      title: 'Technical Support Escalation',
      body: 'For technical portal login or password issues, please verify your Google OAuth credentials or contact the admin desk at tech-support@ikaaiindia.org with your registered email and a screenshot.'
    }
  ];

  // Support Inbox State
  let supportRole = 'learner'; // 'learner' | 'instructor'
  let supportActiveThreadId = null;
  let supportFilter = 'all'; // 'all' | 'open' | 'answered' | 'resolved'
  let supportCategoryFilter = '';
  let supportInstructorFilter = '';
  let supportSearchQuery = '';
  let supportIsInternalNoteMode = false;
  let supportNewThreadFiles = [];
  let supportComposerFiles = [];
  let supportRecentMessageTimestamps = [];
  let supportRealtimeChannel = null;
  let supportInitialized = false;

  function getCurrentUserSupportInfo() {
    let name = 'Learner';
    let email = 'learner@ikaaiindia.org';
    let id = 'local_user';
    let role = supportRole;

    const sessionRaw = localStorage.getItem('ikaai_portal_session');
    if (sessionRaw) {
      try {
        const parsed = JSON.parse(sessionRaw);
        if (parsed.name) name = parsed.name;
        if (parsed.email) email = parsed.email;
        if (parsed.id) id = parsed.id;
      } catch (e) { }
    }
    return { name, email, id, role };
  }

  function getProgrammeInstructorsList() {
    const list = PROGRAMME_INSTRUCTORS[currentProgrammeId] || PROGRAMME_INSTRUCTORS.hr || [];
    return list;
  }


  // Category helper for check constraint compliance ('module_question', 'technical_issue', 'exam_grading', 'leave_attendance', 'other')
  const SUPPORT_CATEGORY_LABELS = {
    module_question: 'Module question',
    technical_issue: 'Technical issue',
    exam_grading: 'Exam or grading',
    leave_attendance: 'Leave or attendance',
    other: 'Other'
  };

  function normalizeSupportCategory(cat) {
    if (!cat) return 'other';
    const c = String(cat).toLowerCase().trim().replace(/[\s\/-]+/g, '_');
    if (['module_question', 'technical_issue', 'exam_grading', 'leave_attendance', 'other'].includes(c)) return c;
    if (c.includes('module')) return 'module_question';
    if (c.includes('technical') || c.includes('tech')) return 'technical_issue';
    if (c.includes('exam') || c.includes('grade') || c.includes('grading')) return 'exam_grading';
    if (c.includes('leave') || c.includes('attend')) return 'leave_attendance';
    return 'other';
  }

  // Initial Seed generator for local storage fallback
  function generateDefaultSeedThreads() {
    const now = Date.now();
    const insts = getProgrammeInstructorsList();
    const inst1 = insts[0] || { id: 'inst_devashish', name: 'Devashish Chauhan' };
    const inst2 = insts[1] || { id: 'inst_neha', name: 'Neha Singhal' };
    const inst3 = insts[2] || { id: 'inst_gehna', name: 'Gehna Sahni' };
    const currentUser = getCurrentUserSupportInfo();

    return [
      {
        id: 'thread_seed_1',
        programme: currentProgrammeId,
        subject: 'Question regarding RFP scoring matrix calculation in Module 2.1',
        category: 'module_question', // check constraint compliant
        programme_id: getProgrammeDbId(currentProgrammeId),
        module_id: 'mod_2',
        module_title: '2. Technical Proposal Writing',
        status: 'open',
        learner_name: currentUser.name || 'Akshay Tiwari',
        learner_email: currentUser.email || 'learner@ikaaiindia.org',
        learner_id: currentUser.id || 'usr_1',
        instructor_id: inst1.id,
        instructor_name: inst1.name,
        created_at: new Date(now - 2 * 3600 * 1000).toISOString(),
        updated_at: new Date(now - 2 * 3600 * 1000).toISOString(),
        last_message_at: new Date(now - 2 * 3600 * 1000).toISOString(),
        last_message_preview: 'Could you clarify whether cost weighting in the RFP evaluation matrix is fixed at 30% or varies by agency?',
        unread_by_learner: false,
        unread_by_instructor: true,
        rating: null,
        rating_comment: '',
        resolved_at: null,
        messages: [
          {
            id: 'm1_1',
            thread_id: 'thread_seed_1',
            sender_id: currentUser.id || 'usr_1',
            sender_name: currentUser.name || 'Akshay Tiwari',
            sender_role: 'learner',
            body: 'Hello Devashish Sir, could you clarify whether cost weighting in the RFP evaluation matrix is fixed at 30% or varies by funding agency? In Module 2.1 slides it mentions both 30% and 40%.',
            attachments: [],
            created_at: new Date(now - 2 * 3600 * 1000).toISOString(),
            read_at: null
          }
        ],
        internal_notes: []
      },
      {
        id: 'thread_seed_2',
        programme: currentProgrammeId,
        subject: 'Clarification on client deliverable submission format',
        category: 'technical_issue', // check constraint compliant
        programme_id: getProgrammeDbId(currentProgrammeId),
        module_id: 'mod_1',
        module_title: '1. RFP Sourcing & Bid Tracking',
        status: 'answered',
        learner_name: currentUser.name || 'Akshay Tiwari',
        learner_email: currentUser.email || 'learner@ikaaiindia.org',
        learner_id: currentUser.id || 'usr_1',
        instructor_id: inst2.id,
        instructor_name: inst2.name,
        created_at: new Date(now - 26 * 3600 * 1000).toISOString(),
        updated_at: new Date(now - 4 * 3600 * 1000).toISOString(),
        last_message_at: new Date(now - 4 * 3600 * 1000).toISOString(),
        last_message_preview: 'Hi Akshay, both DOCX and PDF are accepted, but please ensure tables are preserved...',
        unread_by_learner: true,
        unread_by_instructor: false,
        rating: null,
        rating_comment: '',
        resolved_at: null,
        messages: [
          {
            id: 'm2_1',
            thread_id: 'thread_seed_2',
            sender_id: currentUser.id || 'usr_1',
            sender_name: currentUser.name || 'Akshay Tiwari',
            sender_role: 'learner',
            body: 'Hi team, is the final proposal document required to be in DOCX format or PDF? The portal upload mentions both.',
            attachments: [],
            created_at: new Date(now - 26 * 3600 * 1000).toISOString(),
            read_at: new Date(now - 20 * 3600 * 1000).toISOString()
          },
          {
            id: 'm2_2',
            thread_id: 'thread_seed_2',
            sender_id: inst2.id,
            sender_name: inst2.name,
            sender_role: 'instructor',
            body: 'Hi Akshay, both DOCX and PDF are accepted for client draft submissions! For final government bids, always export a flattened PDF to preserve layout and typography. Attached is the sample cover page guideline.',
            attachments: [
              { name: 'Ikaai_Proposal_Cover_Guidelines.pdf', size: '245 KB', url: '#' }
            ],
            created_at: new Date(now - 4 * 3600 * 1000).toISOString(),
            read_at: new Date(now - 4 * 3600 * 1000).toISOString()
          }
        ],
        internal_notes: [
          {
            id: 'n2_1',
            author_id: inst2.id,
            author_name: inst2.name,
            body: 'Learner is preparing for the Ministry bid. Provided standard PDF submission checklist.',
            created_at: new Date(now - 4 * 3600 * 1000).toISOString()
          }
        ]
      },
      {
        id: 'thread_seed_3',
        programme: currentProgrammeId,
        subject: 'Accessing case study materials for Module 1',
        category: 'exam_grading', // check constraint compliant
        programme_id: getProgrammeDbId(currentProgrammeId),
        module_id: 'mod_0',
        module_title: '0. Development Sector Landscape',
        status: 'resolved',
        learner_name: currentUser.name || 'Akshay Tiwari',
        learner_email: currentUser.email || 'learner@ikaaiindia.org',
        learner_id: currentUser.id || 'usr_1',
        instructor_id: inst3.id,
        instructor_name: inst3.name,
        created_at: new Date(now - 72 * 3600 * 1000).toISOString(),
        updated_at: new Date(now - 48 * 3600 * 1000).toISOString(),
        last_message_at: new Date(now - 48 * 3600 * 1000).toISOString(),
        last_message_preview: 'Confirmed working now! Thank you so much for the quick fix.',
        unread_by_learner: false,
        unread_by_instructor: false,
        rating: 'up', // check constraint: 'up' | 'down' | null
        rating_comment: 'Super fast response and resolved immediately. Thank you!',
        resolved_at: new Date(now - 48 * 3600 * 1000).toISOString(),
        messages: [
          {
            id: 'm3_1',
            thread_id: 'thread_seed_3',
            sender_id: currentUser.id || 'usr_1',
            sender_name: currentUser.name || 'Akshay Tiwari',
            sender_role: 'learner',
            body: 'Good morning, the link to the case study annexure in Module 0 was prompting for permissions.',
            attachments: [],
            created_at: new Date(now - 72 * 3600 * 1000).toISOString(),
            read_at: new Date(now - 70 * 3600 * 1000).toISOString()
          },
          {
            id: 'm3_2',
            thread_id: 'thread_seed_3',
            sender_id: inst1.id,
            sender_name: inst1.name,
            sender_role: 'instructor',
            body: 'Permissions have been updated to anyone with the Ikaai domain. You should be able to view and download all case studies now!',
            attachments: [],
            created_at: new Date(now - 50 * 3600 * 1000).toISOString(),
            read_at: new Date(now - 50 * 3600 * 1000).toISOString()
          },
          {
            id: 'm3_3',
            thread_id: 'thread_seed_3',
            sender_id: currentUser.id || 'usr_1',
            sender_name: currentUser.name || 'Akshay Tiwari',
            sender_role: 'learner',
            body: 'Confirmed working now! Thank you so much for the quick fix.',
            attachments: [],
            created_at: new Date(now - 48 * 3600 * 1000).toISOString(),
            read_at: new Date(now - 48 * 3600 * 1000).toISOString()
          }
        ],
        internal_notes: []
      }
    ];
  }

  function getLocalSupportThreads() {
    const raw = localStorage.getItem(`ikaai_support_threads_${currentProgrammeId}`);
    const insts = getProgrammeInstructorsList();
    const inst1 = insts[0] || { id: 'inst_devashish', name: 'Devashish Chauhan' };
    const inst2 = insts[1] || { id: 'inst_neha', name: 'Neha Singhal' };
    const inst3 = insts[2] || { id: 'inst_gehna', name: 'Gehna Sahni' };

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let updated = false;
          parsed.forEach(t => {
            if (t.id && t.id.startsWith('thread_seed_')) {
              if (t.id === 'thread_seed_1' || t.instructor_name === 'Sudha Ashwini Janabalan' || t.instructor_id === 'inst_1') {
                if (t.instructor_name !== inst1.name) {
                  t.instructor_name = inst1.name;
                  t.instructor_id = inst1.id;
                  updated = true;
                }
              } else if (t.id === 'thread_seed_2' || t.instructor_name === 'Maaruf Khan' || t.instructor_id === 'inst_2') {
                if (t.instructor_name !== inst2.name) {
                  t.instructor_name = inst2.name;
                  t.instructor_id = inst2.id;
                  updated = true;
                }
              } else if (t.id === 'thread_seed_3') {
                if (t.instructor_name !== inst3.name) {
                  t.instructor_name = inst3.name;
                  t.instructor_id = inst3.id;
                  updated = true;
                }
              }
              if (Array.isArray(t.messages)) {
                t.messages.forEach(m => {
                  if (m.sender_name === 'Sudha Ashwini Janabalan' || (m.sender_role === 'instructor' && t.id === 'thread_seed_1')) {
                    if (m.sender_name !== inst1.name) {
                      m.sender_name = inst1.name;
                      updated = true;
                    }
                  } else if (m.sender_name === 'Maaruf Khan' || (m.sender_role === 'instructor' && t.id === 'thread_seed_2')) {
                    if (m.sender_name !== inst2.name) {
                      m.sender_name = inst2.name;
                      updated = true;
                    }
                  } else if (m.sender_role === 'instructor' && t.id === 'thread_seed_3') {
                    if (m.sender_name !== inst3.name) {
                      m.sender_name = inst3.name;
                      updated = true;
                    }
                  }
                  if (m.body && m.body.includes('Sudha Maam')) {
                    m.body = m.body.replace('Sudha Maam', 'Devashish Sir');
                    updated = true;
                  }
                });
              }
            }
          });
          if (updated) {
            saveLocalSupportThreads(parsed);
          }
          return parsed;
        }
      } catch (e) { }
    }
    const seed = generateDefaultSeedThreads();
    saveLocalSupportThreads(seed);
    return seed;
  }

  function saveLocalSupportThreads(threads) {
    try {
      localStorage.setItem(`ikaai_support_threads_${currentProgrammeId}`, JSON.stringify(threads));
    } catch (e) {
      console.warn("Storage quota or error:", e);
    }
  }

  function getLocalCannedReplies() {
    const raw = localStorage.getItem('ikaai_canned_replies');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { }
    }
    return DEFAULT_CANNED_REPLIES;
  }

  function saveLocalCannedReplies(replies) {
    try {
      localStorage.setItem('ikaai_canned_replies', JSON.stringify(replies));
    } catch (e) { }
  }

  // Format relative timestamp
  function formatSupportRelativeTime(isoStr) {
    if (!isoStr) return '';
    const diff = Math.floor((Date.now() - new Date(isoStr).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 172800) return 'Yesterday';
    return new Date(isoStr).toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  // Check rate limit: max 10 messages per minute
  function checkRateLimitAllowed() {
    const now = Date.now();
    supportRecentMessageTimestamps = supportRecentMessageTimestamps.filter(t => now - t < 60000);
    if (supportRecentMessageTimestamps.length >= 10) {
      return false;
    }
    supportRecentMessageTimestamps.push(now);
    return true;
  }

  // Call Supabase Edge Function for email notification (with fallback/graceful skip)
  async function notifySupportEmailEvent(payload) {
    if (!window.supabaseClient) return;
    try {
      await window.supabaseClient.functions.invoke('send-support-email', {
        body: payload
      });
    } catch (err) {
      // Gracefully ignored if Edge function is not deployed or RESEND_API_KEY is not set
      console.log('Support email notification skipped/logged:', err?.message || err);
    }
  }

  // Render Info Card (Instructors & Office Hours)
  function renderSupportInfoCard() {
    if (el.supportReplyTimeText) {
      el.supportReplyTimeText.textContent = INSTRUCTOR_REPLY_TEXT;
    }
    if (el.supportOfficeHoursText) {
      el.supportOfficeHoursText.textContent = OFFICE_HOURS_TEXT;
    }

    if (el.supportInstructorsList) {
      const insts = getProgrammeInstructorsList();
      el.supportInstructorsList.innerHTML = insts.map(inst => `
        <div class="instructor-profile-chip">
          <div class="instructor-avatar-circle" title="${escapeHtml(inst.name)}">${escapeHtml(inst.initials || 'IN')}</div>
          <div class="instructor-profile-text">
            <span class="instructor-name">${escapeHtml(inst.name)}</span>
            <span class="instructor-role-label">${escapeHtml(inst.role)}</span>
          </div>
        </div>
      `).join('');
    }

    // Role toggle pills
    if (el.roleLearnerToggleBtn && el.roleInstructorToggleBtn) {
      el.roleLearnerToggleBtn.classList.toggle('active', supportRole === 'learner');
      el.roleInstructorToggleBtn.classList.toggle('active', supportRole === 'instructor');
    }

    // Show/hide instructor-only elements
    if (el.instructorStatsStrip) {
      el.instructorStatsStrip.style.display = supportRole === 'instructor' ? 'grid' : 'none';
    }
    if (el.threadStaffActions) {
      el.threadStaffActions.style.display = supportRole === 'instructor' ? 'flex' : 'none';
    }
    if (el.staffComposerToolbar) {
      el.staffComposerToolbar.style.display = supportRole === 'instructor' ? 'flex' : 'none';
    }
  }

  // Render Instructor Stats Strip
  function renderInstructorStatsStrip(threads) {
    if (!el.instructorStatsStrip || supportRole !== 'instructor') return;

    const openCount = threads.filter(t => t.status === 'open').length;
    if (el.statOpenThreads) el.statOpenThreads.textContent = openCount;

    // Avg first reply time calculation
    let totalReplyMinutes = 0;
    let replySampleCount = 0;
    threads.forEach(t => {
      if (t.messages && t.messages.length > 1) {
        const firstUser = t.messages.find(m => m.sender_role === 'learner');
        const firstStaff = t.messages.find(m => m.sender_role === 'instructor');
        if (firstUser && firstStaff) {
          const diffMin = Math.max(1, Math.round((new Date(firstStaff.created_at) - new Date(firstUser.created_at)) / 60000));
          totalReplyMinutes += diffMin;
          replySampleCount++;
        }
      }
    });

    if (el.statAvgReplyTime) {
      if (replySampleCount === 0) {
        el.statAvgReplyTime.textContent = '2.4 hrs';
      } else {
        const avgHours = (totalReplyMinutes / replySampleCount / 60).toFixed(1);
        el.statAvgReplyTime.textContent = `${avgHours} hrs`;
      }
    }

    // Category count
    const uniqueCategories = new Set(threads.map(t => t.category).filter(Boolean));
    if (el.statCategoriesCount) {
      el.statCategoriesCount.textContent = `${uniqueCategories.size} types`;
    }

    // Satisfaction score (% of thumbs up)
    const ratedThreads = threads.filter(t => t.rating === 'helpful' || t.rating === 'unhelpful');
    if (el.statSatisfactionRate) {
      if (ratedThreads.length === 0) {
        el.statSatisfactionRate.textContent = '100% 👍';
      } else {
        const helpfulCount = ratedThreads.filter(t => t.rating === 'helpful').length;
        const pct = Math.round((helpfulCount / ratedThreads.length) * 100);
        el.statSatisfactionRate.textContent = `${pct}% 👍`;
      }
    }
  }

  // Populate Filter Dropdowns
  function populateSupportFilterDropdowns() {
    if (el.inboxInstructorFilter) {
      const insts = getProgrammeInstructorsList();
      const currentVal = el.inboxInstructorFilter.value;
      el.inboxInstructorFilter.innerHTML = '<option value="">All Instructors</option>' +
        insts.map(i => `<option value="${escapeHtml(i.id)}">${escapeHtml(i.name)}</option>`).join('');
      if (currentVal && insts.some(i => i.id === currentVal)) {
        el.inboxInstructorFilter.value = currentVal;
      } else {
        el.inboxInstructorFilter.value = '';
      }
    }

    if (el.threadAssignSelect) {
      const insts = getProgrammeInstructorsList();
      el.threadAssignSelect.innerHTML = '<option value="">Any instructor</option>' +
        insts.map(i => `<option value="${escapeHtml(i.id)}">${escapeHtml(i.name)}</option>`).join('');
    }
  }

  // Update live unread badge on sidebar and filter counts
  function updateSupportUnreadBadge(threads) {
    const isLearner = supportRole === 'learner';
    const currentUser = getCurrentUserSupportInfo();
    const currentDbProgId = getProgrammeDbId(currentProgrammeId);
    const visibleThreads = isLearner && currentUser.id
      ? threads.filter(t => {
        const progId = t.programme_id ? getProgrammeKey(t.programme_id) : (t.programme ? getProgrammeKey(t.programme) : null);
        if (progId && progId !== currentProgrammeId) return false;
        const isDemoSeed = t.id && t.id.startsWith('thread_seed_');
        const isOwner = t.learner_id === currentUser.id || t.learner_id === 'usr_1' || t.learner_id === 'local_user';
        return isOwner || isDemoSeed;
      })
      : threads.filter(t => !t.programme || t.programme === currentProgrammeId);

    const unreadCount = visibleThreads.filter(t => isLearner ? t.unread_by_learner : t.unread_by_instructor).length;
    if (el.messagesUnreadBadge) {
      if (unreadCount > 0) {
        el.messagesUnreadBadge.textContent = unreadCount;
        el.messagesUnreadBadge.style.display = 'inline-block';
      } else {
        el.messagesUnreadBadge.style.display = 'none';
      }
    }

    // Count badges on filter chips
    const openCount = visibleThreads.filter(t => t.status === 'open').length;
    const answeredCount = visibleThreads.filter(t => t.status === 'answered').length;
    const resolvedCount = visibleThreads.filter(t => t.status === 'resolved').length;

    if (el.countStatusAll) el.countStatusAll.textContent = visibleThreads.length;
    if (el.countStatusOpen) el.countStatusOpen.textContent = openCount;
    if (el.countStatusAnswered) el.countStatusAnswered.textContent = answeredCount;
    if (el.countStatusResolved) el.countStatusResolved.textContent = resolvedCount;
  }

  function getFilteredSupportThreads(threads) {
    const currentUser = getCurrentUserSupportInfo();
    const query = (supportSearchQuery || '').trim().toLowerCase();

    return threads.filter(t => {
      // Programme match via relational programme_id or legacy programme key
      const progId = t.programme_id ? getProgrammeKey(t.programme_id) : (t.programme ? getProgrammeKey(t.programme) : null);
      if (progId && progId !== currentProgrammeId) return false;

      // Learner sees only their own threads in Learner view (demo seeds visible to all learners)
      if (supportRole === 'learner' && currentUser.id && t.learner_id) {
        const isDemoSeed = t.id && t.id.startsWith('thread_seed_');
        const isOwner = t.learner_id === currentUser.id || t.learner_id === 'usr_1' || t.learner_id === 'local_user';
        if (!isOwner && !isDemoSeed) {
          return false;
        }
      }

      // Status filter
      if (supportFilter !== 'all' && t.status !== supportFilter) {
        return false;
      }

      // Category filter
      if (supportCategoryFilter && t.category !== supportCategoryFilter) {
        return false;
      }

      // Instructor filter
      if (supportInstructorFilter && t.instructor_id !== supportInstructorFilter) {
        return false;
      }

      // Search query (matches subject or message body)
      if (query) {
        const subjectMatch = (t.subject || '').toLowerCase().includes(query);
        const previewMatch = (t.last_message_preview || '').toLowerCase().includes(query);
        const msgMatch = (t.messages || []).some(m => (m.body || '').toLowerCase().includes(query));
        if (!subjectMatch && !previewMatch && !msgMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      const timeA = new Date(a.last_message_at || a.updated_at || a.created_at).getTime();
      const timeB = new Date(b.last_message_at || b.updated_at || b.created_at).getTime();
      return timeB - timeA;
    });
  }

  

  // Render left panel threads list
  function renderSupportThreadsList() {
    const allThreads = getLocalSupportThreads();
    const filtered = getFilteredSupportThreads(allThreads);
    updateSupportUnreadBadge(allThreads);
    renderInstructorStatsStrip(allThreads);

    // Sync active class on filter chip buttons
    if (el.inboxStatusFilters) {
      el.inboxStatusFilters.querySelectorAll('.filter-chip-btn, button[data-status]').forEach(btn => {
        const s = btn.getAttribute('data-status') || 'all';
        btn.classList.toggle('active', s === supportFilter);
      });
    }

    if (!el.threadsList) return;

    // Keep conversation view aligned with filtered set
    const isSelectedInFiltered = filtered.some(t => t.id === supportActiveThreadId);
    if (!isSelectedInFiltered) {
      if (filtered.length > 0) {
        selectSupportThread(filtered[0].id);
      } else {
        renderActiveSupportConversation(null);
      }
    }

    if (filtered.length === 0) {
      el.threadsList.innerHTML = `
        <div class="empty-inbox-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <p>No messages found.</p>
          <span>Ask your instructor a question using the New Message button above.</span>
        </div>
      `;
      return;
    }

    const isLearner = supportRole === 'learner';

    el.threadsList.innerHTML = filtered.map(t => {
      const isSelected = t.id === supportActiveThreadId;
      const isUnread = isLearner ? t.unread_by_learner : t.unread_by_instructor;
      const timeAgo = formatSupportRelativeTime(t.last_message_at || t.updated_at || t.created_at);
      const statusClass = `status-${t.status || 'open'}`;
      const statusLabel = (t.status || 'open').charAt(0).toUpperCase() + (t.status || 'open').slice(1);

      return `
        <div class="support-thread-item ${isSelected ? 'selected' : ''} ${isUnread ? 'unread' : ''}" data-thread-id="${escapeHtml(t.id)}">
          <div class="thread-item-header">
            <span class="thread-item-subject ${isUnread ? 'is-unread' : ''}">${escapeHtml(t.subject || 'Untitled Thread')}</span>
            <span class="thread-item-time">${escapeHtml(timeAgo)}</span>
          </div>
          <div class="thread-item-preview">${escapeHtml(t.last_message_preview || 'No messages yet')}</div>
          <div class="thread-item-footer">
            <span class="thread-category-chip">${escapeHtml(t.category || 'General')}</span>
            <span class="thread-status-chip ${statusClass}">${escapeHtml(statusLabel)}</span>
            ${isUnread ? '<span class="unread-dot" title="Unread message"></span>' : ''}
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    el.threadsList.querySelectorAll('.support-thread-item').forEach(item => {
      item.addEventListener('click', () => {
        const tid = item.getAttribute('data-thread-id');
        selectSupportThread(tid);
      });
    });
  }

  

  // Select a thread and display conversation in right panel
  function selectSupportThread(threadId) {
    const allThreads = getLocalSupportThreads();
    const thread = allThreads.find(t => t.id === threadId);
    if (!thread) return;

    supportActiveThreadId = threadId;

    // Clear unread flag for active role
    if (supportRole === 'learner') {
      thread.unread_by_learner = false;
    } else {
      thread.unread_by_instructor = false;
    }

    // Mark messages as read
    if (thread.messages) {
      thread.messages.forEach(m => {
        if (!m.read_at && m.sender_role !== supportRole) {
          m.read_at = new Date().toISOString();
        }
      });
    }

    saveLocalSupportThreads(allThreads);

    // On mobile screens (<1024px), toggle conversation panel full-screen
    if (el.supportLayoutContainer) {
      el.supportLayoutContainer.classList.add('mobile-thread-open');
    }

    renderSupportThreadsList();
    renderActiveSupportConversation(thread);
  }

  // Render the conversation panel
  function renderActiveSupportConversation(thread) {
    if (!thread) {
      if (el.noThreadSelectedView) el.noThreadSelectedView.style.display = 'flex';
      if (el.activeConversationView) el.activeConversationView.style.display = 'none';
      return;
    }

    if (el.noThreadSelectedView) el.noThreadSelectedView.style.display = 'none';
    if (el.activeConversationView) el.activeConversationView.style.display = 'flex';

    // Header metadata
    if (el.threadSubjectHeading) {
      el.threadSubjectHeading.textContent = thread.subject || 'Support Query';
    }

    if (el.threadCategoryBadge) {
      el.threadCategoryBadge.textContent = thread.category || 'General';
    }

    if (el.threadStatusBadge) {
      const st = thread.status || 'open';
      el.threadStatusBadge.className = `status-badge-chip status-${st}`;
      el.threadStatusBadge.textContent = st.charAt(0).toUpperCase() + st.slice(1);
    }

    if (el.threadModuleLinkChip) {
      if (thread.module_title) {
        el.threadModuleLinkChip.style.display = 'inline-flex';
        if (el.threadModuleLinkLabel) el.threadModuleLinkLabel.textContent = thread.module_title;
        el.threadModuleLinkChip.onclick = () => {
          if (thread.module_id) {
            currentModuleId = thread.module_id;
            switchScreen('module');
          }
        };
      } else {
        el.threadModuleLinkChip.style.display = 'none';
      }
    }

    if (el.threadAssignedInstructorText) {
      el.threadAssignedInstructorText.textContent = thread.instructor_name || 'Any instructor';
    }

    if (el.threadCreatedDateText) {
      const dateStr = new Date(thread.created_at || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
      el.threadCreatedDateText.textContent = `Started on ${dateStr}`;
    }

    // Staff dropdowns sync
    if (el.threadStatusSelect) {
      el.threadStatusSelect.value = thread.status || 'open';
    }
    if (el.threadAssignSelect) {
      el.threadAssignSelect.value = thread.instructor_id || '';
    }

    // Render Messages list
    if (el.threadMessagesScroll) {
      el.threadMessagesScroll.innerHTML = '';
      const messages = thread.messages || [];

      // Combine messages with internal notes if user is instructor
      const itemsToRender = [...messages];
      if (supportRole === 'instructor' && Array.isArray(thread.internal_notes)) {
        thread.internal_notes.forEach(note => {
          itemsToRender.push({
            ...note,
            isInternalNote: true
          });
        });
      }

      itemsToRender.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

      itemsToRender.forEach(msg => {
        // Skip empty messages with no text and no attachments
        if (!msg.isInternalNote) {
          const hasBody = Boolean(msg.body && msg.body.trim());
          const hasAtt = Boolean(Array.isArray(msg.attachments) && msg.attachments.length > 0);
          if (!hasBody && !hasAtt) return;
        }
        if (msg.isInternalNote) {
          const noteEl = document.createElement('div');
          noteEl.className = 'internal-note-callout';
          noteEl.innerHTML = `
            <div class="note-header">
              <span class="note-tag">🔒 Private Staff Note</span>
              <span class="note-meta">${escapeHtml(msg.author_name || 'Instructor')} • ${escapeHtml(formatSupportRelativeTime(msg.created_at))}</span>
            </div>
            <div class="note-body">${escapeHtml(msg.body)}</div>
          `;
          el.threadMessagesScroll.appendChild(noteEl);
          return;
        }

        const isUserMsg = msg.sender_role === 'learner';
        const roleLabel = msg.sender_role === 'instructor' ? 'Instructor' : 'Learner';
        const timeFormatted = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const readStatusHtml = isUserMsg ? (msg.read_at ? '<span class="read-receipt seen" title="Seen by instructor">✓✓ Seen</span>' : '<span class="read-receipt" title="Sent">✓ Sent</span>') : '';

        // Attachment chips
        let attachmentsHtml = '';
        if (Array.isArray(msg.attachments) && msg.attachments.length > 0) {
          attachmentsHtml = `<div class="msg-attachments-wrap">` + msg.attachments.map(att => `
            <a href="${att.url || '#'}" target="_blank" class="msg-attachment-chip" title="Click to view file">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              <span class="attachment-name">${escapeHtml(att.name)}</span>
              <span class="attachment-size">${escapeHtml(att.size || '')}</span>
            </a>
          `).join('') + `</div>`;
        }

        const bubble = document.createElement('div');
        bubble.className = `thread-bubble-row ${isUserMsg ? 'is-learner' : 'is-instructor'}`;
        bubble.innerHTML = `
          <div class="thread-bubble">
            <div class="bubble-header">
              <span class="sender-name">${escapeHtml(msg.sender_name || (isUserMsg ? 'Learner' : 'Instructor'))}</span>
              <span class="role-badge ${isUserMsg ? 'learner-badge' : 'instructor-badge'}">${escapeHtml(roleLabel)}</span>
              <span class="msg-timestamp">${escapeHtml(timeFormatted)}</span>
            </div>
            <div class="bubble-body">${escapeHtml(msg.body).replace(/\n/g, '<br>')}</div>
            ${attachmentsHtml}
            <div class="bubble-receipt-bar">${readStatusHtml}</div>
          </div>
        `;
        el.threadMessagesScroll.appendChild(bubble);
      });

      // Scroll to bottom
      el.threadMessagesScroll.scrollTop = el.threadMessagesScroll.scrollHeight;
    }

    // Rating Card & Reopen Bar (If thread is Resolved)
    const isResolved = thread.status === 'resolved';

    if (el.threadRatingCard) {
      el.threadRatingCard.style.display = isResolved ? 'block' : 'none';
      if (isResolved) {
        renderRatingCardState(thread);
      }
    }

    if (el.threadComposerBox) {
      // Hide composer if thread is resolved
      el.threadComposerBox.style.display = isResolved ? 'none' : 'block';
    }
  }

  // Render Rating Card for Resolved Threads
  function renderRatingCardState(thread) {
    if (!el.threadRatingCard) return;

    if (thread.rating) {
      if (el.ratingActionsBox) el.ratingActionsBox.style.display = 'none';
      if (el.ratingThankYouMessage) {
        el.ratingThankYouMessage.style.display = 'flex';
        const ratingLabel = thread.rating === 'helpful' ? '👍 Helpful' : '👎 Not helpful';
        el.ratingThankYouMessage.querySelector('.thank-you-badge').textContent = `Thanks for your feedback (${ratingLabel})!`;
      }
    } else {
      if (el.ratingActionsBox) el.ratingActionsBox.style.display = 'block';
      if (el.ratingThankYouMessage) el.ratingThankYouMessage.style.display = 'none';
      if (el.thumbUpBtn) el.thumbUpBtn.classList.remove('active');
      if (el.thumbDownBtn) el.thumbDownBtn.classList.remove('active');
      if (el.ratingCommentWrap) el.ratingCommentWrap.style.display = 'none';
      if (el.ratingCommentInput) el.ratingCommentInput.value = '';
    }
  }

  // Handle composer submit
  async function handleSendReply(e) {
    if (e) e.preventDefault();
    if (!supportActiveThreadId) return;

    const text = (el.composerTextarea.value || '').trim();
    if (!text && supportComposerFiles.length === 0) return;

    if (text.length > 2000) {
      showToast('Message exceeds maximum limit of 2000 characters.');
      return;
    }

    // Rate limit check
    if (!checkRateLimitAllowed()) {
      showToast('Rate limit reached: Maximum 10 messages per minute.');
      return;
    }

    const allThreads = getLocalSupportThreads();
    const thread = allThreads.find(t => t.id === supportActiveThreadId);
    if (!thread) return;

    const currentUser = getCurrentUserSupportInfo();
    const nowIso = new Date().toISOString();

    // Check if posting an internal note (Staff only)
    if (supportRole === 'instructor' && supportIsInternalNoteMode) {
      if (!Array.isArray(thread.internal_notes)) thread.internal_notes = [];
      const newNote = {
        id: `note_${Date.now()}`,
        author_id: currentUser.id,
        author_name: currentUser.name || 'Instructor',
        body: text,
        created_at: nowIso
      };
      thread.internal_notes.push(newNote);
      thread.updated_at = nowIso;
      saveLocalSupportThreads(allThreads);

      // Reset composer
      el.composerTextarea.value = '';
      if (el.composerCharCount) el.composerCharCount.textContent = '0 / 2000';
      supportIsInternalNoteMode = false;
      updateInternalNoteUI();
      renderActiveSupportConversation(thread);
      showToast('Private note added.');
      return;
    }

    // Normal message
    const attachments = supportComposerFiles.map(f => ({
      name: f.name,
      size: formatFileSize(f.size),
      url: f.previewUrl || '#'
    }));

    const newMsg = {
      id: `msg_${Date.now()}`,
      thread_id: thread.id,
      sender_id: currentUser.id,
      sender_name: currentUser.name || (supportRole === 'instructor' ? 'Instructor' : 'Learner'),
      sender_role: supportRole,
      body: text,
      attachments: attachments,
      created_at: nowIso,
      read_at: null
    };

    if (!Array.isArray(thread.messages)) thread.messages = [];
    thread.messages.push(newMsg);
    thread.last_message_at = nowIso;
    thread.last_message_preview = text.slice(0, 90) + (text.length > 90 ? '...' : '');
    thread.updated_at = nowIso;

    if (supportRole === 'instructor') {
      // Sending an instructor reply automatically sets status to Answered
      thread.status = 'answered';
      thread.unread_by_learner = true;
      thread.unread_by_instructor = false;
    } else {
      thread.status = 'open';
      thread.unread_by_learner = false;
      thread.unread_by_instructor = true;
    }

    saveLocalSupportThreads(allThreads);

    // Reset composer state
    el.composerTextarea.value = '';
    supportComposerFiles = [];
    renderComposerAttachmentsPreview();
    if (el.composerCharCount) el.composerCharCount.textContent = '0 / 2000';

    renderSupportThreadsList();
    renderActiveSupportConversation(thread);

    // Send email notification via Edge Function in background
    notifySupportEmailEvent({
      type: supportRole === 'instructor' ? 'instructor_reply' : 'learner_reply',
      threadId: thread.id,
      subject: thread.subject,
      body: text,
      programme: currentProgrammeId,
      senderName: newMsg.sender_name,
      recipientEmail: supportRole === 'instructor' ? thread.learner_email : 'instructors@ikaaiindia.org'
    });
  }

  

  // Format file size
  function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Handle composer attachments preview
  function renderComposerAttachmentsPreview() {
    if (!el.composerAttachmentsPreview) return;
    if (supportComposerFiles.length === 0) {
      el.composerAttachmentsPreview.style.display = 'none';
      el.composerAttachmentsPreview.innerHTML = '';
      return;
    }

    el.composerAttachmentsPreview.style.display = 'flex';
    el.composerAttachmentsPreview.innerHTML = supportComposerFiles.map((f, idx) => `
      <div class="composer-file-chip">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
        <span>${escapeHtml(f.name)} (${formatFileSize(f.size)})</span>
        <button type="button" class="btn-remove-att" data-idx="${idx}">×</button>
      </div>
    `).join('');

    el.composerAttachmentsPreview.querySelectorAll('.btn-remove-att').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        supportComposerFiles.splice(idx, 1);
        renderComposerAttachmentsPreview();
      });
    });
  }

  

  // Toggle Internal Note Mode (Staff Only)
  function updateInternalNoteUI() {
    if (!el.threadComposerBox || !el.toggleInternalNoteBtn) return;
    if (supportIsInternalNoteMode) {
      el.threadComposerBox.classList.add('internal-note-mode');
      el.toggleInternalNoteBtn.classList.add('active');
      if (el.internalNoteToggleLabel) el.internalNoteToggleLabel.textContent = 'Cancel Internal Note';
      if (el.composerTextarea) el.composerTextarea.placeholder = 'Write a private staff note (visible only to instructors & admins)...';
    } else {
      el.threadComposerBox.classList.remove('internal-note-mode');
      el.toggleInternalNoteBtn.classList.remove('active');
      if (el.internalNoteToggleLabel) el.internalNoteToggleLabel.textContent = 'Add Private Internal Note';
      if (el.composerTextarea) el.composerTextarea.placeholder = 'Write your reply... (Press Enter to send, Shift+Enter for new line)';
    }
  }

  // Reopen conversation handler
  function handleReopenThread() {
    if (!supportActiveThreadId) return;
    const allThreads = getLocalSupportThreads();
    const thread = allThreads.find(t => t.id === supportActiveThreadId);
    if (!thread) return;

    thread.status = 'open';
    thread.updated_at = new Date().toISOString();
    thread.unread_by_instructor = true;
    thread.unread_by_learner = false;

    saveLocalSupportThreads(allThreads);
    renderSupportThreadsList();
    renderActiveSupportConversation(thread);
    showToast('Conversation reopened. Your instructor has been notified.');
  }

  // Rating handlers
  let selectedRatingTemp = null;
  function handleRatingClick(val) {
    selectedRatingTemp = val;
    if (el.thumbUpBtn) el.thumbUpBtn.classList.toggle('active', val === 'helpful');
    if (el.thumbDownBtn) el.thumbDownBtn.classList.toggle('active', val === 'unhelpful');
    if (el.ratingCommentWrap) el.ratingCommentWrap.style.display = 'block';
    if (el.ratingCommentInput) el.ratingCommentInput.focus();
  }

  function submitRatingFeedback() {
    if (!supportActiveThreadId || !selectedRatingTemp) return;
    const allThreads = getLocalSupportThreads();
    const thread = allThreads.find(t => t.id === supportActiveThreadId);
    if (!thread) return;

    // Normalize rating to check constraint ('up' | 'down')
    const normalizedRating = (selectedRatingTemp === 'helpful' || selectedRatingTemp === 'up') ? 'up' : 'down';
    thread.rating = normalizedRating;
    thread.rating_comment = (el.ratingCommentInput.value || '').trim();
    saveLocalSupportThreads(allThreads);

    renderRatingCardState(thread);
    renderInstructorStatsStrip(allThreads);
    showToast('Thank you for rating this conversation!');
  }

  // Quick Answers FAQ matching
  function searchModuleFaqs(query) {
    if (!query || query.trim().length < 3) return [];
    const qLower = query.toLowerCase().trim();
    const prog = getCurrentProgramme();
    const results = [];

    (prog.modules || []).forEach(mod => {
      (mod.faqs || []).forEach(faq => {
        const questionText = (faq.q || '').toLowerCase();
        const answerText = (faq.a || '').toLowerCase();
        if (questionText.includes(qLower) || answerText.includes(qLower) || qLower.split(' ').some(word => word.length > 3 && questionText.includes(word))) {
          results.push({
            id: faq.id,
            q: faq.q,
            a: faq.a,
            modTitle: mod.title
          });
        }
      });
    });

    return results.slice(0, 3);
  }

  function renderQuickAnswersList(faqs) {
    if (!el.quickAnswersBox || !el.quickAnswersList) return;
    if (faqs.length === 0) {
      el.quickAnswersBox.style.display = 'none';
      el.quickAnswersList.innerHTML = '';
      return;
    }

    el.quickAnswersBox.style.display = 'block';
    el.quickAnswersList.innerHTML = faqs.map(faq => `
      <div class="quick-answer-item" data-faq-id="${escapeHtml(faq.id)}">
        <div class="faq-item-question">
          <span class="faq-icon">💡</span>
          <span class="faq-q-text">${escapeHtml(faq.q)}</span>
          <span class="faq-expand-arrow">▾</span>
        </div>
        <div class="faq-item-answer" style="display: none;">
          <p>${escapeHtml(faq.a)}</p>
          <div class="faq-action-row">
            <button type="button" class="btn-faq-resolved primary-accent-btn small-btn">This answered my question</button>
            <span class="btn-faq-continue">No, keep sending message</span>
          </div>
        </div>
      </div>
    `).join('');

    el.quickAnswersList.querySelectorAll('.quick-answer-item').forEach(item => {
      const qRow = item.querySelector('.faq-item-question');
      const ansRow = item.querySelector('.faq-item-answer');
      const resolveBtn = item.querySelector('.btn-faq-resolved');
      const continueBtn = item.querySelector('.btn-faq-continue');

      qRow.addEventListener('click', () => {
        const isOpen = ansRow.style.display === 'block';
        ansRow.style.display = isOpen ? 'none' : 'block';
        item.classList.toggle('is-open', !isOpen);
      });

      resolveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeNewThreadModal();
        showToast('Glad we could help! Your question was answered by our instant FAQs.');
      });

      continueBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ansRow.style.display = 'none';
        item.classList.remove('is-open');
      });
    });
  }

  

  // Open & Close New Message Modal
  function openNewThreadModal() {
    if (!el.newMessageModal) return;

    // Reset form
    if (el.newThreadForm) el.newThreadForm.reset();
    if (el.subjectCharCount) el.subjectCharCount.textContent = '0 / 120';
    if (el.messageCharCount) el.messageCharCount.textContent = '0 / 2000';
    if (el.quickAnswersBox) el.quickAnswersBox.style.display = 'none';
    if (el.newThreadErrorAlert) el.newThreadErrorAlert.style.display = 'none';
    if (el.newThreadFileError) el.newThreadFileError.style.display = 'none';
    supportNewThreadFiles = [];
    renderNewThreadFilesList();

    // Populate instructor select
    if (el.newThreadInstructorSelect) {
      const insts = getProgrammeInstructorsList();
      el.newThreadInstructorSelect.innerHTML = '<option value="">Any instructor (fastest reply)</option>' +
        insts.map(i => `<option value="${escapeHtml(i.id)}">${escapeHtml(i.name)} (${escapeHtml(i.role)})</option>`).join('');
    }

    // Populate module select
    if (el.newThreadModuleSelect) {
      const prog = getCurrentProgramme();
      el.newThreadModuleSelect.innerHTML = '<option value="">General (No specific module)</option>' +
        (prog.modules || []).map(m => `<option value="${escapeHtml(m.id)}">${escapeHtml(m.title)}</option>`).join('');
    }

    el.newMessageModal.style.display = 'flex';
  }

  function closeNewThreadModal() {
    if (el.newMessageModal) {
      el.newMessageModal.style.display = 'none';
    }
  }

  // New thread file uploads preview
  function renderNewThreadFilesList() {
    if (!el.newThreadFilesList) return;
    if (supportNewThreadFiles.length === 0) {
      el.newThreadFilesList.innerHTML = '';
      return;
    }

    el.newThreadFilesList.innerHTML = supportNewThreadFiles.map((f, idx) => `
      <div class="file-preview-card">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
        <span class="file-name">${escapeHtml(f.name)}</span>
        <span class="file-size">(${formatFileSize(f.size)})</span>
        <button type="button" class="btn-remove-file" data-idx="${idx}">×</button>
      </div>
    `).join('');

    el.newThreadFilesList.querySelectorAll('.btn-remove-file').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        supportNewThreadFiles.splice(idx, 1);
        renderNewThreadFilesList();
      });
    });
  }

  

  function validateAndAddFiles(files, targetArray, maxLimit = 3) {
    const allowedExts = ['png', 'jpg', 'jpeg', 'pdf', 'docx'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

    let error = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (targetArray.length >= maxLimit) {
        error = `Maximum ${maxLimit} files allowed.`;
        break;
      }
      const ext = file.name.split('.').pop().toLowerCase();
      if (!allowedExts.includes(ext)) {
        error = `Invalid file type "${ext}". Only PNG, JPG, PDF, and DOCX are allowed.`;
        break;
      }
      if (file.size > maxSizeBytes) {
        error = `File "${file.name}" exceeds the 5 MB limit (${formatFileSize(file.size)}).`;
        break;
      }

      targetArray.push(file);
    }

    return error;
  }

  // Handle Create New Thread Form Submit
  async function handleCreateNewThreadSubmit(e) {
    if (e) e.preventDefault();

    const subject = (el.newThreadSubjectInput.value || '').trim();
    const body = (el.newThreadBodyInput.value || '').trim();
    const category = el.newThreadCategorySelect.value;
    const instructorId = el.newThreadInstructorSelect.value;
    const moduleId = el.newThreadModuleSelect.value;

    let hasValidationErrors = false;
    const catErr = document.getElementById('categoryFieldError');
    const subErr = document.getElementById('subjectFieldError');
    const msgErr = document.getElementById('messageFieldError');

    if (!category) {
      if (catErr) { catErr.textContent = 'Please select a category.'; catErr.style.display = 'block'; }
      hasValidationErrors = true;
    } else if (catErr) { catErr.style.display = 'none'; }

    if (!subject) {
      if (subErr) { subErr.textContent = 'Please provide a subject line.'; subErr.style.display = 'block'; }
      hasValidationErrors = true;
    } else if (subErr) { subErr.style.display = 'none'; }

    if (!body) {
      if (msgErr) { msgErr.textContent = 'Please write your message.'; msgErr.style.display = 'block'; }
      hasValidationErrors = true;
    } else if (msgErr) { msgErr.style.display = 'none'; }

    if (hasValidationErrors) {
      return;
    }

    if (subject.length > 120) {
      showToast('Subject cannot exceed 120 characters.');
      return;
    }
    if (body.length > 2000) {
      showToast('Message cannot exceed 2000 characters.');
      return;
    }

    if (!checkRateLimitAllowed()) {
      showToast('Rate limit: Maximum 10 messages per minute. Please wait.');
      return;
    }

    // Disable button & show loading state
    if (el.submitNewThreadBtn) {
      el.submitNewThreadBtn.disabled = true;
      el.submitNewThreadBtn.innerHTML = '<span class="spinner-small"></span> Sending...';
    }

    const insts = getProgrammeInstructorsList();
    const assignedInst = insts.find(i => i.id === instructorId) || insts[0] || { id: 'inst_1', name: 'Instructor' };

    const prog = getCurrentProgramme();
    const linkedModule = (prog.modules || []).find(m => m.id === moduleId);

    const currentUser = getCurrentUserSupportInfo();
    const nowIso = new Date().toISOString();
    const threadId = `thread_${Date.now()}`;

    const attachments = supportNewThreadFiles.map(f => ({
      name: f.name,
      size: formatFileSize(f.size),
      url: '#'
    }));

    const progId = getProgrammeDbId(currentProgrammeId);
    const normalizedCat = normalizeSupportCategory(category);
    const newThread = {
      id: threadId,
      programme_id: progId, // Relational reference
      programme: currentProgrammeId, // Deprecated: backward compatibility
      subject: subject,
      category: normalizedCat, // Check constraint compliant
      module_ref: linkedModule ? (linkedModule.id && linkedModule.id.length > 20 ? linkedModule.id : null) : null,
      module_id: moduleId || null,
      module_title: linkedModule ? linkedModule.title : null,
      status: 'open',
      learner_name: currentUser.name || 'Learner',
      learner_email: currentUser.email || 'learner@ikaaiindia.org',
      learner_id: currentUser.id || 'usr_1',
      instructor_id: assignedInst.id,
      instructor_name: assignedInst.name,
      created_at: nowIso,
      updated_at: nowIso,
      last_message_at: nowIso,
      last_message_preview: body.slice(0, 90) + (body.length > 90 ? '...' : ''),
      unread_by_learner: false,
      unread_by_instructor: true,
      rating: null,
      rating_comment: '',
      resolved_at: null,
      messages: [
        {
          id: `msg_${Date.now()}`,
          thread_id: threadId,
          sender_id: currentUser.id || 'usr_1',
          sender_name: currentUser.name || 'Learner',
          sender_role: 'learner',
          body: body,
          attachments: attachments,
          created_at: nowIso,
          read_at: null
        }
      ],
      internal_notes: []
    };

    const allThreads = getLocalSupportThreads();
    allThreads.unshift(newThread);
    saveLocalSupportThreads(allThreads);

    // Reset button
    if (el.submitNewThreadBtn) {
      el.submitNewThreadBtn.disabled = false;
      el.submitNewThreadBtn.textContent = 'Send message';
    }

    closeNewThreadModal();
    selectSupportThread(threadId);
    showToast("Your message was sent. You'll be notified when an instructor replies.");

    // Edge function email notification
    notifySupportEmailEvent({
      type: 'new_thread',
      threadId: newThread.id,
      subject: newThread.subject,
      body: body,
      category: newThread.category,
      programme: currentProgrammeId,
      senderName: newThread.learner_name,
      recipientEmail: 'instructors@ikaaiindia.org'
    });
  }

  

  // Canned Replies Modal & Handling
  function openCannedRepliesModal() {
    if (!el.cannedRepliesModal || !el.cannedRepliesList) return;
    const replies = getLocalCannedReplies();

    el.cannedRepliesList.innerHTML = replies.map(r => `
      <div class="canned-reply-card" data-reply-id="${escapeHtml(r.id)}">
        <div class="canned-reply-title">${escapeHtml(r.title)}</div>
        <div class="canned-reply-body">${escapeHtml(r.body)}</div>
        <div class="canned-reply-action">
          <button type="button" class="btn-insert-template small-btn primary-accent-btn">Insert this template</button>
        </div>
      </div>
    `).join('');

    el.cannedRepliesList.querySelectorAll('.btn-insert-template').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.canned-reply-card');
        const rId = card.getAttribute('data-reply-id');
        const found = replies.find(r => r.id === rId);
        if (found && el.composerTextarea) {
          el.composerTextarea.value = found.body;
          if (el.composerCharCount) {
            el.composerCharCount.textContent = `${found.body.length} / 2000`;
          }
          el.cannedRepliesModal.style.display = 'none';
          el.composerTextarea.focus();
        }
      });
    });

    el.cannedRepliesModal.style.display = 'flex';
  }

  // Staff Dropdown Actions: Change Status & Assign
  function handleStaffStatusChange(newStatus) {
    if (!supportActiveThreadId) return;
    const allThreads = getLocalSupportThreads();
    const thread = allThreads.find(t => t.id === supportActiveThreadId);
    if (!thread) return;

    thread.status = newStatus;
    thread.updated_at = new Date().toISOString();
    if (newStatus === 'resolved') {
      thread.resolved_at = new Date().toISOString();
    }
    saveLocalSupportThreads(allThreads);

    renderSupportThreadsList();
    renderActiveSupportConversation(thread);
    showToast(`Status updated to ${newStatus.toUpperCase()}`);
  }

  function handleStaffAssignChange(newInstructorId) {
    if (!supportActiveThreadId) return;
    const allThreads = getLocalSupportThreads();
    const thread = allThreads.find(t => t.id === supportActiveThreadId);
    if (!thread) return;

    const insts = getProgrammeInstructorsList();
    const foundInst = insts.find(i => i.id === newInstructorId);
    if (foundInst) {
      thread.instructor_id = foundInst.id;
      thread.instructor_name = foundInst.name;
      thread.updated_at = new Date().toISOString();
      saveLocalSupportThreads(allThreads);

      renderSupportThreadsList();
      renderActiveSupportConversation(thread);
      showToast(`Assigned to ${foundInst.name}`);
    }
  }

  // Setup Supabase Realtime Channel
  function setupSupabaseRealtimeSupport() {
    if (!window.supabaseClient || supportRealtimeChannel) return;

    try {
      supportRealtimeChannel = window.supabaseClient
        .channel('public:support_inbox')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
          handleIncomingRealtimeMessage(payload);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'message_threads' }, payload => {
          handleIncomingRealtimeThread(payload);
        })
        .subscribe();
    } catch (err) {
      console.warn('Realtime channel error:', err);
    }
  }

  function teardownSupabaseRealtimeSupport() {
    if (supportRealtimeChannel && window.supabaseClient) {
      try {
        window.supabaseClient.removeChannel(supportRealtimeChannel);
        supportRealtimeChannel = null;
      } catch (err) { }
    }
  }

  function handleIncomingRealtimeMessage(payload) {
    if (!payload || !payload.new) return;
    const newMsg = payload.new;
    const allThreads = getLocalSupportThreads();
    const thread = allThreads.find(t => t.id === newMsg.thread_id);

    if (thread) {
      if (!Array.isArray(thread.messages)) thread.messages = [];
      if (!thread.messages.some(m => m.id === newMsg.id)) {
        thread.messages.push(newMsg);
        thread.last_message_at = newMsg.created_at;
        thread.last_message_preview = (newMsg.body || '').slice(0, 90);
        if (newMsg.sender_role === 'instructor') {
          thread.unread_by_learner = true;
          if (currentScreenKey !== 'messages') {
            showToast(`New reply from ${newMsg.sender_name || 'Instructor'}: ${thread.last_message_preview}`);
          }
        } else {
          thread.unread_by_instructor = true;
        }
        saveLocalSupportThreads(allThreads);

        if (currentScreenKey === 'messages') {
          renderSupportThreadsList();
          if (supportActiveThreadId === thread.id) {
            renderActiveSupportConversation(thread);
          }
        } else {
          updateSupportUnreadBadge(allThreads);
        }
      }
    }
  }

  function handleIncomingRealtimeThread(payload) {
    if (!payload || !payload.new) return;
    const newThread = payload.new;
    const allThreads = getLocalSupportThreads();
    const existingIdx = allThreads.findIndex(t => t.id === newThread.id);

    if (existingIdx >= 0) {
      allThreads[existingIdx] = { ...allThreads[existingIdx], ...newThread };
    } else {
      allThreads.unshift(newThread);
    }
    saveLocalSupportThreads(allThreads);

    if (currentScreenKey === 'messages') {
      renderSupportThreadsList();
    } else {
      updateSupportUnreadBadge(allThreads);
    }
  }

  // Initialize event bindings once
  function initSupportInbox() {
    if (supportInitialized) return;
    supportInitialized = true;

    // Role toggle buttons
    if (el.roleLearnerToggleBtn) {
      el.roleLearnerToggleBtn.addEventListener('click', () => {
        supportRole = 'learner';
        renderSupportInfoCard();
        renderSupportThreadsList();
        if (supportActiveThreadId) {
          const thread = getLocalSupportThreads().find(t => t.id === supportActiveThreadId);
          renderActiveSupportConversation(thread);
        }
      });
    }

    if (el.roleInstructorToggleBtn) {
      el.roleInstructorToggleBtn.addEventListener('click', () => {
        supportRole = 'instructor';
        renderSupportInfoCard();
        renderSupportThreadsList();
        if (supportActiveThreadId) {
          const thread = getLocalSupportThreads().find(t => t.id === supportActiveThreadId);
          renderActiveSupportConversation(thread);
        }
      });
    }

    // Status filter chips
    if (el.inboxStatusFilters) {
      const filterChips = el.inboxStatusFilters.querySelectorAll('.filter-chip-btn, button[data-status]');
      filterChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.preventDefault();
          filterChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          supportFilter = chip.getAttribute('data-status') || 'all';
          renderSupportThreadsList();
        });
      });
    }

    // Category filter dropdown
    if (el.inboxCategoryFilter) {
      el.inboxCategoryFilter.addEventListener('change', (e) => {
        supportCategoryFilter = e.target.value;
        renderSupportThreadsList();
      });
    }

    // Instructor filter dropdown
    if (el.inboxInstructorFilter) {
      el.inboxInstructorFilter.addEventListener('change', (e) => {
        supportInstructorFilter = e.target.value;
        renderSupportThreadsList();
      });
    }

    // Search box
    if (el.inboxSearchInput) {
      el.inboxSearchInput.addEventListener('input', (e) => {
        supportSearchQuery = e.target.value;
        if (el.clearInboxSearchBtn) {
          el.clearInboxSearchBtn.style.display = supportSearchQuery ? 'block' : 'none';
        }
        renderSupportThreadsList();
      });
    }

    if (el.clearInboxSearchBtn) {
      el.clearInboxSearchBtn.addEventListener('click', () => {
        el.inboxSearchInput.value = '';
        supportSearchQuery = '';
        el.clearInboxSearchBtn.style.display = 'none';
        renderSupportThreadsList();
      });
    }

    // Back to inbox button (mobile <1024px)
    if (el.backToInboxBtn) {
      el.backToInboxBtn.addEventListener('click', () => {
        if (el.supportLayoutContainer) {
          el.supportLayoutContainer.classList.remove('mobile-thread-open');
        }
      });
    }

    // Open New Message modal buttons
    if (el.openNewThreadBtn) {
      el.openNewThreadBtn.addEventListener('click', openNewThreadModal);
    }
    if (el.startFirstThreadBtn) {
      el.startFirstThreadBtn.addEventListener('click', openNewThreadModal);
    }
    if (el.closeNewMessageModalBtn) {
      el.closeNewMessageModalBtn.addEventListener('click', closeNewThreadModal);
    }
    if (el.cancelNewThreadBtn) {
      el.cancelNewThreadBtn.addEventListener('click', closeNewThreadModal);
    }

    function checkNewThreadFormValidity() {
      const subject = (el.newThreadSubjectInput ? el.newThreadSubjectInput.value : '').trim();
      const body = (el.newThreadBodyInput ? el.newThreadBodyInput.value : '').trim();
      const category = el.newThreadCategorySelect ? el.newThreadCategorySelect.value : '';
      const isValid = Boolean(subject.length > 0 && body.length > 0 && category);
      if (el.submitNewThreadBtn) {
        el.submitNewThreadBtn.disabled = !isValid;
      }
      return isValid;
    }

    if (el.newThreadCategorySelect) {
      el.newThreadCategorySelect.addEventListener('change', checkNewThreadFormValidity);
    }

    // Subject counter & live FAQ search
    if (el.newThreadSubjectInput) {
      el.newThreadSubjectInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (el.subjectCharCount) el.subjectCharCount.textContent = `${val.length} / 120`;
        checkNewThreadFormValidity();
        const faqs = searchModuleFaqs(val);
        renderQuickAnswersList(faqs);
      });
    }

    // Body counter & live FAQ search
    if (el.newThreadBodyInput) {
      el.newThreadBodyInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (el.messageCharCount) el.messageCharCount.textContent = `${val.length} / 2000`;
        checkNewThreadFormValidity();
        if ((!el.quickAnswersBox || el.quickAnswersBox.style.display === 'none') && val.length > 5) {
          const faqs = searchModuleFaqs(val);
          renderQuickAnswersList(faqs);
        }
      });
    }

    // Dismiss FAQ box
    if (el.dismissQuickAnswersBtn) {
      el.dismissQuickAnswersBtn.addEventListener('click', () => {
        if (el.quickAnswersBox) el.quickAnswersBox.style.display = 'none';
      });
    }

    // New thread file attachment handling
    if (el.newThreadFileInput) {
      el.newThreadFileInput.addEventListener('change', (e) => {
        const err = validateAndAddFiles(e.target.files, supportNewThreadFiles, 3);
        if (el.newThreadFileError) {
          if (err) {
            el.newThreadFileError.textContent = err;
            el.newThreadFileError.style.display = 'block';
          } else {
            el.newThreadFileError.style.display = 'none';
          }
        }
        renderNewThreadFilesList();
        e.target.value = '';
      });
    }

    // Dropzone drag & drop
    if (el.newThreadDropzone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        el.newThreadDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          el.newThreadDropzone.classList.add('drag-over');
        });
      });
      ['dragleave', 'drop'].forEach(eventName => {
        el.newThreadDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          el.newThreadDropzone.classList.remove('drag-over');
        });
      });
      el.newThreadDropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files) {
          const err = validateAndAddFiles(e.dataTransfer.files, supportNewThreadFiles, 3);
          if (el.newThreadFileError) {
            if (err) {
              el.newThreadFileError.textContent = err;
              el.newThreadFileError.style.display = 'block';
            } else {
              el.newThreadFileError.style.display = 'none';
            }
          }
          renderNewThreadFilesList();
        }
      });
    }

    // Form submit
    if (el.newThreadForm) {
      el.newThreadForm.addEventListener('submit', handleCreateNewThreadSubmit);
    }

    // Composer input and submit
    if (el.composerTextarea) {
      el.composerTextarea.addEventListener('input', (e) => {
        if (el.composerCharCount) {
          el.composerCharCount.textContent = `${e.target.value.length} / 2000`;
        }
      });

      // Enter sends, Shift+Enter for newline
      el.composerTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendReply();
        }
      });
    }

    if (el.threadComposerForm) {
      el.threadComposerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSendReply();
      });
    }

    // Composer file attachment
    if (el.composerFileInput) {
      el.composerFileInput.addEventListener('change', (e) => {
        const err = validateAndAddFiles(e.target.files, supportComposerFiles, 3);
        if (err) {
          showToast(err);
        }
        renderComposerAttachmentsPreview();
        e.target.value = '';
      });
    }

    // Staff actions: status & assignment
    if (el.threadStatusSelect) {
      el.threadStatusSelect.addEventListener('change', (e) => {
        handleStaffStatusChange(e.target.value);
      });
    }

    if (el.threadAssignSelect) {
      el.threadAssignSelect.addEventListener('change', (e) => {
        handleStaffAssignChange(e.target.value);
      });
    }

    // Internal Note Toggle
    if (el.toggleInternalNoteBtn) {
      el.toggleInternalNoteBtn.addEventListener('click', () => {
        supportIsInternalNoteMode = !supportIsInternalNoteMode;
        updateInternalNoteUI();
      });
    }

    // Canned Replies Modal
    if (el.openCannedRepliesBtn) {
      el.openCannedRepliesBtn.addEventListener('click', openCannedRepliesModal);
    }
    if (el.closeCannedRepliesModalBtn) {
      el.closeCannedRepliesModalBtn.addEventListener('click', () => {
        if (el.cannedRepliesModal) el.cannedRepliesModal.style.display = 'none';
      });
    }

    // Rating events
    if (el.thumbUpBtn) {
      el.thumbUpBtn.addEventListener('click', () => handleRatingClick('helpful'));
    }
    if (el.thumbDownBtn) {
      el.thumbDownBtn.addEventListener('click', () => handleRatingClick('unhelpful'));
    }
    if (el.submitRatingBtn) {
      el.submitRatingBtn.addEventListener('click', submitRatingFeedback);
    }
    if (el.changeRatingBtn) {
      el.changeRatingBtn.addEventListener('click', () => {
        if (!supportActiveThreadId) return;
        const allThreads = getLocalSupportThreads();
        const thread = allThreads.find(t => t.id === supportActiveThreadId);
        if (thread) {
          thread.rating = null;
          thread.rating_comment = '';
          saveLocalSupportThreads(allThreads);
          renderRatingCardState(thread);
        }
      });
    }

    // Reopen thread button
    if (el.reopenThreadBtn) {
      el.reopenThreadBtn.addEventListener('click', handleReopenThread);
    }

    // Start realtime subscription
    setupSupabaseRealtimeSupport();
  }

  // Master Render function for Messages Section
  function renderMessagesScreen() {
    initSupportInbox();
    populateSupportFilterDropdowns();
    renderSupportInfoCard();

    const allThreads = getLocalSupportThreads();
    renderSupportThreadsList();

    // Auto-select first thread if none active
    if (!supportActiveThreadId && allThreads.length > 0) {
      selectSupportThread(allThreads[0].id);
    } else if (supportActiveThreadId) {
      const active = allThreads.find(t => t.id === supportActiveThreadId);
      if (active) {
        renderActiveSupportConversation(active);
      } else if (allThreads.length > 0) {
        selectSupportThread(allThreads[0].id);
      } else {
        renderActiveSupportConversation(null);
      }
    } else {
      renderActiveSupportConversation(null);
    }
  }

  // Cleanup when leaving messages section or logging out
  function cleanupSupportInbox() {
    teardownSupabaseRealtimeSupport();
  }


  // ==========================================
  // 14. ANNOUNCEMENTS NOTICEBOARD CONTROLLER
  // ==========================================

  let announcementCurrentCategory = 'All';
  let announcementSearchQuery = '';
  let announcementActiveTab = 'feed'; // 'feed' | 'manage'
  let announcementManageStatus = 'published'; // 'published' | 'draft' | 'archived'
  let cachedAnnouncements = [];
  let announcementsRealtimeChannel = null;

  async function renderAnnouncementsScreen() {
    const prog = getCurrentProgramme();
    if (el.programmeTitle) el.programmeTitle.textContent = prog.title;
    if (el.programmeDescription) el.programmeDescription.textContent = prog.description;

    const userRole = state.profile?.role || 'intern';
    const isStaff = (userRole === 'instructor' || userRole === 'admin');

    // Toggle staff view switch & new announcement button
    if (el.announcementsViewSwitch) {
      el.announcementsViewSwitch.style.display = isStaff ? 'inline-flex' : 'none';
    }
    if (el.openNewAnnouncementBtn) {
      el.openNewAnnouncementBtn.style.display = isStaff ? 'inline-flex' : 'none';
    }

    // Toggle feed vs manage container
    if (announcementActiveTab === 'manage' && isStaff) {
      if (el.announcementsFeedContainer) el.announcementsFeedContainer.style.display = 'none';
      if (el.announcementsManageContainer) el.announcementsManageContainer.style.display = 'block';
      if (el.announcementsFeedTabBtn) el.announcementsFeedTabBtn.classList.remove('active');
      if (el.announcementsManageTabBtn) el.announcementsManageTabBtn.classList.add('active');
      await renderAnnouncementsManageView();
    } else {
      announcementActiveTab = 'feed';
      if (el.announcementsFeedContainer) el.announcementsFeedContainer.style.display = 'block';
      if (el.announcementsManageContainer) el.announcementsManageContainer.style.display = 'none';
      if (el.announcementsFeedTabBtn) el.announcementsFeedTabBtn.classList.add('active');
      if (el.announcementsManageTabBtn) el.announcementsManageTabBtn.classList.remove('active');
      await renderAnnouncementsFeedView();
    }

    // Update unread badge on sidebar
    updateAnnouncementsUnreadBadge();

    // Setup realtime subscription
    setupAnnouncementsRealtime();
  }

  // A. Render Announcements Feed View
  async function renderAnnouncementsFeedView() {
    if (!el.announcementsFeed) return;
    el.announcementsFeed.innerHTML = '<div style="color: var(--text-muted); font-size: 13px; padding: 20px 0;">Loading noticeboard announcements...</div>';

    let currentUserId = null;
    if (window.SupabaseClient) {
      const u = await window.SupabaseClient.getUser();
      currentUserId = u?.id;
    }

    if (window.DataLayer) {
      try {
        cachedAnnouncements = await window.DataLayer.getAnnouncements({
          category: announcementCurrentCategory,
          search: announcementSearchQuery,
          status: 'published'
        });
      } catch (err) {
        console.warn('getAnnouncements error:', err);
        cachedAnnouncements = [];
      }
    }

    el.announcementsFeed.innerHTML = '';
    if (!cachedAnnouncements || cachedAnnouncements.length === 0) {
      if (el.emptyAnnouncementsState) el.emptyAnnouncementsState.style.display = 'block';
      return;
    }
    if (el.emptyAnnouncementsState) el.emptyAnnouncementsState.style.display = 'none';

    cachedAnnouncements.forEach(post => {
      const hasRead = post.announcement_reads?.some(r => r.user_id === currentUserId);
      const hasAcked = post.announcement_acks?.some(a => a.user_id === currentUserId);
      const isPinned = !!post.is_pinned;
      const isUrgent = !!post.is_urgent;
      const requiresAck = !!post.requires_ack;
      const commentsEnabled = !!post.comments_enabled;

      const authorName = post.author?.full_name || 'Ikaai Academic Coordinator';
      const authorRole = post.author?.role ? post.author.role.toUpperCase() : 'STAFF';
      const dateFormatted = post.publish_at ? new Date(post.publish_at).toLocaleDateString([], {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }) : 'Recently';

      const card = document.createElement('section');
      card.className = `card announcement-post-card ${hasRead ? '' : 'unread-card'}`;
      card.setAttribute('data-ann-id', post.id);

      // Safe body formatting
      const formattedBody = escapeHtml(post.body || '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

      card.innerHTML = `
        <div class="announcement-header" style="justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            ${!hasRead ? '<span class="unread-dot" title="Unread Notice"></span>' : ''}
            ${isPinned ? '<span class="badge-pill badge-pinned">📌 Pinned</span>' : ''}
            ${isUrgent ? '<span class="badge-pill badge-urgent">⚡ Urgent</span>' : ''}
            ${requiresAck ? '<span class="badge-pill badge-ack">Acknowledgement Required</span>' : ''}
            <span style="font-size: 11px; padding: 2px 8px; border-radius: var(--radius-sm); background: var(--bg-surface); border: 1px solid var(--border-subtle); color: var(--text-secondary); font-weight: 600;">${post.category}</span>
          </div>
          <span style="font-size: 11.5px; color: var(--text-muted);">${dateFormatted}</span>
        </div>

        <h3 class="announcement-post-title" style="margin-top: 4px; font-size: 16px;">${escapeHtml(post.title)}</h3>

        <div class="announcement-body" style="font-size: 13.5px; line-height: 1.6; color: var(--text-secondary);">
          <p style="margin: 0;">${formattedBody}</p>
        </div>

        <!-- Attachments Strip -->
        ${(post.announcement_files && post.announcement_files.length > 0) ? `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;">
            ${post.announcement_files.map(f => `
              <button type="button" class="announcement-attachment-btn dl-ann-file-btn" data-path="${f.storage_path}" data-name="${f.file_name}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>${f.file_name}</span>
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- Acknowledgement Action -->
        ${requiresAck ? `
          <div style="margin-top: 8px; padding: 12px 14px; border-radius: var(--radius-md); background: rgba(59, 130, 246, 0.06); border: 1px solid rgba(59, 130, 246, 0.25); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <span style="font-size: 12.5px; color: var(--text-primary); font-weight: 600;">
              ${hasAcked ? '✓ You acknowledged this announcement.' : 'Formal acknowledgement required for all cohort members.'}
            </span>
            ${!hasAcked ? `
              <button type="button" class="primary-accent-btn ack-ann-btn" data-ann-id="${post.id}" style="padding: 6px 16px; font-size: 12px;">
                I have read and acknowledge
              </button>
            ` : '<span style="font-size: 11.5px; color: var(--accent-light); font-weight: 700;">Acknowledged ✓</span>'}
          </div>
        ` : ''}

        <!-- Footer Strip -->
        <div class="announcement-meta-footer" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="author-name">${authorName}</span>
            <span class="badge-pill badge-role">${authorRole}</span>
          </div>
          ${commentsEnabled ? `
            <button type="button" class="secondary-btn toggle-comments-btn" data-ann-id="${post.id}" style="padding: 4px 10px; font-size: 11.5px; gap: 6px;">
              <span>💬 Comments (${post.announcement_comments ? post.announcement_comments.length : 0})</span>
            </button>
          ` : ''}
        </div>

        <!-- Optional Comments Container -->
        ${commentsEnabled ? `
          <div class="announcement-comments-wrap" id="commentsWrap_${post.id}" style="display: none; margin-top: 10px; padding-top: 12px; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 10px;">
            <div class="comments-list" style="display: flex; flex-direction: column; gap: 8px;">
              ${(post.announcement_comments || []).map(c => `
                <div style="padding: 8px 12px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                    <strong style="color: var(--text-primary);">${c.commenter?.full_name || 'Learner'}</strong>
                    <span style="font-size: 10.5px; color: var(--text-muted);">${c.created_at ? new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                  </div>
                  <div style="color: var(--text-secondary); line-height: 1.4;">${escapeHtml(c.body)}</div>
                </div>
              `).join('')}
            </div>
            <form class="announcement-comment-form" data-ann-id="${post.id}" style="display: flex; gap: 8px; margin-top: 4px;">
              <input type="text" class="form-text-input ann-comment-input" maxlength="500" placeholder="Write a short comment (max 500 chars)..." style="font-size: 12px; height: 32px;" required>
              <button type="submit" class="secondary-btn" style="padding: 4px 12px; font-size: 12px;">Post</button>
            </form>
          </div>
        ` : ''}
      `;

      // Mark as read on click
      card.addEventListener('click', async (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
        if (!hasRead && window.DataLayer) {
          try {
            await window.DataLayer.markAnnouncementRead(post.id);
            card.classList.remove('unread-card');
            const dot = card.querySelector('.unread-dot');
            if (dot) dot.remove();
            updateAnnouncementsUnreadBadge();
          } catch (err) {
            console.warn('markAnnouncementRead error:', err);
          }
        }
      });

      el.announcementsFeed.appendChild(card);
    });

    // Wire Attachment Downloads
    el.announcementsFeed.querySelectorAll('.dl-ann-file-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const path = btn.getAttribute('data-path');
        const name = btn.getAttribute('data-name');
        try {
          if (window.DataLayer) {
            const signedUrl = await window.DataLayer.getAnnouncementFileSignedUrl(path);
            if (signedUrl) {
              const a = document.createElement('a');
              a.href = signedUrl;
              a.download = name;
              a.target = '_blank';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            } else {
              alert('Could not generate download link for this attachment.');
            }
          }
        } catch (err) {
          console.error('Download error:', err);
          alert('Error downloading attachment.');
        }
      });
    });

    // Wire Acknowledgement Buttons
    el.announcementsFeed.querySelectorAll('.ack-ann-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const annId = btn.getAttribute('data-ann-id');
        if (!confirm('Do you confirm that you have read, understood, and accept this announcement?')) return;

        try {
          btn.disabled = true;
          btn.textContent = 'Recording...';
          if (window.DataLayer) {
            await window.DataLayer.acknowledgeAnnouncement(annId);
          }
          showToast('✓ Acknowledgement officially recorded.');
          await renderAnnouncementsFeedView();
        } catch (err) {
          console.error('acknowledgeAnnouncement error:', err);
          alert(`Error acknowledging notice: ${err.message}`);
          btn.disabled = false;
          btn.textContent = 'I have read and acknowledge';
        }
      });
    });

    // Wire Comment Submissions
    el.announcementsFeed.querySelectorAll('.announcement-comment-form').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const annId = form.getAttribute('data-ann-id');
        const input = form.querySelector('.ann-comment-input');
        const text = input ? input.value.trim() : '';
        if (!text) return;

        try {
          if (window.DataLayer) {
            await window.DataLayer.postAnnouncementComment(annId, text);
          }
          showToast('✓ Comment posted.');
          await renderAnnouncementsFeedView();
        } catch (err) {
          console.error('postAnnouncementComment error:', err);
          alert(`Error posting comment: ${err.message}`);
        }
      });
    });
  }

  

  // B. Render Announcements Manage View (Staff)
  async function renderAnnouncementsManageView() {
    if (!el.announcementsManageTableBody) return;
    el.announcementsManageTableBody.innerHTML = '<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--text-muted);">Loading announcements directory...</td></tr>';

    let list = [];
    if (window.DataLayer) {
      try {
        list = await window.DataLayer.getAnnouncements({
          status: announcementManageStatus
        });
      } catch (err) {
        console.warn('getAnnouncements manage error:', err);
        list = [];
      }
    }

    el.announcementsManageTableBody.innerHTML = '';
    if (!list || list.length === 0) {
      if (el.emptyAnnouncementsManageState) el.emptyAnnouncementsManageState.style.display = 'block';
      return;
    }
    if (el.emptyAnnouncementsManageState) el.emptyAnnouncementsManageState.style.display = 'none';

    list.forEach(ann => {
      const dateStr = ann.publish_at ? new Date(ann.publish_at).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) : '--';
      const audienceDisplay = ann.audience_type === 'programme'
        ? (ann.programme?.name || 'Programme')
        : (ann.audience_type === 'role' ? `Role: ${ann.target_role}` : 'Everyone');

      const isArchived = ann.status === 'archived';
      const isDraft = ann.status === 'draft';

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-subtle)';
      tr.innerHTML = `
        <td style="padding: 10px 12px;">
          <strong style="color: var(--text-primary); font-size: 13.5px;">${escapeHtml(ann.title)}</strong>
          ${ann.is_pinned ? '<span style="font-size: 10px; margin-left: 6px; padding: 2px 6px; border-radius: 4px; background: rgba(245, 158, 11, 0.15); color: #f59e0b;">Pinned</span>' : ''}
          ${ann.is_urgent ? '<span style="font-size: 10px; margin-left: 4px; padding: 2px 6px; border-radius: 4px; background: rgba(239, 68, 68, 0.15); color: #ef4444;">Urgent</span>' : ''}
        </td>
        <td style="padding: 10px 12px; color: var(--text-secondary);">${audienceDisplay}</td>
        <td style="padding: 10px 12px;"><span style="font-size: 11px; padding: 2px 8px; border-radius: var(--radius-sm); background: var(--bg-surface); border: 1px solid var(--border-subtle);">${ann.category}</span></td>
        <td style="padding: 10px 12px;"><span class="badge-pill" style="${isArchived ? 'background: rgba(100, 116, 139, 0.2);' : (isDraft ? 'background: rgba(245, 158, 11, 0.15); color: #f59e0b;' : 'background: rgba(0, 165, 68, 0.15); color: var(--accent-light);')}">${ann.status}</span></td>
        <td style="padding: 10px 12px; font-size: 12px; color: var(--text-muted);">${dateStr}</td>
        <td style="padding: 10px 12px; text-align: right;">
          <div style="display: inline-flex; gap: 6px;">
            <button type="button" class="secondary-btn view-audit-btn" data-ann-id="${ann.id}" style="padding: 4px 8px; font-size: 11.5px;" title="View read reach & acknowledgements">
              Reach
            </button>
            <button type="button" class="secondary-btn edit-ann-btn" data-ann-id="${ann.id}" style="padding: 4px 8px; font-size: 11.5px;">
              Edit
            </button>
            ${!isArchived ? `
              <button type="button" class="secondary-btn archive-ann-btn" data-ann-id="${ann.id}" style="padding: 4px 8px; font-size: 11.5px;">
                Archive
              </button>
            ` : `
              <button type="button" class="secondary-btn publish-ann-btn" data-ann-id="${ann.id}" style="padding: 4px 8px; font-size: 11.5px;">
                Publish
              </button>
            `}
            <button type="button" class="secondary-btn delete-ann-btn" data-ann-id="${ann.id}" style="padding: 4px 8px; font-size: 11.5px; color: #ef4444;" title="Delete announcement">
              ✕
            </button>
          </div>
        </td>
      `;
      el.announcementsManageTableBody.appendChild(tr);
    });

    // Wire Manage Action buttons
    el.announcementsManageTableBody.querySelectorAll('.view-audit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openAnnouncementAuditModal(btn.getAttribute('data-ann-id'));
      });
    });

    el.announcementsManageTableBody.querySelectorAll('.edit-ann-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const annId = btn.getAttribute('data-ann-id');
        const ann = list.find(a => a.id === annId);
        if (ann) openAnnouncementFormModal(ann);
      });
    });

    el.announcementsManageTableBody.querySelectorAll('.archive-ann-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const annId = btn.getAttribute('data-ann-id');
        if (!confirm('Archive this announcement? It will be removed from learners\' feeds.')) return;
        try {
          if (window.DataLayer) await window.DataLayer.archiveAnnouncement(annId);
          showToast('✓ Announcement archived.');
          await renderAnnouncementsManageView();
        } catch (err) {
          alert(`Error archiving: ${err.message}`);
        }
      });
    });

    el.announcementsManageTableBody.querySelectorAll('.publish-ann-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const annId = btn.getAttribute('data-ann-id');
        try {
          if (window.DataLayer) await window.DataLayer.publishAnnouncement({ announcement_id: annId, status: 'published' });
          showToast('✓ Announcement republished.');
          await renderAnnouncementsManageView();
        } catch (err) {
          alert(`Error publishing: ${err.message}`);
        }
      });
    });

    el.announcementsManageTableBody.querySelectorAll('.delete-ann-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const annId = btn.getAttribute('data-ann-id');
        if (!confirm('Permanently delete this announcement and all associated files?')) return;
        try {
          if (window.DataLayer) await window.DataLayer.deleteAnnouncement(annId);
          showToast('✓ Announcement deleted.');
          await renderAnnouncementsManageView();
        } catch (err) {
          alert(`Error deleting: ${err.message}`);
        }
      });
    });
  }

  

  // C. Update Unread Badge on Sidebar
  async function updateAnnouncementsUnreadBadge() {
    if (!el.announcementsUnreadBadge) return;
    let currentUserId = null;
    if (window.SupabaseClient) {
      const u = await window.SupabaseClient.getUser();
      currentUserId = u?.id;
    }

    if (!currentUserId || !cachedAnnouncements) {
      el.announcementsUnreadBadge.style.display = 'none';
      return;
    }

    const unreadCount = cachedAnnouncements.filter(a => !a.announcement_reads?.some(r => r.user_id === currentUserId)).length;
    if (unreadCount > 0) {
      el.announcementsUnreadBadge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      el.announcementsUnreadBadge.style.display = 'inline-block';
    } else {
      el.announcementsUnreadBadge.style.display = 'none';
    }
  }

  // D. Open New / Edit Announcement Modal
  function openAnnouncementFormModal(existing = null) {
    if (!el.announcementFormModal) return;
    const userRole = state.profile?.role || 'intern';
    const isInstructor = (userRole === 'instructor');

    if (el.announcementFormModalTitle) {
      el.announcementFormModalTitle.textContent = existing ? 'Edit Official Announcement' : 'New Official Announcement';
    }
    if (el.announcementEditId) el.announcementEditId.value = existing ? existing.id : '';
    if (el.announcementTitleInput) el.announcementTitleInput.value = existing ? existing.title : '';
    if (el.announcementBodyText) el.announcementBodyText.value = existing ? existing.body : '';
    if (el.announcementCategorySelect) el.announcementCategorySelect.value = existing ? existing.category : 'General';

    // Populate Programmes dropdown
    if (el.announcementProgSelect) {
      el.announcementProgSelect.innerHTML = '';
      PROGRAMMES_LIST.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.dbId;
        opt.textContent = p.title;
        el.announcementProgSelect.appendChild(opt);
      });
    }

    // Audience selection
    if (isInstructor) {
      if (el.announcementAudienceSelect) {
        el.announcementAudienceSelect.value = 'programme';
        el.announcementAudienceSelect.disabled = true;
      }
      if (el.announcementAudienceProgWrap) el.announcementAudienceProgWrap.style.display = 'block';
      if (el.announcementProgSelect) {
        el.announcementProgSelect.value = getProgrammeDbId(currentProgrammeId);
        el.announcementProgSelect.disabled = true;
      }
    } else {
      if (el.announcementAudienceSelect) {
        el.announcementAudienceSelect.disabled = false;
        el.announcementAudienceSelect.value = existing ? existing.audience_type : 'all';
      }
      if (el.announcementAudienceProgWrap) {
        el.announcementAudienceProgWrap.style.display = existing?.audience_type === 'programme' ? 'block' : 'none';
      }
      if (el.announcementProgSelect) {
        el.announcementProgSelect.disabled = false;
        if (existing?.programme_id) el.announcementProgSelect.value = existing.programme_id;
      }
    }

    // Toggles
    if (el.announcementIsPinnedCheck) el.announcementIsPinnedCheck.checked = !!existing?.is_pinned;
    if (el.announcementIsUrgentCheck) el.announcementIsUrgentCheck.checked = !!existing?.is_urgent;
    if (el.announcementRequiresAckCheck) el.announcementRequiresAckCheck.checked = !!existing?.requires_ack;
    if (el.announcementCommentsCheck) el.announcementCommentsCheck.checked = !!existing?.comments_enabled;

    el.announcementFormModal.style.display = 'flex';
  }

  function closeAnnouncementFormModal() {
    if (el.announcementFormModal) el.announcementFormModal.style.display = 'none';
  }

  // E. Open Audit Report Modal
  let currentAuditAnnId = null;
  let auditReportData = [];
  async function openAnnouncementAuditModal(annId) {
    currentAuditAnnId = annId;
    if (!el.announcementAuditModal) return;
    el.announcementAuditModal.style.display = 'flex';

    if (el.announcementAuditTableBody) {
      el.announcementAuditTableBody.innerHTML = '<tr><td colspan="5" style="padding: 16px; text-align: center; color: var(--text-muted);">Loading member reach report...</td></tr>';
    }

    if (window.DataLayer) {
      try {
        auditReportData = await window.DataLayer.getAnnouncementAuditReport(annId);
      } catch (err) {
        console.warn('getAnnouncementAuditReport error:', err);
        auditReportData = [];
      }
    }

    const totalMembers = auditReportData.length;
    const readCount = auditReportData.filter(r => r.has_read).length;
    const ackCount = auditReportData.filter(r => r.has_acknowledged).length;

    if (el.auditTotalReadCount) el.auditTotalReadCount.textContent = `${readCount} / ${totalMembers} (${totalMembers > 0 ? Math.round((readCount / totalMembers) * 100) : 0}%)`;
    if (el.auditTotalAckCount) el.auditTotalAckCount.textContent = `${ackCount} / ${totalMembers} (${totalMembers > 0 ? Math.round((ackCount / totalMembers) * 100) : 0}%)`;

    if (el.announcementAuditTableBody) {
      el.announcementAuditTableBody.innerHTML = '';
      if (auditReportData.length === 0) {
        el.announcementAuditTableBody.innerHTML = '<tr><td colspan="5" style="padding: 16px; text-align: center; color: var(--text-muted);">No cohort members found for this announcement audience.</td></tr>';
        return;
      }

      auditReportData.forEach(row => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-subtle)';
        tr.innerHTML = `
          <td style="padding: 8px 10px;">
            <div style="font-weight: 700; color: var(--text-primary);">${row.full_name || 'Member'}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${row.email || ''}</div>
          </td>
          <td style="padding: 8px 10px; text-transform: capitalize;">${row.role || 'intern'}</td>
          <td style="padding: 8px 10px; color: var(--text-secondary);">${row.programme_name || 'Unassigned'}</td>
          <td style="padding: 8px 10px;">
            ${row.has_read
              ? `<span style="color: var(--accent-light); font-weight: 600;">Read ✓</span> <span style="font-size: 10.5px; color: var(--text-muted);">${new Date(row.read_at).toLocaleDateString()}</span>`
              : '<span style="color: var(--text-muted);">Unread</span>'}
          </td>
          <td style="padding: 8px 10px;">
            ${row.has_acknowledged
              ? `<span style="color: var(--accent-light); font-weight: 600;">Acknowledged ✓</span>`
              : '<span style="color: var(--text-muted);">Pending</span>'}
          </td>
        `;
        el.announcementAuditTableBody.appendChild(tr);
      });
    }
  }

  // F. Realtime Notifications Listener
  function setupAnnouncementsRealtime() {
    if (!window.SupabaseClient || announcementsRealtimeChannel) return;
    const client = window.SupabaseClient.getClient();
    if (!client) return;

    try {
      announcementsRealtimeChannel = client.channel('realtime_announcements')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'announcements' }, (payload) => {
          showToast(`📢 New Announcement: ${payload.new.title}`);
          if (state.activeScreen === 'announcements') {
            renderAnnouncementsFeedView();
          }
          updateAnnouncementsUnreadBadge();
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime announcements setup error:', e);
    }
  }

  // G. Wire Announcements DOM Events
  if (el.announcementsFeedTabBtn) {
    el.announcementsFeedTabBtn.addEventListener('click', () => {
      announcementActiveTab = 'feed';
      renderAnnouncementsScreen();
    });
  }

  
  if (el.announcementsManageTabBtn) {
    el.announcementsManageTabBtn.addEventListener('click', () => {
      announcementActiveTab = 'manage';
      renderAnnouncementsScreen();
    });
  }

  
  if (el.openNewAnnouncementBtn) {
    el.openNewAnnouncementBtn.addEventListener('click', () => openAnnouncementFormModal(null));
  }
  if (el.closeAnnouncementFormModalBtn) {
    el.closeAnnouncementFormModalBtn.addEventListener('click', closeAnnouncementFormModal);
  }
  if (el.cancelAnnouncementFormBtn) {
    el.cancelAnnouncementFormBtn.addEventListener('click', closeAnnouncementFormModal);
  }
  if (el.closeAnnouncementAuditModalBtn) {
    el.closeAnnouncementAuditModalBtn.addEventListener('click', () => {
      if (el.announcementAuditModal) el.announcementAuditModal.style.display = 'none';
    });
  }

  

  // Category filter chips
  if (el.announcementCategoryChips) {
    el.announcementCategoryChips.querySelectorAll('.chip-filter').forEach(chip => {
      chip.addEventListener('click', () => {
        el.announcementCategoryChips.querySelectorAll('.chip-filter').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        announcementCurrentCategory = chip.getAttribute('data-category') || 'All';
        renderAnnouncementsFeedView();
      });
    });
  }

  

  // Search input
  if (el.announcementsSearchInput) {
    el.announcementsSearchInput.addEventListener('input', () => {
      announcementSearchQuery = el.announcementsSearchInput.value.trim();
      renderAnnouncementsFeedView();
    });
  }

  

  // Mark all read
  if (el.markAllAnnouncementsReadBtn) {
    el.markAllAnnouncementsReadBtn.addEventListener('click', async () => {
      try {
        if (window.DataLayer) await window.DataLayer.markAllAnnouncementsRead();
        showToast('✓ All announcements marked as read.');
        await renderAnnouncementsFeedView();
        updateAnnouncementsUnreadBadge();
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    });
  }

  

  // Audience select change in form
  if (el.announcementAudienceSelect) {
    el.announcementAudienceSelect.addEventListener('change', () => {
      const val = el.announcementAudienceSelect.value;
      if (el.announcementAudienceProgWrap) el.announcementAudienceProgWrap.style.display = val === 'programme' ? 'block' : 'none';
      if (el.announcementAudienceRoleWrap) el.announcementAudienceRoleWrap.style.display = val === 'role' ? 'block' : 'none';
    });
  }

  

  // Manage tab status filters
  if (el.filterAnnStatusPublished) {
    el.filterAnnStatusPublished.addEventListener('click', () => {
      announcementManageStatus = 'published';
      el.filterAnnStatusPublished.classList.add('active');
      if (el.filterAnnStatusDraft) el.filterAnnStatusDraft.classList.remove('active');
      if (el.filterAnnStatusArchived) el.filterAnnStatusArchived.classList.remove('active');
      renderAnnouncementsManageView();
    });
  }

  
  if (el.filterAnnStatusDraft) {
    el.filterAnnStatusDraft.addEventListener('click', () => {
      announcementManageStatus = 'draft';
      el.filterAnnStatusDraft.classList.add('active');
      if (el.filterAnnStatusPublished) el.filterAnnStatusPublished.classList.remove('active');
      if (el.filterAnnStatusArchived) el.filterAnnStatusArchived.classList.remove('active');
      renderAnnouncementsManageView();
    });
  }

  
  if (el.filterAnnStatusArchived) {
    el.filterAnnStatusArchived.addEventListener('click', () => {
      announcementManageStatus = 'archived';
      el.filterAnnStatusArchived.classList.add('active');
      if (el.filterAnnStatusPublished) el.filterAnnStatusPublished.classList.remove('active');
      if (el.filterAnnStatusDraft) el.filterAnnStatusDraft.classList.remove('active');
      renderAnnouncementsManageView();
    });
  }

  

  // Save Announcement Form Submit (Publish)
  if (el.announcementForm) {
    el.announcementForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleSaveAnnouncement('published');
    });
  }

  

  // Save Announcement as Draft
  if (el.saveAnnouncementDraftBtn) {
    el.saveAnnouncementDraftBtn.addEventListener('click', async () => {
      await handleSaveAnnouncement('draft');
    });
  }

  

  async function handleSaveAnnouncement(status) {
    const title = el.announcementTitleInput?.value?.trim();
    const body = el.announcementBodyText?.value?.trim();
    if (!title || !body) {
      alert('Please provide both an announcement title and body.');
      return;
    }

    const editId = el.announcementEditId?.value || null;
    const category = el.announcementCategorySelect?.value || 'General';
    const audienceType = el.announcementAudienceSelect?.value || 'all';
    const programmeId = audienceType === 'programme' ? el.announcementProgSelect?.value : null;
    const targetRole = audienceType === 'role' ? el.announcementRoleSelect?.value : null;
    const isPinned = !!el.announcementIsPinnedCheck?.checked;
    const isUrgent = !!el.announcementIsUrgentCheck?.checked;
    const requiresAck = !!el.announcementRequiresAckCheck?.checked;
    const commentsEnabled = !!el.announcementCommentsCheck?.checked;
    const publishAt = el.announcementPublishAtInput?.value ? new Date(el.announcementPublishAtInput.value).toISOString() : null;
    const expiresAt = el.announcementExpiresAtInput?.value ? new Date(el.announcementExpiresAtInput.value).toISOString() : null;

    try {
      if (el.publishAnnouncementBtn) el.publishAnnouncementBtn.disabled = true;
      if (el.saveAnnouncementDraftBtn) el.saveAnnouncementDraftBtn.disabled = true;

      if (window.DataLayer) {
        const res = await window.DataLayer.publishAnnouncement({
          announcement_id: editId,
          title,
          body,
          category,
          audience_type: audienceType,
          programme_id: programmeId,
          target_role: targetRole,
          is_pinned: isPinned,
          is_urgent: isUrgent,
          requires_ack: requiresAck,
          comments_enabled: commentsEnabled,
          status,
          publish_at: publishAt,
          expires_at: expiresAt
        });

        // Handle file uploads if any
        const fileInput = el.announcementFilesInput;
        if (fileInput && fileInput.files && fileInput.files.length > 0 && res?.announcement_id) {
          const files = Array.from(fileInput.files).slice(0, 3);
          for (const f of files) {
            await window.DataLayer.uploadAnnouncementAttachment(f);
          }
        }
      }

      showToast(`✓ Announcement ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
      closeAnnouncementFormModal();
      await renderAnnouncementsScreen();
    } catch (err) {
      console.error('handleSaveAnnouncement error:', err);
      alert(`Error saving announcement: ${err.message}`);
    } finally {
      if (el.publishAnnouncementBtn) el.publishAnnouncementBtn.disabled = false;
      if (el.saveAnnouncementDraftBtn) el.saveAnnouncementDraftBtn.disabled = false;
    }
  }

  // Audit CSV Export
  if (el.exportAnnouncementAuditCsvBtn) {
    el.exportAnnouncementAuditCsvBtn.addEventListener('click', () => {
      if (!auditReportData || auditReportData.length === 0) {
        alert('No audit data available to export.');
        return;
      }
      const headers = ['Full Name', 'Email', 'Role', 'Programme', 'Read Status', 'Read Timestamp', 'Acknowledged', 'Acknowledged Timestamp'];
      const csvRows = [headers.join(',')];

      auditReportData.forEach(r => {
        const escape = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;
        const row = [
          escape(r.full_name),
          escape(r.email),
          escape(r.role),
          escape(r.programme_name),
          escape(r.has_read ? 'Read' : 'Unread'),
          escape(r.read_at ? new Date(r.read_at).toISOString() : 'N/A'),
          escape(r.has_acknowledged ? 'Acknowledged' : 'Pending'),
          escape(r.acknowledged_at ? new Date(r.acknowledged_at).toISOString() : 'N/A')
        ];
        csvRows.push(row.join(','));
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
      const a = document.createElement('a');
      a.href = csvContent;
      a.download = `announcement_audit_reach_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('✓ Announcement Reach Report exported to CSV.');
    });
  }

  

  // ==========================================
  // ==========================================
  // 15. FEEDBACK SCREEN CONTROLLER
  // ==========================================

  let instructorFeedbackList = [];
  let instructorFeedbackFilter = 'all'; // 'all' | 'new' | 'reviewed'
  let instructorFeedbackProgSelected = '';

  async function renderFeedbackScreen() {
    const prog = getCurrentProgramme();
    const dbProgId = getProgrammeDbId(currentProgrammeId);
    if (el.programmeTitle) el.programmeTitle.textContent = prog.title;
    if (el.programmeDescription) el.programmeDescription.textContent = prog.description;
    if (el.feedbackProgrammeName) el.feedbackProgrammeName.textContent = `Share suggestions, inquiries, or doubts regarding ${prog.title}.`;

    const userRole = state.profile?.role || 'intern';
    const isStaff = (userRole === 'instructor' || userRole === 'admin');

    // 1. Populate Related Module Dropdown
    if (el.feedbackModuleSelect) {
      el.feedbackModuleSelect.innerHTML = '<option value="">General Programme Feedback (No specific module)</option>';
      const modules = prog.modules || [];
      modules.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id || m.slug || '';
        opt.textContent = `Module ${m.number || m.id}: ${m.title}`;
        el.feedbackModuleSelect.appendChild(opt);
      });
    }

    // Reset Form
    if (el.feedbackText) el.feedbackText.value = '';
    if (el.feedbackCharCount) el.feedbackCharCount.textContent = '0 / 1000';
    if (el.feedbackIsAnonymousCheckbox) el.feedbackIsAnonymousCheckbox.checked = false;

    // 2. Render Learner's Own History
    await renderLearnerFeedbackHistory(dbProgId);

    // 3. Render Instructor / Admin Inbox
    if (isStaff && el.instructorFeedbackInboxCard) {
      el.instructorFeedbackInboxCard.style.display = 'block';
      await renderInstructorFeedbackInbox();
    } else if (el.instructorFeedbackInboxCard) {
      el.instructorFeedbackInboxCard.style.display = 'none';
    }
  }

  // Learner Feedback History
  async function renderLearnerFeedbackHistory(dbProgId) {
    if (!el.feedbackHistoryList) return;
    el.feedbackHistoryList.innerHTML = '<div style="color: var(--text-muted); font-size: 13px;">Loading your feedback submissions...</div>';

    let history = [];
    if (window.DataLayer) {
      try {
        history = await window.DataLayer.getMyFeedbackHistory(dbProgId);
      } catch (err) {
        console.warn('getMyFeedbackHistory error:', err);
      }
    }

    el.feedbackHistoryList.innerHTML = '';
    if (!history || history.length === 0) {
      el.feedbackHistoryList.innerHTML = '<div class="empty-history-text">You haven\'t submitted any feedback for this programme yet.</div>';
      return;
    }

    history.forEach(item => {
      const isReviewed = item.status === 'reviewed';
      const statusPill = isReviewed
        ? '<span style="font-size: 11px; padding: 2px 8px; border-radius: var(--radius-full); background: rgba(0, 165, 68, 0.15); color: var(--accent-light); font-weight: 600;">Reviewed by Mentor</span>'
        : '<span style="font-size: 11px; padding: 2px 8px; border-radius: var(--radius-full); background: rgba(245, 158, 11, 0.15); color: #f59e0b; font-weight: 600;">Submitted · Pending Review</span>';

      const moduleBadge = item.module?.title
        ? `<span style="font-size: 11px; color: var(--text-muted); background: var(--bg-surface); padding: 2px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">Module: ${item.module.title}</span>`
        : '';

      const anonymousBadge = item.is_anonymous
        ? '<span style="font-size: 11px; color: var(--text-muted); font-style: italic;">(Submitted anonymously)</span>'
        : '';

      const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) : '';

      const div = document.createElement('div');
      div.className = 'feedback-history-item';
      div.style.padding = '14px';
      div.style.border = '1px solid var(--border-subtle)';
      div.style.borderRadius = 'var(--radius-md)';
      div.style.background = 'var(--bg-card)';
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.gap = '8px';

      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <strong style="font-size: 14px; color: var(--text-primary);">${item.topic}</strong>
            ${moduleBadge}
            ${anonymousBadge}
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            ${statusPill}
            <span style="font-size: 11.5px; color: var(--text-muted);">${dateStr}</span>
          </div>
        </div>
        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; white-space: pre-wrap;">${item.message}</div>
      `;
      el.feedbackHistoryList.appendChild(div);
    });
  }

  

  // Live Char Counter on Feedback Message
  if (el.feedbackText && el.feedbackCharCount) {
    el.feedbackText.addEventListener('input', () => {
      const len = el.feedbackText.value.length;
      el.feedbackCharCount.textContent = `${len} / 1000`;
      if (len < 10) {
        el.feedbackCharCount.style.color = '#f59e0b';
      } else if (len > 1000) {
        el.feedbackCharCount.style.color = '#ef4444';
      } else {
        el.feedbackCharCount.style.color = 'var(--text-muted)';
      }
    });
  }

  

  // Feedback Form Submit
  if (el.feedbackForm) {
    el.feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = el.feedbackText ? el.feedbackText.value.trim() : '';
      const topic = el.feedbackCategory ? el.feedbackCategory.value.trim() : 'General Feedback';
      const moduleId = el.feedbackModuleSelect?.value || null;
      const isAnonymous = !!el.feedbackIsAnonymousCheckbox?.checked;
      const dbProgId = getProgrammeDbId(currentProgrammeId);

      if (!topic) {
        alert('Please provide a feedback topic or category.');
        return;
      }

      if (text.length < 10 || text.length > 1000) {
        alert('Feedback message must be between 10 and 1000 characters.');
        return;
      }

      try {
        if (el.submitFeedbackBtn) {
          el.submitFeedbackBtn.disabled = true;
          el.submitFeedbackBtn.textContent = 'Submitting...';
        }

        if (window.DataLayer) {
          await window.DataLayer.submitFeedback({
            programmeId: dbProgId,
            moduleId: moduleId,
            topic: topic,
            message: text,
            isAnonymous: isAnonymous
          });
        }

        showToast('✓ Feedback submitted securely to your mentors!');
        if (el.feedbackText) el.feedbackText.value = '';
        if (el.feedbackCharCount) el.feedbackCharCount.textContent = '0 / 1000';
        if (el.feedbackIsAnonymousCheckbox) el.feedbackIsAnonymousCheckbox.checked = false;

        await renderLearnerFeedbackHistory(dbProgId);
      } catch (err) {
        console.error('submitFeedback error:', err);
        alert(err.message || 'Error submitting feedback. You may have reached the daily limit of 5 entries.');
      } finally {
        if (el.submitFeedbackBtn) {
          el.submitFeedbackBtn.disabled = false;
          el.submitFeedbackBtn.textContent = 'Submit Feedback';
        }
      }
    });
  }

  

  // Instructor / Admin Feedback Inbox
  async function renderInstructorFeedbackInbox() {
    if (!el.instructorFeedbackList) return;
    const userRole = state.profile?.role || 'intern';
    const isAdmin = (userRole === 'admin');
    const currentDbProgId = getProgrammeDbId(currentProgrammeId);
    const filterProgId = isAdmin ? (instructorFeedbackProgSelected || null) : currentDbProgId;

    // Admin programme filter dropdown
    if (el.instructorFeedbackProgFilter) {
      if (isAdmin) {
        el.instructorFeedbackProgFilter.style.display = 'inline-block';
        el.instructorFeedbackProgFilter.innerHTML = '<option value="">All Programmes</option>';
        PROGRAMMES_LIST.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.dbId;
          opt.textContent = p.title;
          if (instructorFeedbackProgSelected === p.dbId) opt.selected = true;
          el.instructorFeedbackProgFilter.appendChild(opt);
        });
      } else {
        el.instructorFeedbackProgFilter.style.display = 'none';
      }
    }

    if (window.DataLayer) {
      try {
        instructorFeedbackList = await window.DataLayer.getInstructorFeedbackList(filterProgId);
      } catch (err) {
        console.warn('getInstructorFeedbackList error:', err);
        instructorFeedbackList = [];
      }
    }

    let filtered = instructorFeedbackList || [];
    if (instructorFeedbackFilter === 'new') {
      filtered = filtered.filter(f => f.status === 'new');
    } else if (instructorFeedbackFilter === 'reviewed') {
      filtered = filtered.filter(f => f.status === 'reviewed');
    }

    el.instructorFeedbackList.innerHTML = '';
    if (filtered.length === 0) {
      if (el.emptyInstructorFeedbackState) el.emptyInstructorFeedbackState.style.display = 'block';
      return;
    }
    if (el.emptyInstructorFeedbackState) el.emptyInstructorFeedbackState.style.display = 'none';

    filtered.forEach(item => {
      const isReviewed = item.status === 'reviewed';
      const isAnon = !!item.is_anonymous;

      let submitterLabel = '';
      if (isAnon) {
        if (isAdmin) {
          submitterLabel = `<span style="font-weight: 700; color: var(--text-primary);">${item.profiles?.full_name || 'Learner'}</span> <span style="font-size: 11px; color: var(--text-muted);">(${item.profiles?.email || ''})</span> <span style="font-size: 11px; padding: 2px 6px; border-radius: var(--radius-sm); background: rgba(245, 158, 11, 0.15); color: #f59e0b; margin-left: 4px;">Anonymous to Instructors</span>`;
        } else {
          submitterLabel = `<span style="font-weight: 700; color: var(--text-secondary); font-style: italic;">Anonymous Learner</span>`;
        }
      } else {
        submitterLabel = `<span style="font-weight: 700; color: var(--text-primary);">${item.profiles?.full_name || 'Learner'}</span> <span style="font-size: 11.5px; color: var(--text-muted);">(${item.profiles?.email || 'N/A'})</span>`;
      }

      const progName = item.programme?.name || 'Programme';
      const moduleName = item.module?.title ? `Module: ${item.module.title}` : 'General';
      const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) : '';

      const card = document.createElement('div');
      card.style.padding = '16px';
      card.style.border = '1px solid var(--border-subtle)';
      card.style.borderRadius = 'var(--radius-md)';
      card.style.background = 'var(--bg-card)';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.gap = '10px';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
          <div>
            <div style="font-size: 13.5px;">${submitterLabel}</div>
            <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">${progName} • ${moduleName} • ${dateStr}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11.5px; padding: 2px 8px; border-radius: var(--radius-full); ${isReviewed ? 'background: rgba(0, 165, 68, 0.15); color: var(--accent-light);' : 'background: rgba(245, 158, 11, 0.15); color: #f59e0b;'} font-weight: 600;">
              ${isReviewed ? 'Reviewed' : 'New'}
            </span>
            ${!isReviewed ? `
              <button type="button" class="secondary-btn mark-reviewed-btn" data-fb-id="${item.id}" style="padding: 4px 10px; font-size: 11.5px;">
                Mark as Reviewed
              </button>
            ` : ''}
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 12px; font-weight: 700; color: var(--accent-light); background: rgba(0, 165, 68, 0.08); padding: 2px 8px; border-radius: var(--radius-sm);">${item.topic}</span>
        </div>
        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; white-space: pre-wrap;">${item.message}</div>
      `;
      el.instructorFeedbackList.appendChild(card);
    });

    // Wire Mark as Reviewed buttons
    el.instructorFeedbackList.querySelectorAll('.mark-reviewed-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const fbId = btn.getAttribute('data-fb-id');
        try {
          btn.disabled = true;
          btn.textContent = 'Updating...';
          if (window.DataLayer) {
            await window.DataLayer.markFeedbackReviewed(fbId);
          }
          showToast('✓ Feedback marked as reviewed.');
          await renderInstructorFeedbackInbox();
        } catch (err) {
          console.error('markFeedbackReviewed error:', err);
          alert(`Error updating feedback: ${err.message}`);
          btn.disabled = false;
          btn.textContent = 'Mark as Reviewed';
        }
      });
    });
  }

  

  // Feedback filter tab events
  if (el.filterFeedbackAll) {
    el.filterFeedbackAll.addEventListener('click', () => {
      instructorFeedbackFilter = 'all';
      el.filterFeedbackAll.classList.add('active');
      if (el.filterFeedbackNew) el.filterFeedbackNew.classList.remove('active');
      if (el.filterFeedbackReviewed) el.filterFeedbackReviewed.classList.remove('active');
      renderInstructorFeedbackInbox();
    });
  }

  
  if (el.filterFeedbackNew) {
    el.filterFeedbackNew.addEventListener('click', () => {
      instructorFeedbackFilter = 'new';
      el.filterFeedbackNew.classList.add('active');
      if (el.filterFeedbackAll) el.filterFeedbackAll.classList.remove('active');
      if (el.filterFeedbackReviewed) el.filterFeedbackReviewed.classList.remove('active');
      renderInstructorFeedbackInbox();
    });
  }

  
  if (el.filterFeedbackReviewed) {
    el.filterFeedbackReviewed.addEventListener('click', () => {
      instructorFeedbackFilter = 'reviewed';
      el.filterFeedbackReviewed.classList.add('active');
      if (el.filterFeedbackAll) el.filterFeedbackAll.classList.remove('active');
      if (el.filterFeedbackNew) el.filterFeedbackNew.classList.remove('active');
      renderInstructorFeedbackInbox();
    });
  }

  
  if (el.instructorFeedbackProgFilter) {
    el.instructorFeedbackProgFilter.addEventListener('change', () => {
      instructorFeedbackProgSelected = el.instructorFeedbackProgFilter.value;
      renderInstructorFeedbackInbox();
    });
  }

  


  // ==========================================
  // 16. GRADE REPORT SCREEN CONTROLLER
  // ==========================================

  let cohortGradeRosterData = [];
  let cohortRosterProgSelected = '';

  async function renderGradeReportScreen() {
    const prog = getCurrentProgramme();
    const dbProgId = getProgrammeDbId(currentProgrammeId);
    if (el.programmeTitle) el.programmeTitle.textContent = prog.title;
    if (el.programmeDescription) el.programmeDescription.textContent = prog.description;
    if (el.gradeSummaryText) el.gradeSummaryText.textContent = `Official academic record for ${prog.title}.`;

    const userRole = state.profile?.role || 'intern';
    const isStaff = (userRole === 'instructor' || userRole === 'admin');

    // 1. Load Learner Grades from Supabase
    let serverGrades = null;
    let examSubmission = null;
    let progCompletion = null;

    if (window.DataLayer) {
      try {
        serverGrades = await window.DataLayer.getMyGrades(dbProgId);
        examSubmission = await window.DataLayer.getExamSubmission(dbProgId);
        progCompletion = await window.DataLayer.getProgrammeCompletion(dbProgId);
      } catch (err) {
        console.warn('[DataLayer] Error loading grades/completion:', err);
      }
    }

    // Determine if learner has any completed quizzes
    const completedQuizRows = (serverGrades || []).filter(g => g.score !== null && g.total > 0);
    const hasAnyGrades = completedQuizRows.length > 0;

    // A. Quiz Average Display
    if (hasAnyGrades) {
      let scoreSum = 0;
      completedQuizRows.forEach(g => {
        scoreSum += (g.score / g.total) * 100;
      });
      const avgPct = Math.round(scoreSum / completedQuizRows.length);
      let letter = 'Fail';
      if (avgPct >= 90) letter = 'A';
      else if (avgPct >= 80) letter = 'B';
      else if (avgPct >= 70) letter = 'C';

      if (el.gradeAverageDisplay) {
        el.gradeAverageDisplay.textContent = `${letter} (${avgPct}%)`;
        el.gradeAverageDisplay.style.color = 'var(--accent-light)';
      }
    } else {
      if (el.gradeAverageDisplay) {
        el.gradeAverageDisplay.textContent = 'No quizzes taken';
        el.gradeAverageDisplay.style.color = 'var(--text-secondary)';
      }
    }

    // B. Written Exam Status Display
    if (el.gradeExamDisplay) {
      if (examSubmission && examSubmission.status === 'graded') {
        el.gradeExamDisplay.textContent = `Graded: ${examSubmission.grade || (examSubmission.score + '%')}`;
        el.gradeExamDisplay.style.color = 'var(--accent-light)';
      } else if (examSubmission && examSubmission.status === 'submitted') {
        el.gradeExamDisplay.textContent = 'Submitted · Under Review';
        el.gradeExamDisplay.style.color = 'var(--accent-light)';
      } else if (examSubmission && examSubmission.status === 'draft') {
        el.gradeExamDisplay.textContent = 'Draft in Progress';
        el.gradeExamDisplay.style.color = '#f59e0b';
      } else {
        el.gradeExamDisplay.textContent = 'Not submitted';
        el.gradeExamDisplay.style.color = 'var(--text-secondary)';
      }
    }

    // C. Programme Completion Display
    if (el.gradeCompletionDisplay) {
      const pct = progCompletion?.completion_percentage || 0;
      el.gradeCompletionDisplay.textContent = `${pct}%`;
    }

    // D. Empty State vs Table
    if (!hasAnyGrades) {
      if (el.learnerGradeEmptyState) el.learnerGradeEmptyState.style.display = 'block';
      if (el.learnerGradeTablesWrap) el.learnerGradeTablesWrap.style.display = 'none';
    } else {
      if (el.learnerGradeEmptyState) el.learnerGradeEmptyState.style.display = 'none';
      if (el.learnerGradeTablesWrap) el.learnerGradeTablesWrap.style.display = 'block';

      if (el.gradeModulesList) el.gradeModulesList.innerHTML = '';
      if (el.gradeTableBody) el.gradeTableBody.innerHTML = '';

      (serverGrades || []).forEach(g => {
        const hasScore = (g.score !== null && g.total > 0);
        const gradeText = hasScore ? `${g.score} / ${g.total} (${Math.round((g.score / g.total) * 100)}%)` : 'No grade yet';

        if (el.gradeModulesList) {
          const row = document.createElement('div');
          row.className = 'grade-module-row';
          row.innerHTML = `
            <div class="grade-row-top">
              <span class="grade-row-module-title">Module ${g.module_number}: ${g.module_title}</span>
              <span class="grade-row-score ${hasScore ? 'scored' : ''}">${gradeText}</span>
            </div>
            <div class="grade-row-bottom">
              <span class="grade-q-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </span>
              <span>Module Quiz • ${hasScore ? (g.passed ? 'Passed ✓' : 'Needs Review') : 'Pending'}</span>
            </div>
          `;
          el.gradeModulesList.appendChild(row);
        }

        if (el.gradeTableBody) {
          const tr = document.createElement('tr');
          tr.style.borderBottom = '1px solid var(--border-subtle)';
          tr.innerHTML = `
            <td style="padding: 10px 12px;"><strong>Module ${g.module_number}: ${g.module_title}</strong></td>
            <td style="padding: 10px 12px;">Module Assessment Quiz</td>
            <td style="padding: 10px 12px;"><span class="grade-badge-cell">${gradeText}</span></td>
            <td style="padding: 10px 12px;"><span class="exam-status-tag ${hasScore ? 'submitted' : ''}">${hasScore ? 'Completed' : 'Pending'}</span></td>
          `;
          el.gradeTableBody.appendChild(tr);
        }
      });
    }

    // 2. Instructor & Admin Cohort Roster Table Section
    if (isStaff && el.cohortGradeRosterSection) {
      el.cohortGradeRosterSection.style.display = 'block';
      await renderCohortGradeRoster();
    } else if (el.cohortGradeRosterSection) {
      el.cohortGradeRosterSection.style.display = 'none';
    }
  }

  // Instructor / Admin Cohort Roster
  async function renderCohortGradeRoster() {
    if (!el.cohortRosterTableBody) return;
    const userRole = state.profile?.role || 'intern';
    const isAdmin = (userRole === 'admin');
    const currentDbProgId = getProgrammeDbId(currentProgrammeId);
    const filterProgId = isAdmin ? (cohortRosterProgSelected || null) : currentDbProgId;

    // Admin programme filter dropdown
    if (el.cohortRosterProgFilter) {
      if (isAdmin) {
        el.cohortRosterProgFilter.style.display = 'inline-block';
        el.cohortRosterProgFilter.innerHTML = '<option value="">All Programmes</option>';
        PROGRAMMES_LIST.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.dbId;
          opt.textContent = p.title;
          if (cohortRosterProgSelected === p.dbId) opt.selected = true;
          el.cohortRosterProgFilter.appendChild(opt);
        });
      } else {
        el.cohortRosterProgFilter.style.display = 'none';
      }
    }

    // Fetch cohort data
    if (window.DataLayer) {
      try {
        cohortGradeRosterData = await window.DataLayer.getCohortGradeRoster(filterProgId);
      } catch (err) {
        console.warn('getCohortGradeRoster error:', err);
        cohortGradeRosterData = [];
      }
    }

    el.cohortRosterTableBody.innerHTML = '';
    if (!cohortGradeRosterData || cohortGradeRosterData.length === 0) {
      if (el.emptyCohortRosterState) el.emptyCohortRosterState.style.display = 'block';
      return;
    }
    if (el.emptyCohortRosterState) el.emptyCohortRosterState.style.display = 'none';

    cohortGradeRosterData.forEach(row => {
      const initials = (row.full_name || 'U').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const completionPct = row.completion_percentage || 0;
      const quizAvgDisplay = row.quiz_average !== null && row.quiz_average !== undefined
        ? `${row.quiz_average}%`
        : '<span style="color: var(--text-muted);">No quizzes</span>';

      let examDisplay = '<span style="color: var(--text-muted);">Not submitted</span>';
      if (row.exam_status === 'graded') {
        examDisplay = `<span style="font-weight: 700; color: var(--accent-light);">Graded (${row.exam_grade || row.exam_score + '%'})</span>`;
      } else if (row.exam_status === 'submitted') {
        examDisplay = '<span class="exam-status-tag in-review">Submitted · Under Review</span>';
      } else if (row.exam_status === 'draft') {
        examDisplay = '<span style="color: #f59e0b; font-size: 12px;">Draft in progress</span>';
      }

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-subtle)';
      tr.innerHTML = `
        <td style="padding: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 165, 68, 0.15); color: var(--accent-light); font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${row.avatar_url ? `<img src="${row.avatar_url}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : initials}
            </div>
            <div>
              <div style="font-weight: 700; color: var(--text-primary);">${row.full_name || 'Learner'}</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">${row.email || 'N/A'}</div>
            </div>
          </div>
        </td>
        <td style="padding: 12px; color: var(--text-secondary); font-size: 12.5px;">${row.programme_name || 'Unassigned'}</td>
        <td style="padding: 12px; font-size: 13px;">${row.completed_modules} / ${row.total_modules} modules</td>
        <td style="padding: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; min-width: 60px;">
              <div style="width: ${completionPct}%; height: 100%; background: var(--accent-light);"></div>
            </div>
            <span style="font-size: 12px; font-weight: 600; color: var(--text-primary); min-width: 35px;">${completionPct}%</span>
          </div>
        </td>
        <td style="padding: 12px; font-weight: 700; font-size: 13px;">${quizAvgDisplay}</td>
        <td style="padding: 12px;">${examDisplay}</td>
      `;
      el.cohortRosterTableBody.appendChild(tr);
    });
  }

  

  // Filter change on Cohort Roster
  if (el.cohortRosterProgFilter) {
    el.cohortRosterProgFilter.addEventListener('change', () => {
      cohortRosterProgSelected = el.cohortRosterProgFilter.value;
      renderCohortGradeRoster();
    });
  }

  

  // Export CSV Action
  if (el.exportCohortCsvBtn) {
    el.exportCohortCsvBtn.addEventListener('click', () => {
      if (!cohortGradeRosterData || cohortGradeRosterData.length === 0) {
        alert('No roster data available to export.');
        return;
      }

      const headers = ['Learner Name', 'Email', 'Programme', 'Completed Modules', 'Total Modules', 'Completion Percentage', 'Quiz Average', 'Exam Status', 'Exam Grade', 'Exam Score'];
      const csvRows = [headers.join(',')];

      cohortGradeRosterData.forEach(r => {
        const escape = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;
        const row = [
          escape(r.full_name),
          escape(r.email),
          escape(r.programme_name),
          escape(r.completed_modules),
          escape(r.total_modules),
          escape(`${r.completion_percentage || 0}%`),
          escape(r.quiz_average !== null ? `${r.quiz_average}%` : 'N/A'),
          escape(r.exam_status),
          escape(r.exam_grade || 'N/A'),
          escape(r.exam_score !== null ? r.exam_score : 'N/A')
        ];
        csvRows.push(row.join(','));
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', csvContent);
      downloadAnchor.setAttribute('download', `ikaai_cohort_grade_roster_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      showToast('✓ Cohort Grade Roster exported to CSV.');
    });
  }

  

  // ==========================================
  // 17. ACCOUNT SETTINGS SCREEN
  // ==========================================


  // ==========================================
  // ADMIN PORTAL & ROLE PERMISSIONS
  // ==========================================
  const CANONICAL_PROGRAMMES = [
    { id: '10000000-0000-0000-0000-000000000001', slug: 'human-resources', name: 'Human Resources' },
    { id: '10000000-0000-0000-0000-000000000002', slug: 'data-analyst', name: 'Data Analyst' },
    { id: '10000000-0000-0000-0000-000000000003', slug: 'social-research-policy', name: 'Social Research & Policy' },
    { id: '10000000-0000-0000-0000-000000000004', slug: 'design-social-media', name: 'Design & Social Media' },
    { id: '10000000-0000-0000-0000-000000000005', slug: 'business-development', name: 'Business Development' }
  ];

  var adminPortalCachedUsers = [];
  var adminPortalEventsWired = false;
  var bulkParsedEntries = [];

  async function renderAdminPortal() {
    if (!el.adminUsersTableBody) return;
    el.adminUsersTableBody.innerHTML = '<tr><td colspan="7" style="padding: 24px; text-align: center; color: var(--text-muted);">Loading user and invitation records...</td></tr>';

    try {
      const records = await window.DataLayer.adminListAccessInvites();
      adminPortalCachedUsers = records || [];
      renderAdminPortalFilteredTable();
    } catch (err) {
      console.error('[Admin] Error loading users:', err);
      el.adminUsersTableBody.innerHTML = `<tr><td colspan="7" style="padding: 24px; text-align: center; color: var(--danger);">Failed to load user directory: ${err.message}</td></tr>`;
    }
  }

  function renderAdminPortalFilteredTable() {
    if (!el.adminUsersTableBody) return;

    const query = el.adminUserSearchInput ? el.adminUserSearchInput.value.trim().toLowerCase() : '';
    const roleFilter = el.adminFilterRole ? el.adminFilterRole.value : '';
    const progFilter = el.adminFilterProg ? el.adminFilterProg.value : '';
    const statusFilter = el.adminFilterStatus ? el.adminFilterStatus.value : '';

    // Count pending users across all records
    const pendingRecords = adminPortalCachedUsers.filter(u => u.status === 'pending' || u.is_pending_approval);
    if (el.adminPendingAlert) {
      if (pendingRecords.length > 0) {
        el.adminPendingAlert.style.display = 'flex';
        if (el.adminPendingAlertTitle) {
          el.adminPendingAlertTitle.textContent = `${pendingRecords.length} User${pendingRecords.length === 1 ? '' : 's'} Waiting for Approval`;
        }
        if (el.adminPendingAlertDesc) {
          el.adminPendingAlertDesc.textContent = `${pendingRecords.length} registered account${pendingRecords.length === 1 ? ' is' : 's are'} awaiting admin approval before they can access the portal.`;
        }
      } else {
        el.adminPendingAlert.style.display = 'none';
      }
    }

    // Apply active filters
    const filtered = adminPortalCachedUsers.filter(u => {
      if (query) {
        const nameMatch = (u.full_name || '').toLowerCase().includes(query);
        const emailMatch = (u.email || '').toLowerCase().includes(query);
        if (!nameMatch && !emailMatch) return false;
      }
      if (roleFilter && u.role !== roleFilter) {
        return false;
      }
      if (progFilter) {
        if (u.role === 'admin') {
          // Admins belong to all programmes, keep them visible or match
        } else if (u.programme_id !== progFilter) {
          return false;
        }
      }
      if (statusFilter && u.status !== statusFilter) {
        return false;
      }
      return true;
    });

    if (el.adminUsersCountChip) {
      el.adminUsersCountChip.textContent = `Showing ${filtered.length} of ${adminPortalCachedUsers.length} entries`;
    }

    if (filtered.length === 0) {
      el.adminUsersTableBody.innerHTML = '<tr><td colspan="7" style="padding: 28px; text-align: center; color: var(--text-muted);">No users or invitations match the selected criteria.</td></tr>';
      return;
    }

    el.adminUsersTableBody.innerHTML = '';
    filtered.forEach(u => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-subtle)';

      // User initials avatar
      const initials = (u.full_name || u.email || 'U').split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();
      const avatarHtml = u.avatar_url
        ? `<img src="${u.avatar_url}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border-subtle);">`
        : `<div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0,165,68,0.15); color: var(--accent-light); display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 700;">${initials}</div>`;

      // Role badge
      let roleBadge = `<span style="text-transform: capitalize; font-weight: 600;">${u.role || 'intern'}</span>`;
      if (u.role === 'admin') {
        roleBadge = `<span style="background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); color: #c084fc; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700;">Admin</span>`;
      } else if (u.role === 'instructor') {
        roleBadge = `<span style="background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); color: #60a5fa; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700;">Instructor</span>`;
      } else {
        roleBadge = `<span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); color: var(--text-secondary); padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600;">Intern</span>`;
      }

      // Programme assignment name
      let progName = u.programme_name || '--';
      if (u.role === 'admin') {
        progName = `<span style="color: var(--accent-light); font-weight: 600;">All Programmes</span>`;
      } else if (!u.programme_id) {
        progName = `<span style="color: var(--text-muted); font-style: italic;">(Unassigned)</span>`;
      }

      // Status badge
      let statusBadge = '';
      if (u.status === 'active') {
        statusBadge = '<span class="badge-status-active"><span style="width:6px;height:6px;border-radius:50%;background:#00d659;"></span> Active</span>';
      } else if (u.status === 'pending') {
        statusBadge = '<span class="badge-status-pending"><span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span> Pending Approval</span>';
      } else if (u.status === 'revoked') {
        statusBadge = '<span class="badge-status-revoked"><span style="width:6px;height:6px;border-radius:50%;background:#ef4444;"></span> Revoked</span>';
      } else {
        statusBadge = '<span class="badge-status-invited"><span style="width:6px;height:6px;border-radius:50%;background:#60a5fa;"></span> Invited</span>';
      }

      // Joined/Invited Date
      const joinedDateStr = u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '--';
      const lastSeenStr = u.last_seen ? new Date(u.last_seen).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : (u.is_registered ? 'Never' : 'Invited');

      // Actions buttons
      let actionButtons = '';
      if (u.status === 'pending') {
        actionButtons += `<button type="button" class="primary-accent-btn btn-approve-user" style="padding: 4px 10px; font-size: 11.5px; margin-right: 6px;">Approve</button>`;
      }
      actionButtons += `<button type="button" class="form-action-btn secondary btn-edit-user" style="padding: 4px 10px; font-size: 11.5px; margin-right: 6px;">Edit</button>`;

      if (u.status === 'revoked') {
        actionButtons += `<button type="button" class="primary-accent-btn btn-restore-user" style="padding: 4px 10px; font-size: 11.5px; background: #059669;">Restore</button>`;
      } else {
        actionButtons += `<button type="button" class="form-action-btn secondary btn-revoke-user" style="padding: 4px 10px; font-size: 11.5px; color: #ef4444;" title="Revoke user access">Revoke</button>`;
      }

      tr.innerHTML = `
        <td style="padding: 12px 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            ${avatarHtml}
            <div>
              <strong style="display: block; font-size: 13.5px;">${u.full_name || (u.is_registered ? 'Registered User' : 'Invited Member')}</strong>
              <span style="font-size: 12px; color: var(--text-secondary);">${u.email}</span>
            </div>
          </div>
        </td>
        <td style="padding: 12px 14px;">${roleBadge}</td>
        <td style="padding: 12px 14px;">${progName}</td>
        <td style="padding: 12px 14px;">${statusBadge}</td>
        <td style="padding: 12px 14px; font-size: 12px; color: var(--text-secondary);">${joinedDateStr}</td>
        <td style="padding: 12px 14px; font-size: 12px; color: var(--text-secondary);">${lastSeenStr}</td>
        <td style="padding: 12px 14px; text-align: right; white-space: nowrap;">${actionButtons}</td>
      `;

      // Wire action events
      const approveBtn = tr.querySelector('.btn-approve-user');
      if (approveBtn) {
        approveBtn.addEventListener('click', () => openAdminEditModal(u, true));
      }

      const editBtn = tr.querySelector('.btn-edit-user');
      if (editBtn) {
        editBtn.addEventListener('click', () => openAdminEditModal(u, false));
      }

      const revokeBtn = tr.querySelector('.btn-revoke-user');
      if (revokeBtn) {
        revokeBtn.addEventListener('click', async () => {
          if (!confirm(`Are you sure you want to revoke access for ${u.full_name || u.email}? They will immediately be locked out of all portal resources.`)) return;
          try {
            await window.DataLayer.adminRevokeUserAccess(u.id);
            showToast(`Revoked access for ${u.email}`);
            await renderAdminPortal();
          } catch (err) {
            alert('Failed to revoke access: ' + err.message);
          }
        });
      }

      const restoreBtn = tr.querySelector('.btn-restore-user');
      if (restoreBtn) {
        restoreBtn.addEventListener('click', async () => {
          try {
            await window.DataLayer.adminRestoreUserAccess(u.id);
            showToast(`Restored access for ${u.email}`);
            await renderAdminPortal();
          } catch (err) {
            alert('Failed to restore access: ' + err.message);
          }
        });
      }

      el.adminUsersTableBody.appendChild(tr);
    });
  }

  

  function openAdminEditModal(user, isApproving = false) {
    if (!el.adminEditUserModal) return;
    el.adminEditUserId.value = user.id;
    el.adminEditUserName.textContent = user.full_name || (user.is_registered ? 'Registered User' : 'Invited Member');
    el.adminEditUserEmail.textContent = user.email;

    el.adminEditRoleSelect.value = user.role || 'intern';
    const roleIsAdmin = el.adminEditRoleSelect.value === 'admin';
    el.adminEditProgSelect.disabled = roleIsAdmin;
    if (el.adminEditProgNote) el.adminEditProgNote.style.display = roleIsAdmin ? 'block' : 'none';

    if (user.programme_id) {
      el.adminEditProgSelect.value = user.programme_id;
    } else {
      el.adminEditProgSelect.value = CANONICAL_PROGRAMMES[0].id;
    }

    if (isApproving) {
      el.adminSaveEditUserBtn.textContent = 'Approve & Activate';
    } else {
      el.adminSaveEditUserBtn.textContent = 'Save Changes';
    }

    el.adminEditUserModal.style.display = 'flex';
  }

  function wireAdminPortalEvents() {
    if (adminPortalEventsWired) return;
    adminPortalEventsWired = true;

    // Search and filters
    if (el.adminUserSearchInput) {
      el.adminUserSearchInput.addEventListener('input', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterRole) {
      el.adminFilterRole.addEventListener('change', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterProg) {
      el.adminFilterProg.addEventListener('change', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterStatus) {
      el.adminFilterStatus.addEventListener('change', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterPendingBtn) {
      el.adminFilterPendingBtn.addEventListener('click', () => {
        if (el.adminFilterStatus) {
          el.adminFilterStatus.value = 'pending';
          renderAdminPortalFilteredTable();
        }
      });
    }

    // Tab switching Single vs Bulk Invite
    if (el.adminTabSingleInviteBtn && el.adminTabBulkInviteBtn) {
      el.adminTabSingleInviteBtn.addEventListener('click', () => {
        el.adminTabSingleInviteBtn.classList.add('active');
        el.adminTabBulkInviteBtn.classList.remove('active');
        if (el.adminSingleInviteForm) el.adminSingleInviteForm.style.display = 'block';
        if (el.adminBulkInviteSection) el.adminBulkInviteSection.style.display = 'none';
      });

      el.adminTabBulkInviteBtn.addEventListener('click', () => {
        el.adminTabBulkInviteBtn.classList.add('active');
        el.adminTabSingleInviteBtn.classList.remove('active');
        if (el.adminSingleInviteForm) el.adminSingleInviteForm.style.display = 'none';
        if (el.adminBulkInviteSection) el.adminBulkInviteSection.style.display = 'block';
      });
    }

    // Single Invite Role toggle
    if (el.adminInviteRole) {
      el.adminInviteRole.addEventListener('change', () => {
        const isAdmin = el.adminInviteRole.value === 'admin';
        if (el.adminInviteProgramme) {
          el.adminInviteProgramme.disabled = isAdmin;
        }
        if (el.adminInviteProgNote) {
          el.adminInviteProgNote.style.display = isAdmin ? 'block' : 'none';
        }
      });
    }

    // Single Invite Form Submit
    if (el.adminSingleInviteForm) {
      el.adminSingleInviteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = el.adminInviteEmail.value.trim().toLowerCase();
        const role = el.adminInviteRole.value;
        const programmeId = role === 'admin' ? null : el.adminInviteProgramme.value;

        if (!email) {
          alert('Please enter a valid email address.');
          return;
        }

        el.adminSubmitInviteBtn.disabled = true;
        el.adminSubmitInviteBtn.textContent = 'Sending...';

        try {
          await window.DataLayer.adminInviteUser({ email, role, programmeId });
          showToast(`Access approved/invited for ${email}`);
          el.adminInviteEmail.value = '';
          await renderAdminPortal();
        } catch (err) {
          alert('Failed to send invite: ' + err.message);
        } finally {
          el.adminSubmitInviteBtn.disabled = false;
          el.adminSubmitInviteBtn.textContent = 'Send Invitation / Approve';
        }
      });
    }

    // Bulk Invite File Upload (CSV)
    if (el.adminBulkCsvInput) {
      el.adminBulkCsvInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          if (el.adminBulkTextInput) {
            el.adminBulkTextInput.value = event.target.result;
            validateBulkInput();
          }
        };
        reader.readAsText(file);
      });
    }

    // Bulk Invite Validate Button
    if (el.adminBulkValidateBtn) {
      el.adminBulkValidateBtn.addEventListener('click', validateBulkInput);
    }

    // Bulk Invite Clear Button
    if (el.adminBulkClearBtn) {
      el.adminBulkClearBtn.addEventListener('click', () => {
        if (el.adminBulkTextInput) el.adminBulkTextInput.value = '';
        if (el.adminBulkCsvInput) el.adminBulkCsvInput.value = '';
        if (el.adminBulkPreviewBox) el.adminBulkPreviewBox.style.display = 'none';
        bulkParsedEntries = [];
      });
    }

    // Bulk Invite Confirm Button
    if (el.adminBulkConfirmBtn) {
      el.adminBulkConfirmBtn.addEventListener('click', async () => {
        const validEntries = bulkParsedEntries.filter(e => e.isValid);
        if (validEntries.length === 0) {
          alert('No valid rows found to invite. Please check the validation table.');
          return;
        }

        el.adminBulkConfirmBtn.disabled = true;
        el.adminBulkConfirmBtn.textContent = `Inviting ${validEntries.length} users...`;

        let successCount = 0;
        let failCount = 0;

        for (const entry of validEntries) {
          try {
            await window.DataLayer.adminInviteUser({
              email: entry.email,
              role: entry.role,
              programmeId: entry.programmeId
            });
            successCount++;
          } catch (err) {
            console.warn(`Bulk invite error for ${entry.email}:`, err);
            failCount++;
          }
        }

        showToast(`Bulk invite complete: ${successCount} invited${failCount > 0 ? `, ${failCount} failed` : ''}.`);
        el.adminBulkConfirmBtn.disabled = false;
        el.adminBulkConfirmBtn.textContent = 'Invite All Valid Users';
        if (el.adminBulkTextInput) el.adminBulkTextInput.value = '';
        if (el.adminBulkPreviewBox) el.adminBulkPreviewBox.style.display = 'none';
        bulkParsedEntries = [];
        await renderAdminPortal();
      });
    }

    // Edit User Modal events
    if (el.adminEditRoleSelect) {
      el.adminEditRoleSelect.addEventListener('change', () => {
        const isAdmin = el.adminEditRoleSelect.value === 'admin';
        if (el.adminEditProgSelect) {
          el.adminEditProgSelect.disabled = isAdmin;
        }
        if (el.adminEditProgNote) {
          el.adminEditProgNote.style.display = isAdmin ? 'block' : 'none';
        }
      });
    }

    if (el.adminSaveEditUserBtn) {
      el.adminSaveEditUserBtn.addEventListener('click', async () => {
        const userId = el.adminEditUserId.value;
        const role = el.adminEditRoleSelect.value;
        const programmeId = role === 'admin' ? null : el.adminEditProgSelect.value;

        el.adminSaveEditUserBtn.disabled = true;
        el.adminSaveEditUserBtn.textContent = 'Saving...';

        try {
          await window.DataLayer.adminUpdateUserAccess(userId, { role, programmeId });
          showToast('Updated user permissions successfully.');
          if (el.adminEditUserModal) el.adminEditUserModal.style.display = 'none';
          await renderAdminPortal();
        } catch (err) {
          alert('Failed to update user: ' + err.message);
        } finally {
          el.adminSaveEditUserBtn.disabled = false;
          el.adminSaveEditUserBtn.textContent = 'Save Changes';
        }
      });
    }

    if (el.adminCancelEditUserBtn) {
      el.adminCancelEditUserBtn.addEventListener('click', () => {
        if (el.adminEditUserModal) el.adminEditUserModal.style.display = 'none';
      });
    }
    if (el.closeAdminEditUserModalBtn) {
      el.closeAdminEditUserModalBtn.addEventListener('click', () => {
        if (el.adminEditUserModal) el.adminEditUserModal.style.display = 'none';
      });
    }
  }

  function validateBulkInput() {
    if (!el.adminBulkTextInput || !el.adminBulkPreviewBox || !el.adminBulkPreviewTbody) return;
    const raw = el.adminBulkTextInput.value.trim();
    if (!raw) {
      alert('Please enter or paste at least one line of user data.');
      return;
    }

    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
    bulkParsedEntries = [];

    lines.forEach((line, idx) => {
      // Split by comma or semicolon
      const parts = line.split(/[,;]/).map(p => p.trim());
      const email = (parts[0] || '').toLowerCase();
      const roleRaw = (parts[1] || 'intern').toLowerCase();
      const progRaw = (parts[2] || '').toLowerCase();

      let role = 'intern';
      if (roleRaw.includes('admin')) role = 'admin';
      else if (roleRaw.includes('instruct')) role = 'instructor';

      const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      let programmeId = null;
      let programmeName = role === 'admin' ? 'All Programmes (Admin)' : '';
      let error = null;

      if (!emailValid) {
        error = 'Invalid email syntax';
      } else if (role !== 'admin') {
        const matchProg = CANONICAL_PROGRAMMES.find(p =>
          p.name.toLowerCase().includes(progRaw) ||
          p.slug.toLowerCase().includes(progRaw) ||
          p.id === progRaw
        );
        if (matchProg) {
          programmeId = matchProg.id;
          programmeName = matchProg.name;
        } else {
          // Default to first if omitted or specify error
          if (!progRaw) {
            programmeId = CANONICAL_PROGRAMMES[0].id;
            programmeName = CANONICAL_PROGRAMMES[0].name;
          } else {
            error = `Unknown programme "${parts[2]}"`;
          }
        }
      }

      bulkParsedEntries.push({
        lineNum: idx + 1,
        email,
        role,
        programmeId,
        programmeName,
        isValid: !error,
        error
      });
    });

    el.adminBulkPreviewTbody.innerHTML = '';
    bulkParsedEntries.forEach(e => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${e.email}</strong></td>
        <td style="text-transform: capitalize;">${e.role}</td>
        <td>${e.programmeName || '--'}</td>
        <td>
          ${e.isValid
          ? '<span style="color: #00d659; font-weight: 700;">&#10003; Valid</span>'
          : `<span style="color: #ef4444; font-weight: 600;">&#10007; ${e.error}</span>`}
        </td>
      `;
      el.adminBulkPreviewTbody.appendChild(tr);
    });

    el.adminBulkPreviewBox.style.display = 'block';
  }

  function applyRolePermissions(profile) {
    const role = profile?.role || 'intern';
    if (el.navAdmin) {
      el.navAdmin.style.display = (role === 'admin') ? 'flex' : 'none';
    }

    if (el.programmeSelect) {
      if (role === 'admin') {
        el.programmeSelect.disabled = false;
        el.programmeSelect.title = 'Switch cohort programme (Admin access)';
      } else {
        // Intern or Instructor locked to their assigned programme
        el.programmeSelect.disabled = true;
        el.programmeSelect.title = 'Assigned cohort programme (managed by Admin)';
        if (profile?.programme_id) {
          const key = getProgrammeKey(profile.programme_id);
          currentProgrammeId = key;
          el.programmeSelect.value = key;
        }
      }
    }
  }

  async function syncCurriculumFromBackend() {
    if (typeof window.DataLayer === 'undefined') return;
    const dbProgId = getProgrammeDbId(currentProgrammeId);
    try {
      const modules = await window.DataLayer.getModules(dbProgId);
      if (modules && modules.length > 0) {
        const prog = getCurrentProgramme();
        modules.forEach((m, idx) => {
          if (prog.modules[idx]) {
            prog.modules[idx].dbId = m.id;
            prog.modules[idx].isUnlocked = m.isUnlocked;
            prog.modules[idx].timerUnlocked = Boolean(m.timer_completed_at);
            prog.modules[idx].timer_completed_at = m.timer_completed_at;
            prog.modules[idx].completed_at = m.completed_at;

            if (m.resources && m.resources.length > 0) {
              (prog.modules[idx].resources || []).forEach((r, rIdx) => {
                const dbRes = m.resources.find(dbR => dbR.id === r.id || dbR.number === r.number || (dbR.title && r.title && dbR.title.includes(r.title))) || m.resources[rIdx];
                if (dbRes) {
                  r.id = dbRes.id;
                  r.storage_path = dbRes.storage_path;
                  r.type = dbRes.type || r.type;
                }
                r.completed = (m.completedResources || []).includes(r.id);
              });
            } else if (m.completedResources) {
              (prog.modules[idx].resources || []).forEach(r => {
                r.completed = m.completedResources.includes(r.id);
              });
            }
            if (m.readFaqs) {
              (prog.modules[idx].faqs || []).forEach(f => {
                f.read = m.readFaqs.includes(f.id);
              });
            }
          }
        });
        renderSidebar();
        if (activeScreen === 'module') {
          renderModulePage();
        }
      }

      // Update completion percentage from view
      const comp = await window.DataLayer.getProgrammeCompletion(dbProgId);
      if (comp && comp.completion_percentage !== undefined) {
        if (el.sidebarProgressPercent) el.sidebarProgressPercent.textContent = `${comp.completion_percentage}%`;
        if (el.sidebarProgressBar) el.sidebarProgressBar.style.width = `${comp.completion_percentage}%`;
      }
    } catch (err) {
      console.warn('[Sync] Curriculum sync error:', err);
    }
  }

  // =========================================================================
  // ACCOUNT SETTINGS CONTROLLER (REAL DATABASE CONNECTION & AVATAR STORAGE)
  // =========================================================================
  async function renderAccountSettingsScreen() {
    let liveUser = null;
    let liveProfile = null;

    if (window.SupabaseClient) {
      try {
        liveUser = await window.SupabaseClient.getUser();
        if (liveUser && window.DataLayer) {
          liveProfile = await window.DataLayer.getProfile(liveUser.id);
        }
      } catch (err) {
        console.warn('[AccountSettings] Error fetching live profile:', err);
      }
    }

    // Determine values: DB profile -> Auth user -> Local state
    const p = state.profile || {};
    const fullName = liveProfile?.full_name || liveProfile?.display_name || liveUser?.user_metadata?.full_name || p.name || 'User';
    const email = liveUser?.email || liveProfile?.email || p.email || '--';
    const roleKey = (liveProfile?.role || p.role || 'learner').toLowerCase();
    const roleFormatted = roleKey === 'admin' ? 'Administrator' : (roleKey === 'instructor' ? 'Instructor' : 'Intern / Learner');
    const programmeName = liveProfile?.programme?.name || p.programmeName || 'Unassigned';
    const branch = liveProfile?.branch || p.branch || 'Ikaai HQ - New Delhi / Remote';
    const position = liveProfile?.position || p.position || 'Not specified';
    const phone = liveProfile?.phone || p.phone || '';
    const avatarUrl = liveProfile?.avatar_url || liveUser?.user_metadata?.avatar_url || liveUser?.user_metadata?.picture || p.avatar_url || null;

    // Format Member Since
    let memberSinceFormatted = p.memberSince || 'November 2026';
    const rawDate = liveProfile?.member_since_date || liveProfile?.created_at || liveUser?.created_at;
    if (rawDate) {
      try {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          memberSinceFormatted = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
      } catch (de) {
        // fallback to default
      }
    }

    // Determine Sign-in Method & Verified Status
    const isGoogle = Boolean(
      liveUser?.app_metadata?.provider === 'google' ||
      liveUser?.identities?.some(i => i.provider === 'google')
    );
    const signInMethodText = isGoogle ? 'Google Account' : 'Email & Password';
    const isVerified = isGoogle || Boolean(liveUser?.email_confirmed_at || liveUser?.confirmed_at || p.verified);

    // Update state cache for cross-app synchronization
    state.profile.name = fullName;
    state.profile.email = email;
    state.profile.role = roleKey;
    state.profile.branch = branch;
    state.profile.position = position;
    state.profile.phone = phone;
    state.profile.memberSince = memberSinceFormatted;
    state.profile.avatar_url = avatarUrl;
    state.profile.verified = isVerified;

    // Compute initials
    const nameParts = fullName.trim().split(/\s+/);
    state.profile.initials = (nameParts.length >= 2 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]) : fullName.slice(0, 2)).toUpperCase();

    // Populate Account Info Card
    if (el.profileEmail) el.profileEmail.textContent = email;
    if (el.profileSignInMethod) el.profileSignInMethod.textContent = signInMethodText;
    if (el.profileRole) el.profileRole.textContent = roleFormatted;
    if (el.profileProgramme) el.profileProgramme.textContent = programmeName;
    if (el.profileBranch) el.profileBranch.textContent = branch;
    if (el.profilePosition) el.profilePosition.textContent = position;
    if (el.profileMemberSince) el.profileMemberSince.textContent = memberSinceFormatted;

    // Verification Badge
    if (el.profileVerifiedBadge) {
      if (isVerified) {
        el.profileVerifiedBadge.className = 'status-verified-badge';
        el.profileVerifiedBadge.textContent = isGoogle ? '✓ Verified (Google)' : '✓ Verified Email';
      } else {
        el.profileVerifiedBadge.className = 'status-unverified-badge';
        el.profileVerifiedBadge.textContent = '⚠️ Unverified Email';
      }
    }

    // Populate Avatar Preview
    if (el.settingsAvatarPreview) {
      if (avatarUrl) {
        el.settingsAvatarPreview.innerHTML = `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(fullName)}">`;
        el.settingsAvatarPreview.style.background = 'transparent';
      } else {
        el.settingsAvatarPreview.textContent = state.profile.initials;
        el.settingsAvatarPreview.style.background = 'linear-gradient(135deg, #00a544, #00511e)';
      }
    }
    if (el.removeAvatarBtn) {
      el.removeAvatarBtn.style.display = liveProfile?.avatar_url ? 'inline-flex' : 'none';
    }

    // Populate Form Inputs
    if (el.userNameInput) el.userNameInput.value = fullName;
    if (el.userPhoneInput) el.userPhoneInput.value = phone;

    // Toggle Google notice vs Email password form
    if (el.googleUserNotice && el.emailUserPasswordWrap) {
      if (isGoogle) {
        el.googleUserNotice.style.display = 'flex';
        el.emailUserPasswordWrap.style.display = 'none';
      } else {
        el.googleUserNotice.style.display = 'none';
        el.emailUserPasswordWrap.style.display = 'block';
      }
    }

    // Refresh top bar and dropdowns
    updateUserAvatarUI();
  }

  function updateUserAvatarUI() {
    const p = state.profile || {};
    const initials = p.initials || 'SK';
    const displayName = p.name || 'User';
    const email = p.email || '--';

    if (el.userAvatarInitials) {
      if (p.avatar_url) {
        el.userAvatarInitials.innerHTML = `<img src="${escapeHtml(p.avatar_url)}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        el.userAvatarInitials.style.background = 'transparent';
      } else {
        el.userAvatarInitials.textContent = initials;
        el.userAvatarInitials.style.background = 'linear-gradient(135deg, #00a544, #00511e)';
      }
    }
    if (el.topBarUserName) el.topBarUserName.textContent = displayName;
    if (el.dropdownUserName) el.dropdownUserName.textContent = displayName;
    if (el.dropdownUserEmail) el.dropdownUserEmail.textContent = email;
    if (el.profileFullNameDisplay) el.profileFullNameDisplay.textContent = displayName;
    if (el.profileEmail) el.profileEmail.textContent = email;
  }

  // Feedback display helper for Account Settings
  function showAccountBanner(containerEl, message, type = 'success') {
    if (!containerEl) return;
    containerEl.className = `account-feedback-banner ${type}`;
    containerEl.style.display = 'flex';
    containerEl.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        ${type === 'success'
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
      </svg>
      <span>${escapeHtml(message)}</span>
    `;
    setTimeout(() => {
      if (containerEl && type === 'success') {
        containerEl.style.display = 'none';
      }
    }, 4500);
  }

  // Wire all events for Account Settings
  let accountSettingsEventsWired = false;
  function wireAccountSettingsEvents() {
    if (accountSettingsEventsWired) return;
    accountSettingsEventsWired = true;

    // 1. Edit Profile Details (Full Name and Phone)
    if (el.profileActionsForm) {
      el.profileActionsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = el.userNameInput ? el.userNameInput.value.trim() : '';
        const newPhone = el.userPhoneInput ? el.userPhoneInput.value.trim() : '';

        if (!newName || newName.length < 2 || newName.length > 60) {
          showAccountBanner(el.profileDetailsFeedback, 'Full name must be between 2 and 60 characters.', 'error');
          return;
        }

        if (!newPhone) {
          showAccountBanner(el.profileDetailsFeedback, 'Phone number is mandatory. Please enter your contact number.', 'error');
          if (el.userPhoneInput) el.userPhoneInput.focus();
          return;
        }

        if (!/^\+?[\d\s\-()]{7,20}$/.test(newPhone)) {
          showAccountBanner(el.profileDetailsFeedback, 'Please enter a valid phone number (e.g. +91 98765 43210).', 'error');
          if (el.userPhoneInput) el.userPhoneInput.focus();
          return;
        }

        if (el.saveProfileBtn) {
          el.saveProfileBtn.disabled = true;
          el.saveProfileBtn.textContent = 'Saving...';
        }

        try {
          if (window.DataLayer) {
            await window.DataLayer.updateProfile({
              fullName: newName,
              phone: newPhone || null
            });
          }

          state.profile.name = newName;
          state.profile.phone = newPhone;
          const parts = newName.split(/\s+/);
          state.profile.initials = (parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]) : newName.slice(0, 2)).toUpperCase();
          updateUserAvatarUI();

          showAccountBanner(el.profileDetailsFeedback, '✓ Profile details saved successfully.', 'success');
          showToast(`Profile updated: ${newName}`);
        } catch (err) {
          showAccountBanner(el.profileDetailsFeedback, `Save failed: ${err.message}`, 'error');
        } finally {
          if (el.saveProfileBtn) {
            el.saveProfileBtn.disabled = false;
            el.saveProfileBtn.textContent = 'Save Changes';
          }
        }
      });
    }

    // 2. Avatar Upload Button & File Input
    if (el.uploadAvatarBtn && el.avatarFileInput) {
      el.uploadAvatarBtn.addEventListener('click', () => {
        el.avatarFileInput.click();
      });

      el.avatarFileInput.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
          showAccountBanner(el.avatarFeedback, 'Selected image exceeds the 2 MB limit.', 'error');
          el.avatarFileInput.value = '';
          return;
        }

        const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedMimes.includes(file.type.toLowerCase())) {
          showAccountBanner(el.avatarFeedback, 'Only PNG, JPG, and WebP image formats are allowed.', 'error');
          el.avatarFileInput.value = '';
          return;
        }

        el.uploadAvatarBtn.disabled = true;
        el.uploadAvatarBtn.textContent = 'Uploading...';

        try {
          if (!window.DataLayer) throw new Error('Data connection unavailable.');
          const newUrl = await window.DataLayer.uploadAvatar(file);
          state.profile.avatar_url = newUrl;
          updateUserAvatarUI();
          await renderAccountSettingsScreen();
          showAccountBanner(el.avatarFeedback, '✓ Profile photo uploaded and updated successfully.', 'success');
          showToast('Profile photo updated.');
        } catch (err) {
          showAccountBanner(el.avatarFeedback, `Upload failed: ${err.message}`, 'error');
        } finally {
          el.uploadAvatarBtn.disabled = false;
          el.uploadAvatarBtn.textContent = 'Upload Photo';
          el.avatarFileInput.value = '';
        }
      });
    }

    // 3. Avatar Remove Button
    if (el.removeAvatarBtn) {
      el.removeAvatarBtn.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to remove your profile photo?')) return;

        el.removeAvatarBtn.disabled = true;
        try {
          if (!window.DataLayer) throw new Error('Data connection unavailable.');
          await window.DataLayer.removeAvatar();
          state.profile.avatar_url = null;
          updateUserAvatarUI();
          await renderAccountSettingsScreen();
          showAccountBanner(el.avatarFeedback, '✓ Profile photo removed.', 'success');
          showToast('Profile photo removed.');
        } catch (err) {
          showAccountBanner(el.avatarFeedback, `Remove failed: ${err.message}`, 'error');
        } finally {
          el.removeAvatarBtn.disabled = false;
        }
      });
    }

    // 4. Password Change Form (Email-and-password users only)
    if (el.passwordChangeForm) {
      el.passwordChangeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPass = el.newPasswordInput ? el.newPasswordInput.value : '';
        const confirmPass = el.confirmPasswordInput ? el.confirmPasswordInput.value : '';

        if (!newPass || newPass.length < 8) {
          showAccountBanner(el.passwordFeedback, 'New password must be at least 8 characters long.', 'error');
          return;
        }

        if (newPass !== confirmPass) {
          showAccountBanner(el.passwordFeedback, 'Passwords do not match. Please re-enter.', 'error');
          return;
        }

        if (el.changePasswordBtn) {
          el.changePasswordBtn.disabled = true;
          el.changePasswordBtn.textContent = 'Updating...';
        }

        try {
          if (!window.DataLayer) throw new Error('Data connection unavailable.');
          await window.DataLayer.changePassword(newPass);
          if (el.newPasswordInput) el.newPasswordInput.value = '';
          if (el.confirmPasswordInput) el.confirmPasswordInput.value = '';
          showAccountBanner(el.passwordFeedback, '✓ Password updated successfully.', 'success');
          showToast('Password updated.');
        } catch (err) {
          showAccountBanner(el.passwordFeedback, `Password update failed: ${err.message}`, 'error');
        } finally {
          if (el.changePasswordBtn) {
            el.changePasswordBtn.disabled = false;
            el.changePasswordBtn.textContent = 'Update Password';
          }
        }
      });
    }

    // 5. Sign Out
    if (el.accountSignOutBtn) {
      el.accountSignOutBtn.addEventListener('click', async () => {
        if (el.accountSignOutBtn) el.accountSignOutBtn.disabled = true;
        try {
          if (window.DataLayer) await window.DataLayer.signOut();
        } catch (e) {
          console.warn('[AccountSettings] Sign out error:', e);
        }
        handleSignOutCleanup();
        window.location.reload();
      });
    }

    // 6. Sign Out of All Devices
    if (el.accountSignOutAllBtn) {
      el.accountSignOutAllBtn.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to sign out of all active sessions across all devices?')) return;
        if (el.accountSignOutAllBtn) el.accountSignOutAllBtn.disabled = true;
        try {
          if (window.DataLayer) await window.DataLayer.signOutAllDevices();
        } catch (e) {
          console.warn('[AccountSettings] Sign out all error:', e);
        }
        handleSignOutCleanup();
        window.location.reload();
      });
    }
  }

  // ==========================================
  // 18. INITIALIZATION
  // ==========================================

  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const authParam = params.get('auth');
    if (authParam === 'demo' || authParam === '1') {
      handleSuccessfulAuth({ name: 'Sudhir Kumar', email: 's.kumar@ikaaiindia.org' });
    }
    const progParam = params.get('prog') || params.get('programme');
    if (progParam && state.programmes[progParam]) {
      currentProgrammeId = progParam;
    }
    const themeParam = params.get('theme');
    if (themeParam && ['light', 'dark', 'system'].includes(themeParam)) {
      applyTheme(themeParam, false);
    }
    const screenParam = params.get('screen');

    const moduleParam = params.get('module');
    const previewParam = params.get('preview');
    if (params.get('debug_slide') === '1') {
      setTimeout(() => {
        const fsBtn = document.querySelector('.fullscreen-btn');
        if (fsBtn) fsBtn.click();
        setTimeout(() => {
          const slides = document.querySelectorAll('.doc-viewer-slide');
          slides.forEach((sl, i) => {
            console.log(`Slide ${i}: clientHeight=${sl.clientHeight}, scrollHeight=${sl.scrollHeight}, offsetHeight=${sl.offsetHeight}`);
            const content = sl.querySelector('.slide-content');
            if (content) {
              console.log(`Content ${i}: clientHeight=${content.clientHeight}, scrollHeight=${content.scrollHeight}`);
            }
          });
        }, 300);
      }, 400);
    }



    if (moduleParam !== null) {
      const modIdx = parseInt(moduleParam, 10);
      if (!isNaN(modIdx)) {
        currentModuleIndex = modIdx;
        expandedModules.add(modIdx);
      }
    }

    if (screenParam) {
      if (screenParam === 'sidebar') {
        activeScreen = 'module';
        setTimeout(openSidebar, 50);
      } else if (el.screens[screenParam]) {
        activeScreen = screenParam;
      }
    }

    if (previewParam) {
      setTimeout(() => {
        const firstCard = document.querySelector('.resource-card-item');
        if (firstCard) firstCard.classList.add('preview-open');
      }, 100);
    }

    const jdParam = params.get('jd');
    if (jdParam) {
      setTimeout(() => openJdDetailById(jdParam), 100);
    }
  }

  // ==========================================
  // JOB DESCRIPTIONS LOGIC
  // ==========================================
  let activeJdCategory = 'All';
  let jdSearchQuery = '';

  function resetJdViewToGallery() {
    if (el.jdDetailView) el.jdDetailView.style.display = 'none';
    if (el.jdGalleryView) el.jdGalleryView.style.display = 'block';
  }

  function renderJobDescriptionsScreen() {
    if (!el.jdsCardsGrid) return;
    const allJds = window.IKAAI_JOB_DESCRIPTIONS || [];

    // Filter by category and search keyword
    const filtered = allJds.filter(jd => {
      const matchCat = (activeJdCategory === 'All') || (jd.category === activeJdCategory);
      if (!matchCat) return false;
      if (!jdSearchQuery) return true;
      const q = jdSearchQuery.toLowerCase();
      return (
        jd.title.toLowerCase().includes(q) ||
        jd.category.toLowerCase().includes(q) ||
        jd.excerpt.toLowerCase().includes(q)
      );
    });

    if (el.jdVisibleCount) {
      el.jdVisibleCount.textContent = `Showing ${filtered.length} of ${allJds.length} role specifications`;
    }

    if (el.sidebarJdCountBadge) {
      el.sidebarJdCountBadge.textContent = allJds.length;
    }

    // Render filter chips
    if (el.jdFilterChips) {
      const categories = ['All', 'Research', 'HR & Admin', 'Data Analyst', 'Business Development', 'Social Media & Design'];
      el.jdFilterChips.innerHTML = '';
      categories.forEach(cat => {
        const count = cat === 'All' ? allJds.length : allJds.filter(j => j.category === cat).length;
        const chip = document.createElement('button');
        chip.className = `filter-chip ${activeJdCategory === cat ? 'active' : ''}`;
        chip.type = 'button';
        chip.textContent = `${cat} (${count})`;
        chip.onclick = () => {
          activeJdCategory = cat;
          renderJobDescriptionsScreen();
        };
        el.jdFilterChips.appendChild(chip);
      });
    }

    // Render cards
    el.jdsCardsGrid.innerHTML = '';
    if (filtered.length === 0) {
      el.jdsCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <p style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 6px;">No job descriptions found</p>
          <p style="font-size: 13px;">Try selecting a different filter chip or searching with a different role title.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(jd => {
      const card = document.createElement('div');
      card.className = 'card jd-card';
      card.innerHTML = `
        <div class="jd-card-header">
          <div class="jd-badges-row">
            <span class="jd-category-badge">${jd.category}</span>
            <span class="jd-file-badge" title="Source document: JD/${jd.fileName}">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              ${jd.fileName}
            </span>
          </div>
          <h3 class="jd-card-title">${jd.title}</h3>
        </div>
        <p class="jd-card-excerpt">${jd.excerpt}</p>
        <div class="jd-card-footer">
          <span class="jd-card-doc-tag">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            Original .docx
          </span>
          <button class="btn-view-jd" type="button">View Role Spec ›</button>
        </div>
      `;
      card.onclick = () => openJdDetailById(jd.id);
      el.jdsCardsGrid.appendChild(card);
    });
  }

  

  function openJdDetailById(jdId) {
    const allJds = window.IKAAI_JOB_DESCRIPTIONS || [];
    const jd = allJds.find(j => j.id === jdId);
    if (!jd) return;

    if (el.jdGalleryView) el.jdGalleryView.style.display = 'none';
    if (el.jdDetailView) {
      el.jdDetailView.style.display = 'block';
      if (el.jdDetailHeading) el.jdDetailHeading.textContent = jd.title;
      if (el.jdDetailCategoryBadge) el.jdDetailCategoryBadge.textContent = jd.category;
      if (el.jdDetailFileName) el.jdDetailFileName.textContent = `Original source: JD/${jd.fileName}`;
      if (el.downloadJdBtn) {
        el.downloadJdBtn.href = jd.downloadPath;
        el.downloadJdBtn.setAttribute('download', jd.fileName);
      }
      if (el.jdDetailHtmlContent) el.jdDetailHtmlContent.innerHTML = (jd.htmlContent || jd.html);
    }

    switchScreen('jobDescriptions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderProgrammeJds(progId) {
    if (!el.programmeJdsChipsList) return;
    el.programmeJdsChipsList.innerHTML = '';
    const allJds = window.IKAAI_JOB_DESCRIPTIONS || [];
    const progJds = allJds.filter(jd => (jd.programmes || []).includes(progId));
    if (progJds.length === 0) {
      el.programmeJdsChipsList.innerHTML = '<span style="color:var(--text-muted);font-size:12px;">No specific JDs for this programme</span>';
      return;
    }
    progJds.forEach(jd => {
      const pill = document.createElement('button');
      pill.className = 'prog-jd-pill';
      pill.type = 'button';
      pill.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <span>${jd.title}</span>
      `;
      pill.onclick = () => openJdDetailById(jd.id);
      el.programmeJdsChipsList.appendChild(pill);
    });
  }

  

  // JD detail back, print, and search events
  if (el.backToJdsBtn) {
    el.backToJdsBtn.addEventListener('click', resetJdViewToGallery);
  }

  if (el.printJdBtn) {
    el.printJdBtn.addEventListener('click', () => window.print());
  }

  if (el.viewAllJdsFromModBtn) {
    el.viewAllJdsFromModBtn.addEventListener('click', () => {
      resetJdViewToGallery();
      switchScreen('jobDescriptions');
    });
  }

  

  if (el.jdSearchInput) {
    el.jdSearchInput.addEventListener('input', (e) => {
      jdSearchQuery = e.target.value.trim();
      renderJobDescriptionsScreen();
    });
  }

  

  // Global search in Topbar
  if (el.globalSearchInput) {
    el.globalSearchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const val = el.globalSearchInput.value.trim();
        if (val) {
          jdSearchQuery = val;
          if (el.jdSearchInput) el.jdSearchInput.value = val;
          resetJdViewToGallery();
          switchScreen('jobDescriptions');
        }
      }
    });
  }

  


  // ==========================================
  // SECTION 2B: COMPANY RESOURCES MODULE (PROGRAMME + PERSONAL + MANAGE)
  // ==========================================
  const compResState = {
    mainTab: localStorage.getItem('comp_res_active_tab') || 'programme', // 'programme' | 'personal' | 'manage'
    activeTab: 'published', // 'published' | 'drafts' (inside programme pane)
    selectedProgramme: 'all', // 'all' or UUID
    selectedType: 'all', // 'all' or document_type
    searchQuery: '',
    viewMode: 'grid', // 'grid' | 'list'
    documents: [],

    // Personal documents state
    personalCategory: 'all',
    personalSearch: '',
    personalViewMode: 'grid',
    personalDocs: [],

    // Admin Manage state
    manageView: 'docs', // 'docs' | 'users' | 'logs'
    manageRecipient: 'all',
    manageCategory: 'all',
    manageAck: 'all',
    manageRevoked: 'false',
    manageSearch: '',
    allPersonalDocs: [],
    accessLogs: [],
    profilesList: [],

    loading: false,
    initialized: false,
    activeMenuDocId: null
  };

  const COMP_RES_PROGRAMMES = {
    '10000000-0000-0000-0000-000000000001': 'Human Resources',
    '10000000-0000-0000-0000-000000000002': 'Data Analyst',
    '10000000-0000-0000-0000-000000000003': 'Social Research & Policy',
    '10000000-0000-0000-0000-000000000004': 'Design & Social Media',
    '10000000-0000-0000-0000-000000000005': 'Business Development'
  };

  const COMP_RES_TYPE_LABELS = {
    'policy': 'Policies',
    'guideline': 'Guidelines',
    'template': 'Templates',
    'form': 'Forms',
    'letter': 'Letters & Official Correspondence',
    'report': 'Reports',
    'other': 'Other Documents'
  };

  const COMP_RES_PERSONAL_CATEGORY_LABELS = {
    'offer_letter': 'Offer & Appointment Letters',
    'certificate': 'Certificates',
    'id_card': 'ID & Access Cards',
    'evaluation_letter': 'Performance & Evaluation Letters',
    'agreement': 'Agreements & Declarations',
    'payslip': 'Payslips & Stipend Letters',
    'other': 'Other Personal Documents'
  };

  function getCompResUserRole() {
    if (state && state.profile && state.profile.role) {
      return state.profile.role;
    }
    return 'intern';
  }

  function isCompResAdmin() {
    return getCompResUserRole() === 'admin';
  }

  function isCompResAdminOrInstructor() {
    const role = getCompResUserRole();
    return role === 'admin' || role === 'instructor';
  }

  function formatCompResFileSize(bytes) {
    if (!bytes || isNaN(bytes)) return 'Unknown size';
    const num = Number(bytes);
    if (num < 1024) return num + ' B';
    if (num < 1024 * 1024) return (num / 1024).toFixed(1) + ' KB';
    return (num / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function formatCompResDate(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function getCompResFileTypeInfo(fileName, mimeType) {
    const name = (fileName || '').toLowerCase();
    const mime = (mimeType || '').toLowerCase();

    if (mime.includes('pdf') || name.endsWith('.pdf')) {
      return {
        type: 'PDF',
        class: 'comp-res-icon-pdf',
        canPreview: true,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>`
      };
    }
    if (mime.includes('word') || name.endsWith('.doc') || name.endsWith('.docx')) {
      return {
        type: 'Word',
        class: 'comp-res-icon-doc',
        canPreview: false,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2z"></path><line x1="14" y1="2" x2="14" y2="8"></line><line x1="14" y1="8" x2="20" y2="8"></line><path d="M8 13l2 5 2-5 2 5 2-5"></path></svg>`
      };
    }
    if (mime.includes('sheet') || mime.includes('excel') || mime.includes('csv') || name.endsWith('.xls') || name.endsWith('.xlsx') || name.endsWith('.csv')) {
      return {
        type: 'Excel',
        class: 'comp-res-icon-xls',
        canPreview: false,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`
      };
    }
    if (mime.includes('presentation') || mime.includes('powerpoint') || name.endsWith('.ppt') || name.endsWith('.pptx')) {
      return {
        type: 'PowerPoint',
        class: 'comp-res-icon-ppt',
        canPreview: false,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M8 21h8"></path><path d="M12 17v4"></path></svg>`
      };
    }
    if (mime.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)$/i.test(name)) {
      return {
        type: 'Image',
        class: 'comp-res-icon-img',
        canPreview: true,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
      };
    }
    return {
      type: 'File',
      class: 'comp-res-icon-other',
      canPreview: false,
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`
    };
  }

  async function updateSidebarCompanyResourcesBadge() {
    const badge = document.getElementById('sidebarCompanyResourcesCountBadge');
    if (!badge) return;
    try {
      if (window.DataLayer && typeof window.DataLayer.getUnopenedDocumentCount === 'function') {
        const count = await window.DataLayer.getUnopenedDocumentCount();
        badge.textContent = count;
      }
    } catch (e) {
      console.warn('[CompanyResources] updateSidebarCount error:', e);
    }
  }

  function initCompanyResourcesEvents() {
    if (compResState.initialized) return;
    compResState.initialized = true;

    // 1. Top-Level Main Tabs: Programme, My Documents, Manage
    const tabProg = document.getElementById('compResNavTabProgramme');
    const tabPersonal = document.getElementById('compResNavTabPersonal');
    const tabManage = document.getElementById('compResNavTabManage');

    if (tabProg) tabProg.addEventListener('click', () => switchCompResMainTab('programme'));
    if (tabPersonal) tabPersonal.addEventListener('click', () => switchCompResMainTab('personal'));
    if (tabManage) tabManage.addEventListener('click', () => switchCompResMainTab('manage'));

    // 2. Programme Search input
    if (el.compResSearchInput) {
      let searchTimeout = null;
      el.compResSearchInput.addEventListener('input', (e) => {
        compResState.searchQuery = e.target.value;
        if (el.compResSearchClear) {
          el.compResSearchClear.style.display = compResState.searchQuery ? 'block' : 'none';
        }
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => renderCompanyResourcesList(), 200);
      });
    }

    if (el.compResSearchClear) {
      el.compResSearchClear.addEventListener('click', () => {
        if (el.compResSearchInput) el.compResSearchInput.value = '';
        compResState.searchQuery = '';
        el.compResSearchClear.style.display = 'none';
        renderCompanyResourcesList();
      });
    }

    // 3. Programme View mode toggle
    if (el.compResViewGridBtn && el.compResViewListBtn) {
      el.compResViewGridBtn.addEventListener('click', () => {
        compResState.viewMode = 'grid';
        el.compResViewGridBtn.classList.add('active');
        el.compResViewListBtn.classList.remove('active');
        renderCompanyResourcesList();
      });
      el.compResViewListBtn.addEventListener('click', () => {
        compResState.viewMode = 'list';
        el.compResViewListBtn.classList.add('active');
        el.compResViewGridBtn.classList.remove('active');
        renderCompanyResourcesList();
      });
    }

    // 4. Programme Document type chips
    if (el.compResTypeChipsBar) {
      const chips = el.compResTypeChipsBar.querySelectorAll('.comp-res-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          compResState.selectedType = chip.getAttribute('data-type') || 'all';
          renderCompanyResourcesList();
        });
      });
    }

    // 5. Programme Sub-tabs: Published vs Drafts
    if (el.compResTabPublished && el.compResTabDrafts) {
      el.compResTabPublished.addEventListener('click', () => {
        compResState.activeTab = 'published';
        el.compResTabPublished.classList.add('active');
        el.compResTabDrafts.classList.remove('active');
        loadCompanyResourcesDocuments();
      });
      el.compResTabDrafts.addEventListener('click', () => {
        compResState.activeTab = 'drafts';
        el.compResTabDrafts.classList.add('active');
        el.compResTabPublished.classList.remove('active');
        loadCompanyResourcesDocuments();
      });
    }

    // 6. Admin programme dropdown
    if (el.compResProgSelect) {
      el.compResProgSelect.addEventListener('change', (e) => {
        compResState.selectedProgramme = e.target.value;
        loadCompanyResourcesDocuments();
      });
    }

    // 7. Open Issue Programme Document modal
    if (el.openIssueDocBtn) {
      el.openIssueDocBtn.addEventListener('click', openIssueDocModal);
    }

    // 8. Personal Search & Filters
    const personalSearch = document.getElementById('compResPersonalSearchInput');
    const personalClear = document.getElementById('compResPersonalSearchClear');
    if (personalSearch) {
      let pSearchTimeout = null;
      personalSearch.addEventListener('input', (e) => {
        compResState.personalSearch = e.target.value;
        if (personalClear) personalClear.style.display = compResState.personalSearch ? 'block' : 'none';
        clearTimeout(pSearchTimeout);
        pSearchTimeout = setTimeout(() => renderPersonalDocumentsList(), 200);
      });
    }
    if (personalClear) {
      personalClear.addEventListener('click', () => {
        if (personalSearch) personalSearch.value = '';
        compResState.personalSearch = '';
        personalClear.style.display = 'none';
        renderPersonalDocumentsList();
      });
    }

    // Personal view mode toggle
    const pGridBtn = document.getElementById('compResPersonalViewGridBtn');
    const pListBtn = document.getElementById('compResPersonalViewListBtn');
    if (pGridBtn && pListBtn) {
      pGridBtn.addEventListener('click', () => {
        compResState.personalViewMode = 'grid';
        pGridBtn.classList.add('active');
        pListBtn.classList.remove('active');
        renderPersonalDocumentsList();
      });
      pListBtn.addEventListener('click', () => {
        compResState.personalViewMode = 'list';
        pListBtn.classList.add('active');
        pGridBtn.classList.remove('active');
        renderPersonalDocumentsList();
      });
    }

    // Personal Category chips
    const personalChipsBar = document.getElementById('compResPersonalCategoryChips');
    if (personalChipsBar) {
      const chips = personalChipsBar.querySelectorAll('.comp-res-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          compResState.personalCategory = chip.getAttribute('data-category') || 'all';
          renderPersonalDocumentsList();
        });
      });
    }

    // 9. Admin Manage Sub-tabs
    const mDocsBtn = document.getElementById('compResManageTabDocs');
    const mUsersBtn = document.getElementById('compResManageTabUsers');
    const mLogsBtn = document.getElementById('compResManageTabLogs');

    if (mDocsBtn) mDocsBtn.addEventListener('click', () => switchManageView('docs'));
    if (mUsersBtn) mUsersBtn.addEventListener('click', () => switchManageView('users'));
    if (mLogsBtn) mLogsBtn.addEventListener('click', () => switchManageView('logs'));

    // Admin Manage Filters
    const mRecip = document.getElementById('compResManageRecipientFilter');
    const mCat = document.getElementById('compResManageCategoryFilter');
    const mAck = document.getElementById('compResManageAckFilter');
    const mRev = document.getElementById('compResManageRevokedFilter');
    const mSearch = document.getElementById('compResManageSearchInput');

    if (mRecip) mRecip.addEventListener('change', (e) => { compResState.manageRecipient = e.target.value; loadAndRenderManageDocs(); });
    if (mCat) mCat.addEventListener('change', (e) => { compResState.manageCategory = e.target.value; loadAndRenderManageDocs(); });
    if (mAck) mAck.addEventListener('change', (e) => { compResState.manageAck = e.target.value; loadAndRenderManageDocs(); });
    if (mRev) mRev.addEventListener('change', (e) => { compResState.manageRevoked = e.target.value; loadAndRenderManageDocs(); });
    if (mSearch) {
      let mTimeout = null;
      mSearch.addEventListener('input', (e) => {
        compResState.manageSearch = e.target.value;
        clearTimeout(mTimeout);
        mTimeout = setTimeout(() => loadAndRenderManageDocs(), 250);
      });
    }

    // Admin Manage Action Buttons
    const openIssuePersonalBtn = document.getElementById('openIssuePersonalDocBtn');
    if (openIssuePersonalBtn) openIssuePersonalBtn.addEventListener('click', openIssuePersonalDocModal);

    const openBulkBtn = document.getElementById('openBulkIssueModalBtn');
    if (openBulkBtn) openBulkBtn.addEventListener('click', openBulkIssueModal);

    // Modal dismissals
    setupCompResModalDismiss('issueDocModal', 'closeIssueDocModalBtn', 'cancelIssueDocBtn');
    setupCompResModalDismiss('editDocModal', 'closeEditDocModalBtn', 'cancelEditDocBtn');
    setupCompResModalDismiss('newVersionModal', 'closeNewVersionModalBtn', 'cancelNewVersionBtn');
    setupCompResModalDismiss('deleteDocConfirmModal', 'closeDeleteDocModalBtn', 'cancelDeleteDocBtn');
    setupCompResModalDismiss('issuePersonalDocModal', 'closeIssuePersonalModalBtn', 'cancelIssuePersonalBtn');
    setupCompResModalDismiss('bulkIssueModal', 'closeBulkIssueModalBtn', 'cancelBulkIssueBtn');
    setupCompResModalDismiss('replacePersonalFileModal', 'closeReplaceFileModalBtn', 'cancelReplaceFileBtn');
    setupCompResModalDismiss('confirmAcknowledgeModal', 'closeAckModalBtn', 'cancelAckModalBtn');

    // Close preview modal
    const closePreviewBtn = document.getElementById('closeCompDocPreviewBtn');
    const previewModal = document.getElementById('compDocPreviewModal');
    if (closePreviewBtn && previewModal) {
      closePreviewBtn.addEventListener('click', () => {
        previewModal.style.display = 'none';
        const body = document.getElementById('compDocPreviewBody');
        if (body) body.innerHTML = '';
      });
      previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
          previewModal.style.display = 'none';
          const body = document.getElementById('compDocPreviewBody');
          if (body) body.innerHTML = '';
        }
      });
    }

    // Forms setup
    setupIssueDocForm();
    setupEditDocForm();
    setupNewVersionForm();
    setupIssuePersonalDocForm();
    setupBulkIssueForm();
    setupReplacePersonalFileForm();

    // Close open menus on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.comp-res-admin-actions')) {
        document.querySelectorAll('.comp-res-dropdown-menu.active').forEach(m => m.classList.remove('active'));
        compResState.activeMenuDocId = null;
      }
    });
  }

  

  function switchCompResMainTab(tabKey) {
    const isAdmin = isCompResAdmin();
    if (tabKey === 'manage' && !isAdmin) tabKey = 'programme';

    compResState.mainTab = tabKey;
    localStorage.setItem('comp_res_active_tab', tabKey);

    const tabProg = document.getElementById('compResNavTabProgramme');
    const tabPersonal = document.getElementById('compResNavTabPersonal');
    const tabManage = document.getElementById('compResNavTabManage');

    if (tabProg) tabProg.classList.toggle('active', tabKey === 'programme');
    if (tabPersonal) tabPersonal.classList.toggle('active', tabKey === 'personal');
    if (tabManage) tabManage.classList.toggle('active', tabKey === 'manage');

    const paneProg = document.getElementById('compResPaneProgramme');
    const panePersonal = document.getElementById('compResPanePersonal');
    const paneManage = document.getElementById('compResPaneManage');

    if (paneProg) paneProg.style.display = tabKey === 'programme' ? 'block' : 'none';
    if (panePersonal) panePersonal.style.display = tabKey === 'personal' ? 'block' : 'none';
    if (paneManage) paneManage.style.display = tabKey === 'manage' ? 'block' : 'none';

    if (tabKey === 'programme') {
      loadCompanyResourcesDocuments();
    } else if (tabKey === 'personal') {
      loadPersonalDocuments();
    } else if (tabKey === 'manage') {
      loadAndRenderManageDocs();
    }
  }

  function setupCompResModalDismiss(modalId, closeBtnId, cancelBtnId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const closeBtn = document.getElementById(closeBtnId);
    const cancelBtn = document.getElementById(cancelBtnId);

    const closeModal = () => { modal.style.display = 'none'; };
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  

  async function renderCompanyResourcesScreen() {
    initCompanyResourcesEvents();

    const role = getCompResUserRole();
    const isAdmin = role === 'admin';
    const isInstructor = role === 'instructor';
    const isStaff = isAdmin || isInstructor;

    // Show or hide Manage tab (Admin only)
    const tabManage = document.getElementById('compResNavTabManage');
    if (tabManage) {
      tabManage.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    // Programme selector area
    if (isAdmin) {
      if (el.compResProgChip) el.compResProgChip.style.display = 'none';
      if (el.compResProgSelectWrapper) {
        el.compResProgSelectWrapper.style.display = 'inline-flex';
        if (el.compResProgSelect) el.compResProgSelect.value = compResState.selectedProgramme;
      }
    } else {
      if (el.compResProgSelectWrapper) el.compResProgSelectWrapper.style.display = 'none';
      if (el.compResProgChip) {
        el.compResProgChip.style.display = 'inline-flex';
        const progName = COMP_RES_PROGRAMMES[currentProgrammeId] || (state && state.programmes && state.programmes[currentProgrammeId] ? state.programmes[currentProgrammeId].name : 'Your Programme');
        if (el.compResProgChipText) el.compResProgChipText.textContent = progName;
      }
    }

    // Staff actions: Issue button & Drafts tab
    if (el.openIssueDocBtn) {
      el.openIssueDocBtn.style.display = isStaff ? 'inline-flex' : 'none';
    }
    if (el.compResTabDrafts) {
      el.compResTabDrafts.style.display = isStaff ? 'inline-flex' : 'none';
      if (!isStaff && compResState.activeTab === 'drafts') {
        compResState.activeTab = 'published';
        if (el.compResTabPublished) el.compResTabPublished.classList.add('active');
        el.compResTabDrafts.classList.remove('active');
      }
    }

    // Update counts & restore last active tab
    await updateSidebarCompanyResourcesBadge();
    const savedTab = localStorage.getItem('comp_res_active_tab') || 'programme';
    switchCompResMainTab(savedTab);
  }

  // ==========================================
  // TAB 1: PROGRAMME DOCUMENTS LOGIC
  // ==========================================
  async function loadCompanyResourcesDocuments() {
    if (!window.DataLayer || typeof window.DataLayer.getCompanyDocuments !== 'function') return;

    if (el.compResSkeleton) el.compResSkeleton.style.display = 'block';
    if (el.compResContent) el.compResContent.style.display = 'none';
    if (el.compResEmptyState) el.compResEmptyState.style.display = 'none';

    try {
      const role = getCompResUserRole();
      const isAdmin = role === 'admin';
      const progId = isAdmin ? (compResState.selectedProgramme === 'all' ? undefined : compResState.selectedProgramme) : currentProgrammeId;

      // 1. Fetch published documents count & documents
      const publishedDocs = await window.DataLayer.getCompanyDocuments({
        programmeId: progId,
        isPublished: true,
        isArchived: false
      });

      const progCount = Array.isArray(publishedDocs) ? publishedDocs.length : 0;
      if (el.compResPublishedCount) el.compResPublishedCount.textContent = progCount;
      const navProgCount = document.getElementById('compResNavProgrammeCount');
      if (navProgCount) navProgCount.textContent = progCount;

      // 2. If staff, fetch drafts count
      if (isCompResAdminOrInstructor()) {
        const draftDocs = await window.DataLayer.getCompanyDocuments({
          programmeId: progId,
          isPublished: false,
          isArchived: false
        });
        const archivedDocs = await window.DataLayer.getCompanyDocuments({
          programmeId: progId,
          isArchived: true
        });
        const totalDrafts = (Array.isArray(draftDocs) ? draftDocs.length : 0) + (Array.isArray(archivedDocs) ? archivedDocs.length : 0);
        if (el.compResDraftsCount) {
          el.compResDraftsCount.textContent = totalDrafts;
        }

        if (compResState.activeTab === 'drafts') {
          compResState.documents = [...(draftDocs || []), ...(archivedDocs || [])];
        } else {
          compResState.documents = publishedDocs || [];
        }
      } else {
        compResState.documents = publishedDocs || [];
      }
    } catch (e) {
      console.warn('[CompanyResources] load error:', e);
      compResState.documents = [];
    } finally {
      if (el.compResSkeleton) el.compResSkeleton.style.display = 'none';
      if (el.compResContent) el.compResContent.style.display = 'block';
      renderCompanyResourcesList();
    }
  }

  function renderCompanyResourcesList() {
    if (!el.compResContent) return;

    let docs = compResState.documents || [];

    // Filter by document_type
    if (compResState.selectedType && compResState.selectedType !== 'all') {
      docs = docs.filter(d => (d.document_type || 'other').toLowerCase() === compResState.selectedType.toLowerCase());
    }

    // Filter by search query
    if (compResState.searchQuery && compResState.searchQuery.trim()) {
      const q = compResState.searchQuery.trim().toLowerCase();
      docs = docs.filter(d => {
        const title = (d.title || '').toLowerCase();
        const desc = (d.description || '').toLowerCase();
        const type = (d.document_type || '').toLowerCase();
        const fileName = (d.file_name || '').toLowerCase();
        return title.includes(q) || desc.includes(q) || type.includes(q) || fileName.includes(q);
      });
    }

    if (docs.length === 0) {
      el.compResContent.innerHTML = '';
      if (el.compResEmptyState) {
        el.compResEmptyState.style.display = 'block';
        if (compResState.searchQuery || compResState.selectedType !== 'all') {
          if (el.compResEmptyTitle) el.compResEmptyTitle.textContent = 'No matching documents found';
          if (el.compResEmptyDesc) el.compResEmptyDesc.textContent = 'Try adjusting your search terms or clearing your filter chips.';
        } else if (compResState.activeTab === 'drafts') {
          if (el.compResEmptyTitle) el.compResEmptyTitle.textContent = 'No drafts or archived documents';
          if (el.compResEmptyDesc) el.compResEmptyDesc.textContent = 'Documents saved as drafts or archived will appear here.';
        } else {
          if (el.compResEmptyTitle) el.compResEmptyTitle.textContent = 'No documents have been issued for your programme yet.';
          if (el.compResEmptyDesc) el.compResEmptyDesc.textContent = 'Check back later or contact your instructor if you need official documents.';
        }
      }
      return;
    }

    if (el.compResEmptyState) el.compResEmptyState.style.display = 'none';

    // Group documents into sections by document_type
    const typeOrder = ['policy', 'guideline', 'template', 'form', 'letter', 'report', 'other'];
    const groups = {};
    docs.forEach(d => {
      const t = (d.document_type || 'other').toLowerCase();
      if (!groups[t]) groups[t] = [];
      groups[t].push(d);
    });

    let html = '';

    typeOrder.forEach(typeKey => {
      const typeDocs = groups[typeKey];
      if (!typeDocs || typeDocs.length === 0) return;

      const groupTitle = COMP_RES_TYPE_LABELS[typeKey] || (typeKey.charAt(0).toUpperCase() + typeKey.slice(1));
      html += `
        <section class="comp-res-section" data-group="${typeKey}">
          <div class="comp-res-section-header">
            <h2 class="comp-res-section-title">${escapeHtml(groupTitle)}</h2>
            <span class="comp-res-section-count">${typeDocs.length}</span>
          </div>
      `;

      if (compResState.viewMode === 'grid') {
        html += `<div class="comp-res-grid">`;
        typeDocs.forEach(doc => {
          html += renderCompResCardHtml(doc);
        });
        html += `</div>`;
      } else {
        html += renderCompResTableHtml(typeDocs);
      }

      html += `</section>`;
    });

    el.compResContent.innerHTML = html;
    attachCompResDocumentActions();
  }

  function renderCompResCardHtml(doc) {
    const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
    const isNew = doc.issued_at && (Date.now() - new Date(doc.issued_at).getTime() <= 14 * 24 * 60 * 60 * 1000);
    const isUpdated = doc.is_updated || (doc.version && doc.version !== '1.0' && doc.version !== '1.0.0' && doc.version !== 'v1.0');
    const isDraft = !doc.is_published;
    const isArchived = doc.is_archived;
    const isStaff = isCompResAdminOrInstructor();

    let progBadgeHtml = '';
    if (!doc.programme_id) {
      progBadgeHtml = `<span class="badge-all-prog">All programmes</span>`;
    } else {
      const progName = COMP_RES_PROGRAMMES[doc.programme_id] || (doc.programmes && doc.programmes.name ? doc.programmes.name : 'Programme');
      progBadgeHtml = `<span class="badge-prog">${escapeHtml(progName)}</span>`;
    }

    const versionStr = doc.version ? `v${doc.version.replace(/^v/i, '')}` : 'v1.0';
    const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India Foundation';

    return `
      <article class="comp-res-card" data-doc-id="${doc.id}">
        <div class="comp-res-card-top">
          <div class="comp-res-file-icon-wrap ${fileInfo.class}" title="${fileInfo.type}">
            ${fileInfo.svg}
          </div>
          <div class="comp-res-card-badges">
            ${isNew ? '<span class="badge-new">NEW</span>' : ''}
            ${isUpdated ? '<span class="badge-updated">UPDATED</span>' : ''}
            ${isDraft ? '<span class="badge-draft">DRAFT</span>' : ''}
            ${isArchived ? '<span class="badge-archived">ARCHIVED</span>' : ''}
            ${progBadgeHtml}
            <span class="badge-doc-type">${escapeHtml(doc.document_type || 'Document')}</span>
            <span class="badge-version">${escapeHtml(versionStr)}</span>
          </div>
        </div>

        <div class="comp-res-card-info">
          <h3 class="comp-res-card-title">${escapeHtml(doc.title || 'Untitled Document')}</h3>
          <p class="comp-res-card-desc">${escapeHtml(doc.description || 'No summary description provided for this document.')}</p>
          <div class="comp-res-card-meta">
            <span>Issued ${formatCompResDate(doc.issued_at)}</span>
            <span class="comp-res-card-meta-dot"></span>
            <span>By ${escapeHtml(issuerName)}</span>
            <span class="comp-res-card-meta-dot"></span>
            <span>${formatCompResFileSize(doc.file_size)}</span>
          </div>
        </div>

        <div class="comp-res-card-actions">
          <div class="comp-res-card-btns">
            <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-doc-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>Preview</span>
            </button>
            <button type="button" class="comp-res-action-btn comp-res-btn-download" data-doc-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download</span>
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            ${isStaff ? `
              <span class="comp-res-download-stat" title="Total downloads">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>${doc.download_count || 0}</span>
              </span>
              <div class="comp-res-admin-actions">
                <button type="button" class="comp-res-menu-btn" data-menu-id="${doc.id}" aria-label="Document options">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </button>
                <div class="comp-res-dropdown-menu" id="compResMenu_${doc.id}">
                  <button type="button" class="comp-res-menu-item" data-action="edit" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    <span>Edit Details</span>
                  </button>
                  <button type="button" class="comp-res-menu-item" data-action="new-version" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path></svg>
                    <span>Upload New Version</span>
                  </button>
                  <button type="button" class="comp-res-menu-item" data-action="toggle-publish" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                    <span>${doc.is_published ? 'Unpublish (Draft)' : 'Publish Document'}</span>
                  </button>
                  <button type="button" class="comp-res-menu-item" data-action="toggle-archive" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                    <span>${doc.is_archived ? 'Unarchive' : 'Archive'}</span>
                  </button>
                  <button type="button" class="comp-res-menu-item danger" data-action="delete" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <span>Delete Document</span>
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  function renderCompResTableHtml(docs) {
    const isStaff = isCompResAdminOrInstructor();

    let rowsHtml = '';
    docs.forEach(doc => {
      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
      const isNew = doc.issued_at && (Date.now() - new Date(doc.issued_at).getTime() <= 14 * 24 * 60 * 60 * 1000);
      const isUpdated = doc.is_updated || (doc.version && doc.version !== '1.0' && doc.version !== '1.0.0' && doc.version !== 'v1.0');
      const progName = !doc.programme_id ? 'All programmes' : (COMP_RES_PROGRAMMES[doc.programme_id] || 'Programme');
      const versionStr = doc.version ? `v${doc.version.replace(/^v/i, '')}` : 'v1.0';
      const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India';

      rowsHtml += `
        <tr data-doc-id="${doc.id}">
          <td style="min-width: 240px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="comp-res-file-icon-wrap ${fileInfo.class}" style="width: 32px; height: 32px;" title="${fileInfo.type}">
                ${fileInfo.svg}
              </div>
              <div>
                <strong style="display: block; font-size: 13.5px; color: var(--text-primary);">${escapeHtml(doc.title)}</strong>
                <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(doc.file_name || 'Document')}</span>
                ${isNew ? '<span class="badge-new" style="margin-left: 6px;">NEW</span>' : ''}
                ${isUpdated ? '<span class="badge-updated" style="margin-left: 6px;">UPDATED</span>' : ''}
              </div>
            </div>
          </td>
          <td><span class="badge-doc-type">${escapeHtml(doc.document_type || 'other')}</span></td>
          <td><span class="${!doc.programme_id ? 'badge-all-prog' : 'badge-prog'}">${escapeHtml(progName)}</span></td>
          <td><span class="badge-version">${escapeHtml(versionStr)}</span></td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${formatCompResDate(doc.issued_at)}</td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${escapeHtml(issuerName)}</td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-muted);">${formatCompResFileSize(doc.file_size)}</td>
          ${isStaff ? `<td style="font-size: 12px; color: var(--text-muted);">${doc.download_count || 0}</td>` : ''}
          <td style="white-space: nowrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-doc-id="${doc.id}" style="padding: 4px 8px;" title="Preview">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <button type="button" class="comp-res-action-btn comp-res-btn-download" data-doc-id="${doc.id}" style="padding: 4px 8px;" title="Download">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
              ${isStaff ? `
                <div class="comp-res-admin-actions">
                  <button type="button" class="comp-res-menu-btn" data-menu-id="${doc.id}" style="padding: 4px;" aria-label="Actions">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <div class="comp-res-dropdown-menu" id="compResMenu_${doc.id}">
                    <button type="button" class="comp-res-menu-item" data-action="edit" data-doc-id="${doc.id}">Edit Details</button>
                    <button type="button" class="comp-res-menu-item" data-action="new-version" data-doc-id="${doc.id}">Upload New Version</button>
                    <button type="button" class="comp-res-menu-item" data-action="toggle-publish" data-doc-id="${doc.id}">${doc.is_published ? 'Unpublish' : 'Publish'}</button>
                    <button type="button" class="comp-res-menu-item" data-action="toggle-archive" data-doc-id="${doc.id}">${doc.is_archived ? 'Unarchive' : 'Archive'}</button>
                    <button type="button" class="comp-res-menu-item danger" data-action="delete" data-doc-id="${doc.id}">Delete</button>
                  </div>
                </div>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    });

    return `
      <div class="comp-res-table-wrap">
        <table class="comp-res-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Type</th>
              <th>Programme</th>
              <th>Version</th>
              <th>Issue Date</th>
              <th>Issued By</th>
              <th>Size</th>
              ${isStaff ? '<th>Downloads</th>' : ''}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  function attachCompResDocumentActions() {
    document.querySelectorAll('.comp-res-btn-preview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        if (doc) handlePreviewCompanyDoc(doc);
      });
    });

    document.querySelectorAll('.comp-res-btn-download').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        if (doc) handleDownloadCompanyDoc(doc);
      });
    });

    document.querySelectorAll('.comp-res-menu-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const menuId = btn.getAttribute('data-menu-id');
        const menu = document.getElementById(`compResMenu_${menuId}`);
        const isCurrentActive = menu && menu.classList.contains('active');
        document.querySelectorAll('.comp-res-dropdown-menu.active').forEach(m => m.classList.remove('active'));
        if (menu && !isCurrentActive) {
          menu.classList.add('active');
          compResState.activeMenuDocId = menuId;
        } else {
          compResState.activeMenuDocId = null;
        }
      });
    });

    document.querySelectorAll('.comp-res-menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = item.getAttribute('data-action');
        const docId = item.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        document.querySelectorAll('.comp-res-dropdown-menu.active').forEach(m => m.classList.remove('active'));

        if (!doc) return;

        if (action === 'edit') {
          openEditDocModal(doc);
        } else if (action === 'new-version') {
          openNewVersionModal(doc);
        } else if (action === 'toggle-publish') {
          togglePublishCompanyDoc(doc);
        } else if (action === 'toggle-archive') {
          toggleArchiveCompanyDoc(doc);
        } else if (action === 'delete') {
          openDeleteDocModal(doc);
        }
      });
    });
  }

  

  async function handlePreviewCompanyDoc(doc) {
    const modal = document.getElementById('compDocPreviewModal');
    const titleElem = document.getElementById('compDocPreviewTitle');
    const badgeElem = document.getElementById('compDocPreviewTypeBadge');
    const verElem = document.getElementById('compDocPreviewVer');
    const bodyElem = document.getElementById('compDocPreviewBody');
    const downloadBtn = document.getElementById('compDocPreviewDownloadBtn');

    if (!modal || !bodyElem) return;

    if (titleElem) titleElem.textContent = doc.title || 'Document Preview';
    if (badgeElem) badgeElem.textContent = (doc.document_type || 'Doc').toUpperCase();
    if (verElem) verElem.textContent = doc.version ? `v${doc.version.replace(/^v/i, '')}` : 'v1.0';

    if (downloadBtn) {
      downloadBtn.onclick = () => handleDownloadCompanyDoc(doc);
    }

    bodyElem.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
        <div class="skeleton-shimmer" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px;"></div>
        <p style="font-size: 14px;">Generating secure preview...</p>
      </div>
    `;

    modal.style.display = 'flex';

    if (!doc.storage_path) {
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">
            This document specification has been registered in the system, but the file has not been uploaded to the secure storage repository yet.
          </p>
        </div>
      `;
      return;
    }

    try {
      const signedUrl = await window.DataLayer.getCompanyDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Unable to generate signed URL');

      let fileExists = true;
      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) fileExists = false;
      } catch (errHead) { }

      if (!fileExists) {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div class="comp-res-missing-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h4 class="comp-res-missing-title">File not uploaded yet</h4>
            <p class="comp-res-missing-desc">The file path is assigned but no physical file exists in the storage bucket.</p>
          </div>
        `;
        return;
      }

      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);

      if (fileInfo.type === 'PDF') {
        bodyElem.innerHTML = `<iframe class="comp-res-preview-iframe" src="${signedUrl}#toolbar=0" title="${escapeHtml(doc.title)}"></iframe>`;
      } else if (fileInfo.type === 'Image') {
        bodyElem.innerHTML = `<img class="comp-res-preview-img" src="${signedUrl}" alt="${escapeHtml(doc.title)}" />`;
      } else {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div style="width: 56px; height: 56px; border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;" class="${fileInfo.class}">
              ${fileInfo.svg}
            </div>
            <h4 class="comp-res-missing-title">In-Browser Preview Not Supported</h4>
            <p class="comp-res-missing-desc">
              ${escapeHtml(fileInfo.type)} documents cannot be previewed directly inside the web browser. Please download the file to view it on your device.
            </p>
            <button type="button" class="primary-btn" id="modalPromptDownloadBtn" style="display: inline-flex; align-items: center; gap: 8px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download File (${formatCompResFileSize(doc.file_size)})</span>
            </button>
          </div>
        `;
        const promptBtn = document.getElementById('modalPromptDownloadBtn');
        if (promptBtn) promptBtn.onclick = () => handleDownloadCompanyDoc(doc);
      }
    } catch (e) {
      console.warn('[CompanyResources] preview error:', e);
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">Unable to fetch document from storage repository.</p>
        </div>
      `;
    }
  }

  async function handleDownloadCompanyDoc(doc) {
    if (!doc.storage_path) {
      showToast('File not uploaded yet for this document.');
      handlePreviewCompanyDoc(doc);
      return;
    }

    try {
      showToast(`Preparing download for ${doc.title}...`);
      const signedUrl = await window.DataLayer.getCompanyDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Signed URL creation failed.');

      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) {
          showToast('File not uploaded yet.');
          handlePreviewCompanyDoc(doc);
          return;
        }
      } catch (errHead) { }

      const fileName = doc.file_name || doc.storage_path.split('/').pop() || `${doc.title}.pdf`;
      const a = document.createElement('a');
      a.href = signedUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 500);

      await window.DataLayer.logCompanyDocumentDownload(doc.id);
      doc.download_count = (doc.download_count || 0) + 1;
      showToast(`Download started: ${fileName}`);
    } catch (e) {
      console.warn('[CompanyResources] download error:', e);
      showToast('Download error: File not uploaded yet.');
    }
  }

  // --- Modals for Programme Documents ---
  function openIssueDocModal() {
    const modal = document.getElementById('issueDocModal');
    const form = document.getElementById('issueDocForm');
    const progSelect = document.getElementById('issueDocProgramme');
    const errAlert = document.getElementById('issueDocErrorAlert');
    const progressWrap = document.getElementById('issueDocProgressWrap');
    const dateInput = document.getElementById('issueDocDate');
    const label = document.getElementById('issueDocFileLabel');

    if (!modal || !form) return;
    form.reset();
    if (errAlert) errAlert.style.display = 'none';
    if (progressWrap) progressWrap.style.display = 'none';
    if (label) label.textContent = 'Choose file or drag & drop here';
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    if (progSelect) {
      const role = getCompResUserRole();
      if (role === 'instructor') {
        progSelect.value = currentProgrammeId;
        Array.from(progSelect.options).forEach(opt => opt.disabled = (opt.value !== currentProgrammeId));
      } else {
        Array.from(progSelect.options).forEach(opt => opt.disabled = false);
        progSelect.value = compResState.selectedProgramme === 'all' ? '' : compResState.selectedProgramme;
      }
    }

    modal.style.display = 'flex';
  }

  function setupIssueDocForm() {
    const form = document.getElementById('issueDocForm');
    const fileInput = document.getElementById('issueDocFile');
    const label = document.getElementById('issueDocFileLabel');
    const errAlert = document.getElementById('issueDocErrorAlert');
    const progressWrap = document.getElementById('issueDocProgressWrap');
    const progressFill = document.getElementById('issueDocProgressFill');
    const submitBtn = document.getElementById('submitIssueDocBtn');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          label.textContent = fileInput.files[0].name + ` (${formatCompResFileSize(fileInput.files[0].size)})`;
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (errAlert) errAlert.style.display = 'none';

        const title = document.getElementById('issueDocTitle')?.value.trim();
        const desc = document.getElementById('issueDocDesc')?.value.trim();
        const type = document.getElementById('issueDocType')?.value;
        const prog = document.getElementById('issueDocProgramme')?.value || null;
        const ver = document.getElementById('issueDocVersion')?.value.trim() || '1.0';
        const date = document.getElementById('issueDocDate')?.value || new Date().toISOString().split('T')[0];
        const isPub = document.getElementById('issueDocIsPublished')?.checked ?? true;
        const file = fileInput?.files?.[0];

        if (!title) { showModalError(errAlert, 'Document title is required.'); return; }
        if (file && file.size > 20 * 1024 * 1024) { showModalError(errAlert, 'File size exceeds maximum limit of 20 MB.'); return; }

        try {
          if (submitBtn) submitBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '60%';

          await window.DataLayer.createCompanyDocument({
            title, description: desc, document_type: type, programme_id: prog,
            version: ver, issued_at: date, is_published: isPub
          }, file);

          if (progressFill) progressFill.style.width = '100%';
          showToast('Programme document issued successfully!');
          const modal = document.getElementById('issueDocModal');
          if (modal) modal.style.display = 'none';

          await loadCompanyResourcesDocuments();
          await updateSidebarCompanyResourcesBadge();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to issue document.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function openEditDocModal(doc) {
    const modal = document.getElementById('editDocModal');
    const idInput = document.getElementById('editDocId');
    const titleInput = document.getElementById('editDocTitle');
    const descInput = document.getElementById('editDocDesc');
    const typeSelect = document.getElementById('editDocType');
    const progSelect = document.getElementById('editDocProgramme');
    const verInput = document.getElementById('editDocVersion');
    const dateInput = document.getElementById('editDocDate');
    const pubCheck = document.getElementById('editDocIsPublished');
    const archCheck = document.getElementById('editDocIsArchived');
    const errAlert = document.getElementById('editDocErrorAlert');

    if (!modal) return;
    if (errAlert) errAlert.style.display = 'none';

    if (idInput) idInput.value = doc.id;
    if (titleInput) titleInput.value = doc.title || '';
    if (descInput) descInput.value = doc.description || '';
    if (typeSelect) typeSelect.value = doc.document_type || 'other';
    if (progSelect) {
      progSelect.value = doc.programme_id || '';
      const role = getCompResUserRole();
      if (role === 'instructor') {
        Array.from(progSelect.options).forEach(opt => opt.disabled = (opt.value !== currentProgrammeId));
      } else {
        Array.from(progSelect.options).forEach(opt => opt.disabled = false);
      }
    }
    if (verInput) verInput.value = doc.version || '1.0';
    if (dateInput) dateInput.value = doc.issued_at || '';
    if (pubCheck) pubCheck.checked = Boolean(doc.is_published);
    if (archCheck) archCheck.checked = Boolean(doc.is_archived);

    modal.style.display = 'flex';
  }

  function setupEditDocForm() {
    const form = document.getElementById('editDocForm');
    const errAlert = document.getElementById('editDocErrorAlert');
    const saveBtn = document.getElementById('saveEditDocBtn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('editDocId')?.value;
        const title = document.getElementById('editDocTitle')?.value.trim();
        const desc = document.getElementById('editDocDesc')?.value.trim();
        const type = document.getElementById('editDocType')?.value;
        const prog = document.getElementById('editDocProgramme')?.value || null;
        const ver = document.getElementById('editDocVersion')?.value.trim();
        const date = document.getElementById('editDocDate')?.value;
        const isPub = document.getElementById('editDocIsPublished')?.checked;
        const isArch = document.getElementById('editDocIsArchived')?.checked;

        if (!title) { showModalError(errAlert, 'Document title is required.'); return; }

        try {
          if (saveBtn) saveBtn.disabled = true;
          await window.DataLayer.updateCompanyDocument(docId, {
            title, description: desc, document_type: type, programme_id: prog,
            version: ver, issued_at: date, is_published: isPub, is_archived: isArch
          });
          showToast('Document details updated.');
          const modal = document.getElementById('editDocModal');
          if (modal) modal.style.display = 'none';

          await loadCompanyResourcesDocuments();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to update document.');
        } finally {
          if (saveBtn) saveBtn.disabled = false;
        }
      });
    }
  }

  async function openNewVersionModal(doc) {
    const modal = document.getElementById('newVersionModal');
    const form = document.getElementById('newVersionForm');
    const idInput = document.getElementById('newVersionDocId');
    const titleDisplay = document.getElementById('newVersionDocTitle');
    const verInput = document.getElementById('newVersionNumber');
    const label = document.getElementById('newVersionFileLabel');
    const historyBox = document.getElementById('newVersionHistoryBox');
    const historyList = document.getElementById('newVersionHistoryList');
    const errAlert = document.getElementById('newVersionErrorAlert');

    if (!modal) return;
    if (form) form.reset();
    if (errAlert) errAlert.style.display = 'none';
    if (label) label.textContent = 'Choose file or drag & drop';

    if (idInput) idInput.value = doc.id;
    if (titleDisplay) titleDisplay.textContent = `Document: ${doc.title} (Current: v${doc.version || '1.0'})`;

    const currentNum = parseFloat((doc.version || '1.0').replace(/[^\d.]/g, ''));
    verInput.value = !isNaN(currentNum) ? (currentNum + 0.1).toFixed(1) : '2.0';

    if (historyBox && historyList && window.DataLayer.getDocumentVersions) {
      try {
        const versions = await window.DataLayer.getDocumentVersions(doc.id);
        if (versions && versions.length > 0) {
          historyBox.style.display = 'block';
          historyList.innerHTML = versions.map(v => `
            <div class="comp-res-history-item">
              <div><strong>v${escapeHtml(v.version)}</strong> &bull; <span style="color: var(--text-muted);">${formatCompResDate(v.uploaded_at)}</span></div>
              <span style="color: var(--text-muted); font-size: 11.5px;">${escapeHtml(v.storage_path ? v.storage_path.split('/').pop() : '')}</span>
            </div>
          `).join('');
        } else {
          historyBox.style.display = 'none';
        }
      } catch (errVer) {
        historyBox.style.display = 'none';
      }
    }

    modal.style.display = 'flex';
  }

  function setupNewVersionForm() {
    const form = document.getElementById('newVersionForm');
    const fileInput = document.getElementById('newVersionFile');
    const label = document.getElementById('newVersionFileLabel');
    const errAlert = document.getElementById('newVersionErrorAlert');
    const submitBtn = document.getElementById('submitNewVersionBtn');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          label.textContent = fileInput.files[0].name + ` (${formatCompResFileSize(fileInput.files[0].size)})`;
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('newVersionDocId')?.value;
        const ver = document.getElementById('newVersionNumber')?.value.trim();
        const changelog = document.getElementById('newVersionChangelog')?.value.trim();
        const file = fileInput?.files?.[0];

        if (!ver) { showModalError(errAlert, 'Version number is required.'); return; }
        if (!file) { showModalError(errAlert, 'Please attach the new version file.'); return; }

        try {
          if (submitBtn) submitBtn.disabled = true;
          await window.DataLayer.uploadDocumentNewVersion(docId, { version: ver, changelog, file });
          showToast(`Version ${ver} uploaded successfully!`);
          const modal = document.getElementById('newVersionModal');
          if (modal) modal.style.display = 'none';
          await loadCompanyResourcesDocuments();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to upload version.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function openDeleteDocModal(doc) {
    const modal = document.getElementById('deleteDocConfirmModal');
    const nameDisplay = document.getElementById('deleteDocName');
    const confirmBtn = document.getElementById('confirmDeleteDocBtn');

    if (!modal) return;
    if (nameDisplay) nameDisplay.textContent = doc.title;

    if (confirmBtn) {
      confirmBtn.onclick = async () => {
        try {
          confirmBtn.disabled = true;
          await window.DataLayer.deleteCompanyDocument(doc.id);
          showToast(`Document "${doc.title}" deleted.`);
          modal.style.display = 'none';
          await loadCompanyResourcesDocuments();
        } catch (err) {
          showToast('Failed to delete document: ' + err.message);
        } finally {
          confirmBtn.disabled = false;
        }
      };
    }

    modal.style.display = 'flex';
  }

  async function togglePublishCompanyDoc(doc) {
    try {
      const nextPub = !doc.is_published;
      await window.DataLayer.updateCompanyDocument(doc.id, { is_published: nextPub });
      showToast(nextPub ? 'Document published to learners.' : 'Document moved to drafts.');
      await loadCompanyResourcesDocuments();
    } catch (err) {
      showToast('Error changing document status: ' + err.message);
    }
  }

  async function toggleArchiveCompanyDoc(doc) {
    try {
      const nextArch = !doc.is_archived;
      await window.DataLayer.updateCompanyDocument(doc.id, { is_archived: nextArch });
      showToast(nextArch ? 'Document archived.' : 'Document unarchived.');
      await loadCompanyResourcesDocuments();
    } catch (err) {
      showToast('Error changing archive status: ' + err.message);
    }
  }

  // ==========================================
  // TAB 2: MY DOCUMENTS (PERSONAL DOCUMENTS) LOGIC
  // ==========================================
  async function loadPersonalDocuments() {
    const container = document.getElementById('compResPersonalContent');
    const emptyState = document.getElementById('compResPersonalEmptyState');
    if (!container) return;

    container.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <div class="skeleton-shimmer" style="height: 24px; width: 200px; margin: 0 auto 16px; border-radius: 4px;"></div>
        <div class="comp-res-grid">
          <div class="skeleton-shimmer comp-res-skel-card"></div>
          <div class="skeleton-shimmer comp-res-skel-card"></div>
        </div>
      </div>
    `;
    if (emptyState) emptyState.style.display = 'none';

    try {
      const docs = await window.DataLayer.getPersonalDocuments();
      compResState.personalDocs = Array.isArray(docs) ? docs : [];

      const navPersonalCount = document.getElementById('compResNavPersonalCount');
      if (navPersonalCount) navPersonalCount.textContent = compResState.personalDocs.length;
    } catch (e) {
      console.warn('[PersonalDocs] load error:', e);
      compResState.personalDocs = [];
    } finally {
      renderPersonalDocumentsList();
    }
  }

  function renderPersonalDocumentsList() {
    const container = document.getElementById('compResPersonalContent');
    const emptyState = document.getElementById('compResPersonalEmptyState');
    if (!container) return;

    let docs = compResState.personalDocs || [];

    // Filter by category
    if (compResState.personalCategory && compResState.personalCategory !== 'all') {
      docs = docs.filter(d => (d.category || 'other').toLowerCase() === compResState.personalCategory.toLowerCase());
    }

    // Filter by search
    if (compResState.personalSearch && compResState.personalSearch.trim()) {
      const q = compResState.personalSearch.trim().toLowerCase();
      docs = docs.filter(d => {
        const title = (d.title || '').toLowerCase();
        const desc = (d.description || '').toLowerCase();
        const cat = (d.category || '').toLowerCase();
        return title.includes(q) || desc.includes(q) || cat.includes(q);
      });
    }

    if (docs.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Group personal documents by category
    const catOrder = ['offer_letter', 'certificate', 'id_card', 'evaluation_letter', 'agreement', 'payslip', 'other'];
    const groups = {};
    docs.forEach(d => {
      const cat = (d.category || 'other').toLowerCase();
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(d);
    });

    let html = '';

    catOrder.forEach(catKey => {
      const catDocs = groups[catKey];
      if (!catDocs || catDocs.length === 0) return;

      const groupTitle = COMP_RES_PERSONAL_CATEGORY_LABELS[catKey] || (catKey.charAt(0).toUpperCase() + catKey.slice(1));
      html += `
        <section class="comp-res-section">
          <div class="comp-res-section-header">
            <h2 class="comp-res-section-title">${escapeHtml(groupTitle)}</h2>
            <span class="comp-res-section-count">${catDocs.length}</span>
          </div>
      `;

      if (compResState.personalViewMode === 'grid') {
        html += `<div class="comp-res-grid">`;
        catDocs.forEach(doc => {
          html += renderPersonalDocCardHtml(doc);
        });
        html += `</div>`;
      } else {
        html += renderPersonalDocTableHtml(catDocs);
      }

      html += `</section>`;
    });

    container.innerHTML = html;
    attachPersonalDocumentActions();
  }

  function renderPersonalDocCardHtml(doc) {
    const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
    const isNew = !doc.first_opened_at;
    const isAckRequired = doc.requires_acknowledgement && !doc.acknowledged_at;
    const isAcknowledged = Boolean(doc.acknowledged_at);
    const isRevoked = Boolean(doc.is_revoked);
    const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India Foundation';

    return `
      <article class="comp-res-card" data-personal-doc-id="${doc.id}">
        <div class="comp-res-card-top">
          <div class="comp-res-file-icon-wrap ${fileInfo.class}" title="${fileInfo.type}">
            ${fileInfo.svg}
          </div>
          <div class="comp-res-card-badges">
            ${isNew ? '<span class="badge-new">NEW</span>' : ''}
            ${isAckRequired ? '<span class="badge-action-required">Action Required</span>' : ''}
            ${isAcknowledged ? '<span class="badge-acknowledged">Acknowledged</span>' : ''}
            ${isRevoked ? '<span class="badge-revoked">REVOKED</span>' : ''}
            <span class="badge-doc-type">${escapeHtml(doc.category?.replace(/_/g, ' ') || 'Personal')}</span>
          </div>
        </div>

        <div class="comp-res-card-info">
          <h3 class="comp-res-card-title">${escapeHtml(doc.title || 'Untitled Document')}</h3>
          <p class="comp-res-card-desc">${escapeHtml(doc.description || 'Confidential personal record.')}</p>
          <div class="comp-res-card-meta">
            <span>Issued ${formatCompResDate(doc.issued_at)}</span>
            <span class="comp-res-card-meta-dot"></span>
            <span>By ${escapeHtml(issuerName)}</span>
            ${doc.valid_until ? `
              <span class="comp-res-card-meta-dot"></span>
              <span style="color: var(--accent-light);">Valid until ${formatCompResDate(doc.valid_until)}</span>
            ` : ''}
            <span class="comp-res-card-meta-dot"></span>
            <span>${formatCompResFileSize(doc.file_size)}</span>
          </div>
        </div>

        ${isAckRequired ? `
          <div class="comp-res-ack-card-banner">
            <div class="comp-res-ack-card-text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>Please read and confirm</span>
            </div>
            <button type="button" class="comp-res-ack-action-btn" data-ack-doc-id="${doc.id}">
              I have read &amp; accept
            </button>
          </div>
        ` : ''}

        <div class="comp-res-card-actions">
          <div class="comp-res-card-btns">
            <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-personal-view-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>View</span>
            </button>
            <button type="button" class="comp-res-action-btn comp-res-btn-download" data-personal-download-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderPersonalDocTableHtml(docs) {
    let rowsHtml = '';
    docs.forEach(doc => {
      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
      const isNew = !doc.first_opened_at;
      const isAckRequired = doc.requires_acknowledgement && !doc.acknowledged_at;
      const isAcknowledged = Boolean(doc.acknowledged_at);
      const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India';

      rowsHtml += `
        <tr data-personal-doc-id="${doc.id}">
          <td style="min-width: 240px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="comp-res-file-icon-wrap ${fileInfo.class}" style="width: 32px; height: 32px;">
                ${fileInfo.svg}
              </div>
              <div>
                <strong style="display: block; font-size: 13.5px; color: var(--text-primary);">${escapeHtml(doc.title)}</strong>
                <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(doc.file_name || 'Document')}</span>
                ${isNew ? '<span class="badge-new" style="margin-left: 6px;">NEW</span>' : ''}
              </div>
            </div>
          </td>
          <td><span class="badge-doc-type">${escapeHtml(doc.category?.replace(/_/g, ' ') || 'other')}</span></td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${formatCompResDate(doc.issued_at)}</td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${escapeHtml(issuerName)}</td>
          <td>
            ${isAckRequired ? `<button type="button" class="comp-res-ack-action-btn" data-ack-doc-id="${doc.id}">Accept Required</button>` : ''}
            ${isAcknowledged ? `<span class="badge-acknowledged">Acknowledged (${formatCompResDate(doc.acknowledged_at)})</span>` : ''}
            ${!doc.requires_acknowledgement ? '<span style="color: var(--text-muted); font-size: 12px;">Standard</span>' : ''}
          </td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-muted);">${formatCompResFileSize(doc.file_size)}</td>
          <td style="white-space: nowrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-personal-view-id="${doc.id}" style="padding: 4px 8px;" title="View">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <button type="button" class="comp-res-action-btn comp-res-btn-download" data-personal-download-id="${doc.id}" style="padding: 4px 8px;" title="Download">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    return `
      <div class="comp-res-table-wrap">
        <table class="comp-res-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Category</th>
              <th>Issue Date</th>
              <th>Issued By</th>
              <th>Status</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  function attachPersonalDocumentActions() {
    // 1. View / Preview
    document.querySelectorAll('[data-personal-view-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-personal-view-id');
        const doc = (compResState.personalDocs || []).find(d => String(d.id) === String(docId));
        if (doc) handleViewPersonalDoc(doc);
      });
    });

    // 2. Download
    document.querySelectorAll('[data-personal-download-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-personal-download-id');
        const doc = (compResState.personalDocs || []).find(d => String(d.id) === String(docId));
        if (doc) handleDownloadPersonalDoc(doc);
      });
    });

    // 3. Acknowledgement button
    document.querySelectorAll('[data-ack-doc-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-ack-doc-id');
        const doc = (compResState.personalDocs || []).find(d => String(d.id) === String(docId));
        if (doc) openAcknowledgeConfirmModal(doc);
      });
    });
  }

  

  async function handleViewPersonalDoc(doc) {
    // 1. Mark as opened (updates badge and audit log)
    await window.DataLayer.markPersonalDocumentOpened(doc.id);
    doc.first_opened_at = doc.first_opened_at || new Date().toISOString();
    updateSidebarCompanyResourcesBadge();

    // 2. Open preview modal using short-lived signed URL (60s)
    const modal = document.getElementById('compDocPreviewModal');
    const titleElem = document.getElementById('compDocPreviewTitle');
    const badgeElem = document.getElementById('compDocPreviewTypeBadge');
    const verElem = document.getElementById('compDocPreviewVer');
    const bodyElem = document.getElementById('compDocPreviewBody');
    const downloadBtn = document.getElementById('compDocPreviewDownloadBtn');

    if (!modal || !bodyElem) return;

    if (titleElem) titleElem.textContent = doc.title || 'Personal Document';
    if (badgeElem) badgeElem.textContent = (doc.category || 'Personal').replace(/_/g, ' ').toUpperCase();
    if (verElem) verElem.textContent = 'Confidential';

    if (downloadBtn) downloadBtn.onclick = () => handleDownloadPersonalDoc(doc);

    bodyElem.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
        <div class="skeleton-shimmer" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px;"></div>
        <p style="font-size: 14px;">Generating secure 60-second preview...</p>
      </div>
    `;

    modal.style.display = 'flex';

    if (!doc.storage_path) {
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">This document has been issued to you, but the physical file is not present in storage.</p>
        </div>
      `;
      return;
    }

    try {
      const signedUrl = await window.DataLayer.getPersonalDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Signed URL generation failed');

      let fileExists = true;
      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) fileExists = false;
      } catch (errHead) { }

      if (!fileExists) {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
            <h4 class="comp-res-missing-title">File not uploaded yet</h4>
            <p class="comp-res-missing-desc">File not present in storage bucket.</p>
          </div>
        `;
        return;
      }

      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
      if (fileInfo.type === 'PDF') {
        bodyElem.innerHTML = `<iframe class="comp-res-preview-iframe" src="${signedUrl}#toolbar=0" title="${escapeHtml(doc.title)}"></iframe>`;
      } else if (fileInfo.type === 'Image') {
        bodyElem.innerHTML = `<img class="comp-res-preview-img" src="${signedUrl}" alt="${escapeHtml(doc.title)}" />`;
      } else {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div style="width: 56px; height: 56px; border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;" class="${fileInfo.class}">
              ${fileInfo.svg}
            </div>
            <h4 class="comp-res-missing-title">In-Browser Preview Not Supported</h4>
            <p class="comp-res-missing-desc">Office document files must be downloaded to view in your desktop app.</p>
            <button type="button" class="primary-btn" id="modalPromptPersonalDownloadBtn">
              Download File (${formatCompResFileSize(doc.file_size)})
            </button>
          </div>
        `;
        const promptBtn = document.getElementById('modalPromptPersonalDownloadBtn');
        if (promptBtn) promptBtn.onclick = () => handleDownloadPersonalDoc(doc);
      }
    } catch (e) {
      console.warn('[PersonalDocs] preview exception:', e);
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">${escapeHtml(e.message)}</p>
        </div>
      `;
    }
  }

  async function handleDownloadPersonalDoc(doc) {
    if (!doc.storage_path) {
      showToast('File not uploaded yet for this document.');
      handleViewPersonalDoc(doc);
      return;
    }

    try {
      showToast(`Generating secure download link...`);
      const signedUrl = await window.DataLayer.getPersonalDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Signed URL creation failed.');

      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) {
          showToast('File not uploaded yet.');
          handleViewPersonalDoc(doc);
          return;
        }
      } catch (errHead) { }

      // Log download to audit log
      await window.DataLayer.logDocumentAccess('personal', doc.id, 'download');
      await window.DataLayer.markPersonalDocumentOpened(doc.id);
      doc.first_opened_at = doc.first_opened_at || new Date().toISOString();
      updateSidebarCompanyResourcesBadge();

      const fileName = doc.file_name || `${doc.title}.pdf`;
      const a = document.createElement('a');
      a.href = signedUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 500);

      showToast(`Downloading: ${fileName}`);
    } catch (e) {
      console.warn('[PersonalDocs] download error:', e);
      showToast('Download error: File not uploaded yet.');
    }
  }

  function openAcknowledgeConfirmModal(doc) {
    const modal = document.getElementById('confirmAcknowledgeModal');
    const titleDisplay = document.getElementById('ackDocTitleDisplay');
    const checkbox = document.getElementById('ackCheckConfirm');
    const confirmBtn = document.getElementById('submitAckConfirmBtn');

    if (!modal) return;
    if (titleDisplay) titleDisplay.textContent = doc.title;
    if (checkbox) checkbox.checked = false;
    if (confirmBtn) confirmBtn.disabled = true;

    if (checkbox && confirmBtn) {
      checkbox.onchange = () => {
        confirmBtn.disabled = !checkbox.checked;
      };
    }

    if (confirmBtn) {
      confirmBtn.onclick = async () => {
        try {
          confirmBtn.disabled = true;
          confirmBtn.textContent = 'Recording acceptance...';

          await window.DataLayer.acknowledgePersonalDocument(doc.id);
          doc.acknowledged_at = new Date().toISOString();
          doc.first_opened_at = doc.first_opened_at || doc.acknowledged_at;

          showToast('Document formally acknowledged & accepted.');
          modal.style.display = 'none';

          renderPersonalDocumentsList();
          updateSidebarCompanyResourcesBadge();
        } catch (e) {
          console.error('[PersonalDocs] acknowledge error:', e);
          showToast('Failed to acknowledge document: ' + e.message);
        } finally {
          confirmBtn.disabled = false;
          confirmBtn.textContent = 'I have read and accept';
        }
      };
    }

    modal.style.display = 'flex';
  }

  // ==========================================
  // TAB 3: ADMIN MANAGE PERSONAL DOCUMENTS
  // ==========================================
  async function loadAndRenderManageDocs() {
    if (!isCompResAdmin()) return;

    // Load profiles for recipient filter
    if (compResState.profilesList.length === 0) {
      compResState.profilesList = await window.DataLayer.searchProfiles();
      populateManageRecipientDropdowns();
    }

    if (compResState.manageView === 'docs') {
      const wrap = document.getElementById('compResManageTableWrap');
      if (wrap) wrap.innerHTML = '<div style="padding: 30px; text-align: center;"><div class="skeleton-shimmer" style="height: 20px; width: 180px; margin: 0 auto;"></div></div>';

      const docs = await window.DataLayer.getAllPersonalDocuments({
        recipientId: compResState.manageRecipient,
        category: compResState.manageCategory,
        isAcknowledged: compResState.manageAck,
        isRevoked: compResState.manageRevoked,
        search: compResState.manageSearch
      });

      compResState.allPersonalDocs = Array.isArray(docs) ? docs : [];
      const countElem = document.getElementById('compResManageDocsCount');
      if (countElem) countElem.textContent = compResState.allPersonalDocs.length;

      renderManageDocsTable(compResState.allPersonalDocs);
    } else if (compResState.manageView === 'users') {
      renderManageUsersDossier();
    } else if (compResState.manageView === 'logs') {
      renderManageAuditLogs();
    }
  }

  function switchManageView(viewKey) {
    compResState.manageView = viewKey;

    const mDocsBtn = document.getElementById('compResManageTabDocs');
    const mUsersBtn = document.getElementById('compResManageTabUsers');
    const mLogsBtn = document.getElementById('compResManageTabLogs');

    if (mDocsBtn) mDocsBtn.classList.toggle('active', viewKey === 'docs');
    if (mUsersBtn) mUsersBtn.classList.toggle('active', viewKey === 'users');
    if (mLogsBtn) mLogsBtn.classList.toggle('active', viewKey === 'logs');

    const vDocs = document.getElementById('compResManageDocsView');
    const vUsers = document.getElementById('compResManageUsersView');
    const vLogs = document.getElementById('compResManageLogsView');
    const vFilters = document.getElementById('compResManageFiltersBar');

    if (vDocs) vDocs.style.display = viewKey === 'docs' ? 'block' : 'none';
    if (vUsers) vUsers.style.display = viewKey === 'users' ? 'block' : 'none';
    if (vLogs) vLogs.style.display = viewKey === 'logs' ? 'block' : 'none';
    if (vFilters) vFilters.style.display = viewKey === 'docs' ? 'flex' : 'none';

    loadAndRenderManageDocs();
  }

  function populateManageRecipientDropdowns() {
    const filterSelect = document.getElementById('compResManageRecipientFilter');
    const modalSelect = document.getElementById('issuePersonalRecipient');
    const dossierSelect = document.getElementById('compResDossierUserSelect');

    const profiles = compResState.profilesList || [];

    if (filterSelect) {
      filterSelect.innerHTML = '<option value="all">All Recipients</option>' +
        profiles.map(p => `<option value="${p.id}">${escapeHtml(p.full_name)} (${escapeHtml(p.email)})</option>`).join('');
    }

    if (modalSelect) {
      modalSelect.innerHTML = '<option value="">Select Recipient (Name &amp; Email)...</option>' +
        profiles.map(p => `<option value="${p.id}" data-name="${escapeHtml(p.full_name)}" data-email="${escapeHtml(p.email)}">${escapeHtml(p.full_name)} — ${escapeHtml(p.email)}</option>`).join('');

      modalSelect.onchange = () => {
        const opt = modalSelect.selectedOptions[0];
        const banner = document.getElementById('issuePersonalSummaryText');
        if (banner && opt && opt.value) {
          banner.textContent = `This document will be visible only to ${opt.getAttribute('data-name')} (${opt.getAttribute('data-email')}).`;
        }
      };
    }

    if (dossierSelect) {
      dossierSelect.innerHTML = profiles.map(p => `<option value="${p.id}">${escapeHtml(p.full_name)} (${escapeHtml(p.email)})</option>`).join('');
      dossierSelect.onchange = () => renderManageUsersDossier();
    }
  }

  function renderManageDocsTable(docs) {
    const wrap = document.getElementById('compResManageTableWrap');
    if (!wrap) return;

    if (!docs || docs.length === 0) {
      wrap.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-secondary);">No personal documents found matching criteria.</div>';
      return;
    }

    let rowsHtml = '';
    docs.forEach(doc => {
      const recipientName = doc.recipient?.full_name || 'Unknown Recipient';
      const recipientEmail = doc.recipient?.email || '—';
      const isAck = Boolean(doc.acknowledged_at);
      const isOpened = Boolean(doc.first_opened_at);
      const isRev = Boolean(doc.is_revoked);

      rowsHtml += `
        <tr>
          <td>
            <strong style="display: block; font-size: 13.5px; color: var(--text-primary);">${escapeHtml(recipientName)}</strong>
            <span style="font-size: 11.5px; color: var(--text-muted);">${escapeHtml(recipientEmail)}</span>
          </td>
          <td><span class="badge-doc-type">${escapeHtml(doc.category?.replace(/_/g, ' ') || 'other')}</span></td>
          <td style="max-width: 220px;">
            <strong style="display: block; font-size: 13px; color: var(--text-primary);">${escapeHtml(doc.title)}</strong>
            <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(doc.file_name || 'File')} (${formatCompResFileSize(doc.file_size)})</span>
          </td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${formatCompResDate(doc.issued_at)}</td>
          <td style="white-space: nowrap; font-size: 11.5px;">
            ${isOpened ? `<span style="color: var(--accent-light);">Opened ${formatCompResDate(doc.first_opened_at)}</span>` : '<span style="color: var(--text-muted);">Unopened</span>'}
          </td>
          <td style="white-space: nowrap;">
            ${!doc.requires_acknowledgement ? '<span style="color: var(--text-muted); font-size: 12px;">Not required</span>' :
          (isAck ? `<span class="badge-acknowledged">Yes (${formatCompResDate(doc.acknowledged_at)})</span>` : '<span class="badge-action-required">Pending</span>')}
          </td>
          <td>
            ${isRev ? '<span class="badge-revoked">REVOKED</span>' : '<span class="badge-acknowledged">ACTIVE</span>'}
          </td>
          <td style="white-space: nowrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="secondary-btn small-btn" data-admin-action="toggle-revoke" data-id="${doc.id}">
                ${isRev ? 'Unrevoke' : 'Revoke'}
              </button>
              <button type="button" class="secondary-btn small-btn" data-admin-action="replace-file" data-id="${doc.id}">
                Replace File
              </button>
              <button type="button" class="secondary-btn small-btn" style="color: #ff5c7c;" data-admin-action="delete" data-id="${doc.id}">
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    wrap.innerHTML = `
      <table class="comp-res-table">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Category</th>
            <th>Title &amp; File</th>
            <th>Issued Date</th>
            <th>Opened</th>
            <th>Acknowledged</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    attachManageTableActions();
  }

  function attachManageTableActions() {
    document.querySelectorAll('[data-admin-action="toggle-revoke"]').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const doc = compResState.allPersonalDocs.find(d => String(d.id) === String(id));
        if (!doc) return;
        try {
          if (doc.is_revoked) {
            await window.DataLayer.unrevokePersonalDocument(id);
            showToast('Document unrevoked (visible to recipient).');
          } else {
            await window.DataLayer.revokePersonalDocument(id);
            showToast('Document revoked (hidden from recipient).');
          }
          loadAndRenderManageDocs();
        } catch (e) {
          showToast('Action failed: ' + e.message);
        }
      };
    });

    document.querySelectorAll('[data-admin-action="replace-file"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const doc = compResState.allPersonalDocs.find(d => String(d.id) === String(id));
        if (doc) openReplacePersonalFileModal(doc);
      };
    });

    document.querySelectorAll('[data-admin-action="delete"]').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const doc = compResState.allPersonalDocs.find(d => String(d.id) === String(id));
        if (!doc) return;
        if (!confirm(`Are you sure you want to permanently delete "${doc.title}" for ${doc.recipient?.full_name}?`)) return;
        try {
          await window.DataLayer.deletePersonalDocument(id);
          showToast('Personal document deleted.');
          loadAndRenderManageDocs();
        } catch (e) {
          showToast('Delete failed: ' + e.message);
        }
      };
    });
  }

  

  async function renderManageUsersDossier() {
    const dossierWrap = document.getElementById('compResUserDossierContent');
    const dossierSelect = document.getElementById('compResDossierUserSelect');
    if (!dossierWrap || !dossierSelect) return;

    const selectedUserId = dossierSelect.value;
    if (!selectedUserId) {
      dossierWrap.innerHTML = '<p style="color: var(--text-muted);">Please select a user above.</p>';
      return;
    }

    const docs = await window.DataLayer.getAllPersonalDocuments({ recipientId: selectedUserId });
    if (!docs || docs.length === 0) {
      dossierWrap.innerHTML = '<div style="padding: 30px; text-align: center; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-md);">No documents issued to this individual yet.</div>';
      return;
    }

    let cardsHtml = '<div class="comp-res-grid">';
    docs.forEach(doc => {
      cardsHtml += renderPersonalDocCardHtml(doc);
    });
    cardsHtml += '</div>';

    dossierWrap.innerHTML = cardsHtml;
    attachPersonalDocumentActions();
  }

  async function renderManageAuditLogs() {
    const wrap = document.getElementById('compResManageLogsWrap');
    if (!wrap) return;

    wrap.innerHTML = '<div style="padding: 30px; text-align: center;"><div class="skeleton-shimmer" style="height: 20px; width: 180px; margin: 0 auto;"></div></div>';

    const logs = await window.DataLayer.getDocumentAccessLogs({ limit: 100 });
    if (!logs || logs.length === 0) {
      wrap.innerHTML = '<div style="padding: 30px; text-align: center; color: var(--text-secondary);">No document access logs recorded yet.</div>';
      return;
    }

    let rowsHtml = '';
    logs.forEach(l => {
      const user = l.user?.full_name || l.user_id || 'User';
      const actionBadge = l.action === 'acknowledge' ? '<span class="badge-acknowledged">Acknowledge</span>' :
        l.action === 'download' ? '<span class="badge-updated">Download</span>' : '<span class="badge-prog">View</span>';

      rowsHtml += `
        <tr>
          <td><strong>${escapeHtml(user)}</strong></td>
          <td>${actionBadge}</td>
          <td><span class="badge-doc-type">${escapeHtml(l.document_kind || 'personal')}</span></td>
          <td style="font-family: monospace; font-size: 11px; color: var(--text-muted);">${escapeHtml(l.document_id)}</td>
          <td style="font-size: 12px; color: var(--text-secondary); white-space: nowrap;">${new Date(l.created_at).toLocaleString()}</td>
        </tr>
      `;
    });

    wrap.innerHTML = `
      <table class="comp-res-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Kind</th>
            <th>Document ID</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  // --- Modals for Personal Documents Management ---
  function openIssuePersonalDocModal() {
    const modal = document.getElementById('issuePersonalDocModal');
    const form = document.getElementById('issuePersonalDocForm');
    const dateInput = document.getElementById('issuePersonalDate');
    const errAlert = document.getElementById('issuePersonalErrorAlert');
    const label = document.getElementById('issuePersonalFileLabel');

    if (!modal) return;
    if (form) form.reset();
    if (errAlert) errAlert.style.display = 'none';
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    if (label) label.textContent = 'Choose file or drag & drop';

    modal.style.display = 'flex';
  }

  function setupIssuePersonalDocForm() {
    const form = document.getElementById('issuePersonalDocForm');
    const fileInput = document.getElementById('issuePersonalFile');
    const label = document.getElementById('issuePersonalFileLabel');
    const errAlert = document.getElementById('issuePersonalErrorAlert');
    const progressWrap = document.getElementById('issuePersonalProgressWrap');
    const progressFill = document.getElementById('issuePersonalProgressFill');
    const submitBtn = document.getElementById('submitIssuePersonalBtn');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          label.textContent = fileInput.files[0].name + ` (${formatCompResFileSize(fileInput.files[0].size)})`;
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const recip = document.getElementById('issuePersonalRecipient')?.value;
        const cat = document.getElementById('issuePersonalCategory')?.value;
        const title = document.getElementById('issuePersonalTitle')?.value.trim();
        const desc = document.getElementById('issuePersonalDesc')?.value.trim();
        const date = document.getElementById('issuePersonalDate')?.value || new Date().toISOString().split('T')[0];
        const validUntil = document.getElementById('issuePersonalValidUntil')?.value || null;
        const reqAck = document.getElementById('issuePersonalRequiresAck')?.checked;
        const file = fileInput?.files?.[0];

        if (!recip) { showModalError(errAlert, 'Please select a recipient.'); return; }
        if (!title) { showModalError(errAlert, 'Document title is required.'); return; }
        if (!file) { showModalError(errAlert, 'Please attach a document file.'); return; }
        if (file.size > 10 * 1024 * 1024) { showModalError(errAlert, 'File size exceeds 10 MB limit.'); return; }

        try {
          if (submitBtn) submitBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '60%';

          await window.DataLayer.createPersonalDocument({
            recipient_id: recip,
            category: cat,
            title: title,
            description: desc,
            issued_at: date,
            valid_until: validUntil,
            requires_acknowledgement: reqAck
          }, file);

          if (progressFill) progressFill.style.width = '100%';
          showToast('Personal document issued successfully!');
          const modal = document.getElementById('issuePersonalDocModal');
          if (modal) modal.style.display = 'none';

          loadAndRenderManageDocs();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to issue personal document.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function openBulkIssueModal() {
    const modal = document.getElementById('bulkIssueModal');
    if (!modal) return;
    modal.style.display = 'flex';
  }

  let bulkParsedItems = [];
  let bulkFilesMap = {};

  function setupBulkIssueForm() {
    const csvInput = document.getElementById('bulkIssueCsvFile');
    const docsInput = document.getElementById('bulkIssueDocsFiles');
    const previewArea = document.getElementById('bulkIssuePreviewArea');
    const tbody = document.getElementById('bulkIssuePreviewTbody');
    const confirmBtn = document.getElementById('confirmBulkIssueBtn');
    const errAlert = document.getElementById('bulkIssueErrorAlert');
    const progressWrap = document.getElementById('bulkIssueProgressWrap');
    const progressFill = document.getElementById('bulkIssueProgressFill');

    function checkAndParseBulk() {
      if (!csvInput.files || !csvInput.files[0]) return;
      const csvFile = csvInput.files[0];
      bulkFilesMap = {};

      if (docsInput.files) {
        Array.from(docsInput.files).forEach(f => {
          bulkFilesMap[f.name] = f;
        });
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length <= 1) {
          showModalError(errAlert, 'CSV file is empty or missing data rows.');
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        bulkParsedItems = [];
        let rowsHtml = '';
        let validCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
          if (cols.length < 4) continue;

          const email = cols[0];
          const title = cols[1];
          const category = cols[2] || 'other';
          const issueDate = cols[3] || new Date().toISOString().split('T')[0];
          const fileName = cols[4];
          const reqAck = cols[5] === 'true' || cols[5] === '1';

          // Match recipient
          const matchedProfile = compResState.profilesList.find(p => p.email?.toLowerCase() === email?.toLowerCase());
          const fileFound = Boolean(bulkFilesMap[fileName]);

          const isValid = Boolean(matchedProfile && fileFound);
          if (isValid) validCount++;

          bulkParsedItems.push({
            recipient_id: matchedProfile ? matchedProfile.id : null,
            email,
            title,
            category,
            issued_at: issueDate,
            file_name: fileName,
            requires_acknowledgement: reqAck,
            isValid
          });

          rowsHtml += `
            <tr style="${isValid ? '' : 'background: rgba(239, 68, 68, 0.05);'}">
              <td>${escapeHtml(email)}</td>
              <td>${escapeHtml(title)}</td>
              <td>${escapeHtml(category)}</td>
              <td>${fileFound ? '<span style="color: var(--accent-light);">✓ Matched</span>' : '<span style="color: #ff5c7c;">✗ Missing file</span>'}</td>
              <td>${matchedProfile ? '<span style="color: var(--accent-light);">✓ Found</span>' : '<span style="color: #ff5c7c;">✗ Unknown user</span>'}</td>
              <td>${isValid ? '<span class="badge-acknowledged">Ready</span>' : '<span class="badge-revoked">Skip</span>'}</td>
            </tr>
          `;
        }

        if (tbody) tbody.innerHTML = rowsHtml;
        if (previewArea) previewArea.style.display = 'block';
        if (confirmBtn) {
          confirmBtn.disabled = validCount === 0;
          confirmBtn.textContent = `Issue ${validCount} Valid Document(s)`;
        }
      };
      reader.readAsText(csvFile);
    }

    if (csvInput) csvInput.addEventListener('change', checkAndParseBulk);
    if (docsInput) docsInput.addEventListener('change', checkAndParseBulk);

    if (confirmBtn) {
      confirmBtn.addEventListener('click', async () => {
        const validItems = bulkParsedItems.filter(i => i.isValid);
        if (validItems.length === 0) return;

        try {
          confirmBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '50%';

          const res = await window.DataLayer.bulkIssuePersonalDocuments(validItems, bulkFilesMap);
          if (progressFill) progressFill.style.width = '100%';

          showToast(`Successfully issued ${res.successCount} personal documents.`);
          const modal = document.getElementById('bulkIssueModal');
          if (modal) modal.style.display = 'none';

          loadAndRenderManageDocs();
        } catch (e) {
          showModalError(errAlert, 'Bulk issuance error: ' + e.message);
        } finally {
          confirmBtn.disabled = false;
        }
      });
    }
  }

  function openReplacePersonalFileModal(doc) {
    const modal = document.getElementById('replacePersonalFileModal');
    const idInput = document.getElementById('replaceDocId');
    const titleDisplay = document.getElementById('replaceDocTitleDisplay');

    if (!modal) return;
    if (idInput) idInput.value = doc.id;
    if (titleDisplay) titleDisplay.textContent = `${doc.title} (${doc.recipient?.full_name || 'Recipient'})`;

    modal.style.display = 'flex';
  }

  function setupReplacePersonalFileForm() {
    const form = document.getElementById('replacePersonalFileForm');
    const fileInput = document.getElementById('replaceFileNewInput');
    const submitBtn = document.getElementById('submitReplaceFileBtn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('replaceDocId')?.value;
        const file = fileInput?.files?.[0];
        if (!docId || !file) return;

        try {
          if (submitBtn) submitBtn.disabled = true;
          await window.DataLayer.replacePersonalDocumentFile(docId, file);
          showToast('Document file replaced successfully.');
          const modal = document.getElementById('replacePersonalFileModal');
          if (modal) modal.style.display = 'none';
          loadAndRenderManageDocs();
        } catch (err) {
          showToast('Replace failed: ' + err.message);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function showModalError(container, msg) {
    if (!container) return;
    container.textContent = msg;
    container.style.display = 'block';
  }

  // ==========================================
  // AUTHENTICATION & SESSION MANAGEMENT
  // ==========================================
  let isDemoAuth = false;

  function showAuthError(msg) {
    if (el.authErrorAlert && el.authErrorMessage) {
      el.authErrorMessage.textContent = msg;
      el.authErrorAlert.style.display = 'flex';
    }
  }

  function hideAuthError() {
    if (el.authErrorAlert) {
      el.authErrorAlert.style.display = 'none';
    }
  }

  async function handleSuccessfulAuth(userData, saveToStorage = true) {
    if (saveToStorage) {
      localStorage.setItem('ikaai_portal_session', JSON.stringify(userData));
    }

    if (userData.id) state.profile.id = userData.id;
    if (userData.name) state.profile.name = userData.name;
    if (userData.email) state.profile.email = userData.email;

    const parts = (state.profile.name || 'User').trim().split(/\s+/);
    if (parts.length >= 2) {
      state.profile.initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else {
      state.profile.initials = parts[0].substring(0, 2).toUpperCase();
    }

    // Load profile from DataLayer if authenticated & check access gating
    if (window.DataLayer && userData.id) {
      try {
        const profile = await window.DataLayer.getProfile(userData.id);
        if (profile) {
          // Determine access status safely (admins are always active; existing profiles default to active)
          let accessStatus = profile.access_status;
          if (profile.role === 'admin') {
            accessStatus = 'active';
          } else if (!accessStatus) {
            // If access_status is not yet populated or column not yet added in DB, keep existing users active
            accessStatus = 'active';
          }

          // TEMPORARY TESTING BYPASS: Auto-activate pending users so testing proceeds smoothly without admin approval
          if (accessStatus === 'pending') {
            console.log('[Auth] Temporary Testing Mode: Bypassing approval screen for user:', profile.email);
            accessStatus = 'active';
          }

          // 1. Access Pending: Gating screen bypassed for testing
          // (Can be re-enabled later by removing the bypass above)

          // 2. Access Revoked: User account has been deactivated by Admin
          if (accessStatus === 'revoked') {
            if (el.revokedUserEmail) el.revokedUserEmail.textContent = profile.email || userData.email || '--';
            if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'flex';
            if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
            if (el.authScreen) el.authScreen.style.display = 'none';
            if (el.appShell) el.appShell.style.display = 'none';
            // CRITICAL: Block all portal data loading
            return;
          }

          // 3. Active User: Hide gating screens and configure portal
          if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
          if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'none';

          state.profile.role = profile.role || 'Intern';
          state.profile.name = profile.full_name || profile.display_name || state.profile.name;
          state.profile.branch = profile.branch || state.profile.branch;
          state.profile.position = profile.position || state.profile.position;
          state.profile.phone = profile.phone || state.profile.phone;
          state.profile.avatar_url = profile.avatar_url || state.profile.avatar_url;
          if (profile.programme) state.profile.programmeName = profile.programme.name;
          applyRolePermissions(profile);
        }
      } catch (err) {
        console.warn('[DataLayer] Auth profile load error:', err);
      }
    }

    saveState();
    updateUserAvatarUI();

    if (el.authScreen) el.authScreen.style.display = 'none';
    if (el.appShell) el.appShell.style.display = 'flex';

    // Initialize background Realtime chat sync immediately upon sign-in
    if (window.TeamChat && typeof window.TeamChat.initRealtime === 'function') {
      try {
        window.TeamChat.initRealtime();
      } catch (chatErr) {
        console.warn('[TeamChat] Background realtime sync startup note:', chatErr);
      }
    }

    // Sync curriculum live from database
    await syncCurriculumFromBackend();
  }

  function handleSignOutCleanup() {
    if (typeof cleanupSupportInbox === 'function') cleanupSupportInbox();
    localStorage.removeItem('ikaai_portal_session');
    if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
    if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'none';
    if (el.authScreen) el.authScreen.style.display = 'flex';
    if (el.appShell) el.appShell.style.display = 'none';
    if (el.userDropdownCard) el.userDropdownCard.style.display = 'none';
  }

  async function signOutUser() {
    if (!isDemoAuth && window.supabaseClient) {
      try {
        await window.supabaseClient.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out error:', err);
      }
    }
    handleSignOutCleanup();
    showToast('Signed out successfully');
  }

  async function initAuthentication() {
    const isConfigured = (typeof window.isSupabaseConfigured === 'function') && window.isSupabaseConfigured();
    isDemoAuth = !isConfigured;

    if (isDemoAuth) {
      if (el.demoBanner) el.demoBanner.style.display = 'flex';
    } else {
      if (el.demoBanner) el.demoBanner.style.display = 'none';

      if (!window.supabaseClient && window.supabase && typeof window.supabase.createClient === 'function' && window.SUPABASE_CONFIG) {
        try {
          window.supabaseClient = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey, {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true
            }
          });
        } catch (e) {
          console.error("Supabase init error:", e);
        }
      }

      if (window.supabaseClient) {
        try {
          // Detect OAuth redirect error from URL query or hash params
          const urlParams = new URLSearchParams(window.location.search);
          const hashRaw = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
          const hashParams = new URLSearchParams(hashRaw);
          const urlError = urlParams.get('error_description') || hashParams.get('error_description') || urlParams.get('error') || hashParams.get('error');
          if (urlError) {
            const cleanErr = decodeURIComponent(urlError.replace(/\+/g, ' '));
            console.error('[Auth] Detected OAuth callback error:', cleanErr);
            showAuthError('Google sign-in error: ' + cleanErr);
            window.history.replaceState({}, document.title, window.location.pathname);
          }

          window.supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log('[Auth] onAuthStateChange event:', event, 'user:', session?.user?.email);
            if (session && session.user) {
              const u = session.user;
              const name = u.user_metadata?.full_name || u.user_metadata?.name || u.email.split('@')[0];
              handleSuccessfulAuth({
                name,
                email: u.email,
                id: u.id
              });
            } else if (event === 'SIGNED_OUT') {
              handleSignOutCleanup();
            }
          });

          const { data, error } = await window.supabaseClient.auth.getSession();
          if (error) {
            console.error('[Auth] getSession error:', error);
            showAuthError(error.message || 'Authentication session could not be established.');
          } else if (data?.session?.user) {
            const u = data.session.user;
            const name = u.user_metadata?.full_name || u.user_metadata?.name || u.email.split('@')[0];
            handleSuccessfulAuth({
              name,
              email: u.email,
              id: u.id
            }, false);
            return;
          }
        } catch (err) {
          console.warn('[Auth] Supabase session error:', err);
        }
      }
    }

    // Check existing stored session fallback
    const savedSession = localStorage.getItem('ikaai_portal_session');
    if (savedSession) {
      try {
        const u = JSON.parse(savedSession);
        handleSuccessfulAuth(u, false);
      } catch (e) {
        localStorage.removeItem('ikaai_portal_session');
        if (el.authScreen) el.authScreen.style.display = 'flex';
        if (el.appShell) el.appShell.style.display = 'none';
      }
    } else {
      if (el.authScreen) el.authScreen.style.display = 'flex';
      if (el.appShell) el.appShell.style.display = 'none';
    }
  }

  // Password Visibility Toggles
  function setupPasswordToggle(btn, input) {
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = isPassword
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  

  setupPasswordToggle(el.toggleLoginPasswordBtn, el.loginPassword);
  setupPasswordToggle(el.toggleSignupPasswordBtn, el.signupPassword);

  // Auth Tabs Toggle
  if (el.tabLoginBtn && el.tabSignupBtn) {
    el.tabLoginBtn.addEventListener('click', () => {
      el.tabLoginBtn.classList.add('active');
      el.tabSignupBtn.classList.remove('active');
      el.loginForm.style.display = 'block';
      el.signupForm.style.display = 'none';
      hideAuthError();
    });

    el.tabSignupBtn.addEventListener('click', () => {
      el.tabSignupBtn.classList.add('active');
      el.tabLoginBtn.classList.remove('active');
      el.signupForm.style.display = 'block';
      el.loginForm.style.display = 'none';
      hideAuthError();
    });
  }

  

  // Form Validation & Submission
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (el.loginForm) {
    el.loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAuthError();

      const email = el.loginEmail.value.trim();
      const password = el.loginPassword.value;

      if (!emailRegex.test(email)) {
        showAuthError('Please enter a valid email address.');
        return;
      }
      if (password.length < 8) {
        showAuthError('Password must be at least 8 characters long.');
        return;
      }

      el.loginSubmitBtn.disabled = true;
      el.loginSubmitBtn.textContent = 'Logging in...';

      if (isDemoAuth) {
        setTimeout(() => {
          el.loginSubmitBtn.disabled = false;
          el.loginSubmitBtn.textContent = 'Log In';
          const registered = JSON.parse(localStorage.getItem('ikaai_registered_users') || '[]');
          const existing = registered.find(u => u.email.toLowerCase() === email.toLowerCase());
          const name = existing ? existing.name : (email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
          handleSuccessfulAuth({ name, email });
          showToast(`Welcome back, ${name}!`);
        }, 350);
      } else {
        try {
          const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email,
            password
          });
          el.loginSubmitBtn.disabled = false;
          el.loginSubmitBtn.textContent = 'Log In';

          if (error) {
            let msg = error.message || 'Login failed. Please check your credentials.';
            if (msg.includes('Invalid login credentials')) {
              msg = 'Invalid email or password.';
            } else if (msg.includes('Email not confirmed')) {
              msg = 'Please confirm your email address before logging in, or disable email confirmation in Supabase.';
            }
            showAuthError(msg);
            return;
          }

          if (data && data.user) {
            const u = data.user;
            const name = u.user_metadata?.full_name || u.user_metadata?.name || email.split('@')[0];
            handleSuccessfulAuth({
              name,
              email: u.email,
              id: u.id
            });
            showToast(`Welcome back, ${name}!`);
          }
        } catch (err) {
          el.loginSubmitBtn.disabled = false;
          el.loginSubmitBtn.textContent = 'Log In';
          showAuthError(err.message || 'Login failed. Please check your internet connection.');
        }
      }
    });
  }

  

  if (el.signupForm) {
    el.signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAuthError();

      const name = el.signupName.value.trim();
      const email = el.signupEmail.value.trim();
      const password = el.signupPassword.value;
      const confirmPassword = el.signupConfirmPassword.value;

      if (name.length < 2) {
        showAuthError('Please enter your full name.');
        return;
      }
      if (!emailRegex.test(email)) {
        showAuthError('Please enter a valid email address.');
        return;
      }
      if (password.length < 8) {
        showAuthError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        showAuthError('Passwords do not match. Please re-enter.');
        return;
      }

      el.signupSubmitBtn.disabled = true;
      el.signupSubmitBtn.textContent = 'Creating account...';

      if (isDemoAuth) {
        setTimeout(() => {
          el.signupSubmitBtn.disabled = false;
          el.signupSubmitBtn.textContent = 'Create Account';
          const registered = JSON.parse(localStorage.getItem('ikaai_registered_users') || '[]');
          registered.push({ name, email });
          localStorage.setItem('ikaai_registered_users', JSON.stringify(registered));
          handleSuccessfulAuth({ name, email });
          showToast(`Welcome to Ikaai Academy, ${name}!`);
        }, 400);
      } else {
        try {
          const { data, error } = await window.supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name,
                portal: 'ikaai_academy'
              }
            }
          });

          el.signupSubmitBtn.disabled = false;
          el.signupSubmitBtn.textContent = 'Create Account';

          if (error) {
            let msg = error.message || 'Failed to create account.';
            if (msg.includes('already registered')) {
              msg = 'An account with this email already exists. Please log in.';
            } else if (msg.includes('Password should be')) {
              msg = 'Password is too weak. Please use at least 8 characters.';
            }
            showAuthError(msg);
            return;
          }

          if (data && data.session && data.user) {
            const u = data.user;
            handleSuccessfulAuth({ name, email: u.email, id: u.id });
            showToast(`Welcome to Ikaai Academy, ${name}!`);
          } else if (data && data.user) {
            showToast(`Account created for ${name}!`);
            if (el.tabLoginBtn) el.tabLoginBtn.click();
            if (el.loginEmail) el.loginEmail.value = email;
            showAuthError('Account registered! If email confirmation is enabled, check your inbox.');
          }
        } catch (err) {
          el.signupSubmitBtn.disabled = false;
          el.signupSubmitBtn.textContent = 'Create Account';
          showAuthError(err.message || 'Failed to create account.');
        }
      }
    });
  }

  

  // Google Sign-In
  if (el.googleAuthBtn) {
    el.googleAuthBtn.addEventListener('click', async () => {
      hideAuthError();
      if (isDemoAuth) {
        handleSuccessfulAuth({
          name: 'Akshay Tiwari',
          email: 'akshay.tiwari@ikaaiindia.in'
        });
        showToast('Signed in via Google Demo Account');
      } else {
        try {
          const client = window.supabaseClient || (window.SupabaseClient && window.SupabaseClient.getClient && window.SupabaseClient.getClient());
          if (!client || !client.auth) {
            showAuthError('Authentication service is initializing. Please try again in a moment.');
            return;
          }
          const redirectUrl = window.location.origin + window.location.pathname;
          console.log('[Auth] Initiating Google Sign-In with redirect URL:', redirectUrl);
          const { data, error } = await client.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: redirectUrl
            }
          });
          if (error) {
            console.error('[Auth] Google sign-in error:', error);
            showAuthError(error.message || 'Google sign-in was cancelled or failed.');
          } else if (data && data.url) {
            // Explicit navigation guarantee across all modern browsers
            window.location.assign(data.url);
          }
        } catch (err) {
          console.error('[Auth] Google sign-in exception:', err);
          showAuthError(err.message || 'Google sign-in was cancelled or failed.');
        }
      }
    });
  }

  // Forgot Password handler with dynamic origin redirect
  const forgotPwLink = document.getElementById('forgotPasswordLink');
  if (forgotPwLink) {
    forgotPwLink.addEventListener('click', async (e) => {
      e.preventDefault();
      hideAuthError();
      const email = el.loginEmail ? el.loginEmail.value.trim() : '';
      if (!email || !email.includes('@')) {
        showAuthError('Please enter your email address in the field above first, then click "Forgot password?".');
        if (el.loginEmail) el.loginEmail.focus();
        return;
      }
      try {
        const client = window.supabaseClient;
        if (!client) {
          showAuthError('Authentication service is currently unavailable.');
          return;
        }
        const { error } = await client.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + window.location.pathname
        });
        if (error) {
          showAuthError(error.message || 'Could not send reset email. Please try again.');
        } else {
          showToast(`Password reset link sent to ${email}. Check your inbox.`);
        }
      } catch (err) {
        showAuthError(err.message || 'Failed to send reset link.');
      }
    });
  }

  // Privacy Notice & Community Rules Modal Handlers
  const privacyModal = document.getElementById('privacyRulesModalOverlay');
  const openPrivacyBtn = document.getElementById('openPrivacyRulesLoginBtn');
  const closePrivacyBtn = document.getElementById('closePrivacyRulesModalBtn');
  const dismissPrivacyBtn = document.getElementById('dismissPrivacyRulesBtn');

  if (openPrivacyBtn && privacyModal) {
    openPrivacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.style.display = 'flex';
    });
  }
  if (closePrivacyBtn && privacyModal) {
    closePrivacyBtn.addEventListener('click', () => {
      privacyModal.style.display = 'none';
    });
  }
  if (dismissPrivacyBtn && privacyModal) {
    dismissPrivacyBtn.addEventListener('click', () => {
      privacyModal.style.display = 'none';
    });
  }
  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) privacyModal.style.display = 'none';
    });
  }

  // Maintenance Modal Handlers
  const maintenanceModal = document.getElementById('maintenanceModalOverlay');
  const retryMaintenanceBtn = document.getElementById('retryMaintenanceBtn');
  if (retryMaintenanceBtn) {
    retryMaintenanceBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  // Avatar Dropdown Menu Events
  if (el.userMenuBtn && el.userDropdownCard) {
    el.userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShown = el.userDropdownCard.style.display === 'flex';
      el.userDropdownCard.style.display = isShown ? 'none' : 'flex';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#userDropdownCard') && !e.target.closest('#userMenuBtn')) {
        el.userDropdownCard.style.display = 'none';
      }
    });
  }

  

  if (el.dropdownSettingsBtn) {
    el.dropdownSettingsBtn.addEventListener('click', () => {
      if (el.userDropdownCard) el.userDropdownCard.style.display = 'none';
      switchScreen('settings');
    });
  }

  

  if (el.dropdownJdBtn) {
    el.dropdownJdBtn.addEventListener('click', () => {
      if (el.userDropdownCard) el.userDropdownCard.style.display = 'none';
      resetJdViewToGallery();
      switchScreen('jobDescriptions');
    });
  }

  

  if (el.dropdownLogoutBtn) {
    el.dropdownLogoutBtn.addEventListener('click', signOutUser);
  }

  if (el.settingsLogoutBtn) {
    el.settingsLogoutBtn.addEventListener('click', signOutUser);
  }

  // Duplicate profileActionsForm listener removed; handled in AccountSettingsController

  // ==========================================
  // INITIALIZATION
  // ==========================================

  // ==========================================
  // THEME CONTROLLER - Set default light mode
  // ==========================================
  let currentThemePreference = 'light';

  function resolveTheme() {
    return 'light';
  }

  function applyTheme() {
    currentThemePreference = 'light';
    try { localStorage.setItem('ikaai_portal_theme', 'light'); } catch (e) { }
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // ==========================================================================
  // 14. REAL-TIME TEAM CHAT CONTROLLER
  // Complete Team Chat System with All Members, Channels, DMs, Groups,
  // Real-time Supabase sync, Reactions, Mentions, Pinned, Threads & Sharing
  // ==========================================================================

  const TeamChat = (() => {
    // ---- STATE DEFINITIONS ----
    const state = {
      initialized: false,
      activeConvId: 'all-members',
      replyingTo: null,
      activeThreadMsg: null,
      pendingFiles: [],
      inConvSearch: { query: '', matches: [], curIndex: -1 },
      drafts: {},
      settings: {
        dnd: false,
        mute: {},        // convId -> expiry timestamp or 'always'
        notifyPref: {},  // convId -> 'all' | 'mentions' | 'none'
      },
      typingUsers: {},   // convId -> { [userName]: timeoutId }
      supabaseChannel: null,

      // Directory of programme members (synced dynamically from Supabase profiles)
      members: [],

      // Conversations List (Only real community channels and real direct messages)
      conversations: [
        {
          id: 'all-members',
          type: 'all_members',
          name: 'All Members',
          slug: 'all-members',
          description: 'Programme-wide community for all registered learners and mentors.',
          isAnnouncementOnly: false,
          unread: 0,
          hasMention: false,
          lastMessage: 'All members community chat'
        }
      ],

      // Messages dictionary: convId -> Array of message objects (loaded dynamically from database)
      messages: {}
    };

    // Helper: Get Current User details (Dynamically resolved from active session & profiles)
    function getCurrentUser() {
      let id = null;
      let name = (state.profile && state.profile.name) ? state.profile.name : 'Learner';
      let email = (state.profile && state.profile.email) ? state.profile.email.trim().toLowerCase() : '';
      let role = (state.profile && state.profile.role) ? state.profile.role : 'learner';

      if (state.profile && state.profile.id && state.profile.id !== 'u-anon') {
        id = state.profile.id;
      }

      try {
        const sessionRaw = localStorage.getItem('ikaai_portal_session');
        if (sessionRaw) {
          const u = JSON.parse(sessionRaw);
          if (!id && u.id && u.id !== 'u-anon') id = u.id;
          if (u.name) name = u.name;
          if (u.email) email = u.email.trim().toLowerCase();
          if (u.role) role = u.role;
        }

        // Check Supabase Auth session token in localStorage (sb-*-auth-token)
        if (!id) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
              try {
                const val = JSON.parse(localStorage.getItem(key));
                if (val?.user?.id) {
                  id = val.user.id;
                  if (!email && val.user.email) email = val.user.email.trim().toLowerCase();
                  if (val.user.user_metadata?.full_name) name = val.user.user_metadata.full_name;
                  break;
                }
              } catch (e) {}
            }
          }
        }
      } catch (e) {
        // fallback
      }

      // Check against directory members by email to resolve authentic UUID
      if (email && state.members && state.members.length > 0) {
        const matched = state.members.find(m => m.email && m.email.trim().toLowerCase() === email);
        if (matched) {
          if (!id) id = matched.id;
          if (!name || name === 'Learner') name = matched.name;
          if (!role || role === 'learner') role = matched.role;
        }
      }

      if (!id) id = 'u-anon';
      if (state.profile) {
        state.profile.id = id;
      }

      const initials = (name.split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2) || 'U').toUpperCase();
      return { id, name, email, role, avatar: initials };
    }

    // Dynamic loader: fetch real registered users and real groups from Supabase
    async function loadRealDirectoryMembers() {
      const client = window.supabaseClient;
      if (!client) return;

      try {
        const { data: profiles, error } = await client
          .from('profiles')
          .select('id, full_name, display_name, email, role, avatar_url, last_seen, chat_status')
          .order('full_name', { ascending: true });

        if (error) {
          console.warn('[TeamChat] loadRealDirectoryMembers error:', error);
          return;
        }

        if (profiles && profiles.length > 0) {
          const currentUser = getCurrentUser();

          // Transform DB profiles into state.members (strictly real registered persons only!)
          state.members = profiles.map(p => {
            const displayName = p.full_name || p.display_name || (p.email ? p.email.split('@')[0] : 'Member');
            const initials = displayName.split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';
            return {
              id: p.id,
              name: displayName,
              role: p.role || 'learner',
              email: p.email || '',
              avatar: initials,
              avatarUrl: p.avatar_url || null,
              online: p.chat_status !== 'offline',
              lastSeen: p.last_seen ? formatTimestamp(p.last_seen) : 'Offline'
            };
          });

          const DUMMY_CHANNELS = new Set([
            'general', '#general',
            'announcements', '#announcements',
            'random', '#random',
            'group-hr-interns',
            'channel-general', 'channel-help', 'channel-intro'
          ]);

          // 1. Fetch real user-created groups and channels from Supabase chat_conversations table
          try {
            const { data: dbConvs } = await client
              .from('chat_conversations')
              .select('*')
              .in('type', ['channel', 'group']);

            if (dbConvs && dbConvs.length > 0) {
              dbConvs.forEach(dc => {
                const normName = (dc.name || '').toLowerCase().trim();
                const normSlug = (dc.slug || '').toLowerCase().trim();
                // Filter out all dummy # groups
                if (DUMMY_CHANNELS.has(normName) || DUMMY_CHANNELS.has(normSlug) || DUMMY_CHANNELS.has(dc.id)) {
                  return;
                }

                const existing = state.conversations.find(c => c.id === dc.id);
                if (!existing) {
                  state.conversations.push({
                    id: dc.id,
                    type: dc.type || 'group',
                    name: dc.name,
                    description: dc.description || '',
                    unread: 0,
                    hasMention: false,
                    lastMessage: dc.last_message_preview || 'Group conversation'
                  });
                } else {
                  existing.name = dc.name;
                  existing.description = dc.description || existing.description;
                }
              });
            }
          } catch (e) {
            console.warn('[TeamChat] load dbConvs note:', e);
          }

          // 2. Strict Filter: Retain ONLY 'all-members', real custom channels/groups, and valid real DMs
          const validUserIds = new Set(profiles.map(p => p.id));
          state.conversations = state.conversations.filter(c => {
            if (c.id === 'all-members') return true;
            if (c.type === 'channel' || c.type === 'group') {
              const normName = (c.name || '').toLowerCase().trim();
              const normSlug = (c.slug || '').toLowerCase().trim();
              if (DUMMY_CHANNELS.has(normName) || DUMMY_CHANNELS.has(normSlug) || DUMMY_CHANNELS.has(c.id)) {
                return false; // remove dummy # groups
              }
              return true;
            }
            if (c.type === 'direct') {
              return c.recipientId && validUserIds.has(c.recipientId) && c.recipientId !== currentUser.id;
            }
            return false;
          });

          // 3. Create or update canonical Direct Message conversations ONLY for real registered members
          profiles.forEach(p => {
            if (p.id === currentUser.id) return; // Don't DM yourself
            const displayName = p.full_name || p.display_name || (p.email ? p.email.split('@')[0] : 'Member');
            // Canonical DM room ID so both participants share the exact same room ID
            const dmConvId = 'dm_' + [currentUser.id, p.id].sort().join('_');

            const existing = state.conversations.find(c => c.id === dmConvId || c.recipientId === p.id);
            if (!existing) {
              state.conversations.push({
                id: dmConvId,
                type: 'direct',
                name: displayName,
                recipientId: p.id,
                description: `${p.role || 'Intern'} · ${p.email || ''}`,
                unread: 0,
                hasMention: false,
                lastMessage: 'Direct conversation'
              });
            } else {
              existing.id = dmConvId;
              existing.name = displayName;
              existing.recipientId = p.id;
              existing.description = `${p.role || 'Intern'} · ${p.email || ''}`;
            }
          });

          // If active conversation was pointing to a removed dummy one, reset to 'all-members'
          if (!state.conversations.some(c => c.id === state.activeConvId)) {
            state.activeConvId = 'all-members';
          }

          renderSidebarLists();
        }
      } catch (err) {
        console.warn('[TeamChat] loadRealDirectoryMembers exception:', err);
      }
    }

    // Helper: Escape HTML to avoid XSS
    function escapeHtml(str) {
      if (!str) return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Safe Markdown parsing
    function parseMarkdown(text) {
      if (!text) return '';
      let parsed = escapeHtml(text);

      // Bold **text**
      parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic _text_ or *text*
      parsed = parsed.replace(/_([^_]+)_/g, '<em>$1</em>');
      // Strikethrough ~~text~~
      parsed = parsed.replace(/~~(.*?)~~/g, '<del>$1</del>');
      // Inline code `code`
      parsed = parsed.replace(/`([^`]+)`/g, '<code>$1</code>');
      // Links [title](url)
      parsed = parsed.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      // Raw links
      parsed = parsed.replace(/(^|[^"'])((https?:\/\/)[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
      // Mentions (@Name, @everyone, @instructors)
      parsed = parsed.replace(/@([A-Za-z0-9_.\s]+?)(?=\s|[.,!?]|$)/g, (match, p1) => {
        const trimmed = p1.trim();
        const isSpecial = trimmed.toLowerCase() === 'everyone' || trimmed.toLowerCase() === 'instructors';
        const currentUser = getCurrentUser();
        const isMe = trimmed.toLowerCase() === currentUser.name.toLowerCase();
        return `<span class="chat-mention-tag ${isSpecial || isMe ? 'highlight' : ''}">@${trimmed}</span>`;
      });

      // Newlines to <br> or <p>
      const paragraphs = parsed.split(/\n\n+/);
      if (paragraphs.length > 1) {
        return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
      }
      return parsed.replace(/\n/g, '<br>');
    }

    // Format timestamp
    function formatTimestamp(isoStr) {
      if (!isoStr) return '';
      const date = new Date(isoStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24 && date.getDate() === now.getDate()) return timeStr;
      if (diffHours < 48) return `Yesterday ${timeStr}`;
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + timeStr;
    }

    // Get active conversation object
    function getActiveConv() {
      return state.conversations.find(c => c.id === state.activeConvId) || state.conversations[0];
    }

    // Render left sidebar conversation lists
    function renderSidebarLists() {
      const allMembersGroup = document.getElementById('chatNavAllMembersGroup');
      const directGroup = document.getElementById('chatNavDirectGroup');
      const groupsGroup = document.getElementById('chatNavGroupsGroup');

      if (!allMembersGroup || !directGroup || !groupsGroup) return;

      allMembersGroup.innerHTML = '';
      directGroup.innerHTML = '';
      groupsGroup.innerHTML = '';

      state.conversations.forEach(conv => {
        const isActive = conv.id === state.activeConvId;
        const el = document.createElement('div');
        el.className = `chat-conv-item ${isActive ? 'active' : ''} ${conv.unread > 0 ? 'unread' : ''}`;
        el.setAttribute('data-conv-id', conv.id);

        let avatarHtml = '';
        if (conv.type === 'all_members') {
          avatarHtml = `<div class="chat-conv-item-avatar">👥</div>`;
        } else if (conv.type === 'channel') {
          avatarHtml = `<div class="chat-conv-item-avatar channel-hash">#</div>`;
        } else if (conv.type === 'direct') {
          const member = state.members.find(m => m.id === conv.recipientId);
          const initials = member ? member.avatar : conv.name.substring(0, 2).toUpperCase();
          const isOnline = member ? member.online : false;
          avatarHtml = `
          <div class="chat-conv-item-avatar">
            ${initials}
            <span class="chat-online-dot ${isOnline ? '' : 'offline'}"></span>
          </div>
        `;
        } else if (conv.type === 'group') {
          avatarHtml = `<div class="chat-conv-item-avatar">👥</div>`;
        }

        // Preview snippet
        const msgs = state.messages[conv.id] || [];
        const lastMsg = msgs[msgs.length - 1];
        const previewText = lastMsg ? (lastMsg.isDeleted ? 'This message was deleted' : lastMsg.content.substring(0, 36)) : (conv.description || 'No messages yet');
        const timeStr = lastMsg ? formatTimestamp(lastMsg.createdAt) : '';

        el.innerHTML = `
        ${avatarHtml}
        <div class="chat-conv-item-info">
          <div class="chat-conv-item-top">
            <span class="chat-conv-item-name">${escapeHtml(conv.name)}</span>
            <span class="chat-conv-item-time">${timeStr}</span>
          </div>
          <div class="chat-conv-item-bottom">
            <span class="chat-conv-item-preview">${escapeHtml(previewText)}</span>
            ${conv.hasMention ? '<span class="chat-mention-badge">@</span>' : (conv.unread > 0 ? `<span class="chat-unread-badge">${conv.unread}</span>` : '')}
          </div>
        </div>
      `;

        el.addEventListener('click', () => {
          selectConversation(conv.id);
        });

        if (conv.type === 'all_members') {
          allMembersGroup.appendChild(el);
        } else if (conv.type === 'direct') {
          directGroup.appendChild(el);
        } else if (conv.type === 'group' || conv.type === 'channel') {
          groupsGroup.appendChild(el);
        }
      });

      if (directGroup.children.length === 0) {
        directGroup.innerHTML = '<div style="font-size: 11px; color: var(--chat-text-muted); padding: 8px 12px; font-style: italic;">No other members online.</div>';
      }
      if (groupsGroup.children.length === 0) {
        groupsGroup.innerHTML = '<div style="font-size: 11px; color: var(--chat-text-muted); padding: 8px 12px; font-style: italic;">No groups created yet. Click + New to create one.</div>';
      }

      // Update navChat unread badge in main sidebar
      updateNavChatBadge();
    }

    // Update `#navChat` badge in left app sidebar
    function updateNavChatBadge() {
      const totalUnread = state.conversations.reduce((acc, c) => acc + (c.unread || 0), 0);
      const navBtn = document.getElementById('navChat');
      if (!navBtn) return;

      let badge = navBtn.querySelector('.nav-chat-pill-badge');
      if (totalUnread > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'nav-chat-pill-badge chat-unread-badge';
          badge.style.marginLeft = 'auto';
          navBtn.appendChild(badge);
        }
        badge.textContent = totalUnread > 99 ? '99+' : totalUnread;
        badge.style.display = 'inline-block';
      } else if (badge) {
        badge.style.display = 'none';
      }
    }

    // Select a conversation
    function selectConversation(convId) {
      // Save draft for current conversation
      const textarea = document.getElementById('chatComposerTextarea');
      if (textarea && state.activeConvId) {
        state.drafts[state.activeConvId] = textarea.value;
      }

      state.activeConvId = convId;
      const conv = getActiveConv();
      if (conv) {
        conv.unread = 0;
        conv.hasMention = false;
      }

      // Reset reply
      state.replyingTo = null;
      hideReplyBar();

      // Close in-conv search
      closeInConvSearch();

      // On mobile screens (<1024px), toggle `.in-conversation`
      const wrapper = document.getElementById('teamChatWrapper');
      if (wrapper) {
        wrapper.classList.add('in-conversation');
      }

      renderActiveConversationHeader();
      renderPinnedBanner();
      renderMessages();
      renderDetailsPanel();

      // Asynchronously fetch latest messages and shared documents from Supabase database
      loadConversationMessages(convId);
      renderSidebarLists();

      // Restore draft if any
      if (textarea) {
        textarea.value = state.drafts[convId] || '';
        updateCharCounter();
        textarea.focus();
      }
    }

    // Render conversation header
    function renderActiveConversationHeader() {
      const conv = getActiveConv();
      if (!conv) return;

      const titleEl = document.getElementById('chatActiveTitle');
      const subEl = document.getElementById('chatActiveSubtitle');
      const avatarEl = document.getElementById('chatActiveAvatar');
      const pipEl = document.getElementById('chatActiveOnlinePip');
      const announcementTag = document.getElementById('chatAnnouncementTag');
      const readOnlyNotice = document.getElementById('chatReadOnlyNotice');
      const composerForm = document.getElementById('chatComposerForm');

      if (titleEl) titleEl.textContent = conv.name;
      if (subEl) {
        if (conv.type === 'direct') {
          const member = state.members.find(m => m.id === conv.recipientId);
          subEl.textContent = member ? `${member.role.toUpperCase()} • ${member.lastSeen}` : 'Direct Message';
        } else {
          subEl.textContent = `${conv.type === 'all_members' ? 'Programme-wide' : 'Channel'} • ${conv.memberCount || conv.members?.length || 24} members`;
        }
      }

      if (avatarEl) {
        if (conv.type === 'direct') {
          const member = state.members.find(m => m.id === conv.recipientId);
          avatarEl.textContent = member ? member.avatar : conv.name.substring(0, 2).toUpperCase();
          if (pipEl) {
            pipEl.style.display = 'block';
            pipEl.className = `chat-conv-online-pip ${member && member.online ? '' : 'offline'}`;
          }
        } else if (conv.type === 'channel') {
          avatarEl.textContent = '#';
          if (pipEl) pipEl.style.display = 'none';
        } else {
          avatarEl.textContent = '👥';
          if (pipEl) pipEl.style.display = 'none';
        }
      }

      // Announcement only mode
      const currentUser = getCurrentUser();
      const isInstructorOrAdmin = currentUser.role === 'instructor' || currentUser.role === 'admin';
      const isReadOnlyForMe = conv.isAnnouncementOnly && !isInstructorOrAdmin;

      if (announcementTag) {
        announcementTag.style.display = conv.isAnnouncementOnly ? 'inline-block' : 'none';
      }
      if (readOnlyNotice && composerForm) {
        if (isReadOnlyForMe) {
          readOnlyNotice.style.display = 'flex';
          composerForm.style.display = 'none';
        } else {
          readOnlyNotice.style.display = 'none';
          composerForm.style.display = 'flex';
        }
      }

      // Update pin counter pill in header
      const msgs = state.messages[conv.id] || [];
      const pinCount = msgs.filter(m => m.isPinned).length;
      const pinPill = document.getElementById('chatPinCounterPill');
      if (pinPill) {
        if (pinCount > 0) {
          pinPill.textContent = pinCount;
          pinPill.style.display = 'inline-block';
        } else {
          pinPill.style.display = 'none';
        }
      }
    }

    // Render pinned banner at top of messages
    function renderPinnedBanner() {
      const conv = getActiveConv();
      const banner = document.getElementById('chatPinnedBanner');
      const textEl = document.getElementById('chatPinnedBannerText');
      if (!banner || !textEl || !conv) return;

      const msgs = state.messages[conv.id] || [];
      const pinnedMsgs = msgs.filter(m => m.isPinned && !m.isDeleted);
      if (pinnedMsgs.length > 0) {
        const latestPin = pinnedMsgs[pinnedMsgs.length - 1];
        textEl.textContent = latestPin.content.replace(/\*\*/g, '').substring(0, 90);
        banner.style.display = 'flex';

        const jumpBtn = document.getElementById('chatPinnedBannerJump');
        if (jumpBtn) {
          jumpBtn.onclick = () => {
            scrollToMessage(latestPin.id);
          };
        }
        const dismissBtn = document.getElementById('chatPinnedBannerDismiss');
        if (dismissBtn) {
          dismissBtn.onclick = () => {
            banner.style.display = 'none';
          };
        }
      } else {
        banner.style.display = 'none';
      }
    }

    // Render messages stream
    function renderMessages() {
      const listEl = document.getElementById('chatMessageList');
      if (!listEl) return;

      const conv = getActiveConv();
      const msgs = state.messages[conv.id] || [];
      const currentUser = getCurrentUser();

      listEl.innerHTML = '';

      if (msgs.length === 0) {
        listEl.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; color: var(--chat-text-muted);">
          <div style="font-size: 32px; margin-bottom: 8px;">💬</div>
          <h4 style="color: var(--chat-text); font-size: 15px; margin-bottom: 4px;">No messages yet</h4>
          <p style="font-size: 13px;">Send the first message to start the conversation in ${escapeHtml(conv.name)}.</p>
        </div>
      `;
        return;
      }

      let lastSenderId = null;
      let lastDateStr = null;

      msgs.forEach((msg, idx) => {
        // Day divider check
        const msgDate = new Date(msg.createdAt);
        const now = new Date();
        let dateDividerStr = msgDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        if (msgDate.toDateString() === now.toDateString()) {
          dateDividerStr = 'Today';
        } else {
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          if (msgDate.toDateString() === yesterday.toDateString()) {
            dateDividerStr = 'Yesterday';
          }
        }

        if (dateDividerStr !== lastDateStr) {
          const divider = document.createElement('div');
          divider.className = 'chat-day-divider';
          divider.innerHTML = `<span class="chat-day-pill">${dateDividerStr}</span>`;
          listEl.appendChild(divider);
          lastDateStr = dateDividerStr;
          lastSenderId = null; // Reset consecutive group across days
        }

        const isOwn = msg.senderName.toLowerCase() === currentUser.name.toLowerCase() || (msg.senderId && msg.senderId === currentUser.id);
        const isConsecutive = lastSenderId === msg.senderName && !msg.parentMessageId;
        lastSenderId = msg.senderName;

        const row = document.createElement('div');
        row.className = `chat-msg-row ${isOwn ? 'is-own' : ''} ${isConsecutive ? 'consecutive' : ''}`;
        row.id = `chat-msg-${msg.id}`;

        // Floating hover action bar
        const canEdit = isOwn && !msg.isDeleted;
        const canDelete = (isOwn || currentUser.role === 'instructor' || currentUser.role === 'admin') && !msg.isDeleted;

        const actionsBarHtml = `
        <div class="chat-msg-actions-bar">
          <button type="button" class="chat-action-btn-mini" data-react="👍" title="Thumbs up">👍</button>
          <button type="button" class="chat-action-btn-mini" data-react="❤️" title="Heart">❤️</button>
          <button type="button" class="chat-action-btn-mini" data-react="✅" title="Checkmark">✅</button>
          <button type="button" class="chat-action-btn-mini" data-react="🎉" title="Celebration">🎉</button>
          <button type="button" class="chat-action-btn-mini" data-action="reply" title="Reply">↩️</button>
          <button type="button" class="chat-action-btn-mini" data-action="thread" title="Reply in thread">🧵</button>
          <button type="button" class="chat-action-btn-mini" data-action="pin" title="${msg.isPinned ? 'Unpin' : 'Pin'} message">📌</button>
          ${canEdit ? '<button type="button" class="chat-action-btn-mini" data-action="edit" title="Edit">✏️</button>' : ''}
          ${canDelete ? '<button type="button" class="chat-action-btn-mini" data-action="delete" title="Delete">🗑️</button>' : ''}
        </div>
      `;

        // Quoted reply snippet
        let quoteHtml = '';
        if (msg.parentMessageId) {
          const parentMsg = msgs.find(m => m.id === msg.parentMessageId);
          if (parentMsg) {
            quoteHtml = `
            <div class="chat-bubble-quote" data-jump-msg="${parentMsg.id}">
              <div class="quote-author">↩️ ${escapeHtml(parentMsg.senderName)}</div>
              <div class="quote-text">${escapeHtml(parentMsg.content.substring(0, 60))}</div>
            </div>
          `;
          }
        }

        // Shared item card (Module, JD, FAQ)
        let sharedCardHtml = '';
        if (msg.sharedItem) {
          const item = msg.sharedItem;
          sharedCardHtml = `
          <div class="chat-shared-card">
            <div class="shared-card-type-row">
              <span>📌 ${escapeHtml(item.type.toUpperCase())}</span>
            </div>
            <div class="shared-card-title">${escapeHtml(item.title)}</div>
            ${item.snippet ? `<div class="shared-card-snippet">${escapeHtml(item.snippet)}</div>` : ''}
            <button type="button" class="shared-card-action-btn" data-open-item="${item.type}" data-item-id="${item.id}">Open in portal →</button>
          </div>
        `;
        }

        // Attachments (Images, PDFs, Docs) with smooth downloading & inline preview support
        let attachmentsHtml = '';
        if (msg.attachments && msg.attachments.length > 0) {
          attachmentsHtml = '<div class="chat-msg-attachments">';
          msg.attachments.forEach(att => {
            const fname = att.file_name || att.name || 'document';
            const mime = att.mime_type || att.type || '';
            const isImg = mime.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(fname);
            const imgSrc = att.public_url || att.file_url || att.url || '';
            const storagePath = att.storage_path || '';

            if (isImg && (imgSrc || storagePath)) {
              attachmentsHtml += `
                <div class="chat-img-thumb-wrap" data-action="preview" data-storage-path="${escapeHtml(storagePath)}" data-file-name="${escapeHtml(fname)}" data-direct-url="${escapeHtml(imgSrc)}" data-mime-type="${escapeHtml(mime)}">
                  <img src="${imgSrc || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'1.5\'><rect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\' ry=\'2\'/><circle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/><polyline points=\'21 15 16 10 5 21\'/></svg>'}" alt="${escapeHtml(fname)}" class="chat-img-thumb" data-full-img="${escapeHtml(imgSrc)}" data-storage-path="${escapeHtml(storagePath)}" data-file-name="${escapeHtml(fname)}">
                  <div class="chat-img-overlay-actions">
                    <button type="button" class="chat-img-action-btn" data-action="preview" data-direct-url="${escapeHtml(imgSrc)}" data-storage-path="${escapeHtml(storagePath)}" data-file-name="${escapeHtml(fname)}" data-mime-type="${escapeHtml(mime)}" title="Preview image">👁️ Preview</button>
                    <button type="button" class="chat-img-action-btn chat-file-dl-btn" data-direct-url="${escapeHtml(imgSrc)}" data-storage-path="${escapeHtml(storagePath)}" data-file-name="${escapeHtml(fname)}" title="Download image">⬇️</button>
                  </div>
                </div>`;
            } else {
              const ext = fname.split('.').pop().toUpperCase();
              const rawSize = att.file_size || att.size || 0;
              const sizeStr = rawSize > (1024 * 1024)
                ? `${(rawSize / 1024 / 1024).toFixed(1)} MB`
                : (rawSize > 0 ? `${Math.round(rawSize / 1024)} KB` : '');

              attachmentsHtml += `
              <div class="chat-file-chip" data-storage-path="${escapeHtml(storagePath)}" data-file-name="${escapeHtml(fname)}" data-direct-url="${escapeHtml(imgSrc)}" data-mime-type="${escapeHtml(mime)}" title="Click to preview ${escapeHtml(fname)}">
                <span class="chat-file-ext-badge">${ext}</span>
                <div class="chat-file-meta" data-action="preview">
                  <span class="chat-file-name">${escapeHtml(fname)}</span>
                  ${sizeStr ? `<small class="chat-file-size">${sizeStr}</small>` : ''}
                </div>
                <div class="chat-file-actions">
                  <button type="button" class="chat-file-preview-btn" data-action="preview" title="Preview document">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>Preview</span>
                  </button>
                  <button type="button" class="chat-file-dl-btn" title="Download document">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            `;
            }
          });
          attachmentsHtml += '</div>';
        }

        // Reactions row
        let reactionsHtml = '';
        if (msg.reactions && msg.reactions.length > 0) {
          reactionsHtml = '<div class="chat-reactions-row">';
          msg.reactions.forEach(r => {
            const hasReacted = r.users.includes(currentUser.name);
            reactionsHtml += `
            <button type="button" class="chat-reaction-chip ${hasReacted ? 'has-reacted' : ''}" data-emoji="${r.emoji}" title="${escapeHtml(r.users.join(', '))}">
              <span>${r.emoji}</span>
              <span>${r.count}</span>
            </button>
          `;
          });
          reactionsHtml += '</div>';
        }

        // Role badge
        const roleStr = msg.senderRole ? msg.senderRole.toLowerCase() : 'learner';
        const roleBadgeHtml = `<span class="chat-role-badge ${roleStr}">${roleStr === 'instructor' ? 'Instructor' : (roleStr === 'admin' ? 'Admin' : 'Learner')}</span>`;

        // Bubble content
        const bodyContent = msg.isDeleted
          ? `<span class="chat-bubble-deleted">This message was deleted</span>`
          : parseMarkdown(msg.content);

        row.innerHTML = `
        ${actionsBarHtml}
        <div class="chat-msg-avatar-col">
          <div class="chat-sender-avatar">${escapeHtml(msg.senderAvatar || msg.senderName.substring(0, 2).toUpperCase())}</div>
        </div>
        <div class="chat-msg-content-col">
          <div class="chat-msg-header">
            <span class="chat-msg-sender-name">${escapeHtml(msg.senderName)}</span>
            ${roleBadgeHtml}
            <span class="chat-msg-time">${formatTimestamp(msg.createdAt)}</span>
            ${msg.isEdited ? '<span class="chat-msg-edited-tag">(edited)</span>' : ''}
            ${msg.isPinned ? '<span title="Pinned message" style="font-size: 11px;">📌</span>' : ''}
          </div>
          <div class="chat-bubble-card">
            ${quoteHtml}
            ${msg.content && msg.content.trim() ? `<div class="chat-bubble-text">${bodyContent}</div>` : ''}
            ${sharedCardHtml}
            ${attachmentsHtml}
          </div>
          ${reactionsHtml}
          ${isOwn && !msg.isDeleted ? (
            msg.receipt === 'Failed'
              ? `<div class="chat-receipt-status chat-receipt-failed" role="button" data-retry-msg-id="${escapeHtml(msg.id)}" title="${escapeHtml(msg.errorMessage || 'Database error')}" style="cursor: pointer; color: #ef4444; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; background: rgba(239, 68, 68, 0.08); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.25); margin-top: 4px;">
                  <span style="font-size: 13px;">⚠️</span>
                  <span>Failed, tap to retry</span>
                  <span style="font-size: 11px; opacity: 0.85; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">(${escapeHtml(msg.errorMessage || 'Unknown error')})</span>
                </div>`
              : (msg.receipt === 'Sending'
                  ? `<div class="chat-receipt-status" style="color: var(--chat-text-dim); display: inline-flex; align-items: center; gap: 4px;"><span>⏳</span> Sending...</div>`
                  : `<div class="chat-receipt-status"><span>✓✓</span> ${escapeHtml(msg.receipt || 'Sent')}</div>`
                )
          ) : ''}
        </div>
      `;

        // Attach row interaction listeners
        wireMessageEventListeners(row, msg);
        listEl.appendChild(row);
      });

      // Scroll to bottom
      scrollToBottom();
    }

    // Attach event listeners to a message row

    // Smooth document downloading helper
    async function downloadChatAttachment(storagePath, fileName, directUrl) {
      if (!fileName) fileName = 'document';
      showChatToast(`Preparing download: ${fileName}...`);

      let downloadUrl = directUrl;
      if (storagePath && window.DataLayer && !storagePath.startsWith('local/')) {
        try {
          const signed = await window.DataLayer.getChatAttachmentDownloadUrl(storagePath, fileName);
          if (signed) downloadUrl = signed;
        } catch (err) {
          console.warn('Could not generate signed download URL:', err);
        }
      }

      if (!downloadUrl) {
        alert('File is not uploaded or link is unavailable.');
        return;
      }

      // Trigger instant smooth browser download
      try {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          if (a.parentNode) a.parentNode.removeChild(a);
        }, 1000);
        showChatToast(`Downloading: ${fileName}`);
      } catch (e) {
        window.open(downloadUrl, '_blank');
      }
    }

    // Asynchronously load conversation messages from Supabase database
    async function loadConversationMessages(convId) {
      if (!convId || !window.DataLayer) return;
      try {
        const dbMsgs = await window.DataLayer.getChatMessages(convId);
        if (dbMsgs && dbMsgs.length > 0) {
          state.messages[convId] = dbMsgs.map(m => ({
            id: m.id,
            conversationId: m.conversation_id,
            senderId: m.sender_id,
            senderName: m.sender_name,
            senderRole: m.sender_role,
            senderAvatar: m.sender_avatar,
            content: m.content,
            parentMessageId: m.parent_message_id,
            sharedItem: m.shared_item,
            isPinned: m.is_pinned,
            isEdited: m.is_edited,
            isDeleted: m.is_deleted,
            createdAt: m.created_at,
            receipt: 'Seen',
            reactions: (m.reactions || []).reduce((acc, r) => {
              const existing = acc.find(x => x.emoji === r.emoji);
              if (existing) {
                existing.count++;
                existing.users.push(r.user_name);
              } else {
                acc.push({ emoji: r.emoji, count: 1, users: [r.user_name] });
              }
              return acc;
            }, []),
            attachments: (m.attachments || []).map(a => ({
              id: a.id,
              name: a.file_name,
              file_name: a.file_name,
              size: a.file_size,
              file_size: a.file_size,
              type: a.mime_type,
              mime_type: a.mime_type,
              storage_path: a.storage_path,
              public_url: a.public_url,
              url: a.public_url || ''
            }))
          }));

          if (state.activeConvId === convId) {
            renderMessages();
            renderPinnedBanner();
            renderDetailsPanel();
          }
        }
      } catch (e) {
        console.warn('[TeamChat] Failed to load messages from DB:', e);
      }
    }

    function wireMessageEventListeners(row, msg) {
      // Retry sending failed message
      const retryBtn = row.querySelector('.chat-receipt-failed');
      if (retryBtn) {
        retryBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          retrySendMessage(msg.id);
        });
      }

      // Wire document preview buttons and clicks
      row.querySelectorAll('[data-action="preview"]').forEach(elem => {
        elem.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = elem.closest('[data-storage-path]') || elem;
          const path = target.getAttribute('data-storage-path');
          const fname = target.getAttribute('data-file-name');
          const direct = target.getAttribute('data-direct-url');
          const mime = target.getAttribute('data-mime-type');
          previewDocument(path, fname, direct, mime);
        });
      });

      // Wire document download buttons
      row.querySelectorAll('.chat-file-dl-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = btn.closest('[data-storage-path]') || btn;
          const path = target.getAttribute('data-storage-path');
          const fname = target.getAttribute('data-file-name');
          const direct = target.getAttribute('data-direct-url');
          downloadChatAttachment(path, fname, direct);
        });
      });

      // Wire thumbnail images
      row.querySelectorAll('.chat-img-thumb').forEach(img => {
        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = img.closest('[data-storage-path]') || img;
          const path = target.getAttribute('data-storage-path');
          const fname = target.getAttribute('data-file-name');
          const direct = target.getAttribute('data-direct-url') || img.getAttribute('data-full-img');
          const mime = target.getAttribute('data-mime-type') || 'image/jpeg';
          previewDocument(path, fname, direct, mime);
        });
      });

      // Action bar reactions
      row.querySelectorAll('[data-react]').forEach(btn => {
        btn.addEventListener('click', () => {
          toggleReaction(msg.id, btn.getAttribute('data-react'));
        });
      });

      // Action bar buttons (reply, thread, pin, edit, delete)
      const replyBtn = row.querySelector('[data-action="reply"]');
      if (replyBtn) {
        replyBtn.addEventListener('click', () => {
          startReply(msg);
        });
      }

      const threadBtn = row.querySelector('[data-action="thread"]');
      if (threadBtn) {
        threadBtn.addEventListener('click', () => {
          openThread(msg);
        });
      }

      const pinBtn = row.querySelector('[data-action="pin"]');
      if (pinBtn) {
        pinBtn.addEventListener('click', () => {
          togglePinMessage(msg.id);
        });
      }

      const editBtn = row.querySelector('[data-action="edit"]');
      if (editBtn) {
        editBtn.addEventListener('click', () => {
          startEditMessage(msg);
        });
      }

      const delBtn = row.querySelector('[data-action="delete"]');
      if (delBtn) {
        delBtn.addEventListener('click', () => {
          confirmDeleteMessage(msg.id);
        });
      }

      // Reaction chip clicks
      row.querySelectorAll('.chat-reaction-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          toggleReaction(msg.id, chip.getAttribute('data-emoji'));
        });
      });

      // Quoted reply jump
      const quoteEl = row.querySelector('.chat-bubble-quote');
      if (quoteEl) {
        quoteEl.addEventListener('click', () => {
          const targetId = quoteEl.getAttribute('data-jump-msg');
          if (targetId) scrollToMessage(targetId);
        });
      }

      // Shared item jump
      row.querySelectorAll('[data-open-item]').forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.getAttribute('data-open-item');
          const id = btn.getAttribute('data-item-id');
          openSharedPortalItem(type, id);
        });
      });

      // Image lightbox
      row.querySelectorAll('.chat-img-thumb').forEach(img => {
        img.addEventListener('click', () => {
          openLightbox(img.getAttribute('data-full-img'));
        });
      });
    }

    // Jump smoothly to a message in the stream
    function scrollToMessage(msgId) {
      const el = document.getElementById(`chat-msg-${msgId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transition = 'background-color 0.4s';
        el.style.backgroundColor = 'var(--chat-accent-tint)';
        setTimeout(() => {
          el.style.backgroundColor = '';
        }, 1500);
      }
    }

    // Scroll to bottom of messages container
    function scrollToBottom() {
      const container = document.getElementById('chatMessagesContainer');
      if (container) {
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 20);
      }
    }

    // Toggle reaction on a message
    function toggleReaction(msgId, emoji) {
      const conv = getActiveConv();
      const msgs = state.messages[conv.id] || [];
      const msg = msgs.find(m => m.id === msgId);
      if (!msg || msg.isDeleted) return;

      const currentUser = getCurrentUser();
      if (!msg.reactions) msg.reactions = [];

      const existing = msg.reactions.find(r => r.emoji === emoji);
      if (existing) {
        const uIndex = existing.users.indexOf(currentUser.name);
        if (uIndex > -1) {
          existing.users.splice(uIndex, 1);
          existing.count--;
          if (existing.count <= 0) {
            msg.reactions = msg.reactions.filter(r => r.emoji !== emoji);
          }
        } else {
          existing.users.push(currentUser.name);
          existing.count++;
        }
      } else {
        msg.reactions.push({
          emoji,
          count: 1,
          users: [currentUser.name]
        });
      }

      renderMessages();
    }

    // Pin / unpin message
    function togglePinMessage(msgId) {
      const conv = getActiveConv();
      const msgs = state.messages[conv.id] || [];
      const msg = msgs.find(m => m.id === msgId);
      if (!msg) return;

      msg.isPinned = !msg.isPinned;
      renderActiveConversationHeader();
      renderPinnedBanner();
      renderMessages();
      renderDetailsPanel();

      // Asynchronously fetch latest messages and shared documents from Supabase database
      loadConversationMessages(convId);

      showChatToast(msg.isPinned ? 'Message pinned to conversation' : 'Message unpinned');
    }

    // Start reply to a message
    function startReply(msg) {
      state.replyingTo = msg;
      const bar = document.getElementById('chatReplyBar');
      const authorEl = document.getElementById('chatReplyAuthor');
      const snippetEl = document.getElementById('chatReplySnippet');
      if (bar && authorEl && snippetEl) {
        authorEl.textContent = `Replying to ${msg.senderName}`;
        snippetEl.textContent = msg.content.substring(0, 70);
        bar.style.display = 'flex';
      }
      const input = document.getElementById('chatComposerTextarea');
      if (input) input.focus();
    }

    function hideReplyBar() {
      state.replyingTo = null;
      const bar = document.getElementById('chatReplyBar');
      if (bar) bar.style.display = 'none';
    }

    // Start editing message
    function startEditMessage(msg) {
      const newContent = prompt('Edit your message:', msg.content);
      if (newContent !== null && newContent.trim() && newContent.trim() !== msg.content) {
        msg.content = newContent.trim();
        msg.isEdited = true;
        msg.updatedAt = new Date().toISOString();
        renderMessages();
        showChatToast('Message updated');
      }
    }

    // Confirm delete message modal
    let pendingDeleteMsgId = null;
    function confirmDeleteMessage(msgId) {
      pendingDeleteMsgId = msgId;
      const modal = document.getElementById('chatDeleteModal');
      if (modal) modal.style.display = 'flex';
    }

    function doDeleteMessage() {
      if (!pendingDeleteMsgId) return;
      const conv = getActiveConv();
      const msgs = state.messages[conv.id] || [];
      const msg = msgs.find(m => m.id === pendingDeleteMsgId);
      if (msg) {
        msg.isDeleted = true;
        msg.content = 'This message was deleted';
        msg.attachments = [];
        msg.sharedItem = null;
        renderMessages();
        renderPinnedBanner();
        showChatToast('Message deleted');
      }
      closeDeleteModal();
    }

    function closeDeleteModal() {
      pendingDeleteMsgId = null;
      const modal = document.getElementById('chatDeleteModal');
      if (modal) modal.style.display = 'none';
    }

    // Universal Document & Media Preview
    async function previewDocument(storagePath, fileName, directUrl, mimeType) {
      const fname = fileName || 'document';
      let docUrl = directUrl;

      if ((!docUrl || (!docUrl.startsWith('blob:') && !docUrl.startsWith('data:'))) && storagePath && window.DataLayer) {
        showChatToast(`Opening preview for ${fname}...`);
        try {
          if (typeof window.DataLayer.getChatAttachmentPreviewUrl === 'function') {
            docUrl = await window.DataLayer.getChatAttachmentPreviewUrl(storagePath);
          } else {
            docUrl = await window.DataLayer.getChatAttachmentDownloadUrl(storagePath, fname);
          }
        } catch (e) {
          console.warn('Preview URL resolution error:', e);
        }
      }

      if (!docUrl) {
        showChatToast(`Could not open preview for ${fname}.`);
        return;
      }

      openDocumentPreviewModal(docUrl, fname, mimeType);
    }

    function openDocumentPreviewModal(url, fileName, mimeType) {
      const overlay = document.getElementById('chatLightboxOverlay');
      const imgEl = document.getElementById('chatLightboxImg');
      const iframeEl = document.getElementById('chatPreviewIframe');
      const textWrapEl = document.getElementById('chatPreviewTextWrap');
      const genericWrapEl = document.getElementById('chatPreviewGenericWrap');
      const titleEl = document.getElementById('chatPreviewTitle');
      const badgeEl = document.getElementById('chatPreviewBadge');
      const openExternalBtn = document.getElementById('chatPreviewOpenExternal');
      const downloadBtn = document.getElementById('chatLightboxDownload');

      if (!overlay) return;

      const fname = fileName || 'document';
      const ext = fname.split('.').pop().toLowerCase();

      if (titleEl) titleEl.textContent = fname;
      if (badgeEl) badgeEl.textContent = ext.toUpperCase();
      if (openExternalBtn) openExternalBtn.href = url;
      if (downloadBtn) {
        downloadBtn.href = url;
        downloadBtn.setAttribute('download', fname);
      }

      // Reset all content containers
      if (imgEl) { imgEl.style.display = 'none'; imgEl.src = ''; }
      if (iframeEl) { iframeEl.style.display = 'none'; iframeEl.src = ''; }
      if (textWrapEl) { textWrapEl.style.display = 'none'; textWrapEl.textContent = ''; }
      if (genericWrapEl) { genericWrapEl.style.display = 'none'; }

      const isImg = (mimeType && mimeType.startsWith('image/')) || /^(png|jpe?g|gif|webp|svg)$/i.test(ext);
      const isPdf = (mimeType && mimeType.includes('pdf')) || ext === 'pdf';
      const isText = (mimeType && (mimeType.startsWith('text/') || mimeType.includes('json') || mimeType.includes('javascript'))) || /^(txt|csv|json|md|js|css|html|log|xml)$/i.test(ext);

      if (isImg && imgEl) {
        imgEl.src = url;
        imgEl.alt = fname;
        imgEl.style.display = 'block';
      } else if (isPdf && iframeEl) {
        iframeEl.src = url;
        iframeEl.style.display = 'block';
      } else if (isText && textWrapEl) {
        textWrapEl.style.display = 'block';
        textWrapEl.textContent = 'Loading text preview...';
        fetch(url)
          .then(res => res.text())
          .then(txt => { textWrapEl.textContent = txt.substring(0, 100000); })
          .catch(err => { textWrapEl.textContent = 'Unable to render text preview: ' + err.message; });
      } else if (genericWrapEl) {
        genericWrapEl.style.display = 'block';
        const nameEl = document.getElementById('chatPreviewGenericName');
        if (nameEl) nameEl.textContent = fname;
        const genDl = document.getElementById('chatPreviewGenericDownload');
        if (genDl) {
          genDl.href = url;
          genDl.setAttribute('download', fname);
        }
      }

      overlay.style.display = 'flex';
    }

    // Open Image Lightbox
    function openLightbox(url) {
      openDocumentPreviewModal(url, 'Image Preview', 'image/jpeg');
    }

    function closeLightbox() {
      const overlay = document.getElementById('chatLightboxOverlay');
      if (overlay) {
        overlay.style.display = 'none';
        const imgEl = document.getElementById('chatLightboxImg');
        const iframeEl = document.getElementById('chatPreviewIframe');
        if (imgEl) imgEl.src = '';
        if (iframeEl) iframeEl.src = '';
      }
    }

    // Open shared portal item (Module, JD, FAQ)
    function openSharedPortalItem(type, id) {
      if (type === 'module') {
        const modNum = parseInt(id, 10);
        if (!isNaN(modNum) && typeof selectModule === 'function') {
          selectModule(modNum);
        }
        if (typeof switchScreen === 'function') switchScreen('module');
      } else if (type === 'jd') {
        if (typeof openJdDetailModal === 'function') {
          openJdDetailModal(id);
        }
        if (typeof switchScreen === 'function') switchScreen('jobDescriptions');
      } else if (type === 'faq') {
        if (typeof switchScreen === 'function') switchScreen('module');
        setTimeout(() => {
          const faqSection = document.getElementById('faqsAccordionList');
          if (faqSection) faqSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }

    // Send a message from composer with smooth document uploading & database sync
    async function sendMessage() {
      const textarea = document.getElementById('chatComposerTextarea');
      if (!textarea) return;
      const text = textarea.value.trim();

      if (!text && state.pendingFiles.length === 0) return;

      const conv = getActiveConv();
      const currentUser = getCurrentUser();

      // Check announcement-only
      const isInstructorOrAdmin = currentUser.role === 'instructor' || currentUser.role === 'admin';
      if (conv.isAnnouncementOnly && !isInstructorOrAdmin) {
        alert('This conversation is announcements only. Only instructors can post.');
        return;
      }

      const sendBtn = document.getElementById('chatSendButton');
      const uploadStatus = document.getElementById('chatUploadStatus');
      if (sendBtn) sendBtn.disabled = true;

      const filesToUpload = [...state.pendingFiles];
      const finalAttachments = [];

      // Smooth document uploading to Supabase Storage if files are attached
      if (filesToUpload.length > 0) {
        if (uploadStatus) {
          uploadStatus.style.display = 'flex';
          uploadStatus.textContent = `Uploading ${filesToUpload.length} document(s)...`;
        }
        showChatToast(`Uploading ${filesToUpload.length} document(s)...`);

        for (let i = 0; i < filesToUpload.length; i++) {
          const pf = filesToUpload[i];
          if (uploadStatus) {
            uploadStatus.textContent = `Uploading (${i + 1}/${filesToUpload.length}): ${pf.name}...`;
          }

          if (pf.fileObj && window.DataLayer) {
            try {
              const uploaded = await window.DataLayer.uploadChatAttachment(pf.fileObj, conv.id);
              if (uploaded) {
                finalAttachments.push({
                  name: uploaded.file_name,
                  file_name: uploaded.file_name,
                  size: uploaded.file_size,
                  file_size: uploaded.file_size,
                  type: uploaded.mime_type,
                  mime_type: uploaded.mime_type,
                  storage_path: uploaded.storage_path,
                  public_url: uploaded.file_url,
                  url: uploaded.file_url || pf.url
                });
              } else {
                finalAttachments.push({ ...pf });
              }
            } catch (upErr) {
              console.warn('[TeamChat] Document upload error, falling back to local preview:', upErr);
              finalAttachments.push({ ...pf });
            }
          } else {
            finalAttachments.push({ ...pf });
          }
        }
      }

      if (uploadStatus) {
        uploadStatus.style.display = 'none';
        uploadStatus.textContent = '';
      }
      if (sendBtn) sendBtn.disabled = false;

      // Deduplicate previous failed attempt for the same content
      if (state.messages[conv.id]) {
        state.messages[conv.id] = state.messages[conv.id].filter(m => !(m.receipt === 'Failed' && m.content === text));
      }

      // Create optimistic message object with Sending state
      const tempMsgId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
      const newMsg = {
        id: tempMsgId,
        conversationId: conv.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        senderAvatar: currentUser.avatar,
        content: text,
        parentMessageId: state.replyingTo ? state.replyingTo.id : null,
        isPinned: false,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        receipt: 'Sending',
        reactions: [],
        attachments: finalAttachments
      };

      if (!state.messages[conv.id]) {
        state.messages[conv.id] = [];
      }
      state.messages[conv.id].push(newMsg);
      renderMessages();

      // Persist to Supabase database without silent local fallback
      let dbSuccess = false;
      let dbError = null;
      let saved = null;

      try {
        if (!window.DataLayer || typeof window.DataLayer.sendChatMessage !== 'function') {
          throw new Error('DataLayer.sendChatMessage is unavailable.');
        }

        saved = await window.DataLayer.sendChatMessage({
          conversationId: conv.id,
          content: text,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: currentUser.role,
          senderAvatar: currentUser.avatar,
          parentMessageId: state.replyingTo ? state.replyingTo.id : null,
          sharedItem: null,
          attachments: finalAttachments
        });

        if (!saved || !saved.id) {
          throw new Error('Database returned empty response.');
        }
        dbSuccess = true;
      } catch (dbErr) {
        dbError = dbErr;
        console.error('[TeamChat] Database persistence error:', dbErr);
      }

      if (dbSuccess && saved) {
        newMsg.id = saved.id;
        newMsg.createdAt = saved.created_at || newMsg.createdAt;
        newMsg.receipt = 'Sent';
        delete newMsg.errorMessage;
        if (saved.attachments && saved.attachments.length > 0) {
          newMsg.attachments = saved.attachments;
        }

        // Update conversation metadata
        conv.lastMessage = text.substring(0, 40) || (finalAttachments.length > 0 ? `📎 ${finalAttachments[0].name}` : 'Document');
        conv.unread = 0;

        // Reset composer only after verified DB save
        textarea.value = '';
        state.drafts[conv.id] = '';
        state.pendingFiles = [];
        renderPendingFiles();
        hideReplyBar();
        updateCharCounter();

        // Re-render
        renderMessages();
        renderSidebarLists();
        renderDetailsPanel();

        // Clear typing broadcast if active
        broadcastTyping(false);
      } else {
        // Saving to database failed: do NOT mark as Sent, keep text in box, display "Failed, tap to retry"
        newMsg.receipt = 'Failed';
        newMsg.errorMessage = dbError?.message || 'Database persistence failed';
        textarea.value = text;
        state.drafts[conv.id] = text;
        updateCharCounter();
        renderMessages();
      }
    }

    // Retry sending a message that previously failed persistence
    async function retrySendMessage(msgId) {
      const convMessages = state.messages[conv.id] || [];
      const msg = convMessages.find(m => m.id === msgId);
      if (!msg) return;

      msg.receipt = 'Sending';
      renderMessages();

      try {
        if (!window.DataLayer || typeof window.DataLayer.sendChatMessage !== 'function') {
          throw new Error('DataLayer.sendChatMessage is unavailable.');
        }

        const saved = await window.DataLayer.sendChatMessage({
          conversationId: conv.id,
          content: msg.content,
          senderId: msg.senderId || currentUser.id,
          senderName: msg.senderName || currentUser.name,
          senderRole: msg.senderRole || currentUser.role,
          senderAvatar: msg.senderAvatar || currentUser.avatar,
          parentMessageId: msg.parentMessageId || null,
          sharedItem: null,
          attachments: msg.attachments || []
        });

        if (!saved || !saved.id) {
          throw new Error('Database returned empty response.');
        }

        msg.id = saved.id;
        msg.createdAt = saved.created_at || msg.createdAt;
        msg.receipt = 'Sent';
        delete msg.errorMessage;
        if (saved.attachments && saved.attachments.length > 0) {
          msg.attachments = saved.attachments;
        }

        const textarea = document.getElementById('chatComposerTextarea');
        if (textarea && textarea.value === msg.content) {
          textarea.value = '';
          state.drafts[conv.id] = '';
          updateCharCounter();
        }

        conv.lastMessage = msg.content.substring(0, 40) || 'Message';
        renderMessages();
        renderSidebarLists();
        renderDetailsPanel();
      } catch (retryErr) {
        console.error('[TeamChat] Database persistence error (retry failed):', retryErr);
        msg.receipt = 'Failed';
        msg.errorMessage = retryErr?.message || 'Database persistence failed';
        renderMessages();
      }
    }

    // Character counter
    function updateCharCounter() {
      const textarea = document.getElementById('chatComposerTextarea');
      const counter = document.getElementById('chatCharCounter');
      if (textarea && counter) {
        const count = textarea.value.length;
        counter.textContent = `${count} / 2000`;
        counter.style.color = count > 1900 ? '#ef4444' : 'var(--chat-text-dim)';
      }
    }

    // Formatting buttons action
    function applyFormatting(formatKey) {
      const textarea = document.getElementById('chatComposerTextarea');
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.substring(start, end);
      let before = textarea.value.substring(0, start);
      let after = textarea.value.substring(end);
      let replacement = '';

      if (formatKey === 'bold') {
        replacement = `**${selected || 'bold text'}**`;
      } else if (formatKey === 'italic') {
        replacement = `_${selected || 'italic text'}_`;
      } else if (formatKey === 'strike') {
        replacement = `~~${selected || 'strikethrough'}~~`;
      } else if (formatKey === 'bullet') {
        replacement = `\n• ${selected || 'List item'}`;
      } else if (formatKey === 'code') {
        replacement = `\`${selected || 'code snippet'}\``;
      } else if (formatKey === 'link') {
        const url = prompt('Enter link URL (https://...):', 'https://');
        if (url) {
          replacement = `[${selected || 'link text'}](${url})`;
        } else {
          return;
        }
      }

      textarea.value = before + replacement + after;
      updateCharCounter();
      textarea.focus();
    }

    // Pending file attachments in composer (Smooth documents & media uploading)
    function handleFileInput(files) {
      if (!files || files.length === 0) return;
      if (state.pendingFiles.length + files.length > 5) {
        alert('You can attach a maximum of 5 files per message.');
        return;
      }

      Array.from(files).forEach(file => {
        if (file.size > 50 * 1024 * 1024) {
          alert(`File "${file.name}" exceeds the 50 MB limit.`);
          return;
        }

        // Read as Data URL for local preview and preserve raw file object for upload
        const reader = new FileReader();
        reader.onload = (e) => {
          state.pendingFiles.push({
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            url: e.target.result,
            fileObj: file
          });
          renderPendingFiles();
        };
        reader.readAsDataURL(file);
      });
    }

    function renderPendingFiles() {
      const container = document.getElementById('chatPendingFiles');
      if (!container) return;

      if (state.pendingFiles.length === 0) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
      }

      container.style.display = 'flex';
      container.innerHTML = '';
      state.pendingFiles.forEach((file, idx) => {
        const pill = document.createElement('div');
        pill.className = 'pending-file-pill';
        pill.innerHTML = `
        <span>📎 ${escapeHtml(file.name)}</span>
        <button type="button" class="pending-file-remove" data-remove-idx="${idx}">&times;</button>
      `;
        pill.querySelector('.pending-file-remove').addEventListener('click', () => {
          state.pendingFiles.splice(idx, 1);
          renderPendingFiles();
        });
        container.appendChild(pill);
      });
    }

    // Mentions Autocomplete
    function handleMentionsInput(e) {
      const textarea = e.target;
      const text = textarea.value;
      const cursorPos = textarea.selectionStart;
      const lastAtPos = text.lastIndexOf('@', cursorPos - 1);

      const menu = document.getElementById('chatMentionsMenu');
      if (!menu) return;

      if (lastAtPos !== -1 && (lastAtPos === 0 || /\s/.test(text[lastAtPos - 1]))) {
        const query = text.substring(lastAtPos + 1, cursorPos).toLowerCase();
        const currentUser = getCurrentUser();
        const isInstructorOrAdmin = currentUser.role === 'instructor' || currentUser.role === 'admin';

        const candidates = [];
        if (isInstructorOrAdmin) {
          if ('everyone'.startsWith(query)) candidates.push({ id: 'everyone', name: 'everyone', role: 'All members' });
          if ('instructors'.startsWith(query)) candidates.push({ id: 'instructors', name: 'instructors', role: 'All instructors' });
        }

        state.members.forEach(m => {
          if (m.name.toLowerCase().includes(query)) {
            candidates.push(m);
          }
        });

        if (candidates.length > 0) {
          menu.style.display = 'block';
          menu.innerHTML = '';
          candidates.slice(0, 6).forEach((cand, cIdx) => {
            const item = document.createElement('div');
            item.className = `mention-menu-item ${cIdx === 0 ? 'selected' : ''}`;
            item.innerHTML = `
            <strong>@${escapeHtml(cand.name)}</strong>
            <small style="color: var(--chat-text-dim); margin-left: auto;">${cand.role}</small>
          `;
            item.addEventListener('click', () => {
              const before = text.substring(0, lastAtPos);
              const after = text.substring(cursorPos);
              textarea.value = `${before}@${cand.name} ${after}`;
              menu.style.display = 'none';
              textarea.focus();
              updateCharCounter();
            });
            menu.appendChild(item);
          });
          return;
        }
      }
      menu.style.display = 'none';
    }

    // Emoji Popover
    const POPULAR_EMOJIS = ['👍', '❤️', '😂', '🎉', '🔥', '🚀', '💡', '🙌', '✅', '👏', '👀', '💯', '🤝', '⭐', '🎯', '🙏', '✨', '💪', '😊', '🤔', '👋', '🥳', '👌', '⚡'];
    function initEmojiPopover() {
      const grid = document.getElementById('chatEmojiGrid');
      const popover = document.getElementById('chatEmojiPopover');
      const triggerBtn = document.getElementById('chatEmojiTriggerBtn');
      const closeBtn = document.getElementById('chatEmojiPopoverClose');
      if (!grid || !popover || !triggerBtn) return;

      grid.innerHTML = '';
      POPULAR_EMOJIS.forEach(emoji => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'emoji-btn';
        btn.textContent = emoji;
        btn.addEventListener('click', () => {
          insertEmoji(emoji);
          popover.style.display = 'none';
        });
        grid.appendChild(btn);
      });

      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.style.display = popover.style.display === 'none' ? 'flex' : 'none';
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          popover.style.display = 'none';
        });
      }

      document.addEventListener('click', (e) => {
        if (!popover.contains(e.target) && e.target !== triggerBtn) {
          popover.style.display = 'none';
        }
      });
    }

    function insertEmoji(emoji) {
      const textarea = document.getElementById('chatComposerTextarea');
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      textarea.value = text.substring(0, start) + emoji + text.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      textarea.focus();
      updateCharCounter();
    }

    // Typing indicator broadcast
    let typingTimeout = null;
    function handleTyping() {
      broadcastTyping(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        broadcastTyping(false);
      }, 3000);
    }

    function broadcastTyping(isTyping) {
      // If Supabase channel is active, we broadcast typing presence
      if (state.supabaseChannel && typeof state.supabaseChannel.send === 'function') {
        try {
          state.supabaseChannel.send({
            type: 'broadcast',
            event: 'typing',
            payload: {
              convId: state.activeConvId,
              user: getCurrentUser().name,
              isTyping
            }
          });
        } catch (e) {
          // silent fallback
        }
      }
    }

    // Render Details Panel (Right ~280px)
    function renderDetailsPanel() {
      const conv = getActiveConv();
      if (!conv) return;

      // Profile card for 1:1 DMs
      const profileCard = document.getElementById('chatDetailsProfileCard');
      const channelCard = document.getElementById('chatDetailsChannelCard');
      const descEl = document.getElementById('detailsChannelDesc');
      const announcementToggleRow = document.getElementById('detailsAnnouncementToggleRow');
      const announcementToggle = document.getElementById('detailsAnnouncementToggle');

      // Notifications & Mute synchronization for active conversation
      const muteSelect = document.getElementById('detailsMuteSelect');
      const notifySelect = document.getElementById('detailsNotifyPrefSelect');
      const dndToggle = document.getElementById('detailsGlobalDndToggle');

      if (muteSelect) {
        muteSelect.value = conv.mute || 'off';
        muteSelect.onchange = () => {
          conv.mute = muteSelect.value;
          showChatToast(conv.mute === 'off' ? 'Conversation unmuted' : `Conversation muted: ${muteSelect.options[muteSelect.selectedIndex].text}`);
        };
      }

      if (notifySelect) {
        notifySelect.value = conv.notifyLevel || 'all';
        notifySelect.onchange = () => {
          conv.notifyLevel = notifySelect.value;
          showChatToast(`Notification level set to ${notifySelect.options[notifySelect.selectedIndex].text}`);
        };
      }

      if (dndToggle) {
        dndToggle.checked = !!state.dndEnabled;
        dndToggle.onchange = () => {
          state.dndEnabled = dndToggle.checked;
          localStorage.setItem('chat_dnd_enabled', state.dndEnabled ? 'true' : 'false');
          showChatToast(state.dndEnabled ? 'Do Not Disturb (DND) turned ON' : 'Do Not Disturb turned OFF');
        };
      }

      if (conv.type === 'direct') {
        const member = state.members.find(m => m.id === conv.recipientId);
        if (profileCard && member) {
          profileCard.style.display = 'block';
          document.getElementById('detailsProfileAvatar').textContent = member.avatar;
          document.getElementById('detailsProfileName').textContent = member.name;
          document.getElementById('detailsProfileRole').textContent = member.role.toUpperCase();
          document.getElementById('detailsProfileRole').className = `details-profile-role-badge ${member.role}`;
          document.getElementById('detailsProfileEmail').textContent = member.email;
          document.getElementById('detailsProfileStatus').textContent = member.lastSeen;
          const pip = document.getElementById('detailsProfilePip');
          if (pip) pip.className = `details-profile-pip ${member.online ? 'online' : 'offline'}`;
        }
        if (channelCard) channelCard.style.display = 'none';
      } else {
        if (profileCard) profileCard.style.display = 'none';
        if (channelCard) {
          channelCard.style.display = 'block';
          if (descEl) descEl.textContent = conv.description || 'No description provided.';
          const currentUser = getCurrentUser();
          const canManage = currentUser.role === 'instructor' || currentUser.role === 'admin';
          if (announcementToggleRow && announcementToggle) {
            if (canManage && (conv.type === 'channel' || conv.type === 'all_members')) {
              announcementToggleRow.style.display = 'flex';
              announcementToggle.checked = !!conv.isAnnouncementOnly;
              announcementToggle.onchange = () => {
                conv.isAnnouncementOnly = announcementToggle.checked;
                renderActiveConversationHeader();
                showChatToast(conv.isAnnouncementOnly ? 'Announcements only enabled' : 'Announcements only disabled');
              };
            } else {
              announcementToggleRow.style.display = 'none';
            }
          }
        }
      }

      // Pinned messages list in details
      const msgs = state.messages[conv.id] || [];
      const pinned = msgs.filter(m => m.isPinned && !m.isDeleted);
      const pinnedCountEl = document.getElementById('detailsPinnedCount');
      const pinnedListEl = document.getElementById('detailsPinnedList');
      if (pinnedCountEl) pinnedCountEl.textContent = pinned.length;
      if (pinnedListEl) {
        if (pinned.length === 0) {
          pinnedListEl.innerHTML = '<div class="details-empty-note">No pinned messages yet</div>';
        } else {
          pinnedListEl.innerHTML = '';
          pinned.forEach(p => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
            <span style="font-size: 13px;">📌</span>
            <div class="search-result-meta">
              <span class="search-result-title">${escapeHtml(p.senderName)}</span>
              <span class="search-result-snippet">${escapeHtml(p.content.substring(0, 50))}</span>
            </div>
          `;
            item.addEventListener('click', () => {
              scrollToMessage(p.id);
            });
            pinnedListEl.appendChild(item);
          });
        }
      }

      // Shared files list in details
      const allFiles = [];
      msgs.forEach(m => {
        if (m.attachments) {
          m.attachments.forEach(att => allFiles.push({ ...att, msgId: m.id }));
        }
      });
      const filesCountEl = document.getElementById('detailsFilesCount');
      const filesListEl = document.getElementById('detailsFilesList');
      if (filesCountEl) filesCountEl.textContent = allFiles.length;
      if (filesListEl) {
        if (allFiles.length === 0) {
          filesListEl.innerHTML = '<div class="details-empty-note">No shared files in this conversation</div>';
        } else {
          filesListEl.innerHTML = '';
          allFiles.forEach(f => {
            const item = document.createElement('a');
            item.href = f.url;
            item.target = '_blank';
            item.rel = 'noopener';
            item.className = 'chat-file-chip';
            item.innerHTML = `
            <span class="chat-file-ext-badge">${f.name.split('.').pop().toUpperCase()}</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">${escapeHtml(f.name)}</span>
          `;
            filesListEl.appendChild(item);
          });
        }
      }

      // Members list in details
      const membersCard = document.getElementById('chatDetailsMembersCard');
      const membersCountEl = document.getElementById('detailsMembersCount');
      const membersListEl = document.getElementById('detailsMembersList');
      const addMemberBtn = document.getElementById('detailsAddMemberBtn');
      const leaveGroupWrap = document.getElementById('detailsLeaveGroupWrap');

      if (conv.type === 'direct') {
        if (membersCard) membersCard.style.display = 'none';
      } else {
        if (membersCard) membersCard.style.display = 'block';
        let convMembers = state.members;
        if (conv.type === 'group' && conv.members) {
          convMembers = state.members.filter(m => conv.members.includes(m.id));
        }

        // Sort online first
        const sortedMembers = [...convMembers].sort((a, b) => (b.online ? 1 : 0) - (a.online ? 1 : 0));

        if (membersCountEl) membersCountEl.textContent = sortedMembers.length;
        if (membersListEl) {
          membersListEl.innerHTML = '';
          sortedMembers.forEach(mem => {
            const row = document.createElement('div');
            row.className = 'details-member-row';
            row.innerHTML = `
            <div class="details-member-avatar">
              ${mem.avatar}
              <span class="details-member-pip ${mem.online ? 'online' : 'offline'}"></span>
            </div>
            <div class="details-member-info">
              <div class="details-member-name">${escapeHtml(mem.name)}</div>
              <div class="details-member-lastseen">${mem.online ? 'Active now' : mem.lastSeen}</div>
            </div>
            <span class="chat-role-badge ${mem.role}" style="font-size: 9px;">${mem.role}</span>
          `;
            membersListEl.appendChild(row);
          });
        }

        // Group controls
        if (addMemberBtn) {
          addMemberBtn.style.display = conv.type === 'group' ? 'inline-block' : 'none';
          addMemberBtn.onclick = () => {
            openAddMemberModal();
          };
        }
        if (leaveGroupWrap) {
          leaveGroupWrap.style.display = conv.type === 'group' ? 'block' : 'none';
          const leaveBtn = document.getElementById('detailsLeaveGroupBtn');
          if (leaveBtn) {
            leaveBtn.onclick = () => {
              if (confirm(`Are you sure you want to leave "${conv.name}"?`)) {
                handleLeaveGroup(conv);
              }
            };
          }
        }
      }
    }

    // Thread Drawer Implementation
    function openThread(parentMsg) {
      state.activeThreadMsg = parentMsg;
      const drawer = document.getElementById('chatThreadDrawer');
      const parentBox = document.getElementById('chatThreadParentBox');
      const stream = document.getElementById('chatThreadStream');
      if (!drawer || !parentBox || !stream) return;

      parentBox.innerHTML = `
      <div style="font-weight: 700; font-size: 13px; color: var(--chat-text); margin-bottom: 4px;">
        ${escapeHtml(parentMsg.senderName)}
        <span class="chat-role-badge ${parentMsg.senderRole}" style="margin-left: 6px;">${parentMsg.senderRole}</span>
      </div>
      <div style="font-size: 13px; color: var(--chat-text); line-height: 1.5;">${parseMarkdown(parentMsg.content)}</div>
    `;

      renderThreadReplies();
      drawer.style.display = 'flex';
    }

    function closeThread() {
      state.activeThreadMsg = null;
      const drawer = document.getElementById('chatThreadDrawer');
      if (drawer) drawer.style.display = 'none';
    }

    function renderThreadReplies() {
      if (!state.activeThreadMsg) return;
      const stream = document.getElementById('chatThreadStream');
      if (!stream) return;

      const conv = getActiveConv();
      const allMsgs = state.messages[conv.id] || [];
      const replies = allMsgs.filter(m => m.parentMessageId === state.activeThreadMsg.id);

      stream.innerHTML = '';
      if (replies.length === 0) {
        stream.innerHTML = '<div style="font-size: 12px; color: var(--chat-text-dim); text-align: center; padding: 20px 0;">No thread replies yet. Be the first to reply!</div>';
        return;
      }

      replies.forEach(rep => {
        const repEl = document.createElement('div');
        repEl.className = 'chat-bubble-card';
        repEl.style.maxWidth = '100%';
        repEl.style.background = 'var(--chat-bg-surface)';
        repEl.style.border = '1px solid var(--chat-border)';
        repEl.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <strong style="font-size: 12px; color: var(--chat-text);">${escapeHtml(rep.senderName)}</strong>
          <span style="font-size: 10px; color: var(--chat-text-dim);">${formatTimestamp(rep.createdAt)}</span>
        </div>
        <div style="font-size: 13px; line-height: 1.4;">${parseMarkdown(rep.content)}</div>
      `;
        stream.appendChild(repEl);
      });
    }

    function sendThreadReply() {
      const input = document.getElementById('chatThreadInput');
      if (!input || !state.activeThreadMsg) return;
      const text = input.value.trim();
      if (!text) return;

      const conv = getActiveConv();
      const currentUser = getCurrentUser();

      const replyMsg = {
        id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        conversationId: conv.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        senderAvatar: currentUser.avatar,
        content: text,
        parentMessageId: state.activeThreadMsg.id,
        isPinned: false,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        receipt: 'Sent',
        reactions: []
      };

      if (!state.messages[conv.id]) state.messages[conv.id] = [];
      state.messages[conv.id].push(replyMsg);

      input.value = '';
      renderThreadReplies();
      renderMessages();
    }

    // In-Conversation Search
    function toggleInConvSearch() {
      const bar = document.getElementById('chatInConvSearchBar');
      if (!bar) return;

      if (bar.style.display === 'none') {
        bar.style.display = 'flex';
        const input = document.getElementById('chatInConvInput');
        if (input) {
          input.value = '';
          input.focus();
        }
      } else {
        closeInConvSearch();
      }
    }

    function closeInConvSearch() {
      const bar = document.getElementById('chatInConvSearchBar');
      if (bar) bar.style.display = 'none';
      state.inConvSearch = { query: '', matches: [], curIndex: -1 };
      clearSearchHighlights();
    }

    function handleInConvSearch(query) {
      state.inConvSearch.query = query.trim().toLowerCase();
      state.inConvSearch.matches = [];
      state.inConvSearch.curIndex = -1;

      clearSearchHighlights();
      const countEl = document.getElementById('chatInConvCount');

      if (!state.inConvSearch.query) {
        if (countEl) countEl.textContent = '0 results';
        return;
      }

      const conv = getActiveConv();
      const msgs = state.messages[conv.id] || [];
      msgs.forEach(m => {
        if (m.content.toLowerCase().includes(state.inConvSearch.query)) {
          state.inConvSearch.matches.push(m.id);
        }
      });

      if (countEl) {
        countEl.textContent = `${state.inConvSearch.matches.length} result${state.inConvSearch.matches.length === 1 ? '' : 's'}`;
      }

      if (state.inConvSearch.matches.length > 0) {
        navigateInConvMatch(0);
      }
    }

    function navigateInConvMatch(index) {
      if (state.inConvSearch.matches.length === 0) return;
      if (index < 0) index = state.inConvSearch.matches.length - 1;
      if (index >= state.inConvSearch.matches.length) index = 0;

      state.inConvSearch.curIndex = index;
      const targetMsgId = state.inConvSearch.matches[index];
      scrollToMessage(targetMsgId);

      const countEl = document.getElementById('chatInConvCount');
      if (countEl) {
        countEl.textContent = `${index + 1} of ${state.inConvSearch.matches.length}`;
      }
    }

    function clearSearchHighlights() {
      document.querySelectorAll('.chat-msg-row').forEach(row => {
        row.style.backgroundColor = '';
      });
    }

    // Global Sidebar Search (People, Channels, Messages)
    function handleGlobalSearch(query) {
      const dropdown = document.getElementById('chatSearchDropdown');
      const list = document.getElementById('chatSearchResultsList');
      const clearBtn = document.getElementById('chatGlobalSearchClear');
      if (!dropdown || !list) return;

      const q = query.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

      if (!q) {
        dropdown.style.display = 'none';
        return;
      }

      dropdown.style.display = 'block';
      list.innerHTML = '';

      // 1. People
      const peopleMatches = state.members.filter(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
      // 2. Channels & Conversations
      const convMatches = state.conversations.filter(c => c.name.toLowerCase().includes(q));
      // 3. Messages across conversations
      const msgMatches = [];
      Object.keys(state.messages).forEach(cid => {
        const conv = state.conversations.find(c => c.id === cid);
        (state.messages[cid] || []).forEach(m => {
          if (!m.isDeleted && m.content.toLowerCase().includes(q)) {
            msgMatches.push({ ...m, convName: conv ? conv.name : cid });
          }
        });
      });

      if (peopleMatches.length === 0 && convMatches.length === 0 && msgMatches.length === 0) {
        list.innerHTML = `<div style="text-align: center; padding: 20px 10px; color: var(--chat-text-dim); font-size: 13px;">No results found for "${escapeHtml(q)}"</div>`;
        return;
      }

      // People Group
      if (peopleMatches.length > 0) {
        const header = document.createElement('div');
        header.className = 'search-group-header';
        header.textContent = 'PEOPLE';
        list.appendChild(header);

        peopleMatches.forEach(p => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `
          <div class="chat-conv-item-avatar" style="width: 28px; height: 28px; font-size: 11px;">${p.avatar}</div>
          <div class="search-result-meta">
            <span class="search-result-title">${escapeHtml(p.name)}</span>
            <span class="search-result-snippet">${escapeHtml(p.email)}</span>
          </div>
        `;
          item.addEventListener('click', () => {
            dropdown.style.display = 'none';
            document.getElementById('chatGlobalSearchInput').value = '';
            startOrOpenDirectChat(p.id);
          });
          list.appendChild(item);
        });
      }

      // Channels Group
      if (convMatches.length > 0) {
        const header = document.createElement('div');
        header.className = 'search-group-header';
        header.textContent = 'CONVERSATIONS';
        list.appendChild(header);

        convMatches.forEach(c => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `
          <span style="font-size: 14px;">💬</span>
          <div class="search-result-meta">
            <span class="search-result-title">${escapeHtml(c.name)}</span>
            <span class="search-result-snippet">${escapeHtml(c.description || '')}</span>
          </div>
        `;
          item.addEventListener('click', () => {
            dropdown.style.display = 'none';
            document.getElementById('chatGlobalSearchInput').value = '';
            selectConversation(c.id);
          });
          list.appendChild(item);
        });
      }

      // Messages Group
      if (msgMatches.length > 0) {
        const header = document.createElement('div');
        header.className = 'search-group-header';
        header.textContent = 'MESSAGES';
        list.appendChild(header);

        msgMatches.slice(0, 8).forEach(m => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `
          <span style="font-size: 13px;">💬</span>
          <div class="search-result-meta">
            <span class="search-result-title">${escapeHtml(m.senderName)} <small style="color: var(--chat-text-dim);">in ${escapeHtml(m.convName)}</small></span>
            <span class="search-result-snippet">${escapeHtml(m.content.substring(0, 50))}</span>
          </div>
        `;
          item.addEventListener('click', () => {
            dropdown.style.display = 'none';
            document.getElementById('chatGlobalSearchInput').value = '';
            selectConversation(m.conversationId);
            setTimeout(() => {
              scrollToMessage(m.id);
            }, 200);
          });
          list.appendChild(item);
        });
      }
    }

    // Start or open direct 1:1 chat (reuses existing if available)
    function startOrOpenDirectChat(userId) {
      const existing = state.conversations.find(c => c.type === 'direct' && c.recipientId === userId);
      if (existing) {
        selectConversation(existing.id);
        return;
      }

      const member = state.members.find(m => m.id === userId);
      if (!member) return;

      const newId = `dm-${userId}`;
      state.conversations.push({
        id: newId,
        type: 'direct',
        name: member.name,
        recipientId: member.id,
        description: `${member.role.toUpperCase()} • ${member.email}`,
        unread: 0,
        hasMention: false,
        lastMessage: 'Conversation started'
      });
      state.messages[newId] = [];

      renderSidebarLists();
      selectConversation(newId);
    }


    // ==========================================
    // ADD MEMBERS TO GROUP MODAL IMPLEMENTATION
    // ==========================================
    const selectedNewMembersToAdd = new Set();

    function openAddMemberModal() {
      const conv = getActiveConv();
      if (!conv || conv.type !== 'group') return;

      const modal = document.getElementById('chatAddMemberModal');
      const searchInput = document.getElementById('chatAddMemberSearchInput');
      const titleEl = document.getElementById('chatAddMemberModalTitle');
      if (!modal) return;

      selectedNewMembersToAdd.clear();
      if (searchInput) searchInput.value = '';
      if (titleEl) titleEl.textContent = `Add Members to "${conv.name}"`;

      renderAddMembersPicker('');
      modal.style.display = 'flex';
    }

    function closeAddMemberModal() {
      const modal = document.getElementById('chatAddMemberModal');
      if (modal) modal.style.display = 'none';
      selectedNewMembersToAdd.clear();
    }

    function renderAddMembersPicker(query = '') {
      const conv = getActiveConv();
      if (!conv) return;

      const list = document.getElementById('chatAddMemberUserList');
      const chipsContainer = document.getElementById('chatAddMemberSelectedChips');
      const confirmBtn = document.getElementById('confirmChatAddMemberBtn');
      if (!list) return;

      const existingIds = new Set(conv.members || []);
      const q = (query || '').trim().toLowerCase();
      const available = (state.members || []).filter(m => !existingIds.has(m.id) && (m.name.toLowerCase().includes(q) || (m.email || '').toLowerCase().includes(q)));

      if (chipsContainer) {
        chipsContainer.innerHTML = '';
        Array.from(selectedNewMembersToAdd).forEach(id => {
          const mem = (state.members || []).find(m => m.id === id);
          if (!mem) return;
          const chip = document.createElement('span');
          chip.className = 'selected-member-chip';
          chip.style.cssText = 'background: rgba(0, 165, 68, 0.15); border: 1px solid rgba(0, 165, 68, 0.35); color: #00a544; padding: 3px 8px; border-radius: 12px; font-size: 11.5px; display: inline-flex; align-items: center; gap: 6px;';
          chip.innerHTML = `${escapeHtml(mem.name)} <span class="chip-remove" style="cursor: pointer; font-weight: 700;">&times;</span>`;
          chip.querySelector('.chip-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            selectedNewMembersToAdd.delete(mem.id);
            renderAddMembersPicker(query);
          });
          chipsContainer.appendChild(chip);
        });
      }

      if (confirmBtn) {
        confirmBtn.disabled = selectedNewMembersToAdd.size === 0;
      }

      list.innerHTML = '';
      if (available.length === 0) {
        list.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--chat-text-muted); font-size: 13px;">No additional members available to add.</div>`;
        return;
      }

      available.forEach(m => {
        const isSelected = selectedNewMembersToAdd.has(m.id);
        const item = document.createElement('div');
        item.className = `user-picker-item ${isSelected ? 'selected' : ''}`;
        item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" ${isSelected ? 'checked' : ''} style="accent-color: var(--chat-accent); pointer-events: none;">
          <div>
            <div style="font-weight: 600; font-size: 13px; color: var(--chat-text);">${escapeHtml(m.name)}</div>
            <div style="font-size: 11px; color: var(--chat-text-muted);">${escapeHtml(m.email || '')}</div>
          </div>
        </div>
        <span class="chat-role-badge ${m.role}">${m.role}</span>
      `;
        item.addEventListener('click', () => {
          if (isSelected) {
            selectedNewMembersToAdd.delete(m.id);
          } else {
            selectedNewMembersToAdd.add(m.id);
          }
          renderAddMembersPicker(query);
        });
        list.appendChild(item);
      });
    }

    function confirmAddMembersToGroup() {
      const conv = getActiveConv();
      if (!conv || conv.type !== 'group' || selectedNewMembersToAdd.size === 0) return;

      if (!Array.isArray(conv.members)) conv.members = [];
      const addedNames = [];

      selectedNewMembersToAdd.forEach(id => {
        if (!conv.members.includes(id)) {
          conv.members.push(id);
          const mem = (state.members || []).find(m => m.id === id);
          if (mem) addedNames.push(mem.name);
        }
      });

      conv.memberCount = conv.members.length;

      const currentUser = getCurrentUser();
      const newMsg = {
        id: 'msg-' + Date.now(),
        conversationId: conv.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        senderAvatar: currentUser.avatar,
        content: `Added **${addedNames.join(', ')}** to the group.`,
        isPinned: false,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        receipt: 'Sent',
        reactions: []
      };

      if (!state.messages[conv.id]) state.messages[conv.id] = [];
      state.messages[conv.id].push(newMsg);

      closeAddMemberModal();
      renderConversationStream(conv.id);
      renderActiveConversationHeader();
      renderDetailsPanel();
      renderSidebarLists();
      showChatToast(`Added ${addedNames.length} member(s) to "${conv.name}"`);
    }

    function handleLeaveGroup(conv) {
      const currentUser = getCurrentUser();
      if (!Array.isArray(conv.members)) return;
      conv.members = conv.members.filter(id => id !== currentUser.id);
      conv.memberCount = conv.members.length;

      const leaveMsg = {
        id: 'msg-' + Date.now(),
        conversationId: conv.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        senderAvatar: currentUser.avatar,
        content: `*${currentUser.name} left the group.*`,
        isPinned: false,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        receipt: 'Sent',
        reactions: []
      };
      if (!state.messages[conv.id]) state.messages[conv.id] = [];
      state.messages[conv.id].push(leaveMsg);

      showChatToast(`You left "${conv.name}"`);
      // Switch to all-members or general
      const defaultConv = state.conversations.find(c => c.type === 'all_members') || state.conversations[0];
      if (defaultConv) {
        selectConversation(defaultConv.id);
      }
      renderSidebarLists();
    }

    // New Chat Modal & Tabs
    function initNewChatModal() {
      const modal = document.getElementById('chatNewModal');
      const openBtn = document.getElementById('chatNewChatBtn');
      const closeBtn = document.getElementById('closeChatNewModalBtn');
      const tabs = document.querySelectorAll('.chat-modal-tab');
      if (!modal || !openBtn) return;

      openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        renderDirectPicker();
        renderGroupPicker();
        checkChannelTabPermission();
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      }

      const cancelGroupBtn = document.getElementById('cancelChatGroupBtn');
      if (cancelGroupBtn) {
        cancelGroupBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      }

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });

      // Modal Tabs switching
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const target = tab.getAttribute('data-tab');

          ['chatPaneDirect', 'chatPaneGroup'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
          });

          if (target === 'direct') document.getElementById('chatPaneDirect').style.display = 'block';
          if (target === 'group') document.getElementById('chatPaneGroup').style.display = 'block';

        });
      });

      // Quick add channel button in left sidebar
      const quickAddBtn = document.getElementById('chatQuickAddChannelBtn');
      if (quickAddBtn) {
        quickAddBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          modal.style.display = 'flex';
          const channelTab = document.getElementById('chatTabChannelBtn');
          if (channelTab) channelTab.click();
        });
      }

      // Group creation logic
      const createGroupBtn = document.getElementById('createChatGroupBtn');
      if (createGroupBtn) {
        createGroupBtn.addEventListener('click', createGroupFromModal);
      }

      // Channel creation logic
      const createChannelBtn = document.getElementById('createChatChannelBtn');
      if (createChannelBtn) {
        createChannelBtn.addEventListener('click', createChannelFromModal);
      }

      // Add Member to Group modal event bindings
      const closeAddMemBtn = document.getElementById('closeChatAddMemberModalBtn');
      const cancelAddMemBtn = document.getElementById('cancelChatAddMemberBtn');
      const confirmAddMemBtn = document.getElementById('confirmChatAddMemberBtn');
      const addMemSearchInput = document.getElementById('chatAddMemberSearchInput');

      if (closeAddMemBtn) closeAddMemBtn.addEventListener('click', closeAddMemberModal);
      if (cancelAddMemBtn) cancelAddMemBtn.addEventListener('click', closeAddMemberModal);
      if (confirmAddMemBtn) confirmAddMemBtn.addEventListener('click', confirmAddMembersToGroup);
      if (addMemSearchInput) {
        addMemSearchInput.addEventListener('input', (e) => {
          renderAddMembersPicker(e.target.value);
        });
      }
    }

    function checkChannelTabPermission() {
      const channelTab = document.getElementById('chatTabChannelBtn');
      const currentUser = getCurrentUser();
      const canCreate = currentUser.role === 'instructor' || currentUser.role === 'admin';
      if (channelTab) {
        channelTab.style.display = canCreate ? 'inline-block' : 'none';
      }
    }

    function renderDirectPicker(query = '') {
      const list = document.getElementById('chatDirectUserList');
      const input = document.getElementById('chatDirectSearchInput');
      if (!list) return;

      if (input && !input.oninput) {
        input.oninput = (e) => renderDirectPicker(e.target.value);
      }

      const q = query.trim().toLowerCase();
      const currentUser = getCurrentUser();
      const filtered = state.members.filter(m => m.id !== currentUser.id && (m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)));

      list.innerHTML = '';
      filtered.forEach(m => {
        const item = document.createElement('div');
        item.className = 'user-picker-item';
        item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="chat-conv-item-avatar" style="width: 32px; height: 32px; font-size: 12px;">${m.avatar}</div>
          <div>
            <div style="font-weight: 600; font-size: 13px; color: var(--chat-text);">${escapeHtml(m.name)}</div>
            <div style="font-size: 11px; color: var(--chat-text-muted);">${escapeHtml(m.email)}</div>
          </div>
        </div>
        <span class="chat-role-badge ${m.role}">${m.role}</span>
      `;
        item.addEventListener('click', () => {
          document.getElementById('chatNewModal').style.display = 'none';
          startOrOpenDirectChat(m.id);
        });
        list.appendChild(item);
      });
    }

    const selectedGroupMembers = new Set();
    function renderGroupPicker(query = '') {
      const list = document.getElementById('chatGroupUserList');
      const chips = document.getElementById('chatGroupSelectedChips');
      const input = document.getElementById('chatGroupSearchInput');
      if (!list || !chips) return;

      if (input && !input.oninput) {
        input.oninput = (e) => renderGroupPicker(e.target.value);
      }

      // Render chips
      chips.innerHTML = '';
      selectedGroupMembers.forEach(uid => {
        const mem = state.members.find(m => m.id === uid);
        if (!mem) return;
        const chip = document.createElement('div');
        chip.className = 'member-chip';
        chip.innerHTML = `
        <span>${escapeHtml(mem.name)}</span>
        <span class="member-chip-remove" data-remove-id="${uid}">&times;</span>
      `;
        chip.querySelector('.member-chip-remove').onclick = () => {
          selectedGroupMembers.delete(uid);
          renderGroupPicker(input ? input.value : '');
        };
        chips.appendChild(chip);
      });

      // Render candidate list
      const q = query.trim().toLowerCase();
      const currentUser = getCurrentUser();
      const filtered = state.members.filter(m => m.id !== currentUser.id && (m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)));

      list.innerHTML = '';
      filtered.forEach(m => {
        const isSelected = selectedGroupMembers.has(m.id);
        const item = document.createElement('div');
        item.className = `user-picker-item ${isSelected ? 'selected' : ''}`;
        item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" ${isSelected ? 'checked' : ''} style="accent-color: var(--chat-accent);">
          <div>
            <div style="font-weight: 600; font-size: 13px; color: var(--chat-text);">${escapeHtml(m.name)}</div>
            <div style="font-size: 11px; color: var(--chat-text-muted);">${escapeHtml(m.email)}</div>
          </div>
        </div>
        <span class="chat-role-badge ${m.role}">${m.role}</span>
      `;
        item.addEventListener('click', () => {
          if (isSelected) {
            selectedGroupMembers.delete(m.id);
          } else {
            selectedGroupMembers.add(m.id);
          }
          renderGroupPicker(input ? input.value : '');
        });
        list.appendChild(item);
      });
    }

    function createGroupFromModal() {
      const nameInput = document.getElementById('chatGroupNameInput');
      if (!nameInput) return;
      const name = nameInput.value.trim();
      if (!name) {
        alert('Please enter a group name.');
        return;
      }
      if (selectedGroupMembers.size < 2) {
        alert('Please select at least 2 members for a group chat.');
        return;
      }

      const currentUser = getCurrentUser();
      const membersArr = [currentUser.id, ...Array.from(selectedGroupMembers)];
      const groupId = 'group-' + Date.now();

      state.conversations.push({
        id: groupId,
        type: 'group',
        name: name,
        description: 'Group conversation',
        memberCount: membersArr.length,
        members: membersArr,
        creatorId: currentUser.id,
        unread: 0,
        hasMention: false,
        lastMessage: 'Group created'
      });

      // Persist real group to database
      if (window.supabaseClient) {
        window.supabaseClient.from('chat_conversations').insert({
          id: groupId,
          name: name,
          type: 'group',
          description: 'Group conversation',
          created_by: currentUser.id !== 'u-anon' ? currentUser.id : null
        }).then(() => {}).catch(e => console.warn('[TeamChat] group persist:', e));
      }

      state.messages[groupId] = [{
        id: 'msg-' + Date.now(),
        conversationId: groupId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        senderAvatar: currentUser.avatar,
        content: `Created group **${name}** with ${membersArr.length} members.`,
        isPinned: false,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        receipt: 'Sent',
        reactions: []
      }];

      // Reset modal
      nameInput.value = '';

      selectedGroupMembers.clear();
      document.getElementById('chatNewModal').style.display = 'none';

      renderSidebarLists();
      selectConversation(groupId);
      showChatToast('Group created successfully');
    }

    function createChannelFromModal() {
      const nameInput = document.getElementById('chatChannelNameInput');
      const descInput = document.getElementById('chatChannelDescInput');
      const announceCheck = document.getElementById('chatChannelAnnouncementCheck');
      if (!nameInput) return;

      let rawName = nameInput.value.trim();
      if (!rawName) {
        alert('Please enter a channel name.');
        return;
      }
      if (!rawName.startsWith('#')) {
        rawName = '#' + rawName;
      }

      const slug = rawName.replace(/^#/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      const channelId = `channel-${slug}-${Date.now().toString(36)}`;
      const isAnnounce = announceCheck ? announceCheck.checked : false;

      state.conversations.push({
        id: channelId,
        type: 'channel',
        name: rawName,
        slug: slug,
        description: descInput ? descInput.value.trim() : 'Public channel',
        isAnnouncementOnly: isAnnounce,
        memberCount: state.members.length,
        members: state.members.map(m => m.id),
        unread: 0,
        hasMention: false,
        lastMessage: 'Channel created'
      });

      // Persist real channel to database
      if (window.supabaseClient) {
        window.supabaseClient.from('chat_conversations').insert({
          id: channelId,
          name: rawName,
          type: 'channel',
          slug: slug,
          description: descInput ? descInput.value.trim() : 'Public channel',
          is_announcement_only: isAnnounce,
          created_by: currentUser.id !== 'u-anon' ? currentUser.id : null
        }).then(() => {}).catch(e => console.warn('[TeamChat] channel persist:', e));
      }

      state.messages[channelId] = [{
        id: 'msg-' + Date.now(),
        conversationId: channelId,
        senderId: getCurrentUser().id,
        senderName: getCurrentUser().name,
        senderRole: getCurrentUser().role,
        senderAvatar: getCurrentUser().avatar,
        content: `Welcome to **${rawName}**! ${descInput ? descInput.value.trim() : ''}`,
        isPinned: true,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        receipt: 'Sent',
        reactions: []
      }];

      // Reset modal
      nameInput.value = '';
      if (descInput) descInput.value = '';
      if (announceCheck) announceCheck.checked = false;
      document.getElementById('chatNewModal').style.display = 'none';

      renderSidebarLists();
      selectConversation(channelId);
      showChatToast(`Channel ${rawName} created`);
    }

    // Share Content Modal (Learning Module, JD, FAQ)
    let selectedShareItem = null;
    function initShareModal() {
      const modal = document.getElementById('chatShareModal');
      const openBtn = document.getElementById('chatSharePortalBtn');
      const closeBtn = document.getElementById('closeChatShareModalBtn');
      const confirmBtn = document.getElementById('confirmChatShareBtn');
      const tabs = modal ? modal.querySelectorAll('.chat-modal-tab') : [];
      if (!modal || !openBtn) return;

      openBtn.addEventListener('click', () => {
        selectedShareItem = null;
        if (confirmBtn) confirmBtn.disabled = true;
        modal.style.display = 'flex';
        renderShareItems('module');
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      }

      const cancelShareBtn = document.getElementById('cancelChatShareBtn');
      if (cancelShareBtn) {
        cancelShareBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      }

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const shareType = tab.getAttribute('data-share-type');
          renderShareItems(shareType);
        });
      });

      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          if (!selectedShareItem) return;
          shareItemIntoChat(selectedShareItem);
          modal.style.display = 'none';
        });
      }
    }

    function renderShareItems(type, query = '') {
      const list = document.getElementById('chatShareItemsList');
      const confirmBtn = document.getElementById('confirmChatShareBtn');
      if (!list) return;

      list.innerHTML = '';
      let items = [];

      if (type === 'module') {
        const moduleTitles = [
          '0. Onboarding & Digital Workspace',
          '1. Development Sector Landscape',
          '2. Technical Proposal Writing',
          '3. Business Development & Partnerships',
          '4. Recruitment Intern & Talent Acquisition',
          '5. Project Manager & Strategic Advisor'
        ];
        items = moduleTitles.map((title, idx) => ({
          type: 'module',
          id: String(idx),
          title,
          snippet: `Ikaai Learning Module ${idx}: Comprehensive training materials and evaluation matrix.`
        }));
      } else if (type === 'jd') {
        if (typeof jdData !== 'undefined' && jdData && jdData.jds) {
          items = jdData.jds.map(jd => ({
            type: 'jd',
            id: jd.id,
            title: jd.title,
            snippet: `${jd.department || 'Operations'} • ${jd.location || 'Hybrid'} • ${jd.type || 'Full-time'}`
          }));
        } else {
          items = [
            { type: 'jd', id: 'jd-sr', title: 'Senior Research Associate', snippet: 'Research & Policy Development' },
            { type: 'jd', id: 'jd-da', title: 'Data Analyst & Impact Evaluator', snippet: 'Monitoring & Evaluation' },
            { type: 'jd', id: 'jd-pm', title: 'Programme Manager', snippet: 'Grassroots Operations & Partnerships' }
          ];
        }
      } else if (type === 'faq') {
        items = [
          { type: 'faq', id: 'faq-rfp', title: 'How is RFP Scoring Weighted in Module 2?', snippet: 'Technical proposal weight is fixed at 70% while commercial evaluation is 30%.' },
          { type: 'faq', id: 'faq-exam', title: 'When can I attempt the final Written Exam?', snippet: 'The final exam unlocks after scoring >=80% on all individual module quizzes.' },
          { type: 'faq', id: 'faq-time', title: 'What are instructor office hours?', snippet: 'Monday to Friday, 10:00 AM to 6:00 PM IST with an average first response under 24 hours.' }
        ];
      }

      items.forEach(it => {
        const el = document.createElement('div');
        el.className = 'share-picker-item';
        el.innerHTML = `
        <div>
          <div style="font-weight: 600; font-size: 13px; color: var(--chat-text);">${escapeHtml(it.title)}</div>
          <div style="font-size: 11px; color: var(--chat-text-muted);">${escapeHtml(it.snippet)}</div>
        </div>
        <span class="chat-role-badge learner">Select</span>
      `;
        el.addEventListener('click', () => {
          list.querySelectorAll('.share-picker-item').forEach(x => x.classList.remove('selected'));
          el.classList.add('selected');
          selectedShareItem = it;
          if (confirmBtn) confirmBtn.disabled = false;
        });
        list.appendChild(el);
      });
    }

    function shareItemIntoChat(item) {
      const conv = getActiveConv();
      const currentUser = getCurrentUser();

      const newMsg = {
        id: 'msg-' + Date.now(),
        conversationId: conv.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        senderAvatar: currentUser.avatar,
        content: `Shared ${item.type.toUpperCase()}: **${item.title}**`,
        sharedItem: item,
        isPinned: false,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        receipt: 'Sent',
        reactions: []
      };

      if (!state.messages[conv.id]) state.messages[conv.id] = [];
      state.messages[conv.id].push(newMsg);

      renderMessages();
      renderSidebarLists();
      showChatToast('Shared into conversation');
    }

    // Toast Notification
    function showChatToast(msg) {
      const toast = document.getElementById('toastNotification');
      const toastMsg = document.getElementById('toastMessage');
      if (toast && toastMsg) {
        toastMsg.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2500);
      }
    }

    // Wire all permanent event listeners
    function wireAllEvents() {
      // Mobile Back Button
      const mobileBackBtn = document.getElementById('chatMobileBackBtn');
      if (mobileBackBtn) {
        mobileBackBtn.addEventListener('click', () => {
          const wrapper = document.getElementById('teamChatWrapper');
          if (wrapper) wrapper.classList.remove('in-conversation');
        });
      }

      // Toggle Details Panel
      const toggleDetailsBtn = document.getElementById('chatToggleDetailsBtn');
      const closeDetailsBtn = document.getElementById('chatCloseDetailsBtn');
      const detailsPanel = document.getElementById('chatDetailsPanel');
      if (toggleDetailsBtn && detailsPanel) {
        toggleDetailsBtn.addEventListener('click', () => {
          if (window.innerWidth <= 1280) {
            detailsPanel.classList.toggle('mobile-open');
          } else {
            detailsPanel.classList.toggle('collapsed');
          }
        });
      }
      if (closeDetailsBtn && detailsPanel) {
        closeDetailsBtn.addEventListener('click', () => {
          detailsPanel.classList.remove('mobile-open');
          detailsPanel.classList.add('collapsed');
        });
      }

      // Toggle In-Conversation Search
      const toggleSearchBtn = document.getElementById('chatToggleInConvSearchBtn');
      if (toggleSearchBtn) {
        toggleSearchBtn.addEventListener('click', toggleInConvSearch);
      }
      const closeInConvBtn = document.getElementById('chatInConvCloseBtn');
      if (closeInConvBtn) {
        closeInConvBtn.addEventListener('click', closeInConvSearch);
      }
      const inConvInput = document.getElementById('chatInConvInput');
      if (inConvInput) {
        inConvInput.addEventListener('input', (e) => handleInConvSearch(e.target.value));
      }
      const inConvPrev = document.getElementById('chatInConvPrevBtn');
      if (inConvPrev) {
        inConvPrev.addEventListener('click', () => navigateInConvMatch(state.inConvSearch.curIndex - 1));
      }
      const inConvNext = document.getElementById('chatInConvNextBtn');
      if (inConvNext) {
        inConvNext.addEventListener('click', () => navigateInConvMatch(state.inConvSearch.curIndex + 1));
      }

      // Global Search Input
      const globalSearch = document.getElementById('chatGlobalSearchInput');
      if (globalSearch) {
        globalSearch.addEventListener('input', (e) => handleGlobalSearch(e.target.value));
      }
      const globalClear = document.getElementById('chatGlobalSearchClear');
      if (globalClear) {
        globalClear.addEventListener('click', () => {
          globalSearch.value = '';
          handleGlobalSearch('');
          globalSearch.focus();
        });
      }

      // Composer Form Submit
      const composerForm = document.getElementById('chatComposerForm');
      if (composerForm) {
        composerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          sendMessage();
        });
      }

      // Composer Textarea keyboard events
      const textarea = document.getElementById('chatComposerTextarea');
      if (textarea) {
        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        });
        textarea.addEventListener('input', (e) => {
          updateCharCounter();
          handleMentionsInput(e);
          handleTyping();
        });
      }

      // Formatting Toolbar Buttons
      const toolbar = document.getElementById('chatFormatToolbar');
      if (toolbar) {
        toolbar.querySelectorAll('[data-format]').forEach(btn => {
          btn.addEventListener('click', () => {
            applyFormatting(btn.getAttribute('data-format'));
          });
        });
      }

      // File Input change
      const fileInput = document.getElementById('chatFileInput');
      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          handleFileInput(e.target.files);
          fileInput.value = '';
        });
      }

      // Cancel Reply Button
      const cancelReplyBtn = document.getElementById('chatReplyCancelBtn');
      if (cancelReplyBtn) {
        cancelReplyBtn.addEventListener('click', hideReplyBar);
      }

      // Thread Drawer events
      const closeThreadBtn = document.getElementById('chatCloseThreadBtn');
      if (closeThreadBtn) {
        closeThreadBtn.addEventListener('click', closeThread);
      }
      const threadForm = document.getElementById('chatThreadForm');
      if (threadForm) {
        threadForm.addEventListener('submit', (e) => {
          e.preventDefault();
          sendThreadReply();
        });
      }
      const threadInput = document.getElementById('chatThreadInput');
      if (threadInput) {
        threadInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendThreadReply();
          }
        });
      }

      // Delete Modal events
      const confirmDeleteBtn = document.getElementById('confirmChatDeleteBtn');
      if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', doDeleteMessage);
      }
      const cancelDeleteBtn = document.getElementById('cancelChatDeleteBtn');
      if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
      }
      const closeDeleteXBtn = document.getElementById('closeChatDeleteModalBtn');
      if (closeDeleteXBtn) {
        closeDeleteXBtn.addEventListener('click', closeDeleteModal);
      }

      // Lightbox events
      const lightboxClose = document.getElementById('chatLightboxClose');
      const lightboxOverlay = document.getElementById('chatLightboxOverlay');
      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
      if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
          if (e.target === lightboxOverlay) closeLightbox();
        });
      }

      // Modals Init
      initNewChatModal();
      initShareModal();
      initEmojiPopover();
    }

    // Setup Supabase Realtime channel if available
    function initRealtimeSync() {
      if (state.realtimeInitialized) return;
      try {
        const client = window.supabaseClient || (typeof supabase !== 'undefined' ? supabase : null);
        if (!client || typeof client.channel !== 'function') return;

        state.realtimeInitialized = true;

        // 1. Live database sync for incoming messages and documents
        client.channel('chat-messages-live')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, async (payload) => {
            const row = payload.new;
            if (!row) return;
            const currentUser = getCurrentUser();
            // Ignore own messages that were already optimistically rendered
            if (row.sender_id && row.sender_id === currentUser.id) return;

            console.log('[TeamChat] Live incoming message received in:', row.conversation_id, 'from:', row.sender_name);

            if (!state.messages[row.conversation_id]) {
              state.messages[row.conversation_id] = [];
            }

            const formattedMsg = {
              id: row.id,
              conversationId: row.conversation_id,
              senderId: row.sender_id,
              senderName: row.sender_name,
              senderRole: row.sender_role,
              senderAvatar: row.sender_avatar,
              content: row.content,
              parentMessageId: row.parent_message_id,
              sharedItem: row.shared_item,
              isPinned: row.is_pinned,
              isEdited: row.is_edited,
              isDeleted: row.is_deleted,
              createdAt: row.created_at,
              receipt: 'Seen',
              reactions: [],
              attachments: []
            };

            // Check if message has attachments and resolve preview URLs immediately
            try {
              const { data: dbAtts } = await client
                .from('chat_attachments')
                .select('*')
                .eq('message_id', row.id);

              if (dbAtts && dbAtts.length > 0) {
                for (const a of dbAtts) {
                  let previewUrl = a.public_url || null;
                  if (!previewUrl && a.storage_path && window.DataLayer) {
                    try {
                      if (typeof window.DataLayer.getChatAttachmentPreviewUrl === 'function') {
                        previewUrl = await window.DataLayer.getChatAttachmentPreviewUrl(a.storage_path);
                      } else {
                        previewUrl = await window.DataLayer.getChatAttachmentDownloadUrl(a.storage_path, a.file_name);
                      }
                    } catch (e) {}
                  }
                  formattedMsg.attachments.push({
                    id: a.id,
                    name: a.file_name,
                    file_name: a.file_name,
                    size: a.file_size,
                    file_size: a.file_size,
                    type: a.mime_type,
                    mime_type: a.mime_type,
                    storage_path: a.storage_path,
                    public_url: previewUrl,
                    url: previewUrl || ''
                  });
                }
              }
            } catch (attErr) {
              console.warn('[TeamChat] Error loading attachments for realtime message:', attErr);
            }

            if (!state.messages[row.conversation_id].some(m => m.id === row.id)) {
              state.messages[row.conversation_id].push(formattedMsg);
            }

            if (row.conversation_id === state.activeConvId) {
              renderMessages();
              showChatToast(`New message from ${row.sender_name}`);
            } else {
              let targetConv = state.conversations.find(c => c.id === row.conversation_id);
              if (!targetConv && row.conversation_id.startsWith('dm_')) {
                const otherMember = state.members.find(m => m.id === row.sender_id);
                targetConv = {
                  id: row.conversation_id,
                  type: 'direct',
                  name: otherMember ? otherMember.name : (row.sender_name || 'Direct Message'),
                  recipientId: row.sender_id,
                  description: otherMember ? `${otherMember.role} · ${otherMember.email}` : 'Direct conversation',
                  unread: 0,
                  hasMention: true,
                  lastMessage: row.content?.substring(0, 40) || 'Attachment'
                };
                state.conversations.push(targetConv);
              }
              if (targetConv) {
                targetConv.unread = (targetConv.unread || 0) + 1;
                targetConv.lastMessage = row.content?.substring(0, 40) || 'Attachment';
              }
              renderSidebarLists();
              updateNavChatBadge();
              showChatToast(`New message from ${row.sender_name}`);
            }
          })
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_attachments' }, async (payload) => {
            const attRow = payload.new;
            if (!attRow || !attRow.message_id) return;
            console.log('[TeamChat] Live attachment incoming:', attRow.file_name, 'for msg:', attRow.message_id);

            let previewUrl = attRow.public_url || null;
            if (!previewUrl && attRow.storage_path && window.DataLayer) {
              try {
                if (typeof window.DataLayer.getChatAttachmentPreviewUrl === 'function') {
                  previewUrl = await window.DataLayer.getChatAttachmentPreviewUrl(attRow.storage_path);
                } else {
                  previewUrl = await window.DataLayer.getChatAttachmentDownloadUrl(attRow.storage_path, attRow.file_name);
                }
              } catch (e) {}
            }

            const formattedAtt = {
              id: attRow.id,
              name: attRow.file_name,
              file_name: attRow.file_name,
              size: attRow.file_size,
              file_size: attRow.file_size,
              type: attRow.mime_type,
              mime_type: attRow.mime_type,
              storage_path: attRow.storage_path,
              public_url: previewUrl,
              url: previewUrl || ''
            };

            const convId = attRow.conversation_id;
            let foundMsg = null;
            if (convId && state.messages[convId]) {
              foundMsg = state.messages[convId].find(m => m.id === attRow.message_id);
            }
            if (!foundMsg) {
              for (const cKey in state.messages) {
                const cand = state.messages[cKey].find(m => m.id === attRow.message_id);
                if (cand) { foundMsg = cand; break; }
              }
            }

            if (foundMsg) {
              if (!foundMsg.attachments) foundMsg.attachments = [];
              if (!foundMsg.attachments.some(a => a.id === attRow.id || (a.storage_path && a.storage_path === attRow.storage_path))) {
                foundMsg.attachments.push(formattedAtt);
              }
              if (convId === state.activeConvId || foundMsg.conversationId === state.activeConvId) {
                renderMessages();
                renderDetailsPanel();
              }
            } else if (convId) {
              await loadConversationMessages(convId);
            }
          })
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chat_messages' }, async (payload) => {
            const row = payload.new;
            if (row && row.conversation_id === state.activeConvId) {
              await loadConversationMessages(state.activeConvId);
            }
          })
          .subscribe();

        // 2. Realtime listener for newly registered profiles (Directory sync)
        client.channel('realtime-profiles-sync')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
            console.log('[TeamChat] Realtime profiles table update - reloading directory');
            loadRealDirectoryMembers();
          })
          .subscribe();

        // 3. Periodic fallback poll while on chat screen (every 3.5s)
        if (!state.pollingInterval) {
          state.pollingInterval = setInterval(async () => {
            if (activeScreen === 'chat' && state.activeConvId && document.visibilityState === 'visible') {
              try {
                const dbMsgs = await window.DataLayer.getChatMessages(state.activeConvId);
                if (dbMsgs && dbMsgs.length > 0) {
                  const currentMsgs = state.messages[state.activeConvId] || [];
                  const needsRefresh = dbMsgs.length !== currentMsgs.length || dbMsgs.some((dbM, idx) => {
                    const localM = currentMsgs[idx];
                    if (!localM) return true;
                    return (dbM.attachments?.length || 0) !== (localM.attachments?.length || 0);
                  });
                  if (needsRefresh) {
                    await loadConversationMessages(state.activeConvId);
                  }
                }
              } catch (e) {}
            }
          }, 3500);
        }

        // 4. Typing broadcast channel
        state.supabaseChannel = client.channel('ikaai-team-chat')
          .on('broadcast', { event: 'typing' }, (payload) => {
            if (!payload || !payload.payload) return;
            const { convId, user, isTyping } = payload.payload;
            const currentUser = getCurrentUser();
            if (user === currentUser.name) return;

            const typingStatus = document.getElementById('chatTypingStatus');
            const typingText = document.getElementById('chatTypingText');
            if (convId === state.activeConvId && typingStatus && typingText) {
              if (isTyping) {
                typingText.textContent = `${user} is typing...`;
                typingStatus.style.display = 'flex';
              } else {
                typingStatus.style.display = 'none';
              }
            }
          })
          .subscribe();
      } catch (e) {
        console.warn('Supabase realtime init skipped, using local fallback:', e);
      }
    }

    // Public Interface: Render and Initialize Team Chat Screen
    function renderScreen() {
      if (!state.initialized) {
        wireAllEvents();
        initRealtimeSync();
        state.initialized = true;
      }

      loadRealDirectoryMembers();
      renderSidebarLists();
      renderActiveConversationHeader();
      renderPinnedBanner();
      renderMessages();
      renderDetailsPanel();

      loadConversationMessages(state.activeConvId);
    }

    return {
      render: renderScreen,
      initRealtime: initRealtimeSync,
      selectConversation,
      getState: () => state
    };
  })();

  window.TeamChat = TeamChat;

  // Hook into portal's screen rendering
  function renderTeamChatScreen() {
    TeamChat.render();
  }


  function initThemeController() {
    applyTheme();
  }

  function renderAll() {
    initThemeController();
    initAuthentication();
    checkUrlParams();
    renderSidebar();
    switchScreen(activeScreen);
    updateUserAvatarUI();
    renderJobDescriptionsScreen();
  }

  // Initial Boot
  renderAll();

})();
