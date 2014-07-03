//the settings that this program uses to operate
var settings = {
    toggled: false,
    guiHidden: false,
    amountCubes: 0,
    createCubes: false,
    creationStarted: false,
    updateFrequency: 150,
    colorOpacity: 1,
    colorOpacityOnHover: 1
};

//Creates a random between min & max.
function Random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//creates a random RedGreenBlueAlpha-color
function RndRgba(alpha) {
    color = {
        red: Random(0, 255).toString(),
        green: Random(0, 255).toString(),
        blue: Random(0, 255).toString()
    }
    if (!alpha) {
        alpha = 1; //sets the opacity to 1 if no alpha input is received through the parameters
    }
    return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + alpha + ")";
}

//changes the cube colors
function ChangeColors() {
    $(".row .col").each(function(i) {
        $(this).css("background", RndRgba());
        //webkit will convert an rgba value that has 1 as alpha to RGB
    });
}

//spawns the cubes
function CreateCubes() {
    if (settings.createCubes) {
        settings.amountCubes++;
        $(".row").append("<li class='col'></li>");
    }
}


function UpdateSpawnedCount() {
    $(".cubes-spawned").text("Cubes Spawned: " + settings.amountCubes);
}

function ReloadCubes() {
    //sets amount of cubes to 0
    settings.amountCubes = 0;
    //updates that to the counter
    UpdateSpawnedCount();
    //and clears the row
    $(".row").empty();
}

function ChangeOpacity() {
    //throw out a prompt box and ask for the desired initial opacity (0-1, filter out the bad ones)
    //and another prompt right after that asks for the hover opacity value (0-1, filter out the bad ones)
    //and resets the global value(s)

    //filter logic: if(inputOpacity => minOpacity && inputOpacity =< maxOpacity) { opacity = inputOpacity }
    //else opacity = 1; //it becomes one if the terms are not filled
}

function ChangeFrequency() {
    //this function changes the frequency that the cubes get spawned at by directly asking the user with a prompt box
    //and sets the value (which must be given in ms) to settings.updateFrequency 
}

function ToggleGui() {
    var gui = $(".gui");
    //if the gui is toggled
    if (settings.guiHidden) {
        //set the guiHidden variable to false
        settings.guiHidden = false;
        //shows the GUI
        gui.show();
        //and return from the function
        console.log("GUI Visible");
        return false;
    }
    //else if the first condition is false and the script runs this far it hides the GUI
    gui.hide();
    //and resets the guiHidden variable to true (because it is hidden)
    settings.guiHidden = true;
    console.log("GUI Hidden");
}

//when the webpage is ready, color one (or the existing) cubes ONCE
$(document).ready(function() {
    ChangeColors();
});

//spawns more cubes and changes their colors
setInterval(function() {
    //ChangeColors(); //by commenting this out the color wont change after the creating has been halted
    //if settings.createCubes is true, do
    if (settings.createCubes) {
        CreateCubes();
        ChangeColors();
        UpdateSpawnedCount(); //updates the spawn count counter each update
    }
}, settings.updateFrequency);

$(".startcreating").on("click", function() {
    //if the user clicks and creation has already started, ie. is the function is running
    if (settings.creationStarted) {
        //set the creation variable to false
        settings.creationStarted = false;
        //set the create cubes variable to false
        settings.createCubes = false;
        //set the buttons text to "Start creating"
        $(this).text("Start Creating");
        //and return from the function
        return false;
    }
    //on a click where the creationStarted variable is not alreay true ie. when the code passes the if
    //set the variable to true
    settings.creationStarted = true;
    //set the createCubes variable to true and this will start creating the cubes
    settings.createCubes = true;
    //also set the text to stop creating
    $(this).text("Stop Creating");
});

//handles the keypresses
$(document).bind('keypress', function(e) {
    //if the user presses any of the keys "enter" or "space" while having "document" focused, ie. having the webpage focused,
    //trigger a fake "click" for the button and start / stop the cube creation
    if (e.keyCode == 13 || e.keyCode == 32) {
        $(".startcreating").trigger("click");
    }
    //if the user presses shift + h combo
    else if (e.shiftKey && e.keyCode == 72) {
        ToggleGui();
    }
    //reloads everything
    else if (e.shiftKey && e.keyCode == 82 && settings.creationStarted != true) {
        ReloadCubes();
    }
});

//when the user clicks the settings box
$(".settings").on("click", function() {

    //checks if any of the list items are pressed
    $(".settings ul li").on("click", function() {
        console.log("A list item was pressed");
        //returns false ie. stops the tweakbox from collapsing (hiding itself)
        return false;
    });

    //if the action-reset list item is pressed
    $(".settings li.action-reset").on("click", function() {
        if (settings.creationStarted != true) {
            //check if cube creation is started and if not then
            //reload the cubes
            ReloadCubes();
            console.log("reload by mouse click");
        }
    });
    //if the action-change-opacity list item is pressed
    $(".settings li.action-change-opacity").on("click", function() {
        if (settings.creationStarted != true) {
            //reload the cubes
            ChangeOpacity();
            console.log("opacity");
        }
    });
    //if the action-change-opacity list item is pressed
    $(".settings li.action-change-frequency").on("click", function() {
        if (settings.creationStarted != true) {
            //reload the cubes
            ChangeFrequency();
            console.log("frequency");
        }
    });

    //handles the toggling of the settings list
    var list = $(".settings ul");
    if (settings.toggled) {
        settings.toggled = false;
        list.hide();
        return false;
    }
    list.css("display", "table-row"); //essentially a show(); function
    settings.toggled = true;

});