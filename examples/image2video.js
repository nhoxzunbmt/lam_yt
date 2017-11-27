var ffmpeg = require('../index');
ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe');
// make sure you set the correct path to your video file
// var images = ['assets/step_1.png', 'assets/step_2.png', 'assets/step_3.png', 'assets/step_4.png'];
//

var images = [
    {
        path: 'assets/step_1.png',
        caption: 'This is a sample subtitle'
    }, {
        path: 'assets/step_2.png',
        caption: 'Another sample text'
    }
];
images = mapImages(images);
// ffmpeg -i your_target.mp4 -vf drawtext="ariblk.ttf: text='Ăn cà rem': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.5: boxborderw=5: x=(w-text_w)/2: y=(h-text_h)/2" -codec:a copy output.mp4


//console.log({ source: images });
var proc = ffmpeg()
    .input('assets/step_3.png')
    //.addInput('assets/step_1.png')
// loop for 5 seconds
    .loop(5)
    // using 25 fps
    .fps(25)
    .addInput('assets/song.mp3')
    // setup event handlers
    .on('end', function () {
        console.log('file has been converted succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
    })
    // save to file
    .save('your_target.mp4');


function mapImages(obj) {
    if (typeof obj === 'string') {
        return {path: obj}
    }

    if (Array.isArray(obj)) {
        return obj.map(mapImages)
    }

    if (obj && typeof obj === 'object') {
        return obj
    }

    throw new TypeError('image must be a string or an array')
}