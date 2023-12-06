/*
Data Design - Petit et grand
Marie-Claire St-Dizier & Grégoire Tinnes

Climatic Research Unit emails, data, models, 1996-2009 - WikiLeaks, Adresse : https://wikileaks.org/wiki/Climatic_Research_Unit_emails,_data,_models,_1996-2009 [Consulté le : 6 décembre 2023]

Nous nous sommes concentré sur l’aspect temporel des informations des mails. Pour cela, nous avons regroupé les informations par années représentées chacune par un point dans notre graphique. Celui-ci permet de constater une évolution croissante de la taille moyenne des mails hackés et de leur nombre dans le temps selon deux paramètres de quantité.

Pour appuyer cette évolution, nous avons en plus ajouté un paramètre de données totale sur une année, qui correspond au diamètre de chaque point. Les couleurs nous permettent de visualiser le temps (du bleu, le plus ancien, au rouge, le plus récent). En voyant les cercles en haut et/ou à droite (grand nombre de mails / mails volumineux), et leurs tailles, nous constatons de manière évidente que ces dernières années, ces deux valeurs sont en hausse.
*/

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
      i++;
      cpt++;
      totSize += parseFloat(data.getString(i, "size"));
    }
    totSize /= cpt;

    X.push(totSize);
    Y.push(cpt);
  }
  return [X, Y];
}

function drawGraph() {
  const squareSize = min(width, height);
  background(black);

  // Définir les marges du graphique
  const margin = 50;
  const graphWidth = squareSize - 2 * margin;
  const graphHeight = squareSize - 2 * margin;

  // Calculer les coordonnées du centre de l'écran
  const centerX = width / 2;
  const centerY = height / 2;

  // Dessiner l'axe des x
  stroke(white, 120);
  line(
    centerX - graphWidth / 2,
    centerY + margin,
    centerX + graphWidth / 2,
    centerY + margin
  );

  // Dessiner l'axe des y
  line(centerX, centerY - graphHeight / 2, centerX, centerY + graphHeight / 2);

  // Dessiner le graphique
  noFill();
  beginShape();
  let res = calcXY();
  const X = res[0];
  const Y = res[1];

  for (let i = 0; i < X.length; i++) {
    let x = map(
      X[i],
      min(X),
      max(X),
      centerX - graphWidth / 2,
      centerX + graphWidth / 2
    );

    let y = map(
      Y[i],
      max(Y),
      min(Y),
      centerY - graphHeight / 2,
      centerY + graphHeight / 2
    );

    const cred = i * 20;
    const cgreen = 0;
    const cblue = 255 - i * 20;
    const alpha = 150;
    const multiply = squareSize / 4500;
    const diameter = X[i] * Y[i] * multiply + 15;

    fill(white, alpha);
    ellipse(x, y, diameter);
    fill(cred, cgreen, cblue, alpha);
    const year = 1996 + i;
    const offset = 15;
    noStroke();
    ellipse(x, y, diameter);
    fill(white);
    textFont("Barlow");
    text(year, x - offset, y);
    text(Math.floor(X[i] * Y[i]) + " ko", x - offset, y + offset);
  }
  endShape();

  // Étiquettes des axes
  fill(190);

  // Étiquettes de l'axe des x
  textFont("Barlow");
  textStyle(BOLD);
  text(
    "Taille moyenne des mails",
    centerX + graphWidth / 3,
    centerY + margin + 20
  );

  // Étiquettes de l'axe des y
  rotate(radians(-90));
  text("Nombre total de mails", -centerY, centerX - 20);
  rotate(radians(90));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  drawGraph();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawGraph();
}
