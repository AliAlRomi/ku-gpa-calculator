const gradePoints = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0
};

const courseList = document.querySelector("#course-list");
const addCourseButton = document.querySelector("#add-course-button");
const calculateButton = document.querySelector("#calculate-button");
const resetButton = document.querySelector("#reset-button");
const gpaResult = document.querySelector("#gpa-result");
const resultMessage = document.querySelector("#result-message");

function createGradeOptions() {
    return Object.keys(gradePoints)
        .map((grade) => `<option value="${grade}">${grade}</option>`)
        .join("");
}

function createCourseRow() {
    const row = document.createElement("div");
    row.className = "course-row";

    row.innerHTML = `
        <input
            class="course-name"
            type="text"
            placeholder="Course name"
            aria-label="Course name"
        >

        <select class="course-grade" aria-label="Course grade">
            ${createGradeOptions()}
        </select>

        <select class="course-credits" aria-label="Course credit hours">
            <option value="1">1 credit</option>
            <option value="2">2 credits</option>
            <option value="3" selected>3 credits</option>
            <option value="4">4 credits</option>
        </select>

        <button
            class="remove-button"
            type="button"
            aria-label="Remove course"
            title="Remove course"
        >
            ×
        </button>
    `;

    const removeButton = row.querySelector(".remove-button");

    removeButton.addEventListener("click", () => {
        const rows = document.querySelectorAll(".course-row");

        if (rows.length === 1) {
            resultMessage.textContent =
                "You need at least one course row.";
            return;
        }

        row.remove();
    });

    courseList.appendChild(row);
}

function calculateGPA() {
    const rows = document.querySelectorAll(".course-row");

    let totalQualityPoints = 0;
    let totalCredits = 0;
    let completedCourses = 0;

    rows.forEach((row) => {
        const courseName = row
            .querySelector(".course-name")
            .value
            .trim();

        if (!courseName) {
            return;
        }

        const grade = row.querySelector(".course-grade").value;
        const credits = Number(
            row.querySelector(".course-credits").value
        );

        totalQualityPoints += gradePoints[grade] * credits;
        totalCredits += credits;
        completedCourses += 1;
    });

    if (completedCourses === 0 || totalCredits === 0) {
        gpaResult.textContent = "0.00";
        resultMessage.textContent =
            "Enter at least one course name before calculating.";
        return;
    }

    const gpa = totalQualityPoints / totalCredits;

    gpaResult.textContent = gpa.toFixed(2);
    resultMessage.textContent =
        `Calculated using ${completedCourses} course` +
        `${completedCourses === 1 ? "" : "s"} and ` +
        `${totalCredits} total credits.`;
}

function resetCalculator() {
    courseList.innerHTML = "";
    gpaResult.textContent = "0.00";
    resultMessage.textContent = "Add your courses to begin.";

    createCourseRow();
    createCourseRow();
    createCourseRow();
}

addCourseButton.addEventListener("click", createCourseRow);
calculateButton.addEventListener("click", calculateGPA);
resetButton.addEventListener("click", resetCalculator);

resetCalculator();
