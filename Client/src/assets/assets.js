import dummy_profile from "./dummyprofile.png";
import logo from "./logo.svg.jpeg";
import react_logo from "./react.svg";
export { parsePdfFile } from '../utils/pdfParser'
// ...existing code...

export const assets = {
  dummy_profile,
  logo,
  react_logo,
};

export const dummyResumeData = [
  {
    id: "6082a31c4c4988750e837e",
    userId: "6b1e08cd1f7754f802c6887",
    title: "Alex's Resume",
    public: true,
    template: "classic",
    accent_color: "#3B82F6",

    personal_info: {
      full_name: "Alex Smith",
      email: "alex@example.com",
      phone: "0123456789",
      location: "NY, USA",
      linkedin: "https://www.linkedin.com/in/alexsmith",
      website: "https://www.alexsmith.com",
      profession: "Full Stack Developer",
      image: dummy_profile,
    },

    professional_summary:
      "Highly analytical developer with 6+ years of experience transforming data into insights using JavaScript, React, Node, and cloud tools.",

    skills: ["JavaScript", "React.js", "Node.js", "Git", "MongoDB"],

    experience: [
      {
        company: "Example Technologies",
        position: "Senior Full Stack Developer",
        start_date: "2023-06",
        end_date: "2024-12",
        is_current: true,
        description: "Led development of full-stack applications using React and Node.js. Implemented microservices architecture and improved API performance by 40%.",
      },
      {
        company: "TechSoft Inc",
        position: "Full Stack Developer",
        start_date: "2019-01",
        end_date: "2023-05",
        is_current: false,
        description: "Developed and maintained multiple web applications. Collaborated with cross-functional teams to deliver projects on time.",
      },
    ],

    education: [
      {
        degree: "Bachelor of Science",
        field: "Computer Science",
        institution: "University of Technology",
        graduation_date: "2019-05",
        gpa: "3.8",
      },
    ],

    project: [
      {
        name: "E-Commerce Platform",
        description: "Built a full-stack e-commerce platform using MERN stack with payment integration and real-time inventory management.",
      },
      {
        name: "Task Management App",
        description: "Created a collaborative task management application with real-time updates and user authentication.",
      },
    ],
  },

  {
    id: "7082b41d5d5988761f948f",
    userId: "7c2f19de2g8865h903d7798",
    title: "Maria's Resume",
    public: true,
    template: "modern",
    accent_color: "#22C55E",

    personal_info: {
      full_name: "Maria Johnson",
      email: "maria@example.com",
      phone: "0987654321",
      location: "San Francisco, USA",
      linkedin: "https://www.linkedin.com/in/mariajohnson",
      website: "https://www.mariajohnson.dev",
      profession: "Frontend Developer",
      image: dummy_profile,
    },

    professional_summary:
      "Creative frontend developer with 4+ years of experience building responsive web apps using React, TypeScript, and modern UI frameworks.",

    skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Figma"],

    experience: [
      {
        company: "UI Wizards",
        position: "Frontend Developer",
        start_date: "2021-03",
        end_date: "2024-12",
        is_current: true,
        description: "Designed and developed responsive user interfaces. Improved website performance and user experience metrics by 35%.",
      },
      {
        company: "Designify",
        position: "Junior Frontend Developer",
        start_date: "2019-07",
        end_date: "2021-02",
        is_current: false,
        description: "Assisted in front-end development and UI design. Implemented pixel-perfect designs from Figma mockups.",
      },
    ],

    education: [
      {
        degree: "Bachelor of Arts",
        field: "Interactive Media",
        institution: "California State University",
        graduation_date: "2019-06",
        gpa: "3.7",
      },
    ],

    project: [
      {
        name: "Design System Library",
        description: "Created a comprehensive React component library with Storybook documentation for consistent UI across projects.",
      },
      {
        name: "Portfolio Website",
        description: "Built a modern, animated portfolio website showcasing design and development work.",
      },
    ],
  },

  {
    id: "8083c52e6e6099872g059g",
    userId: "8d3g20ef3h9976i014e8809",
    title: "David's Resume",
    public: true,
    template: "classic",
    accent_color: "#F97316",

    personal_info: {
      full_name: "David Lee",
      email: "david@example.com",
      phone: "0112233445",
      location: "London, UK",
      linkedin: "https://www.linkedin.com/in/davidlee",
      website: "https://www.davidlee.io",
      profession: "Backend Developer",
      image: dummy_profile,
    },

    professional_summary:
      "Backend specialist with 5+ years of experience in building scalable APIs and microservices using Node.js, Express, and PostgreSQL.",

    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Docker", "AWS"],

    experience: [
      {
        company: "CloudWorks",
        position: "Backend Developer",
        start_date: "2022-01",
        end_date: "2024-12",
        is_current: true,
        description: "Developed and maintained microservices architecture. Optimized database queries improving response time by 50%.",
      },
      {
        company: "DataSoft Ltd",
        position: "Junior Backend Developer",
        start_date: "2018-05",
        end_date: "2021-12",
        is_current: false,
        description: "Built RESTful APIs and database schemas. Contributed to system design and architecture improvements.",
      },
    ],

    education: [
      {
        degree: "Bachelor of Engineering",
        field: "Software Engineering",
        institution: "Imperial College London",
        graduation_date: "2018-06",
        gpa: "3.9",
      },
    ],

    project: [
      {
        name: "Real-time Analytics API",
        description: "Built a high-performance analytics API handling 100k+ requests per day with caching and optimization.",
      },
      {
        name: "Microservices Migration",
        description: "Led migration of monolithic application to microservices architecture using Docker and Kubernetes.",
      },
    ],
  },
];