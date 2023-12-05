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
    console.log(X);
    console.log(Y);
  }
  return [X, Y];
}

function drawGraph() {
  background(255);

  // Définir les marges du graphique
  let margin = 50;
  width = width - 2 * margin;
  height = height - 2 * margin;

  // Dessiner l'axe des x
  stroke(0);
  line(margin, height + margin, width + margin, height + margin);

  // Dessiner l'axe des y
  line(margin, margin, margin, height + margin);

  // Dessiner le graphique
  noFill();
  beginShape();
  let res = calcXY();
  let X = res[0];
  let Y = res[1];
  console.log(res);

  for (let i = 0; i < X.length; i++) {
    let x = map(X[i], min(X), max(X), margin, width + margin);
    let y = map(Y[i], min(Y), max(Y), height + margin, margin);

    ellipse(x, y, 10);
  }
  endShape();

  // Étiquettes des axes
  fill(0);

  // Étiquettes de l'axe des y
  rotate(radians(-90));
  text("Size", -height / 2, margin - 20);
}

function setup() {
  createCanvas(960, 700);
  noStroke();

  drawGraph();
}
