let modal = $('#modalPromotionalLocation');
let locationElement = $('#location');
let districtElement = $('#district');
let wardElement = $('#ward');
let btnConfirm = $('#confirm');
let delayModel = 1000;
let locationName = $('#location-name');
let modalLocation = {
    construct: function () {
        let locationId = Number(localStorage.getItem('locationid') != null ? localStorage.getItem('locationid') : 8);
        let districtId = Number(localStorage.getItem('districtid') != null ? localStorage.getItem('districtid') : 1);

        $.post(
            urlEnv + "api/saleplatform/geography/get-location",
            function (response) {
                let data = response.data;
                if (response.error == 0) {
                    $('#location').empty();

                    $.each(data, function (key, val) {
                        /** Default : HCM */
                        if (localStorage.getItem('locationid') != null && localStorage.getItem('locationid') == val.id) {
                            var option = '<option value="' + val.id + '" selected>' + val.text + '</option>';
                        }
                        else {
                            if (val.id == 8 && localStorage.getItem('locationid') == null) {
                                var option = '<option value="' + val.id + '" selected>' + val.text + '</option>';
                            }
                            else {
                                // if (allowedCityPromotionalLandingPage.includes(val.id)) {
                                    var option = '<option value="' + val.id + '">' + val.text + '</option>';
                                // }
                            }
                        }
                        locationElement.append(option);
                    });
                }
            }
        );
        $.ajax({
            url: urlEnv + "api/saleplatform/geography/get-district",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ LocationId: locationId }),
            dataType: "json",
            success: function (response) {
                let data = response.data;
                if (response.error == 0) {
                    districtElement.empty();
                    var option = '';
                    districtElement.append(option);
                    $.each(data, function (key, val) {
                        if (localStorage.getItem('districtid') != null && localStorage.getItem('districtid') == val.id) {
                            var option = '<option value="' + val.id + '" selected>' + val.text + '</option>';
                        }
                        else {
                            if (val.id == 1 && localStorage.getItem('districtid') == null) {
                                var option = '<option value="' + val.id + '" selected>' + val.text + '</option>';
                            }
                            else {
                                var option = '<option value="' + val.id + '">' + val.text + '</option>';
                            }
                        }
                        districtElement.append(option);
                    });
                }
            }
        });
        $.ajax({
            url: urlEnv + "api/saleplatform/geography/get-ward",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ LocationId: locationId, DistrictId: districtId }),
            dataType: "json",
            success: function (response) {
                let data = response.data;
                if (response.error == 0) {
                    wardElement.empty();
                    var option = '';
                    wardElement.append(option);
                    $.each(data, function (key, val) {
                        if (localStorage.getItem('wardid') != null && localStorage.getItem('wardid') == val.id) {
                            var option = '<option value="' + val.id + '" selected>' + val.text + '</option>';
                        }
                        else {
                            if (val.id == 1 && localStorage.getItem('wardid') == null) {
                                var option = '<option value="' + val.id + '" selected>' + val.text + '</option>';
                            }
                            else {
                                var option = '<option value="' + val.id + '">' + val.text + '</option>';
                            }
                        }
                        wardElement.append(option);
                    });
                }
            }
        });
    },
    loadLocation: function () {

    },
    loadDistrict: function (locationId) {
        $.ajax({
            url: urlEnv + "api/saleplatform/geography/get-district",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ LocationId: parseInt(locationId) }),
            dataType: "json",
            success: function (response) {
                let data = response.data;
                if (response.error == 0) {
                    districtElement.empty().select2({
                        placeholder: "Chá»n Quáº­n/Huyá»‡n",
                    }).append(`<option></option>`);
                    wardElement.empty().select2({
                        placeholder: "Chá»n PhÆ°á»ng/XĂ£",
                    }).append(`<option></option>`);
                    $.each(data, function (key, val) {
                        var option = '<option value="' + val.id + '">' + val.text + '</option>';
                        districtElement.append(option);
                    });
                }
            }
        });
    },
    loadWard: function (locationId, DistrictId) {
        $.ajax({
            url: urlEnv + "api/saleplatform/geography/get-ward",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ LocationId: parseInt(locationId), DistrictId: parseInt(DistrictId) }),
            dataType: "json",
            success: function (response) {
                let data = response.data;
                if (response.error == 0) {
                    wardElement.empty().select2({
                        placeholder: "Chá»n PhÆ°á»ng/XĂ£",
                    }).append(`<option></option>`);
                    $.each(data, function (key, val) {
                        var option = '<option value="' + val.id + '">' + val.text + '</option>';
                        wardElement.append(option);
                    });
                }
            }
        });
    },
    saveLocation: function (locationId, LocationName) {
        localStorage.setItem("locationid", locationId);
        localStorage.setItem("locationname", LocationName);
        sessionStorage.setItem("locationid", locationId);
        sessionStorage.setItem("locationname", LocationName);
    },
    saveDistrict: function (districtId, districtName) {
        localStorage.setItem("districtid", districtId);
        localStorage.setItem("districtname", districtName);
        sessionStorage.setItem("districtid", districtId);
        sessionStorage.setItem("districtname", districtName);
    },
    saveWard: function (wardId, wardName) {
        localStorage.setItem("wardid", wardId);
        localStorage.setItem("wardname", wardName);
        sessionStorage.setItem("wardid", wardId);
        sessionStorage.setItem("wardname", wardName);
    },
    loadContentPackage: function (LocationId, DistrictId, WardId) {
        $.ajax({
            url: urlEnv + "api/saleplatform/catalog/get-categories",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                CusTypeId: 102,
                CusTypeL2Id: 132,
                SaleTeamId: 29,
                PageType: 2,
                source: 1,
                LocationId: parseInt(LocationId),
                DistrictId: parseInt(DistrictId),
                WardId: parseInt(WardId)
            }),
            dataType: "json",
            success: function (response) {
                let data = response.data;
                if (data) {
                    let comBoPackage = data.comboTypeCombo;
                    let internetOnly = data.comboTypeOnly;
                    modalLocation.loadComboPackage(comBoPackage);
                    modalLocation.loadComboTypeOnly(internetOnly);
                }
            }
        });
    },
    loadComboPackage: function (comboPackage) {
        let comBoPackageContent = '';
        $.each(comboPackage, function (key, val) {
            console.log(val)
            let fullName = val.FullName.split(" - ");
            let firstName = fullName[0];
            fullName.splice(0, 1);
            let lastName = fullName.join(" - ");
            let interested = '';
            if (val.speed == 80 || val.speed == 100 || val.speed == 500) {
                interested = `
                <div class="ld-service__tag"> <i class="iconld-service_tag"></i></div>`;
            }
            comBoPackageContent += `
            <a href='https://zalo.me/0905351176' target="_blank">
            <div class="ld-service__combo__item">
                <div class="ld-service__combo__item__title">
                    <h3>${firstName}</h3>
                    <h2>${lastName}</h2>
                    <div class="ld-service__combo__item__title__line"></div>
                </div>
                <div class="ld-service__combo__item__price">
                    <span>Chỉ từ</span>
                    <p>${val.RealPromotionMonth.toLocaleString()}<span class="month"> đ/${val.UnitDesc}</span></p>
                </div>
                <div class="ld-service__combo__item__price">
                    <span>Download/ Upload</span>
                    <p>${val.speed}<span class="month">Mpbs</span></p>
                </div>
                <!-- line -->
                <div class="ld-service__combo__item__line"></div>
                <!--  -->
                <div class="ld-service__combo__item__des">
                    <div class="ld-service__combo__item__des-item">
                        <p>Hơn 180 kênh truyền hình</p>
                    </div>
                    <div class="ld-service__combo__item__des-item">
                        <p>Miễn phí lắp đặt<br/> Trang bị Modem WiFi & HD Box</p>
                    </div>
                    <div class="ld-service__combo__item__des-item">
                        <p>Giảm 50.000đ khi thanh toán Online<br />Tặng tới 2 tháng cước</p>
                    </div>
                </div>
                <!--  -->
                <button
                    type="button" 
                    class="ld-service__combo__item__btn">
                    <span>Đăng ký ngay</span>
                </button>
            </div>
        </a>`;
        });
        $('#service__combo__block').empty();
        $('#service__combo__block').append(`<div id="owl-service-combo" class="owl-carousel"> ` + comBoPackageContent + `</div>`);
        owlServiceCombo();
    },
    loadComboTypeOnly: function (comboPackage) {
        let internetPackageContent = '';
        $.each(comboPackage, function (key, val) {
            let fullName = val.FullName.split(" - ");
            let firstName = fullName[0];
            fullName.splice(0, 1);
            let lastName = fullName.join(" - ");
            let interested = '';
            if (val.speed == 80 || val.speed == 100 || val.speed == 500) {
                interested = `
                <div class="ld-service__tag"> <i class="iconld-service_tag"></i></div>`;
            }
            internetPackageContent += `
            <a href='https://zalo.me/0905351176' target="_blank">
            <div class="ld-service__combo__item">
                <div class="ld-service__combo__item__title">
                    <h2 class="only-text">${lastName}</h2>
                    <div class="ld-service__combo__item__title__line"></div>
                </div>
                <div class="ld-service__combo__item__price">
                    <span>Chỉ từ</span>
                    <p>${val.RealPromotionMonth.toLocaleString()}<span class="month"> đ/${val.UnitDesc}</span></p>
                </div>
                <div class="ld-service__combo__item__price">
                    <span>Download/ Upload</span>
                    <p>${val.speed}<span class="month">Mpbs</span></p>
                </div>
                <!-- line -->
                <div class="ld-service__combo__item__line"></div>
                <!--  -->
                <div class="ld-service__combo__item__des">
                    <div class="ld-service__combo__item__des-item">
                        <p>Miễn phí lắp đặt<br/>Trang bị Modem WiFi</p>
                    </div>
                    <div class="ld-service__combo__item__des-item">
                        <p>Lắp đặt nhanh trong 12h<br/>Hỗ trợ kỹ thuật 24/7</p>
                    </div>
                    <div class="ld-service__combo__item__des-item">
                        <p>Giảm ngay 50.000đ khi thanh toán Online<br />Tặng tới 2 tháng cước</p>
                    </div>
                </div>
                <!--  -->
                <button
                    type="button" 
                    class="ld-service__combo__item__btn only-btn-buy">
                    <span>Đăng ký ngay</span>
                </button>
                ${interested}
            </div>
        </a>`;
        });
        $('#service__internet__block').empty();
        $('#service__internet__block').append(`<div id="owl-service-only" class="owl-carousel">` + internetPackageContent + `</div>`);
        owlServiceOnly();
    },
    setNewUrl: function (LocationId, DistrictId, WardId) {
        let currentUrl = $(location).attr('href');
        var url = new URL(currentUrl);
        url.searchParams.set("locationid", LocationId); // setting your param
        url.searchParams.set("districtid", DistrictId); // setting your param
        url.searchParams.set("wardid", WardId); // setting your param
        window.history.pushState(null, null, url);
    },
    getUrlParameter: function (sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(
                    sParameterName[1]);
            }
        }
        return false;
    }
};

$(document).ready(function () {
    $(".select2-hidden-accessible").select2();

    locationElement.on('change', function (e) {
        modalLocation.loadDistrict(this.value);
    });

    districtElement.on('change', function (e) {
        $("[for=district]").addClass("hidden");
        modalLocation.loadWard(locationElement.find("option:selected").val(), this.value);
    });

    wardElement.on('change', function (e) {
        $("[for=ward]").addClass("hidden");
    });

    $('.close').on('click', function (e) {
        modal.hide();
    })

    btnConfirm.on('click', function (e) {
        $('.md_location_btn').addClass('ld-btn-active');
        if (localStorage.getItem('locationname') != null) {
            locationName.text(localStorage.getItem('locationname'));
        }
        e.preventDefault();
        let error = false;
        $('.error').addClass('hidden');
        if (districtElement.find("option:selected").val() === '') {
            console.log(districtElement.find("option:selected").val());
            $("[for=district]").removeClass("hidden");
            error = true;
        }

        if (wardElement.find("option:selected").val() === '') {
            $("[for=ward]").removeClass("hidden");
            error = true;
        }
        if (error == false) {
            modalLocation.saveLocation(locationElement.find("option:selected").val(), locationElement.find("option:selected").text());
            modalLocation.saveDistrict(districtElement.find("option:selected").val(), districtElement.find("option:selected").text());
            modalLocation.saveWard(wardElement.find("option:selected").val(), wardElement.find("option:selected").text());

            locationName.text(locationElement.find("option:selected").text());

            $('#service__combo__block').empty();
            $('#service__combo__block').append(`<div id="owl-service-combo" class="owl-carousel">` + loadingSkeleton + `</div>`);
            owlServiceCombo();
            $('#service__internet__block').empty();
            $('#service__internet__block').append(`<div id="owl-service-only" class="owl-carousel">` + loadingSkeleton + `</div>`);
            owlServiceOnly();
            modalLocation.loadContentPackage(locationElement.find("option:selected").val(), districtElement.find("option:selected").val(), wardElement.find("option:selected").val());
            modalLocation.setNewUrl(locationElement.find("option:selected").val(), districtElement.find("option:selected").val(), wardElement.find("option:selected").val());

            /**Set biáº¿n cho vuejs dkol */
            let dataLocation = JSON.stringify({ 'locationid': locationElement.find("option:selected").val(), 'districtid': districtElement.find("option:selected").val(), "wardid": wardElement.find("option:selected").val(), "source": 1 });
            sessionStorage.setItem("dataLocation", dataLocation);
            modal.hide();
        }
    });
    $('#promotional-location-modal').on('click', function (e) {
        e.preventDefault();
        $('.md_location_btn').removeClass('ld-btn-active');
        $('.error').addClass('hidden');
        modalLocation.construct();
        modal.show();
    });
});

// scale responsive
document.addEventListener('touchmove', function(event) {
    event = event.originalEvent || event;
    if (event.scale > 1) {
        event.preventDefault();
    }
}, false);