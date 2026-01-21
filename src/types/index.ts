export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  technology?: string;
  specifications?: string[];
  features?: string[];
  benefits?: string[];
  implementation?: string[];
  equipment?: string[];
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface ContactInfo {
  address: string;
  phones?: string[];
  email: string;
  workingHours?: {
    weekdays?: string;
    technicalSupport?: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}
