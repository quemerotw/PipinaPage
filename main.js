const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const whatsappOverlay = document.getElementById("whatsappOverlay");
const wapp = document.getElementById("wapp");
const itemList = document.querySelectorAll(".item");

menuToggle.addEventListener("click", () => {
  if (navbar.style.left === "0px") {
    navbar.style.left = "-100%";
  } else {
    navbar.style.left = "0px";
  }
});

class Overlay{
  constructor() {
    this.overlay = document.createElement("div");
    this.overlay.style.position = "fixed";
    this.overlay.style.top = "0";
    this.overlay.style.left = "0";
    this.overlay.style.width = "100vw";
    this.overlay.style.height = "100vh";
    this.overlay.style.background = "rgba(0,0,0,0.5)";
    this.overlay.style.display = "flex";
    this.overlay.style.alignItems = "center";
    this.overlay.style.justifyContent = "center";
    this.overlay.style.zIndex = "1000";
    this.overlay.style.backdropFilter = "blur(5px)"
    this.overlay.style.opacity = "0"; // inicio transparente
    this.overlay.style.transition = "opacity 0.3s ease"; // transición
  }
}

class DivOverlay{
  constructor() {
    
    this.element = document.createElement("div");
    this.element.id = "popup";

    this.element.style.alignItems = "center";
    this.element.style.display = "flex";
    this.element.style.flexDirection = "column";
    this.element.style.position = "relative"
    this.element.style.background = "#333";
    this.element.style.padding = "8px";
    this.element.style.color = "#fff";
    this.element.style.borderRadius = "6px";
    this.element.style.fontSize = "14px";
    this.element.style.pointerEvents = "auto";
    this.element.style.boxShadow = "0px 0px 27px 11px #000000"
    this.element.style.transform = "scale(0.8)"; // empieza reducido
    this.element.style.opacity = "0"; // empieza invisible
    this.element.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  }
}

class Popup {
  constructor(nombre) {

    this.pic = document.createElement("img");
    this.pic.style.width = "30vh";
    this.pic.src = "images/Pizza.png";
    this.pic.style.filter = "drop-shadow(2px 19px 15px #000000)";
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✖";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "5px";
    closeBtn.style.right = "15px";
    closeBtn.style.borderStyle = "none";
    closeBtn.style.background = "transparent";
    closeBtn.style.fontSize = "30px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.filter = "drop-shadow(0px 0px 2px #e5a50a)"
    closeBtn.addEventListener("click", () => this.destroy());



    const textoTitulo = document.createElement("p");
    textoTitulo.style.textAlign = "center";
    textoTitulo.style.fontSize = "30px";
    textoTitulo.style.paddingTop = "10px";
    textoTitulo.style.paddingBottom = "10px";
    textoTitulo.style.fontFamily = "'The Sherloks', serif"
    textoTitulo.textContent = "Nombre";

    const textoDetalle = document.createElement("p");
    textoDetalle.style.textAlign = "center";
    textoDetalle.style.fontSize = "18px";
    textoDetalle.style.paddingTop = "10px"

    textoDetalle.style.fontFamily = "'The Sherloks', serif"
    textoDetalle.textContent = nombre;

    this.element = new DivOverlay().element;
    this.overlay = new Overlay().overlay;

    this.element.appendChild(textoTitulo);
    this.element.appendChild(this.pic);
    this.element.appendChild(closeBtn);
    this.element.appendChild(textoDetalle);
    this.overlay.appendChild(this.element);
    document.body.appendChild(this.overlay);
    this.bloquear();
    void this.overlay.offsetWidth;

    requestAnimationFrame(() => {
      this.overlay.style.opacity = "1"; // fade in overlay
      this.element.style.transform = "scale(1)";
      this.element.style.opacity = "1";
    });
  }
  bloquear(){
    document.body.style.overflow = "hidden";
  }
  destroy() {
    this.overlay.style.opacity = "0";
    this.element.style.transform = "scale(0.8)";
    this.element.style.opacity = "0";

    // Esperar la transición antes de eliminar
    setTimeout(() => {
      this.overlay.remove();
      document.body.style.overflow = "auto";
    }, 300); // mismo tiempo que transition
  }
}



class pizza {

    constructor(nombre,precio,detalle,img){
      this.nombre = nombre;
      this.precio = precio;
      this.detalle = detalle;
      this.img = img;
    }
}

function agregarListen() {
  itemList.forEach(element => {
    let popup;
    element.addEventListener("click", (e) => {
      popup = new Popup(e.target.textContent);
    });
  });
}
agregarListen();