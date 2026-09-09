import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../config/seo';

/**
 * SEO Component for managing all meta tags, canonicals, and structured data
 */
const SEO = ({
  title,
  description,
  path = '',
  schema,
  ogImage,
  noindex = false
}) => {
  const fullTitle = title === SEO_CONFIG.BUSINESS_NAME 
    ? title 
    : `${title} | ${SEO_CONFIG.BUSINESS_NAME}`;
    
  const fullUrl = `${SEO_CONFIG.WEBSITE_URL}${path}`;
  const image = ogImage || SEO_CONFIG.PRIMARY_IMAGE;
  const metaDescription = description || SEO_CONFIG.BUSINESS_DESCRIPTION;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SEO_CONFIG.WEBSITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data / JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
