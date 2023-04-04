// Student Array
const students = [];

// Function to display students in table
function displayStudents() {
    const tableBody = document.getElementById('student-table');
    tableBody.innerHTML = '';
    students.forEach(student => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editBtn" data-id="${student.ID}"><i class="fas fa-edit"></i></button>
          <button class="deleteBtn" data-id="${student.ID}"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
        tableBody.appendChild(tableRow);
    });
}

// Function to add student
function addStudent(event) {
    event.preventDefault();
    const id = students.length + 1;
    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const grade = document.getElementById('gradeInput').value;
    const degree = document.getElementById('degreeInput').value;
    const email = document.getElementById('emailInput').value;
    students.push({
        ID: id,
        name: name,
        age: age,
        grade: grade,
        degree: degree,
        email: email
    });
    displayStudents();
    document.getElementById('addStudentForm').reset();
}

// Function to delete student
function deleteStudent(id) {
    students.splice(id-1, 1);
    displayStudents();
}

// Function to edit student
function editStudent(id) {
    const student = students.find(student => student.ID == id);
    document.getElementById('nameInput').value = student.name;
    document.getElementById('ageInput').value = student.age;
    document.getElementById('gradeInput').value = student.grade;
    document.getElementById('degreeInput').value = student.degree;
    document.getElementById('emailInput').value = student.email;

    // Change submit button to edit button
    const submitButton = document.getElementById('addStudentForm').querySelector('button[type="submit"]');
    submitButton.innerText = 'Edit';
    submitButton.dataset.editId = id;
}

// Function to search for entries
function searchEntries() {
    const query = document.getElementById('search-btn').value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return (
            student.name.toLowerCase().includes(query) ||
            student.degree.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        );
    });
    students.splice(0, students.length, ...filteredStudents);
    displayStudents();
}

// Event listeners
document.getElementById('addStudentForm').addEventListener('submit', addStudent);
document.getElementById('student-table').addEventListener('click', event => {
    if (event.target.classList.contains('deleteBtn')) {
        const id = event.target.getAttribute('data-id');
        deleteStudent(id);
    }
});
document.getElementById('student-table').addEventListener('click', event => {
    if (event.target.classList.contains('editBtn')) {
        const id = event.target.getAttribute('data-id');
        editStudent(id);
    }
});
document.getElementById('search-btn').addEventListener('click', searchEntries);
