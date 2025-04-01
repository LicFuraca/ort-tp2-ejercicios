const str = `<ul>
  <li data-time="5:17">Flexbox Video</li>
  <li data-time="8:22">Flexbox Video</li>
  <li data-time="3:34">Redux Video</li>
  <li data-time="5:23">Flexbox Video</li>
  <li data-time="7:12">Flexbox Video</li>
  <li data-time="7:24">Redux Video</li>
  <li data-time="6:46">Flexbox Video</li>
  <li data-time="4:45">Flexbox Video</li>
  <li data-time="4:40">Flexbox Video</li>
  <li data-time="7:58">Redux Video</li>
  <li data-time="11:51">Flexbox Video</li>
  <li data-time="9:13">Flexbox Video</li>
  <li data-time="5:50">Flexbox Video</li>
  <li data-time="5:52">Redux Video</li>
  <li data-time="5:49">Flexbox Video</li>
  <li data-time="8:57">Flexbox Video</li>
  <li data-time="11:29">Flexbox Video</li>
  <li data-time="3:07">Flexbox Video</li>
  <li data-time="5:59">Redux Video</li>
  <li data-time="3:31">Flexbox Video</li>
</ul>`;

// Parsear datos
// Obtener el total de segundos de los videos de tipo Redux
// Tip: Obtener un array de objetos, donde cada objeto sea un video
// {min:5, seg: 59, tipo: 'Redux Video'}
const TIME_POS = 0;
const MIN_POS = 0;
const SEG_POS = 1;
const KEY_WORD = "Redux";

function obtainReduxVideosFromString(string) {
  let videosStringsArray = string.split("<li");
  let result = [];

  videosStringsArray.forEach((video) => {
    if (video.includes(KEY_WORD)) {
      const videoTime = obtainMinsAndSegsFromVideos(video);

      result.push({
        min: videoTime[TIME_POS][MIN_POS],
        seg: videoTime[TIME_POS][SEG_POS],
        tipo: KEY_WORD,
      });
    }
  });

  return result;
}

function obtainMinsAndSegsFromVideos(videoString) {
  return videoString
    .split('data-time="')
    .slice(1)
    .map((part) => ([min, seg] = part.split('"')[0].split(":").map(Number)));
}

console.log(obtainReduxVideosFromString(str));
