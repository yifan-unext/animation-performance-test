var TEST_INTERVAL = 4000;
var TEST_DOM_COUNTS = [5, 10, 15, 20, 25, 30, 35, 40];
var TEST_ANIMATIONS = ['left', 'transform'];
var TEST_IMAGE_SRCS = [
    'http://imgc.nxtv.jp/img/info/tit/00034/SID0034113.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00032/SID0032694.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00033/SID0033606.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00031/SID0031251.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00034/SID0034716.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00033/SID0033998.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00033/SID0033992.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00028/SID0028347.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00028/SID0028649.png?output-quality=30&output-format=jpg',
    'http://imgc.nxtv.jp/img/info/tit/00003/SID0003692.png?output-quality=30&output-format=jpg'
];

function createDiv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}

function setDivs(count, className) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (var i=0; i<count; i++) {
        container.appendChild(createDiv(className));
    }
}

function createImg(className) {
    var img = document.createElement('img');
    img.className = className;
    img.src = TEST_IMAGE_SRCS[Math.floor(Math.random()*10)];
    return img;
}

function setImgs(count, className) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (var i=0; i<count; i++) {
        var img = createImg(className);
        img.style.animationDelay = (i * 0.1) + 's';
        container.appendChild(img);
    }
}

var container = document.getElementById('container');
var title = document.getElementById('title');
// title.textContent = TEST_ANIMATIONS[0];

var lastStartTime = 0;
var domCount = 0;
var currentAnimation = 0;

title.textContent = TEST_ANIMATIONS[currentAnimation] + ' number of DOM elements: ' + TEST_DOM_COUNTS[domCount];
// setDivs(TEST_DOM_COUNTS[domCount], TEST_ANIMATIONS[currentAnimation]);
setImgs(TEST_DOM_COUNTS[domCount], TEST_ANIMATIONS[currentAnimation]);

requestAnimationFrame(function animate(timestamp) {
    if (timestamp > lastStartTime + TEST_INTERVAL) {
        lastStartTime = timestamp;
        if (domCount + 1 < TEST_DOM_COUNTS.length) {
            domCount += 1;
        } else {
            domCount = 0;
            if (currentAnimation + 1 < TEST_ANIMATIONS.length) {
                currentAnimation += 1;
            } else {
                currentAnimation = 0;
            }
        }
        // setDivs(TEST_DOM_COUNTS[domCount], TEST_ANIMATIONS[currentAnimation]);
        setImgs(TEST_DOM_COUNTS[domCount], TEST_ANIMATIONS[currentAnimation]);
        title.textContent = TEST_ANIMATIONS[currentAnimation] + ' number of div: ' + TEST_DOM_COUNTS[domCount];
    }

    requestAnimationFrame(animate);
});

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
// var memstats = new Stats();
// memstats.showPanel( 2 ); // 0: fps, 1: ms, 2: mb, 3+: custom
// memstats.dom.style.top = '50px';
// document.body.appendChild( memstats.dom );

requestAnimationFrame(function loop () {
    stats.update();
    // memstats.update();
    requestAnimationFrame(loop);
});

// function animate() {

// 	stats.update();

// 	// monitored code goes here

// 	stats.end();

// 	requestAnimationFrame( animate );

// }

// requestAnimationFrame( animate );