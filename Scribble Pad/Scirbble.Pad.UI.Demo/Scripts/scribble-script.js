var Scribbler = (function () {

    // code
    var scribblerCanvas,
        canvas2DContext,
        is_Scribbling = false,
        previous_x = 0,
        current_x = 0,
        previous_y = 0,
        current_y = 0,
        dot_flag = false;

    var colour = "black",
        strokeWidth = 2;


    var draw = function () {
        canvas2DContext.beginPath();
        canvas2DContext.moveTo(previous_x, previous_y);
        canvas2DContext.lineTo(current_x, current_y);
        canvas2DContext.strokeStyle = colour;
        canvas2DContext.lineWidth = strokeWidth;
        canvas2DContext.stroke();
        canvas2DContext.closePath();
    };

    var erase = function () {
        var m = confirm("Are you sure you want to clear?");
        if (m) {
            canvas2DContext.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    };

    var handleMouseEvent = function (eventType, e) {
        if (eventType == 'down') {
            previous_x = current_x;
            previous_y = current_y;
            current_x = e.layerX
            current_y = e.layerY;
            is_Scribbling = true;

            dot_flag = true;
            if (dot_flag) {
                canvas2DContext.beginPath();
                canvas2DContext.fillStyle = colour;
                canvas2DContext.fillRect(current_x, current_y, 2, 2);
                canvas2DContext.closePath();
                dot_flag = false;
            }
        }
        if (eventType == 'up' || eventType == "out") {
            is_Scribbling = false;
        }
        if (eventType == 'move') {
            if (is_Scribbling) {
                previous_x = current_x;
                previous_y = current_y;
                current_x = e.layerX;
                current_y = e.layerY;
                draw();
            }
        }
    };


    var init = function () {
        scribblerCanvas = document.getElementById('can');
        canvas2DContext = scribblerCanvas.getContext("2d");
        w = scribblerCanvas.width;
        h = scribblerCanvas.height;

        scribblerCanvas.addEventListener("mousemove", function (e) {
            handleMouseEvent('move', e)
        }, false);
        scribblerCanvas.addEventListener("mousedown", function (e) {
            handleMouseEvent('down', e)
        }, false);
        scribblerCanvas.addEventListener("mouseup", function (e) {
            handleMouseEvent('up', e)
        }, false);
        scribblerCanvas.addEventListener("mouseout", function (e) {
            handleMouseEvent('out', e)
        }, false);
    };


    return {
        Init: function () {
            init();
        },

        Save: function () {
            document.getElementById("canvasimg").style.border = "2px solid";
            var dataURL = scribblerCanvas.toDataURL();
            document.getElementById("canvasimg").src = dataURL;
            document.getElementById("canvasimg").style.display = "inline";

        },


        SelectColour: function (obj) {
            switch (obj.id) {
                case "green":
                    colour = "green";
                    break;
                case "blue":
                    colour = "blue";
                    break;
                case "red":
                    colour = "red";
                    break;
                case "yellow":
                    colour = "yellow";
                    break;
                case "orange":
                    colour = "orange";
                    break;
                case "black":
                    colour = "black";
                    break;
                case "white":
                    colour = "white";
                    break;
            }
            if (colour == "white") strokeWidth = 14;
            else strokeWidth = 2;
        }
    };
})();

(function () {
    Scribbler.Init();
})();










