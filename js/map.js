var map, bounds, infoWindow, marker;
var markers = [];

var geometry = [
    {
        location: {
            lat: 23.151326,
            lng: 113.344683
        },
        title: '华南理工大学',
        name: 'South China University of Technology'
    },
    {
        location: {
            lat: 23.0965384,
            lng: 113.298883
        },
        title: '中山大学',
        name: 'Sun Yat-sen University'
    },
    {
        location: {
            lat: 23.13701,
            lng: 113.344724
        },
        title: '华南师范大学',
        name: 'South China Normal University'
    },
    {
        location: {
            lat: 23.199791,
            lng: 113.289552
        },
        title: '广东外语外贸大学',
        name: 'Guangdong University of Foreign Studies'
    },
    {
        location: {
            lat: 23.0611,
            lng: 113.404399
        },
        title: '广州中医药大学',
        name: 'Guangzhou University of Chinese Medicine'
    },
    {
        location: {
            lat: 23.085209,
            lng: 113.333403
        },
        title: '广东药科大学',
        name: 'Guangdong Pharmaceutical University'
    },
    {
        location: {
            lat: 23.149707,
            lng: 113.304052
        },
        title: '星海音乐学院',
        name: 'Xinghai Conservatory of Music'
    },
    {
        location: {
            lat: 23.033374,
            lng: 113.39728
        },
        title: '广东工业大学',
        name: 'Guangdong University of Technology'
    },
    {
        location: {
            lat: 23.037999,
            lng: 113.376123
        },
        title: '广州大学',
        name: 'Guangzhou University'
    },
    {
        location: {
            lat: 23.04072,
            lng: 113.382201
        },
        title: '广州美术学院',
        name: 'The Guangzhou Academy of Fine Arts'
    }

];

var styles = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#242f3e"
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#746855"
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#242f3e"
            }
        ]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#263c3f"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#6b9a76"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#38414e"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#212a37"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9ca5b3"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#746855"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#1f2835"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#f3d19c"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#2f3948"
            }
        ]
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#17263c"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#515c6d"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#17263c"
            }
        ]
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 23.102236, lng: 113.362218},
        zoom: 12,
        styles: styles,
        mapTypeControl: false
    });
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow();
}

function setMarks(geometry) {
    // console.log(geometry);
    if (geometry.length === 0) return;
    for (var i = 0; i < geometry.length; i++) {
        var geometryItem = geometry[i];
        var position = geometry[i].location;
        var title = geometry[i].title;

        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP
        });

        markers.push(marker);

        marker.addListener('mouseover', function () {
            this.setAnimation(google.maps.Animation.BOUNCE);
        });
        marker.addListener('mouseout', function () {
            this.setAnimation(null);
        });
        (function (item) {
            marker.addListener('click', function () {
                getRequestByAjax(item);
                showInfoWindow(this, infoWindow)
            })
        })(geometryItem)
    }
}

function clearMarks() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function showInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        // infoWindow.setContent('nihao');
        infoWindow.open(map, marker);
    }
}








