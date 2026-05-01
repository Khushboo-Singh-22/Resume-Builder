// ...existing code...
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/
const PHONE_RE = /(\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/

async function extractTextFromPdf(file, maxPages = 6) {
  const buf = await file.arrayBuffer()
  const doc = await pdfjsLib.getDocument({ data: buf }).promise
  let text = ''
  for (let i = 1; i <= Math.min(doc.numPages, maxPages); i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map(it => it.str).join(' ') + '\n'
  }
  return text
}

function firstLines(text, n = 6) {
  return text.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, n)
}

function guessName(lines) {
  for (const ln of lines) {
    if (EMAIL_RE.test(ln) || PHONE_RE.test(ln)) continue
    const words = ln.split(/\s+/).filter(Boolean)
    if (words.length >= 2 && words.length <= 4 && words.every(w => /^[A-Z][a-zA-Z.'-]+$/.test(w))) {
      return ln
    }
  }
  return ''
}

function parseSections(text) {
  const joined = text.replace(/\r/g, '\n')
  const out = { skills: [], education: [], experience: [], projects: [], professional_summary: '' }

  const skillsMatch = joined.match(/skills[:\s\-]*\n?([\s\S]{0,300}?)(?=\n[A-Za-z ]{1,50}[:\n]|$)/i)
  if (skillsMatch) {
    out.skills = skillsMatch[1].replace(/\n/g, ', ').split(/[,•\/;]+/).map(s => s.trim()).filter(Boolean).slice(0, 50)
  }

  const eduMatch = joined.match(/education[:\s\-]*\n?([\s\S]{0,600}?)(?=\n[A-Za-z ]{1,50}[:\n]|$)/i)
  if (eduMatch) out.education = eduMatch[1].split(/\n{1,2}/).map(s => s.trim()).filter(Boolean).slice(0,5).map(x=>({ name: x }))

  const expMatch = joined.match(/experience[:\s\-]*\n?([\s\S]{0,800}?)(?=\n[A-Za-z ]{1,50}[:\n]|$)/i)
  if (expMatch) out.experience = expMatch[1].split(/\n{1,2}/).map(s=>s.trim()).filter(Boolean).slice(0,6).map(x=>({ title: x }))

  const projMatch = joined.match(/projects?[:\s\-]*\n?([\s\S]{0,800}?)(?=\n[A-Za-z ]{1,50}[:\n]|$)/i)
  if (projMatch) out.projects = projMatch[1].split(/\n{1,2}/).map(s=>s.trim()).filter(Boolean).slice(0,6).map(x=>({ title: x }))

  const sumMatch = joined.match(/(professional summary|summary)[:\s\-]*\n?([\s\S]{20,600}?)(?=\n[A-Za-z ]{1,50}[:\n]|$)/i)
  out.professional_summary = (sumMatch ? sumMatch[2].trim() : joined.split('\n').slice(1,4).join(' ')).slice(0,700)

  return out
}

/**
 * parsePdfFile(File) -> { personal_info, skills, education, experience, professional_summary }
 * Conservative extraction — fills only confidently detected fields.
 */
export async function parsePdfFile(file) {
  try {
    const text = await extractTextFromPdf(file)
    const lines = firstLines(text, 8)
    const email = (text.match(EMAIL_RE) || [])[0] || ''
    const phone = (text.match(PHONE_RE) || [])[0] || ''
    const name = guessName(lines)

    const sections = parseSections(text)

    return {
      personal_info: {
        full_name: name || '',
        email,
        phone,
        location: ''
      },
      skills: sections.skills,
      education: sections.education,
      experience: sections.experience,
      projects: sections.projects,
      professional_summary: sections.professional_summary
    }
  } catch (err) {
    console.error('pdfParser error:', err)
    return {}
  }
}
// ...existing code...