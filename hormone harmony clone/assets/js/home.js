
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  menuBtn?.addEventListener("click", () => document.querySelector(".nav-left")?.classList.toggle("open"));

  const quantityCards = [...document.querySelectorAll(".quantity-card")];
  const packageChoice = [
    { id: "starter", price: "$89.99", label: "1 Jar" },
    { id: "popular", price: "$169.99", label: "2 Jars" },
    { id: "savings", price: "$309.99", label: "4 Jars" }
  ];
  quantityCards.forEach((card, index) => card.addEventListener("click", () => {
    quantityCards.forEach(item => item.classList.remove("selected"));
    card.classList.add("selected");
    const choice = packageChoice[index];
    const addButton = document.querySelector(".product-details .add-to-cart");
    if(addButton && choice){
      addButton.dataset.package = choice.id;
      addButton.textContent = `ADD TO CART - ${choice.price}`;
    }
  }));

  const purchaseOptions = [...document.querySelectorAll(".purchase-option")];
  purchaseOptions.forEach(option => option.addEventListener("click", () => {
    purchaseOptions.forEach(item => item.classList.remove("selected"));
    option.classList.add("selected");
  }));

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if(id && id.length > 1){
      const el = document.querySelector(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth", block:"start"}); }
    }
  }));

  const toast = document.getElementById("cartToast");
  let toastTimer;
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const id = btn.dataset.package;
      HMStore.addPackage(id, 1);
      if(toast){
        const p = HMStore.PACKAGES[id];
        toast.innerHTML = `<span>${p.name} added to your cart.</span><a href="cart.html">View cart</a>`;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 5000);
      }
    });
  });
});
