const products = [
    {
        name: "Adidas Adicolor Classics Jacket",
        url: "images/adidas-adicolor-classics-jacket.png",
        category: "Jacket",
        price: `$79.99`
    },
    {
        name: "Mens Spring Autumn Flight Jacket",
        url: "images/mens-spring-autumn-flight-jacket.png",
        category: "Jacket",
        price: `$39.99`
    },
    {
        name: "Mens Winter Parlez Venice Jacket",
        url: "images/parlez-venice-jacket.png",
        category: "Jacket",
        price: `$49.99`
    },
    {
        name: "Uniqlo Oversized Airism T-Shirt",
        url: "images/uniqlo-oversized-t-shirt.png",
        category: "T-Shirt",
        price: `$59.99`
    },
    {
        name: "Uniqlo Oversized Crew Neck T-Shirt",
        url: "images/uniqlo-oversized-airism-t-shirt.png",
        category: "T-Shirt",
        price: `$69.99`
    },
    {
        name: "Applyw Men Drawstring Shorts",
        url: "images/applyw-men-drawstring-shorts.png",
        category: "Shorts",
        price: `$29.99`
    },
    {
        name: "Men Swim Trunks Moisture Shorts",
        url: "images/men-swim-trunks-moisture-shorts.png",
        category: "Shorts",
        price: `$19.99`
    },
    {
        name: "Nike Club Woven Flow Shorts",
        url: "images/nike-club-woven-flow-shorts.png",
        category: "Shorts",
        price: `$29.99`
    },
    {
        name: "FatFace Blue Padstow Chinos Shorts",
        url: "images/padstow-chino-shorts.png",
        category: "Shorts",
        price: `$39.99`
    },
    {
        name: "Nike Air Force 1 Men's Shoes",
        url: "images/nike-air-force-1-mens-shoes.png",
        category: "Shoes",
        price: `$77.99`
    },
    {
        name: "Nike Dunk Low Retro Men's Shoes",
        url: "images/nike-dunk-low-retro-mens-shoes.png",
        category: "Shoes",
        price: `$78.99`
    },
    {
        name: "Nike Killshot 2 Leather Men's Shoes",
        url: "images/nike-killshot-2-leather-mens-shoes.png",
        category: "Shoes",
        price: `$80.99`
    }
];

// Select DOM elements
const productsWrapper = document.getElementById('products-wrapper');
const checkboxes = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');

// Init Cart Item Count
let cartItemCount = 0;

// Init Product Element Array
const productElements = [];

// Loop Over Products and Create Elements
products.forEach((product) => {
    const productElement = createProductElement(product);
    productElements.push(productElement);
    productsWrapper.appendChild(productElement);
})

// Create a product element
function createProductElement(product) {
    const productElement = document.createElement('div');

    productElement.className = 'item space-y-4';

    productElement.innerHTML = `
    <div
    class="flex justify-center mx-auto relative overflow-hidden group cursor-pointer rounded-2xl"
    >
        <img
            src="${product.url}"
            alt="${product.name}"
            class="w-full h-full object-cover"
        />
        <button
            class="status bg-blue-500 text-white font-semibold absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:-translate-y-0"
        >
            Add to cart
        </button>
    </div>
        <p class="text-2lg">${product.name}</p>
        <strong>${product.price}</strong>
    `;

    // Update the cart

    productElement.querySelector('.status').addEventListener('click', updateCart);

    return productElement;
}

// Update cart by clicking Add and Remove from Cart Button

function updateCart(e) {
    const statusEl = e.target;
    if (statusEl.classList.contains('added')) {
        // Remove from cart 
        statusEl.classList.remove('added');
        statusEl.innerText = 'Add to Cart';
        statusEl.classList.add('bg-blue-500');
        statusEl.classList.remove('bg-red-500');

        cartItemCount--;
    } else {
        // Add to cart 
        statusEl.classList.add('added');
        statusEl.innerText = 'Remove from Cart';
        statusEl.classList.remove('bg-blue-500');
        statusEl.classList.add('bg-red-500');

        cartItemCount++;
    }

    // Update Cart Count
    cartCount.innerText = cartItemCount.toString();
}

// Filter Products by checkboxes and search input

function filterProducts() {
    // Get Search Input
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get Check Categories
    const checkedCategories = Array.from(checkboxes).filter((check) => check.checked).map((check) => check.id);

    // Filter Products
    productElements.forEach((productElement) => {
        const productName = productElement.querySelector('p').textContent.toLowerCase();
        const productCategory = products.find(product => product.name.toLowerCase() === productName).category.toLowerCase();

        const matchesSearch = productName.includes(searchTerm);
        const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(productCategory);

        if (matchesSearch && matchesCategory) {
            productElement.style.display = '';
        } else {
            productElement.style.display = 'none';
        }
    });
}

// Apply filters
filtersContainer.addEventListener('change', filterProducts);
filtersContainer.addEventListener('input', filterProducts);

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        checkboxes.forEach((cb) => {
            const label = cb.nextElementSibling;
            if (cb !== event.target) {
                cb.checked = false;
                label.classList.remove('bg-blue-500', 'text-white');
            }
        });

        const label = event.target.nextElementSibling;
        if (event.target.checked) {
            label.classList.add('bg-blue-500', 'text-white');
        } else {
            label.classList.remove('bg-blue-500', 'text-white');
        }

        filterProducts();
    });
});

searchInput.addEventListener('input', filterProducts);
