const container = document.getElementById("container");
const div = document.getElementById("get_box5");
const form = document.getElementById("interview_id");
const data = JSON.parse(localStorage.getItem("students"));

if (data.status === false) {
  div.style.display = "none";
}
displayStudentDetails(data.student_list);
console.log(data);
localStorage.removeItem("students");

function displayStudentDetails(data) {
  console.log("inside display");
  console.log(container);
  data.forEach((student) => {
    container.innerHTML += `
      <div class="box">
      <h3 class="heading">Name of Student:  <span>${student.name}</span>  </h3> 
      <h3 class="heading">Batch:  <span>${student.batch}</span> </h3>  
      <h3 class="heading">College:  <span>${student.college}</span> </h3>
      <h3 class="heading">Status:  <span>${student.status}</span> </h3>
      <h3 class="heading">DSA_Score:  <span>${student.DSA_score}</span></h3>    
      <h3 class="heading">WEBD_Score: <span> ${student.WebD_score}</span> </h3>  
      <h3 class="heading">React_Score:  <span>${student.React_score}</span> </h3>  
      <button id="btn">
      </div>`;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const interview_id = document.getElementById("interviewid").value;
  const student_id = document.getElementById("studentid").value;
  const result = document.getElementById("status").value;
  const data = { interview_id, student_id, result };
  try {
    const response = await fetch(
      "http://localhost:7000/api/interview/update/result",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      alert("Result updated successfully!!!!!");
    } else {
      alert("something went wrong!!!!!");
    }
  } catch (err) {}
});
