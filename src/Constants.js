//Beneficiary and SkillTags for PostAJob, Filters, Subscriptions, etc.
//Do ensure that there are no spaces for each tag
//(Try not to delete tags as jobs that have deleted tags will no longer be visible on the job board)
export const BeneficiaryTags = [
  "Animals",
  "Children",
  "Disability",
  "Education",
  "Elderly",
  "Environment",
  "Health",
  "Heritage",
  "Sports",
  "Women",
  "Youths",
  "Other",
];
export const SkillTags = [
  "Database",
  "Java",
  "Javascript",
  "Marketing",
  "MobileDev",
  "Planning",
  "Python",
  "Software",
  "WebDev",
  "Others",
];

//To store the details of CCSGP
export const CCSGP = {
  block: "Computing 2",
  street: "13 Computing Drive",
  postalCode: "117417",
  phone: "6601 2295",
  email: "ccsgp@nus.edu.sg",
  googleMapsDirection:
    "https://www.google.com/maps/dir/?api=1&destination=Centre%20for%20Computing%20for%20Social%20Good%20&%20Philanthropy,%20National%20University%20of%20Singapore,%20Computing%202,%20#02-15,%2013%20Computing%20Drive,%20Singapore%20117417",
  website: "https://www.ccsgp.comp.nus.edu.sg/",
  legal: "https://www.ccsgp.comp.nus.edu.sg/legal",
  contactUs: "https://www.ccsgp.comp.nus.edu.sg/contact-us",
  nusWebsite: "https://www.comp.nus.edu.sg/",
};

//Number of jobs per page on the job board
export const jobsPerPage = 3;

//For React Select
export const SelectBeneficiaryTags = BeneficiaryTags.map((beneficiary) => {
  return { value: beneficiary, label: beneficiary };
});

export const SelectSkillTags = SkillTags.map((skill) => {
  return { value: skill, label: skill };
});

//Terms and conditions
export const TermsAndConditions = () => (
  <>
    <li>Agreement To Terms</li>
    <p>
      All access of any area of "volunteer-ccsgp.vercel.app" ("The Website") is
      governed by the terms and conditions below ("Terms"). If you do not accept
      any of these Terms, exit immediately. Continue only if you accept these
      Terms. In these Terms, the words "we", "our" and "us" refers to the
      Government of Singapore.
    </p>
    <li>Access To The Website</li>
    <p>
      The accessibility and operation of The Website relies on technologies
      outside our control. We do not guarantee continuous accessibility or
      uninterrupted operation of The Website.
    </p>
    <li>Relying On Information</li>
    <p>
      We provide The Website as a general information source only and we are not
      involved in giving professional advice here. The Website may not cover all
      information available on a particular issue. Before relying on the
      Website, you should do your own checks or obtain professional advice
      relevant to your particular circumstances.
    </p>
    <li>Security</li>
    <p>
      Where appropriate, we use available technology to protect the security of
      communications made through The Website. However, we do not accept
      liability for the security, authenticity, integrity or confidentiality of
      any transactions and other communications made through The Website.
    </p>
    <p>
      Internet communications may be susceptible to interference or interception
      by third parties. Despite our best efforts, we make no warranties that The
      Website is free of infection by computer viruses or other unauthorised
      software.
    </p>
    <p>
      You should take appropriate steps to keep your information, software and
      equipment secure. This includes clearing your Internet browser cookies and
      cache before and after using any services on The Website. You should keep
      your passwords confidential.
    </p>
    <li>Hyperlinks</li>
    <p>
      We are not responsible or liable for the availability or content of any
      other Internet site (not provided by us) linked to or from The Website.
      Access to any other Internet site is at your own risk. If you create a
      link or frame to The Website, you do so at your own risk.
    </p>
    <p>
      We reserve the right to object or disable any link or frame to or from The
      Website.
    </p>
    <p>We reserve the right to change the URL of The Website.</p>
    <li>Intellectual Property</li>
    <p>
      Materials, including source code, pages, documents and online graphics,
      audio and video in The Website are protected by law. The intellectual
      property rights in the materials is owned by or licensed to us. All rights
      reserved. (Government of Singapore © 2018).
    </p>
    <p>
      Apart from any fair dealings for the purposes of private study, research,
      criticism or review, as permitted in law, no part of The Website may be
      reproduced or reused for any commercial purposes whatsoever without our
      prior written permission.
    </p>
    <li>General Disclaimer And Limitation Of Liability</li>
    <p>
      We will not be liable for any loss or damage{" "}
      <ol>
        <li>
          That you may incur on account of using, visiting or relying on any
          statements, opinion, representation or information in The Website;
        </li>
        <li>
          Resulting from any delay in operation or transmission, communications
          failure, Internet access difficulties or malfunctions in equipment or
          software; or
        </li>
        <li>
          Resulting from the conduct or the views of any person who accesses or
          uses The Website.
        </li>
      </ol>
    </p>
    <li>Fees</li>
    <p>
      There are currently no fees for using any part of The Website. We reserve
      the right to introduce new fees from time to time. We are not responsible
      for any fees charged by any other Internet site (not provided by us).
    </p>
    <li>Applicable Laws</li>
    <p>
      Use of The Website and these Terms are governed by the laws of Singapore.
      Any claim relating to use of The Website shall be heard by Singapore
      Courts.
    </p>

    <li>Variation</li>
    <p>
      We may revise these Terms at any time by updating this page. You should
      visit this page from time to time and review the then current Terms
      because they are binding on you. We may modify or discontinue any
      information or features that form part of The Website at any time, with or
      without notice to you, and without liability.{" "}
    </p>
  </>
);
