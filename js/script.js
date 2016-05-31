/**
 * Created by MKS on 22.09.2015.
 */
$(document).ready(function () {
    //ALWAYS
    $("#footer_load").load("footer.html");
    //ALWAYS

    var channelsArray = ["freecodecamp", "storbeck", "terakilobyte",
        "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas",
        "beohoff", "sheevergaming", "OgamingSC2", "ESL_SC2",
        "streamerhouse", "monstercat", "insomniacgamers12345"];

    var url = "https://api.twitch.tv/kraken/streams/";
    var callback = '&callback=JSON_CALLBACK';

    var resultArr = [];
    var choice;

    function fillUpAjax(resultArr, url, channels) {

        resultArr = [];

        for (var i = 0; i < channelsArray.length; i++) {

            $.ajax({
                type: 'GET',
                url: url + channelsArray[i],
                async: true,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function (json) {
                    resultArr.push(json);

                    if (resultArr.length == channelsArray.length) {

                        doDOM(resultArr);

                    }

                },
                error: function (e) {
                    console.log(e.message);
                }

            });

        }

    };

    fillUpAjax(resultArr, url, channelsArray);


    function doDOM(obj) {

        var j = 0;

        obj.sort(function (a, b) {
            return (a.stream === null) - (b.stream === null);
        });

        $.each(obj, function (index, value) {

            j++;
            console.log(value);

            if (value.stream !== null) {

                if (choice !== "offline") {

                    var mother_link = $("<a />", {
                        "href": value.stream.channel.url,
                        "color": "#FF8E00",
                    });
                    var online_div = $("<div />", {
                        "class": "row online-div",
                    });
                    var div_2 = $("<div />", {
                        "class": "col-md-2",
                    });
                    var div_4 = $("<div />", {
                        "class": "col-md-4",
                    });
                    var div_6 = $("<div />", {
                        "class": "col-md-6",
                    });
                    var online_h3 = $("<h3 />", {
                        "html": value.stream.channel.display_name,
                        "class": "online-h3",
                    });
                    var ch_img = $("<img />", {
                        "src": value.stream.channel.profile_banner,
                        "class": "img-responsive",
                    });
                    var ch_stat = $("<h4 />", {
                        "html": value.stream.channel.status,
                        "class": "online-h3",
                    });

                    $('#content').append(mother_link);
                    mother_link.append(online_div);
                    online_div.append(div_2);
                    online_div.append(div_4);
                    online_div.append(div_6);
                    div_2.append(ch_img);
                    div_4.append(online_h3);
                    div_6.append(ch_stat);
                }

            } else {

                if (choice !== "online") {
                    var offline_div = $("<div />", {
                        "class": "row offline-div",
                    });
                    var div_2_off = $("<div />", {
                        "class": "col-md-2",
                    });
                    var div_4_off = $("<div />", {
                        "class": "col-md-4",
                    });
                    var div_6_off = $("<div />", {
                        "class": "col-md-6",
                    });
                    var offline_h3 = $("<h3 />", {
                        "html": channelsArray[j],
                    });
                    var ch_img_off = $("<img />", {
                        "src": "img/nfound.png",
                        "class": "img-responsive",
                    });
                    var ch_stat_off = $("<h4 />", {
                        "html": value._links.channel,
                    });

                    $('#content').append(offline_div);
                    offline_div.append(div_2_off);
                    offline_div.append(div_4_off);
                    offline_div.append(div_6_off);
                    div_2_off.append(ch_img_off);
                    div_4_off.append(offline_h3);
                    div_6_off.append(ch_stat_off);
                }

            }

        });

    }

    $('#btn-all').click(function () {
        choice = 'all';
        $('#content').empty();
        fillUpAjax(resultArr, url, channelsArray);
    });
    $('#btn-online').click(function () {
        choice = 'online';
        $('#content').empty();
        fillUpAjax(resultArr, url, channelsArray);
    });
    $('#btn-offline').click(function () {
        choice = 'offline';
        $('#content').empty();
        fillUpAjax(resultArr, url, channelsArray);
    });

});