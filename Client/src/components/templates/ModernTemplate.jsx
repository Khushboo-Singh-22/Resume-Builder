import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {

	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div
			className="w-full max-w-[210mm] mx-auto bg-white text-gray-900 p-6 print:p-0">

			{/* Header */}
			<header
				className="pb-2 mb-2 border-b"
				style={{ borderColor: accentColor }}>

				<h1
					className="text-xl font-semibold"
					style={{ color: accentColor }}>
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1">

					{data.personal_info?.email && (
						<div className="flex items-center gap-1">
							<Mail className="size-3" />
							<span>{data.personal_info.email}</span>
						</div>
					)}

					{data.personal_info?.phone && (
						<div className="flex items-center gap-1">
							<Phone className="size-3" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					
						{data.personal_info?.linkedin && (
						<a
							target="_blank"
							href={data.personal_info.linkedin}
							className="flex items-center gap-1">
							<Linkedin className="size-3" />
							<span>
								{data.personal_info.linkedin.replace("https://www.", "")}
							</span>
						</a>
					)}

					{data.personal_info?.location && (
						<div className="flex items-center gap-1">
							<MapPin className="size-3" />
							<span>{data.personal_info.location}</span>
						</div>
					)}

					{data.personal_info?.website && (
						<a
							target="_blank"
							href={data.personal_info.website}
							className="flex items-center gap-1">
							<Globe className="size-3" />
							<span>
								{data.personal_info.website.replace("https://", "")}
							</span>
						</a>
					)}
				</div>
			</header>


			{/* Professional Summary */}
			{data.professional_summary && (
				<section className="mb-2 my-3">
					<h2 className="text-xs font-semibold  mb-1">
						Professional Summary
					</h2>

					<p className="text-xs text-gray-700 leading-snug">
						{data.professional_summary}
					</p>
				</section>
			)}

			{/* Experience */}
			{data.experience && data.experience.length > 0 && (
				<section className="mb-2">
					<h2 className="text-xs font-semibold border-b mb-1">
						Experience
					</h2>

					<div className="space-y-1">
						{data.experience.map((exp, index) => (
							<div key={index}>
								<div className="flex justify-between">
									<div>
										<h3 className="text-xs font-semibold">
											{exp.position}
										</h3>
										<p
											className="text-xs"
											style={{ color: accentColor }}>
											{exp.company}
										</p>
									</div>

									<div className="text-xs text-gray-500">
										{formatDate(exp.start_date)} -
										{exp.is_current
											? " Present"
											: formatDate(exp.end_date)}
									</div>

								</div>
								{exp.description && (
									<p className="text-xs text-gray-700 leading-snug mt-0.5 whitespace-pre-line">
										{exp.description}
									</p>
								)}
							</div>
						))}
					</div>
				</section>
			)}

			{/* Projects */}
			{data.projects && data.projects.length > 0 && (
				<section className="mb-2 mt-5">
					<h2 className="text-xs font-semibold border-b mb-1">
						Projects
					</h2>
					<div className="space-y-1">
						{data.projects.map((p, index) => (
							<div key={index}>
								<h3 className="text-xs font-semibold">
									{p.name}
								</h3>
								{p.description && (
									<p className="text-xs text-gray-700 leading-snug">
										{p.description}
									</p>
								)}
							</div>
						))}
					</div>
				</section>
			)}


			<div className="gap-3">
				{/* Education */}

				{data.education && data.education.length > 0 && (
					<section className="my-5">
						<h2 className="text-xs font-semibold border-b mb-1">
							Education
						</h2>
						<div className="space-y-1">
							{data.education.map((edu, index) => (
								<div key={index}>
									<h3 className="text-xs font-semibold">
										{edu.degree} {edu.field && `in ${edu.field}`}
									</h3>
									<p
										className="text-xs"
										style={{ color: accentColor }}>
										{edu.institution}
									</p>
									<div className="flex justify-between text-xs text-gray-600">
										<span>
											{formatDate(edu.graduation_date)}
										</span>
										{edu.gpa && <span>GPA: {edu.gpa}</span>}
									</div>
								</div>
							))}
						</div>
					</section>
				)}


				{/* Skills */}

				{data.skills && data.skills.length > 0 && (
					<section className="">
						<h2 className="text-xs font-semibold border-b mb-1">
							Skills
						</h2>
						<div className="flex flex-wrap gap-1">

							{data.skills.map((skill, index) => (
								<span
									key={index}
									className="px-2 py-0.5 text-xs text-white rounded mt-3"
									style={{ backgroundColor: accentColor }}>
									{skill}
								</span>

							))}
						</div>
					</section>
				)}
			</div>
		</div>

	);
};

export default ModernTemplate;	