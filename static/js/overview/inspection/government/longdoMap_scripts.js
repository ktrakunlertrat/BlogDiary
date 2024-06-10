async function getProvinceLocationByName(province_name) {
    console.log(province_name)
    const response = await fetch(`https://search.longdo.com/mapsearch/json/search?keyword=${province_name}&tag=province&limit=3&key=cff6f22fb0a1d809c74a4c345504ec24`);
    const result = await response.json();
    return [result.data[0]["lon"], result.data[0]["lat"], result.data[0]["address"].replace('รหัส: ', '')]
}

async function getDistrictsLocationByName(province_name) {
    const response = await fetch(`https://search.longdo.com/mapsearch/json/search?keyword=${province_name}&tag=district&limit=55&key=cff6f22fb0a1d809c74a4c345504ec24`);
    const result = await response.json();
    return result.data;
}

function findColor(value,most){
    color = value / most * 100
    // if(Number(value)==0) return "#bbb"
    if(Number(value)==0) color = 1;
    return `hsl(${260-color*2} 100% 30%)`;
}

function findMapBound(districts_data){
    let minLon = 200; 
    let maxLon = 0; 
    let minLat = 200; 
    let maxLat = 0;

    districts_data.forEach((district) => {
        if(district["lon"] < minLon ) minLon = district["lon"];
        if(district["lon"] > maxLon) maxLon = district["lon"];
        if(district["lat"] < minLat) minLat = district["lat"];
        if(district["lat"] > maxLat) maxLat = district["lat"];
    })
    return {
        minLon: minLon-0.15, minLat: minLat-0.15,
        maxLon: maxLon+0.15, maxLat: maxLat+0.15
        }
}


$('document').ready(async () => {
    // province_name
    const province_name = document.getElementById("province_name").value

    // get province location.
    let lon_lat = await getProvinceLocationByName(province_name);

    // init map
    let map = new longdo.Map({
        placeholder: document.getElementById('map'),
        layer:longdo.Layers.CLEAR,
        location:{ lon: lon_lat[0], lat: lon_lat[1] },
        zoomRange: { min:8, max:14 },
    });

    // config map UI.
    map.Ui.DPad.visible(false);
    map.Ui.Zoombar.visible(false);
    map.Ui.Geolocation.visible(false);
    map.Ui.Toolbar.visible(false);
    map.Ui.LayerSelector.visible(false);
    map.Ui.Fullscreen.visible(false);
    map.Ui.Crosshair.visible(false);
    map.Ui.Scale.visible(false);
    map.Ui.Keyboard.enable(false);
    map.Ui.Keyboard.enableInertia(false);
    map.Ui.Mouse.enableInertia(false);
    // map.Ui.Mouse.enableClick(false);
    // map.Ui.Mouse.enableWheel(false);
    // map.Ui.Mouse.enableDrag(false);

    // add map background.
    map.Overlays.add(new longdo.Rectangle(
                    {lon: lon_lat[0]-5, lat: lon_lat[1]+5},
                    {width: 20, height: 20},
                    {fillColor:"#eee5"} 
                    ));

    // get all district in province
    let districts = await getDistrictsLocationByName(province_name);

    districts = districts.filter((district) => {
        let district_name = district["name"].split(" ");
        if (district_name[1].replace("จ.","") == province_name )return district
    })
    
    // zoom scope map
    map.bound(findMapBound(districts));

    // set location of reset map button.
    document.getElementById("map-reset").addEventListener("click",()=> map.bound(findMapBound(districts)))

    // draw district on map and set district data on map.
    districts.forEach((district) => {
        district_name = district["name"].split(" ");
        district_name = district_name[0]

        map.Overlays.load(new longdo.Overlays.Object(`${district["address"].replace('รหัส: ', '')}`, 'IG', {
            title: district_name,
            detail: `${map_data[district_name.replace(`อ.`, '')]} เคส`,
            fillColor: findColor(map_data[district_name.replace(`อ.`, '')],map_data["most"],district_name),
            lineWidth: 1,
            lineColor: "#fff",
            weight:5,
        }));
    })
    // map.Overlays.load(new longdo.Overlays.Object(`${lon_lat[2]}`, 'IG',{
    //     lineColor:"#f00",
    //     weight:5,
    // }));

    // set number of most-case on color-bar.
    document.getElementById("most-case").innerHTML = map_data["most"];

    // back to province location on close popup.
    map.Event.bind('popupClose', function (overlay) {
        map.location({ lon: lon_lat[0], lat: lon_lat[1] }, true);
    });
})

