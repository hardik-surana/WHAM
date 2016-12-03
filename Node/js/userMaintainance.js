/*
 AUTHOR:     HARDIK SURANA & SUDHANSHU JOSHI
 FILE TYPE:  JAVASCRIPT
 DISCLAIMER: THIS CODE HAS BEEN DONE AS A PART OF DATABASE MANAGEMENT COURSE
 TERM:       FALL 2016
 PROFESSOR:  KENNETH BACKLWASKI
 UNIVERSITY: NORTHEASTERN UNIVERSITY, BOSTON

 */

function login() {
    var emailid = $("#email").val();
    var password = $("#pwd").val();
    var root = 'http://localhost:3000/login';
    $.ajax({
        url: root,
        method: 'POST',
        data: { email: emailid, pwd: password }
    }).then(function (data) {
        //console.log(data);
        if (data.status == "error") {
            $("#login").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }
        else if (data.status == "success") {
            localStorage.setItem('session', true);
            sessionStorage.setItem('loginStatus', true);
            sessionStorage.setItem('userDetail', JSON.stringify(data));
            window.location.replace("\index.html");

        }
    });
}

function register() {
    var firstname = $("#firstName").val();
    var lastname = $("#lastName").val();
    var email = $("#email").val();
    var address1 = $("#addressLine1").val();
    var address2 = $("#addressLine2").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zipcode = $("#zipcode").val();
    var password = $("#inputPassword").val();
    var phone = $("#phone").val();
    var prefs = $("#prefs").val();

    //console.log(prefs);

    var root = 'http://localhost:3000/addperson';
    var root2 = 'http://localhost:3000/addpref';

    $.ajax({
        url: root,
        method: 'POST',
        data: { email: email, pw: password, fn: firstname, ln: lastname, adl1: address1, adl2: address2, cty: city, ste: state, zp: zipcode, ph: phone }
    }).then(function (data) {
        //console.log(data);
        if (data.status == "error") {
            $("#regForm").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }

    });

    $.ajax({
        url: root2,
        method: 'POST',
        data: { email: email, pref: prefs }
    }).then(function (data) {
        //console.log(data);
        if (data.status == "error") {
            $("#regForm").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }
        else if (data.status == "success") {

            window.location.replace("\login.html");

        }
    });
}

var prefCount = 1;


function checkUserLogin() {
    getLocation();
    if (sessionStorage.getItem('loginStatus') == 'true' && localStorage.getItem('session') == 'true') {

        var userData = JSON.parse(sessionStorage.getItem('userDetail'));
        //console.log(userData);
        $("#registerNav").hide();
        $("#loginNav").hide();
        $("#logoutNav").show();
        $('#addEvents').show();
        console.log(userData);
        if (userData.is_admin === 1) {
            $('#manageUsers').show();
            $('#manageEvents').show();
        }
        else {
            $('#manageUsers').hide();
            $('#manageEvents').hide();
        }
        $("#myaccount").show();
        $("#userName").append("<a><span class='glyphicon glyphicon-user'></span> Hi! " + userData.last_name + ", " + userData.first_name + "</a>");
        $("#jumbo").attr("class", "container-fluid");
        $("#jumbo h1").text("Displaying events for:");

        for (i = 0; i < userData.preference.length; i++) {
            var checkbox = "<div class='col-md-2'><div class='input-group'><span class='input-group-addon'><input type='checkbox' id='checkbox" + i + "' value='" + userData.preference[i] + "' onclick='checkBox_event()' checked></span><input type='text' class='form-control' value='" + (userData.preference[i]).toUpperCase() + "' readonly></div></div>"
            $("#checkrow").append(checkbox);
            
        }
        
    }
    else {
        
        $('#manageUsers').hide();
        $('#addEvents').hide();
        $('#manageEvents').hide();
        $("#logoutNav").hide();
        $("#myaccount").hide();
    }
}

function checkLogin() {

    if (sessionStorage.getItem('loginStatus') == 'true' && localStorage.getItem('session') == 'true') {

        var userData = JSON.parse(sessionStorage.getItem('userDetail'));
        //console.log(userData);
        $("#registerNav").hide();
        $("#loginNav").hide();
        $("#logoutNav").show();
        $('#addEvents').show();
        
        if (userData.is_admin === 1) {
            $('#manageUsers').show();
            $('#manageEvents').show();
        }
        else {
            $('#manageUsers').hide();
            $('#manageEvents').hide();
        }
        $("#myaccount").show();
        $("#userName").append("<a><span class='glyphicon glyphicon-user'></span> Hi! " + userData.last_name + ", " + userData.first_name + "</a>");
        $("#jumbo").attr("class", "container-fluid");
        $("#jumbo h1").text("Displaying events for:");

        for (i = 0; i < userData.preference.length; i++) {
            var checkbox = "<div class='col-md-2'><div class='input-group'><span class='input-group-addon'><input type='checkbox' id='checkbox" + i + "' value='" + userData.preference[i] + "' onclick='checkBox_event()' checked></span><input type='text' class='form-control' value='" + (userData.preference[i]).toUpperCase() + "' readonly></div></div>"
            $("#checkrow").append(checkbox);
            
        }
    }
    else {
        
        $('#manageUsers').hide();
        $('#addEvents').hide();
        $('#manageEvents').hide();
        $("#logoutNav").hide();
        $("#myaccount").hide();
    }
}

function addPref() {

    var prefdiv = $("#prefDiv");
    var prefdd = $("#prefDd").clone();
    var $plus = $("#plus");

    if (prefCount < 5) {
        prefdiv.append(prefdd);
        prefCount += 1;
    }
    if (prefCount == 5) {
        $plus.attr("disabled", "disabled");
    }

    //console.log(prefCount);

}

function prefChange() {

    $(".dropdown-menu li a").click(function () {
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });

};
function displayUsers() {
    $.ajax({
						url: 'http://localhost:3000/findallusers',
						method: 'POST',
					}).then(function (data) {
                        console.log(data);
                        var tbody = $("#userTable"); 
                        tbody.find("tr:gt(0)").remove();
                        for(var i in data){
                            var tr = $("<tr>");
                            var th = $("<th>");
                            var object = data[i];
                            var firstName = '<th>' + object.first_name + '</th>';
                            var lastName = '<th>' +object.last_name+ '</th>';
                            var address = '<th>' +object.address_line1 + ', ' + object.address_line2 + ', ' + object.city + ', ' + object.state + ', ' +object.zipcode+ '</th>';
                            var email ='<th>' + object.email+ '</th>';
                            
                            var sno = Number(i) + 1;
                            tr.append('<th>' + sno + '</th>');
                            tr.append(firstName);
                            tr.append(lastName);
                            tr.append(address);
                            tr.append(email);
                            //console.log(object.is_enable);
                            if(object.is_enable==1){
                                tr.append('<th><button type="button" class="btn btn-danger" id="user'+sno+'" onclick="changeUser(\''+ object.email +'\',\''+ object.is_enable+'\')">Disable</button></th>');
                            }
                            else{
                                tr.append('<th><button type="button" class="btn btn-primary" id="user'+sno+'" onclick="changeUser(\''+ object.email +'\',\''+ object.is_enable+'\')">Enable</button></th>');
                            }
                            tbody.append(tr).fadeIn();
                        }
                    });
}

function changeUser(email, value){
    var enable = null;
    console.log(value);
    var root = 'http://localhost:3000/updateaccess';
    if(value=="1"){
        enable = 0;
    }
    else{
        enable = 1;
    }
    $.ajax({
        url: root,
        method: 'POST',
        data: { email: email, isenable : enable }
    }).then(function (data) {
       displayUsers();
        
    });


  
}

function displayEvents(){
    $.ajax({
						url: 'http://localhost:3000/findallevents',
						method: 'POST',
					}).then(function (data) {
                        //console.log(data);
                        var tbody = $("#eventTable"); 
                        tbody.find("tr:gt(0)").remove();
                        for(var i in data){
                            var tr = $("<tr>");
                            var object = data[i];
                            var name = '<th>' + object.name + '</th>';
                            var address = '<th>' +object.address_line1 + ', ' + object.address_line2 + ', ' + object.city + ', ' + object.state + ', ' +object.zipcode+ '</th>';
                            var description ='<th>' + object.description+ '</th>';
                            var id = object._id;
                            var sno = Number(i) + 1;
                            tr.append('<th>' + sno + '</th>');
                            tr.append(name);
                            tr.append(description);
                            tr.append(address);                            
                            tr.append('<th><button type="button" class="btn btn-primary" id="user'+sno+'" onclick="changeEvent(\''+ id +'\')">Approve</button></th>');                          
                            tbody.append(tr).fadeIn();
                        }
                    });
}
function changeEvent(id) {
    var root = 'http://localhost:3000/approveevent';
    console.log(id);
   
    $.ajax({
        url: root,
        method: 'POST',
        data: { id: id }
    }).then(function (data) {
       displayEvents();
        
    });

}

function addEvent() {
    var userData = JSON.parse(sessionStorage.getItem('userDetail'));
    var email = userData.email;
    var eventName = $("#addEvent_name").val();
    var eventDesc = $("#addEvent_description").val();
    var eventAdd1 = $("#addEvent_add1").val();
    var eventAdd2 = $("#addEvent_add2").val();
    var eventCity = $("#addEvent_city").val();
    var eventState = $("#addEvent_state").val();
    var eventZip = $("#addEvent_zipcode").val();
    var eventDate = $("#addEvent_date").val().split(' ')[0];
    var eventTime = $("#addEvent_date").val().split(' ')[1] + " " + $("#addEvent_date").val().split(' ')[2];
    var eventCategory = $("#category").val();
    var url = 'http://localhost:3000/addevent';


    $.ajax({
        url: url,
        method: 'POST',
        data: { email: email, name: eventName, desc: eventDesc, date: eventDate, time: eventTime, tickets: 'No tickets', adl1: eventAdd1, adl2: eventAdd2, cty: eventCity, ste: eventState, zp: eventZip, catlist: eventCategory }
    }).then(function (data) {
        console.log(data);
        if (data.status == "error") {
            $("#regForm").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }
        else {
            $('#bannerformmodalevents').modal('toggle');
            $("#addEvent_name").val('');
            $("#addEvent_description").val('');
            $("#addEvent_add1").val('');
            $("#addEvent_add2").val('');
            $("#addEvent_city").val('');
            $("#addEvent_state").val('');
            $("#addEvent_zipcode").val('');
            $("#addEvent_date").val('');
            $("#category").val('');
        }

    });

}
function display_details() {

    var userData = JSON.parse(sessionStorage.getItem('userDetail'));
    $("#myacc_first_name").attr("value", userData.first_name);
    $("#myacc_last_name").attr("value", userData.last_name);
    $("#myacc_email").attr("value", userData.email);
    $("#myacc_address1").attr("value", userData.address_line1);
    $("#myacc_address2").attr("value", userData.address_line2);
    $("#myacc_city").attr("value", userData.city);
    $("#myacc_state").attr("value", userData.state);
    $("#myacc_zipcode").attr("value", userData.zipcode);
    $("#myacc_phone").attr("value", userData.phone);
    var prefList = userData.preference;
    //console.log(prefList);
    for (pref in prefList) {
        var prf = "#" + prefList[pref];

        $(prf).attr("selected", "selected");
    }
    $('.selectpicker').selectpicker('render');
}

function updateProfile() {
    var userData = JSON.parse(sessionStorage.getItem('userDetail'));
    var root = 'http://localhost:3000/updateuser';
    var root2 = 'http://localhost:3000/updatepref';
    var root3 = 'http://localhost:3000/login';

    var pass;
    if ($("#myacc_newpassword").val() == "") {
        pass = userData.password;
    }
    else {
        pass = $("#myacc_newpassword").val()
    }

    //console.log(pass);

    $.ajax({
        url: root,
        method: 'POST',
        data: { email: $("#myacc_email").val(), pw: pass, fn: $("#myacc_first_name").val(), ln: $("#myacc_last_name").val(), adl1: $("#myacc_address1").val(), adl2: $("#myacc_address2").val(), cty: $("#myacc_city").val(), ste: $("#myacc_state").val(), zp: $("#myacc_zipcode").val(), ph: $("#myacc_phone").val(), "isadmin": userData.is_admin, "isenable": userData.is_enable }
    }).then(function (data) {
        //console.log(data);
        if (data.status == "error") {
            $("#requestacallform").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }
    });
    $.ajax({
        url: root2,
        method: 'POST',
        data: { email: $("#myacc_email").val(), pref: $("#prefs").val() }
    }).then(function (data) {
        //console.log(data);
        if (data.status == "error") {
            //$("#requestacallform").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }
        else if (data.status == "success") {
            $("#bannerformmodal").modal('hide');

        }
    });

    $.ajax({
        url: root3,
        method: 'POST',
        data: { email: $("#myacc_email").val(), pwd: pass }
    }).then(function (data) {
        //console.log(data);
        if (data.status == "error") {
            $("#login").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }
        else if (data.status == "success") {
            localStorage.setItem('session', true);
            sessionStorage.setItem('loginStatus', true);
            sessionStorage.setItem('userDetail', JSON.stringify(data));
            window.location.replace("\index.html");

        }
    });
}
function logout() {
    $.ajax({
        url: 'http://localhost:3000/logout',
        method: 'GET',
    }).then(function (data) {
        //console.log(data);
        if (data.status == "success") {
            sessionStorage.clear();
            localStorage.setItem('session', 'false');
            window.location.replace("\index.html");
        }
    });
}

function checkBox_event() {

    var val = [];
    $(':checkbox:checked').each(function (i) {
        val[i] = $(this).val();
    });

    getEventsWithPreferences(val);

}

function deleteUser() {

    $.ajax({
        url: 'http://localhost:3000/removepref',
        method: 'POST',
        data: { email: $("#myacc_email").val()}
    }).then(function (data) {
        $.ajax({
        url: 'http://localhost:3000/removeuser',
        method: 'POST',
        data: { email: $("#myacc_email").val()}
    }).then(function (data) {
         if (data.status == "success") {
            sessionStorage.clear();
            localStorage.setItem('session', 'false');
            window.location.replace("\login.html");
        }
    });
    });
    


}