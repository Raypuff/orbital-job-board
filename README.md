# CCSGP Volunteer Job Board

## Who are we?

We are Raypuff (Loh Jia Ming, Rayner) and ZechAJW (Zechary Au Jun Wen) and we are Year 1 Computer Science Students from NUS. This project was developed for **CP2106 (Orbital) 2021** under Team NUSGrabYourOwnFood.

## Purpose and Background

The Centre for Computing for Social Good & Philanthropy (CCSGP) is a new centre set up in NUS School of Computing (SoC) since March 2021. The goal of CCSGP is to complement the technical training provided by the School of Computing by cultivating future technology leaders who have the ethos of service and giving back to society.

The **CCSGP Volunteer Job Board** has the primary purpose of connecting _interested volunteers_ from SoC with _charities/non-governmental organizations_ (NGOs) to work on community involvement projects (CIPs) to contribute to society. Through this web application, we hope that these organizations would be able to more easily recruit volunteers. Interested students will also be able to search for volunteer opportunities on a consolidated platform that provides comprehensive information so that applying for these roles become a breeze.

## Try it out!

[Our website](https://volunteer-ccsgp.vercel.app/ "Website")

[Our GitHub Repo](https://github.com/Raypuff/orbital-job-board "GitHub Repo")

[Our poster](https://drive.google.com/file/d/1nsecsyOWpjNYWjVU8bYa7FxjphBxLOKh/view?usp=sharing "Poster")

[Our demo video](https://drive.google.com/file/d/1KUSu9Xx-kPYpAYzoeOspLDN17fMOd1UD/view?usp=sharing "Demo Video")

[Our project logbook](https://docs.google.com/spreadsheets/d/1HsLfNHxZ4fMQSNBybzluq1HdkAFYvASxaa2HC9JAglQ/edit?usp=sharing "Project Logbook")

[Our proposal](https://docs.google.com/document/d/1h0JwCsjwX3XLwYS6BjNqg9NluY7D2T5eR8hlQdbZxw0/edit?usp=sharing "Proposal")

---

# Details

## Motivation

As Year 1 NUS students ourselves, we are not unfamiliar with the problems that students typically face when looking for volunteering opportunities to join. When Professor Ben Leong proposed this Orbital project idea, we leapt at the opportunity to sign up, recognizing that there remains a sizable gap in communication with organizations looking to recruit NUS Computing students for volunteer opportunities.

Personally, our volunteering experience with SOC has been rather short-lived, as the opportunity I signed up for, a volunteer opportunity looking to introduce seniors from CareCorner Senior Activity Centre to IT, was cancelled due to insufficient volunteers and lack of proper publicity within NUS Computing. Furthermore, finding volunteer experiences relevant to my technical skill-set remains difficult, as there is no consolidated avenue to look for volunteer requests suitable for me. By the time I became aware of Code in the Community, an initiative to introduce underprivileged children to coding, the sign up period had lapsed and I missed yet another volunteering opportunity. As a result, we recognize the impact that a dedicated job board would have for the volunteering scene in NUS Computing.

## Target Audience

- Charities and NGOs looking to recruit volunteers from NUS SoC
- NUS SoC students interested in using their technical skills to make a positive impact on society through volunteer opportunities

## Needs

### Charities and NGOs

- Charities and NGOs often struggle to recruit sufficient volunteers for CIPs
- These are some of the reasons why
  - The portal or platform used to recruit volunteers is obscure
  - The duration of the CIP is incompatible with students' busy schedules
  - The processing of volunteers is manual and tedious
  - Students do not see any personal benefit from volunteering

### NUS SoC students

- Students that are interested in volunteering do not know where to look for opportunities (especially opportunities that can make use of their technical abilities)
- The application process is long and unclear

### NUS Staff in CCSGP

- When CCSGP opens, they would definitely receive requests from charities and NGOs to recruit SoC students as volunteers
- CCSGP Staff would have to manually process these requests by: asking for specific details, gaining approval, emailing students, link students up with charities and NGOs

---

## Features (User Stories)

### ~~Features to be completed by end of May~~ **Completed**

- As a site user (logged out or logged in), I want to
  - **browse available jobs** so that I can decide which job(s) to apply for
- As a volunteer recruiter, I want to
  - **create an account** so that I can login to post a job listing

### Features to be completed by mid of June

- As a student from NUS, I want to
  - **send in job applications** so that I can notify organizations of my interest in volunteering for their CIP
  - **be contacted when my application is successful** so that I can appropriately accommodate and prepare for it
- As a volunteer recruiter, I want to
  - **post a job listing** so that potential volunteers can view them and apply for it
  - **view applicants for my job listings** so that I follow up appropriately
- As a CCSGP admin, I want to
  - **login with my NUS staff account** so that I can access administrative privileges
  - **view all pending job listings** so that I can deem if they are appropriate to be uploaded on the platform
  - **accept or reject job listings** so that I can ensure only approved listings are published on the job board

### Features to be completed by end of June

- As a student from NUS, I want to
  - **login with my NUS student account** so that I can easily volunteer my services
  - **filter jobs** so that I can quickly browse jobs that are more relevant to me
  - **check the status of my applications** so that I can know if I have been accepted or rejected
- As a volunteer recruiter, I want to
  - **accept or reject applicants** so that I can choose which volunteers to take on
- As a CCSGP admin, I want to
  - **be able to take down job listings** so that I can remove any inappropriate content

### Features to be completed by mid of July

- As a student from NUS, I want to
  - **ask organizations questions** so that I can clear up any queries I have
  - **subsribe to email notification** so that I can receive email updates if there are new volunteer opportunities
  - **unsubscribe from email notifications** so that I can ensure that I only receive emails I am interested in
  - **select which kinds of jobs I will be notified of** so that I only receive relevant updates in my inbox
- As a volunteer recruiter, I want to
  - **edit my job listings** so that I can reflect any real time changes to my CIP
  - **contact job applicants** so that I can clarify any questions about their application
  - **edit my profile details** so that I can still be contacted if my details were to change
- As a CCSGP admin, I want to
  - **contact an organization** so that I can discuss their job listings with them
  - **view the details of all job listings** so that I can check the status of the job

---

## Technologies and Practices

### Tech Stack

- ReactJS
  - React Router
  - Bootstrap 4
- Firebase by Google
  - Firebase Authentication
  - Firestore (temporarily)
- Vercel

Future plans to migrate the database to

- Golang
- MongoDB

### Software Engineering Practices

Development Plan

- UX Research
  - Upon our request to contact Charities and NGOs to conduct UX research, Sharon from CCSGP sent us resources from NVPC and Volunteer.gov to better understand the [factors that would increase the number of students who volunteer]
    - Convenient location, Aligned with hobbies and interests, Learn a new skill, Can be done in a short period of time remotely, etc.
  - We also setup a call with the Director and Vice Director of Community Service Cell from the Computing Club's 23rd Management Committee to find our about their experiences with recruiting volunteers for CIPs in SoC
    - We found out that some reasons why students don't volunteer is because of their tight schedules, obscurity of the recruitment efforts as well as the lack of understanding of how volunteering would benefit them.
- User stories
  - We conceived four different epics that encapsulate the aim of our entire project with multiple user stories under each epic ensuring that the development of our project is user centric
  - We utilized the INVEST (independent, negotiable, valuable, estimable, small, testable) framework to ensure that our user stories were appropriate to support our development journey
- Site flow
  - Developed a [site flow] with circles, squares and arrows on Figma Jam so that we have a better understanding of how a user's experience on our site will be like before actually drawing up any wireframes
- Wireframe
  - Crafted an interactive wireframe with Figma to simulate how the user interface will operate and how the site will flow
- Mockups
  - We then included logos, colour schemes, styled buttons, styled text and content on our [mockup] to better visualize the user experience on our website
  ##### (The mockup link is just a PDF export and doesn't display the interactive capabilities that Figma provides)
- Agile development framework
  - Our mentor (Mr Ng Chee Chiu from Websparks) introduced us to the Agile development framework, a commonly adapted practice in the software development industry
  - We adopted week long sprints where we select user stories to complete over the sprint duration
  - We have daily standup meetings to discuss: what we did yesterday, what we're going to today, what obstacles did we encounter?
  - Weekly sprint reviews and retrospectives with our scrum master (mentor) to gauge our completion date as well as how we can improve our sprint workflow
- Version Control System with Git
  - We used Git throughout our [entire development process]
  - We utilized branching and merging to efficiently develop new features at the same time
  - Documented the development of all the features and bug fixes through commit messages
  - You can view all our commits history on our GitHub page

[site flow]: https://drive.google.com/file/d/1hSdXyB1xFKmg6QlgVsGBnoERXTWEKx4g/view?usp=sharing
[mockup]: https://drive.google.com/file/d/1GWElwW_TpZHDBW_2tFEk45t8m7Xg8y36/view?usp=sharing
[factors that would increase the number of students who volunteer]: https://drive.google.com/file/d/11drWXDgHnCVS_HWrWJEo9_XPGcHyMy9K/view?usp=sharing
[entire development process]: https://github.com/Raypuff/orbital-job-board
