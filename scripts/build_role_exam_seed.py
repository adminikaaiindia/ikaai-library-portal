#!/usr/bin/env python3
"""
build_role_exam_seed.py
Generates supabase/seed_exam_questions.sql with deterministic UUIDs
for all 11 roles and their 10 questions (6 MCQ, 4 Written = 100 marks total per role).
"""

import sys

# Mapping of 11 roles to jobs rows
ROLES = [
    {
        "index": 1,
        "name": "HR Intern",
        "job_id": "90000000-0000-0000-0000-000000000002",
        "programme_id": "10000000-0000-0000-0000-000000000001",
        "questions": [
            ("mcq", "What is the best first step before shortlisting candidates for a role?", [
                ("A", "Call all applicants to check their interest"),
                ("B", "Ask the manager to pick names"),
                ("C", "Define must-have and nice-to-have criteria from the job description"),
                ("D", "Repost the vacancy")
            ], "C", 5, "Define must-have and nice-to-have criteria from the job description"),
            ("mcq", "In a structured interview, interviewers should", [
                ("A", "Ask the same job-related questions and score answers with a common rubric"),
                ("B", "Ask different questions to each candidate"),
                ("C", "Rely on gut feeling"),
                ("D", "Focus on personal background")
            ], "A", 5, "Ask the same job-related questions and score answers with a common rubric"),
            ("mcq", "A candidate's CV and phone number are personal data. Which practice is the safest?", [
                ("A", "Share them in a WhatsApp group"),
                ("B", "Keep them forever"),
                ("C", "Email them to everyone"),
                ("D", "Collect only what is needed, store it securely and restrict access")
            ], "D", 5, "Collect only what is needed, store it securely and restrict access"),
            ("mcq", "Which best shows that an internship onboarding is working?", [
                ("A", "Number of emails sent"),
                ("B", "Office attendance alone"),
                ("C", "Completion of onboarding tasks plus early feedback from interns and mentors"),
                ("D", "Number of applicants")
            ], "C", 5, "Completion of onboarding tasks plus early feedback from interns and mentors"),
            ("mcq", "An offer letter with the wrong stipend has already been sent. What should you do first?", [
                ("A", "Ignore it until the candidate complains"),
                ("B", "Inform the HR lead, contact the candidate and issue a corrected letter after approval"),
                ("C", "Edit the file silently"),
                ("D", "Cancel the offer")
            ], "B", 5, "Inform the HR lead, contact the candidate and issue a corrected letter after approval"),
            ("mcq", "Which metric measures how long it takes to fill a vacancy?", [
                ("A", "Net promoter score"),
                ("B", "Attrition rate"),
                ("C", "Cost per click"),
                ("D", "Time-to-fill")
            ], "D", 5, "Time-to-fill"),
            ("written", "Explain how you would run a recruitment cycle for five intern positions across two programmes, from vacancy posting to joining. Include sourcing, screening, interviews and communication with candidates.", None, None, 15, "Guide: role definition, vacancy, sourcing, screening against criteria, structured interviews with a rubric, selection, offer, onboarding; realistic timeline; fairness; record keeping."),
            ("written", "A selected candidate withdraws one day before joining. Describe the steps you would take now and how you would reduce such drop-offs in future.", None, None, 15, "Guide: acknowledge and ask the reason; inform mentor and HR lead; consider a backup candidate; update records; prevention through contact before joining, clear communication, welcome pack, buddy."),
            ("written", "Write a short email (5 to 7 lines) inviting a shortlisted candidate to an interview. Include the date, mode, documents to bring and a contact person (use placeholders where details are unknown).", None, None, 20, "Guide: role named, date and time, mode or link, documents, contact person, confirmation request, professional and concise tone, placeholders used correctly."),
            ("written", "An intern privately tells you that a team member made an inappropriate remark. How should HR respond? Cover confidentiality, documentation, escalation and fairness.", None, None, 20, "Guide: listen privately, record facts, keep it confidential, follow policy and escalate to the HR lead, protect from retaliation, fair process for both sides, follow-up with the intern.")
        ]
    },
    {
        "index": 2,
        "name": "HR and Admin Associate",
        "job_id": "90000000-0000-0000-0000-000000000003",
        "programme_id": "10000000-0000-0000-0000-000000000001",
        "questions": [
            ("mcq", "Statutory compliance in HR means", [
                ("A", "Following the preferences of senior staff"),
                ("B", "Following the laws and rules that apply to employment, such as contracts, wages, leave and record keeping"),
                ("C", "Copying competitors' policies"),
                ("D", "Following only what employees ask for")
            ], "B", 5, "Following the laws and rules that apply to employment, such as contracts, wages, leave and record keeping"),
            ("mcq", "Before an appointment letter is issued, HR should confirm", [
                ("A", "Only the joining date"),
                ("B", "That the candidate has agreed verbally"),
                ("C", "The approved role, terms and compensation and the candidate's verified documents"),
                ("D", "The candidate's social media profiles")
            ], "C", 5, "The approved role, terms and compensation and the candidate's verified documents"),
            ("mcq", "Which is the best way to choose an office vendor?", [
                ("A", "Pick the first quote received"),
                ("B", "Choose a known contact"),
                ("C", "Pick the most expensive for quality"),
                ("D", "Compare several quotes against clear criteria and record the decision")
            ], "D", 5, "Compare several quotes against clear criteria and record the decision"),
            ("mcq", "After a new HR policy is approved, the most effective rollout is to", [
                ("A", "Communicate it clearly, explain it, collect acknowledgement and review feedback"),
                ("B", "Send one email and assume it is read"),
                ("C", "Keep it on the shared drive only"),
                ("D", "Apply it only to new joiners")
            ], "A", 5, "Communicate it clearly, explain it, collect acknowledgement and review feedback"),
            ("mcq", "Employee personal files should be", [
                ("A", "Kept in an open shared folder"),
                ("B", "Stored securely with access limited to authorised staff"),
                ("C", "Shared through chat groups"),
                ("D", "Kept on personal phones")
            ], "B", 5, "Stored securely with access limited to authorised staff"),
            ("mcq", "A rising attrition rate most directly signals", [
                ("A", "Faster recruitment"),
                ("B", "Lower office costs"),
                ("C", "More people are leaving than the organisation can comfortably replace, which needs investigation"),
                ("D", "Better onboarding")
            ], "C", 5, "More people are leaving than the organisation can comfortably replace, which needs investigation"),
            ("written", "Describe how you would set up a monthly HR compliance calendar for a small organisation. Include what you would track, who owns each item, and how you would remind and record completion.", None, None, 15, "Guide: contracts and renewals, leave and attendance records, payroll inputs and payment dates, statutory filings and deadlines as applicable, document renewals, owners, reminders, checklist and sign-off, audit trail."),
            ("written", "The office internet fails twice a week and the team is losing work hours. As the admin associate, explain how you would handle this with the vendor and the team.", None, None, 15, "Guide: log incidents with dates and impact; check the service agreement; escalate formally; interim workaround (hotspot, flexible schedule); compare alternatives; communicate with the team; track resolution."),
            ("written", "Draft a short notice (6 to 8 lines) to all staff announcing a revised leave-application process. Use placeholders for dates and contact details.", None, None, 20, "Guide: what is changing and from when, how to apply, who approves, deadlines, contact person, professional tone, placeholders used correctly."),
            ("written", "An employee's stipend was calculated wrongly last month and they were underpaid. Explain how you would correct it and prevent a repeat.", None, None, 20, "Guide: acknowledge and apologise; verify the correct amount and the cause; get approval; correct payment with a clear note; communicate the timeline; add a check before payment; document.")
        ]
    },
    {
        "index": 3,
        "name": "Data Analyst Intern",
        "job_id": "90000000-0000-0000-0000-000000000001",
        "programme_id": "10000000-0000-0000-0000-000000000002",
        "questions": [
            ("mcq", "What should you do first before analysing a survey dataset?", [
                ("A", "Build charts"),
                ("B", "Run a regression"),
                ("C", "Check for duplicates, missing values and inconsistent codes"),
                ("D", "Share the file with the client")
            ], "C", 5, "Check for duplicates, missing values and inconsistent codes"),
            ("mcq", "Which item must be removed or pseudonymised before a dataset is shared with a partner?", [
                ("A", "Aggregated district names"),
                ("B", "Survey dates"),
                ("C", "Question labels"),
                ("D", "Respondents' names and phone numbers")
            ], "D", 5, "Respondents' names and phone numbers"),
            ("mcq", "A variable has 40% missing values. What is the best first response?", [
                ("A", "Delete it silently"),
                ("B", "Investigate why values are missing, document it, then choose a justified approach"),
                ("C", "Fill the gaps with zero"),
                ("D", "Fill the gaps with random numbers")
            ], "B", 5, "Investigate why values are missing, document it, then choose a justified approach"),
            ("mcq", "In Power BI, what is a slicer used for?", [
                ("A", "Deleting rows"),
                ("B", "Connecting to a database"),
                ("C", "Letting users filter report visuals interactively"),
                ("D", "Encrypting data")
            ], "C", 5, "Letting users filter report visuals interactively"),
            ("mcq", "A correlation of 0.8 between two variables means", [
                ("A", "A strong positive association, which is not proof of causation"),
                ("B", "One variable causes the other"),
                ("C", "There is no relationship"),
                ("D", "80% of cases match")
            ], "A", 5, "A strong positive association, which is not proof of causation"),
            ("mcq", "Which chart is best for showing how an indicator changed month by month over a year?", [
                ("A", "A pie chart"),
                ("B", "A line chart"),
                ("C", "A scatter plot of names"),
                ("D", "An unsorted table")
            ], "B", 5, "A line chart"),
            ("written", "Describe how you would clean a household survey export from KoboToolbox before analysis. List the checks you would run and how you would document your changes.", None, None, 15, "Guide: keep an untouched raw copy; check duplicates, missing values, outliers, inconsistent codes or labels, skip-logic errors, date checks; keep a change log; make the steps reproducible."),
            ("written", "A client asks for a dashboard showing programme reach by district. Explain how you would plan it: questions to ask, data needed, visuals and how you would validate it.", None, None, 15, "Guide: purpose and audience; indicator definitions; data sources and period; geography levels; suitable visuals (map, bars, trend); filters; validate against source totals; privacy and access; test with the user."),
            ("written", "You find a district whose average income is ten times higher than the others. How would you investigate, and what would you report?", None, None, 20, "Guide: check for entry errors, units or currency; separate real outliers from errors; compare with enumerator and source data; check sample size; run a sensitivity check; report with caveats; never delete silently."),
            ("written", "Explain how you would protect respondents' privacy when sharing your analysis with a partner organisation, referring to the principles of India's DPDP Act in general terms.", None, None, 20, "Guide: remove direct identifiers; aggregate or pseudonymise; minimum cell sizes; share only what is needed for the stated purpose; data-sharing agreement; secure transfer and access control; retention and deletion.")
        ]
    },
    {
        "index": 4,
        "name": "Research Intern",
        "job_id": "90000000-0000-0000-0000-000000000005",
        "programme_id": "10000000-0000-0000-0000-000000000003",
        "questions": [
            ("mcq", "A literature review is mainly used to", [
                ("A", "Collect new survey data"),
                ("B", "Replace fieldwork"),
                ("C", "Write the final report"),
                ("D", "Summarise existing knowledge on a topic and find gaps")
            ], "D", 5, "Summarise existing knowledge on a topic and find gaps"),
            ("mcq", "Which source is generally the most reliable for a research review?", [
                ("A", "A peer-reviewed article or an official agency report"),
                ("B", "An anonymous blog"),
                ("C", "A forwarded message"),
                ("D", "A social media post")
            ], "A", 5, "A peer-reviewed article or an official agency report"),
            ("mcq", "When transcribing an interview you should", [
                ("A", "Summarise freely and drop details"),
                ("B", "Record accurately what was said and protect identifying details as instructed"),
                ("C", "Correct the speaker's opinions"),
                ("D", "Share the file in a chat group")
            ], "B", 5, "Record accurately what was said and protect identifying details as instructed"),
            ("mcq", "A dataset shows a respondent's age as 250. You should", [
                ("A", "Keep it as a valid value"),
                ("B", "Delete the whole survey"),
                ("C", "Flag it as a likely entry error and check it against the source"),
                ("D", "Replace it with the average silently")
            ], "C", 5, "Flag it as a likely entry error and check it against the source"),
            ("mcq", "Citing sources in a report is important because it", [
                ("A", "Makes the report longer"),
                ("B", "Gives credit, lets readers verify and avoids plagiarism"),
                ("C", "Hides weak evidence"),
                ("D", "Is only needed for books")
            ], "B", 5, "Gives credit, lets readers verify and avoids plagiarism"),
            ("mcq", "Research data about individuals should be", [
                ("A", "Shared on public pages"),
                ("B", "Posted for feedback"),
                ("C", "Stored securely and used only for the stated purpose"),
                ("D", "Kept on any personal device")
            ], "C", 5, "Stored securely and used only for the stated purpose"),
            ("written", "Explain how you would search for and organise sources for a literature review on school dropout among adolescent girls.", None, None, 15, "Guide: keywords and synonyms; databases and trusted sites; inclusion criteria; tracking sheet with source, year, method and finding; reading and note-taking; identifying gaps; citation management."),
            ("written", "You must transcribe 20 interview recordings by Friday. Describe how you would plan the work and keep quality and confidentiality.", None, None, 15, "Guide: split into daily targets; transcription format; spot-check quality; secure storage; anonymise names; ask when audio is unclear; record issues for the supervisor."),
            ("written", "In about 100 words, summarise in plain language this finding for a non-technical reader: \"Only 32% of eligible households had applied for the scheme; the most common reason given was not knowing how to apply.\"", None, None, 20, "Guide: accurate figure, plain wording, the reason, no overstatement, within about 100 words, one clear takeaway."),
            ("written", "While validating a household dataset you find 15 repeated household IDs. Explain how you would investigate and what you would report to your supervisor.", None, None, 20, "Guide: keep a raw copy; check whether they are true duplicates or ID entry errors; compare other fields and timestamps; identify the source (enumerator, device); document the decision; do not delete silently; report counts and action.")
        ]
    },
    {
        "index": 5,
        "name": "Research Trainee",
        "job_id": "90000000-0000-0000-0000-000000000006",
        "programme_id": "10000000-0000-0000-0000-000000000003",
        "questions": [
            ("mcq", "Pilot testing a survey tool before fieldwork helps to", [
                ("A", "Save time by skipping training"),
                ("B", "Find unclear questions, wrong skip logic and timing problems"),
                ("C", "Increase the sample size"),
                ("D", "Avoid ethics approval")
            ], "B", 5, "Find unclear questions, wrong skip logic and timing problems"),
            ("mcq", "Quantitative research mainly", [
                ("A", "Measures how many or how much using numbers"),
                ("B", "Explores feelings through stories only"),
                ("C", "Needs no sample"),
                ("D", "Avoids statistics")
            ], "A", 5, "Measures how many or how much using numbers"),
            ("mcq", "Qualitative research is best suited to", [
                ("A", "Counting households"),
                ("B", "Calculating averages"),
                ("C", "Understanding people's experiences and reasons in depth"),
                ("D", "Measuring prices")
            ], "C", 5, "Understanding people's experiences and reasons in depth"),
            ("mcq", "Before starting an interview, the interviewer must", [
                ("A", "Pay the respondent"),
                ("B", "Explain the purpose and get the respondent's voluntary consent"),
                ("C", "Record without telling"),
                ("D", "Finish quickly")
            ], "B", 5, "Explain the purpose and get the respondent's voluntary consent"),
            ("mcq", "A skip-logic error in a digital form means", [
                ("A", "A question appears or hides at the wrong time based on earlier answers"),
                ("B", "The phone is broken"),
                ("C", "The respondent is dishonest"),
                ("D", "The data is encrypted")
            ], "A", 5, "A question appears or hides at the wrong time based on earlier answers"),
            ("mcq", "If you notice you made a mistake while entering a response, you should", [
                ("A", "Hide it"),
                ("B", "Delete the whole form without telling"),
                ("C", "Ask the respondent to repeat everything"),
                ("D", "Correct it as the process allows and tell your supervisor")
            ], "D", 5, "Correct it as the process allows and tell your supervisor"),
            ("written", "Prepare a day-wise plan for collecting data in three villages in three days with a team of four. Include tasks, travel and the checks at the end of each day.", None, None, 15, "Guide: day plan; roles; schedule that respects respondents' time; consent; end-of-day data upload and review; supervisor check-in; contingency for absent respondents."),
            ("written", "You tested a questionnaire on a mobile phone and found problems. List what you would record in a testing report and how you would present it.", None, None, 15, "Guide: question number, issue type (wording, logic, translation, display), device, steps to repeat, suggested fix, time taken per interview, priority; a clear table."),
            ("written", "A respondent says halfway through that she wants to stop. What should you do and why?", None, None, 20, "Guide: stop respectfully; no pressure; thank her; do not use partial data unless the protocol allows; note it; inform the supervisor; voluntary participation principle."),
            ("written", "Write a short message (5 to 7 lines) to your supervisor reporting that one village was inaccessible due to heavy rain. Include what you propose to do. Use placeholders where needed.", None, None, 20, "Guide: clear facts, impact on the schedule, a proposed alternative, what you need from the supervisor, concise professional tone, placeholders.")
        ]
    },
    {
        "index": 6,
        "name": "Research Assistant",
        "job_id": "90000000-0000-0000-0000-000000000007",
        "programme_id": "10000000-0000-0000-0000-000000000003",
        "questions": [
            ("mcq", "Enumerator training before a household survey should include", [
                ("A", "Only the questionnaire"),
                ("B", "The purpose of the study, the questions, ethics and consent, practice interviews and data quality rules"),
                ("C", "Only travel plans"),
                ("D", "Only phone use")
            ], "B", 5, "The purpose of the study, the questions, ethics and consent, practice interviews and data quality rules"),
            ("mcq", "A back-check (re-interview of a small sample) is done to", [
                ("A", "Check that interviews really happened and answers match"),
                ("B", "Add more questions"),
                ("C", "Reduce the sample"),
                ("D", "Pay enumerators")
            ], "A", 5, "Check that interviews really happened and answers match"),
            ("mcq", "A selected household is locked during the visit. The correct step is to", [
                ("A", "Skip it and pick a neighbour at random"),
                ("B", "Interview whoever is nearby"),
                ("C", "Follow the sampling plan's call-back and replacement rules and record the attempt"),
                ("D", "Make up a response")
            ], "C", 5, "Follow the sampling plan's call-back and replacement rules and record the attempt"),
            ("mcq", "Reviewing the day's data every evening helps because", [
                ("A", "Errors and gaps can be corrected while the team is still in the field"),
                ("B", "It is a formality"),
                ("C", "It replaces back-checks"),
                ("D", "It reduces ethics risk to zero")
            ], "A", 5, "Errors and gaps can be corrected while the team is still in the field"),
            ("mcq", "Interviewing a minor in a household survey requires", [
                ("A", "No special care"),
                ("B", "Skipping consent"),
                ("C", "Paying the child"),
                ("D", "Following the protocol on parental consent and the child's assent")
            ], "D", 5, "Following the protocol on parental consent and the child's assent"),
            ("mcq", "An interview that took 5 minutes when the average is 25 minutes should", [
                ("A", "Be accepted as faster work"),
                ("B", "Be flagged and checked with the enumerator and a back-check"),
                ("C", "Be deleted automatically"),
                ("D", "Be ignored")
            ], "B", 5, "Be flagged and checked with the enumerator and a back-check"),
            ("written", "You will coordinate eight enumerators for a 12-day household survey. Describe your plan for training, daily routine, supervision and communication.", None, None, 15, "Guide: training and practice; teams and areas; daily briefing and debrief; supervision visits; data upload and review; issue log; welfare and safety; escalation to the research lead."),
            ("written", "The evening review shows one enumerator has many missing answers in one section. Explain how you would handle it.", None, None, 15, "Guide: check the data; speak with the enumerator without blame; find the cause (tool, confusion, shortcut); retrain; re-contact respondents if needed; track improvement; inform the lead."),
            ("written", "Write a short daily field report (8 to 10 lines) using placeholders for numbers. Include progress, issues, decisions and next steps.", None, None, 20, "Guide: date and area; completed versus planned interviews; refusals and replacements; issues; actions; support needed; next day plan; clear and concise."),
            ("written", "A community leader objects to the survey and asks you to stop. How do you respond?", None, None, 20, "Guide: stay calm and respectful; explain the purpose and permissions; share official letters; do not argue or pressure; pause fieldwork if needed; inform the supervisor; follow the protocol on community engagement.")
        ]
    },
    {
        "index": 7,
        "name": "Research Associate",
        "job_id": "90000000-0000-0000-0000-000000000008",
        "programme_id": "10000000-0000-0000-0000-000000000003",
        "questions": [
            ("mcq", "An explanatory sequential mixed-methods design", [
                ("A", "Starts with qualitative work to build a survey"),
                ("B", "Uses only interviews"),
                ("C", "Collects quantitative data first, then qualitative data to explain the results"),
                ("D", "Collects no data")
            ], "C", 5, "Collects quantitative data first, then qualitative data to explain the results"),
            ("mcq", "Which does NOT directly affect the sample size needed for a survey estimate?", [
                ("A", "Desired precision"),
                ("B", "Expected variability"),
                ("C", "Confidence level"),
                ("D", "The colour of the report cover")
            ], "D", 5, "The colour of the report cover"),
            ("mcq", "Coding qualitative data means", [
                ("A", "Writing software"),
                ("B", "Encrypting files"),
                ("C", "Counting words only"),
                ("D", "Tagging text with themes to find patterns")
            ], "D", 5, "Tagging text with themes to find patterns"),
            ("mcq", "A 95% confidence interval of 40% to 48% suggests", [
                ("A", "The true value is plausibly within that range, given the sampling method"),
                ("B", "Exactly 95% of people answered yes"),
                ("C", "The result is certain"),
                ("D", "The sample is biased")
            ], "A", 5, "The true value is plausibly within that range, given the sampling method"),
            ("mcq", "Which is a research question rather than a task?", [
                ("A", "Collect 500 surveys"),
                ("B", "Why do eligible households not use the scheme?"),
                ("C", "Hire six enumerators"),
                ("D", "Write the report")
            ], "B", 5, "Why do eligible households not use the scheme?"),
            ("mcq", "A supervisor finds a systematic error in a team member's data entry. The best response is to", [
                ("A", "Say nothing"),
                ("B", "Blame the team"),
                ("C", "Correct the root cause, retrain and re-check the affected data"),
                ("D", "Remove the member")
            ], "C", 5, "Correct the root cause, retrain and re-check the affected data"),
            ("written", "Outline a mixed-methods design to evaluate a six-month skills training programme for young people. Explain what each method adds.", None, None, 15, "Guide: research questions; survey before and after or with a comparison group; interviews or focus groups for reasons and experiences; sampling; how results are combined; limitations."),
            ("written", "A survey finds 62% of trained participants are employed versus 48% of a comparison group. Write three careful findings and two caveats for a client summary.", None, None, 15, "Guide: report the figures accurately; association versus cause; sample and comparability; data collection period; possible bias; avoid overclaiming; plain language."),
            ("written", "Describe how you would supervise a team of 10 enumerators across three districts during a data collection round, including quality control.", None, None, 20, "Guide: clear roles; supervisors per district; training; daily review and back-checks; dashboards; issue log; ethics; support; reporting."),
            ("written", "The client wants the final report two weeks earlier than agreed. How do you respond?", None, None, 20, "Guide: check feasibility and the effect on quality; discuss with your manager; propose options (interim findings, reduced scope, extra resources); confirm any change in writing; manage the client professionally.")
        ]
    },
    {
        "index": 8,
        "name": "Research Executive",
        "job_id": "90000000-0000-0000-0000-000000000009",
        "programme_id": "10000000-0000-0000-0000-000000000003",
        "questions": [
            ("mcq", "A theory of change shows", [
                ("A", "The office floor plan"),
                ("B", "The budget only"),
                ("C", "How activities are expected to lead to outcomes and impact, and the assumptions behind that"),
                ("D", "The list of staff")
            ], "C", 5, "How activities are expected to lead to outcomes and impact, and the assumptions behind that"),
            ("mcq", "A SMART indicator is", [
                ("A", "Specific, measurable, achievable, relevant and time-bound"),
                ("B", "Simple, modern, accurate, reported and tested"),
                ("C", "Short, manual, approved, regular and tracked"),
                ("D", "Standard, mandatory, annual, reviewed and tabled")
            ], "A", 5, "Specific, measurable, achievable, relevant and time-bound"),
            ("mcq", "A risk register is used to", [
                ("A", "Record attendance"),
                ("B", "Track identified risks, their likelihood and impact, owners and mitigation"),
                ("C", "Store invoices"),
                ("D", "List clients")
            ], "B", 5, "Track identified risks, their likelihood and impact, owners and mitigation"),
            ("mcq", "Scope creep happens when", [
                ("A", "Deadlines are met early"),
                ("B", "The budget falls"),
                ("C", "The team shrinks"),
                ("D", "The project's work grows beyond what was agreed without adjusting time or budget")
            ], "D", 5, "The project's work grows beyond what was agreed without adjusting time or budget"),
            ("mcq", "A project that has spent 80% of its budget in the first half of its timeline is", [
                ("A", "Healthy"),
                ("B", "Ahead of schedule"),
                ("C", "At risk of overspending and needs review"),
                ("D", "Complete")
            ], "C", 5, "At risk of overspending and needs review"),
            ("mcq", "A donor deliverable should be", [
                ("A", "Sent at any time"),
                ("B", "Aligned to the agreed format, quality-checked and delivered by the date in the contract"),
                ("C", "Prepared only after a reminder"),
                ("D", "Shared with anyone")
            ], "B", 5, "Aligned to the agreed format, quality-checked and delivered by the date in the contract"),
            ("written", "You are leading a three-month evaluation project with a team of five. Outline the work plan, key milestones and how you would track progress.", None, None, 15, "Guide: phases; milestones and deliverables; roles; weekly tracking; risk register; budget watch; reporting rhythm; client check-ins."),
            ("written", "Halfway through, the donor asks you to increase the sample size without extending time or budget. How do you respond?", None, None, 15, "Guide: assess the impact; present options and trade-offs; propose a change request; protect quality; document agreements in writing; escalate to leadership."),
            ("written", "Write a short status update (8 to 10 lines) to a donor, with placeholders. Include progress, risks and next steps.", None, None, 20, "Guide: project and period; progress against milestones; completed and delayed items; risks and mitigation; support needed; next steps; honest and concise."),
            ("written", "Describe the quality assurance system you would set up for fieldwork in three districts.", None, None, 20, "Guide: protocols and training; supervision; spot checks and back-checks; real-time data monitoring; issue escalation; ethics and safeguarding; documentation; corrective action.")
        ]
    },
    {
        "index": 9,
        "name": "Sr. Research Associate",
        "job_id": "90000000-0000-0000-0000-000000000010",
        "programme_id": "10000000-0000-0000-0000-000000000003",
        "questions": [
            ("mcq", "A design effect greater than 1 in a clustered survey means", [
                ("A", "The sample is smaller than needed"),
                ("B", "The sample is biased"),
                ("C", "Clustering reduces precision compared with simple random sampling, so a larger sample is needed"),
                ("D", "The questionnaire is long")
            ], "C", 5, "Clustering reduces precision compared with simple random sampling, so a larger sample is needed"),
            ("mcq", "Statistical power is", [
                ("A", "The probability of detecting a real effect of a given size if it exists"),
                ("B", "The strength of the field team"),
                ("C", "The size of the sample only"),
                ("D", "The confidence level")
            ], "A", 5, "The probability of detecting a real effect of a given size if it exists"),
            ("mcq", "Without randomisation, with before and after data for treatment and comparison groups, a common design for estimating impact is", [
                ("A", "Simple averages"),
                ("B", "Difference-in-differences"),
                ("C", "A pie chart"),
                ("D", "A census")
            ], "B", 5, "Difference-in-differences"),
            ("mcq", "Attrition bias arises when", [
                ("A", "The tool is too long"),
                ("B", "The team is too large"),
                ("C", "People who drop out of a follow-up differ systematically from those who stay"),
                ("D", "Data is encrypted")
            ], "C", 5, "People who drop out of a follow-up differ systematically from those who stay"),
            ("mcq", "Spillover between treatment and comparison groups", [
                ("A", "Improves the evaluation"),
                ("B", "Is irrelevant"),
                ("C", "Reduces cost"),
                ("D", "Can contaminate the comparison and distort the estimated effect")
            ], "D", 5, "Can contaminate the comparison and distort the estimated effect"),
            ("mcq", "Testing many outcomes without adjustment increases", [
                ("A", "The chance of false-positive findings"),
                ("B", "Sample size"),
                ("C", "Response rates"),
                ("D", "Precision")
            ], "A", 5, "The chance of false-positive findings"),
            ("written", "Design a multi-state impact evaluation of a livelihoods programme. Cover the evaluation questions, design choice, sampling across states and key risks.", None, None, 15, "Guide: evaluation questions; counterfactual (difference-in-differences, matching or randomisation); sampling and clustering; power; harmonised instruments across languages; ethics; risks such as attrition and spillover."),
            ("written", "A junior colleague's analysis reports a significant effect, but you notice the comparison group was not comparable at baseline. How do you review and advise?", None, None, 15, "Guide: check baseline balance; discuss constructively with the colleague; adjust the method (matching, controls, difference-in-differences); sensitivity checks; report limitations; document."),
            ("written", "A client wants a small, quick survey to \"prove\" that their programme works. Explain how you would advise them and what you can honestly claim.", None, None, 20, "Guide: clarify the question; limits of a small sample and no comparison; options (comparison group, longer timeline); manage expectations; honest claims; offer a feasible alternative."),
            ("written", "Describe how you would build a quality framework for a team of researchers, including review, mentoring and ethics.", None, None, 20, "Guide: standards and templates; peer and senior review; documentation and reproducibility; mentoring plan; ethics and safeguarding checks; learning from errors; metrics.")
        ]
    },
    {
        "index": 10,
        "name": "Social Media cum Graphic Design Intern",
        "job_id": "90000000-0000-0000-0000-000000000011",
        "programme_id": "10000000-0000-0000-0000-000000000004",
        "questions": [
            ("mcq", "Text on a background should have", [
                ("A", "Low contrast for style"),
                ("B", "Any colour combination"),
                ("C", "High enough contrast to be readable and meet accessibility guidance"),
                ("D", "A gradient only")
            ], "C", 5, "High enough contrast to be readable and meet accessibility guidance"),
            ("mcq", "Using the brand consistently means", [
                ("A", "Using any font you like"),
                ("B", "Changing the style for every post"),
                ("C", "Always using bright colours"),
                ("D", "Using the approved logo, colours, fonts and spacing")
            ], "D", 5, "Using the approved logo, colours, fonts and spacing"),
            ("mcq", "A LinkedIn carousel works best when it has", [
                ("A", "Dense paragraphs on every slide"),
                ("B", "One idea per slide and a clear hook on the first slide"),
                ("C", "Forty slides"),
                ("D", "No call to action")
            ], "B", 5, "One idea per slide and a clear hook on the first slide"),
            ("mcq", "Alt text on an image is mainly for", [
                ("A", "Describing the image to screen-reader users and when the image fails to load"),
                ("B", "Decoration"),
                ("C", "Tricking search engines"),
                ("D", "Copyright protection")
            ], "A", 5, "Describing the image to screen-reader users and when the image fails to load"),
            ("mcq", "Before publishing an infographic with statistics, you should", [
                ("A", "Trust your memory"),
                ("B", "Round the numbers randomly"),
                ("C", "Verify the numbers and cite the source"),
                ("D", "Remove the source to save space")
            ], "C", 5, "Verify the numbers and cite the source"),
            ("mcq", "Using a photo found through a web search is acceptable only if", [
                ("A", "It appears to be public"),
                ("B", "It is small"),
                ("C", "Competitors use it"),
                ("D", "You have the right or licence to use it and credit it as required")
            ], "D", 5, "You have the right or licence to use it and credit it as required"),
            ("written", "Plan a one-week social media campaign for a new report launch. Include the goal, audience, content types, schedule and how you would measure results.", None, None, 15, "Guide: clear goal; audience; key messages; content types; day-by-day schedule; channels; approvals; metrics such as reach, engagement, clicks and downloads; review after the campaign."),
            ("written", "Describe how you would turn a 40-page research report into a six-slide LinkedIn carousel.", None, None, 15, "Guide: choose the key findings; one idea per slide; strong hook; simple visuals; brand consistency; readable text; call to action pointing to the full report; accessibility."),
            ("written", "Write a short LinkedIn caption (maximum 80 words) announcing a webinar on a social development topic, with a call to action. Use placeholders for the date and link.", None, None, 20, "Guide: hook, topic, who should attend, date and time placeholders, call to action with a link placeholder, appropriate tone, within 80 words."),
            ("written", "A partner asks you to use their logo in a different colour to match your design. How do you respond, and what is your process for brand and approvals?", None, None, 20, "Guide: check the partner's brand guidelines; do not alter partner logos without written permission; get approval from the right person; offer alternatives such as a neutral background; document the decision.")
        ]
    },
    {
        "index": 11,
        "name": "Associate - Partnerships & BD",
        "job_id": "90000000-0000-0000-0000-000000000004",
        "programme_id": "10000000-0000-0000-0000-000000000005",
        "questions": [
            ("mcq", "What is the first thing to do with a new RFP?", [
                ("A", "Start writing straight away"),
                ("B", "Email competitors"),
                ("C", "Ignore the scoring criteria"),
                ("D", "Read it fully, note eligibility, deadlines and scoring criteria, then decide go or no-go")
            ], "D", 5, "Read it fully, note eligibility, deadlines and scoring criteria, then decide go or no-go"),
            ("mcq", "A go/no-go decision should weigh", [
                ("A", "Only the fee"),
                ("B", "Fit with expertise, eligibility, capacity, competition, profitability and strategic value"),
                ("C", "Random choice"),
                ("D", "The length of the RFP")
            ], "B", 5, "Fit with expertise, eligibility, capacity, competition, profitability and strategic value"),
            ("mcq", "In bid scoring, the technical proposal mainly shows", [
                ("A", "The price only"),
                ("B", "Bank details"),
                ("C", "Your understanding of the problem, approach, team and work plan"),
                ("D", "The company logo")
            ], "C", 5, "Your understanding of the problem, approach, team and work plan"),
            ("mcq", "The RFP sets a 10-page limit. You should", [
                ("A", "Submit 20 pages"),
                ("B", "Follow the page limit and format exactly"),
                ("C", "Shrink the font to 6 points"),
                ("D", "Skip the limit")
            ], "B", 5, "Follow the page limit and format exactly"),
            ("mcq", "A CRM is used to", [
                ("A", "Edit images"),
                ("B", "Run payroll"),
                ("C", "Host chat"),
                ("D", "Track contacts, opportunities, follow-ups and history")
            ], "D", 5, "Track contacts, opportunities, follow-ups and history"),
            ("mcq", "A clarification question about an RFP should be sent", [
                ("A", "Through a friend inside the organisation"),
                ("B", "After you submit"),
                ("C", "Through the official channel named in the RFP, before the stated deadline"),
                ("D", "Never")
            ], "C", 5, "Through the official channel named in the RFP, before the stated deadline"),
            ("written", "Outline the steps of preparing a proposal response from RFP release to submission, with roles and a timeline.", None, None, 15, "Guide: read the RFP and decide go/no-go; kickoff and roles; compliance matrix; clarification questions; technical and financial drafting; internal review; formatting; submission with a time buffer; working backwards from the deadline."),
            ("written", "Draft a short introductory email (6 to 8 lines) to a potential institutional partner proposing a conversation about a joint project. Use placeholders for unknown details.", None, None, 15, "Guide: personalised greeting; brief introduction of the organisation; relevance to the partner; a clear and specific ask; a contact; polite, concise tone; placeholders used correctly."),
            ("written", "A tender gives 70% weight to the technical proposal and 30% to the financial proposal. How does that affect your proposal and what would you prioritise?", None, None, 20, "Guide: invest most effort in approach, methodology, team and relevant experience; still price competitively; meet all mandatory criteria; make the scoring easy to follow with a clear crosswalk to the criteria."),
            ("written", "A competitor's staff member offers you confidential information about another bid. How do you respond, and why?", None, None, 20, "Guide: decline and do not use it; ethical, legal and reputational risk; report to your manager; protect the organisation's integrity; follow procurement rules.")
        ]
    }
]

def escape_sql(text):
    if text is None:
        return "null"
    return "'" + text.replace("'", "''") + "'"

def main():
    lines = []
    lines.append("-- ====================================================================")
    lines.append("-- IKAAI ACADEMY / LIBRARY - ROLE-BASED EXAM QUESTIONS SEED")
    lines.append("-- 11 ROLES x 10 QUESTIONS (6 MCQ @ 5 marks + 4 Written @ 15, 15, 20, 20 = 100 marks)")
    lines.append("-- Safe to re-run: deterministic UUIDs, ON CONFLICT DO UPDATE")
    lines.append("-- ====================================================================\n")
    lines.append("begin;\n")

    total_questions = 0
    total_options = 0

    for role in ROLES:
        r_idx = role["index"]
        job_id = role["job_id"]
        prog_id = role["programme_id"]
        r_name = role["name"]

        lines.append(f"-- --------------------------------------------------------------------")
        lines.append(f"-- ROLE {r_idx}: {r_name} (Job: {job_id})")
        lines.append(f"-- --------------------------------------------------------------------")

        for q_idx, q in enumerate(role["questions"], start=1):
            total_questions += 1
            q_type, q_title, options, correct_opt, max_marks, guide = q
            q_id = f"81000000-0000-0000-0000-{r_idx:02d}00000000{q_idx:02d}"

            lines.append(f"-- Question {q_idx} ({q_type.upper()}, {max_marks} marks)")
            lines.append(f"insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)")
            lines.append(f"values (")
            lines.append(f"  '{q_id}',")
            lines.append(f"  '{job_id}',")
            lines.append(f"  '{prog_id}',")
            lines.append(f"  {escape_sql(q_title)},")
            lines.append(f"  {escape_sql(q_title)},")
            lines.append(f"  {max_marks},")
            lines.append(f"  {q_idx},")
            lines.append(f"  '{q_type}',")
            lines.append(f"  {escape_sql(guide)},")
            lines.append(f"  true")
            lines.append(f")")
            lines.append(f"on conflict (id) do update set")
            lines.append(f"  job_id = excluded.job_id,")
            lines.append(f"  programme_id = excluded.programme_id,")
            lines.append(f"  question = excluded.question,")
            lines.append(f"  prompt = excluded.prompt,")
            lines.append(f"  max_marks = excluded.max_marks,")
            lines.append(f"  sort_order = excluded.sort_order,")
            lines.append(f"  question_type = excluded.question_type,")
            lines.append(f"  marking_guide = excluded.marking_guide,")
            lines.append(f"  is_active = excluded.is_active;\n")

            if q_type == "mcq" and options:
                opt_map = {"A": 1, "B": 2, "C": 3, "D": 4}
                for opt_label, opt_text in options:
                    total_options += 1
                    k = opt_map[opt_label]
                    opt_id = f"82000000-0000-0000-0000-{r_idx:02d}{q_idx:02d}000000{k:02d}"
                    is_corr = "true" if opt_label == correct_opt else "false"

                    lines.append(f"insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)")
                    lines.append(f"values ('{opt_id}', '{q_id}', '{opt_label}', {escape_sql(opt_text)}, {is_corr}, {k})")
                    lines.append(f"on conflict (id) do update set")
                    lines.append(f"  question_id = excluded.question_id,")
                    lines.append(f"  option_label = excluded.option_label,")
                    lines.append(f"  option_text = excluded.option_text,")
                    lines.append(f"  is_correct = excluded.is_correct,")
                    lines.append(f"  sort_order = excluded.sort_order;")
                lines.append("")

    lines.append("commit;\n")
    lines.append(f"-- Verification notice: Seeded {total_questions} questions and {total_options} options across 11 roles.")

    content = "\n".join(lines)
    with open("supabase/seed_exam_questions.sql", "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully generated supabase/seed_exam_questions.sql: {total_questions} questions, {total_options} options.")

if __name__ == "__main__":
    main()

