 var sleepCounter = 0;
 
 function validator() {
	  
    $('#contact-form').validate({
		
      errorElement: 'div',
      messages: {
		  
        linha1: 'Digite um valor para o campo linha 1',
        copias: 'Digite a quantidade de copias',
				
      },
	  
      submitHandler: function(form) {
		  printLabel();
      }
	  
    });

 }

 function findPrinter() {
 	var applet = document.jZebra;
 	if (applet != null) {
 		// Searches for locally installed printer with "zebra" in the name
 		applet.findPrinter("zebra");
 	}
 	monitorFinding();
 }

 function printLabel() {

 	var linha1 = document.getElementById('linha1').value;
 	var linha2 = document.getElementById('linha2').value;
 	var linha3 = document.getElementById('linha3').value;
 	var linha4 = document.getElementById('linha4').value;
 	var linha5 = document.getElementById('linha5').value;
	var linha6 = document.getElementById('linha6').value;
	var linha7 = document.getElementById('linha7').value;

 	var copias = document.getElementById('copias').value;

 	console.log(linha1, linha2, linha3, linha4, linha5, linha6, linha7);

 	var applet = document.jZebra;
 	if (applet != null) {

 		// Using jZebra's "appendFile()" function, a file containg your raw EPL/ZPL
 		// can be sent directly to the printer
 		// Example:
 		applet.append("N\n");
 		applet.append("OD10\n");
 		applet.append("q812\n");
 		applet.append("Q1370,24\n");
 		applet.append("D7\n");
 		applet.append("ZT\n");

 		applet.append('A40,5,0,4,1,1,N,"' + linha1 + '"\n');
 		applet.append('A40,35,0,4,1,1,N,"' + linha2 + '"\n');
 		applet.append('A40,65,0,4,1,1,N,"' + linha3 + '"\n');
 		applet.append('A40,95,0,4,1,1,N,"' + linha4 + '"\n');
 		applet.append('A40,125,0,4,1,1,N,"' + linha5 + '"\n');
		applet.append('A40,155,0,4,1,1,N,"' + linha6 + '"\n');
		applet.append('A40,185,0,4,1,1,N,"' + linha7 + '"\n');

 		applet.append('P' + copias + '\n');
 		applet.append("N\n");

 		applet.print();
 	}

 	monitorPrinting();
 }
 

 function chr(i) {
 	return String.fromCharCode(i);
 }

 function monitorPrinting() {
 	var applet = document.jZebra;
 	if (applet != null) {
 		if (!applet.isDonePrinting()) {
 			window.setTimeout('monitorPrinting()', 100);
 		} else {
 			var e = applet.getException();
 			alert(e == null ? "Documento enviado para a impressora" : "Ocorreu uma exceção: " + e.getLocalizedMessage());
 		}
 	} else {
 		alert("Aplicativo Java não carregado!");
 	}
 }

 function monitorFinding() {
 	var applet = document.jZebra;
 	if (applet != null) {
 		if (!applet.isDoneFinding()) {
 			window.setTimeout('monitorFinding()', 100);
 		} else {
 			var printer = applet.getPrinterName();
 			alert(printer == null ? "Impressora não encontrada" : "Impressora \"" + printer + "\" Encontrada");
 		}
 	} else {
 		alert("Aplicativo Java não carregado!");
 	}
 }

 function monitorAppending() {
 	var applet = document.jZebra;
 	if (applet != null) {
 		if (!applet.isDoneAppending()) {
 			window.setTimeout('monitorAppending()', 100);
 		} else {
 			applet.print(); // Don't print until all of the data has been appended
 			monitorPrinting();
 		}
 	} else {
 		alert("Aplicativo Java não carregado!");
 	}
 }