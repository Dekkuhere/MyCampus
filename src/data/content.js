// Mock data. Replace with API calls using the student's course + enrollment.
export const COMMANDS = ['assignments', 'gradecard', 'forms', 'ebooks']

export function subjectsFor(course = '') {
  const c = course.toLowerCase()
  if (/bca|mca|comp|\bcs\b|\bit\b|tech|engineering|b\.?sc/.test(c)) return ['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks']
  if (/b\.?com|commerce/.test(c)) return ['Financial Accounting', 'Business Law', 'Economics', 'Statistics']
  if (/\bba\b|arts|hist|eng|pol|soc/.test(c)) return ['English Literature', 'Political Science', 'History', 'Sociology']
  return ['Mathematics', 'English', 'Core Subject I', 'Core Subject II']
}

const DUE = ['28 Nov', '30 Nov', '2 Dec', '5 Dec']

// returns [{title, sub, action, file, kind}] where kind: 'd' download | 'o' open
export function resultsFor(cmd, course) {
  const S = subjectsFor(course)
  switch (cmd) {
    case 'assignments':
      return S.map((s, i) => ({ title: s, sub: `Due ${DUE[i]} · ${i % 2 ? 'Submitted' : 'Pending'}`, action: 'PDF ↓', file: `Assignment - ${s}.pdf`, kind: 'd' }))
    case 'gradecard':
      return ['8.1', '8.4', '8.7'].map((g, i) => ({ title: `Semester ${i + 1}`, sub: `SGPA ${g}`, action: 'Download ↓', file: `Gradecard - Semester ${i + 1}.pdf`, kind: 'd' }))
    case 'forms':
      return [
        { title: 'Examination form', sub: '', action: 'Fill →', file: 'Examination form', kind: 'o' },
        { title: 'Re-registration form', sub: '', action: 'Fill →', file: 'Re-registration form', kind: 'o' },
        { title: 'Student service request', sub: '', action: 'Fill →', file: 'Service request', kind: 'o' },
        { title: 'Hall ticket', sub: '', action: 'Download ↓', file: 'Hall ticket.pdf', kind: 'd' },
      ]
    case 'ebooks':
      return S.map((s) => ({ title: s, sub: 'e-book', action: 'Open →', file: `${s} e-book`, kind: 'o' }))
    default:
      return []
  }
}
