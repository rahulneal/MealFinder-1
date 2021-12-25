const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeadding = document.getElementsByClassName("result-heading");
const single_mealEl = document.getElementById("single-meal");

//search meals
function searchMeal(e){
    e.preventDefault();

    //clear single meal
    single_mealEl.innerHTML="";

    //get search Meal
    const term = search.value;

    //check for empty
    if (term.trim()) {
        fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
        )
        .then((res) => res.json())
        .then((data) => {
            resultHeadding.innerHTML = `<h2>Search Result for ${term}`;
            if(data.meals ==null){
                resultHeadding.innerHTML =`<h2>There Are No Result For ${term}`;
            }

            
         else {
                mealEl.innerHTML = data.meals.map(
                    (meal) =>`
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                    `
                )
                .join("");
            }

        });
    } else {
        alert("plese insert a value in Search");
    }


    }
    //fetch meal by id
    function getMealById(mealID) {
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
        )
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meal[0];
            addMealToDOM(meal);

        });
    }

    //add meal to dom
    function addMealToDOM(meal) {
        const ingredients = [];
        for(let i=0; i <=20; i++){
            if(meal[`strIngredient${i}`]){
                ingredients.push(`
                ${meal[`strIngredients${i}`]} - ${meal[`strMesure${i}`]
            }
                `);

            }else {
                break;
            }
        } 
        single_mealEl.innerHTML = `
        <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt=="${meal.strMeal}"/>
        <div class = "single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` :''}
        ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
        </div>
        <div class="main">
        <p>${meal.setInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map(img => `<li>${img}</li>`).join('')}
        </ul>
        </div>
        </div>
        `
    }

    //event listerners
 submit.addEventListener("submit", searchMeal);
mealEl.addEventListener('click',(e) => {
    const mealInfo = e.Path.find(item) => {
        if(item.classList) {
            return item.classList.contains("meal-info");

        }else{
            return false;
        }
    };
    if(mealInfo){
        const mealID = mealInfo.getAttribute("data-mealid");
        getElementById(mealID);
    }

});

