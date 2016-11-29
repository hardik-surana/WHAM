function userMaintenance(){
}

userMaintenance.prototype.login = function() {
    this.emailid = "cs5500@gmail.com";
    this.password = "cs5500";
    this.root = 'http://localhost:3000/login';
    
    //http://localhost:3000/check?us=abc&pw=123
    //var root = 'http://jsonplaceholder.typicode.com/posts';
    /*$.ajax({
        url: root,
        method: 'POST',
        data: { email: emailid, pwd: password }
    }).then(function (data) {
        console.log(data);
        if (data.status == "error") {
            $("#login").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        }
        else if (data.status == "success") {
            localStorage.setItem('session', true);
            sessionStorage.setItem('loginStatus', true);
            sessionStorage.setItem('userDetail', JSON.stringify(data));
            window.location.replace("\index.html");

        }
    });*/
}

userMaintenance.prototype.register = function() {
    // var firstname = $("#firstName").val();
    // var lastname = $("#lastName").val();
    // var username = $("#email").val();
    // var address = $("#address").val();
    // var city = $("#city").val();
    // var state = $("#state").val();
    // var zipcode = $("#zipcode").val();
    // var password = $("#inputPassword").val();
    // var phone = $("#phone").val();
    // var prefs = $("#prefs").val();

    //console.log(prefs);

    this.root = 'http://localhost:3000/newuser';
    this.root2 = 'http://localhost:3000/newpref';

    // $.ajax({
    //     url: root,
    //     method: 'POST',
    //     data: { us: username, pw: password, fn: firstname, ln: lastname, adl1: address, adl2: address, cty: city, ste: state, zp: zipcode, ph: phone  }
    // }).then(function (data) {
    //     console.log(data);
    //     if (data.status == "error") {
    //         $("#regForm").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
    //     }
        
    // });

    // $.ajax({
    //     url: root2,
    //     method: 'POST',
    //     data: { us: username, pref: prefs }
    // }).then(function (data) {
    //     console.log(data);
    //     if (data.status == "error") {
    //         $("#regForm").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
    //     }
    //     else if (data.status == "success") {
    //         window.location.replace("\login.html");

    //     }
    // });
}

var prefCount = 1;


userMaintenance.prototype.checkUserLogin = function(gm) {
    
    gm.getLocation();
    // if (sessionStorage.getItem('loginStatus') == 'true' && localStorage.getItem('session') == 'true') {
        
    //     var userData = JSON.parse(sessionStorage.getItem('userDetail'));
    //     console.log(userData);
    //     $("#registerNav").hide();
    //     $("#loginNav").hide();
    //     $("#logoutNav").show();
    //     $("#myaccount").show();
    //     $("#userName").append("<a><span class='glyphicon glyphicon-user'></span> Hi! " + userData.last_name + ", " + userData.first_name + "</a>");
    //     $("#jumbo h1").text("Displaying events for:");
        
    //     for (i = 0; i < userData.preference.length; i++)
    //     {
    //         $("#jumbo").append("<div class='checkbox checkbox-inline checkbox-danger'><input id='checkbox" + i + "' class='styled' type='checkbox' value='"+userData.preference[i]+"' onclick='checkBox_event()' checked><label for='checkbox" + i + "'>" + userData.preference[i] + "</label></div>");
            
    //     }
    // }
    // else {
    //     // $("#logoutNav").hide();
    //     // $("#myaccount").hide();
    // }
}


userMaintenance.prototype.display_details = function() {

    var userData = JSON.parse(sessionStorage.getItem('userDetail'));
    $("#myacc_first_name").attr("value", userData.first_name);
    $("#myacc_last_name").attr("value", userData.last_name);
    $("#myacc_email").attr("value", userData.username);
    $("#myacc_address").attr("value", userData.address_line1);
    $("#myacc_city").attr("value", userData.city);
    $("#myacc_state").attr("value", userData.state);
    $("#myacc_zipcode").attr("value", userData.zip);
    $("#myacc_phone").attr("value", userData.phone);
    var prefList = userData.preference;
    console.log(prefList);
    for (pref in prefList)
    {
        var prf = "#" + prefList[pref];

        $(prf).attr("selected", "selected");
    }
    $('.selectpicker').selectpicker('render');
}

userMaintenance.prototype.updateProfile = function() {
        var userData = JSON.parse(sessionStorage.getItem('userDetail'));
        this.root = 'http://localhost:3000/updateuser';
        this.root2 = 'http://localhost:3000/updatepref';
        this.root3 = 'http://localhost:3000/login';

        var pass;
        // if ($("#myacc_newpassword").val() == "")
        // {
        //     pass = userData.password;
        // }
        // else
        // {
        //     pass = $("#myacc_newpassword").val()
        // }

        // console.log(pass);

        // $.ajax({
        //     url: root,
        //     method: 'POST',
        //     data: { us: $("#myacc_email").val(), pw: pass, fn: $("#myacc_first_name").val(), ln: $("#myacc_last_name").val(), adl1: $("#myacc_address").val(), adl2: $("#myacc_address").val(), cty: $("#myacc_city").val(), ste: $("#myacc_state").val(), zp: $("#myacc_zipcode").val(), ph: $("#myacc_phone").val() }
        // }).then(function (data) {
        //     console.log(data);
        //     if (data.status == "error") {
        //         $("#requestacallform").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        //     }
        // });
        // $.ajax({
        //     url: root2,
        //     method: 'POST',
        //     data: { us: $("#myacc_email").val(), pref: $("#prefs").val() }
        // }).then(function (data) {
        //     console.log(data);
        //     if (data.status == "error") {
        //         $("#requestacallform").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        //     }
        //     else if (data.status == "success") {
        //         $("#bannerformmodal").modal('hide');

        //     }
        // });

        // $.ajax({
        //     url: root3,
        //     method: 'POST',
        //     data: { email: $("#myacc_email").val(), pwd: pass }
        // }).then(function (data) {
        //     if (data.status == "error") {
        //         $("#login").append("<div class='alert alert-danger' role='alert'><strong>Error:</strong> " + data.message + "</div>");
        //     }
        //     else if (data.status == "success") {
        //         localStorage.setItem('session', true);
        //         sessionStorage.setItem('loginStatus', true);
        //         sessionStorage.setItem('userDetail', JSON.stringify(data));
        //         window.location.replace("\index.html");

        //     }
        // });
}
userMaintenance.prototype.logout = function()
{

    this.root = 'http://localhost:3000/logout';

    // $.ajax({
    //     url: 'http://localhost:3000/logout',
    //     method: 'GET',
    // }).then(function (data) {
    //     console.log(data);
    //     if (data.status == "success") {
    //         sessionStorage.clear();
    //         localStorage.setItem('session', 'false');
    //         window.location.replace("\index.html");
    //     }
    // });
}

userMaintenance.prototype.checkBox_event = function(ne) {
    
    this.val = [];
    // $(':checkbox:checked').each(function (i) {
    //     val[i] = $(this).val();
    // });

    ne.getEventsWithPreferences(this.val);
    
}

userMaintenance.prototype.deleteUser = function() {

    this.root = 'http://localhost:3000/removeprefcs5500@gmail.com';
    this.root2 = 'http://localhost:3000/removeuser?us=cs5500@gmail.com';

    // $.ajax({
    //     url: 'http://localhost:3000/removepref' + $("#myacc_email").val(),
    //     method: 'GET'
    // });

    // $.ajax({
    //     url: 'http://localhost:3000/removeuser?us='+ $("#myacc_email").val(),
    //     method: 'GET'
    // }).then(function (data) {
    //     console.log(data);
    //     if (data.status == "success") {
    //         sessionStorage.clear();
    //         localStorage.setItem('session', 'false');
    //         window.location.replace("\login.html");
    //     }
    // });

    
}