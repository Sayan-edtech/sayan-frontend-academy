import type { About } from "./about";
import type { Opinion } from "./opinion";
import type { Course } from "./couse";
import type { FAQ } from "./faq";

export interface Academy {
  id: number;
  name: string;
  subdomain: string | null;
  slug: string;
  domain: string;
  email: string;
  phone: string;
  address: string | null;
  logo: string;
  banner: string | null;
  description: string | null;
  status: string;
  created_at: string; // ISO date string
  updated_at: string | null;
}

export interface Hero {
  id: number;
  second_link_title: string;
  updated_at: string; // ISO date string
  title: string;
  second_link_url: string;
  content: string | null;
  subtitle: string | null;
  image: string;
  button_text: string | null;
  status: boolean;
  order: number;
  description: string;
  is_active: boolean;
  first_link_title: string;
  link: string | null;
  academy_id: number;
  first_link_url: string;
  created_at: string; // ISO date string
}
export interface Settings {
  platform_name: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  default_currency: string;
  vat_percentage: string;
  platform_fee_percentage: string;
  max_withdrawal_amount: string;
  min_withdrawal_amount: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
  snapchat: string;
  tiktok: string;
  telegram: string;
  discord: string;
  subdomain: string;
  logo: string;
  favicon: string;
  banner: string;
  custom_css: string;
  custom_js: string;
}

export interface AcademyResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    academy: Academy;
    about: About;
    hero: Hero;
    settings: Settings;
    faqs: FAQ[];
    opinions: Opinion[];
    courses: Course[];
  };
  path: string | null;
  timestamp: string;
}
