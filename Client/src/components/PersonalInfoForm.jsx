import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User
} from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground
}) => {

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" }
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with your personal information
      </p>

      {/* Profile Image */}
      <div className="flex items-center gap-2 mt-4">
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 cursor-pointer">
              <User className="w-10 h-10 p-2.5 border rounded-full" />
              Upload user image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />

          {typeof data.image === "object" && (
            <div className="flex flex-col gap-1 mt-2 text-sm">
              <p>Remove Background</p>
              <label className="relative inline-flex items-center cursor-pointer gap-3">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => setRemoveBackground(prev => !prev)}
                  checked={removeBackground}
                />
                <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors"></div>
                <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
              </label>
            </div>
          )}
        </label>
      </div>

      {/* Input Fields */}
      {fields.map(field => {
        const Icon = field.icon
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="w-4 h-4" />
              {field.label}
              {field.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) =>
                handleChange(field.key, e.target.value)
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PersonalInfoForm
