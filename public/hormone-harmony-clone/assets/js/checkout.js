
document.addEventListener("DOMContentLoaded", () => {
  const cart = HMStore.readCart();
  if(!cart.length){
    window.location.replace("/hormone-harmony/cart");
    return;
  }
  renderCheckout();

  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    const orderNumber = "HH-" + Math.floor(100000 + Math.random()*900000);
    sessionStorage.setItem("hm_demo_order_number", orderNumber);
    sessionStorage.setItem("hm_demo_order_total", HMStore.money(HMStore.totals().total));
    HMStore.clearCart();
    window.location.href = "/hormone-harmony/checkout?complete=1";
  });
});

function renderCheckout(){
  const holder = document.getElementById("checkoutItems");
  const cart = HMStore.readCart();
  holder.innerHTML = cart.map(item => `
    <div class="order-line">
      <img src="${item.image}" alt="">
      <div><h4>${item.name}</h4><small>${item.jars} bottle${item.jars>1?"s":""} × ${item.quantity}</small></div>
      <strong>${HMStore.money(item.total * item.quantity)}</strong>
    </div>`).join("");

  const t = HMStore.totals();
  document.getElementById("checkoutSubtotal").textContent = HMStore.money(t.subtotal);
  document.getElementById("checkoutShipping").textContent = t.shipping === 0 ? "FREE" : HMStore.money(t.shipping);
  document.getElementById("checkoutTotal").textContent = `${HMStore.money(t.total)} AUD`;
  document.getElementById("shippingMethodPrice").textContent = t.shipping === 0 ? "FREE" : HMStore.money(t.shipping);
}
