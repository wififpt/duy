$(document).ready(function () {
    owlServiceCombo();
    owlServiceOnly();
    /**Load name */
    if (localStorage.getItem('locationname') != null) {
        locationName.text(localStorage.getItem('locationname'))
    }

    let arrayUtm = ["utm_campaign", "utm_source", "utm_medium", "utm_content", "utm_term"];
    $.each(arrayUtm, function (key, val) {
        if (modalLocation.getUrlParameter(val)) {
            sessionStorage.setItem(val, modalLocation.getUrlParameter(val));
        }
    });

    let location = { "locationid": 58, "districtid": 1, "wardid": 1 };
    if (!modalLocation.getUrlParameter("locationid") || !modalLocation.getUrlParameter("districtid") || !modalLocation.getUrlParameter("wardid")) {
        
        if (modalLocation.getUrlParameter("locationid") || modalLocation.getUrlParameter("districtid") || modalLocation.getUrlParameter("wardid")) {
            modalLocation.setNewUrl(location.locationid, location.districtid, location.wardid);
            modalLocation.loadContentPackage(location.locationid, location.districtid, location.wardid);
            $.each(location, function (key, val) {
                localStorage.setItem(key, val);
                sessionStorage.setItem(key, val);
            });
        } else {
            if (localStorage.getItem('locationid') != null && localStorage.getItem('districtid') != null && localStorage.getItem('wardid') != null) {
                if (localStorage.getItem('locationid') == 8) {
                    locationName.text('Khánh Hòa')
                }
                modalLocation.loadContentPackage(localStorage.getItem('locationid'), localStorage.getItem('districtid'), localStorage.getItem('wardid'));
            } else {

                locationName.text('Khánh Hòa')
                modalLocation.loadContentPackage(location.locationid, location.districtid, location.wardid);
                $.each(location, function (key, val) {
                    localStorage.setItem(key, val);
                    sessionStorage.setItem(key, val);
                });
            }
        }
    } else {
        modalLocation.loadContentPackage(modalLocation.getUrlParameter("locationid"), modalLocation.getUrlParameter("districtid"), modalLocation.getUrlParameter("wardid"));
        if (modalLocation.getUrlParameter("locationid") == 8) {
            locationName.text('Khánh Hòa')
        }

        $.each(location, function (key, val) {
            localStorage.setItem(key, modalLocation.getUrlParameter(key));
            sessionStorage.setItem(key, modalLocation.getUrlParameter(key));
        });
    }

    if (localStorage.getItem('listLocation') == null) {
        $.ajaxSetup({ async: false });
        $.post(
            urlEnv + "api/saleplatform/geography/get-location",
            function (response) {
                let data = response.data;
                if (data) {
                    localStorage.setItem('listLocation', JSON.stringify(data));
                }
            }
        );
        $.ajaxSetup({ async: true });
    }

    if (localStorage.getItem('locationid') != null) {
        $.each(JSON.parse(localStorage.getItem('listLocation')), function (key, val) {
            if (localStorage.getItem('locationid') == val.id) {
                locationName.text(val.text);
                localStorage.setItem('locationname', val.text);
            }
        });
    }

    let dataLocation = JSON.stringify({ 'locationid': localStorage.getItem('locationid'), 'districtid': localStorage.getItem('districtid'), "wardid": localStorage.getItem('wardid'), "source": 1 });
    sessionStorage.setItem("dataLocation", dataLocation);
});