// ==========================
// WhatsApp Order Message Code
// ==========================
function sendWhatsAppMessage() {
  const name = document.getElementById("name").value || "Customer";
  const phone = document.getElementById("phone").value || "";
  
  const productSelect = document.getElementById("product");
  const product = productSelect ? productSelect.options[productSelect.selectedIndex].text : "Not specified";

  const flavor = document.getElementById("flavor") ? document.getElementById("flavor").value : "";
  const type = document.getElementById("type") ? document.getElementById("type").value : "";
  const size = document.getElementById("size") ? document.getElementById("size").value : "";
  const quantity = document.getElementById("quantity").value || "1";
  const date = document.getElementById("date").value || "Not specified";
   const email = document.getElementById("email").value || "";
  const notes = document.getElementById("notes").value || "None";

  let message = `Hi! I'd like to place an order from Crave-in:\n\n`;
  message += `👤 Name: ${name}\n`;
  message += `📞 Phone: ${phone}\n`;
  message += `🍰 Product: ${product}\n`;

  if (flavor) message += `🎂 Flavor: ${flavor}\n`;
  if (type) message += `🍶 Type: ${type}\n`;
  if (size) message += `📏 Size: ${size}\n`;

  message += `🔢 Quantity: ${quantity}\n`;
  message += `📅 Date: ${date}\n`;
  message += `👤 email: ${email}\n`;
  message += `📝 Notes: ${notes}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/2349026738391?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

// ==========================
// Modal Product Details Logic
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  const modalClose = document.getElementById('modal-close');
  const modalProductName = document.getElementById('modal-product-name');

  const modalFlavorContainer = document.getElementById('modal-flavor-container');
  const modalFlavorSelect = document.getElementById('modal-flavor-select');

  const modalTypeContainer = document.getElementById('modal-type-container');
  const modalTypeSelect = document.getElementById('modal-type-select');

  const modalSizeContainer = document.getElementById('modal-size-container');
  const modalSizeSelect = document.getElementById('modal-size-select');

  const modalQuantityContainer = document.getElementById('modal-quantity-container');
  const modalQuantitySelect = document.getElementById('modal-quantity-select');

  const orderButton = document.getElementById('modal-order-button');

  // Your product data (same as in order form)
  const productData = {
    doubleLayeredCake: {
      displayName: "Double Layered Cakes",
      flavors: ["Vanilla", "Red Velvet", "Chocolate"],
      sizes: ["6\" Wide", "8\" Wide", "10\" Wide", "12\" Wide", "14\" Wide"]
    },
    cupcakes: {
      displayName: "Cupcakes",
      types: ["Buttercream", "Whipped Cream"],
      quantities: ["Box of 4", "Half dozen", "Full dozen"]
    },
    bentoCake: {
      displayName: "Bento Cakes",
      types: ["Buttercream", "Whipped Cream"],
      sizes: ["4\" mini", "5\" mini"]
    },
    brownies: {
      displayName: "Brownies",
      quantities: ["5 pieces", "10 pieces", "20 pieces"]
    },
    cinnamonRolls: {
      displayName: "Cinnamon Rolls",
      quantities: ["Box of 4", "Box of 6", "Box of 12"]
    },
    strawberryRolls: {
      displayName: "Strawberry Rolls",
      quantities: ["Box of 4", "Box of 6", "Box of 12"]
    }
  };

  // Helper: populate select with options, add default "--Select--"
  function populateSelect(select, options) {
    select.innerHTML = '';
    select.appendChild(new Option('--Select--', ''));
    options.forEach(opt => {
      select.appendChild(new Option(opt, opt));
    });
  }

  // Hide all modal selectors
  function hideAllModalSelectors() {
    modalFlavorContainer.style.display = 'none';
    modalTypeContainer.style.display = 'none';
    modalSizeContainer.style.display = 'none';
    modalQuantityContainer.style.display = 'none';
  }

  // Show modal with dynamic selects based on product key
  function openModalForProduct(productKey) {
    const data = productData[productKey];
    if (!data) return;

    modalProductName.textContent = data.displayName || productKey;

    hideAllModalSelectors();

    // Show and populate selects according to product type
    if (data.flavors) {
      modalFlavorContainer.style.display = 'block';
      populateSelect(modalFlavorSelect, data.flavors);
    } else {
      modalFlavorSelect.innerHTML = '';
    }

    if (data.types) {
      modalTypeContainer.style.display = 'block';
      populateSelect(modalTypeSelect, data.types);
    } else {
      modalTypeSelect.innerHTML = '';
    }

    if (data.sizes) {
      modalSizeContainer.style.display = 'block';
      populateSelect(modalSizeSelect, data.sizes);
    } else {
      modalSizeSelect.innerHTML = '';
    }

    if (data.quantities) {
      modalQuantityContainer.style.display = 'block';
      populateSelect(modalQuantitySelect, data.quantities);
    } else {
      modalQuantitySelect.innerHTML = '';
    }

    // Show modal
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }

  // Copy modal selections into main order form, close modal, scroll
function placeOrderFromModal(productKey) {
  const productSelect = document.getElementById('product');
  const flavorSelect = document.getElementById('flavor');
  const typeSelect = document.getElementById('type');
  const sizeSelect = document.getElementById('size');
  const quantitySelect = document.getElementById('quantity');

  // Set product first to trigger change and populate options
  productSelect.value = productKey;

  // Trigger change event to populate dependent selects first
  productSelect.dispatchEvent(new Event('change'));

  // After a very short delay, set the values for flavor/type/size/quantity
  setTimeout(() => {
    if (modalFlavorContainer.style.display === 'block') {
      flavorSelect.value = modalFlavorSelect.value;
    } else {
      flavorSelect.value = '';
    }
    if (modalTypeContainer.style.display === 'block') {
      typeSelect.value = modalTypeSelect.value;
    } else {
      typeSelect.value = '';
    }
    if (modalSizeContainer.style.display === 'block') {
      sizeSelect.value = modalSizeSelect.value;
    } else {
      sizeSelect.value = '';
    }
    if (modalQuantityContainer.style.display === 'block') {
      quantitySelect.value = modalQuantitySelect.value;
    } else {
      quantitySelect.value = '';
    }

    // Manually trigger change events on these selects in case you have listeners to update price or UI
    [flavorSelect, typeSelect, sizeSelect, quantitySelect].forEach(sel => sel.dispatchEvent(new Event('change')));
  }, 10);  // 10ms delay lets the DOM update the options

  // Close modal
  modal.classList.remove('show');
  document.body.classList.remove('modal-open');

  // Scroll to order form
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}


  // Attach click to all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      const productKey = card.dataset.productKey;
      if (!productKey) {
        alert('Product key missing!');
        return;
      }

      openModalForProduct(productKey);
    });
  });

  // Modal close
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  });

  // Click outside modal closes modal
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  });

  // Place order button in modal
  orderButton.addEventListener('click', () => {
    // Find which product is selected in modal
    // Assume modalProductName corresponds to displayName, find productKey from productData
    const productKey = Object.keys(productData).find(key => productData[key].displayName === modalProductName.textContent);

    if (!productKey) {
      alert('Unknown product!');
      return;
    }

    // Validate user selected options (no empty selects)
    if ((modalFlavorContainer.style.display === 'block' && !modalFlavorSelect.value) ||
        (modalTypeContainer.style.display === 'block' && !modalTypeSelect.value) ||
        (modalSizeContainer.style.display === 'block' && !modalSizeSelect.value) ||
        (modalQuantityContainer.style.display === 'block' && !modalQuantitySelect.value)) {
      alert('Please select all options before ordering.');
      return;
    }

    placeOrderFromModal(productKey);
  });
});


// ==========================
// Hamburger Menu Toggle
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});

// ==========================
// Review Form Submission Handling (AJAX)
// ==========================

// ==========================
// Order Form Product Options & Price Calculation
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements for order form controls
  const productSelect = document.getElementById("product");
  const flavorContainer = document.getElementById("flavor-container");
  const flavorSelect = document.getElementById("flavor");
  const typeContainer = document.getElementById("type-container");
  const typeSelect = document.getElementById("type");
  const sizeContainer = document.getElementById("size-container");
  const sizeSelect = document.getElementById("size");
  const quantityContainer = document.getElementById("quantity-container");
  const quantitySelect = document.getElementById("quantity");
  const priceDisplay = document.getElementById("price");
  const formMessage = document.getElementById("form-message");
  const form = document.getElementById("order-form");

  // Hide optional inputs on page load
  flavorContainer.style.display = "none";
  typeContainer.style.display = "none";
  sizeContainer.style.display = "none";
  quantityContainer.style.display = "none";

  // Reset selects and price
  productSelect.value = "";
  flavorSelect.value = "";
  typeSelect.value = "";
  sizeSelect.value = "";
  quantitySelect.value = "";
  priceDisplay.textContent = "0";

  // Data for products, options, and prices
  const productData = {
    doubleLayeredCake: {
      flavors: ["Vanilla", "Red Velvet", "Chocolate"],
      sizes: ["6\" Wide", "8\" Wide", "10\" Wide", "12\" Wide", "14\" Wide"],
      prices: {
        "Vanilla": { "6\" Wide": 17000, "8\" Wide": 24000, "10\" Wide": 34000, "12\" Wide": 44000, "14\" Wide": 60000 },
        "Red Velvet": { "6\" Wide": 19000, "8\" Wide": 26000, "10\" Wide": 36000, "12\" Wide": 46000, "14\" Wide": 62000 },
        "Chocolate": { "6\" Wide": 18000, "8\" Wide": 25000, "10\" Wide": 35000, "12\" Wide": 45000, "14\" Wide": 61000 }
      }
    },
    cupcakes: {
      types: ["Buttercream", "Whipped Cream"],
      quantities: ["Box of 4", "Half dozen", "Full dozen"],
      prices: {
        "Buttercream": { "Box of 4": 6000, "Half dozen": 8000, "Full dozen": 15000 },
        "Whipped Cream": { "Box of 4": 8000, "Half dozen": 12000, "Full dozen": 23000 }
      }
    },
    bentoCake: {
      types: ["Buttercream", "Whipped Cream"],
      sizes: ["4\" mini", "5\" mini"],
      prices: {
        "Buttercream": { "4\" mini": 6000, "5\" mini": 7000 },
        "Whipped Cream": { "4\" mini": 7500, "5\" mini": 8500 }
      }
    },
    brownies: {
      quantities: ["5 pieces", "10 pieces", "20 pieces"],
      prices: { "5 pieces": 6000, "10 pieces": 12000, "20 pieces": 24000 }
    },
    cinnamonRolls: {
      quantities: ["Box of 4", "Box of 6", "Box of 12"],
      prices: { "Box of 4": 7000, "Box of 6": 10000, "Box of 12": 20000 }
    },
    strawberryRolls: {
      quantities: ["Box of 4", "Box of 6", "Box of 12"],
      prices: { "Box of 4": 8500, "Box of 6": 12000, "Box of 12": 23500 }
    }
  };

  // Clear optional fields and price display
  function clearAll() {
    flavorContainer.style.display = "none";
    typeContainer.style.display = "none";
    sizeContainer.style.display = "none";
    quantityContainer.style.display = "none";

    flavorSelect.innerHTML = "";
    typeSelect.innerHTML = "";
    sizeSelect.innerHTML = "";
    quantitySelect.innerHTML = "";
    priceDisplay.textContent = "0";
  }

  // Populate a select element with options, adds a default placeholder
  function populateSelect(selectElement, options) {
    selectElement.innerHTML = "";
    selectElement.appendChild(new Option("--Select--", ""));
    options.forEach(option => {
      selectElement.appendChild(new Option(option, option));
    });
  }

  // Calculate and display price based on selections
  function updatePrice() {
    const product = productSelect.value;

    if (!product) {
      priceDisplay.textContent = "0";
      return;
    }

    if (product === "doubleLayeredCake") {
      const flavor = flavorSelect.value;
      const size = sizeSelect.value;

      if (flavor && size) {
        const price = productData.doubleLayeredCake.prices[flavor][size];
        priceDisplay.textContent = price ? price.toLocaleString() : "0";
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "cupcakes") {
      const type = typeSelect.value;
      const quantity = quantitySelect.value;

      if (type && quantity) {
        const price = productData.cupcakes.prices[type][quantity];
        priceDisplay.textContent = price ? price.toLocaleString() : "0";
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "bentoCake") {
      const type = typeSelect.value;
      const size = sizeSelect.value;

      if (type && size) {
        const price = productData.bentoCake.prices[type][size];
        priceDisplay.textContent = price ? price.toLocaleString() : "0";
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "brownies") {
      const quantity = quantitySelect.value;
      if (quantity) {
        const price = productData.brownies.prices[quantity];
        priceDisplay.textContent = price ? price.toLocaleString() : "0";
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "cinnamonRolls") {
      const quantity = quantitySelect.value;
      if (quantity) {
        const price = productData.cinnamonRolls.prices[quantity];
        priceDisplay.textContent = price ? price.toLocaleString() : "0";
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "strawberryRolls") {
      const quantity = quantitySelect.value;
      if (quantity) {
        const price = productData.strawberryRolls.prices[quantity];
        priceDisplay.textContent = price ? price.toLocaleString() : "0";
      } else {
        priceDisplay.textContent = "0";
      }
    } else {
      priceDisplay.textContent = "0";
    }
  }

  // When product changes, show/hide and populate relevant options
  productSelect.addEventListener("change", () => {
    clearAll();

    const product = productSelect.value;

    if (!product) return;

    if (product === "doubleLayeredCake") {
      flavorContainer.style.display = "block";
      sizeContainer.style.display = "block";
      populateSelect(flavorSelect, productData.doubleLayeredCake.flavors);
      populateSelect(sizeSelect, productData.doubleLayeredCake.sizes);
    } else if (product === "cupcakes") {
      typeContainer.style.display = "block";
      quantityContainer.style.display = "block";
      populateSelect(typeSelect, productData.cupcakes.types);
      populateSelect(quantitySelect, productData.cupcakes.quantities);
    } else if (product === "bentoCake") {
      typeContainer.style.display = "block";
      sizeContainer.style.display = "block";
      populateSelect(typeSelect, productData.bentoCake.types);
      populateSelect(sizeSelect, productData.bentoCake.sizes);
    } else if (product === "brownies") {
      quantityContainer.style.display = "block";
      populateSelect(quantitySelect, productData.brownies.quantities);
    } else if (product === "cinnamonRolls") {
      quantityContainer.style.display = "block";
      populateSelect(quantitySelect, productData.cinnamonRolls.quantities);
    } else if (product === "strawberryRolls") {
      quantityContainer.style.display = "block";
      populateSelect(quantitySelect, productData.strawberryRolls.quantities);
    }

    updatePrice();
  });

  // Update price when any relevant option changes
  [flavorSelect, typeSelect, sizeSelect, quantitySelect].forEach(select => {
    select.addEventListener("change", updatePrice);
  });
});
document.getElementById("order-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get form values
  const product = document.getElementById("product").value;
  const flavor = document.getElementById("flavor").value;
  const type = document.getElementById("type").value;
  const size = document.getElementById("size").value;
  const quantity = document.getElementById("quantity").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;
  const priceText = document.getElementById("price").innerText.replace(/,/g, '');
  const price = parseFloat(priceText);
  const email = document.getElementById("email").value;

  if (!product || !price || isNaN(price)) {
    alert("Please complete the form with a valid price before proceeding.");
    return;
  }

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email before proceeding.");
    return;
  }

  const handler = PaystackPop.setup({
    key: 'pk_test_b999e861bd4101c3054626c03111c8a5075e7007',
    email: email,
    amount: price * 100, // amount in kobo
    currency: "NGN",

    callback: function(response) {
      // Payment complete, submit form data to Getform
      submitToGetform(response.reference);
    },

    onClose: function() {
      alert('Payment cancelled.');
    }
  });

  handler.openIframe();

  function submitToGetform(payment_reference) {
    // Prepare form data
    const formData = new FormData();
    formData.append("product", product);
    formData.append("flavor", flavor);
    formData.append("type", type);
    formData.append("size", size);
    formData.append("quantity", quantity);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("date", date);
    formData.append("notes", notes);
    formData.append("price", price);
    formData.append("email", email);
    formData.append("payment_reference", payment_reference);

    fetch("https://formsubmit.co/craveintoni@gmail.com", {  // <--- Replace with your actual Getform endpoint
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        document.getElementById("form-message").innerText = "Order submitted successfully!";
        document.getElementById("order-form").reset();
        document.getElementById("price").innerText = "0";
      } else {
        document.getElementById("form-message").innerText = "Order paid but failed to submit form. Please contact support.";
      }
    })
    .catch(error => {
      console.error("Getform submission error:", error);
      document.getElementById("form-message").innerText = "Error submitting form. Please try again.";
    });
  }
});
document.getElementById("review-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const formData = new FormData(form);

  fetch("https://getform.io/f/your-unique-endpoint-id", {  // <-- Replace with your Getform endpoint
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      showMessage("Review sent");
      form.reset();
    } else {
      showMessage("Review sent");
      form.reset();
    }
  })
  .catch(() => {
    showMessage("Review sent");
     form.reset();
  });

  function showMessage(msg) {
    let msgElem = document.getElementById("review-message");

    if (!msgElem) {
      msgElem = document.createElement("div");
      msgElem.id = "review-message";
      msgElem.style.color = "green";
      msgElem.style.marginTop = "10px";
      form.parentNode.insertBefore(msgElem, form.nextSibling);
    }

    msgElem.textContent = msg;

    setTimeout(() => {
      msgElem.textContent = "";
    }, 3000);
  }
});

