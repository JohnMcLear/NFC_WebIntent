/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    // Read NDEF formatted NFC Tags
    nfc.addNdefListener(function(nfcEvent) {
      var tag = nfcEvent.tag,
        ndefMessage = tag.ndefMessage;
      // dump the raw json of the message
      // note: real code will need to decode
      // the payload from each record
      alert(JSON.stringify(ndefMessage));
      // assuming the first record in the message has 
      // a payload that can be converted to a string.
      alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
    }, function() { // success callback
      alert("Waiting for NDEF tag");
    }, function(error) { // error callback
      alert("Error adding NDEF listener " + JSON.stringify(error));
    });

    if (typeof cordova !== 'undefined') {
      alert("Checking for intent");
      window.plugins.webintent.hasExtra(window.plugins.webintent.EXTRA_TEXT, function(hasExtra) {
        if (hasExtra) {
          alert("Intent passed, handling that way");
          window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_TEXT, function(url) {
            alert("Intent value is " + url);
          }, function() {
            alert("ERROR XVMA123");
          });
        }
      }, function() {
        alert("ERROR XVMA172");
      });
    }
    window.plugins.webintent.onNewIntent(function(intent, test) {
      // This is firing even though there is no intent event!
      alert("new intent event detected", intent, test);
      alert(intent);
      alert(test);
      window.plugins.webintent.hasExtra(window.plugins.webintent.EXTRA_TEXT, function(hasExtra) {
        if (hasExtra) {
          alert("Intent passed, handling that way");
        }
      });
    });
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    console.log('Received Event: ' + id);
  }
};
