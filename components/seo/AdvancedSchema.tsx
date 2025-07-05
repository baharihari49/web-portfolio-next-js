import React from 'react';

// HowTo Schema for tutorial blog posts
interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: HowToStep[];
  supply?: string[];
  tool?: string[];
}

export const HowToSchema: React.FC<HowToSchemaProps> = ({
  name,
  description,
  image,
  totalTime,
  steps,
  supply = [],
  tool = [],
}) => {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(image && { image }),
    ...(totalTime && { totalTime }),
    ...(supply.length > 0 && { supply }),
    ...(tool.length > 0 && { tool }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema),
      }}
    />
  );
};

// Review Schema for testimonials
interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  itemReviewed: {
    name: string;
    type: string;
  };
}

export const ReviewSchema: React.FC<ReviewSchemaProps> = ({ reviews, itemReviewed }) => {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: reviews.map((review, index) => ({
      '@type': 'Review',
      position: index + 1,
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.reviewBody,
      ...(review.datePublished && { datePublished: review.datePublished }),
      itemReviewed: {
        '@type': itemReviewed.type,
        name: itemReviewed.name,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewSchema),
      }}
    />
  );
};

// Course Schema for educational content
interface CourseModule {
  name: string;
  description: string;
  url?: string;
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider: string;
  url?: string;
  courseMode?: string[];
  duration?: string;
  level?: string;
  modules?: CourseModule[];
}

export const CourseSchema: React.FC<CourseSchemaProps> = ({
  name,
  description,
  provider,
  url,
  courseMode = ['Online'],
  duration,
  level,
  modules = [],
}) => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    ...(url && { url }),
    courseMode,
    ...(duration && { timeRequired: duration }),
    ...(level && { educationalLevel: level }),
    ...(modules.length > 0 && {
      hasPart: modules.map(module => ({
        '@type': 'Course',
        name: module.name,
        description: module.description,
        ...(module.url && { url: module.url }),
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(courseSchema),
      }}
    />
  );
};

// Software Application Schema for web projects
interface SoftwareFeature {
  name: string;
  description: string;
}

interface SoftwareSchemaProps {
  name: string;
  description: string;
  url?: string;
  applicationCategory: string;
  operatingSystem?: string[];
  features?: SoftwareFeature[];
  author: string;
  datePublished?: string;
  programmingLanguage?: string[];
}

export const SoftwareSchema: React.FC<SoftwareSchemaProps> = ({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = ['Web Browser'],
  features = [],
  author,
  datePublished,
  programmingLanguage = [],
}) => {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    ...(url && { url }),
    applicationCategory,
    operatingSystem,
    author: {
      '@type': 'Person',
      name: author,
    },
    ...(datePublished && { datePublished }),
    ...(programmingLanguage.length > 0 && { programmingLanguage }),
    ...(features.length > 0 && {
      featureList: features.map(feature => feature.name),
      applicationSubCategory: features.map(feature => feature.description),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareSchema),
      }}
    />
  );
};

// Article Series Schema for related blog posts
interface SeriesArticle {
  name: string;
  url: string;
  position: number;
}

interface ArticleSeriesSchemaProps {
  name: string;
  description: string;
  articles: SeriesArticle[];
  author: string;
}

export const ArticleSeriesSchema: React.FC<ArticleSeriesSchemaProps> = ({
  name,
  description,
  articles,
  author,
}) => {
  const seriesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    hasPart: articles.map(article => ({
      '@type': 'Article',
      name: article.name,
      url: article.url,
      position: article.position,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(seriesSchema),
      }}
    />
  );
};

// Organization Schema for business information
interface ContactPoint {
  telephone?: string;
  email?: string;
  contactType: string;
  availableLanguage?: string[];
}

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  contactPoint?: ContactPoint[];
  sameAs?: string[];
  foundingDate?: string;
  founder?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name,
  description,
  url,
  logo,
  contactPoint = [],
  sameAs = [],
  foundingDate,
  founder,
  address,
}) => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    ...(logo && { logo }),
    ...(contactPoint.length > 0 && { contactPoint }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(foundingDate && { foundingDate }),
    ...(founder && {
      founder: {
        '@type': 'Person',
        name: founder,
      },
    }),
    ...(address && { address: { '@type': 'PostalAddress', ...address } }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
};

const AdvancedSchemas = {
  HowToSchema,
  ReviewSchema,
  CourseSchema,
  SoftwareSchema,
  ArticleSeriesSchema,
  OrganizationSchema,
};

export default AdvancedSchemas;