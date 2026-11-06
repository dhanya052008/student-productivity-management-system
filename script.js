const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.name;

        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
    updateProgress();
}

// Add new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    tasks.push({
        name: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
});

// Show saved tasks
displayTasks();
// Assignment section

const assignmentForm = document.getElementById("assignment-form");
const assignmentName = document.getElementById("assignment-name");
const assignmentDate = document.getElementById("assignment-date");
const assignmentList = document.getElementById("assignment-list");

// Load saved assignments
let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];

// Save assignments
function saveAssignments() {
    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );
}

// Display assignments
function displayAssignments() {
    assignmentList.innerHTML = "";

    assignments.forEach(function(item, index) {
        const li = document.createElement("li");

        const today = new Date().toISOString().split("T")[0];

li.textContent = item.name + " - Due: " + item.date + " ";

if (item.date < today) {
    li.style.color = "red";
    li.textContent += " (Overdue)";
} else if (item.date === today) {
    li.style.color = "orange";
    li.textContent += " (Due Today)";
}

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            assignments.splice(index, 1);
            saveAssignments();
            displayAssignments();
        });

        li.appendChild(deleteBtn);
        assignmentList.appendChild(li);
    });
}

// Add assignment
assignmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    assignments.push({
        name: assignmentName.value.trim(),
        date: assignmentDate.value
    });

    saveAssignments();
    displayAssignments();

    assignmentForm.reset();
});

// Show saved assignments
displayAssignments();
const studyForm = document.getElementById("study-form");
const subjectName = document.getElementById("subject-name");
const studyDate = document.getElementById("study-date");
const studyTime = document.getElementById("study-time");
const studyList = document.getElementById("study-list");

let studySessions = JSON.parse(localStorage.getItem("studySessions")) || [];

function saveStudySessions() {
    localStorage.setItem("studySessions", JSON.stringify(studySessions));
}

function displayStudySessions() {
    studyList.innerHTML = "";

    studySessions.forEach(function(session, index) {
        const li = document.createElement("li");

        li.textContent = session.subject + " - " + session.date + " at " + session.time + " ";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            studySessions.splice(index, 1);
            saveStudySessions();
            displayStudySessions();
        });

        li.appendChild(deleteBtn);
        studyList.appendChild(li);
    });
}

studyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    studySessions.push({
        subject: subjectName.value.trim(),
        date: studyDate.value,
        time: studyTime.value
    });

    saveStudySessions();
    displayStudySessions();
    studyForm.reset();
});

displayStudySessions();
function updateProgress() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    document.getElementById("total-tasks").textContent = total;
    document.getElementById("completed-tasks").textContent = completed;
    document.getElementById("pending-tasks").textContent = pending;
}