var TEST_INTERVAL = 3000;
var TEST_DOM_COUNTS = [100, 500, 1000, 1500, 2000, 2500];
var TEST_ANIMATIONS = ['left', 'transform'];


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

var container = document.getElementById('container');
var title = document.getElementById('title');
// title.textContent = TEST_ANIMATIONS[0];

var lastStartTime = 0;
var domCount = 0;
var currentAnimation = 0;

title.textContent = TEST_ANIMATIONS[currentAnimation] + ' number of div: ' + TEST_DOM_COUNTS[domCount];
setDivs(TEST_DOM_COUNTS[domCount], TEST_ANIMATIONS[currentAnimation]);

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
        setDivs(TEST_DOM_COUNTS[domCount], TEST_ANIMATIONS[currentAnimation]);
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