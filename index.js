let searchInpt = document.getElementById("searchInpt");
let searchBtn = document.getElementById("searchBtn");
let main1 = document.querySelector(".main1");
let heading = document.querySelector(".heading");
let contentTxt = document.querySelector(".contentTxt");
let content = document.querySelector(".content");

// Cross button listener should be added once
document.getElementById("cross").addEventListener("click", function() {
    content.style.display = "none";
});

let foodRender = async (searchQuery) => {
    heading.innerHTML = "Fetching your data...";
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
        let data = await response.json();

        main1.innerHTML = ""; // Clear previous results

        if (!data.meals) {
            heading.innerHTML = "No meals found.";
            return;
        }

        heading.innerHTML = "Best Dishes Ever";

        data.meals.forEach(meal => {
            let card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <span>${meal.strCategory}</span>
            `;

            let button = document.createElement("button");
            button.setAttribute("id", "ViewMore");
            button.innerText = "View More";
            card.appendChild(button);

            button.addEventListener("click", function () {
                ViewCard(meal);
            });

            main1.appendChild(card);
        });
    } catch (error) {
        heading.innerHTML = "Something went wrong. Please try again.";
        console.error(error);
    }
};

function ViewCard(meal) {
    content.style.display = "block";
    contentTxt.innerHTML = `                
        <h3>${meal.strTags || "No Tags"}</h3>
        <h4>Instructions:</h4>
        <span>${meal.strInstructions}</span>
    `;
}

searchBtn.addEventListener("click", function () {
    const inputVal = searchInpt.value.trim();
    if (inputVal) {
        foodRender(inputVal);
    } else {
        heading.innerHTML = "Please enter a dish name.";
    }
});