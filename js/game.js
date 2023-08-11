setGame("1200x600");
game.folder = "assets";

//file gambar yang dipakai dalam game
var gambar = {
  logo: "logo.png",
  startBtn: "tombolStart.png",
  cover: "cover.jpg",
  playBtn: "btn-play.png",
  maxBtn: "maxBtn.png",
  minBtn: "minBtn.png",
  idle: "Idle (32x32) new 7.png",
  run: "Run (32x32) new 2.png",
  jump: "Jump (32x32) new 1.png",
  fall: "Fall (32x32) new 1.png",
  hit: "Hit (32x32) new 1.png",
  tileset: "Terrain (512x512).png",
  bg: "Blue new 2.png",
  item1: "items bendera.png",
  musuh1Idle: "Idle (32x34).png",
  musuh1Run: "Run (32x34).png",
  musuh1Hit: "Hit (32x34).png",
};

//file suara yang dipakai dalam game
var suara = {};

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen() {
  hapusLayar("#67d2d6");
  tampilkanGambar(dataGambar.logo, 600, 250);
  var startBtn = tombol(dataGambar.startBtn, 600, 350);
  if (tekan(startBtn)) {
    jalankan(halamanCover);
  }
}
function halamanCover() {
  hapusLayar("#67d2d6");
  gambarFull(dataGambar.cover);
  var playBtn = tombol(dataGambar.playBtn, 1100, 500);
  if (tekan(playBtn)) {
    setAwal();
    jalankan(gameLoop);
  }
  resizeBtn(1150, 50);
}

function setAwal() {
  game.hero = setSprite(dataGambar.idle, 32, 32);
  game.skalaSprite = 2;
  game.hero.animDiam = dataGambar.idle;
  game.hero.animLompat = dataGambar.jump;
  game.hero.animJalan = dataGambar.run;
  game.hero.animJatuh = dataGambar.fall;
  game.hero.animMati = dataGambar.hit;
  setPlatform(map_1, dataGambar.tileset, 32, game.hero);
  game.gameOver = ulangiPermainan;
  setPlatformItem(1, dataGambar.item1);
  var musuh1 = {};
  musuh1.animDiam = dataGambar.musuh1Idle;
  musuh1.animJalan = dataGambar.musuh1Run;
  musuh1.animMati = dataGambar.musuh1Hit;
  setPlatformEnemy(1, musuh1);
}

function ulangiPermainan() {
  game.aktif = true;
  game.itemID = 1;
  game.score = 0;
  setAwal();
  jalankan(gameLoop);
}

function gameLoop() {
  hapusLayar();
  if (game.kanan) {
    gerakLevel(game.hero, 3, 0);
  } else if (game.kiri) {
    gerakLevel(game.hero, -3, 0);
  }
  if (game.atas) {
    gerakLevel(game.hero, 0, -10);
  }
  latar(dataGambar.bg, 0, 0);
  buatLevel();
  resizeBtn(1150, 50);
  cekItem();
  teks(game.score, 40, 60);
}

function cekItem() {
  if (game.itemID > 0) {
    tambahScore(1);
    game.itemID = 0;
  }
}
