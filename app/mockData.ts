export interface HeaderLink {
  readonly label: string;
  readonly href: string;
  readonly active?: boolean;
}

export interface HeroData {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly bgImage: string;
}

export interface ProductItem {
  readonly id: string;
  readonly name: string;
  readonly subtitle: string;
  readonly price: number;
  readonly tag: string;
  readonly tagType: "FIRE" | "TANGY" | "BOLD";
  readonly image: string;
}

export interface ProcessItem {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface SecretData {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly quote: string;
  readonly image: string;
  readonly processes: readonly ProcessItem[];
}

export interface FooterData {
  readonly title: string;
  readonly description: string;
  readonly links: readonly HeaderLink[];
  readonly copyright: string;
}

export const headerLinks: readonly HeaderLink[] = [
  { label: "Heritage Stories", href: "#", active: true },
  { label: "Pickle Types", href: "#" },
  { label: "Contact", href: "#" },
];

export const heroData: HeroData = {
  tag: "Handmade in Kerala",
  title: "A Taste of Heritage \nin Every Jar.",
  description: "Sun-dried spices, hand-pressed oils, and recipes passed down through five generations of the Tharavadu kitchen.",
  bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoUznVV69Rt-xN9qxSc4arytz9afq9JFELg_GPh93gOKmybLNyy7szzp-513qq5OK_mjJJkMuxMPlDd1RaYo2m6s7YDsUZwM2WjZwimJ1Ig1cBMcwo1xHwfIsMEKMU3OLS9snMBAPztbHA0yc5ujCgrobNCOPv6EDXF8X5zfw-TINBezZgQpVe0NGFK9d33_VkdvsTuSoDtIqmvqkeKjiIT71tJEsr7ypdSYGWtC3yawDO7yDheHrDgGb1yrjx5J2VRQ9os2vgYGI",
};

export const featuredProducts: readonly ProductItem[] = [
  {
    id: "mango",
    name: "Spicy Kaduku Mango",
    subtitle: "Aged for 6 months",
    price: 349,
    tag: "FIRE",
    tagType: "FIRE",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWoy6E2xRe7AhjbeP57yWOQCdN9-COZVx--DvCf71LBabeS6W8bk_Jer8CsCaARS9-8rRXs75RKGnLCitO--itCs2unMt3mm2-H42Meujo9tt-xXW7jnPnZ0LxUDjwCMmrAggBOIPbwokSB9fLeC3FlFCdWDF8Hk5oYdZ0IS0W_JW2ZnIqoaqUjBvE3cUQdOYTNEww10rr0ympoUaoivwqfoTqokz3ng4tsW_UTf4SBX_m-IohfQEAyk59xKr3MP_WYpiN6bLtvwE",
  },
  {
    id: "lime",
    name: "Salt-Cured Lime",
    subtitle: "Slow sun-matured",
    price: 299,
    tag: "TANGY",
    tagType: "TANGY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi5MLb817MU-_fzJwss5vJfZsbpb3-eKjIUIXADRnDUkji_dIKsY7EOU2odN_wByPYSgtBFEM_8VzuiA2HTwA0d_4LtAej8O0V09fw-fVa_Ba90cOSrY7rL6YXzNI1PHVEwWw9plWoV8ccqoZ_wMOh1KHZ9Asyms0GOPK4uj8-MdV12K6NyHyoVLyDVgjqZ5iZ3L1bfG33eDHykd5L-CpMjVBslBSPtaabMu7Bw07Hwv-ijWJ8-RkIp5AZxJOkTJH46P-UFLXrsa4",
  },
  {
    id: "garlic",
    name: "Gingelly Garlic",
    subtitle: "Five-spice infusion",
    price: 389,
    tag: "BOLD",
    tagType: "BOLD",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3kW6a1GU6vo5FyavObnPkWspGJ7OVfqt13fHp0uUwbfBuuzNY0HiE7q9XiCi3-xCsgB3tBMtxTeyx5Zei2x_GckNPIKgNAUeP67ERhu8iGlp3qLAp6_ogLYhqZm1Q19-v_FDHYeJlRvmDVCrWHAU63mub8Ym3WIGMm1nrSMFtCnOY5NbyeqcdRIJjjZAo1_S2QdPKbkC7OQpzSiZR8oMvy_ZFSJ0FPXBmQWTHnp99k299XCls_rWLkAq-YGMglfUkOBjp3sQ__vg",
  },
];

export const secretData: SecretData = {
  tag: "The Process",
  title: "Granny's Secret",
  description: "Every jar begins with hand-picked produce from our own orchards. We don't use chemical preservatives; instead, we rely on the natural alchemy of salt, oil, and the scorching Kerala sun.",
  quote: "The secret is the patience to wait for the sun.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxVPY5K7q7N7EdswaoiSNjt25N8Ia8_tgqc3Puk5FlvLTaWo7FTl-AUvEzOIxQsx8QpXYkzgQOvOtkv9APzjOXhL7axNq-9tCUgKVf1NMTATI3qvL26sFOXqwhBrhzHD-wB8QSeahRVUrCn56BdmlhfKVr4mEKzZ4jfjWY08SBsgWsTyYGFN_OT_jNPKrFzsDdaKLX3zXyiQFuojsCi38iKOk3YF7B2t2zKaZdT08O-efUSg-mgn7PKmMlLaRvZi4hyfC1fvprdmY",
  processes: [
    {
      title: "Sun-Matured",
      description: "Cured for 21 days in direct sunlight in traditional Bharanis.",
      icon: "sunny",
    },
    {
      title: "Wood-Pressed Oils",
      description: "We only use oils extracted in traditional wooden chucks.",
      icon: "eco",
    },
    {
      title: "Ancestral Recipe",
      description: "The exact spice blend recorded in 1924 by Great Grandma.",
      icon: "history_edu",
    },
  ],
};

export const footerData: FooterData = {
  title: "Granny's Kitchen",
  description: "Preserving the soul of Kerala, one jar at a time. Authentic, artisanal, and always small-batch.",
  links: [
    { label: "Heritage Stories", href: "#" },
    { label: "Pickle Types", href: "#" },
    { label: "Contact Info", href: "#" },
    { label: "Shipping Policy", href: "#" },
  ],
  copyright: "Made with love in Kerala. © 2024 Granny's Kitchen",
};
