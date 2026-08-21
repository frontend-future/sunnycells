
(() => {
  const KEY = "hm_demo_cart_v2";
  const PACKAGES = {
    starter: { id:"starter", name:"Metabolic Morning Blend - 1 Jar", jars:1, unitPrice:89.99, total:89.99, image:"/hormone-harmony-clone/assets/images/metabolic-morning-blend.webp" },
    popular: { id:"popular", name:"Metabolic Morning Blend - 2 Jars", jars:2, unitPrice:84.99, total:169.99, image:"/hormone-harmony-clone/assets/images/pouch-3.webp" },
    savings: { id:"savings", name:"Metabolic Morning Blend - 4 Jars", jars:4, unitPrice:77.49, total:309.99, image:"/hormone-harmony-clone/assets/images/pouch-6.webp" }
  };

  function readCart(){
    try{
      const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    }catch(_){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem(KEY, JSON.stringify(cart));
    updateCartCount();
    window.dispatchEvent(new CustomEvent("hm:cart-updated", {detail: cart}));
  }
  function addPackage(id, quantity=1){
    const product = PACKAGES[id];
    if(!product) return;
    const cart = readCart();
    const existing = cart.find(x => x.id === id);
    if(existing) existing.quantity += quantity;
    else cart.push({...product, quantity});
    saveCart(cart);
  }
  function setQuantity(id, quantity){
    const cart = readCart();
    const item = cart.find(x => x.id === id);
    if(!item) return;
    item.quantity = Math.max(0, Number(quantity) || 0);
    saveCart(cart.filter(x => x.quantity > 0));
  }
  function removeItem(id){ saveCart(readCart().filter(x => x.id !== id)); }
  function clearCart(){ saveCart([]); }
  function totals(){
    const cart = readCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.total * item.quantity), 0);
    const qualifyingJars = cart.reduce((sum, item) => sum + (item.jars * item.quantity), 0);
    const shipping = qualifyingJars >= 2 || subtotal >= 99 ? 0 : 9.95;
    return { subtotal, shipping, total: subtotal + shipping, jars: qualifyingJars };
  }
  function money(v){ return new Intl.NumberFormat("en-AU",{style:"currency",currency:"AUD"}).format(v); }
  function updateCartCount(){
    const count = readCart().reduce((sum,item)=>sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
  }
  window.HMStore = { PACKAGES, readCart, saveCart, addPackage, setQuantity, removeItem, clearCart, totals, money, updateCartCount };
  document.addEventListener("DOMContentLoaded", updateCartCount);
})();
