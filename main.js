// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const categoryInput = document.getElementById('category')
const msg = document.querySelector('.msg');
const ElectronicList = document.querySelector('#electronicproducts');
const FoodList = document.querySelector('#foodproducts');
const SkincareList = document.querySelector('#skincareproducts');

function createProduct(obj) {
  
  // Create new list item with user
  const li = document.createElement('li');

  li.setAttribute('id',obj._id)

  // Add HTML
  li.innerHTML = `<strong>${obj.name}</strong> - ${obj.price} - ${obj.category} <button class="btn-danger btn-sm float-right delete">Delete Product</button>`;

  // Append to ul
  if(obj.category === "Electronic Items") {
    li.setAttribute('class',"electronic")
    ElectronicList.appendChild(li);
  }
  else if(obj.category === "Food Items") {
    li.setAttribute('class',"food")
    FoodList.appendChild(li);
  }
  else if(obj.category === "Skincare Items") {
    li.setAttribute('class',"skincare")
    SkincareList.appendChild(li);
  }
}

axios.get("https://crudcrud.com/api/1cb93fef67a945d28bdf588b655c2e92/ProductInfo")
  .then((response) => {
    for(var i=0; i < response.data.length; i++){
      createProduct(response.data[i])
    }
  });


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || priceInput.value === '' || categoryInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {

    let myObj = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value
    };

    //axios-crudcrud storage//

    axios.post("https://crudcrud.com/api/1cb93fef67a945d28bdf588b655c2e92/ProductInfo", myObj)
      .then((response) => {
        createProduct(response.data)
      })
      .catch((err) => {
        console.log(err)
      })

    // Clear fields
    nameInput.value = '';
    priceInput.value = '';
    categoryInput.value = '';
  }
}

// var electronics = document.getElementById('electronicproducts')
ElectronicList.addEventListener('click', removeItem);
SkincareList.addEventListener('click', removeItem);
FoodList.addEventListener('click', removeItem);

function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        if(e.target.parentElement.classList.contains('electronic')){
          var li = e.target.parentElement;
          ElectronicList.removeChild(li);
        }
        else if(e.target.parentElement.classList.contains('food')){
          var li = e.target.parentElement;
          FoodList.removeChild(li);
        }
        else if(e.target.parentElement.classList.contains('skincare')){
          var li = e.target.parentElement;
          SkincareList.removeChild(li);
        }
        // var li = e.target.parentElement;
        // electronics.removeChild(li);
        axios.delete("https://crudcrud.com/api/1cb93fef67a945d28bdf588b655c2e92/ProductInfo/"+li.getAttribute("id"));
      }
    }
    // else if(e.target.classList.contains('edit')){
    //     var li = e.target.parentElement;
    //     axios.get("https://crudcrud.com/api/1cb93fef67a945d28bdf588b655c2e92/ProductInfo/"+li.getAttribute("id"))
    //       .then(response => {
    //         nameInput.value = response.data.name;
    //         priceInput.value = response.data.price;
    //       })
        
    //     itemList.removeChild(li);
    //     axios.delete("https://crudcrud.com/api/1cb93fef67a945d28bdf588b655c2e92/ProductInfo/"+li.getAttribute("id"));
    
    // }

  }