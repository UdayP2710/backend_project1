const container = document.getElementById("container");
const data = JSON.parse(localStorage.getItem("interviews"));
displayInterviewDetails(data);
console.log(data);
localStorage.removeItem("students");

function displayInterviewDetails(data) {
  console.log("inside display");
  data.forEach((interview) => {
    container.innerHTML += `
      <div class="box">
      <h3 class="heading">Company:  <span>${interview.company}</span>  </h3> 
      <h3 class="heading">Interview Date:  <span>${interview.interview_date}</span> </h3> 
      </div>`;
  });
}
