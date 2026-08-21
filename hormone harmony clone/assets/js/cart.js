
document.addEventListener("DOMContentLoaded", renderCart);
window.addEventListener("hm:cart-updated", renderCart);

function renderCart(){
  const cart = HMStore.readCart();
  const holder = document.getElementById("cartItems");
  const checkout = document.getElementById("checkoutBtn");
  if(!holder) return;

  if(!cart.length){
    holder.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛍️</div>
        <h3>Your cart is empty</h3>
        <p>Choose the Hormone Harmony package that works best for you.</p>
        <a class="primary-btn" href="index.html#pricing">Shop Packages</a>
      </div>`;
    checkout?.classList.add("disabled");
    if(checkout){ checkout.style.pointerEvents="none"; checkout.style.opacity=".55"; }
  }else{
    holder.innerHTML = cart.map(item => `
      <article class="cart-item" data-id="${item.id}">
        <img class="cart-product-img" src="${item.image}" alt="Hormone Harmony pouch">
        <div>
          <h3>${item.name}</h3>
          <div class="cart-meta">${item.jars} bottle${item.jars>1?"s":""} per package · ${HMStore.money(item.unitPrice)} per jar</div>
          <div class="qty-control" aria-label="Quantity">
            <button type="button" data-action="decrease" aria-label="Decrease quantity">−</button>
            <input value="${item.quantity}" inputmode="numeric" aria-label="Quantity for ${item.name}">
            <button type="button" data-action="increase" aria-label="Increase quantity">+</button>
          </div>
          <div style="margin-top:10px"><button class="text-btn" type="button" data-action="remove">Remove</button></div>
        </div>
        <div class="cart-line-price">${HMStore.money(item.total * item.quantity)}</div>
      </article>`).join("");

    holder.querySelectorAll(".cart-item").forEach(row => {
      const id = row.dataset.id;
      row.querySelector('[data-action="decrease"]').addEventListener("click", ()=> {
        const item = HMStore.readCart().find(x=>x.id===id);
        HMStore.setQuantity(id, (item?.quantity||1)-1);
      });
      row.querySelector('[data-action="increase"]').addEventListener("click", ()=> {
        const item = HMStore.readCart().find(x=>x.id===id);
        HMStore.setQuantity(id, (item?.quantity||0)+1);
      });
      row.querySelector('[data-action="remove"]').addEventListener("click", ()=>HMStore.removeItem(id));
      row.querySelector("input").addEventListener("change", e=>HMStore.setQuantity(id, e.target.value));
    });
    if(checkout){ checkout.style.pointerEvents=""; checkout.style.opacity=""; }
  }

  const t = HMStore.totals();
  document.getElementById("subtotal").textContent = HMStore.money(t.subtotal);
  document.getElementById("shipping").textContent = t.shipping === 0 ? "FREE" : HMStore.money(t.shipping);
  document.getElementById("total").textContent = `${HMStore.money(t.total)} AUD`;

  const box = document.getElementById("freeShipping");
  if(box){
    if(t.shipping === 0 && t.subtotal > 0) box.textContent = "✓ Your order qualifies for FREE shipping.";
    else {
      const remaining = Math.max(0, 99 - t.subtotal);
      box.textContent = t.subtotal ? `Spend ${HMStore.money(remaining)} more to unlock free shipping.` : "Add a package to calculate shipping.";
    }
  }
}
