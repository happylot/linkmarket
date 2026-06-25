export type Niche =
  | "Technology"
  | "Finance"
  | "Health & Wellness"
  | "Travel"
  | "Lifestyle"
  | "Business"
  | "Marketing"
  | "Education"
  | "Real Estate"
  | "Food & Beverage";

export type ContentOption = "Buyer provides content" | "Written by publisher" | "Written by us (+fee)";

export interface Listing {
  id: string;
  domain: string;
  niche: Niche[];
  language: string;
  country: string;
  domainAuthority: number;
  organicTraffic: number;
  spamScore: number;
  turnaroundDays: number;
  price: number;
  linkType: "Dofollow" | "Nofollow";
  contentOptions: ContentOption[];
  sampleUrl: string;
  rating: number;
  reviewCount: number;
  publisherName: string;
  verified: boolean;
}

export interface Order {
  id: string;
  listingId: string;
  domain: string;
  price: number;
  contentOption: ContentOption;
  briefTitle: string;
  briefNotes: string;
  targetUrl: string;
  anchorText: string;
  status: "Pending Review" | "In Progress" | "Published" | "Revision Requested";
  createdAt: string;
}
