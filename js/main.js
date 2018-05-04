// const $searchInput = $('#search-input');
const $form = $('#search-form');

var control = function () {
    this.filterValue = ko.observable('');

    this.filterList = ko.computed(function () {
        var itemark = geometry.filter(function (item) {
            return item.title.toLowerCase().indexOf(filterValue().toLowerCase()) > -1;
        });

        clearMarks();
        setMarks(itemark);

        return itemark;
    });

    this.clickList = function (geo) {
        console.log(geo);
        google.maps.event.trigger(markers[locations.indexOf(geo)],'click');
    }
};

function getRequestByAjax(item) {
    // console.log(item);
    $.ajax({
        url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${item.name}&api-key=32ba1b81472547be8775bee5d6a80e13`,
        datType: 'json'
    }).done(function (collegeInf) {
        if (collegeInf.response && collegeInf.response.docs && collegeInf.response.docs.length > 1) {
            infoWindow.setContent(collegeInf.response.docs[0].snippet)
        } else {
            infoWindow.setContent('There is no data');
        }
    }).fail(function (err) {
        console.log('The request failed:' + err);
    });
}

function init() {
    initMap();
    ko.applyBindings(control);
}

