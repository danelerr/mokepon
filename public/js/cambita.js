let x = document.getElementById('dibujito');
let lienzo = x.getContext('2d', {willReadFrequently: true});


lienzo.strokeStyle = "red";


restore = [];
index = -1;

lienzo.beginPath();
lienzo.fillStyle = '#000000';
lienzo.fillRect(200, 0, 50, 50);
lienzo.closePath();
restore.push(lienzo.getImageData(0, 0, x.width, x.height));
index++;



lienzo.beginPath();
lienzo.moveTo(100, 100);
lienzo.lineTo(200, 200);
lienzo.stroke();
lienzo.closePath();
restore.push(lienzo.getImageData(0, 0, x.width, x.height));
index++;

lienzo.beginPath();
lienzo.moveTo(200, 200);
lienzo.lineTo(50, 100);
lienzo.stroke();
lienzo.closePath();
restore.push(lienzo.getImageData(0, 0, x.width, x.height));
index++;


lienzo.beginPath();
lienzo.moveTo(0, 0);
lienzo.lineTo(80, 80);
lienzo.stroke();
lienzo.closePath();
restore.push(lienzo.getImageData(0, 0, x.width, x.height));
index++;






console.log(index);

function volver() {
    if (index <= 0) {
        lienzo.beginPath();
        console.log('liumpi');
        lienzo.clearRect(0, 0, x.width, x.height);
        lienzo.closePath();
    } else {
        index--;
        restore.pop();
        lienzo.putImageData(restore[index], 0, 0);
    }
    console.log(index);
}
