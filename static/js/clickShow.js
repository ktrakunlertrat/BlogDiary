function clickShow(){
    var page15 = document.getElementById("check_other").checked;
    var page16 = document.getElementById("check_others").checked;
    var page17 = document.getElementById("suspend_help").checked;

    var page18_x01 = document.getElementById("department_dcy").checked;
    var page18_x02 = document.getElementById("check_money_dcy").checked;
    var page18_x03 = document.getElementById("check_things_dcy").checked;
    var page18_x04 = document.getElementById("check_other_dcy").checked;

        
    var page18_x05 = document.getElementById("department_dep").checked;
    var page18_x06 = document.getElementById("check_money_dep").checked;
    var page18_x07 = document.getElementById("check_things_dep").checked;
    var page18_x08 = document.getElementById("check_other_dep").checked;

        
    var page18_x09 = document.getElementById("department_dsdw").checked;
    var page18_x10 = document.getElementById("check_money_dsdw").checked;
    var page18_x11 = document.getElementById("check_things_dsdw").checked;
    var page18_x12 = document.getElementById("check_other_dsdw").checked;

        
    var page18_x13 = document.getElementById("department_dop").checked;
    var page18_x14 = document.getElementById("check_money_dop").checked;
    var page18_x15 = document.getElementById("check_things_dop").checked;
    var page18_x16 = document.getElementById("check_other_dop").checked;

        
    var page18_x17 = document.getElementById("department_women").checked;
    var page18_x18 = document.getElementById("check_money_women").checked;
    var page18_x19 = document.getElementById("check_things_women").checked;
    var page18_x20 = document.getElementById("check_other_women").checked;

        
    var page18_x21 = document.getElementById("department_nha").checked;
    var page18_x22 = document.getElementById("check_money_nha").checked;
    var page18_x23 = document.getElementById("check_things_nha").checked;
    var page18_x24 = document.getElementById("check_other_nha").checked;

        
    var page18_x25 = document.getElementById("department_codi").checked;
    var page18_x26 = document.getElementById("check_money_codi").checked;
    var page18_x27 = document.getElementById("check_things_codi").checked;
    var page18_x28 = document.getElementById("check_other_codi").checked;


    var page19_x01 = document.getElementById("department_redcross").checked;
    var page19_x02 = document.getElementById("check_money_redcross").checked;
    var page19_x03 = document.getElementById("check_things_redcross").checked;

        
    var page19_x04 = document.getElementById("department_district").checked;
    var page19_x05 = document.getElementById("check_money_district").checked;
    var page19_x06 = document.getElementById("check_things_district").checked;

        
    var page19_x07 = document.getElementById("department_foundation").checked;
    var page19_x08 = document.getElementById("check_money_foundation").checked;
    var page19_x09 = document.getElementById("check_things_foundation").checked;

        
    var page19_x10 = document.getElementById("department_local_grov").checked;
    var page19_x11 = document.getElementById("check_money_local_grov").checked;
    var page19_x12 = document.getElementById("check_things_local_grov").checked;

    
    var page19_x13 = document.getElementById("check_money_privy").checked;
    var page19_x14 = document.getElementById("check_things_privy").checked;

    
    var page19_x15 = document.getElementById("department_donation").checked;


    if (page15 == true){
        document.getElementById('text_other').style.display = 'block';
        }
     else{
        document.getElementById('text_other').style.display = 'none';
    }

    if (page16 == true){
    document.getElementById('text_others').style.display = 'block';
    }
    else{
         document.getElementById('text_others').style.display = 'none';
    }

    if (page17 == true){
        document.getElementById('suspend_because').style.display = 'block';
        }
    else{
        document.getElementById('suspend_because').style.display = 'none';
    }
   

        if (page18_x01 == true){
        document.getElementById('department_name_dcy').style.display = 'block';
        }
        else{
             document.getElementById('department_name_dcy').style.display = 'none';
        }
        if (page18_x02 == true){
        document.getElementById('money_help_dcy').style.display = 'block';
        }
        else{
             document.getElementById('money_help_dcy').style.display = 'none';
        }
        if (page18_x03 == true){
        document.getElementById('things_help_dcy').style.display = 'block';
        }
        else{
             document.getElementById('things_help_dcy').style.display = 'none';
        }
        if (page18_x04 == true){
        document.getElementById('other_dcy').style.display = 'block';
        }
        else{
             document.getElementById('other_dcy').style.display = 'none';
        }

           
        if (page18_x05 == true){
        document.getElementById('department_name_dep').style.display = 'block';
        }
        else{
             document.getElementById('department_name_dep').style.display = 'none';
        }
        if (page18_x06 == true){
        document.getElementById('money_help_dep').style.display = 'block';
        }
        else{
             document.getElementById('money_help_dep').style.display = 'none';
        }
        if (page18_x07 == true){
        document.getElementById('things_help_dep').style.display = 'block';
        }
        else{
             document.getElementById('things_help_dep').style.display = 'none';
        }
        if (page18_x08 == true){
        document.getElementById('other_dep').style.display = 'block';
        }
        else{
             document.getElementById('other_dep').style.display = 'none';
        }

           
        if (page18_x09 == true){
        document.getElementById('department_name_dsdw').style.display = 'block';
        }
        else{
             document.getElementById('department_name_dsdw').style.display = 'none';
        }
        if (page18_x10 == true){
        document.getElementById('money_help_dsdw').style.display = 'block';
        }
        else{
             document.getElementById('money_help_dsdw').style.display = 'none';
        }
        if (page18_x11 == true){
        document.getElementById('things_help_dsdw').style.display = 'block';
        }
        else{
             document.getElementById('things_help_dsdw').style.display = 'none';
        }
        if (page18_x12 == true){
        document.getElementById('other_dsdw').style.display = 'block';
        }
        else{
             document.getElementById('other_dsdw').style.display = 'none';
        }

           
        if (page18_x13 == true){
        document.getElementById('department_name_dop').style.display = 'block';
        }
        else{
             document.getElementById('department_name_dop').style.display = 'none';
        }
        if (page18_x14 == true){
        document.getElementById('money_help_dop').style.display = 'block';
        }
        else{
             document.getElementById('money_help_dop').style.display = 'none';
        }
        if (page18_x15 == true){
        document.getElementById('things_help_dop').style.display = 'block';
        }
        else{
             document.getElementById('things_help_dop').style.display = 'none';
        }
        if (page18_x16 == true){
        document.getElementById('other_dop').style.display = 'block';
        }
        else{
             document.getElementById('other_dop').style.display = 'none';
        }

           
        if (page18_x17 == true){
        document.getElementById('department_name_women').style.display = 'block';
        }
        else{
             document.getElementById('department_name_women').style.display = 'none';
        }
        if (page18_x18 == true){
        document.getElementById('money_help_women').style.display = 'block';
        }
        else{
             document.getElementById('money_help_women').style.display = 'none';
        }
        if (page18_x19 == true){
        document.getElementById('things_help_women').style.display = 'block';
        }
        else{
             document.getElementById('things_help_women').style.display = 'none';
        }
        if (page18_x20 == true){
        document.getElementById('other_women').style.display = 'block';
        }
        else{
             document.getElementById('other_women').style.display = 'none';
        }

           
        if (page18_x21 == true){
        document.getElementById('department_name_nha').style.display = 'block';
        }
        else{
             document.getElementById('department_name_nha').style.display = 'none';
        }
        if (page18_x22 == true){
        document.getElementById('money_help_nha').style.display = 'block';
        }
        else{
             document.getElementById('money_help_nha').style.display = 'none';
        }
        if (page18_x23 == true){
        document.getElementById('things_help_nha').style.display = 'block';
        }
        else{
             document.getElementById('things_help_nha').style.display = 'none';
        }
        if (page18_x24 == true){
        document.getElementById('other_nha').style.display = 'block';
        }
        else{
             document.getElementById('other_nha').style.display = 'none';
        }

           
        if (page18_x25 == true){
        document.getElementById('department_name_codi').style.display = 'block';
        }
        else{
             document.getElementById('department_name_codi').style.display = 'none';
        }
        if (page18_x26 == true){
        document.getElementById('money_help_codi').style.display = 'block';
        }
        else{
             document.getElementById('money_help_codi').style.display = 'none';
        }
        if (page18_x27 == true){
        document.getElementById('things_help_codi').style.display = 'block';
        }
        else{
             document.getElementById('things_help_codi').style.display = 'none';
        }
        if (page18_x28 == true){
        document.getElementById('other_codi').style.display = 'block';
        }
        else{
             document.getElementById('other_codi').style.display = 'none';
        }
        if (page19_x01 == true){
            document.getElementById('department_name_redcross').style.display = 'block';
            }
            else{
                 document.getElementById('department_name_redcross').style.display = 'none';
            }
            if (page19_x02 == true){
            document.getElementById('money_help_redcross').style.display = 'block';
            }
            else{
                 document.getElementById('money_help_redcross').style.display = 'none';
            }
            if (page19_x03 == true){
            document.getElementById('things_help_redcross').style.display = 'block';
            }
            else{
                 document.getElementById('things_help_redcross').style.display = 'none';
            }

              
            if (page19_x04 == true){
            document.getElementById('department_name_district').style.display = 'block';
            }
            else{
                 document.getElementById('department_name_district').style.display = 'none';
            }
            if (page19_x05 == true){
            document.getElementById('money_help_district').style.display = 'block';
            }
            else{
                 document.getElementById('money_help_district').style.display = 'none';
            }
            if (page19_x06 == true){
            document.getElementById('things_help_district').style.display = 'block';
            }
            else{
                 document.getElementById('things_help_district').style.display = 'none';
            }

              
            if (page19_x07 == true){
            document.getElementById('department_name_foundation').style.display = 'block';
            }
            else{
                 document.getElementById('department_name_foundation').style.display = 'none';
            }
            if (page19_x08 == true){
            document.getElementById('money_help_foundation').style.display = 'block';
            }
            else{
                 document.getElementById('money_help_foundation').style.display = 'none';
            }
            if (page19_x09 == true){
            document.getElementById('things_help_foundation').style.display = 'block';
            }
            else{
                 document.getElementById('things_help_foundation').style.display = 'none';
            }

              
            if (page19_x10 == true){
            document.getElementById('department_name_local_grov').style.display = 'block';
            }
            else{
                 document.getElementById('department_name_local_grov').style.display = 'none';
            }
            if (page19_x11 == true){
            document.getElementById('money_help_local_grov').style.display = 'block';
            }
            else{
                 document.getElementById('money_help_local_grov').style.display = 'none';
            }

            if (page19_x12 == true){
            document.getElementById('things_help_local_grov').style.display = 'block';
            }
            else{
                 document.getElementById('things_help_local_grov').style.display = 'none';
            }

             
            if (page19_x13 == true){
            document.getElementById('money_help_privy').style.display = 'block';
            }
            else{
                 document.getElementById('money_help_privy').style.display = 'none';
            }
            if (page19_x14 == true){
            document.getElementById('things_help_privy').style.display = 'block';
            }
            else{
                 document.getElementById('things_help_privy').style.display = 'none';
            }

            if (page19_x15 == true){
            document.getElementById('money_donation').style.display = 'block';
            }
            else{
                 document.getElementById('money_donation').style.display = 'none';
            }
    
}
