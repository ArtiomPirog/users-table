const studentName = document.querySelector('.name');
const studentSurname = document.querySelector('.surname');
const studentMiddleName = document.querySelector('.middle-name');
const studentBirthDate = document.querySelector('.birth-date');
const studentStartEducation = document.querySelector('.start-education');
const studentFaculty = document.querySelector('.faculty');
const studentForm = document.querySelector('.student-form');
const studentList = document.querySelector('.students-list');

const btnInitials = document.querySelector('.btn-initials');
const btnFaculty = document.querySelector('.btn-faculty');
const btnBirtnDate = document.querySelector('.btn-birtn-date');
const btnStartEducation = document.querySelector('.btn-start-education');

const initialSearch = document.querySelector('.initial-search');
const facultySearch = document.querySelector('.faculty-search');
const startEducationSearch = document.querySelector('.start-education-search');
const endEducationSearch = document.querySelector('.end-education-search');

const initialSearchBtn = document.querySelector('.initial-search-btn');
const facultySearchBtn = document.querySelector('.faculty-search-btn');
const startEducationSearchBtn = document.querySelector('.start-education-search-btn');
const endEducationSearchBtn = document.querySelector('.end-education-search-btn');

let students = [];
let studentsCopy = [];
let initials;

function addStudent(filter){
    const row = document.createElement('tr');
    const columnInitials = document.createElement('td');
    const columnFaculty = document.createElement('td');
    const columnBirthDate = document.createElement('td');
    const columnStartEducation = document.createElement('td');
    const errorName = document.querySelector('.error-name');
    const errorSurname = document.querySelector('.error-surname');
    const errorMidlename = document.querySelector('.error-middlename');

    const fourYear = 1000 * 60 * 60 * 24 * 365 * 4;
    let endEducation = new Date(Date.parse(studentStartEducation.value) + fourYear);
    let levelEducation = endEducation > new Date() ? `${Math.trunc((Date.parse(studentStartEducation.value) + fourYear - new Date()) / 1000 / 60 / 60 /24 /365)} курс` : 'Закончил'
    let studentAge = (new Date() - Date.parse(studentBirthDate.value)) / 1000 / 60 / 60 /24 / 365;

    if(/^[а-я]+$/i.test(studentName.value)){
        errorName.style.display = 'none'
    } else {errorName.style.display = 'block'}

    if(/^[а-я]+$/i.test(studentSurname.value)){
        errorSurname.style.display = 'none'
    }else{errorSurname.style.display = 'block'}

    if(/^[а-я]+$/i.test(studentMiddleName.value)){
        errorMidlename.style.display = 'none'
    }else{errorMidlename.style.display = 'block'}


    initials = `${studentSurname.value} ${studentName.value} ${studentMiddleName.value}`;
  
    columnInitials.textContent = initials;
    columnFaculty.textContent = studentFaculty.value.trim();
    columnBirthDate.textContent = `${studentBirthDate.value.split('-').reverse().join('.')} (${Math.trunc(studentAge)} лет)`;
    columnStartEducation.textContent = `${studentStartEducation.value.substring(0, 4)} - ${endEducation.getFullYear()}, ${levelEducation}`;
  
    row.append(columnInitials);
    row.append(columnFaculty);
    row.append(columnBirthDate);
    row.append(columnStartEducation);
  
    if(/^[а-я]+$/i.test(studentName.value) && /^[а-я]+$/i.test(studentSurname.value) && /^[а-я]+$/i.test(studentMiddleName.value)){
    students.push({name: `${studentName.value}`, surname: `${studentSurname.value}`, middleName: `${studentMiddleName.value}`, birthDate: `${studentBirthDate.value}`, age: `${(studentAge)}`, startEducation: `${studentStartEducation.value}`, stopEducation: `${endEducation}`, level: `${levelEducation}`, faculty: `${studentFaculty.value.trim()}`});

    studentList.append(row);
    return row;
    }
  }

  function addFilteredStudents(object) {
    const row = document.createElement('tr');
    const columnInitials = document.createElement('td');
    const columnFaculty = document.createElement('td');
    const columnBirthDate = document.createElement('td');
    const columnStartEducation = document.createElement('td');

    initials = `${object.surname} ${object.name} ${object.middleName}`;

    columnInitials.textContent = initials;
    columnFaculty.textContent = object.faculty;
    columnBirthDate.textContent = `${object.birthDate.split('-').reverse().join('.')} (${Math.trunc(object.age)} лет)`;
    columnStartEducation.textContent = `${object.startEducation.substring(0, 4)} - ${object.stopEducation.substring(11, 15)}, ${object.level}`;

    row.append(columnInitials);
    row.append(columnFaculty);
    row.append(columnBirthDate);
    row.append(columnStartEducation);

    studentList.append(row);
    return row;
  }

  function clearInput() {
    studentName.value = '';
    studentSurname.value = '';
    studentMiddleName.value = '';
    studentBirthDate.value = '';
    studentStartEducation.value = '';
    studentFaculty.value = '';
  }

  function initialSort(){
    studentList.innerHTML = ' ';
    studentsCopy = [];
    students.map(object => {studentsCopy.push(object)});
    studentsCopy.sort((a, b) => {
        if(a.surname < b.surname){return -1};
        if(a.surname > b.surname){return 1};
        return 0;
    })
  }

  function facultySort(){
    studentList.innerHTML = ' ';
    studentsCopy = [];
    students.map(object => {studentsCopy.push(object)});
    studentsCopy.sort((a, b) => {
        if(a.faculty < b.faculty){return -1};
        if(a.faculty > b.faculty){return 1};
        return 0;
    })
  }

  function birthDateSort(){
    studentList.innerHTML = ' ';
    studentsCopy = [];
    students.map(object => {studentsCopy.push(object)});
    studentsCopy.sort((a, b) => {
        if(a.birthDate < b.birthDate){return -1};
        if(a.birthDate > b.birthDate){return 1};
        return 0;
    })
  }

  function startEducationSort(){
    studentList.innerHTML = ' ';
    studentsCopy = [];
    students.map(object => {studentsCopy.push(object)});
    studentsCopy.sort((a, b) => {
        if(a.startEducation < b.startEducation){return -1};
        if(a.startEducation > b.startEducation){return 1};
        return 0;
    })
  }

  function addStudentList(){
    studentsCopy.map((item) => addFilteredStudents(item));
  }

  function initialFilter() {
    studentList.innerHTML = ' ';
    let studentInitiale = students.filter((item) => {return initialSearch.value.includes(item.surname)});
    studentInitiale.map((item) => {addFilteredStudents(item)});
  }

  function facultyFilter() {
    studentList.innerHTML = ' ';
    let studentfaculty = students.filter((item) => {return facultySearch.value.includes(item.faculty)});
    studentfaculty.map((item) => {addFilteredStudents(item)});
  }

  function startEducationFilter(){
    studentList.innerHTML = ' ';
    let studentStartEducation = students.filter((item) => {return startEducationSearch.value.includes(item.startEducation.substring(0, 4))});
    studentStartEducation.map((item) => {addFilteredStudents(item)});
  }

  function endEducationFilter(){
    studentList.innerHTML = ' ';
    let studentEndEducation = students.filter((item) => {return endEducationSearch.value.includes(item.stopEducation.substring(11, 15))});
    studentEndEducation.map((item) => {addFilteredStudents(item)});
  }

studentForm.addEventListener('submit', function(e){
    e.preventDefault();
    studentList.innerHTML = ' ';
    studentsCopy = [];
    students.map((item) => addFilteredStudents(item));
    addStudent();
    clearInput();
})

btnInitials.addEventListener('click', function(){
    initialSort();
    addStudentList();
});

btnFaculty.addEventListener('click', function(){
    facultySort();
    addStudentList();
})

btnBirtnDate.addEventListener('click', function(){
    birthDateSort();
    addStudentList();
})

btnStartEducation.addEventListener('click', function(){
    startEducationSort();
    addStudentList();
})

initialSearchBtn.addEventListener('click', function(){
    initialFilter();
})

facultySearchBtn.addEventListener('click', function(){
    facultyFilter();
})

startEducationSearchBtn.addEventListener('click', function() {
    startEducationFilter();
})

endEducationSearchBtn.addEventListener('click', function() {
  endEducationFilter();
})