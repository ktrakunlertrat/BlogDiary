function autoTabIDCitizen(obj) {
     var pattern = new String("_-____-_____-__-_"); // กำหนดรูปแบบในนี้
     var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
     var returnText = new String("");
     var obj_l = obj.value.length;
     var obj_l2 = obj_l - 1;
     for (i = 0; i < pattern.length; i++) {
          if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
               returnText += obj.value + pattern_ex;
               obj.value = returnText;
          }
     }
     if (obj_l >= pattern.length) {
          obj.value = obj.value.substr(0, pattern.length);
     }
}

function autoTabTel(obj) {
     var pattern = new String("_-____-____");// กำหนดรูปแบบในนี้
     var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
     var returnText = new String("");
     var obj_l = obj.value.length;
     var obj_l2 = obj_l - 1;
     for (i = 0; i < pattern.length; i++) {
          if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
               returnText += obj.value + pattern_ex;
               obj.value = returnText;
          }
     }
     if (obj_l >= pattern.length) {
          obj.value = obj.value.substr(0, pattern.length);
     }
}

function autoTabTelPhone(obj) {
     var pattern = new String("__-____-____");// กำหนดรูปแบบในนี้
     var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
     var returnText = new String("");
     var obj_l = obj.value.length;
     var obj_l2 = obj_l - 1;
     for (i = 0; i < pattern.length; i++) {
          if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
               returnText += obj.value + pattern_ex;
               obj.value = returnText;
          }
     }
     if (obj_l >= pattern.length) {
          obj.value = obj.value.substr(0, pattern.length);
     }
}

function addressCode(obj) {
     var pattern = new String("____-______-_");// กำหนดรูปแบบในนี้
     var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
     var returnText = new String("");
     var obj_l = obj.value.length;
     var obj_l2 = obj_l - 1;
     for (i = 0; i < pattern.length; i++) {
          if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
               returnText += obj.value + pattern_ex;
               obj.value = returnText;
          }
     }
     if (obj_l >= pattern.length) {
          obj.value = obj.value.substr(0, pattern.length);
     }
}


