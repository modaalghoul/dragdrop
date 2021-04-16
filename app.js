var mobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  mobile = true;
}

const dragables = document.getElementsByClassName("dragable");
for (const dragable of dragables) {
  if (mobile) {
    dragElementOnMobile(dragable);
  }
  dragElement(dragable);
}

//Make the DIV element draggagle:
// dragElement(document.getElementById("mydiv"));

function dragElement(element) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function dragElementOnMobile(element) {
  element.addEventListener("touchmove", function (e) {
    // grab the location of touch
    var touchLocation = e.targetTouches[0];

    // assign box new coordinates based on the touch.
    element.style.left = touchLocation.pageX - 100 + "px";
    element.style.top = touchLocation.pageY - 100 + "px";
  });

  /* record the position of the touch
  when released using touchend event.
  This will be the drop position. */

  element.addEventListener("touchend", function (e) {
    // current box position.
    var x = parseInt(element.style.left);
    var y = parseInt(element.style.top);
  });
}
