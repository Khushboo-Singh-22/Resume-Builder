import { CheckIcon, ShieldCheckIcon, SparklesIcon, ZapIcon } from "lucide-react";

export default function PricingSection() {
  const data = [
    {
      title: "Free Plan",
      description: "Perfect to get started and optimize your resume",
      price: "$0",
      buttonText: "Try For Free",
      features: [
        "Basic ATS score analysis",
        "Limited resume uploads",
        "Basic keyword suggestions",
        "Standard templates and formatting",
        "View detailed analytics and reports",
      ],
    },
    {
      title: "Pro Plan",
      mostPopular: true,
      description: "Best for professionals looking to maximize their job search success",
      price: "$9",
      buttonText: "Upgrade To Pro",
      features: [
        "Unlimited ATS score checks",
    "Advanced keyword matching",
    "Resume improvement suggestions",
    "Job description comparison",
    "Download optimized resume",
    "Priority support"
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="flex flex-col md:flex-row gap-14 items-start justify-between max-w-7xl mx-auto mt-32 px-4"
    >
      <div className="max-w-sm">
        <h3 className="font-domine text-3xl">OUR PRICING</h3>
        <p className="mt-4 text-sm/6 text-gray-500">
         Choose a plan that helps you optimize your resume, improve ATS score, and land more interviews.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="p-2.5 border border-gray-200 rounded-md">
              <SparklesIcon className="size-5" />
            </div>
            <p>✅ AI-Powered ATS Score Analysis</p>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <div className="p-2.5 border border-gray-200 rounded-md">
              <ZapIcon className="size-5" />
            </div>
            <p>✅ Keyword Optimization</p>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <div className="p-2.5 border border-gray-200 rounded-md">
              <ShieldCheckIcon className="size-5" />
            </div>
            <p>✅ Instant Feedback & Suggestions</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-center gap-10">
        {data.map((item, index) => (
          <div
            key={index}
            className={`group w-full max-w-80 rounded-xl p-6 pb-10 ${
              item.mostPopular
                ? "bg-gray-800 text-white"
                : "bg-white border border-slate-200"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-semibold">{item.title}</h3>

              <p
                className={
                  item.mostPopular ? "text-gray-400" : "text-gray-500"
                }
              >
                {item.description}
              </p>

              <p className="mt-4 text-2xl font-semibold">
                {item.price}
                <span
                  className={`text-sm font-normal ${
                    item.mostPopular
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {" "}
                  /month
                </span>
              </p>

              <button
                className={`mt-4 w-full rounded-lg bg-gray-100 py-2.5 font-medium text-gray-800 transition ${
                  item.mostPopular
                    ? "hover:opacity-90"
                    : "hover:bg-gray-200/70"
                }`}
              >
                {item.buttonText}
              </button>
            </div>

            <div className="mt-2 flex flex-col">
              {item.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 border-b py-3 ${
                    item.mostPopular
                      ? "border-gray-700"
                      : "border-gray-200"
                  }`}
                >
                  <div
                    className={`rounded-full p-1 ${
                      item.mostPopular ? "bg-white/10" : "bg-gray-800"
                    }`}
                  >
                    <CheckIcon
                      className="size-3 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}