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

function drawGraph() {
  background(255);

  // Définir les marges du graphique
  let margin = 50;
  width = width - 2 * margin;
  height = height - 2 * margin;

  //   // Trouver la plage de dates
  //   let dates = data
  //     .getColumn("year")
  //     .map(
  //       (year, index) => year + data.getString(index, "month").padStart(2, "0")
  //     );
  //   let minDate = min(dates);
  //   let maxDate = max(dates);

  //   // Convertir les dates en pixels
  //   let xScale = width / (dates.length - 1);
  //   let yScale =
  //     height / (max(data.getColumn("size")) - min(data.getColumn("size")));

  // Dessiner l'axe des x
  stroke(0);
  line(margin, height + margin, width + margin, height + margin);

  // Dessiner l'axe des y
  line(margin, margin, margin, height + margin);

  // Dessiner le graphique
  noFill();
  beginShape();
  let xvalues = [];
  let dates = [];

  let alreadyPrinted = "";
  for (let i = 0; i < data.getRowCount(); i++) {
    let x = map(i, 0, data.getRowCount() - 1, margin, width + margin);
    let y = map(
      log(data.getNum(i, "size")),
      log(min(data.getColumn("size"))),
      log(max(data.getColumn("size"))),
      height + margin,
      margin
    );

    ellipse(x, y, 10);

    let date = data.getString(i, "year");
    if (!alreadyPrinted.includes(date)) {
      text(date, x, height + margin + 10);
      console.log(date);
      alreadyPrinted += " " + date;
    }
  }
  endShape();

  // Étiquettes des axes
  fill(0);
  //   textAlign(CENTER, CENTER);
  //   textSize(12);
  // Étiquettes de l'axe des x
  //   for (let i = 0; i < data.getRowCount(); i++) {
  //     let x = map(i, 0, data.getRowCount() - 1, margin, width + margin);
  //     let file = data.getString(i, "file").replace(".txt", "");
  //     file = parseInt(file);
  //   }

  // Étiquettes de l'axe des y
  rotate(radians(-90));
  text("Size", -height / 2, margin - 20);
}

function setup() {
  createCanvas(960, 700);
  noStroke();

  drawGraph();
}
