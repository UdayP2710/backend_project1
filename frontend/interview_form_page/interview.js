const submitform = document.getElementById("interview");
submitform.addEventListener("submit", async () => {
  const company = document.getElementById("company").value;
  const date = document.getElementById("date").value;
  const data = { company, date };
  console.log(data);
  try {
    const sendresponse = await fetch(
      "http://localhost:7000/api/interview/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (sendresponse.ok) {
      alert("interview added successfully!!!!!");
    } else {
      alert("failed response, plesase try again later!!!!!");
    }
  } catch (err) {
    console.log(err);
  }
});
