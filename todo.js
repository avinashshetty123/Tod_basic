document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.querySelector(".sun-moon");
  const progressBar = document.getElementById("pro");
  const progressLabel = document.querySelector(".progress_label");
  const addGoalButton = document.querySelector(".addbtn");
  const errorLabel = document.querySelector(".error_label span");
  const dayHead = document.querySelector(".changing-head span");
  const mainContainer = document.querySelector("main");
  const quote=document.querySelector(".quote")

  const days = [
    "Tomorrow",
    "Today",
    "Yesterday",
    "Day After Tomorrow",
    "The Future",
    "Your Best Self",
  ];

  let allGoals = JSON.parse(localStorage.getItem("allGoals")) || [];
  function updateProgress() {
    const totalGoals = allGoals.length;
    const completedGoals = allGoals.filter((goal) => goal.completed).length;

    progressBar.max = totalGoals || 1;
    progressBar.value = completedGoals;
    progressLabel.textContent = `${completedGoals}/${totalGoals} Completed`;
  }

  function renderGoals() {
    document
      .querySelectorAll(".goal_container")
      .forEach((container) => container.remove());

    allGoals.forEach((goal, index) => {
      const goalDiv = document.createElement("div");
      goalDiv.classList.add("goal_container");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      checkbox.checked = goal.completed;

      const goalInput = document.createElement("input");
      goalInput.type = "text";
      goalInput.id = Math.random();
      goalInput.classList.add("goal_input");
      goalInput.placeholder = "Add A Goal";
      goalInput.value = goal.name;

      const deleteImg = document.createElement("img");
      deleteImg.src = "./images/delete.png";
      deleteImg.alt = "delete";
      deleteImg.classList.add("debgoal");
      goalDiv.appendChild(checkbox);
      goalDiv.appendChild(goalInput);
      goalDiv.appendChild(deleteImg);
      mainContainer.insertBefore(goalDiv, addGoalButton.parentElement);

      checkbox.addEventListener("click", () => {
        allGoals[index].completed = checkbox.checked;
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
        if (checkbox.checked) {
          goalInput.classList.add("completed");
          goalInput.disabled = true;
        } else {
          goalInput.classList.remove("completed");
          goalInput.disabled = false;
        }
        updateProgress();
      });
      errorLabel.innerHTML = `${allGoals.length}`;

      goalInput.addEventListener("input", (e) => {
        allGoals[index].name = e.target.value;
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
      });

      deleteImg.addEventListener("click", () => {
        allGoals.splice(index, 1);
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
        renderGoals();
        updateProgress();
      });
    });

    updateProgress();
  }
  addGoalButton.addEventListener("click", () => {
    allGoals.push({ name: "", completed: false });
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    renderGoals();
  });

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isdark = document.body.classList.contains("dark");
    darkModeToggle.src = isdark ? `./images/Sun.svg` : `./images/moon.svg`;
  });

  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * days.length);
    dayHead.textContent = days[randomIndex];
  
  }, 3000);
  setInterval(()=>{
    fetch("https://qapi.vercel.app/api/random")
    .then((Response) => Response.json()).then((data)=>{
    
        Process(data);
    }).catch((err)=>console.log(err));
  
  },10000)
  function Process(data){
    quote.innerHTML=`${data.quote}`
  }
    

  renderGoals();
});
