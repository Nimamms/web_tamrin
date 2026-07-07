console.log("JS is working!");
const hamburger = document.getElementById("hamburger-menu");
console.log("Hamburger element:", hamburger);

document.addEventListener('DOMContentLoaded', function() {
    
    const recipeBtn = document.getElementById('viewRecipesBtn');

    if (recipeBtn) {
        recipeBtn.addEventListener('click', function() {
            window.location.href = 'recipe.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    const searchInput = document.getElementById('blogsearch');
    const blogCards = document.querySelectorAll('.blog-card'); 

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase(); 

            blogCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();

                if (title.includes(searchTerm)) {
                    card.style.display = "flex"; 
                    card.style.opacity = "1";
                } else {
                    card.style.display = "none"; 
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page-numbers .page:not(.dots)');
    const blogCards = document.querySelectorAll('.blog-card');

    function goToPage(pageNumber) {
        pages.forEach(p => {
            p.classList.remove('active');
            if (p.innerText === pageNumber) {
                p.classList.add('active');
            }
        });

        blogCards.forEach(card => {
            const cardPage = card.getAttribute('data-page');
            
            if (cardPage === pageNumber) {
                card.style.display = "flex"; 
            } else {
                card.style.display = "none"; 
            }
        });
        
        window.scrollTo({ top: document.querySelector('.blog-list').offsetTop - 100, behavior: 'smooth' });
    }

    pages.forEach(pageSpan => {
        pageSpan.addEventListener('click', function() {
            const selectedPage = this.innerText;
            
            if (!isNaN(selectedPage)) {
                goToPage(selectedPage);
            }
        });
    });

    goToPage("1");
});

document.addEventListener("DOMContentLoaded", function(){

    const grid = document.getElementById("recipeGrid");
    const next = document.getElementById("nextRecipe");
    const prev = document.getElementById("prevRecipe");

    if(!grid) return;

    let position = 0;

    function cardWidth(){
        const card = grid.querySelector(".bp-recipe-card");
        return card.offsetWidth + 20;
    }

    next.addEventListener("click", function(){

        const step = cardWidth();
        const maxScroll = grid.scrollWidth - grid.parentElement.offsetWidth;

        if(position < maxScroll){
            position += step;

            if(position > maxScroll){
                position = maxScroll;
            }

            grid.style.transform = `translateX(-${position}px)`;
        }

    });

    prev.addEventListener("click", function(){

        const step = cardWidth();

        if(position > 0){
            position -= step;

            if(position < 0){
                position = 0;
            }

            grid.style.transform = `translateX(-${position}px)`;
        }

    });

});
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function(e) {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });
        document.addEventListener("click", function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const categoriesContainer = document.querySelector(".categories-grid");
    
    if (categoriesContainer) {
        categoriesContainer.innerHTML = '<div class="loading-state" style="text-align: center; width: 100%; grid-column: 1/-1; padding: 20px; font-weight: 600; color: #666;">Loading categories (Server may take up to 60s to wake up)...</div>';
        
        fetch("https://foodieland-oq9b.onrender.com/api/categories")
            .then(response => response.json())
            .then(data => {
                categoriesContainer.innerHTML = "";
                
                data.forEach(category => {
                    const categoryCard = document.createElement("div");
                    categoryCard.className = "category-card";
                    
                    categoryCard.innerHTML = `
                        <div class="category-image">
                            <img src="${category.image}" alt="${category.name}">
                        </div>
                        <p class="category-name">${category.name}</p>
                    `;
                    
                    categoriesContainer.appendChild(categoryCard);
                });
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                categoriesContainer.innerHTML = '<div class="error-state" style="text-align: center; width: 100%; grid-column: 1/-1; color: #FF4A4A;">Failed to load categories. Please refresh the page.</div>';
            });
    }
});
