let products = [
  {id:1,name:"Elegant Dress",price:45,img:"images/dress1.jpg",desc:"Beautiful elegant dress perfect for parties.",reviews:[]},
  {id:2,name:"Stylish Top",price:30,img:"images/dress2.jpg",desc:"Trendy top for casual wear.",reviews:[]},
  {id:3,name:"Evening Gown",price:70,img:"images/dress3.jpg",desc:"Elegant gown for evening events.",reviews:[]}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = null;

// Load products
const grid = document.getElementById('product-grid');
products.forEach(p => {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><p>$${p.price}</p>`;
  div.onclick = () => openModal(p.id);
  grid.appendChild(div);
});

// Product Modal
const modal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
closeModalBtn.onclick = () => modal.style.display = 'none';

function openModal(id){
  selectedProduct = products.find(p=>p.id===id);
  document.getElementById('modal-img').src = selectedProduct.img;
  document.getElementById('modal-name').textContent = selectedProduct.name;
  document.getElementById('modal-desc').textContent = selectedProduct.desc;
  document.getElementById('modal-price').textContent = selectedProduct.price;
  renderReviews();
  modal.style.display='block';
}

// Reviews
function renderReviews(){
  const reviewList = document.getElementById('modal-reviews');
  reviewList.innerHTML = '';
  selectedProduct.reviews.forEach(r => {
    const li = document.createElement('li'); li.textContent = r; reviewList.appendChild(li);
  });
}
document.getElementById('submit-review').onclick = ()=>{
  const input = document.getElementById('review-input');
  if(input.value.trim()!==''){ selectedProduct.reviews.push(input.value); input.value=''; renderReviews();}
};

// Cart Modal
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
cartBtn.onclick=()=>{renderCart(); cartModal.style.display='block';};
closeCart.onclick=()=>cartModal.style.display='none';

document.getElementById('modal-add-cart').onclick=()=>{
  cart.push(selectedProduct);
  localStorage.setItem('cart',JSON.stringify(cart));
  updateCartCount();
  alert(`${selectedProduct.name} added to cart!`);
};

// Render cart
function renderCart(){
  const list = document.getElementById('cart-items');
  const totalElem = document.getElementById('cart-total');
  list.innerHTML=''; let total=0;
  cart.forEach(item=>{const li=document.createElement('li'); li.textContent=`${item.name} - $${item.price}`; list.appendChild(li); total+=item.price;});
  totalElem.textContent=total;
}

function updateCartCount(){
  document.getElementById('cart-count').textContent=cart.length;
}
updateCartCount();

// Checkout (Stripe demo)
document.getElementById('checkout-btn').onclick=()=>{
  alert("Stripe / PayPal integration goes here! Replace this with your Stripe Checkout code.");
};
