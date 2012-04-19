var platform = Ti.Platform.osname;
var Cloud = require('ti.cloud');    

Titanium.Facebook.appid = "336739469726078";
//Titanium.Facebook.permissions = ['publish_stream'];

//A window object which will be associated with the stack of windows
exports.LoginWindow = function(args) {
	var win = Ti.UI.createWindow({
		title: "Welcome to ACS Todo",
		modal: true,
		backgroundColor: "#fff"
	});
    var label = Ti.UI.createLabel({
        text: "Check user information...",
        textAlign: 'center',
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
	win.add(label);

    win.open();
	

    // call the ACS Facebook SocialIntegrations API to link logged in states
    function updateLoginStatus() {
        if (Ti.Facebook.loggedIn) {
            label.text = 'Logging in to ACS as well, please wait...';
            Cloud.SocialIntegrations.externalAccountLogin({
                type: 'facebook',
                token: Ti.Facebook.accessToken
            }, function (e) {
                if (e.success) {
                    var user = e.users[0];
                    win.close();
                    args.callback();
                }
                else {
                    error(e);
                }
            });
        }
        else {
            Ti.Facebook.authorize();
        }
    }

    // when the user logs into or out of Facebook, link their login state with ACS
    Ti.Facebook.addEventListener('login', updateLoginStatus);
    Ti.Facebook.addEventListener('logout', updateLoginStatus);

    Cloud.Users.showMe(function (e) {
        if (e.success) {
            var user = e.users[0];
            args.callback();
        }
        else{
            Ti.Facebook.authorize();
        }
    });
}
