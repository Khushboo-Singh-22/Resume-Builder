import { StarIcon } from "lucide-react";
import Marquee from "react-fast-marquee";

export default function OurTestimonials() {
  const data = [
    {
      review:
        "My resume ATS score improved from 45% to 82% after using this tool. The keyword suggestions were spot on and helped me get shortlisted for interviews.",
      name: "Rahul Sharma",
      date: "12 Jan 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      review:
        "The job description comparison feature is amazing. It clearly showed what keywords I was missing and how to improve my resume instantly.",
      name: "Priya Mehta",
      date: "15 Mar 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      review:
        "I was not getting any interview calls before. After optimizing my resume using this ATS checker, I started getting responses within a week.",
      name: "Amit Verma",
      date: "20 Feb 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "Super easy to use and very accurate. It highlighted weak sections in my resume and gave actionable suggestions to fix them.",
      name: "Sneha Kapoor",
      date: "20 Sep 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "This tool made my resume recruiter-friendly. The ATS score and keyword matching feature are exactly what job seekers need.",
      name: "Rohit Singh",
      date: "04 Oct 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      review:
        "Best ATS resume checker I’ve used so far. Clean UI, fast results, and really helpful suggestions to improve resume quality.",
      name: "Anjali Patel",
      date: "01 Nov 2025",
      rating: 5,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-between max-w-6xl mx-auto mt-32 px-4">
      <h3 className="font-domine text-3xl">USER SUCCESS STORIES</h3>

      <p className="mt-4 text-sm/6 text-gray-500 max-w-md text-center">
        Thousands of job seekers have improved their ATS scores, optimized their resumes, and increased their chances of getting shortlisted.
      </p>

      <Marquee pauseOnHover className="mt-16" gradient speed={30}>
        {data.map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </Marquee>

      <Marquee pauseOnHover className="mt-6" direction="right" gradient speed={30}>
        {data.map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </Marquee>
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="w-full max-w-88 mx-2 space-y-4 rounded-md border border-gray-200 bg-white p-3 text-gray-500">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(item.rating)].map((_, index) => (
            <StarIcon
              key={index}
              className="size-4 fill-gray-800 text-gray-800"
            />
          ))}
        </div>
        <p>{item.date}</p>
      </div>

      <p>“{item.review}”</p>

      <div className="flex items-center gap-2 pt-3">
        <img
          className="size-8 rounded-full"
          width={40}
          height={40}
          src={item.image}
          alt={item.name}
        />
        <p className="font-medium text-gray-800">{item.name}</p>
      </div>
    </div>
  );
}