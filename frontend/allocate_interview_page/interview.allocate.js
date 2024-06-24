const allocate_form = document.getElementById("allocate");
allocate_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const interview_id = document.getElementById("interview").value;
  const student_id = document.getElementById("student").value;
  const data = { interview_id, student_id };
  console.log(data);
  try {
    const response = await fetch(
      "http://localhost:7000/api/interview/allocate/student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      alert("successfully allocated interview to a student!!!!");
    } else {
      alert("something went wrong!!!!!");
    }
  } catch (err) {
    console.log("error while sending data to server" + err);
  }
});
