export const enMessages = {
  nav: {
    cakes: "Cakes",
    builder: "Cake Builder",
    food: "Food & Desserts",
    gallery: "Gallery",
    contacts: "Contact",
    button: "Design a Cake",
  },

  hero: {
    eyebrow:
      "A bakery for special occasions",

    titleFirst:
      "A cake created",

    titleAccent:
      "especially for you",

    description:
      "Create your cake concept in our interactive builder. Choose the shape, filling, color and decorations, and an STK Bakery manager will help you finalize every detail.",

    primaryButton:
      "Design Your Cake",

    secondaryButton:
      "View Ready-Made Cakes",

    dailyTitle:
      "Every day",

    dailyText:
      "We accept requests from 8:00 AM to 9:00 PM",

    individualTitle:
      "Personalized",

    individualText:
      "Every design is reviewed with a manager",

    photoLabel:
      "STK Bakery",

    photoTitle:
      "Handcrafted cakes",

    photoLink:
      "View",

    badgeFirst:
      "Create",

    badgeSecond:
      "your design",

    decorTitle:
      "Any Decoration",

    decorText:
      "Berries, flowers and toppers",

    fillingTitle:
      "Your Favorite Filling",

    fillingText:
      "Choose the flavor of your cake",

    imageAlt:
      "Celebration cake by STK Bakery",
  },

  categoriesSection: {
    label:
      "Choose your format",

    title:
      "Everything for a beautiful celebration",

    description:
      "Choose a ready-made design or create a unique cake using our interactive builder.",

    popular:
      "Signature Feature",
  },

  categories: [
    {
      icon: "🎂",

      title:
        "Custom Cakes",

      description:
        "Celebration, wedding, children’s and themed cakes created for special occasions.",

      href:
        "/cakes",

      button:
        "Choose a Cake",

      featured:
        false,
    },

    {
      icon: "✨",

      title:
        "Interactive Cake Builder",

      description:
        "Choose the shape, size, filling, color and decorations to create your own cake concept.",

      href:
        "/builder",

      button:
        "Design a Cake",

      featured:
        true,
    },

    {
      icon: "🥐",

      title:
        "Food & Desserts",

      description:
        "Homemade pastries, desserts and prepared dishes for celebrations and family gatherings.",

      href:
        "/food",

      button:
        "View the Menu",

      featured:
        false,
    },
  ],

  builderSection: {
    windowTitle:
      "STK Bakery Cake Builder",

    menu: [
      "Shape",
      "Size",
      "Filling",
      "Color",
      "Decor",
      "Message",
    ],

    preview:
      "Design Preview",

    label:
      "Signature Feature",

    titleFirst:
      "Don’t just order.",

    titleAccent:
      "Design your own cake.",

    description:
      "Our builder helps you communicate your idea clearly. Select the key details, preview the design and submit your request to the bakery.",

    benefits: [
      "Choose the shape, size and filling",
      "Add colors, decorations and a message",
      "View the estimated price",
      "Finalize the design with a manager",
    ],

    button:
      "Open the Cake Builder",
  },

  popularSection: {
    label:
      "Popular Designs",

    title:
      "Our most frequently requested cakes",

    link:
      "View the Full Catalog",

    placeholder:
      "Add a photo",

    favoriteLabel:
      "Add to favorites",
  },

  cakes: [
    {
      title:
        "Delicate Classic",

      category:
        "Celebration Cake",

      price:
        "from 18,000 ₸",

      image:
        "/images/cake-classic.jpg",
    },

    {
      title:
        "Berry Mood",

      category:
        "Berry Cake",

      price:
        "from 22,000 ₸",

      image:
        "/images/cake-berry.jpg",
    },

    {
      title:
        "Children’s Celebration",

      category:
        "Kids’ Cake",

      price:
        "from 25,000 ₸",

      image:
        "/images/cake-kids.jpg",
    },
  ],

  advantagesSection: {
    label:
      "Why Choose Us",

    title:
      "Every detail matters",

    link:
      "Our Approach",
  },

  advantages: [
    {
      number:
        "01",

      title:
        "Natural Ingredients",

      description:
        "We use fresh ingredients and products that meet halal requirements.",
    },

    {
      number:
        "02",

      title:
        "Personalized Design",

      description:
        "A manager will help refine your idea and coordinate every detail.",
    },

    {
      number:
        "03",

      title:
        "Simple Ordering",

      description:
        "Submit your request online, confirm the details and receive an invoice.",
    },
  ],

  processSection: {
    label:
      "How to Order",

    title:
      "From an idea to a finished cake",

    link:
      "Start Your Order",
  },

  processSteps: [
    {
      number:
        "1",

      title:
        "Create Your Concept",

      description:
        "Choose a ready-made cake or create your own design in the builder.",
    },

    {
      number:
        "2",

      title:
        "Submit Your Request",

      description:
        "Add your contact information, event date and any additional notes.",
    },

    {
      number:
        "3",

      title:
        "Confirm the Details",

      description:
        "A manager will contact you and help finalize the design.",
    },

    {
      number:
        "4",

      title:
        "Receive Your Invoice",

      description:
        "After confirmation, the manager will send an invoice for payment.",
    },
  ],

  finalSection: {
    label:
      "Start with an idea",

    title:
      "What will your perfect cake look like?",

    description:
      "Create a preliminary design in just a few minutes. A manager will contact you, confirm the details and issue an invoice.",

    button:
      "Design a Cake",
  },

  footer: {
    description:
      "Cakes, desserts and homemade food for your most special moments.",

    menuTitle:
      "Menu",

    informationTitle:
      "Information",

    contactTitle:
      "Get in Touch",

    cakes:
      "Cakes",

    builder:
      "Cake Builder",

    food:
      "Food & Desserts",

    gallery:
      "Gallery",

    about:
      "About Us",

    contacts:
      "Contact",

    schedule:
      "Every day from 8:00 AM to 9:00 PM",

    copyright:
      "© 2026 STK Bakery",

    slogan:
      "Cakes made with love",
  },
} as const;

export type EnMessages =
  typeof enMessages;