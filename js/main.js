
var ViewModel = function () {
    var self = this;
    self.filterValue = ko.observable('');

    self.filterList = ko.computed(function () {
        var itemark = geometry.filter(function (item) {
            return item.title.toLowerCase().indexOf(self.filterValue().toLowerCase()) > -1;
        });
        clearMarks();
        setMarks(itemark);
        return itemark;
    });

    self.clickList = function (geo) {
        google.maps.event.trigger(markers[geometry.indexOf(geo)], 'click');
    };

    self.searchIcon = function () {
        var $search=$('#search');

        if ($search.css('display')==='block'){
            $search.css('display','none');
        }else {
            $search.css('display','block');
        }
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
    ko.applyBindings(new ViewModel());
}

