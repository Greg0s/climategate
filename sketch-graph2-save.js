// **********************
// Anomaly-gradient
// **********************
// DATA
// -------
// Global Land and Ocean Temperature Anomalies, January-December
// Units: Degrees Celsius
// Base Period: 1880-2021
// Source : Climate at Glance,
// https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/

let table;
let stripe;

// Colors
const black = 75;
const white = 250;

function preload() {
  // Load Data
  data = loadTable("assets/climategate-year-month.csv", "csv", "header");
}

function calcXY() {
  let X = [];
  let Y = [];
  let i = 0;
  for (let year = 1996; year < 2010; year++) {
    let cpt = 0;
    let totSize = 0;
    while (
      year == parseInt(data.getString(i, "year")) &&
      i < data.getRowCount() - 1
    ) {
      console.log(parseInt(data.getString(i, "year")));
      i++;
      cpt++;
      totSize += parseFloat(data.getString(i, "size"));
      //   totSize += new Number(data.getString(i, "size"));
    }
    totSize /= cpt;

    X.push(totSize);
    Y.push(cpt);
  }
  return [X, Y];
}

function drawGraph() {
  let squareSize = min(width, height);
  background(black);

  // Définir les marges du graphique
  let margin = 50;
  width = squareSize - 2 * margin;
  height = squareSize - 2 * margin;

  // Dessiner l'axe des x
  stroke(white, 120);
  line(margin, height / 2 + margin, width + margin, height / 2 + margin);

  // Dessiner l'axe des y
  line(width / 2, margin, width / 2, height + margin);

  // Dessiner le graphique
  noFill();
  beginShape();
  let res = calcXY();
  let X = res[0];
  let Y = res[1];

  for (let i = 0; i < X.length; i++) {
    let x = map(X[i], min(X), max(X), margin, width);
    let y = map(Y[i], max(Y), min(Y), height - margin, margin);
    const red = i * 20;
    const green = 0;
    const blue = 255 - i * 20;
    const alpha = 150;
    const diameter = (x * y) / 2700 + 15;

    fill(white, alpha);
    ellipse(x, height - y + margin, diameter);
    fill(red, green, blue, alpha);
    const year = 1996 + i;
    const offset = 15;
    noStroke();
    ellipse(x, height - y + margin, diameter);
    fill(white);
    textFont("Barlow");
    text(year, x - offset, height - y + margin);
    text(
      Math.floor((x * y) / 1024) + " ko",
      x - offset,
      height - y + offset + margin
    );
  }
  endShape();

  // Étiquettes des axes
  fill(white);

  // Étiquettes de l'axe des x
  textFont("Barlow");
  textStyle(BOLD);
  text(
    "Taille moyenne des mails",
    width - margin - 20,
    height / 2 + margin + 20
  );

  // Étiquettes de l'axe des y
  rotate(radians(-90));

  text("Nombre total de mails", -height / 4, width / 2 - 20);

  rotate(radians(90));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  drawGraph();
}
