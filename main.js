const fullName = document.querySelector("#fullname"),
  job = document.querySelector("#job"),
  salary = document.querySelector("#salary"),
  addBtnPerson = document.querySelector("#addperson"),
  emptyAlert = document.querySelector(".empty-alert"),
  emptyAlertText = document.querySelector(".empty-alert p"),
  emptyAlertExit = document.querySelector(".exit-empty-alert"),
  tableBody = document.querySelector("tbody");

let persons = [];
function addPerson() {
  let personId = 0;
  addBtnPerson.addEventListener("click", function () {
    const trimmedFullname = fullName.value.trim(),
      trimmedJob = job.value.trim(),
      trimmedSalary = salary.value.trim();
    if ((trimmedFullname && trimmedJob && trimmedSalary) == "") {
      emptyAlertText.innerText = "You cannot add an empty value!";
      alertMessageDiv();
    } else if (isNaN(trimmedSalary)) {
      emptyAlertText.innerText = "Salary must be in numbers!";
      alertMessageDiv();
    } else if (trimmedSalary <= 0) {
      emptyAlertText.innerText = "Salary cannot be negative!";
      alertMessageDiv();
    } else if (!isNaN(trimmedJob) || !isNaN(trimmedFullname)) {
      emptyAlertText.innerText =
        "Fullname and position cannot be written with numbers!";
      alertMessageDiv();
    } else {
      const person = {
        id: personId++,
        fullname: trimmedFullname,
        job: trimmedJob,
        salary: trimmedSalary,
      };
      persons.push(person);
      render(persons);
      fullName.value = "";
      job.value = "";
      salary.value = "";
    }
  });
}

function render() {
  const domArray = persons.map(function (personsArray) {
    const { id, fullname, job, salary } = personsArray;
    return `<tr>
                <td>${id + 1}</td>
                <td>${fullname}</td>
                <td>${job}</td>
                <td>${salary}$</td>
                <td>
                    <button class="delete-person" onclick = "deletePerson(${id})">Delete</button>
                </td>
              </tr>`;
  });
  tableBody.innerHTML = domArray.join("");
}

function deletePerson(id) {
  const filterPersons = persons.filter((person) => person.id !== id);
  persons = filterPersons;
  render(persons);
}

function alertMessageDiv() {
  emptyAlert.style.display = "block";
  emptyAlertExit.addEventListener("click", function () {
    emptyAlert.style.display = "none";
  });
  setTimeout(function () {
    emptyAlert.style.display = "none";
  }, 3000);
}

addPerson();
