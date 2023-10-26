const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

//  Function to get recipes

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2> Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');

            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `

            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // For Do not submit automatically
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
})