var my_img = new Image();
my_img.src = "pacman10-hp-sprite.png";

my_img.onload = function init() {
	var canvas = document.getElementById('game_canvas');
	if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

		ctx.drawImage(my_img, 332, 0, 454, 136, 0, 0, 454, 136);  // draw board
		ctx.drawImage(my_img, 80, 20, 20, 20, 24, 30, 20, 20);  // draw ms.pacman
	}
};


