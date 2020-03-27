document.getElementById('form').addEventListener('submit', (e) => {
   e.preventDefault();
    let lng = document.getElementById('lng').value;
    let lat = document.getElementById('lat').value;
    let ninjaInfo = document.getElementById('ninja-info');

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/ninjas?lng=${lng}&lat=${lat}`, true);
    xhr.onload = function(){
        if(this.status == 200){
            let ninjas = JSON.parse(this.responseText);
            let output = '';
            ninjas.forEach(ninja => {
                output += `
                <li>
                    <div>
                        <div id="${ninja.available}"></div>
                        <span id="name">${ninja.name}</span>
                        <span id="rank">${ninja.rank}</span>
                    </div>
                    <div><span id="distance">${Math.floor(ninja.dist.calculated/1000)} KM</span></div>
                </li>
                `;
            });

            ninjaInfo.innerHTML = output;
        }
    }
    xhr.send();
})