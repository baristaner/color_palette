// Renk paletlerini depolamak için array
let colorPalette = [];

document.getElementById("add-color-btn").addEventListener("click", function () {
  const colorPicker = document.getElementById("color-picker");
  const color = colorPicker.value;

  // Renk seçildiğinde, palet dizisine ekleyelim ve görsel olarak gösterelim
  colorPalette.push(color);
  displayColor(color);
});

function displayColor(color) {
  const colorPaletteDiv = document.getElementById("color-palette");

  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.classList.add("remove-button");

  // Kareyi içeren bir container oluşturalım
  const colorContainer = document.createElement("div");
  colorContainer.classList.add("color-container");

  // Renk gösterimini oluşturalım
  const colorDiv = document.createElement("div");
  colorDiv.style.backgroundColor = color;
  colorDiv.style.width = "50px";
  colorDiv.style.height = "50px";
  colorDiv.classList.add("d-inline-block", "me-2");
  colorContainer.appendChild(colorDiv);

  
  const contentDiv = document.createElement("div");

  // Renk altında hex ve rgb kodlarını göstermek için bir p tagi
  const hexCode = document.createElement("p");
  const rgbCode = document.createElement("p");

  hexCode.textContent = "Hex: " + color;

  // Renk değerini alıp RGB koduna dönüştürelim
  const rgb = hexToRgb(color);
  if (rgb) {
    const { r, g, b } = rgb;
    rgbCode.textContent = "RGB: " + r + ", " + g + ", " + b;
  } else {
    rgbCode.textContent = "RGB: Geçersiz renk kodu";
  }

  // Kaldırma işareti tıklama olayını ekle
  removeButton.addEventListener("click", function () {
    removeColor(color);
    colorPaletteDiv.removeChild(colorContainer);
  });

  contentDiv.appendChild(hexCode);
  contentDiv.appendChild(rgbCode);
  contentDiv.appendChild(removeButton);

  colorContainer.appendChild(contentDiv);

  colorPaletteDiv.appendChild(colorContainer);
}

// Hex kodunu RGB değerlere dönüştürmek için bir fonksiyon
function hexToRgb(hex) {
  const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = regex.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }
  return null;
}

function removeColor(color) {
  const storedColors = localStorage.getItem("colorPalette");

  if (storedColors) {
    // localStorage'daki renkleri diziye dönüştürür
    const colorPalette = JSON.parse(storedColors);

    // Filtreleyip seçilen rengi çıkar
    const updatedPalette = colorPalette.filter(
      (storedColor) => storedColor !== color
    );

    // Güncellenen renk paletini localStorage'a geri kaydet
    localStorage.setItem("colorPalette", JSON.stringify(updatedPalette));
  }
}

// Renk paletini kaydet
document
  .getElementById("save-palette-btn")
  .addEventListener("click", function () {
    // Paleti bir JSON dizesine dönüştürelim
    const paletteJson = JSON.stringify(colorPalette);

    // paleti locastorage'a kaydet
    localStorage.setItem("colorPalette", paletteJson);

    // Kaydedildiğine dair geribildirim
    alert("Palet başarıyla kaydedildi!");
  });

window.addEventListener("DOMContentLoaded", function () {
  createColorPalette();
});

function createColorPalette() {
  const colorPaletteDiv = document.getElementById("color-palette");
  const storedColors = localStorage.getItem("colorPalette");

  if (storedColors) {
    const colorPalette = JSON.parse(storedColors);

    colorPalette.forEach((color) => {
      displayColor(color);
    });
  }
}
