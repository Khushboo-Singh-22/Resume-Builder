// ...existing code...
import { parsePdfFile } from '../assets/assets'
import { FilePen, LoaderCircle, Pencil, Plus, Trash2, UploadCloud, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import API from '../configs/api'
import pdfTotext from 'react-pdftotext'



const Dashboard = () => {

  const {user,token } = useSelector((state) => state.auth);


  const colors = ["#9333ea","#d97706","#dc2626","#0284c7","#16a34a"]
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('')
  const [parsing, setParsing] = useState(false)
  const [lastParseResult, setLastParseResult] = useState(null)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const hexToRgba = (hex, alpha = 1) => {
    const h = hex.replace('#','');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const loadAllResume = async () => {
   try{
    const { data } = await API.get('/api/users/resumes', { headers: { Authorization: `Bearer ${token}` } });
    // ensure each resume has an `id` field for React keys and navigation - map _id to id
    const normalized = data.resumes.map(r => ({ ...r, id: r._id }));
    setAllResumes(normalized);
   }catch(e){
    toast.error(e?.response?.data?.message || e.message);
   }
  };

  useEffect(() => {
    loadAllResume();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('resumes', JSON.stringify(allResumes));
    } catch (e) {
      // ignore storage errors
    }
  }, [allResumes]);

  const createResume = async (event) => {
    try{
      event.preventDefault();
      const { data } = await API.post('/api/resumes/create', { title }, { headers: { Authorization: `Bearer ${token}` } });
      const added = { ...data.resume, id: data.resume._id };
      setAllResumes([...allResumes, added]);
      setShowCreateResume(false);
      setTitle('');
      navigate(`/app/builder/${added.id}`);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault();
    setLoading(true);
    try{
        const resumeText = await pdfTotext(resume);
        const { data } = await API.post('/api/ai/upload-resume', { title,resumeText }, { headers: { Authorization: `Bearer ${token}` } });
        setTitle('');
        setResume(null);
        setShowUploadResume(false);
        navigate(`/app/builder/${data.resumeId}`);
    }catch(error){
      toast.error(error?.response?.data?.message || error.message);
    };
    setLoading(false);
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault();
      const { data } = await API.put(`/api/resumes/update/`,{resumeId: editResumeId ,resumeData: { title }}, { headers: { Authorization: `Bearer ${token}` } });
      setAllResumes(allResumes.map(resume => resume.id === editResumeId ? {...resume, title} : resume))
      setTitle('');
      setEditResumeId('');
      toast.success(data.message);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    }
  }

  const deleteResume = async (resumeId) => {
    if (!resumeId) {
      toast.error('Invalid resume id');
      return;
    }
    try{
      const confirmed = window.confirm('Are you sure you want to delete this resume?')
      if (confirmed){
        const { data } = await API.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: `Bearer ${token}` } });
        setAllResumes(allResumes.filter(resume => resume.id !== resumeId))
        toast.success(data.message);
      }
    }catch(e){
      toast.error(e?.response?.data?.message || e.message);
    }
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
          Welcome, Friends
        </p>

        <div className='flex gap-4'>
          <button 
            onClick={()=>{ setShowCreateResume(true); setTitle(''); setEditResumeId(''); }} 
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-500 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <Plus className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-gray-400 to-gray-700 text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>
              Create Resume
            </p>
          </button>

          <button onClick={()=>{ setShowUploadResume(true); setTitle(''); setResume(null); setEditResumeId(''); }} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloud className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-gray-400 to-gray-700 text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>
              Upload Existing
            </p>
          </button>
        </div>

        <hr className='border-slate-300 my-6 sm:w-[305px]' />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.length === 0 && (
            <p className='text-slate-500'>No resumes yet. Create or upload one to get started.</p>
          )}

          {allResumes.map((r, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button key={r.id || index} 
                onClick={()=>navigate(`/app/builder/${r.id}`)}
                className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                style={{
                  background:`linear-gradient(135deg, ${hexToRgba(baseColor,0.06)}, ${hexToRgba(baseColor,0.16)})`,
                  borderColor: hexToRgba(baseColor,0.25)
                }}>
                
                <FilePen className="size-7 group-hover:scale-105 transition-all" style={{color: baseColor}}/>
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color: baseColor}}>
                  {r.title}
                </p>

                {r.file && (
                  <p className='text-xs text-blue-700 px-2 text-center truncate max-w-[90%]' title={r.file.name}>
                    {r.file.name}
                  </p>
                )}
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color: hexToRgba(baseColor,0.6)}}>
                  Updated on {r.updatedAt ? new Date(r.updatedAt).toDateString() : 'Just now'}
                </p>

                <div onClick={e=> e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden flex gap-1'>
                  <Trash2 onClick={()=>deleteResume(r.id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
                  <Pencil onClick={()=>{ setEditResumeId(r.id); setTitle(r.title); }} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
                </div>
              </button>
            )
          })}
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e=>e.stopPropagation()} className=' bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input onChange={(e)=>setTitle(e.target.value)} value={title}
                type="text" 
                placeholder='Enter resume title' 
                className='w-full px-4 py-2 mb-4 focus:border-blue-600 ring-blue-600' 
                required 
              />
              <button className='w-full py-2 bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition text-white rounded hover:bg-blue-700 transition-colors'>
                Create Resume
              </button>
              <X className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' 
                     onClick={()=>{setShowCreateResume(false); setTitle('')}}/>
            </div>
          </form>
        )}

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>

              <input onChange={(e)=>setTitle(e.target.value)} value={title}
                type="text" 
                placeholder='Enter resume title' 
                className='w-full px-4 py-2 mb-4 focus:border-blue-600 ring-blue-600' 
                required 
              />

              <label htmlFor="resume-input" className="block text-sm text-slate-700">
                Select Resume File
                <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-blue-500 hover:text-blue-700 cursor-pointer transition-colors'>
                  {resume ? (
                    <p className='text-blue-700 truncate max-w-[90%]' title={resume.name}>{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className='size-14 stroke-1'/>
                      <p>Upload Resume (PDF)</p>
                    </>
                  )}
                  {parsing && <p className="text-sm text-slate-500 mt-2">Parsing PDF…</p>}
                  {lastParseResult?.personal_info?.full_name && (
                    <p className="text-xs text-slate-500 mt-2">Detected: {lastParseResult.personal_info.full_name} • {lastParseResult.personal_info.email || 'no email'}</p>
                  )}
                </div>
              </label>

              <input
                type="file"
                onChange={(e)=>{ setResume(e.target.files[0]); setLastParseResult(null); }}
                className="hidden"
                id="resume-input"
                accept='.pdf'
              />
             
              <button disabled={loading}
                className='w-full py-2  bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 active:scale-95 transition text-white rounded 
                flex items-center justify-center gap-2'
                type="submit">
                  {
                    loading && <LoaderCircle className='animate-spin size-4 text-white' />
                  }
                  {
                    loading ? 'Uploading...' : 'Upload Resume'
                  }
              </button>

              <X className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' 
                     onClick={()=>{setShowUploadResume(false); setTitle(''); setResume(null); setLastParseResult(null)}}/>
            </div>
          </form>
        )}
        
        {editResumeId && (
          <form onSubmit={editTitle} onClick={()=>setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
              <input onChange={(e)=>setTitle(e.target.value)} value={title}
                type="text" 
                placeholder='Enter resume title' 
                className='w-full px-4 py-2 mb-4 focus:border-blue-600 ring-blue-600' 
                required 
              />
              <button className='w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
                Update
              </button>
              <X className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' 
                     onClick={()=>{setEditResumeId(''); setTitle('')}}/>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Dashboard
// ...existing code...