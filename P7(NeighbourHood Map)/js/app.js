var myPlace = {
    lat: 17.3850,
    lng: 78.4867
};
//Hyderabad Location


var markers = [];
var map;
var myinfoWin = '';

function MyMap() {
    myinfoWin = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: myPlace

    });
    get_restaurant();
}

var myApp = {
    list: ko.observableArray([]),
    searchQuery: ko.observable(),
    Err: ko.observable(false),
    Err_message: ko.observable(''),

    constructor: function () {
        for (var i in markers) {
            myApp.list.push(markers[i].title);
        }
    },

    filter: function (query) {
        myApp.list.removeAll();
        for (var i in markers) {
            if (markers[i].title.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                myApp.list.push(markers[i].title);
                markers[i].setVisible(true);
            } else {
                markers[i].setVisible(false);
            }
        }
    }
}

function mapErr() {
    myApp.Err(true);
    myApp.Err_message('Map can"t be loaded');
}

function startwindow(marker) {
    if (myinfoWin.marker !== marker && myinfoWin.marker !== undefined) {
        stop_animation(myinfoWin.marker);
    }
    animation_marker(marker);
    var content = '<h1>' + marker.title + '</h1>';
    content += '<h2>' + marker.add + '</h2>';
    content += '<h3>' + marker.cuisin + '</h3>';
    myinfoWin.marker = marker;
    myinfoWin.setContent(content);
    myinfoWin.open(map, marker);
    myinfoWin.addListener('closeclick', stop_animation);
}

function startwindow2() {
    startwindow(this);
}

function get_restaurant() {
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/geocode',
        headers: {
            'Accept': 'application/json',
            'user-key': 'f4f6d9174e932bab6c1712d10ea3295b'
        },
        async: true,
        data: 'lat=17.3850&lon=78.4867'

    }).done(function (res) {
        var data = res.nearby_restaurants;
        // console.log( data );
        for (var i in data) {
            var marker = new google.maps.Marker({
                title: data[i].restaurant.name,
                position: {
                    lat: parseFloat(data[i].restaurant.location.latitude),
                    lng: parseFloat(data[i].restaurant.location.longitude)
                },
                map: map,
                animation: google.maps.Animation.DROP,
                add: data[i].restaurant.location.address,
                cuisin: data[i].restaurant.cuisines

            });
            marker.addListener('click', startwindow2);
            markers.push(marker);
        }
        var limits = new google.maps.LatLngBounds();
        for (var k in markers) {
            limits.extend(markers[k].position);
        }
        map.fitBounds(limits);
        myApp.constructor();
    }).fail(function () {
        myApp.Err(true);
        myApp.Err_message(' Restuarant not Displayed');
    });
}



function open(title) {
    for (var i in markers) {
        if (markers[i].title == title) {
            //myinfoWin.marker = markers[i];
            startwindow(markers[i]);
            return;
        }
    }
}

function animation_marker(marker) {
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/restaurant.png');
    marker.setAnimation(google.maps.Animation.BOUNCE);
}

function stop_animation(marker) {
    myinfoWin.marker.setIcon(null);
    myinfoWin.marker.setAnimation(null);
}
ko.applyBindings(myApp);
myApp.searchQuery.subscribe(myApp.filter);
//f4f6d9174e932bab6c1712d10ea3295b
