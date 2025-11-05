import profileData from '@/data/profile.json'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileData.profile.name,
    description: profileData.profile.bio,
    image: profileData.profile.avatar,
    url: 'https://chihebnabil.com',
    
    // Job title and skills
    jobTitle: 'Full Stack Developer',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationalCategory: 'Software Engineer',
      skills: profileData.profile.badges,
    },
    
    // Social media profiles
    sameAs: profileData.socialLinks.map(social => social.url),
    
    // Contact information
    email: 'chiheb.design@gmail.com',
    
    // Known for (projects/products)
    knowsAbout: [
      'Full Stack Development',
      'Web Development',
      'Mentorship',
      'SaaS Development',
      'Product Development',
      'Open Source',
      ...profileData.profile.badges,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
