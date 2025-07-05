import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  mainEntity?: {
    name: string;
    url: string;
  };
}

/**
 * FAQ Schema component for rich snippets
 * Generates JSON-LD structured data for FAQ content
 */
export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs, mainEntity }) => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    ...(mainEntity && {
      about: {
        '@type': 'WebPage',
        name: mainEntity.name,
        url: mainEntity.url,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
};

// Predefined FAQ data for common sections
export const contactFAQs: FAQItem[] = [
  {
    question: "How can I contact Bahari for a project?",
    answer: "You can contact me through the contact form on this page, send an email to hello@baharihari.com, or connect with me on LinkedIn. I typically respond within 24 hours."
  },
  {
    question: "What services does Bahari offer?",
    answer: "I offer frontend development, full-stack web development, API development, and web application consulting. I specialize in React, Next.js, Laravel, and modern web technologies."
  },
  {
    question: "What is Bahari's experience level?",
    answer: "I have 2.5+ years of professional experience in web development, with expertise in both frontend and backend technologies. I've completed 10+ projects and continue to work on ongoing projects."
  },
  {
    question: "What technologies does Bahari work with?",
    answer: "I work with React.js, Next.js, Vue.js, Laravel, Node.js, TypeScript, JavaScript, PHP, MySQL, and modern web development tools. I'm always learning new technologies to stay current."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. Simple websites may take 1-2 weeks, while complex web applications can take 1-3 months. I provide detailed timelines during project planning."
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes, I offer ongoing maintenance, updates, and support for projects I develop. This includes bug fixes, feature enhancements, and technical support as needed."
  },
  {
    question: "What is your development process?",
    answer: "My process includes: 1) Requirements gathering and planning, 2) Design and architecture, 3) Development with regular updates, 4) Testing and quality assurance, 5) Deployment and launch, 6) Ongoing support."
  },
  {
    question: "Can you work with existing teams or codebases?",
    answer: "Absolutely! I can integrate with existing development teams, work with legacy codebases, and collaborate using various development workflows and tools."
  }
];

export const blogFAQs: FAQItem[] = [
  {
    question: "How often does Bahari publish new blog posts?",
    answer: "I publish new articles regularly, covering topics in frontend development, full-stack programming, and web technology trends. Follow the blog or subscribe to stay updated."
  },
  {
    question: "Can I suggest topics for blog posts?",
    answer: "Yes! I welcome topic suggestions from readers. You can contact me through the contact form or social media with your ideas for articles you'd like to see."
  },
  {
    question: "Are the tutorials suitable for beginners?",
    answer: "My blog covers content for various skill levels, from beginner tutorials to advanced concepts. Each post is tagged with difficulty level to help you find appropriate content."
  },
  {
    question: "Can I republish or share blog content?",
    answer: "You're welcome to share links to articles and quote excerpts with proper attribution. For republishing full articles, please contact me for permission."
  }
];

export const portfolioFAQs: FAQItem[] = [
  {
    question: "Are these real projects or just demonstrations?",
    answer: "All projects in my portfolio are real, functional applications that I've developed for clients or as personal projects. Each includes links to live demos where possible."
  },
  {
    question: "Can I see the source code for your projects?",
    answer: "Some projects include GitHub links where the source code is available. For client projects, I respect confidentiality but can discuss technical approaches and methodologies."
  },
  {
    question: "What was your role in team projects?",
    answer: "For each project, I clearly indicate my role - whether as lead developer, frontend specialist, full-stack developer, or team collaborator. I believe in transparent project attribution."
  },
  {
    question: "How do you choose which projects to showcase?",
    answer: "I select projects that demonstrate a range of skills, technologies, and problem-solving approaches. The portfolio represents my growth as a developer and diverse project experience."
  }
];

export default FAQSchema;