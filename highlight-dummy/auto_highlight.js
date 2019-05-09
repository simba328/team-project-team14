function textNodesUnder(node){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(textNodesUnder(node));
  }
  return all;
}

var link = document.createElement("link");
link.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/xcode.min.css";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

var link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css?family=Source+Code+Pro";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

var node = document.body;
textNodes = textNodesUnder(node);

var mode = 0;
var ok = false;
var codeText = '';
for (var i = 0; i < textNodes.length; i++) {
    var tt = textNodes[i];
    var parent_tt = tt.parentNode;
    
    if (mode === 0) {
        if (tt.nodeValue.includes("#include <stdio.h>")) {
             ok = true; mode++; codeText += tt.nodeValue + '\n';
             console.log(parent_tt)
        }
    }
    else if (mode === 1) {
        if (tt.nodeValue.includes("}")) {
            mode++;
        }
        codeText += tt.nodeValue + '\n'; 
    }
    else if (mode === 2) {
        if (tt.nodeValue.includes("}")) {
            mode++;
        }
        codeText += tt.nodeValue + '\n';
        //parent_tt.        
    }
    else {
        ok = false;
    }
    if (ok) {
        var new_parent = document.createElement("code");
        new_parent.className = "cpp";
        new_parent.style.display = "inline";
        new_parent.style.padding = "0";
        new_parent.style.margin = "0";
        new_parent.style.background = "transparent";
        new_parent.textContent = tt.nodeValue;
        new_parent.style.fontFamily = "'Source Code Pro'";
        new_parent.style.letterSpacing = "-0.5px";
        tt.replaceWith(new_parent);
    }
}
//console.log(codeText);
var script = document.createElement('script');
script.onload = function () {
    document.head.appendChild(script);
    hljs.initHighlightingOnLoad();
    hljs.configure({useBR: true});
    document.querySelectorAll('code.cpp').forEach((block) => {
        hljs.highlightBlock(block);
    });
};
script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js";
document.getElementsByTagName("head")[0].appendChild(script);