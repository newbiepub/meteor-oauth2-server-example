Router.configure({
    layoutTemplate: "layout"
});

Router.route("/", {
    template: "login",
    name: "login"
});

/*
Router.route("/authorize", {
    template: "authorize",
    name: "authorize"
});

Router.route("/generateAPIKeys", {
    template: "generateAPIKeys",
    name: "generateAPIKeys"
});*/
