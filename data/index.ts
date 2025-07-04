export const navbarData = {
  homeTitle: "Joshua's Blog",
};

export const footerData = {
  author: "Joshua Palti Sinaga",
  aboutAuthor:
    "Hi! I am Joshua, a Tech enthusiast, problem solver and software engineer.",
  authorInterest:
    "I have a fair amount of knowledge of Javascript, Typescript, VueJs, and Nuxt. If you have an interesting idea, either open source or paid let's connect.",
  aboutTheSite:
    "This is a personal blog site built with Nuxt3, TailwindCSS, NuxtContent, Nuxt Icon. Currently it's deployed in Vercel.",
};

export const homePage = {
  title: "Welcome To My Blog Site",
  description:
    "Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.",
};

export const blogsPage = {
  title: "All Posts",
  description:
    "Here you will find all the blog posts I have written & published on this site.",
};

export const categoryPage = {
  title: "Categories",
  description:
    "Blow this category is generated from all the tags are mentioned in the different blog post",
};

export const aboutPage = {
  title: "Joshua Palti Sinaga",
  description: "Software Engineer, Problem Solver, Web Enthusiast.",
  aboutMe:
    "I enjoy finding creative solutions to everyday challenges and turning them into opportunities for innovation. I love building applications that not only function smoothly but also feel natural and easy to use. While I mainly work as a fullstack developer, I’m also passionate about exploring AI and IoT, combining new technologies to create meaningful and forward thinking solutions.",
};

export const seoData = {
  title: `Joshua's Blog | Joshua Palti Sinaga Blog`,
  ogTitle: `Let's learn Javascript, Typescript, Vue, Nuxt, & Problem Solving - Joshua Palti Sinaga Blog | Joshua's Blog`,
  description: `Hi I am Joshua Palti Sinaga. A Software Engineer with experience in software development. - Joshua Palti Sinaga Blog | Joshua's Blog`,
  twitterDescription: `Joshua's Blog, where I play around with Nuxt, Vue, and more and showcase my blog, resources, etc - Joshua Palti Sinaga Blog | Joshua's Blog`,
  image:
    "https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp",
  mySite: "https://blog-nurriyad.vercel.app",
  twitterHandle: "@qdnvubp",
  mailAddress: "josua123690707@gmail.com",
};

export const socialLinks = {
  githubLink: "https://github.com/jo0707",
  linkedinLink: "https://www.linkedin.com/in/joshuapaltisinaga/",
  twitterLink: "https://twitter.com/qdnvubp",
  stackoverflowLink: "",
};

export const siteMetaData = [
  {
    name: "description",
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: "og:site_name", content: seoData.mySite },
  { property: "og:type", content: "website" },
  {
    property: "og:url",
    content: seoData.mySite,
  },
  {
    property: "og:title",
    content: seoData.ogTitle,
  },
  {
    property: "og:description",
    content: seoData.description,
  },
  {
    property: "og:image",
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: "twitter:site", content: seoData.twitterHandle },
  { name: "twitter:card", content: "summary_large_image" },
  {
    name: "twitter:url",
    content: seoData.mySite,
  },
  {
    name: "twitter:title",
    content: seoData.ogTitle,
  },
  {
    name: "twitter:description",
    content: seoData.twitterDescription,
  },
  {
    name: "twitter:image",
    content: seoData.image,
  },
];
