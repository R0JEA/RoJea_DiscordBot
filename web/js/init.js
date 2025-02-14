let imgSrc = "your_newspaper_base_img.png";

document.getElementById("newspaperImage").src = imgSrc;
document.getElementById("content").style.display = 'none';

// FiveM LUA Events Listener
window.addEventListener('message', (event) => {
  if (event.data.action === 'newImg') {
    if (!event.data.img) return;
    imgSrc = event.data.img;
    document.getElementById("newspaperImage").src = imgSrc;
  } else if (event.data.action === 'visibility') {
    document.getElementById("content").style.display = 'block';
  };
});

// Key pressed function
onKeyDown = (event) => {
  if ((event.keyCode === 27) || (event.keyCode === 8)) {
    document.getElementById("content").style.display = 'none';
    fetch('http://RoJea_DiscordBot/closeNewspaper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        close: true
      })
    }).then(resp => resp.json()).then();
    return false;
  }
}

window.addEventListener("keydown", onKeyDown, false);