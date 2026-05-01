// ...existing code...
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'


import {
  ArrowLeftIcon,
  Briefcase,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  ChevronLeft,
  ChevronRight,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadCloud
} from 'lucide-react'

import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummary'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillForm from '../components/SkillForm'
import { useSelector } from 'react-redux'
import API from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const {token} = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    try {
      const {data} = await API.get('/api/resumes/get/' + resumeId, { headers: { Authorization: `Bearer ${token}` } })
      if(data.resume){
        // Map MongoDB _id to id for consistency
        const resumeWithId = { ...data.resume, id: data.resume._id };
        setResumeData(resumeWithId)
        document.title = data.resume.title;
      }
    } catch (error) {
      console.error('Error loading resume:', error.message);
      if (error.response?.status === 404) {
        toast.error('Resume not found. It may have been deleted.');
      } else if (error.response?.status === 401) {
        toast.error('You do not have permission to access this resume.');
      } else {
        toast.error('Failed to load resume: ' + error.message);
      }
    }
  }

  useEffect(() => {
    loadExistingResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append('resumeId', resumeId);
      formData.append('resumeData', JSON.stringify({public: !resumeData.public }));
      const { data } = await API.put(`/api/resumes/update`, formData, { headers: { Authorization: `Bearer ${token}` } });
      setResumeData({...data.resume, public: !resumeData.public});
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const handleShare = () => {
    const frontendurl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendurl + '/view/' + resumeId;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" })
    } else {
      alert('Share not supported on this browser.')
    }
  }

  const downloadResume = () => {
    try {
      const preview = document.getElementById('resume-preview');
      if (!preview) {
        window.print();
        return;
      }
      // Compute pixels per inch dynamically to handle different screen DPI
      const pxPerInchEl = document.createElement('div');
      pxPerInchEl.style.width = '1in';
      pxPerInchEl.style.position = 'absolute';
      pxPerInchEl.style.left = '-100%';
      document.body.appendChild(pxPerInchEl);
      const pxPerInch = pxPerInchEl.offsetWidth || 96;
      document.body.removeChild(pxPerInchEl);

      // Page height used for printing (in inches). The app's print CSS uses letter (11in).
      // If you prefer A4, change this to 11.69
      const pageHeightInInches = 11.69; // use 11 for letter; set to 11.69 for A4
      const pageHeightPx = pageHeightInInches * pxPerInch;

      // Use the rendered height of the preview to estimate page count
      const totalHeight = preview.scrollHeight;
      const estimatedPages = Math.ceil(totalHeight / pageHeightPx);

      // If estimatedPages is 1, the second page is empty -> single page print
      // If >=2 then print will produce multiple pages
      // Trigger print normally; browser will paginate as needed
      window.print();
    } catch (err) {
      console.error('Print detection error:', err);
      window.print();
    }
  }

  const saveResume = async () => {
    try {
      let updateResumedata = structuredClone(resumeData);
      if(typeof resumeData.personal_info.image === 'object'){
         delete updateResumedata.personal_info.image;
      }
      const formData = new FormData();
      formData.append('resumeId', resumeId);
      formData.append('resumeData', JSON.stringify(updateResumedata));
      removeBackground && formData.append('removeBackground', 'true');
      typeof resumeData.personal_info.image === 'object' && formData.append('image', resumeData.personal_info.image);
      const {data} = await API.put(`/api/resumes/update`, formData, { headers: { Authorization: `Bearer ${token}` } });
      setResumeData(data.resume);
      toast.success(data.message)
    } catch (error) {
      toast.error('error saving resume.',error);
    }
  }

  const saveChanges = () => {
    // update localStorage 'resumes' array
    try {
      const stored = JSON.parse(localStorage.getItem('resumes') || 'null') || [];
      const now = new Date().toISOString();
      const updated = { ...resumeData, updatedAt: now, id: resumeData.id || ('res' + Date.now()) }

      const existsIndex = stored.findIndex(r => r.id === updated.id);
      if (existsIndex >= 0) {
        stored[existsIndex] = { ...stored[existsIndex], ...updated };
      } else {
        stored.unshift(updated);
      }
      localStorage.setItem('resumes', JSON.stringify(stored));
      setResumeData(prev => ({ ...prev, id: updated.id, updatedAt: now }));
      alert('Saved successfully.')
    } catch (e) {
      alert('Failed to save. Local storage may be unavailable.')
    }
  }

  return (
    <div>
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Form */}
          <div className="relative col-span-1 lg:col-span-5 rounded-lg overflow-visible">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-200"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1 relative z-30">
                <div className='flex items-center gap-2'>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData(prev => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                <div className="font-medium text-gray-700">{activeSection.name}</div>

                <div className="flex items-center gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                      className="flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}

                  <button
                    onClick={() => setActiveSectionIndex(i => Math.min(i + 1, sections.length - 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Sections */}
              <div className="space-y-6">
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, personal_info: data }))
                    }
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, professional_summary: data }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, projects: data }))
                    }
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              <button onClick={()=> toast.promise(saveResume(), {loading: 'Saving resume...', success: 'Resume saved!', error: 'Failed to save'})} className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Preview */}
          <div className=" col-span-1 lg:col-span-7 max-lg:mt-6">
            <div className='relative w-full'>
              {/* Buttons */}
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2Icon className='size-4'/> Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'>
                  {resumeData.public ? <EyeIcon className="size-4"/>: <EyeOffIcon  className='size-4'/>}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>
                <button onClick={downloadResume} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                  <DownloadCloud className='size-4'/> Download
                </button>
              </div>
            </div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
// ...existing code...