var clicked = false;
var count = 1;
var countcol = -2;

function calculateAv() {
  var table = document.getElementById("myTable");
  var rows = table.rows;

  for (var i = 2; i < rows.length; i++) {
    var cells = rows[i].cells;
    var sum = 0;
    var cellsLength = cells.length - 2;
    var celllength2 = cells.length;

    for (var j = 2; j < cells.length; j++) {

      var cell = cells[j];
      var adder = Number(parseInt(cells[j].innerHTML)) || 0;
      sum += adder;
      if (!Number(parseInt(cells[j].innerHTML))) {
        cellsLength--;
      }
    }

    var average = (sum / cellsLength) || 0;



    table.rows[i].cells[celllength2 - 1].innerHTML = "<td>" + Math.round(average) + "%" + "</td>";

    if (Math.round(average) < 40) {
      rows[i].cells[celllength2 - 1].style.color = "white";
      rows[i].cells[celllength2 - 1].style.backgroundColor = "red";
    }

  }
}
function countUnsub() {
  var c = 0;
  var table = document.getElementById("myTable");
  var rows = table.rows;

  for (var i = 2; i < rows.length; i++) {
    var cellsLength = rows[i].cells.length - 2;
    for(var j=2; j<cellsLength+1; j++)
    {
        
        if(rows[i].cells[j].innerHTML==="-")
        {
        rows[i].cells[j].style.backgroundColor="yellow";
        c++;
        }
     }
  }
  document.getElementById('c').innerHTML = "Unsubmitted Assignments: "+c;
}
function makeEditable() {
    var x = document.getElementById("myTable").rows.length;
    var y = document.getElementById("myTable").rows[1].cells.length - 1;
    for (var i = 2; i < x; i++) {
        for(var j = 0; j < y; j++){
            document.getElementById("myTable").rows[i].cells[j].contentEditable = true;
            document.getElementById("myTable").rows[i].cells[y].contentEditable = false;
        }
    }
   document.getElementById("myTable").rows[0].cells[y].setAttribute("Class", "Grade");
}
function checkClicked(){
    if(clicked){
        calculateAv();
        countUnsub();
    }
}

function insertRow(){

    var table = document.getElementById("myTable");
    var row = table.insertRow(table.rows.length);
    for(var i = 0; i < table.rows[1].cells.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = "-";
        
        if(i === 0) {
            cell.setAttribute("id", String(++count));
        }
        if(i > 1) 
            cell.setAttribute("Class", "tg-202d");
        
    }
}
function insertCol(){
    var table = document.getElementById("myTable");
    var position = table.rows[1].cells.length-1;
    var firstCell = table.rows[1].insertCell(position);
    firstCell.innerHTML = "Assignment "+(table.rows[1].cells.length-3);
    firstCell.setAttribute("Class", "Assign");
    firstCell.setAttribute("id", String(--countcol));
    
    for(var i = 2; i < table.rows.length; i++){
        
        var cell = table.rows[i].insertCell(position);
        cell.innerHTML = "-";
        cell.setAttribute("Class", "tg-202d");
    }
}
function saveTable() {

  var table = document.getElementById("myTable");
  var num = table.rows[1].cells.length; // amount of rows
  var data = '';
  for (var i = 1; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[1].cells.length - 1; j++) {
      data += table.rows[i].cells[j].innerHTML + "~";
    }
  }
  data += table.rows.length + "~" + table.rows[1].cells.length + "~" + data.substring(0, data.length);
  setCookie("data", data, 60);
  alert("Cookie Saved");
}

function setCookie(cname, cvalue, exdays) {

  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loadTable() {
  var data = getCookie("data");
  if (data != "") {
    alert("The table says:" + data);
  } else {
    alert("There is no data in the table");
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split('~');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
