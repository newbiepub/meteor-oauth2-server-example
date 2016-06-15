// reactive vars for our UI.
var grantResult = new ReactiveVar(null);
var tokenResult = new ReactiveVar(null);
var getUserIdResult = new ReactiveVar(null);
var clientCount = new ReactiveVar(null);

function getUrlParams() {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);

    var urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams;
}

Template.layout.onCreated(function () {
    // subscribe to our authorization codes and refresh tokens.
    oAuth2Server.subscribeTo.authCode();
    oAuth2Server.subscribeTo.refreshTokens();

    // get teh client count.
    Meteor.call('clientCount', function (err, cnt) {
        clientCount.set(cnt);
    });
});

Template.generateAPIKeys.helpers({
    clientCount: function () {
        return clientCount.get();
    }
});

Template.authorize.events({
    "click .authorize": function () {
        var urlParams = getUrlParams();
        oAuth2Server.callMethod.authCodeGrant(
            urlParams.client_id,
            urlParams.redirect_uri,
            urlParams.response_type,
            urlParams.scope && urlParams.scope.split(' '),
            urlParams.state,
            function (err, result) {
                console.log(err, result);
                window.location.assign(result.redirectToUri);
            }
        );
    }
});

Template.generateAPIKeys.events({
    "click .generateAPIKey": function () {
        var newClient = {
            active: true,
            clientId: Meteor.uuid(),
            redirectUri: "http://localhost:3200/_oauth/MeteorOAuth2Server",
            clientSecret: 123456789,
            clientName: "VNhomnay"
        };
        Meteor.call('addClient', newClient, function () {
            Meteor.call('clientCount', function (err, cnt) {
                clientCount.set(cnt);
            });
        });

        return false;
    }
});
