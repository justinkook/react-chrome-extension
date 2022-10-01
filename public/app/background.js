// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
   var html = '',
       node = document_root.firstChild;
   while (node) {
       switch (node.nodeType) {
       case Node.ELEMENT_NODE:
           html += node.outerHTML;
           break;
       case Node.TEXT_NODE:
           html += node.nodeValue;
           break;
       case Node.CDATA_SECTION_NODE:
           html += '<![CDATA[' + node.nodeValue + ']]>';
           break;
       case Node.COMMENT_NODE:
           html += '<!--' + node.nodeValue + '-->';
           break;
       case Node.DOCUMENT_TYPE_NODE:
           // (X)HTML documents are identified by public identifiers
           html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
           break;
       }
       node = node.nextSibling;
   }
   return html;
}

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
   // Send a message to the active tab
   chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
   });
});

chrome.tabs.onUpdated.addListener(function (tabId, info) {
   if(info.status === 'complete') {
      chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
         const activeTab = tabs[0];
         chrome.tabs.sendMessage(activeTab.id, {
            action: "getSource",
            source: DOMtoString(document)
         });
    });
   }
});
