'use client';

import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

interface SocialLinksProps {
  links: { name: string; url: string }[];
  size?: 'sm' | 'md' | 'lg'; // optional
}

export default function SocialLinks({ links, size = 'md' }: SocialLinksProps) {
  const iconClass =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <FaFacebookF />;
      case 'twitter':
        return <FaTwitter />;
      case 'linkedin':
        return <FaLinkedinIn />;
      default:
        return <span>{name[0]}</span>;
    }
  };

  return (
    <>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition ${iconClass}`}
          aria-label={link.name}
        >
          {getIcon(link.name)}
        </a>
      ))}
    </>
  );
}
