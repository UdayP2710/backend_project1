const student_form = document.getElementById("studentform");
const get_students = document.getElementById("button");
const interviews = document.getElementById("button2");
const interview_list = document.getElementById("button3");
const allocate_interview = document.getElementById("button4");
const allocated_students = document.getElementById("interview_id");
const downloadbtn = document.getElementById("download");

student_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const batch = document.getElementById("batch").value;
  const college = document.getElementById("college").value;
  const status = document.getElementById("status").value;
  const dsa = document.getElementById("dsa").value; // student form details submit information........
  const webd = document.getElementById("webd").value;
  const react = document.getElementById("react").value;
  //   const interview = document.getElementById("interview").value;
  const student_data = { name, batch, college, status, dsa, webd, react };
  try {
    console.log("reached");
    const response = await fetch(
      "http://localhost:7000/api/student/add/studentinfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student_data),
      }
    );

    if (response.ok) {
      alert("Data submitted successfully");
    } else {
      alert("Error submitting data in try block");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting data in catch block");
  }
});
get_students.addEventListener("click", async () => {
  console.log("click");
  try {
    const response = await fetch(
      "http://localhost:7000/api/student/studentlist", // fetching student details from server on click event.......
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      alert("Data fetched successfully");
      const student_list = await response.json();
      localStorage.setItem(
        "students",
        JSON.stringify({ student_list, status: false })
      );
      window.location.href =
        "http://127.0.0.1:5500/frontend/student_details_page/student.html";
    } else {
      alert("Error while getting data in try block");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error while getting data in catch block");
  }
});
interview_list.addEventListener("click", async () => {
  try {
    const response = await fetch(
      "http://localhost:7000/api/interview/getlist",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      alert("data fetched successfully!!!!");
      const interview_list = await response.json();
      console.log(interview_list);
      localStorage.setItem("interviews", JSON.stringify(interview_list));
      window.location.href =
        "http://127.0.0.1:5500/frontend/interviews_list_page/interview.list.html";
    }
  } catch (err) {
    console.log(err);
  }
});

allocated_students.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("interviewid").value;
  const data = { id };
  try {
    const response = await fetch(
      "http://localhost:7000/api/interview/get/applied/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      alert("data fetched successfully!!!!");
      const student_list = await response.json();
      console.log(student_list);
      localStorage.setItem(
        "students",
        JSON.stringify({ student_list, status: true })
      );
      window.location.href =
        "http://127.0.0.1:5500/frontend/student_details_page/student.html";
    }
  } catch (err) {
    console.log(err);
  }
});

downloadbtn.addEventListener("click", async (req, res) => {
  try {
    const response = await fetch(
      "http://localhost:7000/api/interview/download/result",
      {
        method: "GET",
        headers: { "Content-Type": "application/csv" },
      }
    );
    if (response.ok) {
      alert("downloaded data successfully!!!!!");
    }
  } catch (err) {
    console.log("err while downloading result data" + err);
  }
});
interviews.addEventListener("click", () => {
  window.location.href =
    "http://127.0.0.1:5500/frontend/interview_form_page/interview.html";
});
allocate_interview.addEventListener("click", () => {
  window.location.href =
    "http://127.0.0.1:5500/frontend/allocate_interview_page/interview.allocate.html";
});
