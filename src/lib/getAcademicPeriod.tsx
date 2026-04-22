export function getAcademicPeriod(date = new Date()) {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  const year = date.getFullYear();

  let semester = "";
  let academicYear = "";

  if ((month === 2 && day >= 15) || (month > 2 && month < 9) || (month === 9 && day < 25)) {
    semester = "Summer Semester";
  } else {
    semester = "Winter Semester";
  }

  if (month > 9 || (month === 9 && day >= 25)) {
    academicYear = `${year}/${year + 1}`;
  } else {
    academicYear = `${year - 1}/${year}`;
  }

  return { semester, academicYear };
}