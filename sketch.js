let font;

let imgs = [];
let fruitNames = [
  ["Bưởi", "Chuối", "Dưa Hấu", "Nho", "Táo", "Lê", "Quýt"],
  ["Chuối", "Dưa Hấu", "Mãng Cầu", "Dứa", "Thanh Long", "Quýt"],
  ["Mãng Cầu", "Sung", "Dừa", "Đu Đủ", "Xoài"]
];

const titles = ["Miền Bắc", "Miền Trung", "Miền Nam"]; // Titles for each scene
const textSpacing = 110;
let plate, plate02, l_frame, l_button;

let currentScene = 0; // Track the current scene
let currentPlate = 0; // Track the current plate image

// Load Fruit Images
function preload() {
  const fruitPaths = [
    [
      "/fruits_img/buoi.png",
      "/fruits_img/chuoi.png",
      "/fruits_img/duahau.png",
      "/fruits_img/nho.png",
      "/fruits_img/tao.png",
      "/fruits_img/le.png",
      "/fruits_img/quyt.png",
    ],
    [
      "/fruits_img/chuoi.png",
      "/fruits_img/duahau.png",
      "/fruits_img/mangcau.png",
      "/fruits_img/dua1.png",
      "/fruits_img/thanhlong.png",
      "/fruits_img/quyt.png",
    ],
    [
      "/fruits_img/mangcau.png",
      "/fruits_img/sung.png",
      "/fruits_img/dua2.png",
      "/fruits_img/dudu.png",
      "/fruits_img/xoai.png",
    ],
  ];

  // Load the images for the current scene
  imgs = fruitPaths[currentScene].map(path => loadImage(path));
  plate = loadImage("/assets/altar00.jpg");
  plate02 = loadImage("/assets/altar02.jpg");
  l_frame = loadImage("/assets/l_frame04.png");
  l_button = loadImage("/assets/l_button.png");
  font = loadFont("/assets/03.ttf");
}

const fruits = [];
let dragPoint = null;

const rows = 5;
const cols = 2;
const imgWidth = 80; 
const imgHeight = 80; 

// Set different sizes for each fruit
const fruitSizes = {
  "Bưởi": 130,
  "Chuối": 150,
  "Dưa Hấu": 150,
  "Nho": 150,
  "Táo": 80,
  "Lê": 80,
  "Quýt": 60,
  "Mãng Cầu": 80,
  "Sung": 60,
  "Dừa": 125,
  "Dứa": 125,
  "Đu Đủ": 160,
  "Xoài": 90,
  "Thanh Long": 120,
};

const containerX = 0;
const containerY = 0;
const containerWidth = 220;
const containerHeight = 600;

const buttonHeight = 40; 
const buttonY = containerY + containerHeight - buttonHeight - 115;



function setup() {
  createCanvas(600, 600);
  strokeWeight(1);
  textFont(font);
  textAlign(CENTER, TOP);
  textSize(15);
  loadFruits();
}

function loadFruits() {
  fruits.length = 0;
  let imgIndex = 0;

  for (let i = 0; i < fruitNames[currentScene].length; i++) {
    let x = (i % cols) * (imgWidth + 20) + 20; 
    let y = floor(i / cols) * (imgHeight + 30) + 50 + 20; 
    let img = imgs[imgIndex];
    fruits.push(new ImageDragObject(x, y, img, fruitNames[currentScene][i]));
    imgIndex++;
  }
}

function draw() {
  background(220);
  // R Container
  image(currentPlate === 0 ? plate : plate02, 220, 0, 400, 600);
  
  // L Container
  // fill(200);
  // image(l_frame, 0,0,containerWidth, 50);
  image(l_frame, containerX-20, containerY + 50 -20, containerWidth+50, containerHeight-50+40);
  image(l_button, -20,-30,containerWidth+60, 100);
  // rect(0, 0, containerWidth, 50);
  fill(0);
  textSize(30);
  text(titles[currentScene], containerX + containerWidth / 2, containerY + 25);

  noFill();
  
  // rect(containerX, containerY, containerWidth, containerHeight);
  textSize(15);
  
  for (let f of fruits) {
    f.show();
  }

  // Fruit Names
  for (let i = 0; i < fruitNames[currentScene].length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = 60 + col * 100;
    let y = 60 + 102 + row * textSpacing;

    fill(0);
    text(fruitNames[currentScene][i], x, y);
  }

  // Buttons
  drawSceneButtons();
  drawPlateChangeButton();
}

function drawSceneButtons() {
  
  const buttonWidth = containerWidth - 40; 
  const buttonLabels = ["Miền Bắc", "Miền Trung", "Miền Nam"];

  for (let i = 0; i < buttonLabels.length; i++) {
    const x = containerX + 20;
    const y = buttonY + (buttonHeight + 10) * i;

    // fill(255, 255, 0);
    // rect(x, y, buttonWidth, buttonHeight, 20);
    image(l_button, x, y, buttonWidth, buttonHeight + 20)

    fill(0);
    textAlign(CENTER, CENTER);
    text(buttonLabels[i], x + buttonWidth / 2, y + buttonHeight / 2);
  }
}

const plateButtonWidth = 120; // Width for the plate change button
const plateButtonX = 480; // X position for the plate change button
const plateButtonY = 540; // Y position for the plate change button

function drawPlateChangeButton() {
  fill(255, 0, 0);
  rect(plateButtonX, plateButtonY, plateButtonWidth, buttonHeight, 20);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Đổi Nền", plateButtonX + plateButtonWidth / 2, plateButtonY + buttonHeight / 2);
}

function mousePressed() {
  const buttonWidth = containerWidth - 40;
  const buttonLabels = ["Miền Bắc", "Miền Trung", "Miền Nam"];

  for (let i = 0; i < buttonLabels.length; i++) {
    const x = containerX + 20;
    const y = buttonY + (buttonHeight + 10) * i;

    if (mouseX >= x && mouseX <= x + buttonWidth && mouseY >= y && mouseY <= y + buttonHeight) {
      currentScene = i;
      preload();
      loadFruits();
      break;
    }
  }
  
  // Check for plate change button click
  if (mouseX >= plateButtonX && mouseX <= plateButtonX + plateButtonWidth &&
      mouseY >= plateButtonY && mouseY <= plateButtonY + buttonHeight) {
    currentPlate = (currentPlate + 1) % 2; // Toggle plate image
  }

  // DRAGGING
  for (let i = fruits.length - 1; i >= 0; i--) {
    if (fruits[i].mouseInside()) {
      dragPoint = fruits.splice(i, 1)[0];
      fruits.push(dragPoint);
      break;
    }    
  }
}

function mouseDragged() {
  if (dragPoint) {
    dragPoint.x = mouseX - imgWidth / 2; // Center the drag
    dragPoint.y = mouseY - imgHeight / 2; // Center the drag
  }
}

function mouseReleased() {
  if (dragPoint) {
    if (mouseX >= containerX && mouseX <= containerX + containerWidth &&
        mouseY >= containerY && mouseY <= containerY + containerHeight) {
      
      // Snap back to original position and reset size
      dragPoint.x = dragPoint.originalX;
      dragPoint.y = dragPoint.originalY;
      dragPoint.resetSize();
    } else {
      // Use the size defined in fruitSizes based on the fruit name
      let newSize = fruitSizes[dragPoint.fruitName] || imgWidth; // Fallback to default size
      dragPoint.setSize(newSize); // Change size of the dragged fruit

      // Add a new instance of the dragged fruit to the container
      fruits.push(new ImageDragObject(dragPoint.originalX, dragPoint.originalY, dragPoint.img, dragPoint.fruitName));
    }
    dragPoint = null; // Clear the drag point
  }
}

class ImageDragObject {
  constructor(x, y, img, fruitName) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.originalX = x;
    this.originalY = y;
    this.currentWidth = imgWidth;
    this.currentHeight = imgHeight;
    this.fruitName = fruitName; // Store the fruit name to access size mapping
  }
    
  mouseInside() {
    return mouseX >= this.x && mouseX <= this.x + this.currentWidth &&
           mouseY >= this.y && mouseY <= this.y + this.currentHeight;
  }
  
  show() {
    image(this.img, this.x, this.y, this.currentWidth, this.currentHeight);
  }

  setSize(size) {
    this.currentWidth = size;
    this.currentHeight = size;
  }

  resetSize() {
    this.currentWidth = imgWidth; 
    this.currentHeight = imgHeight; 
  }
}
